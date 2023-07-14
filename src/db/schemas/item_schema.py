
from src.db.schemas.model_schema import ModelSchema


class ItemSchema(ModelSchema):
    bson_type: str = "object"
    required: list = ["id", "name"]
    properties: dict = {
        "id": {
            "bson_type": "string",
            "description": "The item's unique identifier"
        },
        "name": {
            "bson_type": "string",
            "description": "The item's name"
        },
        "created_at": {
            "bson_type": "string",
            "description": "The item's creation time"
        }
    }

    def get(self) -> dict:
        return {
            "bson_type": self.bson_type,
            "required": self.required,
            "properties": self.properties
        }