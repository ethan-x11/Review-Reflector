from fastapi import APIRouter,status
from main_pipeline import execute_pipeline
import schemas


router = APIRouter()


@router.post('/amazon', status_code=status.HTTP_201_CREATED, tags=['Analysis Route'])
def predict(request: schemas.Load):
    output = execute_pipeline(
        url=request.aurl
    )
    # output = {"Meow"}

    return output
