from rest_framework.serializers import ModelSerializer

from . import models


class UserSerializer(ModelSerializer):
    class Meta:
        model = models.AuthUser
        fields = ('avatar', 'display_name', 'email',)
