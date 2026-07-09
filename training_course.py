from sqlalchemy import Column, Integer, String, Text, Float, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..database import Base


class TrainingCourse(Base):
    __tablename__ = "training_courses"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    description = Column(Text)
    category = Column(String(100))
    duration_hours = Column(Float)
    content_url = Column(String(500))
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    enrollments = relationship("TrainingEnrollment", back_populates="course")
