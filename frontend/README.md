# Job Portal Frontend

This React + Vite single-page application is tailored for the Spring Boot Job Portal backend (`/api` context path). It provides role-aware experiences for job seekers and employers.

## High-level architecture

- **Routing:** React Router v6 organizes public routes (`/`, `/jobs`, `/jobs/:id`, `/auth/login`, `/auth/register`) and protected routes under `/dashboard`.
- **State & Auth:** A lightweight `AuthContext` persists the JWT token and user metadata in `localStorage`, exposes helper hooks, and guards protected pages.
- **API layer:** `src/api/client.js` configures Axios with a base URL (`/api` by default) and attaches the `Authorization` header when a token exists. Feature-specific service modules (`jobs.js`, `applications.js`, `companies.js`, `auth.js`, `users.js`) encapsulate HTTP calls that map directly to backend controllers.
- **UI system:** Shared components (layout shell, filter controls, job cards, charts/widgets) live under `src/components`. Styling uses CSS modules + global tokens for colors, spacing, and typography.
- **Dashboards:**
  - *Job seeker:* view profile, browse/apply to jobs, monitor submitted applications.
  - *Employer:* manage company profile, publish jobs, track applicants.

## Backend endpoint alignment

| Backend controller | Frontend usage |
| --- | --- |
| `AuthController` (`POST /api/auth/login`, `/register`) | Login & registration forms |
| `CompanyController` (`/api/companies/...`) | Employer dashboard company profile |
| `JobService` (expected `/api/jobs/**`) | Job listing, search, detail, CRUD |
| `ApplicationController` (`/api/applications/...`) | Applying, viewing applications, updating statuses |
| `UserController` (`/api/users/...`) | Profile view & updates |

## Development scripts

```bash
npm install
npm run dev   # http://localhost:5173
npm run build
npm run preview
```

`vite.config.js` proxies `/api` to `http://localhost:8081` to match the backend's port and context-path settings.
