# InnovateMart Retail Store Sample App

This is a cloud-native, microservices-based retail store application. Through intense development, I designed, containerized, and deployed this project to AWS EKS using Terraform and GitHub Actions. Every service, every configuration, and every deployment was achieved.

---

## 🧱 Architecture Overview

The application is composed of multiple microservices, each responsible for a specific domain, and a Node.js frontend served via Nginx. All components are containerized and deployed to Kubernetes on AWS EKS.

### 🔧 Components

- **Frontend**: Node.js UI served via Nginx
- **Microservices**:
  - `carts`: manages shopping cart operations
  - `catalog`: handles product listings
  - `orders`: processes customer orders
  - `checkout`: coordinates final purchase flow
  - `payment`: simulates payment processing
  - `notification`: sends order confirmations
- **Databases**:
  - MySQL for orders
  - PostgreSQL for catalog
  - Redis for carts
  - RabbitMQ for notifications
- **Infrastructure**:
  - AWS EKS cluster provisioned via Terraform
  - GitHub Actions for CI/CD pipeline
  - Kubernetes manifests for service deployment

---

## 🚀 Deployment Workflow

### 1. **Terraform Infrastructure Setup**
- `main.tf`, `eks.tf`, `vpc.tf`, `subnets.tf`, `iam.tf`, and `gateway.tf`
- Defined VPC, subnets, security groups, IAM roles, and EKS cluster
- Used `terraform init`, `terraform plan`, and `terraform apply` to provision infrastructure
- Verified cluster access with `aws eks update-kubeconfig` and `kubectl get nodes`

### 2. **Microservices Containerization**
- Built Dockerfiles for each service manually
- Tagged and pushed images to Amazon ECR
- Verified container health locally using `docker run` and `curl`

### 3. **Kubernetes Manifests**
- Created deployment and service YAMLs for each microservice
- Configured environment variables, ports, and resource limits
- Applied manifests using `kubectl apply -f`
- Verified pods and services with `kubectl get pods`, `kubectl get svc`

### 4. **CI/CD Pipeline**
- Created `.github/workflows/deploy.yaml` from scratch
- Configured GitHub Secrets:
  - `AWS_ACCESS_KEY_ID`
  - `AWS_SECRET_ACCESS_KEY`
  - `EKS_CLUSTER_NAME`
  - `AWS_REGION`
- Workflow steps:
  - Checkout code
  - Configure AWS credentials
  - Setup `kubectl`
  - Update kubeconfig
  - Apply Kubernetes manifests

### 5. **Frontend Integration**
- Developed UI in Node.js using Express
- Linked API endpoints via environment variables
- Configured Nginx with custom `default.conf`
- Deployed UI to EKS using `ui-deployment.yaml`

---

## 🧪 Local Development

During development, I ran the Node.js frontend locally on `localhost:3000`, which allowed me to verify layout, API connectivity, and theme switching. I manually configured environment variables to point to either local or remote microservices depending on the test scenario.

I also tested individual microservices using `docker run` and `curl`, ensuring each service responded correctly before integrating them into the Kubernetes cluster. This helped me isolate issues early and confirm that each container was production-ready before deployment.

---

## 📁 Project Structure
innovatemart-retail-store/
├── src/                          # Source code for all services
│   ├── ui/                       # Node.js frontend served via Nginx
│   ├── carts/                    # Microservice for shopping cart operations
│   ├── catalog/                  # Microservice for product listings
│   ├── orders/                   # Microservice for order processing
│   ├── checkout/                 # Microservice for checkout flow
│   ├── payment/                  # Microservice for payment simulation
│   └── notification/            # Microservice for sending notifications
│
├── terraform/                   # Infrastructure as Code (IaC)
│   ├── main.tf                  # Terraform entry point
│   ├── eks.tf                   # EKS cluster configuration
│   ├── vpc.tf                   # VPC setup
│   ├── subnets.tf               # Subnet definitions
│   ├── iam.tf                   # IAM roles and policies
│   └── gateway.tf               # Internet gateway and routing
│
├── kubernetes/                  # Kubernetes deployment manifests
│   ├── carts-deployment.yaml
│   ├── catalog-deployment.yaml
│   ├── orders-deployment.yaml
│   ├── checkout-deployment.yaml
│   ├── payment-deployment.yaml
│   ├── notification-deployment.yaml
│   ├── mysql-deployment.yaml
│   ├── postgres-deployment.yaml
│   ├── redis-deployment.yaml
│   ├── rabbitmq-deployment.yaml
│   └── ui-deployment.yaml
│
├── .github/                     # GitHub Actions CI/CD pipeline
│   └── workflows/
│       └── deploy.yaml          # Workflow for EKS deployment
│
└── README.md                    # Personalized project documentation


---

## 🧠 Lessons Learned

- Mastered Terraform modules and AWS IAM roles
- Debugged Kubernetes networking and service exposure
- Built a secure CI/CD pipeline with GitHub Actions
- Handled Git authentication, submodule issues, and token-based access
- Gained confidence in cloud-native architecture and DevOps workflows
- Learned to troubleshoot real-world deployment errors under pressure

---

## 👤 Author

Oladoye Toyeeb
Built for academic submission and personal growth
Location: Lagos State, Nigeria
Date: September 2025
