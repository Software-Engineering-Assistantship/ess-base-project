from src.db.schemas.model_schema import ModelSchema

class ReviewSchema(ModelSchema):
    bson_type: str = "object"
    required: list = [
        "id",
        "title", 
        "author", 
        "description", 
        "song",
        "rating",
        "created_at"
    ]
    properties: dict = {
        "id": {
            "bson_type": "string",
            "description": "The unique identifier for a review"
        },
        "title": {
            "bson_type": "string",
            "description": "The title of the review"
        },
        "author": {
            "bson_type": "string",
            "description": "The author of the review"
        },
        "description": {
            "bson_type": "string",
            "description": "The description of the review"
        },
        "rating": {
            "bson_type": "int",
            "description": "The rating of the review"
        },
        "song": {
            "bson_type": "string",
            "description": "The song of the review"
        },
        "created_at": {
            "bson_type": "date",
            "description": "The date the review was created"
        }
    }

    def get(self) -> dict:
        return {
            "bson_type": self.bson_type,
            "required": self.required,
            "properties": self.properties
        }

