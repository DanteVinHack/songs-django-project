from rest_framework import serializers

from . import models
from src.base.services import delete_old_file


class BaseSerializer(serializers.ModelSerializer):
    """ Базовый сериализатор """
    id = serializers.IntegerField(read_only=True)


class GenreSerializer(BaseSerializer):
    """ Сериализатор жанров """
    class Meta:
        model = models.Genre
        fields = ('id', 'name')


class AlbumSerializer(BaseSerializer):
    """ Сериализатор альбомов """
    class Meta:
        model = models.Album
        fields = ('id', 'title', 'description', 'cover', 'private')

    def update(self, instance, validate_data):
        delete_old_file(instance.cover.path)
        return super().update(instance, validate_data)


class TrackListSerializer(BaseSerializer):
    """ Сериализатор трэков """
    user = serializers.SlugRelatedField('display_name', read_only=True)
    file = serializers.FileField(read_only=True)

    class Meta:
        model = models.Track
        exclude = ('create_at', 'genre', 'album',
                   'user_of_likes', 'link_of_author')


class TrackDetailSerializer(BaseSerializer):
    """ Детальный сериализатор трэков """
    user = serializers.SlugRelatedField(
        'display_name',
        many=False,
        read_only=True
    )
    genre = serializers.CharField()

    class Meta:
        model = models.Track
        exclude = ('user_of_likes',)


class PlaylistSerializer(BaseSerializer):
    """ Сериализотор плэйлистов """

    class Meta:
        model = models.PlayList
        fields = ('title', 'tracks')
