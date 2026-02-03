import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import Home from './pages/Home.jsx';
import Jobs from './pages/Jobs.jsx';
import JobDetail from './pages/JobDetail.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import NotFound from './pages/NotFound.jsx';
import ProtectedRoute from './components/auth/ProtectedRoute.jsx';
import RoleGate from './components/auth/RoleGate.jsx';
import DashboardLayout from './pages/Dashboard/DashboardLayout.jsx';
import DashboardOverview from './pages/Dashboard/Overview.jsx';
import DashboardApplications from './pages/Dashboard/Applications.jsx';
import DashboardEmployerJobs from './pages/Dashboard/EmployerJobs.jsx';
import DashboardJobForm from './pages/Dashboard/JobForm.jsx';
import DashboardProfile from './pages/Dashboard/Profile.jsx';

const App = () => (
  <Layout>
    <Routes>
      <Route index element={<Home />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/jobs/:id" element={<JobDetail />} />

      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={(
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        )}
      >
        <Route index element={<DashboardOverview />} />
        <Route path="overview" element={<DashboardOverview />} />
        <Route path="profile" element={<DashboardProfile />} />
        <Route
          path="applications"
          element={(
            <RoleGate roles={["ROLE_JOB_SEEKER"]}>
              <DashboardApplications />
            </RoleGate>
          )}
        />
        <Route
          path="jobs"
          element={(
            <RoleGate roles={["ROLE_EMPLOYER", "ROLE_ADMIN"]}>
              <DashboardEmployerJobs />
            </RoleGate>
          )}
        />
        <Route
          path="jobs/new"
          element={(
            <RoleGate roles={["ROLE_EMPLOYER", "ROLE_ADMIN"]}>
              <DashboardJobForm mode="create" />
            </RoleGate>
          )}
        />
        <Route
          path="jobs/:jobId/edit"
          element={(
            <RoleGate roles={["ROLE_EMPLOYER", "ROLE_ADMIN"]}>
              <DashboardJobForm mode="edit" />
            </RoleGate>
          )}
        />
      </Route>

      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  </Layout>
);

export default App;
