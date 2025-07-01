# app/db/seed.py
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

from sqlalchemy.orm import Session
from app.db.database import SessionLocal
from app.db.models import User
import uuid
from datetime import datetime

def seed():
    db: Session = SessionLocal()

    user = User(
        user_id=uuid.uuid4(),
        user_name="テスト太郎",
        age=10,
        created_at=datetime.utcnow()
    )

    db.add(user)
    db.commit()
    db.close()

if __name__ == "__main__":
    seed()
