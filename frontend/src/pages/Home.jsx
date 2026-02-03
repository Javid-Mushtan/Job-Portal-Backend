import { useNavigate } from 'react-router-dom';
import JobCard from '../components/jobs/JobCard.jsx';
import JobFilters from '../components/jobs/JobFilters.jsx';
import { getAllJobs, searchJobs } from '../api/jobs.js';
import { useAsync } from '../hooks/useAsync.js';

const heroStats = [
  { label: 'Live roles', value: '120+' },
  { label: 'Hiring teams', value: '45' },
  { label: 'Avg. response', value: '< 48h' },
];

const Home = () => {
  const navigate = useNavigate();
  const { data: jobs = [], loading, execute, setData } = useAsync(getAllJobs, [], { initialValue: [] });

  const handleSearch = async (filters) => {
    const hasFilters = Object.values(filters).some((value) => value);
    if (hasFilters) {
      const results = await searchJobs(filters);
      setData(results);
    } else {
      execute();
    }
  };

  return (
    <div>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <p className="pill">Springboard your next chapter</p>
            <h1>
              Discover curated opportunities at<br />
              ambitious companies.
            </h1>
            <p className="muted">
              Tailored openings, transparent salary bands, and direct communication with hiring managers. Zero spam,
              pure signal.
            </p>

            <div className="hero-cta">
              <button type="button" className="btn btn-primary" onClick={() => navigate('/jobs')}>
                Browse roles
              </button>
              <button type="button" className="btn btn-ghost" onClick={() => navigate('/auth/register')}>
                Join as talent
              </button>
            </div>

            <div className="hero-stats">
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <h3>{stat.value}</h3>
                  <p className="muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-card card">
            <h3>Quick search</h3>
            <JobFilters onApply={handleSearch} />
          </div>
        </div>
      </section>

      <section className="container">
        <div className="section-heading">
          <div>
            <p className="badge">New this week</p>
            <h2>Fresh drops curated for you</h2>
          </div>
          <button type="button" className="btn btn-ghost" onClick={() => navigate('/jobs')}>
            See all roles
          </button>
        </div>

        {loading ? (
          <div className="grid grid-3">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="skeleton" />
            ))}
          </div>
        ) : jobs.length ? (
          <div className="grid grid-3">
            {jobs.slice(0, 3).map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="card empty-state">
            <p>No jobs available right now. Check back soon!</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
