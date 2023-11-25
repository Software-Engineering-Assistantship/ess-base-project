from typing import List, Dict, Optional
from pydantic import BaseModel

class ModelSchemaProperty(BaseModel):
    bson_type: str
    description: Optional[str] = None

class ModelSchema(BaseModel):
    bson_type: str
    required: List['str']
    properties: Dict[str, Dict[str, ModelSchemaProperty]]

