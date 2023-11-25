from typing import Optional
from pydantic import BaseModel

class HttpResponseModel(BaseModel):
    message: str
    status_code: int
    data: Optional[dict] | Optional[list] = None

class HTTPResponses:

    """
    This class contains the basic HTTP responses for the API
    """

    @staticmethod
    def ITEM_NOT_FOUND() -> HttpResponseModel:
        return HttpResponseModel(
            message="Item not found",
            status_code=404,
        )

    @staticmethod
    def ITEM_FOUND() -> HttpResponseModel:
        return HttpResponseModel(
            message="Item found",
            status_code=200,
        )

    @staticmethod
    def ITEM_CREATED() -> HttpResponseModel:
        return HttpResponseModel(
            message="Item created",
            status_code=201,
        )

    @staticmethod
    def SERVER_ERROR() -> HttpResponseModel:
        return HttpResponseModel(
            message="Server error",
            status_code=500,
        )


    # TODO: implement other responses (item created, updated, deleted, etc)