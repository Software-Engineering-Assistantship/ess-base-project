from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from src.api.router import api_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)