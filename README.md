🌐 Job Portal Application

A modern Job Portal Application built with Spring Boot for the backend and a clean blue & white user interface for the frontend.
This system connects job seekers, employers, and administrators through a secure and scalable platform.

✨ Highlights

🎨 Clean & modern blue-white UI

🔐 Secure JWT authentication

👤 Role-based access control

💼 Job posting & application management

📅 Interview scheduling support

⚡ RESTful API architecture

🧩 System Roles
👨‍💼 Admin

Manage users and roles

Monitor jobs and applications

Full system access

🏢 Employer

Post and manage job vacancies

View job applications

Update application status

Schedule interviews

👨‍🎓 Job Seeker

Register and log in

Browse available jobs

Apply for jobs

Track application status

🖥️ Frontend Overview

Blue & white themed design

Card-based job listings

Responsive layout

Clean typography and spacing

User-friendly navigation

The frontend is designed to be simple, elegant, and easily extendable to React or Angular.

⚙️ Backend Overview

RESTful APIs built with Spring Boot

Secure authentication using JWT

Business logic handled via service layers

Clean DTO-based request/response structure

Java Time support using LocalDateTime

🛠️ Technology Stack
Backend

Java 17+

Spring Boot

Spring Security

JWT Authentication

Spring Data JPA

Hibernate

ModelMapper

Jackson (JavaTimeModule)

Database

PostgreSQL / MySQL

Frontend

HTML5

CSS3 (Blue & White Theme)

Tools

Maven

Swagger (OpenAPI)

Lombok

Git & GitHub

📂 Project Structure
job-portal-application
│
├── backend
│   └── src/main/java/com/project/job_portal_backend
│       ├── controller
│       ├── service
│       ├── repository
│       ├── model
│       ├── dto
│       ├── security
│       └── config
│
└── frontend
    ├── index.html
    └── style.css

🔑 Core API Endpoints
Authentication

POST /api/auth/register

POST /api/auth/login

Jobs

GET /api/jobs

POST /api/jobs

PUT /api/jobs/{id}

DELETE /api/jobs/{id}

Applications

POST /api/applications/apply

GET /api/applications/my-applications

GET /api/applications/job/{jobId}

PUT /api/applications/{id}/status

POST /api/applications/{id}/interview

🚀 Getting Started

Clone the repository

Configure database and JWT properties

Run the backend using Maven

Open the frontend in a browser

Access APIs via Swagger UI

🔮 Future Enhancements

Resume upload support

Email notifications

Advanced job search & filters

Employer dashboard

React-based frontend

Cloud deployment

👨‍💻 Author

Javid Mushtan
Job Portal Application
Spring Boot Backend & Modern UI
