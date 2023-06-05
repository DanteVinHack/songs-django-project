from rest_framework import viewsets, parsers, generics, permissions

from src.base.permissions import IsAuthor
from src.base.services import delete_old_file
from . import models, serializers

class GenreView(generics.ListAPIView):
    """ Вывод жанров """
    queryset = models.Genre.objects.all()
    serializer_class = serializers.GenreSerializer

class TrackView(viewsets.ModelViewSet):
    """ Вывод трэков """
    queryset = models.Track.objects.all()
    serializer_class = serializers.TrackListSerializer
    permission_classes = (permissions.AllowAny,)
    parser_classes = (parsers.MultiPartParser, parsers.JSONParser,)

class TrackAuthorView(viewsets.ModelViewSet):
    """ CRUD трэков для автора """
    parser_classes = (parsers.MultiPartParser,)
    serializer_class = serializers.TrackDetailSerializer
    permission_classes = (IsAuthor,)

    def get_queryset(self):
        return models.Track.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        genre = models.Genre.objects.get(name=self.request.data['genre'])

        serializer.save(user=self.request.user, genre=genre)

    def perform_destroy(self, instance):
        delete_old_file(instance.cover.path)
        instance.delete()

class TrackFavoriteView(viewsets.ModelViewSet):
    """ CRUD трэков для автора """
    parser_classes = (parsers.MultiPartParser,)
    serializer_class = serializers.TrackListSerializer
    permission_classes = (IsAuthor,)

    def get_queryset(self):
        return models.Track.objects.filter(user_of_likes=self.request.user)


class PlaylistView(viewsets.ModelViewSet):
    queryset = models.PlayList.objects.all()
    serializer_class = serializers.PlaylistSerializer
    permission_classes = (IsAuthor,)

    def get_queryset(self):
        return models.PlayList.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.data)

    def perform_destroy(self, instance):
        delete_old_file(instance.cover.path)
        instance.delete()
