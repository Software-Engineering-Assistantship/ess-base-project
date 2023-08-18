from pymongo import ASCENDING, IndexModel
from .item_collection_example import ITEM_COLLECTION_EXAMPLE
from src.db.schemas.review_schema import ReviewSchema
from src.db.serializers.schema_serializer import schema_serializer


def create_collections(database):
    """
    Create all collections and insert the example data.

    """

    if 'reviews' not in database.db.list_collection_names():
        collections = ['reviews']

        for collection in collections:
            schema = ReviewSchema()
            database.create_collection(
                collection,
                indexes=[IndexModel([("id", ASCENDING)], unique=True)],
                validation_schema=schema_serializer(schema.get())
            )

        for review in ITEM_COLLECTION_EXAMPLE:
            database.insert_item('items', review)
