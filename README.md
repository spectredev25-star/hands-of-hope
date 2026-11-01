# Hands of Hope

### Connecting people, resources, and communities through accountable technology.

Hands of Hope is a social-impact platform designed to improve how individuals access assistance and how charitable resources are coordinated, reviewed, collected, and distributed.

The platform connects beneficiaries, charitable organizations, and administrators through a structured digital workflow. It aims to make assistance easier to access while improving resource coordination, transparency, and accountability.

**Team:** Transformative Creatives  
**Project type:** Social Impact / Full-Stack Web Application  
**Development status:** MVP Development  
**Deployment:** [Hands of Hope](https://hands-of-hope.vercel.app/)

---

## Table of Contents

- [Overview](#overview)
- [The Problem](#the-problem)
- [Our Solution](#our-solution)
- [Core User Roles](#core-user-roles)
- [Core Features](#core-features)
- [Current Implementation Status](#current-implementation-status)
- [System Architecture](#system-architecture)
- [Core Workflows](#core-workflows)
- [Database Architecture](#database-architecture)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Security and Data Integrity](#security-and-data-integrity)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Development Commands](#development-commands)
- [Development Roadmap](#development-roadmap)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [Team](#team)
- [License](#license)

---

## Overview

Accessing essential assistance can be difficult when information is scattered across different channels, resource providers operate independently, and distribution processes depend on manual coordination.

Hands of Hope provides a centralized platform for managing the assistance journey, from resource contributions and beneficiary requests to collection coordination and distribution records.

The platform is built around three principles:

- **Accessibility:** Make available assistance and resources easier to discover.
- **Transparency:** Provide clear request statuses and structured review processes.
- **Accountability:** Maintain traceable records of contributions, inventory, approvals, and distributions.

The goal is to create a reliable connection between people who need assistance, organizations willing to provide resources, and the team responsible for coordinating their distribution.

## The Problem

Community assistance involves multiple stakeholders, including beneficiaries, charitable organizations, volunteers, and administrators.

Without a centralized system, these stakeholders may encounter:

- Limited visibility into available resources.
- Unclear procedures for requesting assistance.
- Difficulty coordinating contributions from different organizations.
- Poor visibility into collection and inspection processes.
- Inconsistent inventory records.
- Difficulty tracking approved assistance through final distribution.
- Limited accountability when resources are handled manually.

Hands of Hope addresses these challenges by introducing a structured digital workflow that connects resource providers, beneficiaries, and administrators.

## Our Solution

Hands of Hope introduces a centralized resource and assistance management platform.

The intended process follows five major stages:

1. **Contribute:** Organizations submit information about resources they want to donate.
2. **Collect and Inspect:** Hands of Hope coordinates collection, inspects received resources, and accepts eligible contributions.
3. **Discover and Request:** Beneficiaries explore available resources and submit assistance requests.
4. **Review and Approve:** Authorized administrators review requests and coordinate resource allocation.
5. **Distribute and Record:** Approved assistance is prepared for collection, verified, and recorded after handover.

An important distinction is maintained throughout the workflow:

Submitting a contribution does not mean it has been accepted into inventory. Similarly, submitting an assistance request does not mean it has been approved, and approval does not automatically mean assistance has been received.

---

## Core User Roles

The application uses role-based access control to separate user responsibilities.

| Role | Responsibilities |
|---|---|
| Beneficiary | Discover available resources, submit assistance requests, and track request progress. |
| Organization | Submit resource contributions, provide collection information, and monitor contribution progress. |
| Administrator | Review contributions, coordinate collections, manage inventory, review assistance requests, and oversee distribution. |

### 1. Beneficiary

Beneficiaries are individuals seeking assistance.

Their intended dashboard provides access to:

- Personal profile management.
- Available resources.
- Assistance request submission.
- Request history and status tracking.
- Collection and distribution information where applicable.

### 2. Organization

Organizations are resource providers that contribute items or services to the Hands of Hope system.

The organization dashboard provides:

- Organization account information.
- Profile and contact management.
- Profile image upload.
- Contribution submission.
- Contribution history and status tracking.
- Collection-related information as the collection workflow is completed.

Organizations cannot independently approve beneficiary requests or modify inventory acceptance and distribution records.

### 3. Administrator

Administrators coordinate the platform's operational activities.

Administrative responsibilities include:

- Reviewing submitted contributions.
- Scheduling resource collections.
- Recording collected quantities.
- Inspecting and accepting or rejecting contributions.
- Managing available inventory.
- Reviewing beneficiary assistance requests.
- Approving or rejecting requests.
- Coordinating allocations and distribution.
- Maintaining operational and audit records.

Privileged actions must be enforced by server-side authorization and database policies.

---

## Core Features

### 1. Authentication and User Management

The application uses Supabase Authentication to manage user identity.

The authentication foundation supports:

- User registration.
- Login and logout.
- Session management.
- User-specific profiles.
- Role-based dashboard access.

New accounts are assigned an application role through the authentication and profile creation workflow.

Administrative privileges must be assigned through a controlled administrative process, not through unrestricted public registration.

### 2. Organization Contribution Management

Organizations can submit resources they intend to donate.

Each contribution captures:

- Resource or item name.
- Category.
- Description.
- Quantity.
- Unit of measurement.
- Pickup address.
- Submission date.
- Current contribution status.

Organizations can view their own contribution history and follow the progress of submitted resources.

The contribution workflow includes:

`Submitted → Collection Scheduled → Collected → Inspecting → Accepted / Rejected`

Only resources that have been received and accepted by Hands of Hope should enter the available inventory.

### 3. Collection Coordination

Collection coordination connects submitted contributions with the Hands of Hope collection process.

The planned collection record includes:

- Contribution reference.
- Scheduled collection date and time.
- Collection address.
- Contact person.
- Contact phone number.
- Collection status.
- Collection notes.
- Completion information.

Collection statuses include:

- `scheduled`
- `in_progress`
- `completed`
- `cancelled`

This separates an organization's initial contribution submission from the actual collection and receipt of resources.

### 4. Resource and Inventory Management

The inventory system maintains records of resources accepted by Hands of Hope.

Resource information includes:

- Resource name.
- Description.
- Category.
- Image URL.
- Available quantity.
- Unit.
- Active or inactive status.

Supported resource categories include:

- Food.
- Clothing.
- Education.
- Household essentials.
- Health.
- Other.

Inventory quantities should reflect accepted resources and authorized allocations or distributions, rather than simply the quantities organizations initially submit.

### 5. Beneficiary Assistance Requests

Beneficiaries will be able to submit structured assistance requests.

The intended workflow includes:

- Browsing available resources.
- Selecting resources relevant to their needs.
- Submitting an assistance request.
- Tracking request progress.
- Receiving information about approval and collection.

Request statuses include:

- `pending_review`
- `approved`
- `preparing`
- `ready_for_collection`
- `completed`
- `rejected`
- `expired`
- `cancelled`

### 6. Request Review and Allocation

Administrators review submitted assistance requests and make decisions based on available resources and operational requirements.

The workflow separates:

- Request submission.
- Request review.
- Approval or rejection.
- Resource allocation.
- Preparation.
- Collection readiness.
- Completion.

An approved request must not automatically be treated as completed.

### 7. QR-Based Distribution Verification

QR-based verification is part of the planned distribution workflow.

The intended system will:

- Generate a unique authorization for an approved allocation.
- Associate the authorization with the relevant distribution record.
- Validate the authorization at the distribution centre.
- Confirm the handover through an authorized staff action.
- Prevent the same authorization from being redeemed more than once.
- Retain records of completed distribution activities.

A QR scan alone does not confirm that assistance has been received. Successful verification and an explicit handover confirmation are required.

### 8. Organization Profile Management

Organizations can manage their account contact information.

The profile interface includes:

- Contact person's name.
- Account email.
- Contact phone.
- Organization information.
- Verification status.
- Organization profile image.

Profile images are stored using Supabase Storage, with supported image formats and upload restrictions.

Registered organization information and verification status are controlled by authorized personnel.

---

## Current Implementation Status

The project is being developed incrementally. The following table distinguishes existing implementation from workflows still being completed.

| Feature | Status |
|---|---|
| Landing page and responsive interface | Implemented |
| Light and dark theme support | Implemented |
| Authentication foundation | Implemented |
| Supabase client integration | Implemented |
| User profile and role foundation | Implemented |
| Role-protected dashboard layouts | Implemented |
| Organization dashboard | Implemented |
| Organization contribution form | Implemented |
| Organization contribution history | Implemented |
| Contribution submission API | Implemented |
| Organization profile page | Implemented |
| Organization profile image upload | Implemented in code; Storage setup required |
| Contribution collection scheduling | Database function and data model prepared; interface integration in progress |
| Collection progress interface | In progress |
| Resource inventory management | Database foundation implemented; complete workflow in progress |
| Beneficiary resource discovery | In progress |
| Beneficiary assistance request workflow | In progress |
| Administrator contribution management | In progress |
| Administrator request review | In progress |
| Allocation management | In progress |
| QR distribution verification | Planned |
| Hardware prototype integration | Planned |
| Advanced recommendations and analytics | Future improvement |

**Implementation note:** The existence of a database table, route, or interface does not necessarily mean its entire business workflow has been completed or tested. Features should only be marked complete after their relevant integration and validation.

---

## System Architecture

Hands of Hope uses a full-stack web application architecture built around Next.js and Supabase.

The frontend, application services, authentication, authorization, and persistent database are organized to separate presentation responsibilities from sensitive business operations.

### High-Level Architecture

```text
                    USERS
                      |
                      v
              NEXT.JS APPLICATION
               React + TypeScript
                      |
          +-----------+-----------+
          |                       |
          v                       v
    PRESENTATION LAYER      APPLICATION LAYER
    ------------------      -----------------
    Landing Page            API Routes
    Authentication          Server Actions
    Beneficiary UI          Server Components
    Organization UI         Validation
    Admin UI                Business Logic
          |                       |
          +-----------+-----------+
                      |
                      v
               SUPABASE SERVICES
          +-----------+-----------+
          |                       |
          v                       v
    SUPABASE AUTH          SUPABASE STORAGE
    User Identity          Profile Images
    Sessions               Uploaded Assets
          |
          v
    AUTHORIZATION
    Server-Side Checks
    Row Level Security
          |
          v
       POSTGRESQL
          |
    +-----+------+----------------+
    |            |                |
    v            v                v
  PROFILES   CONTRIBUTIONS   ASSISTANCE
  USERS      COLLECTIONS     REQUESTS
             RESOURCES
             INVENTORY
             DISTRIBUTIONS
             AUDIT LOGS
```

### Architecture Responsibilities

**Frontend layer**

Responsible for:

- User interfaces.
- Navigation.
- Form handling.
- Theme management.
- Responsive layouts.
- User feedback and interaction.

**Application layer**

Responsible for:

- Authenticated API requests.
- Server-side validation.
- Role checks.
- Contribution processing.
- Collection coordination.
- Administrative operations.
- Secure interaction with Supabase.

**Supabase layer**

Responsible for:

- User authentication.
- PostgreSQL data storage.
- Row Level Security.
- Storage for uploaded profile images.

**Database layer**

Responsible for:

- Persistent application records.
- Relationships between users and organizations.
- Contribution and inventory records.
- Assistance requests.
- Distribution records.
- Audit history.

---

## Core Workflows

### Organization Contribution Workflow

```text
ORGANIZATION
     |
     v
Submit Contribution
     |
     v
Contribution Status: SUBMITTED
     |
     v
ADMIN REVIEW
     |
     v
Schedule Collection
     |
     v
COLLECTION PROCESS
     |
     v
Record Collected Quantity
     |
     v
INSPECTION
     |
     +----------------------+
     |                      |
     v                      v
  ACCEPTED               REJECTED
     |                      |
     v                      v
Create Inventory       Record Outcome
Resource
     |
     v
Available Resources
```

### Beneficiary Assistance Workflow

```text
BENEFICIARY
     |
     v
Browse Available Resources
     |
     v
Submit Assistance Request
     |
     v
PENDING REVIEW
     |
     v
ADMIN REVIEW
     |
     +----------------------+
     |                      |
     v                      v
  APPROVED               REJECTED
     |
     v
RESOURCE ALLOCATION
     |
     v
PREPARATION
     |
     v
READY FOR COLLECTION
     |
     v
QR AUTHORIZATION
     |
     v
VERIFY AND CONFIRM HANDOVER
     |
     v
COMPLETED
```

---

## Database Architecture

The application uses PostgreSQL through Supabase.

The database is designed around relational records that connect users, organizations, resources, contributions, requests, and distributions.

### Main Tables

| Table | Purpose |
|---|---|
| `profiles` | Application user profiles and role information. |
| `organizations` | Organization-specific information linked to user profiles. |
| `resources` | Available resources and inventory quantities. |
| `contributions` | Resources submitted by organizations. |
| `contribution_collections` | Collection schedules and collection progress. |
| `assistance_requests` | Beneficiary assistance requests. |
| `assistance_request_items` | Individual resources associated with requests. |
| `distributions` | Records of assistance prepared for distribution. |
| `distribution_authorizations` | QR authorization and redemption information. |
| `audit_logs` | Records of relevant operational actions. |

### Important Relationships

```text
AUTH USERS
    |
    | 1:1
    v
PROFILES
    |
    | 1:0..1
    v
ORGANIZATIONS
    |
    | 1:M
    v
CONTRIBUTIONS
    |
    | 1:0..1
    v
CONTRIBUTION COLLECTIONS

CONTRIBUTIONS
    |
    | accepted contribution
    v
RESOURCES
    |
    | allocated to requests
    v
ASSISTANCE REQUEST ITEMS
    |
    v
ASSISTANCE REQUESTS
    |
    v
DISTRIBUTIONS
    |
    v
DISTRIBUTION AUTHORIZATIONS
```

The database also uses constraints, foreign keys, and triggers to maintain data relationships and support consistent updates.

### Inventory Principle

Submitted contributions are not automatically available to beneficiaries.

Inventory is created or updated through the authorized acceptance process after collection and inspection.

This ensures that the platform does not advertise resources that have not actually been received and accepted.

---

## Technology Stack

| Technology | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org/) | Full-stack React framework and application routing |
| [React 19](https://react.dev/) | Component-based user interface |
| [TypeScript](https://www.typescriptlang.org/) | Static typing and maintainable application code |
| [Tailwind CSS 4](https://tailwindcss.com/) | Responsive styling and design system |
| [shadcn/ui](https://ui.shadcn.com/) | Reusable and customizable UI components |
| [Motion for React](https://motion.dev/) | Interface transitions and animations |
| [Lucide React](https://lucide.dev/) | Interface icons |
| [Supabase](https://supabase.com/) | Authentication, database access, and storage |
| [PostgreSQL](https://www.postgresql.org/) | Relational database |
| [Vercel](https://vercel.com/) | Application hosting and deployment |
| Git and GitHub | Version control and team collaboration |

---

## Project Structure

The repository follows the Next.js App Router convention.

The following structure highlights the main application areas and the organization integration currently being developed.

```text
hands-of-hope/
│
├── app/
│   │
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   │
│   ├── (beneficiary)/
│   │   └── beneficiary/
│   │       ├── dashboard/
│   │       ├── profile/
│   │       └── ...
│   │
│   ├── (organization)/
│   │   └── organization/
│   │       ├── dashboard/
│   │       ├── contributions/
│   │       │   ├── page.tsx
│   │       │   └── new/
│   │       │       └── page.tsx
│   │       ├── collection/
│   │       ├── profile/
│   │       │   ├── page.tsx
│   │       │   └── actions.ts
│   │       └── layout.tsx
│   │
│   ├── admin/
│   │
│   ├── api/
│   │   └── contributions/
│   │       └── route.ts
│   │
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── auth/
│   ├── dashboard/
│   ├── landing/
│   └── ui/
│
├── libs/
│   ├── auth/
│   │   └── authorize.ts
│   │
│   └── supabase/
│       ├── client.ts
│       └── server.ts
│
├── public/
│
├── supabase/
│   └── migrations/
│       └── 202611010001_organization_avatars.sql
│
├── .env.local
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

**Note:** This is a high-level representation of the current application structure, not an exhaustive listing of every repository file. Additional routes, components, and migrations may be introduced as the remaining workflows are implemented.

### Important Directories

- `app/`: Application routes, layouts, pages, and API endpoints.
- `components/`: Reusable UI and application components.
- `libs/auth/`: Authentication and role authorization helpers.
- `libs/supabase/`: Browser and server Supabase clients.
- `supabase/`: Database-related SQL and migrations.
- `public/`: Static assets.

---

## Security and Data Integrity

Security is a core requirement because the platform handles user profiles, assistance requests, organization information, and distribution records.

The application uses several layers of protection.

### Authentication

Supabase Authentication identifies signed-in users and manages their sessions.

### Role-Based Authorization

Protected routes and server operations verify the authenticated user's application role.

The supported application roles are:

- `beneficiary`
- `organization`
- `admin`

### Row Level Security

Supabase RLS policies restrict access to records according to the user's identity and permissions.

Examples include:

- Beneficiaries accessing their own assistance requests.
- Organizations accessing their own contribution records.
- Administrators accessing authorized operational records.

### Server-Side Validation

Sensitive operations must be validated on the server.

The client must never be trusted to decide:

- Its own role.
- Which organization it represents.
- Whether a contribution has been accepted.
- Whether a request has been approved.
- Whether a distribution is complete.

### Secure Inventory Updates

Inventory changes must follow authorized acceptance, allocation, and distribution operations.

### QR Authorization

Distribution authorizations must be validated server-side and redeemed atomically to prevent duplicate handovers.

### Secret Management

The Supabase service-role key and other privileged credentials must never be exposed in client-side code or committed to GitHub.

### Auditability

Important administrative actions should be recorded to support accountability and operational investigation.

---

## Getting Started

Follow these steps to run the project locally.

### Prerequisites

Ensure you have:

- [Node.js](https://nodejs.org/) compatible with the installed Next.js version.
- npm.
- [Git](https://git-scm.com/).
- A Supabase project.

### 1. Clone the repository

```bash
git clone https://github.com/spectredev25-star/hands-of-hope.git

cd hands-of-hope
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root directory.

Add the Supabase project configuration:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url

NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

Use the exact variable names expected by the application's Supabase client configuration.

Do not commit `.env.local` to GitHub.

### 4. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## Environment Variables

| Variable | Purpose | Exposure |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Public |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase publishable key | Public |

If a service-role key is required for a privileged server-side operation in the future, it must use a separate server-only environment variable without the `NEXT_PUBLIC_` prefix.

It must never be imported into browser components.

---

## Database Setup

Hands of Hope uses Supabase PostgreSQL.

Before testing database-dependent features:

1. Create a Supabase project.
2. Configure the environment variables.
3. Run the project's initial database schema SQL in the Supabase SQL Editor.
4. Apply the additional database migrations required by the implemented features.
5. Verify that RLS is enabled and the required policies are active.
6. Configure the Supabase Storage bucket when testing profile image uploads.

### Organization Profile Images

Organization profile images use the `avatars` Supabase Storage bucket.

The migration:

```text
supabase/migrations/202611010001_organization_avatars.sql
```

creates the bucket and configures upload policies.

Run this migration in the Supabase SQL Editor before testing organization avatar uploads.

### Database Integrity

When applying new SQL changes, use the migration files and keep the database schema aligned with the application code.

Do not assume that creating a frontend page automatically creates its required database tables, columns, policies, or storage configuration.

---

## Development Commands

The following commands are available in `package.json`:

### Start development server

```bash
npm run dev
```

### Build the application

```bash
npm run build
```

### Start production server

```bash
npm run start
```

### Run ESLint

```bash
npm run lint
```

Always run a production build after significant changes to routes, authentication, database integration, or application configuration.

---

## Development Roadmap

Development is organized into phases, allowing the team to establish a reliable foundation before expanding functionality.

### Phase 1 — Project Foundation

- Define the problem and target users.
- Document the core assistance workflow.
- Establish the application architecture.
- Define user roles and permissions.
- Design the initial PostgreSQL schema.
- Configure the repository and development environment.

### Phase 2 — UI/UX and Frontend Foundation

- Establish the visual identity and design system.
- Develop the responsive landing page.
- Implement authentication interfaces.
- Build reusable components.
- Develop role-specific dashboard layouts.
- Implement theme switching and responsive navigation.

### Phase 3 — Authentication and Database Integration

- Integrate Supabase Authentication.
- Implement user profiles.
- Implement role-based route protection.
- Configure PostgreSQL tables and relationships.
- Configure RLS policies.
- Connect frontend forms to backend services.

### Phase 4 — Organization Contributions and Resource Management

- Implement contribution submission.
- Connect contribution history to Supabase.
- Implement contribution review.
- Coordinate collection schedules.
- Record collection outcomes.
- Inspect and accept or reject resources.
- Update inventory from accepted contributions.

### Phase 5 — Beneficiary Assistance Management

- Implement resource discovery.
- Implement assistance request submission.
- Develop request history and status tracking.
- Implement administrative request review.
- Introduce resource allocation.
- Connect approved requests to inventory.

### Phase 6 — Distribution and Accountability

- Implement allocation preparation.
- Introduce QR authorization generation.
- Implement QR verification.
- Confirm distribution handovers.
- Prevent duplicate authorization redemption.
- Maintain distribution and audit records.

### Phase 7 — Testing and Deployment

- Test authentication and authorization.
- Validate RLS policies.
- Test the complete contribution workflow.
- Test assistance request and distribution workflows.
- Validate data integrity and error handling.
- Improve responsive behavior and accessibility.
- Deploy and verify the production application.

---

## Future Improvements

After the core MVP is stable, potential improvements include:

- Hardware prototype integration for recording or supporting physical distribution activities.
- Rule-based resource recommendations.
- More advanced assistance matching.
- Notifications for contribution and request status changes.
- Analytics for resource availability and distribution outcomes.
- Improved administrative reporting.
- Integration with external logistics providers.
- Employment and job-connection opportunities for beneficiaries.

These features will be prioritized according to user needs, technical feasibility, and feedback from the core MVP.

---

## Contributing

Hands of Hope is developed collaboratively by **Transformative Creatives**.

Contributors should:

1. Pull the latest changes from the main branch.
2. Create a feature branch for new work.
3. Follow the existing project structure and design system.
4. Reuse existing components where appropriate.
5. Validate data on the server.
6. Respect existing authentication and RLS policies.
7. Test affected functionality before submitting changes.
8. Document new environment variables, SQL migrations, and configuration requirements.
9. Submit focused pull requests with clear descriptions.

Changes involving authentication, authorization, inventory, contributions, and distribution require particular care.

---

## Team

**Transformative Creatives**

Building technology to make community assistance more accessible, coordinated, and accountable.

---

## License

A license has not yet been specified.

Until a license is added to this repository, reuse and redistribution permissions are not explicitly granted.

---

<div align="center">

### Hands of Hope

*Connecting needs, resources, and people through accountable technology.*

**Built with purpose by Transformative Creatives.**

</div>