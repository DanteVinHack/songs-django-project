# Generated by Django 4.1.7 on 2023-03-17 16:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('oauth', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='authuser',
            name='display_name',
            field=models.CharField(max_length=60, verbose_name='Пользовательское имя'),
        ),
    ]
