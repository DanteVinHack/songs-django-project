import jwt

from django.conf import settings
from rest_framework import authentication, exceptions

from datetime import datetime
from typing import Optional

from ..models import AuthUser

# from .models import AuthUser


class AuthBackend(authentication.BaseAuthentication):
    """ Авторизует пользователя """
    authentication_header_prefix = 'Token'

    def authenticate(self, request, token=None, **kwargs) -> Optional[tuple]:
        auth_header = authentication.get_authorization_header(request).split()

        if not auth_header or auth_header[0].lower() != b'token':
            return None

        if len(auth_header) == 1:
            raise exceptions.AuthenticationFailed(
                'Некорректный заголовок токена.'
            )
        if len(auth_header) > 2:
            raise exceptions.AuthenticationFailed(
                'Некорректный заголовок токена. Токен должен иметь пробелы'
            )

        try:
            token = auth_header[1].decode('utf-8')
        except UnicodeDecodeError:
            raise exceptions.AuthenticationFailed(
                'Некорретный токен. Токен должен содеражать допустимые символы.'
            )

        return self.authenticate_credential(token)

    def authenticate_credential(self, token) -> tuple:
        try:
            payload = jwt.decode(
                token,
                settings.TOKEN_SECRET_KEY,
                algorithms=settings.ALGORITHM
            )
        except jwt.PyJWTError:
            raise exceptions.AuthenticationFailed(
                'Ошибка авторизации. Такого токена не существует'
            )

        token_exp = datetime.fromtimestamp(payload['exp'])
        if token_exp < datetime.utcnow():
            raise exceptions.AuthenticationFailed(
                'Время жизни токена истекло.')

        try:
            user = AuthUser.objects.get(id=payload['user_id'])
        except AuthUser.DoesNotExist:
            raise exceptions.AuthenticationFailed(
                'Такого пользователя не существует')

        return user, None
