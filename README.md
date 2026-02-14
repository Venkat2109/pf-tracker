# Spendly 💸

Spendly is a modern full-stack personal finance tracker designed to help users understand and improve their spending habits through clean visuals, smart insights, and thoughtful UX.

The project focuses on **clarity, usability, and intentional feature design** — not feature overload.

---

## ✨ Features

### 📊 Dashboard
- Monthly income, expense, and balance overview
- Automatic month-based filtering
- Interactive charts
- Expense heatmap
- Top spending categories

### 🧾 Transactions
- Add, edit, delete transactions
- Automatically sorted by date (newest first)
- Category & type filtering
- Clean grouped history view

### 📅 History & Patterns
- Grouped by **date**
- Toggle to **category-wise** analysis
- Designed for reflection and spending awareness

### 🤖 Smart Mascot (Optional)
- Context-aware financial insights
- Auto-hide + manual minimize toggle
- Mood-based animations
- Fully optional (can be disabled)

### ⚙️ User Controls
- Dark / Light mode
- Reduce motion (accessibility)
- CSV export

### 🔐 Authentication
- Secure JWT-based login & registration
- Per-user transaction isolation

---

## 🛠️ Tech Stack

### Frontend
- React + TypeScript
- React Router
- Framer Motion
- Context API
- Custom CSS (dark-mode first)

### Backend
- FastAPI (Python)
- SQLModel (ORM)
- PostgreSQL
- JWT Authentication
- Docker (database + API container)

---

## 📸 Screenshots

### Dashboard
![Dashboard](screenshots/dashboard.png)

### History (By Date)
![History Date](screenshots/history-date.png)

### History (By Category)
![History Category](screenshots/history-category.png)

### Mascot Insights
![Mascot](screenshots/mascot-insight.png)

### Login Page
![Login](screenshots/login-page.png)

---

# 🚀 Getting Started

Spendly is designed to run locally using Docker for the backend.

---

## 🧰 Prerequisites

Make sure you have installed:

- Node.js (v18+ recommended)
- npm
- Docker Desktop

---

# 🔥 Quick Start (Recommended)

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Venkat2109/pf-tracker.git
cd pf-tracker
````

---

### 2️⃣ Start Backend (Docker)

From the project root:

```bash
docker compose up --build
```

This will:

* Start PostgreSQL container
* Start FastAPI backend
* Automatically create database tables

Backend will run at:

```
http://localhost:8000
```

API docs available at:

```
http://localhost:8000/docs
```

---

### 3️⃣ Start Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend will run at:

```
http://localhost:5173
```

---

## 🔐 Environment Variables

### Backend (.env)

Inside project root:

```
DATABASE_URL=postgresql://postgres:postgres@db:5432/pftracker
SECRET_KEY=SUPER_SECRET_DEV_KEY
```

---

### Frontend (.env)

Inside `frontend/`:

```
VITE_API_BASE_URL=http://localhost:8000
```

---

# 🧠 How Data Works

* Each user has isolated data.
* Data is stored in PostgreSQL running in Docker.
* If you stop Docker, data persists via volume storage.
* This project runs locally and does not share data between users.

---

# 🎯 Design Philosophy

* Minimal but expressive UI
* Strong information hierarchy
* Features that justify their presence
* Optional guidance, never forced
* Thoughtful UX over feature overload

---

# 📌 Project Purpose

Spendly is built as:

* A full-stack portfolio project
* A demonstration of frontend + backend integration
* An example of UX-focused engineering

It is intentionally not overcomplicated.

---

# 👤 Author

Venkat Dronadula
Final-year CSE (AI & ML) student
Focused on frontend engineering, system design, and clean UX architecture.

---

# 📄 License

This project is built for learning, experimentation, and portfolio use.

---

# ⭐ If You Like This Project

Feel free to:

* Fork it
* Experiment with new features
* Use it as a base for your own finance tools

---
