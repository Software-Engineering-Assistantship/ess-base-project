from src.db.schemas.model_schema import ModelSchema

class AlbumSchema(ModelSchema):
    bson_type: str = "object"
    required: list = ["id", "title", "artist", "release_year"]
    properties: dict = {
        "id": {
            "bson_type": "string",
            "description": "The album's unique identifier"
        },
        "title": {
            "bson_type": "string",
            "description": "The title of the album"
        },
        "artist": {
            "bson_type": "string",
            "description": "The artist of the album"
        },
        "release_year": {
            "bson_type": "integer",
            "description": "The release year of the album"
        },
        # "created_at": {
        #     "bson_type": "string",
        #     "description": "The album's creation time"
        # }
    }

    def get(self) -> dict:
        return {
            "bson_type": self.bson_type,
            "required": self.required,
            "properties": self.properties
        }
