# Spendly 💸

Spendly is a modern personal finance tracker designed to help users understand and improve their spending habits through clean visuals, smart insights, and a friendly optional assistant.

The project focuses on **clarity, usability, and thoughtful UX** rather than feature overload.

---

## ✨ Features

### 📊 Dashboard
- Monthly income, expense, and balance overview
- Automatically filtered transactions by month
- Interactive charts and spending heatmap
- Top spending categories at a glance

### 🧾 Transactions
- Add, edit, and delete transactions
- Automatically sorted by date
- Category and type filtering
- Clean, readable transaction history

### 📅 History & Patterns
- View transactions grouped by **date**
- Switch to **category-wise** spending analysis
- Designed for reflection and habit awareness

### 🤖 Smart Mascot (Optional)
- Context-aware spending insights
- Auto-hide and manual minimize options
- Designed to be helpful, not distracting

### ⚙️ User Controls
- Dark / Light mode
- Reduce motion for accessibility
- Export all transactions as CSV

### 🔐 Authentication
- Secure login and registration
- Branded, polished auth experience

---

## 🛠️ Tech Stack

### Frontend
- React + TypeScript
- Framer Motion (animations)
- Custom CSS (dark-mode first)
- React Router
- Context API

### Backend
- Node.js + Express
- PostgreSQL
- Prisma ORM
- JWT Authentication

---

## 📸 Screenshots

> Replace the placeholder images with your own screenshots.

### Dashboard Overview
![Dashboard](screenshots/dashboard.png)

### Transaction History (By Date)
![History Date](screenshots/history-date.png)

### Transaction History (By Category)
![History Category](screenshots/history-category.png)

### Mascot Insights
![Mascot](screenshots/mascot-insight.png)

### Login Page
![Login](screenshots/login-page.png)

---

## 🚀 Getting Started (Recommended)

Spendly includes a **one-command setup script** that installs and runs both the frontend and backend.

### Prerequisites
Make sure you have:
- **Node.js** (v18 or later)
- **npm**
- **PostgreSQL** running locally

---

### 🔥 Quick Setup (One Command)

```bash
git clone https://github.com/<your-username>/spendly.git
cd spendly
node scripts/setup.js
```

This script will:

- Install backend dependencies

- Install frontend dependencies

- Create required .env files

- Run database migrations

- Start both servers

After setup:

- Frontend → http://localhost:5173

- Backend → http://localhost:3000

### 🧪 Manual Setup (Optional)

If you prefer manual control:

Backend
cd backend
npm install
cp .env.example .env
npx prisma migrate dev
npm run dev

Frontend
cd frontend
npm install
cp .env.example .env
npm run dev

### 🔐 Environment Variables
Backend (backend/.env)
DATABASE_URL=postgresql://postgres:password@localhost:5432/spendly
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:5173

Frontend (frontend/.env)
VITE_API_BASE_URL=http://localhost:3000

### 🎯 Design Philosophy

Minimal but expressive UI

Features that justify their presence

Clear information hierarchy

Optional guidance, never forced


### 👤 Author

Venkat Dronadula
Final-year CSE (AI & ML) student

### 📄 License

This project is built for learning, experimentation, and portfolio use.

### ⭐ If you like this project
Feel free to fork it, experiment, or use it as a base for your own finance tools.