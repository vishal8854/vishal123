from sqlalchemy import Column, Integer, String, Date, DateTime, Text, Enum, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..database import Base
import enum


class ObserverStatus(str, enum.Enum):
    PENDING = "pending"
    REGISTERED = "registered"
    TRAINED = "trained"
    CERTIFIED = "certified"
    ACTIVE = "active"
    SUSPENDED = "suspended"
    EXPIRED = "expired"


class Observer(Base):
    __tablename__ = "observers"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, nullable=False, index=True)
    phone = Column(String(20))
    date_of_birth = Column(Date)
    address = Column(Text)
    party_affiliation = Column(String(100))
    jurisdiction = Column(String(200))
    precinct = Column(String(100))
    status = Column(Enum(ObserverStatus), default=ObserverStatus.PENDING, nullable=False)
    photo_url = Column(String(500))
    notes = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    enrollments = relationship("TrainingEnrollment", back_populates="observer")
    badges = relationship("Badge", back_populates="observer")
