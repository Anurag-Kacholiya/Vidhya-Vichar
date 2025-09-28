# Team - 35 - MID EXAM (HACKATHON)
### Selected problem statement - VidhyaVichar

Submitted by :-
- Anurag Kacholiya - 2025202025
- Vadali S S Bharadwaja - 2025204012
- Shaik Afzal Basha - 2025201097
- Aringi Vinay Chaitanya - 2025201041
- Prabhash Padhan - 2025201089

### 🔗Github link - https://github.com/Anurag-Kacholiya/Vidhya-Vichar

---

# VidhyaVichar 🎓

**VidhyaVichar** is a MERN stack application designed to facilitate structured interaction between students and faculty through a **meeting board system**.  
It enables role-based access for **students** and **instructors**, supporting question posting, discussions, and dashboard views tailored to each role.

---

## 🚀 Features
- 🔐 **Role-based authentication** (Student / Faculty)  
- 📝 **Question Management**: Students can post questions; Faculty can respond  
- 📊 **Dashboards**: Role-specific dashboards for streamlined navigation  
- 🗓 **Meeting Board**: Centralized discussion space  
- 👤 **Profile Management** for both roles  
- ⚡ **Fast Frontend** with React + Vite  
- 🌍 **MongoDB persistence** with Mongoose models  

---

## 🛠 Tech Stack
- **Frontend**: React, Vite, Axios  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB (via Mongoose)  
- **Authentication**: JWT-based auth  
- **Styling**: CSS (with custom components)  

---

## 📐 Solution Architecture

                  ┌──────────────────────────────────────┐
                  │            Frontend (UI)             │
                  │  React + Vite + Axios                │
                  │                                      │
                  │  • Pages: SignIn, SignUp,            │
                  │    StudentDashboard, FacultyDashboard│
                  │    MeetingBoards                     │
                  │  • Components: NavBar, UI Elements   │
                  │  • API Layer: axios.js               │
                  └───────────────▲──────────────────────┘
                                  │ REST API Calls (HTTP)
                                  │
                  ┌───────────────┴──────────────────────┐
                  │            Backend (API)             │
                  │   Node.js + Express + JWT            │
                  │                                      │
                  │  • server.js: App entry point        │
                  │  • Routes:                           │
                  │      - authRoutes.js (login/signup)  │
                  │      - questionRoutes.js (Q&A CRUD)  │
                  │  • Controllers: Auth, Questions,     │
                  │    Meetings                          │
                  │  • Middleware: JWT verification      │
                  └───────────────▲──────────────────────┘
                                  │ Database Queries
                                  │ (via Mongoose ODM)
                  ┌───────────────┴──────────────────────┐
                  │            Database (DB)             │
                  │           MongoDB Local              │
                  │                                      │
                  │  • userModel.js → Student/Faculty    │
                  │  • questionModel.js → Questions      │
                  │  • meetingModel.js → Meetings        │
                  └──────────────────────────────────────┘


---

## 📂 Project Directory Structure

```plaintext
vidyvichar/
├── frontend/                # React + Vite frontend
│   ├── public/              # Static assets
│   │   └── vite.svg
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js     # Axios instance (base URL, interceptors)
│   │   ├── assets/          # Static images/icons
│   │   ├── components/
│   │   │   └── NavBar.jsx   # Navigation bar shared across pages
│   │   ├── pages/           # App pages (Student/Faculty dashboards, etc.)
│   │   │   ├── SignIn.jsx
│   │   │   ├── SignUp.jsx
│   │   │   ├── StudentDashboard.jsx
│   │   │   ├── FacultyDashboard.jsx
│   │   │   ├── StudentMeetingBoard.jsx
│   │   │   ├── FacultyMeetingBoard.jsx
│   │   │   └── ProfilePage.jsx
│   │   ├── App.jsx          # Main app component
│   │   ├── main.jsx         # React entry point
│   │   ├── App.css          # Global styles
│   │   └── index.css        # Base CSS resets and theme
│   ├── package.json         # Frontend dependencies
│   └── vite.config.js       # Vite config for bundling
│
├── backend/                 # Node.js + Express backend
│   ├── src/
│   │   ├── server.js        # Entry point for Express server
│   │   ├── config/
│   │   │   └── db.js        # MongoDB connection setup
│   │   ├── models/          # Mongoose models
│   │   │   ├── userModel.js     # User schema (student/faculty)
│   │   │   ├── questionModel.js # Questions schema
│   │   │   └── meetingModel.js  # Meetings schema
│   │   ├── routes/          # Express routes
│   │   │   ├── authRoutes.js    # Authentication endpoints
│   │   │   └── questionRoutes.js# Question/meeting board endpoints
│   ├── package.json         # Backend dependencies
│   └── .env                 # Environment variables (ignored in git)
│
├── .git/                    # Git version control
├── .DS_Store                # macOS metadata (can be ignored)
└── README.md                # Project documentation
````

---

## 📖 File/Folder Explanations

### 🔹 Frontend

* **`src/main.jsx`** → Entry point for React, mounts `<App />` into DOM.
* **`src/App.jsx`** → Defines main routes & wraps all pages.
* **`src/api/axios.js`** → Configures Axios instance for backend API calls.
* **`src/components/NavBar.jsx`** → Navigation bar shared across pages.
* **`src/pages/`**:

  * `SignIn.jsx` & `SignUp.jsx` → Authentication pages.
  * `StudentDashboard.jsx` → Student view for meetings/questions.
  * `FacultyDashboard.jsx` → Faculty view for managing meetings/questions.
  * `StudentMeetingBoard.jsx` → Meeting board for students.
  * `FacultyMeetingBoard.jsx` → Meeting board for faculty.
  * `ProfilePage.jsx` → User profile page.

### 🔹 Backend

* **`src/server.js`** → Sets up Express app, middlewares, routes, and starts server.
* **`src/config/db.js`** → Connects to MongoDB (Atlas/local).
* **`src/models/`**:

  * `userModel.js` → Defines User schema (role-based: student/faculty).
  * `questionModel.js` → Schema for questions posted by students.
  * `meetingModel.js` → Schema for meetings/discussions.
* **`src/routes/`**:

  * `authRoutes.js` → Login, signup, JWT token handling.
  * `questionRoutes.js` → CRUD APIs for questions/meetings and Auth middleware.

---

## 🎨 Design Decisions

* **MERN stack** chosen for full JavaScript workflow and easy integration.
* **Vite** used for faster frontend bundling & DX.
* **Role-based dashboards** provide separation of concerns: faculty vs. student functionality.
* **JWT Authentication** ensures stateless and secure session handling.
* **Modular Structure** with separate routes, models, and configs for maintainability.

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-org/vidyvichar.git
cd vidyvichar
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

* Create a `.env` file in `/backend` with:

```env
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
```

* Start backend:

```bash
npm run dev
```

### 3️⃣ Frontend Setup

```bash
cd ../frontend
npm install
```

* Update `src/api/axios.js` with backend API base URL if needed.

* Start frontend:

```bash
npm run dev
```

### 4️⃣ Access Application

* Frontend: `http://localhost:5173`
* Backend API: `http://localhost:5000`