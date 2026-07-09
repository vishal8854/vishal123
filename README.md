# Poll Watcher Credentialing System

**Cap Corporate** — Observer/Poll-Watcher credentialing, registration, training, and badge issuance for partisan observers.

## Tech Stack

- **Frontend:** React 18 + Vite (dark theme UI)
- **Backend:** Python FastAPI
- **Database:** MySQL 8.0

## Quick Start

### 1. Database

```bash
docker compose up -d
```

### 2. Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

### 4. Access

- Frontend: http://localhost:5173
- API Docs: http://localhost:8000/docs
- Admin user must be registered via the `/api/auth/register` endpoint (register first user via API docs)

## API Endpoints

| Endpoint | Description |
|---|---|
| `POST /api/auth/register` | Register admin user |
| `POST /api/auth/login` | Login |
| `GET /api/observers/` | List observers |
| `POST /api/observers/` | Create observer |
| `GET /api/observers/:id` | Observer details |
| `PUT /api/observers/:id` | Update observer |
| `DELETE /api/observers/:id` | Delete observer |
| `GET/POST /api/elections/` | Election CRUD |
| `GET/POST /api/training/courses` | Course CRUD |
| `POST /api/training/enroll` | Enroll observer |
| `PUT /api/training/enrollments/:id/progress` | Update progress |
| `GET/POST /api/badges/` | Badge CRUD |
| `PUT /api/badges/:id/revoke` | Revoke badge |
| `GET /api/badges/verify/:number` | Verify badge |
| `GET /api/dashboard/stats` | Dashboard stats |
