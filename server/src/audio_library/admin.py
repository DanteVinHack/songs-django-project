from django.contrib import admin

from . import models

admin.site.register(models.Comment)
admin.site.register(models.PlayList)


@admin.register(models.Track)
class TrackAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'genre', 'create_at')
    list_display_links = ('user', 'id')

    prepopulated_fields = {'link_of_author': ('user',)}


@admin.register(models.Genre)
class GenreAdmin(admin.ModelAdmin):
    list_display = ('id', 'name',)
    list_display_links = ('id', 'name')
