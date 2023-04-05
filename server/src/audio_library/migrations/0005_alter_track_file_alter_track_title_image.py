# Generated by Django 4.1.7 on 2023-03-17 19:44

import django.core.validators
from django.db import migrations, models
import src.base.services


class Migration(migrations.Migration):

    dependencies = [
        ('audio_library', '0004_alter_album_options'),
    ]

    operations = [
        migrations.AlterField(
            model_name='track',
            name='file',
            field=models.FileField(default=1, upload_to=src.base.services.get_upload_path_track, validators=[django.core.validators.FileExtensionValidator(['mp3', 'wav'])]),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='track',
            name='title_image',
            field=models.ImageField(blank=True, null=True, upload_to=src.base.services.get_upload_path_track_image),
        ),
    ]