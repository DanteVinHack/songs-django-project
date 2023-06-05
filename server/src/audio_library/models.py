from django.db import models
from django.core.validators import FileExtensionValidator
from django.db.models.fields import validators


from src.base.services import (
    get_upload_path_track,
    get_upload_path_track_image,
    get_upload_path_cover_album,
    validate_image_size,
)
from src.oauth.models import AuthUser


class Genre(models.Model):
    """ Модель жанра """

    name = models.CharField('Название', max_length=50)

    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name = 'Жанр'
        verbose_name_plural = 'Жанры'

class Track(models.Model):
    """ Модель песни(трэка) """

    title = models.CharField('Название', max_length=100)
    genre = models.ForeignKey(
        Genre,
        on_delete=models.DO_NOTHING, 
    )
    user = models.ForeignKey(
        AuthUser,
        on_delete=models.CASCADE,
        related_name='tracks'
    )
    file = models.FileField(
        upload_to=get_upload_path_track,
        validators=[FileExtensionValidator(['mp3', 'wav'])],
    )
    link_of_author = models.SlugField(max_length=120)
    likes_count = models.PositiveIntegerField('Количество лайков', default=0)
    user_of_likes = models.ManyToManyField(
        AuthUser,
        related_name='likes_of_tracks',
        blank=True,
    )
    download = models.PositiveIntegerField('Количество скачиваний', default=0)
    cover = models.ImageField(
        upload_to=get_upload_path_track_image,
        validators=[validate_image_size]
    )
    create_at = models.DateTimeField('Дата добавления', auto_now_add=True)

    def __str__(self):
        return f'{self.title} - {self.user.display_name}'

    class Meta:
        verbose_name = 'Трэк'
        verbose_name_plural = 'Трэки'


class Comment(models.Model):
    """ Модель комментариев к треку """

    user = models.ForeignKey(
        AuthUser,
        on_delete=models.CASCADE,
        related_name='comments'
    )
    track = models.ForeignKey(
        Track,
        on_delete=models.CASCADE,
        related_name='track_comments'
    )
    text = models.TextField(max_length=1000)
    create_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.email}'

    class Meta:
        verbose_name = 'Комментий'
        verbose_name_plural = 'Комментии'


class PlayList(models.Model):
    """ Модель плэйлиста """

    title = models.CharField('Название плэйлиста', max_length=120)
    user = models.ForeignKey(
        AuthUser,
        on_delete=models.CASCADE,
        related_name='play_lists'
    )
    tracks = models.ManyToManyField(
        Track,
        related_name='track_play_lists'
    )
    create_at = models.DateTimeField('Дата создания', auto_now_add=True)

    def __str__(self):
        return f'{self.title}'

    class Meta:
        verbose_name = 'Плэйлист'
        verbose_name_plural = 'Плэйлисты'
