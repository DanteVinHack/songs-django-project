import jwt

from datetime import timedelta, datetime

from django.conf import settings


def create_access_token(
    data: dict,
    expires_delta: timedelta = 15
) -> jwt.encode:
    """ Создание access токена """
    to_encode = data.copy()

    expire = datetime.utcnow() + expires_delta

    to_encode.update({'exp': expire, 'sub': 'access'})

    return jwt.encode(
        to_encode,
        settings.TOKEN_SECRET_KEY,
        algorithm=settings.ALGORITHM
    )


def create_token(user_id: int) -> dict:
    """ Создание токена """
    access_token_expires = timedelta(
        minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )

    return {
        'user_id': user_id,
        'access_token': create_access_token(
            {'user_id': user_id}, access_token_expires
        ),
        'token_type': 'Token'
    }


def decode_token(access_token: str) -> dict:
    """ Проверка токена на подлинность и актуальность """
    try:
        payload = jwt.decode(
            access_token,
            settings.TOKEN_SECRET_KEY,
            algorithms=[settings.ALGORITHM]
        )
    except jwt.InvalidTokenError:
        raise jwt.InvalidTokenError('Неверный токен')
    finally:
        return payload
