from pymongo import ASCENDING, IndexModel
from .item_collection_example import ITEM_COLLECTION_EXAMPLE
from src.db.schemas.item_schema import ItemSchema
from src.db.serializers.schema_serializer import schema_serializer


def create_collections(database):
    """
    Create all collections and insert the example data.

    """

    if 'items' not in database.db.list_collection_names():
        collections = ['items']

        for collection in collections:
            schema = ItemSchema()
            database.create_collection(
                collection,
                indexes=[IndexModel([("id", ASCENDING)], unique=True)],
                validation_schema=schema_serializer(schema.get())
            )

        for item in ITEM_COLLECTION_EXAMPLE:
            database.insert_item('items', item)
