<div align="center">

# 🚀 StartupSphere+

### AI-Powered Startup Incubation & Investment Platform

Build • Connect • Fund • Grow

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?logo=supabase)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38BDF8?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-blue)

</div>

---

# 📖 About StartupSphere+

StartupSphere+ is a modern AI-powered startup incubation and investment platform that connects **Founders, Investors, Mentors, Incubators, and Administrators** into a single ecosystem.

The platform simplifies the startup journey—from idea validation and mentorship to funding, collaboration, and AI-assisted business growth.

---

# 🌟 Features

## 👨‍💼 Founder

- Startup Profile Management
- Startup Showcase
- Team Management
- Startup Visibility Settings
- Mentor Requests
- AI Startup Assistant
- Startup Preview Page
- Profile Management

---

## 💰 Investor

- Browse Startups
- Search & Filters
- Startup Details
- Save Startups
- Investment Dashboard
- AI Startup Analysis (Upcoming)

---

## 🧑‍🏫 Mentor

- Mentor Profile
- Mentor Requests
- Assigned Startups
- Session Scheduling
- Startup Evaluation
- Founder Communication

---

## 🛠 Admin

- Dashboard Analytics
- User Approval
- Startup Approval
- Mentor Management
- Investor Management
- Reports
- Platform Monitoring

---

# 🤖 AI Features

StartupSphere AI helps founders with:

- Startup Ideas
- Business Plans
- Market Research
- SWOT Analysis
- Funding Strategies
- Investor Pitch Preparation
- Product Validation
- Startup Roadmaps
- Business Growth Strategy

Powered by **Google Gemini AI**

---

# 💼 Business Model

StartupSphere+ follows a **multi-sided marketplace model**.

## Revenue Streams

### 1. Premium Founder Subscription

- Unlimited Startup Listings
- AI Business Reports
- Priority Mentor Access
- Advanced Analytics

---

### 2. Investor Subscription

- Premium Startup Discovery
- AI Startup Analysis
- Saved Portfolio
- Deal Flow Management

---

### 3. Mentor Subscription

- Premium Mentor Profile
- Session Management
- Analytics Dashboard

---

### 4. Incubator Partnership

Partner incubators can onboard startups and monitor incubation progress.

---

### 5. AI Services

- AI Pitch Deck Review
- AI Business Validation
- AI Market Research
- AI Startup Advisor

---

# 🏗 Platform Architecture

```
                StartupSphere+

                        │
        ┌───────────────┼───────────────┐
        │               │               │
     Founder        Investor        Mentor
        │               │               │
        └───────────────┼───────────────┘
                        │
                  Supabase Backend
                        │
     Authentication • Database • Storage
                        │
                 Google Gemini AI
```

---

# 🏛 User Roles

```
Founder
    │
    ├── Create Startup
    ├── Find Mentor
    ├── Pitch Startup
    └── AI Assistant

Investor
    │
    ├── Browse Startups
    ├── Save Startup
    ├── Investment Dashboard
    └── Contact Founder

Mentor
    │
    ├── Accept Requests
    ├── Guide Founders
    ├── Schedule Sessions
    └── Evaluate Startups

Admin
    │
    ├── Manage Users
    ├── Approve Accounts
    ├── Platform Analytics
    └── Monitor Activities
```

---

# 🛠 Tech Stack

## Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- Shadcn UI
- Framer Motion
- React Hook Form
- Yup
- Zustand
- React Query
- Lucide Icons

---

## Backend

- Next.js API Routes
- Supabase

---

## Database

- PostgreSQL (Supabase)

---

## Authentication

- Supabase Authentication

---

## Storage

- Supabase Storage

---

## AI

- Google Gemini AI
- AI SDK

---

## State Management

- Zustand

---

## Data Fetching

- TanStack React Query

---

## Validation

- Yup

---

# 📁 Project Structure

```
StartupSphere/
│
├── public/
│
├── src/
│
│── app/
│   ├── admin/
│   ├── founder/
│   ├── investor/
│   ├── mentor/
│   ├── profile/
│   ├── login/
│   ├── register/
│   ├── pending/
│   ├── rejected/
│   └── api/
│
│── api/
│   ├── function/
│   └── services/
│
│── components/
│   ├── common/
│   ├── ui/
│   ├── dashboard/
│   ├── chatbot/
│   └── skeleton/
│
│── hooks/
│   ├── auth/
│   ├── startup/
│   ├── mentor/
│   ├── investor/
│   ├── profile/
│   └── admin/
│
│── layout/
│
│── store/
│
│── service/
│   ├── validation/
│   ├── helper/
│   └── json/
│
│── lib/
│
│── types/
│
│── fonts/
│
│── constants/
│
└── middleware.ts
```

---

# 🔒 Authentication Flow

```
Register
    │
    ▼
Email Verification
    │
    ▼
Profile Creation
    │
    ▼
Admin Approval
    │
    ▼
Dashboard Access
```

---

# 🚀 Startup Lifecycle

```
Create Startup
      │
      ▼
Submit for Review
      │
      ▼
Admin Approval
      │
      ▼
Visible to Investors
      │
      ▼
Receive Funding
```

---

# 🧑‍🏫 Mentor Flow

```
Founder
     │
Send Request
     │
     ▼
Mentor Accept
     │
     ▼
Mentor Assignment
     │
     ▼
Schedule Session
     │
     ▼
Evaluation
```

---

# 💰 Investor Flow

```
Browse Startups
      │
      ▼
Save Startup
      │
      ▼
View Details
      │
      ▼
Contact Founder
```

---

# 📊 Key Features

- Role-Based Authentication
- Protected Routes
- AI Chatbot
- Startup Management
- Startup Showcase
- Mentor Request System
- Investor Dashboard
- Admin Dashboard
- Responsive Design
- Dark / Light Theme
- SEO Optimized
- React Query Caching
- Supabase Storage
- Signed URLs
- Dynamic Tables
- Pagination
- Search
- Filters

---

# 🔮 Upcoming Features

- Notifications
- Real-time Chat
- Video Mentoring
- AI Pitch Deck Generator
- AI Financial Forecasting
- Investment Portfolio
- Startup Matching Engine
- Email Automation
- Startup Analytics
- Mobile Application

---

# ⚙️ Installation

```bash
git clone https://github.com/your-username/startupsphere.git
```

```bash
cd startupsphere
```

```bash
npm install
```

Create a `.env.local`

```env
NEXT_PUBLIC_SUPABASE_URL=

NEXT_PUBLIC_SUPABASE_ANON_KEY=

GOOGLE_GENERATIVE_AI_API_KEY=
```

Run the project

```bash
npm run dev
```

---

# 📷 Screenshots

```
Home Page

Founder Dashboard

Investor Dashboard

Mentor Dashboard

Admin Dashboard

AI Chat

Startup Details

Profile Page
```

(Add screenshots here)

---

# 📈 Future Scope

- AI Due Diligence
- AI Startup Scoring
- Investment Matching
- Startup Marketplace
- AI Resume Builder
- AI Financial Assistant
- AI Co-Founder Finder

---

# 👨‍💻 Author

**Akshay Kisku**

Frontend & Full Stack Developer

- Next.js
- React
- TypeScript
- Supabase
- AI Integration

---

# ⭐ Support

If you like this project, don't forget to **Star ⭐ the repository.**

---

# 📄 License

This project is licensed under the MIT License.

---

<div align="center">

Made with ❤️ using Next.js + Supabase + AI

</div>
