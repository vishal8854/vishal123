from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import auth, observers, elections, training, badges, dashboard
from .database import engine, Base

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Poll Watcher Credentialing System", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(observers.router)
app.include_router(elections.router)
app.include_router(training.router)
app.include_router(badges.router)
app.include_router(dashboard.router)


@app.get("/api/health")
def health():
    return {"status": "ok"}
