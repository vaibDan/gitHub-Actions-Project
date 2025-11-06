# Node.js Production-Grade CI/CD Pipeline to AWS

![CI/CD Pipeline](https://github.com/vaibDan/gitHub-Actions-Project/actions/workflows/ci-cd.yml/badge.svg)


This repository serves as a comprehensive demonstration of a modern, production-grade CI/CD pipeline for a Node.js (Express) application using GitHub Actions and AWS. The entire workflow is automated, following best practices for validation, testing, containerization, and secure cloud deployment.

## 🚀 Project Overview

The goal of this project is to build and showcase a robust, secure, and efficient automated software delivery lifecycle. The pipeline is broken down into four distinct, dependent stages: **Validate -> Test -> Build -> Deploy**.

### Core Technologies & Principles Demonstrated

*   **CI/CD:** GitHub Actions
*   **Application:** Node.js, Express.js
*   **Testing:** Jest, Supertest
*   **Containerization:** Docker
*   **Cloud Provider:** Amazon Web Services (AWS)
*   **Deployment Target:** AWS ECS (Elastic Container Service) with Fargate
*   **Infrastructure Setup:** AWS CLI / Terraform (Optional)
*   **Security:** OpenID Connect (OIDC) for secure, passwordless authentication between GitHub Actions and AWS.

---

## Workflow Breakdown

The CI/CD pipeline is defined in `.github/workflows/ci-cd.yml` and consists of four sequential jobs. A failure at any stage will halt the pipeline to prevent promotion of faulty code.

### 1. 🕵️ Validate

*   **Description:** This job acts as a quality gate to ensure code meets style and quality standards before any tests are run.
*   **Tooling:** **Super-Linter**, a comprehensive linter from GitHub that validates multiple file types.
*   **Optimization:** The job is optimized using a cached, slim version of the Super-Linter Docker image, reducing execution time from over 2 minutes to under 30 seconds. This is achieved using `docker/build-push-action` with the `gha` cache backend.

### 2. 🧪 Test

*   **Description:** This job performs automated testing on the application to ensure its logic is correct and endpoints are functioning as expected.
*   **Tooling:**
    *   **Jest:** A powerful JavaScript testing framework.
    *   **Supertest:** An agent for testing Node.js HTTP servers.
*   **Best Practices:**
    *   Uses `npm ci` for fast, reliable, and reproducible dependency installation.
    *   Generates both a **JUnit XML test report** and a **Code Coverage report** on every run.
    *   Uploads these reports as artifacts for traceability and manual inspection.

### 3. 📦 Build

*   **Description:** This job containerizes the application, creating a portable and scalable Docker image. This job only runs on pushes to the `main` branch.
*   **Tooling:** **Docker**
*   **Best Practices:**
    *   **Multi-Stage Dockerfile:** The `Dockerfile` uses a multi-stage build to create a small, secure, and optimized final image. It separates build-time dependencies from runtime dependencies.
    *   **Security:** The final image runs as a non-root user and includes a `HEALTHCHECK` instruction, which are critical security and operational best practices.
    *   **Docker Layer Caching:** The job is heavily optimized using the GitHub Actions cache (`type=gha`) to store Docker layers, resulting in significantly faster build times for subsequent runs.

### 4. 🚀 Deploy

*   **Description:** This job securely deploys the newly built Docker image to the cloud. This job only runs on pushes to the `main` branch.
*   **Tooling:** **AWS CLI**, **AWS ECS Fargate**
*   **Security & Best Practices:**
    *   **Passwordless OIDC Deployment:** Authenticates with AWS using a secure OpenID Connect (OIDC) trust relationship. This avoids storing long-lived `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` in GitHub Secrets.
    *   **Dynamic Task Definition:** The workflow dynamically fetches the latest active ECS Task Definition from AWS, injects the new Docker image URI, and registers a new revision. This ensures the deployment is always based on the most current infrastructure configuration.
    *   **Zero-Downtime Deployment:** The ECS service is updated, which triggers a rolling deployment to seamlessly transition traffic to the new container version without any downtime.

---

## Infrastructure

The AWS infrastructure required for this project includes:
*   **Amazon ECR (Elastic Container Registry):** A private registry to store our Docker images.
*   **Amazon ECS (Elastic Container Service):**
    *   An ECS Cluster to host our services.
    *   An ECS Task Definition to serve as a blueprint for our application.
    *   An ECS Service to manage and run our application containers using the serverless Fargate launch type.

This infrastructure was provisioned using the **AWS CLI** (or optionally, **Terraform** for an Infrastructure as Code approach).

---

## How to Run Locally

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/vaibDan/gitHub-Actions-Project.git
    cd gitHub-Actions-Project
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the application:**
    ```bash
    npm start
    ```

4.  **Run tests locally:**
    ```bash
    npm test
    ```

5.  **Run the linter locally (requires Docker):**
    ```bash
    docker run --rm \
      -e RUN_LOCAL=true \
      -v "$(pwd)":/tmp/lint \
      github/super-linter:v5
    ```
