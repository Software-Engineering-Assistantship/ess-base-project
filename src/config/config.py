from dotenv import load_dotenv
from os import environ

# Load environment variables from .env file
load_dotenv()

class Environment():
    """
    Create an environment object to store environment variables
    """
    DB_URL = environ.get('DB_URL')
    DB_HOST = environ.get('DB_HOST')
    DB_PORT = environ.get('DB_PORT')
    DB_NAME = environ.get('DB_NAME')

env = Environment()