from fastapi import APIRouter, status
from src.schemas.response import HttpResponseModel
from src.service.impl.item_service import ItemService

router = APIRouter()

@router.get(
    "/{item_id}", 
    response_model=HttpResponseModel,
    status_code=status.HTTP_200_OK,
    description="Retrieve an item by its ID",
    tags=["items"],
    responses={
        status.HTTP_200_OK: {
            "model": HttpResponseModel,
            "description": "Successfully got item by id",
        },
        status.HTTP_404_NOT_FOUND: {
            "description": "Item not found",
        }
    },
)
def get_item(item_id: str) -> HttpResponseModel:
    """
    Get item by ID.

    Parameters:
    - item_id: The ID of the item to retrieve.

    Returns:
    - The item with the specified ID.

    Raises:
    - HTTPException 404: If the item is not found.

    """
    item_get_response = ItemService.get_item(item_id)
    return item_get_response


@router.get(
    "/", 
    response_model=HttpResponseModel,
    status_code=status.HTTP_200_OK,
    description="Retrieve all items",
    tags=["items"],
    responses={
        status.HTTP_200_OK: {
            "model": HttpResponseModel,
            "description": "Successfully got all the items",
        }
    },
)
def get_items() -> HttpResponseModel:
    """
    Get all items.

    Returns:
    - A list of all items.

    """

    item_list_response = ItemService.get_items()
    
    return item_list_response


# TODO: Add POST, PUT, DELETE endpoints