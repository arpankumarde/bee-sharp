import os
from dotenv import load_dotenv
from pymongo import MongoClient

# Load environment variables from .env file
load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")


if not MONGO_URI:
    raise ValueError("MONGO_URI not set in environment variables")

# Create MongoDB client/db object
client = MongoClient(MONGO_URI)
db = client.get_default_database()
