from .database import Database
from .config.create_collections import create_collections

database = Database()

create_collections(database)