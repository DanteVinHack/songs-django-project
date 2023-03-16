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
