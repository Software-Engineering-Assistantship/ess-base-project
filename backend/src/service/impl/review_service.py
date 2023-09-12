from src.schemas.response import HTTPResponses, HttpResponseModel
from src.schemas.review import ReviewCreateModel
from fastapi import HTTPException
from src.db.__init__ import database as db


class ReviewService:

    @staticmethod
    def create_review(review: ReviewCreateModel):
        """Create item method implementation"""
        song_id = review.song
        song = db.get_item_by_id('songs', song_id)

        if song:
            song['popularity'] += 1
            review = db.add('reviews', review)
            song = db.edit('songs', song['_id'], song)
        else:
            raise HTTPException(status_code=404, detail="Item not found")

        return review

    @staticmethod
    def get_review(review_id: str):
        """Get item by id method implementation"""
        review = db.get_by_id('reviews', review_id)
        print(review)
        review['id'] = str(review['_id'])
        return review

    @staticmethod
    def get_reviews():
        """Get items method implementation"""
        reviews = db.get_all_items('reviews')
        return reviews

    @staticmethod
    def update_review(review_id: str, review: ReviewCreateModel):
        """Update item method implementation"""
        print("service update_review")
        review = db.edit('reviews', review_id, review)
        return review

    @staticmethod
    def delete_review(review_id: str):
        """Delete item method implementation"""
        review = db.delete('reviews', review_id)
        return review
