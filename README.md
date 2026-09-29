# 🛡️ SafeHer

**A MERN-stack web application for women's safety — report incidents, view unsafe areas on a map, and access emergency support.**

![Status](https://img.shields.io/badge/status-in%20development-yellow)
![Backend](https://img.shields.io/badge/backend-complete-brightgreen)
![Frontend](https://img.shields.io/badge/frontend-coming%20soon-orange)
![License](https://img.shields.io/badge/license-educational-blue)

---

## 🎯 About

SafeHer is a community-driven safety platform designed to help women stay informed, report incidents, and access support services. It combines location-based incident mapping, secure reporting, and emergency resource access into a single, user-friendly web application.

Think of it as a combination of **Google Maps + Incident Reporting + Emergency Support Hub**.

---

## ✨ Key Features

### 👤 User Features
- Secure registration and login (JWT-based authentication)
- Report incidents with type, location, description, date, and optional photo
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
  - Monthly trends

---

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React.js, React Router, Axios, Tailwind CSS, Leaflet.js |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Atlas) + Mongoose |
| **Authentication** | JWT (JSON Web Tokens) + bcryptjs |
| **File Upload** | Multer |
| **Testing** | Postman |
| **Version Control** | Git + GitHub |

---

## 📁 Project Structure

```
SafeHer-App/
├── server/                          # Backend (Node.js + Express)
│   ├── controllers/                 # Business logic
│   │   ├── authController.js
│   │   └── incidentController.js
│   ├── middleware/                  # Custom middleware
│   │   └── authMiddleware.js
│   ├── models/                      # Mongoose schemas
│   │   ├── User.js
│   │   └── Incident.js
│   ├── routes/                      # API endpoints
│   │   ├── authRoutes.js
│   │   └── incidentRoutes.js
│   ├── uploads/                     # Incident photos (gitignored)
│   ├── .env                         # Environment variables (gitignored)
│   ├── .gitignore
│   ├── package.json
│   └── server.js                    # Main entry point
└── README.md
```

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
| GET | `/api/incidents/stats` | Get aggregated stats (heatmap) | Public |

### 🛡️ Admin
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/incidents/admin/all` | View all incidents | Admin |
| PUT | `/api/incidents/:id/status` | Approve/reject incident | Admin |
| GET | `/api/incidents/admin/dashboard` | Analytics dashboard | Admin |

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account (free tier works)
- Postman (for API testing)
- Git

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/oshadidamindagoda/SafeHer-App.git
cd SafeHer-App/server
```

**2. Install dependencies**
```bash
npm install
```

**3. Create `.env` file** in `server/` folder:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secure_jwt_secret_key
```

**4. Set up MongoDB Atlas**
- Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
- Add your IP to the IP Access List
- Create a database user
- Copy the connection string into `.env`

**5. Run the server**
```bash
npm run dev
```

Server will start on `http://localhost:5000`

---

## 🧪 Testing the API

Use Postman to test endpoints. Example workflow:

1. **Register a user** → `POST /api/auth/register`
2. **Login** → `POST /api/auth/login` (copy the JWT token)
3. **Report incident** → `POST /api/incidents` (add Bearer token)
4. **View reports** → `GET /api/incidents/my-reports` (Bearer token)
5. **Admin actions** → login as admin, approve/reject incidents

---

## 🎬 User Scenarios

### 📖 Scenario 1: Registration & Login
A woman visits SafeHer, creates an account, and logs in. The homepage displays safety alerts, nearby incidents, emergency contacts, and a map of her area.

### 🚨 Scenario 2: Reporting an Incident
She experiences harassment near a bus stop. She clicks **"Report Incident"**, fills in the type, location, description, date/time, and optionally uploads a photo. On submission, the report is saved, the location is marked on the map, and admins are notified.

### 🗺️ Scenario 3: Checking Area Safety
Before traveling, she opens the map and sees color-coded zones. She clicks a location to view incident types, report counts, and recent activity.

### 📞 Scenario 4: Emergency Help
She clicks **"Emergency Support"** and immediately sees police contacts, helplines, hospitals, and counseling services — with click-to-call functionality.

### 📊 Scenario 5: Admin Review
An admin logs in and views:
- Total reports submitted
- Incident categories
- Most reported locations (e.g., Bus Stand A – 15, Railway Station – 8)
- Monthly trends to identify unsafe zones

---

## 🗄️ Database Schema

### 👤 User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String ('user' | 'admin'),
  phone: String,
  createdAt: Date,
  updatedAt: Date
}
```

### 📝 Incident
```javascript
{
  reportedBy: ObjectId (ref: User),
  type: String (Harassment | Stalking | Unsafe Area | ...),
  description: String,
  location: {
    latitude: Number,
    longitude: Number,
    address: String
  },
  incidentDate: Date,
  photoUrl: String,
  status: String ('pending' | 'approved' | 'rejected'),
  severity: String ('low' | 'medium' | 'high'),
  isAnonymous: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🎯 Roadmap

### ✅ Completed
- [x] Backend API (auth, incidents, admin)
- [x] User model + Incident model
- [x] JWT authentication
- [x] Admin approval workflow
- [x] API testing with Postman

### 🚧 In Progress
- [ ] React frontend UI
- [ ] Interactive safety map (Leaflet)
- [ ] Photo upload feature
- [ ] Emergency contacts page

### 📅 Planned
- [ ] Deployment (Vercel + Render)
- [ ] Mobile responsive design
- [ ] Email notifications for admins
- [ ] Real-time updates (Socket.io)

---

## 🔒 Security Features

- ✅ Passwords hashed with **bcryptjs** (10 salt rounds)
- ✅ JWT tokens with 30-day expiry
- ✅ Protected routes via auth middleware
- ✅ Admin-only route protection
- ✅ Input validation on all endpoints
- ✅ `.env` file gitignored (no secrets in repo)
- ✅ MongoDB Atlas IP whitelist
- ✅ Admin moderation prevents spam/fake reports

---

## 👩‍💻 Author

**Oshadi Kodagoda**  
Computer Engineering Undergraduate  
University of Ruhuna, Sri Lanka

- GitHub: [@oshadidamindagoda](https://github.com/oshadidamindagoda)
- Email: oshadidaminda@gmail.com

---

## 📚 Module Information

**Module:** EE4207 — Web Application Development  
**Project:** Web Application + Viva Evaluation  
**Institution:** University of Ruhuna

---

## 📄 License

This project is developed for **educational purposes** as part of the EE4207 module requirements.

---

## 🙏 Acknowledgements

- MongoDB Atlas for free cloud database
- Leaflet.js for open-source mapping
- The MERN stack community
- All women who inspired this project 💪

---

## ⭐ Project Status

| Component | Progress |
|-----------|----------|
| Backend API | ✅ 100% |
| Frontend UI | 🚧 0% (next up) |
| Deployment | ⏳ Pending |
| Documentation | ✅ Complete |

**Backend is complete with 11 working endpoints. Frontend development is the next milestone.**

---

<div align="center">

**Built with ❤️ for women's safety**

⭐ Star this repo if you find it useful!

</div>