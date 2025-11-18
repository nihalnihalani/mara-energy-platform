"""
Vercel serverless function wrapper for FastAPI application
"""
from main import app

# Vercel expects a handler function
handler = app

