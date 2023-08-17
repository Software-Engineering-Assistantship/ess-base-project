from src.schemas.response import HTTPResponses, HttpResponseModel
# from src.service.meta.review_service_meta import ReviewServiceMeta
from src.schemas.review import ReviewCreateModel
from src.db.__init__ import database as db

class ReviewService:

    @staticmethod
    def create_review(review: ReviewCreateModel):
        """Create item method implementation"""
        review = db.add('reviews', review)
        return review

    @staticmethod
    def get_review(review_id: str):
        """Get item by id method implementation"""
        review = db.get_by_id('reviews', review_id)
        return review

        
    @staticmethod
    def get_reviews():
        """Get items method implementation"""
        reviews = db.get_all_reviews('reviews')

    @staticmethod
    def update_review(review_id: str, review: ReviewCreateModel):
        """Update item method implementation"""
        review = db.edit('reviews', review_id, review)
        return review

    @staticmethod
    def delete_review(review_id: str):
        """Delete item method implementation"""
        review = db.delete('reviews', review_id)
        return review

    
    # TODO: implement other methods (create, update, delete)