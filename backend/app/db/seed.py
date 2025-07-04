# app/db/seed.py
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

from sqlalchemy.orm import Session
from app.db.database import SessionLocal
from app.db.models import User, Presentation, Feedback
import uuid
from datetime import datetime

def seed():
    db: Session = SessionLocal()

    try:
        # User作成
        user = User(
            id=uuid.uuid4(),
            firebase_uid="test_uid_001",
            age=10,
            icon_image="sample_icon.png",
            created_at=datetime.utcnow()
        )
        db.add(user)
        db.commit()
        db.refresh(user)

        # Presentation作成
        presentation = Presentation(
            user_id=user.id,
            transcript="ぼくの好きな動物について話します。えーと、犬が好きです。かわいいし、元気に走ります。",
            audio_url="audio/test1.mp3",
            created_at=datetime.utcnow()
        )
        db.add(presentation)
        db.commit()
        db.refresh(presentation)

        # Feedback作成
        feedback = Feedback(
            user_id=user.id,
            presentation_id=presentation.id,
            total_score=85,
            well_done="声がはっきりしていて、わかりやすかったよ！",
            next_challenge="もう少し犬の特徴を具体的に説明できるとさらに良いね！",
            created_at=datetime.utcnow()
        )
        db.add(feedback)
        db.commit()

        print("シーディング完了！")

    except Exception as e:
        print(f"シーディングエラー: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed()
