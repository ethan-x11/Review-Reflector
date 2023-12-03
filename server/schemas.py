from pydantic import BaseModel

class Load(BaseModel):
    aurl: str
    email: str = None