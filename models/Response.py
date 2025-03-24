from pydantic import BaseModel

class StandardResponse(BaseModel):
    data: any = None
    error: str = None
  

def success_response(data: any):
    return StandardResponse(data=data)

def error_response(error: str):
    return StandardResponse(error=error)
