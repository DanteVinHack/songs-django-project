from rest_framework import serializers

from . import models

class BaseSerializer(serializers.ModelSerializer):
    """ Базовый сериализатор """
    id = serializers.IntegerField(read_only=True)


class GenreSerializer(BaseSerializer):
    """ Сериализатор жанров """
    class Meta:
        model = models.Genre
        fields = ('id', 'name')


class TrackListSerializer(BaseSerializer):
    """ Сериализатор трэков """
    user = serializers.SlugRelatedField('display_name', read_only=True)
    file = serializers.FileField(read_only=True)
    cover = serializers.FileField(read_only=True)

    class Meta:
        model = models.Track
        exclude = ('create_at', 'genre',)


class TrackDetailSerializer(BaseSerializer):
    """ Детальный сериализатор трэков """
    user = serializers.SlugRelatedField(
        'display_name',
        many=False,
        read_only=True
    )
    genre = serializers.CharField(read_only=True)

    class Meta:
        model = models.Track
        exclude = ('user_of_likes',)


class PlaylistSerializer(BaseSerializer):
    """ Сериализотор плэйлистов """

    class Meta:
        model = models.PlayList
        fields = ('title', 'tracks')
