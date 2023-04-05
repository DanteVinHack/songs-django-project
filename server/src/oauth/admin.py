from django.contrib import admin
from django import forms

from . import models


class UserForm(forms.ModelForm):
    class Meta:
        model = models.AuthUser
        exclude = ('password',)


@admin.register(models.AuthUser)
class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'email', 'display_name',)
    list_display_links = ('id', 'email',)
    search_fields = ('email', 'display_name',)
    form = UserForm


admin.site.register(models.SocialLink)
