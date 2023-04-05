import os

from django.core.exceptions import ValidationError
from django.core.files import File


def get_upload_path_avatar(instance, file: File) -> str:
    """ Получить путь до файла с аватарами """

    return f'avatar/{instance.id}/{file}'


def validate_image_size(file: File) -> str:
    """ Проверить не выходит ли размер файла за рамки дозволенного """

    megabite_limit = 2

    if file.size > megabite_limit * 1024 * 1024:
        raise ValidationError(f'Макимальный размер файла {megabite_limit}MB')


def get_upload_path_track(instance, file: File) -> str:
    """ Получить путь до файла песни(трэка) """

    return f'track/{instance.user.id}/{file}'


def get_upload_path_track_image(instance, file: File) -> str:
    """ Получить путь до фотографии песни(трэка) """

    return f'cover/{instance.user.id}/{file}'


def get_upload_path_cover_album(instance, file: File) -> str:
    """ Получить путь до фотографии альбома """

    return f'album/cover/{instance.user.id}/images/{file}'


def delete_old_file(path_file):
    """ Удаление старого файла """
    if os.path.exists(path_file):
        os.remove(path_file)
