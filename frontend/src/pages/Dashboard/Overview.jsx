import { useMemo } from 'react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useAsync } from '../../hooks/useAsync.js';
import { getCurrentUser } from '../../api/users.js';
import { getAllJobs } from '../../api/jobs.js';
import { getMyApplications } from '../../api/applications.js';
import { getMyCompany } from '../../api/companies.js';
import StateCard from '../../components/common/StateCard.jsx';
import JobCard from '../../components/jobs/JobCard.jsx';

const Overview = () => {
  const { isJobSeeker, isEmployer, user } = useAuth();

  const { data: profile } = useAsync(getCurrentUser, [], { initialValue: null });
  const { data: jobs = [], loading: jobsLoading } = useAsync(getAllJobs, [], { initialValue: [] });
  const { data: applications = [], loading: applicationsLoading } = useAsync(
    () => getMyApplications(),
    [isJobSeeker],
    { initialValue: [], immediate: isJobSeeker },
  );
  const { data: myCompany } = useAsync(() => getMyCompany(), [isEmployer], {
    initialValue: null,
    immediate: isEmployer,
  });

  const myCompanyJobs = useMemo(() => {
    if (!isEmployer || !myCompany) return [];
    return jobs.filter((job) => job.company?.id === myCompany.id);
  }, [isEmployer, myCompany, jobs]);

  const jobSeekerStats = useMemo(() => {
    if (!isJobSeeker) return [];
    const interviews = applications.filter((app) => app.status?.includes('INTERVIEW')).length;
    const offers = applications.filter((app) => app.status === 'OFFERED' || app.status === 'ACCEPTED').length;
    return [
      { label: 'Applications sent', value: applications.length },
      { label: 'Interviews scheduled', value: interviews },
      { label: 'Offers', value: offers },
    ];
  }, [applications, isJobSeeker]);

  const employerStats = useMemo(() => {
    if (!isEmployer) return [];
    const totalApplicants = myCompanyJobs.reduce((sum, job) => sum + (job.applicationCount ?? 0), 0);
    const remoteRoles = myCompanyJobs.filter((job) => job.remoteAvailable).length;
    return [
      { label: 'Open roles', value: myCompanyJobs.length },
      { label: 'Applicants', value: totalApplicants },
      { label: 'Remote roles', value: remoteRoles },
    ];
  }, [isEmployer, myCompanyJobs]);

  return (
    <div className="dashboard-overview">
      <section className="card highlight">
        <p className="pill">Welcome back</p>
        <h2>
          {profile ? `Ready for the next step, ${profile.firstName}?` : `Hey ${user?.firstName || 'there'}!`}
        </h2>
        <p className="muted">
          Track your pipeline, update your profile, and explore fresh opportunities tailored to your goals.
        </p>
      </section>

      {(applicationsLoading || jobsLoading) && <div className="skeleton" style={{ minHeight: '120px' }} />}

      <section className="grid grid-3">
        {(isJobSeeker ? jobSeekerStats : employerStats).map((stat) => (
          <StateCard key={stat.label} icon="⚡" title={stat.value} description={stat.label} />
        ))}
      </section>

      <section className="card">
        <div className="section-heading">
          <div>
            <p className="badge">Fresh picks</p>
            <h3>Recommended roles</h3>
          </div>
        </div>
        {jobsLoading ? (
          <div className="grid grid-3">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="skeleton" />
            ))}
          </div>
        ) : (
          <div className="grid grid-3">
            {jobs.slice(0, 3).map((job) => (
              <JobCard key={job.id} job={job} compact />
            ))}
          </div>
        )}
      </section>

      {isEmployer && (
        <section className="card">
          <div className="section-heading">
            <div>
              <p className="badge">My openings</p>
              <h3>{myCompany?.name || 'Your company'}</h3>
            </div>
          </div>
          {myCompanyJobs.length ? (
            <div className="grid">
              {myCompanyJobs.slice(0, 4).map((job) => (
                <JobCard key={job.id} job={job} compact />
              ))}
            </div>
          ) : (
            <StateCard
              icon="🚀"
              title="No roles yet"
              description="Publish your first opening to start attracting applicants."
              action={<a className="btn btn-primary" href="/dashboard/jobs/new">Post a job</a>}
            />
          )}
        </section>
      )}
    </div>
  );
};

export default Overview;
