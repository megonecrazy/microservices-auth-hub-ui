# React Frontend: Event-Driven Microservices Auth Platform

This is the frontend application built with React and Vite for the Event-Driven Microservices Auth Platform. It provides a seamless user interface for account registration, email OTP verification, and secure login, directly integrating with the backend API Gateway.

## Architecture & Integration

This frontend is designed to communicate with the Spring Boot microservices backend, deployed either locally via Docker or in a Kubernetes cluster.

- **Ingress Connection**: When deployed or tested against Kubernetes, the application connects to the backend API Gateway via an Ingress domain. The local domain is configured as `http://myapp.local`.
- **Auth Workflow**:
  - **Register**: The user submits their details. The frontend hits `/auth/register` via the Gateway, which triggers the backend Auth Service to publish a Kafka event, causing the Notification Service to email a 6-digit OTP.
  - **Verify OTP**: The user enters the OTP on the frontend, which submits it to `/auth/verify` to activate the account.
  - **Login**: The user logs in via `/auth/login`. The frontend receives a JWT and attaches it as an `Authorization: Bearer <token>` header for subsequent requests to protected routes.

## Screenshots

### Login Screen
![Login Screen](./screenshots/login.png)
*Entering credentials to authenticate and retrieve the JWT token.*

### Registration Screen
![Registration Screen](./screenshots/registration.png)
*Creating a new account. This triggers the asynchronous email dispatch on the backend.*

### OTP Verification Screen
![OTP Screen](./screenshots/otp.png)
*Entering the 6-digit OTP received via email to verify the account.*

## Getting Started Locally

### Prerequisites
- Node.js (v16+ recommended)
- The backend infrastructure running (via Minikube/Kubernetes mapped to `myapp.local` or Docker Compose mapped to `localhost:8080`).

### Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Configuration:**
   Ensure your `.env` connects to the proper API base point. For Kubernetes ingress testing, ensure your system's `hosts` file maps `myapp.local` to your Minikube IP.

3. **Run the Development Server:**
   ```bash
   npm run dev
   ```
