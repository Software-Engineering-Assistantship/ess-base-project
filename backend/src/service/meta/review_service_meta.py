from abc import ABC, abstractmethod

from src.schemas.review import ReviewGet

class ReviewServiceMeta(ABC):

    @abstractmethod
    def get_review(self, review_id: str) -> ReviewGet:
        """Get item by id method definition"""
        pass