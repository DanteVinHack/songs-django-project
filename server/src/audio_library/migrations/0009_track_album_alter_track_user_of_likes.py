# Generated by Django 4.1.7 on 2023-03-18 12:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('oauth', '0002_alter_authuser_display_name'),
        ('audio_library', '0008_alter_track_user_of_likes'),
    ]

    operations = [
        migrations.AddField(
            model_name='track',
            name='album',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.DO_NOTHING, to='audio_library.album'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='track',
            name='user_of_likes',
            field=models.ManyToManyField(blank=True, related_name='likes_of_tracks', to='oauth.authuser'),
        ),
    ]
