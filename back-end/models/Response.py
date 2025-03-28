from pydantic import BaseModel
from typing import Any, Optional

class StandardResponse(BaseModel):
    data: Optional[Any] = None
    error: Optional[str] = None
  

def success_response(data: Any):
    return StandardResponse(data=data)

def error_response(error: str):
    return StandardResponse(error=error)