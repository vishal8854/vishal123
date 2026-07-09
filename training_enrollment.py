from sqlalchemy import Column, Integer, DateTime, ForeignKey, Float, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..database import Base
import enum


class EnrollmentStatus(str, enum.Enum):
    ENROLLED = "enrolled"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    FAILED = "failed"


class TrainingEnrollment(Base):
    __tablename__ = "training_enrollments"

    id = Column(Integer, primary_key=True, index=True)
    observer_id = Column(Integer, ForeignKey("observers.id"), nullable=False)
    course_id = Column(Integer, ForeignKey("training_courses.id"), nullable=False)
    status = Column(Enum(EnrollmentStatus), default=EnrollmentStatus.ENROLLED)
    progress_percent = Column(Float, default=0.0)
    score = Column(Float)
    completed_at = Column(DateTime(timezone=True))
    enrolled_at = Column(DateTime(timezone=True), server_default=func.now())

    observer = relationship("Observer", back_populates="enrollments")
    course = relationship("TrainingCourse", back_populates="enrollments")
