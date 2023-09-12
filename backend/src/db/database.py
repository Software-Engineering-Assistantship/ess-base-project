from typing import List, Dict
from uuid import uuid4
from pymongo import MongoClient, errors
from pymongo.collection import Collection, IndexModel
from src.config.config import env
from typing import Dict
from logging import INFO, WARNING, getLogger
from bson.objectid import ObjectId
from fastapi import HTTPException
logger = getLogger('uvicorn')


class Database():

    ID_LENGTH = 8

    def __init__(self):
        self.db = None
        self.connect()

    def connect(self):
        try:
            mongo_connection = MongoClient(env.DB_URL)

            logger.setLevel(INFO)

            self.db = mongo_connection[env.DB_NAME]

            print("--------------------")
            logger.info("MongoDB connected!")
            logger.info(
                f"Server Version: {mongo_connection.server_info()['version']}")
            print("--------------------")

        except errors.ServerSelectionTimeoutError as err:

            mongo_connection = None
            logger.setLevel(WARNING)
            logger.info(f"MongoDB connection error! {err}")

    def close_connection(self):
        print("--------------------")
        logger.info("MongoDB connection closed!")
        print("--------------------")
        self.db.client.close()

    def get_db(self):
        return self.db

    def create_collection(
        self,
        name: str,
        indexes: List[IndexModel] = [],
        validation_schema: Dict = {}
    ) -> Collection:
        """
        Create a collection

        Parameters
        - name : str
            The name of the collection to create
        - indexes : List[IndexModel]
            The indexes to create in the collection
        - validation_schema : dict
            The validation schema used to validate data inserted into the
            collection. It should be a dictionary representing a JSON Schema

        Returns
        - pymongo.collection.Collection
            The created collection

        Raises
        - TypeError: If indexes is not a list of pymongo.IndexModel

        """

        collection_options = {"validator": {"$jsonSchema": validation_schema}}

        collection: Collection = self.db.create_collection(
            name,
            **collection_options
        )

        collection.create_indexes(indexes)

        logger.info(f"Collection {name} created!")

        return collection

    def drop_collection(self, name) -> bool:
        """
        Drop a collection

        Parameters
        - name : str
            The name of the collection to drop

        Returns
        - bool
            True if the collection was dropped successfully, False otherwise

        """

        if name in self.db.list_collection_names():
            self.db.drop_collection(name)
            logger.info(f"Collection {name} dropped!")
            return True

        return False

    def get_all_items(self, collection_name: str) -> list:
        """
        Get all items from a collection

        Parameters:
        - collection_name: str
            The name of the collection

        Returns:
        - list
            A list of all items in the collection

        """

        collection: Collection = self.db[collection_name]

        items = list(collection.find({}, {"_id": 0}))
        items = list(collection.find())

        for itm in items:
            itm["id"] = str(itm["_id"])

        print(items)
        return items

    def get_by_name(self, collection_name: str, item_name: str) -> dict:
        """
        Retrieve an item by its ID from a collection

        Parameters:
        - collection_name: str
            The name of the collection where the item will be stored
        - item_id: str
            The ID of the item to retrieve

        Returns:
        - dict or None:
            The item if found, None otherwise

        """
        collection: Collection = self.db[collection_name]

        item = collection.find_one({"title": str(item_name)})
        if item is not None:
            # for itm in item
            item["id"] = str(item["_id"])
            del item["_id"]
        return item

    def get_item_by_id(self, collection_name: str, item_id: str) -> dict:
        """
        Retrieve an item by its ID from a collection

        Parameters:
        - collection_name: str
            The name of the collection where the item will be stored
        - item_id: str
            The ID of the item to retrieve

        Returns:
        - dict or None:
            The item if found, None otherwise

        """
        collection: Collection = self.db[collection_name]

        item = collection.find_one({"_id": ObjectId(item_id)})
        print(item)
        return item

    def insert_item(self, collection_name: str, item: dict) -> dict:
        """
        Insert an item into a collection

        Parameters:
        - collection_name: str
            The name of the collection where the item will be stored
        - item: dict
            The item to insert

        Returns:
        - dict:
            The inserted item

        """
        # TODO: test if this method works

        item["id"] = str(uuid4())[:self.ID_LENGTH]

        collection: Collection = self.db[collection_name]

        item_id = collection.insert_one(item).inserted_id
        return {
            "id": str(item_id),
            **item
        }

    def get_by_id(self, collection_name: str, item_id: str) -> dict:

        collection: Collection = self.db[collection_name]

        item_id = ObjectId(item_id)

        item = collection.find_one({"_id": item_id})

        if not item:
            return None

        return item

    def add(self, collection_name: str, item: dict) -> dict:
        """
        Insert an item into a collection

        Parameters:
        - collection_name: str
            The name of the collection where the item will be stored
        - item: dict
            The item to insert

        Returns:
        - dict:
            The inserted item

        """

        collection: Collection = self.db[collection_name]

        item = dict(item)

        item_id = collection.insert_one(item).inserted_id
        item["_id"] = str(item["_id"])
        return {
            "id": str(item_id),
            **item
        }

    def edit(self, collection_name: str, item_id: str, item: dict) -> dict:
        collection: Collection = self.db[collection_name]
        # item = dict(item)

        if any(value == "" for value in item.values()):
            return None

        else:
            item_id = collection.update_one(
                {"_id": ObjectId(item_id)}, {"$set": item})
            return {
                **item
            }

    def delete(self, collection_name: str, item_id: str) -> dict:
        collection: Collection = self.db[collection_name]

        item = collection.delete_one({"_id": ObjectId(item_id)})

        if item.deleted_count == 0:
            return {
                "id": None
            }

        return {
            'id': item_id
        }

    def get_by_year(self, collection_name: str, year: int) -> list:
        """
        Retrieve all items of a collection by year

        Parameters:
        - collection_name: str
            The name of the collection where the item is stored
        - year: str
            The year of the item to retrieve

        Returns:
        - list:
            A list of all items in the collection.

        """

        collection: Collection = self.db[collection_name]
        year = int(year)
        items = list(collection.find({"release_year": year}))
        for itm in items:
            itm["id"] = str(itm["_id"])
            del itm["_id"]
        return {
            "songs": items
        }

    def get_available_on_for_song(self, song_id: str) -> Dict[str, str]:
        song_links = {
            "Spotify": f"https://spotify.com/song/{song_id}",
            "Apple Music": f"https://apple.com/song/{song_id}",
        }

    def get_by_title(self, collection_name: str, title: str) -> list:
        """
        Retrieve all items of a collection by title

        Parameters:
        - collection_name: str
            The name of the collection where the item is stored
        - title: str
            The title of the item to retrieve

        Returns:
        - list:
            A list of all items in the collection.

        """

        collection: Collection = self.db[collection_name]
        items = list(collection.find({"title": title}))

        return items

    def get_by_genre(self, collection_name: str, genre: str) -> list:
        """
        Retrieve all items of a collection by genre

        Parameters:
        - collection_name: str
            The name of the collection where the item is stored
        - genre: str
            The genre of the item to retrieve

        Returns:
        - list:
            A list of all items in the collection.

        """

        collection: Collection = self.db[collection_name]
        items = list(collection.find({"genre": genre}))
        for itm in items:
            itm["id"] = str(itm["_id"])
            del itm["_id"]

        return {
            "songs": items
        }

    def get_by_artist(self, collection_name: str, artist: str) -> list:
        """
        Retrieve all items of a collection by artist

        Parameters:
        - collection_name: str
            The name of the collection where the item is stored
        - artist: str
            The artist of the item to retrieve

        Returns:
        - list:
            A list of all items in the collection.

        """

        collection: Collection = self.db[collection_name]
        items = list(collection.find({"artist": artist}))

        for itm in items:
            itm["id"] = str(itm["_id"])
            del itm["_id"]

        return items

    def get_by_album(self, collection_name: str, album: str) -> list:
        """
        Retrieve all items of a collection by album

        Parameters:
        - collection_name: str
            The name of the collection where the item is stored
        - album: str
            The album of the item to retrieve

        Returns:
        - list:
            A list of all items in the collection.

        """

        collection: Collection = self.db[collection_name]
        items = list(collection.find({"title": album}))

        return {
            "musics": items
        }

    def get_reviews_by_song(self, song_id: str) -> list:
        """
        Retrieve reviews for a specific song by song.

        Parameters:
        - song: str
            The ID of the song for which to retrieve reviews.

        Returns:
        - List[dict]:

            A list of dictionaries representing reviews for the specified song.
        """
        collection_name = "reviews"
        collection: Collection = self.db[collection_name]
        reviews = list(collection.find({"song": song_id}))

        return reviews
