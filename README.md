# InnovateMart Enterprise Retail Infrastructure

A high-availability, cloud-native microservices architecture deploying an e-commerce platform onto AWS Elastic Kubernetes Service (EKS). This project demonstrates modern GitOps workflows, zero-trust infrastructure provisioning via Terraform (IaC), state persistence in multi-engine database environments, and secure automated continuous delivery (CD) pipelines.

## 🧱 Architecture & Component Breakdown

The infrastructure isolates the application layers into highly decoupled microservices communicating asynchronously over a message broker and storing state across dedicated transactional and caching database engines.

[ Ingress / AWS ALB ]
                        │
                [ Nginx Frontend ]
                        │
     ┌──────────────────┼──────────────────┐
     ▼                  ▼                  ▼
[ Carts Service ]  [ Catalog Service ] [ Orders Service ]
│                  │                  │
(Redis)          (PostgreSQL)          (MySQL)
│
▼
[ RabbitMQ ]
│
▼
[ Notification Service ]


### 🔧 Core Components
* **Routing & Frontend:** Node.js UI optimized and reverse-proxied via an **Nginx** container layer.
* **Microservices Layer:**
  * `carts`: High-throughput in-memory state tracking.
  * `catalog` & `orders`: Transactional inventory and customer booking workflows.
  * `checkout` & `payment`: Secure payment simulation and orchestration flows.
  * `notification`: Event-driven background tasks.
* **Data & Messaging Tier (StatefulSets / Persistent Volumes):**
  * **Redis**: Distributed in-memory caching engine for active shopping carts.
  * **PostgreSQL & MySQL**: Relational engines managing catalog indices and order ledgers with localized database schemas.
  * **RabbitMQ**: AMQP message broker handling asynchronous, decoupled service coordination.

---

## 🚀 Infrastructure & Deployment Workflow

### 1. Automated Infrastructure as Code (Terraform)
The underlying cloud topology is declared entirely via declarative configuration blueprints (`main.tf`, `eks.tf`, `vpc.tf`, `subnets.tf`, `iam.tf`, `gateway.tf`) ensuring immutable infrastructure deployments:
* **Network Isolation:** Custom multi-AZ VPC featuring isolated Public and Private subnets mapping explicitly to NAT Gateways to prevent direct internet exposure of data tiers.
* **Identity & Access Management:** Granular IAM execution roles leveraging AWS OIDC provider integrations to achieve native IAM Roles for Service Accounts (IRSA), enforcing the principle of least privilege.
* **Compute Provisioning:** AWS EKS Cluster configurations using managed node groups with targeted scaling parameters to absorb traffic spikes.

### 2. Containerization & Registry Hardening
* Hand-crafted, multi-stage `Dockerfiles` optimized for minimal image sizes and reduced attack surfaces.
* Automated tagging, version control serialization, and secure transport up to **Amazon Elastic Container Registry (ECR)**.

### 3. Kubernetes Orchestration & Manifest Engineering
* **State Management:** Database components leverage native Kubernetes storage primitives via `PersistentVolumeClaims` to guarantee persistent data lifecycles independent of Pod restarts.
* **Traffic Routing:** Internal service-to-service communication is orchestrated securely using internal ClusterIP definitions and standard Kube-DNS resolution patterns.
* **Resource Controls:** Strict application of resource `requests` and `limits` (CPU and Memory limits) across all deployment manifests to prevent noisy-neighbor syndromes and maximize node efficiency.

### 4. GitOps Automated CD Pipeline
Continuous deployment workflows are orchestrated directly through **GitHub Actions** via `.github/workflows/deploy.yaml`. 
* **Secrets Management:** Critical infrastructure contexts (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, cluster configurations) are protected out-of-band utilizing GitHub Encrypted Secrets.
* **Pipeline Execution:** 1. Triggered on authenticated branch lifecycle changes.
  2. Assumes programmatic AWS identities safely.
  3. Updates localized `kubeconfig` binary environments securely.
  4. Applies structural manifest changes idempotently via `kubectl apply`.

---

## 📁 Repository Structure

```text
innovatemart-retail-store/
├── src/                         # Decoupled microservice source layers
│   ├── ui/                      # Express-based UI layer containerized via Nginx
│   ├── carts/                   # Shopping cart logic (Redis dependent)
│   ├── catalog/                 # Inventory management (Postgres dependent)
│   ├── orders/                  # Order entry engine (MySQL dependent)
│   └── [checkout/payment/notification]
├── terraform/                   # Infrastructure as Code (IaC) definitions
│   ├── main.tf                  # Infrastructure entrypoint
│   ├── eks.tf                   # EKS managed cluster parameters
│   └── [vpc.tf / subnets.tf / iam.tf / gateway.tf]
└── kubernetes/                  # Declarative configuration manifests
    ├── deployments/             # Stateless microservice specifications
    └── stateful/                # Storage and stateful database engines
🛡️ Production Hardening & Operational Standards
Secrets Protection: Stripped out plaintext secrets, refactoring environment variable management entirely through programmatic configuration hooks and injected variables.

Network Security boundaries: Closed off all unnecessary public ingress ports; application layers communicating inside the private subnets are isolated securely behind network access controls.

Fault Isolation: Decoupled critical database components from application processes using RabbitMQ message buffers to ensure high availability and prevent cascade failures during localized load surges.

👤 Maintainer
Oladoye Toyeeb

Role: Cloud Infrastructure & DevSecOps Engineer

Location: Lagos, Nigeria
