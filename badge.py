from sqlalchemy import Column, Integer, String, DateTime, Date, ForeignKey, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..database import Base
import enum


class BadgeStatus(str, enum.Enum):
    ISSUED = "issued"
    ACTIVE = "active"
    REVOKED = "revoked"
    EXPIRED = "expired"


class Badge(Base):
    __tablename__ = "badges"

    id = Column(Integer, primary_key=True, index=True)
    observer_id = Column(Integer, ForeignKey("observers.id"), nullable=False)
    election_id = Column(Integer, ForeignKey("elections.id"), nullable=False)
    badge_number = Column(String(50), unique=True, nullable=False, index=True)
    status = Column(Enum(BadgeStatus), default=BadgeStatus.ISSUED)
    issued_date = Column(DateTime(timezone=True), server_default=func.now())
    expiration_date = Column(Date)
    qr_code = Column(String(500))
    issued_by = Column(Integer, ForeignKey("users.id"))

    observer = relationship("Observer", back_populates="badges")
    election = relationship("Election", back_populates="badges")
    issuer = relationship("User")
