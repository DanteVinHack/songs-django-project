from django.db import models
from django.core.validators import FileExtensionValidator

from src.base.services import (
    get_upload_path_avatar,
    validate_image_size
)


class AuthUser(models.Model):
    """ Модель пользователь """

    email = models.EmailField(max_length=160, unique=True)
    password = models.CharField('Пароль', max_length=60)
    display_name = models.CharField('Показываемое имя', max_length=60)
    create_account_date = models.DateField(
        'Дата создания аккаунта',
        auto_now_add=True
    )
    avatar = models.ImageField(
        'Аватар пользователя',
        upload_to=get_upload_path_avatar,
        blank=True,
        null=True,
        validators=[
            FileExtensionValidator(['jpg', 'png']),
            validate_image_size
        ]
    )

    @property
    def is_authenticated(self):
        """ Всегда возвращает True """
        return True

    def __str__(self):
        return f'{self.email}'

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'


class Follower(models.Model):
    """ Модель подписчиков """

    user = models.ForeignKey(
        AuthUser,
        on_delete=models.CASCADE,
        related_name='owner'
    )
    subscriber = models.ForeignKey(
        AuthUser,
        on_delete=models.CASCADE,
        related_name='subscriber'
    )

    def __str__(self):
        return f'{self.subscriber} подписан на {self.user}'

    class Meta:
        verbose_name = 'Подписчик'
        verbose_name_plural = 'Подписчики'


class SocialLink(models.Model):
    """ Модель ссылок на соц. сети пользователя """
    user = models.ForeignKey(
        AuthUser,
        on_delete=models.CASCADE,
        related_name='social_link'
    )
    url = models.URLField(max_length=100)

    def __str__(self):
        return f'{self.user}'

    class Meta:
        verbose_name = 'Социальная ссылка'
        verbose_name_plural = 'Социальная ссылки'
