from fastapi import APIRouter
from src.api import items
from src.api import musics

api_router = APIRouter()
api_router.include_router(items.router, prefix="/items", tags=["items"])
api_router.include_router(musics.router, prefix="/musics", tags=["musics"])
