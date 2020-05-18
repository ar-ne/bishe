# settings.py
from dotenv import load_dotenv
import os

load_dotenv()

BACKEND_URL = os.getenv("BACKEND_URL")
SSL = bool(os.getenv('SSL'))
PORT = int(os.getenv('PORT'))
