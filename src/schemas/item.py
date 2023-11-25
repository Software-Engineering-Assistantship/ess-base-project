from typing import Optional
from datetime import datetime
from pydantic import BaseModel

class ItemModel(BaseModel):
    name: str
    created_at: Optional[datetime]


class ItemGet(BaseModel):
    id: str
    name: str
    created_at: Optional[datetime]

class ItemList(BaseModel):
    items: list[ItemGet]