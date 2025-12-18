# PF Tracker 🧾💰

A personal finance tracking backend built with **FastAPI**, **PostgreSQL**, and **Docker**.

PF Tracker allows users to record income and expenses via a REST API, persist them in a database, and retrieve them for analysis.  
The project is designed to be **simple to run locally**, **easy to extend**, and **production-style in structure**.

> This project is primarily built for personal use, but is fully open-source and can be self-hosted by anyone.

---

## 🚀 Features

- Create and list financial transactions
- Income and expense tracking
- PostgreSQL persistence
- RESTful API with OpenAPI documentation
- Dockerized setup for instant local usage
- Automated tests using pytest

---

## 🛠 Tech Stack

- **Backend:** FastAPI
- **Database:** PostgreSQL 16
- **ORM:** SQLModel / SQLAlchemy
- **Containerization:** Docker & Docker Compose
- **Testing:** Pytest
- **API Docs:** Swagger (OpenAPI)

---

## 📂 Project Structure

```

pf-tracker/
│
├── app/
│   ├── api/
│   │   └── v1/
│   │       └── transactions.py
│   ├── db.py
│   ├── models.py
│   ├── schemas.py
│   └── main.py
│
├── tests/
│   ├── conftest.py
│   └── test_transactions.py
│
├── docker-compose.yaml
├── Dockerfile
├── requirements.txt
├── .env
└── README.md

````

---

## ⚙️ Setup & Run Locally

### 1️⃣ Prerequisites
- Docker
- Docker Compose

---

### 2️⃣ Clone the Repository

```bash
git clone https://github.com/<your-username>/pf-tracker.git
cd pf-tracker
````

---

### 3️⃣ Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL=postgresql://postgres:postgres@db:5432/pftracker
```

---

### 4️⃣ Start the Application

```bash
docker compose up --build
```

---

### 5️⃣ Access the API

* API root:

  ```
  http://localhost:8000/
  ```

* Swagger UI (API docs):

  ```
  http://localhost:8000/docs
  ```

---

## 📌 API Endpoints

### Create a Transaction

**POST** `/api/v1/transactions/`

```json
{
  "account_id": 1,
  "category_id": 1,
  "amount": "250.50",
  "type": "expense",
  "date": "2025-12-01",
  "note": "Groceries"
}
```

---

### List Transactions

**GET** `/api/v1/transactions/`

Returns all recorded transactions.

---

## 🧪 Running Tests

Run tests locally (outside Docker):

```bash
python -m pytest
```

---

## 📈 Roadmap

Planned improvements:

* Account and category management
* Monthly and yearly summaries
* Transaction filtering and search
* Authentication (JWT)
* Frontend dashboard

---

## 🤝 Contributing

This project is currently maintained for personal use, but contributions and suggestions are welcome.

---

## 📜 License

MIT License

---

## 👤 Author

Built by **Venkat Dronadula**
Final-year CSE (AI & ML) student | Backend & API development enthusiast

---
