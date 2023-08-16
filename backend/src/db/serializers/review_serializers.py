def review_entity(review) -> dict:
    return {
        "id": review["name"],
        "title": review["title"],
        "rating": review["rating"],
        "description": review["description"],
        "created_at": review["created_at"],
        "author": review["author"],
        "song": review["song"],
    }

def review_response_entity(review) -> dict:
    return {
        "id": review["name"],
        "title": review["title"],
        "rating": review["rating"],
        "description": review["description"],
        "created_at": review["created_at"],
        "author": review["author"],
        "song": review["song"],
    }

def review_list_entity(reviews) -> list:
    return [review_entity(review) for review in reviews]

