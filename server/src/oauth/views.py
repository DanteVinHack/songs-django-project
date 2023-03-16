from rest_framework import (
    viewsets,
    parsers,
    permissions,
    exceptions
)
from rest_framework.response import Response

from . import serializers
from . import models


class AuthView(viewsets.ModelViewSet):
    """ Регистрация гостя на сайте """
    queryset = models.AuthUser.objects.all()
    parser_classes = (parsers.MultiPartParser, parsers.JSONParser)
    serializer_class = serializers.UserSerializer
    permission_classes = (permissions.AllowAny,)

    def auth(self, request):
        user_data = request.data
        print(user_data)
        new_user = models.AuthUser(
            email=user_data['email'],
            display_name=user_data['display_name'],
        )
        new_user.save()

        serializer = serializers.UserSerializer(new_user, many=False)

        return Response(serializer.data)


class UserView(viewsets.ModelViewSet):
    """ Просмотр и редактирование данных пользователя """
    queryset = models.AuthUser.objects.all()
    parser_classes = (parsers.MultiPartParser,)
    serializer_class = serializers.UserSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return self.request.user

    def get_object(self):
        return self.get_queryset()
