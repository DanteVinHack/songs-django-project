import bcrypt

from rest_framework import (
    viewsets,
    parsers,
    permissions,
    exceptions
)
from rest_framework.response import Response
from rest_framework.request import Request
from django.conf import settings
from django.shortcuts import get_object_or_404

from . import serializers
from . import models
from .services.base_auth import (
    create_token,
)


def _encode_password(password: str) -> str:
    password = password.encode(settings.ENCODE)
    return bcrypt.hashpw(
        password, bcrypt.gensalt()
    )


def _save_user_by_data(user_data: dict) -> models.AuthUser:
    new_user = models.AuthUser(
        email=user_data['email'],
        display_name=user_data['display_name'],
        password=user_data['password'],
    )

    new_user.save()
    return new_user


class AuthView(viewsets.ModelViewSet):
    """ Регистрация гостя на сайте """
    queryset = models.AuthUser.objects.all()
    parser_classes = (parsers.MultiPartParser,)
    serializer_class = serializers.UserSerializer
    permission_classes = (permissions.AllowAny,)

    def register(self, request: Request):
        """Регистрация гостя на сайтe"""
        user_data = request.data.dict()
        print(user_data)

        if len(user_data['password']) < 8:
            raise exceptions.AuthenticationFailed(
                'Пароль должен содержать более 8 символом'
            )

        user_data['password'] = _encode_password(user_data['password'])

        new_user = _save_user_by_data(user_data)

        token = create_token(new_user.id)

        return Response(token)

    def login(self, request: Request):
        """ Авторизация пользователя с помощью email и пароля.
        Возвращает данные токена """
        user_data = request.data
        user = get_object_or_404(models.AuthUser, email=user_data['email'])

        is_matched = bcrypt.checkpw(user_data['password'], user.password)

        if not is_matched:
            raise exceptions.AuthenticationFailed('Неверный пароль')

        token = create_token(user.id)

        return Response(token)


class UserView(viewsets.ModelViewSet):
    """ Просмотр и редактирование данных пользователя """
    queryset = models.AuthUser.objects.all()
    parser_classes = (parsers.MultiPartParser, parsers.JSONParser,)
    serializer_class = serializers.UserSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        """Выявление пользователя"""
        return self.request.user

    def get_object(self):
        """ Получение пользователя"""
        return self.get_queryset()
