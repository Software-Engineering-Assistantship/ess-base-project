
from abc import ABC, abstractmethod

from src.schemas.item import ItemGet

class ItemServiceMeta(ABC):

    @abstractmethod
    def get_item(self, item_id: str) -> ItemGet:
        """Get item by id method definition"""
        pass