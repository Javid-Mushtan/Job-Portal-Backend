## 📂 Project Structure

job-portal-application-backend
│
├── src
│   └── main
│       ├── java
│       │   └── com
│       │       └── project
│       │           └── job_portal_backend
│       │               ├── controller        # REST controllers: handle API requests/responses
│       │               ├── service           # Business logic: process data & rules
│       │               ├── repository        # Data access layer: interfaces to database
│       │               ├── model             # JPA entities: database table mappings
│       │               ├── dto
│       │               │   ├── request       # Request DTOs: objects for API inputs
│       │               │   └── response      # Response DTOs: objects for API outputs
│       │               ├── security          # JWT & Spring Security configuration
│       │               ├── config            # Application configuration: beans, ObjectMapper, etc.
│       │               └── JobPortalBackendApplication.java  # Main Spring Boot application
│       │
│       └── resources
│           ├── application.properties        # Database, server, JWT, and app configurations
│           └── static                        # Static resources (if needed)
│
└── pom.xml                                  # Maven project dependencies


---

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register`
- `POST /api/auth/login`

### Job Management
- `GET /api/jobs`
- `POST /api/jobs`
- `PUT /api/jobs/{jobId}`
- `DELETE /api/jobs/{jobId}`

### Job Applications
- `POST /api/applications/apply`
- `GET /api/applications/my-applications`
- `GET /api/applications/job/{jobId}`
- `PUT /api/applications/{applicationId}/status`
- `POST /api/applications/{applicationId}/interview`

---

## ⚙️ Configuration

### Application Properties
Configure the database, server, and JWT settings in `application.properties`.

- Server port and context path
- Database connection (PostgreSQL/MySQL)
- JPA & Hibernate settings
- JWT secret key and expiration time

---

## ▶️ Running the Application

1. Clone the repository  
2. Configure database credentials in `application.properties`  
3. Build the project using Maven  
4. Run the Spring Boot application  

```bash
mvn clean install
mvn spring-boot:run

Main URI >> http://localhost:8081/api

 🧪 Validation & Error Handling

    >Request validation using @Valid
    >Centralized exception handling
    >Standardized API responses using a common response wrapper
