from django.db import models


class Author(models.Model):
    email = models.CharField(max_length=160, unique=True)
    password = models.CharField('Пароль', max_length=60)
    display_name = models.CharField(max_length=60)


class Playlist(models.Model):
    title = models.CharField('Название плейлиста', max_length=100)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    like_count = models.PositiveIntegerField('Количество лайков', default=0)


class Follower(models.Model):
    user = models.ForeignKey(AuthUser, on_delete=models.CASCADE)
    user_at = models.ForeignKey(AuthUser, on_delete=models.CASCADE)
