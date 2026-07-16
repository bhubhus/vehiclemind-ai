from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.routers.vehicles import router as vehicles_router


Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="VehicleMind AI API",
    version="0.2.0",
    description="Backend API for the VehicleMind AI project.",
)



app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://vehiclemind-ai.vercel.app",
        "http://127.0.0.1:5173",
        "https://vehiclemind-8dg75c4r2-ai-bg.vercel.app/"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(vehicles_router)


@app.get("/")
def root() -> dict[str, str]:
    return {
        "message": "VehicleMind AI API is running"
    }


@app.get("/health")
def health() -> dict[str, str]:
    return {
        "message": "FastAPI connected successfully"
    }