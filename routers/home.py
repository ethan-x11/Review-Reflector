from fastapi import APIRouter, status

router = APIRouter()


@router.get('/', status_code=status.HTTP_200_OK, tags=['Home Page Route'])
def homePage():
    return {'data': 'Sentiment Analysis API'}
