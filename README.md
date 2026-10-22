# 🛡️ SafeHer

**A MERN-stack web application for women's safety — report incidents, view unsafe areas on a map, and access emergency support.**

![Status](https://img.shields.io/badge/status-complete-brightgreen)
![Backend](https://img.shields.io/badge/backend-complete-brightgreen)
![Frontend](https://img.shields.io/badge/frontend-complete-brightgreen)
![License](https://img.shields.io/badge/license-educational-blue)

---

## 🌐 Live Demo

🚀 **[View the Live App Here](https://safeher-app-umber.vercel.app)**

> *Note: The backend is hosted on Vercel's free serverless tier. The first API call may take a few seconds to "wake up" the server.*

---

## 🎯 About

SafeHer is a community-driven safety platform designed to help women stay informed, report incidents, and access support services. It combines location-based incident mapping, secure reporting, and emergency resource access into a single, user-friendly web application.

Think of it as a combination of **Google Maps + Incident Reporting + Emergency Support Hub**.

---

## ✨ Key Features

### 👤 User Features
- Secure registration and login (JWT-based authentication)
- Report incidents with type, location, description, date, and severity
- Anonymous reporting option
- View personal report history
- Access emergency contacts (police, helplines, hospitals, counseling)

### 🗺️ Safety Map
- Interactive map with color-coded zones:
  - 🔴 **Red** = High incident reports
  - 🟡 **Yellow** = Moderate reports
  - 🟢 **Green** = Few/no reports
- Click on any marker to view incident details

### 📊 Admin Dashboard
- View all reported incidents
- Approve or reject reports (moderation)
- Analytics:
  - Total reports
  - Incident categories
  - Most reported locations
  - Visual progress bars for data

---

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React.js, React Router, Axios, Tailwind CSS, Leaflet.js |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Atlas) + Mongoose |
| **Authentication** | JWT (JSON Web Tokens) + bcryptjs |
| **Deployment** | Vercel (Frontend & Backend) + MongoDB Atlas |

---

## 📁 Project Structure
SafeHer-App/
├── backend/ # Backend (Node.js + Express)
│ ├── controllers/ # Business logic
│ ├── middleware/ # Auth verification
│ ├── models/ # Mongoose schemas
│ ├── routes/ # API endpoints
│ ├── server.js # Main entry point
│ └── package.json
├── frontend/ # Frontend (React.js)
│ ├── public/ # Static assets
│ ├── src/ # React source code
│ │ ├── assets/ # Images and illustrations
│ │ ├── components/ # Reusable UI components
│ │ ├── context/ # Auth context
│ │ ├── pages/ # App screens
│ │ └── services/ # API calls
│ ├── tailwind.config.js # Styling config
│ └── package.json
├── api/ # Vercel Serverless Bridge
│ └── index.js # Routes serverless requests to backend
├── vercel.json # Vercel deployment configuration
└── README.md


---

## 🚀 API Endpoints

### 🔐 Authentication
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login user (returns JWT) | Public |

### 📝 Incidents
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/incidents` | Report new incident | Private |
| GET | `/api/incidents` | Get all approved incidents | Public |
| GET | `/api/incidents/:id` | Get single incident | Public |
| GET | `/api/incidents/my-reports` | Get current user's reports | Private |
| GET | `/api/incidents/stats` | Get aggregated stats | Public |

### 🛡️ Admin
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/incidents/admin/all` | View all incidents | Admin |
| PUT | `/api/incidents/:id/status` | Approve/reject incident | Admin |
| GET | `/api/incidents/admin/dashboard` | Analytics dashboard | Admin |

---

## ⚙️ Local Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account (free tier works)
- Git

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/oshadidamindagoda/SafeHer-App.git
cd SafeHer-App