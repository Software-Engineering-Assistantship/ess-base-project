
def schema_properties_serializer(properties: dict) -> dict:
    """
    Serialize a schema's properties to a dict.

    Parameters:
    - properties: dict
        The properties to serialize.

    Returns:
    - dict
        The serialized properties.

    """

    return {
        key: {
            "bsonType": value['bson_type'],
            "description": value['description']
        }
        for key, value in properties.items()
    }

def schema_serializer(schema) -> dict:
    """
    Serialize a ModelSchema to a dict.

    Parameters:
    - schema: ModelSchema
        The schema to serialize.

    Returns:
    - dict
        The serialized schema.

    """

    return {
        "bsonType": schema['bson_type'],
        "required": schema['required'],
        "properties": schema_properties_serializer(schema['properties'])
    }