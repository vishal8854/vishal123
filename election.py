from sqlalchemy import Column, Integer, String, Date, Text
from sqlalchemy.orm import relationship
from ..database import Base


class Election(Base):
    __tablename__ = "elections"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    election_type = Column(String(50))
    election_date = Column(Date, nullable=False)
    jurisdiction = Column(String(200))
    description = Column(Text)
    status = Column(String(50), default="upcoming")

    badges = relationship("Badge", back_populates="election")
