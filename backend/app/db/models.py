from sqlalchemy import Column, String, Integer, Text, DateTime, ForeignKey, Boolean
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
import sqlalchemy
import uuid
import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    firebase_uid = Column(String(128), unique=True, nullable=False)
    name = Column(String(128), nullable=False)
    age = Column(Integer)
    icon_image = Column(String(255))
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    paid = Column(
        Boolean, 
        nullable=False,                            # ←null許可しない
        default=False,                             # ←Python上のデフォルト
        server_default=sqlalchemy.sql.expression.false()  # ←DBレベルでもデフォルト
    )

    presentations = relationship("Presentation", back_populates="user", cascade="all, delete-orphan")
    feedbacks = relationship("Feedback", back_populates="user", cascade="all, delete-orphan")
    payments = relationship("Payment", back_populates="user", cascade="all, delete-orphan")

class Presentation(Base):
    __tablename__ = "presentations"
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    transcript = Column(Text)
    audio_url = Column(String(255))
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="presentations")
    feedbacks = relationship("Feedback", back_populates="presentation", cascade="all, delete-orphan")

class Feedback(Base):
    __tablename__ = "feedbacks"
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    presentation_id = Column(Integer, ForeignKey("presentations.id"), nullable=False)
    total_score = Column(Integer)
    well_done = Column(Text)
    next_challenge = Column(Text)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="feedbacks")
    presentation = relationship("Presentation", back_populates="feedbacks")
    
class Payment(Base):
    __tablename__ = "payments"
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    amount = Column(Integer, nullable=False)
    status = Column(String(20), nullable=False)
    stripe_session_id = Column(String(255))
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="payments")
