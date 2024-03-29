# Generated by Django 4.1.7 on 2023-04-22 19:20

from django.db import migrations, models
import django.db.models.deletion
import src.base.services


class Migration(migrations.Migration):

    dependencies = [
        ('audio_library', '0013_remove_genre_url'),
    ]

    operations = [
        migrations.AlterField(
            model_name='track',
            name='cover',
            field=models.ImageField(default=1, upload_to=src.base.services.get_upload_path_track_image, validators=[src.base.services.validate_image_size]),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='track',
            name='genre',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='audio_library.genre'),
        ),
    ]
