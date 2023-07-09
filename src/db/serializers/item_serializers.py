def item_entity(item) -> dict:
    """
    Returns a dict of the item entity
    """
    return {
        "name": item["name"],
        "created_at": item["created_at"],
    }

def item_response_entity(item) -> dict:
    """
    Returns a dict of the item response entity
    """
    return {
        "id": item["id"],
        "name": item["name"],
        "created_at": item["created_at"],
    }

def item_list_entity(items) -> list:
    """
    Returns a list of the item entity
    """
    return [item_entity(item) for item in items]