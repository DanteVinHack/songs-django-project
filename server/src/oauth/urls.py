from django.urls import path

from .views import AuthView

urlpatterns = [
    path('register/', AuthView.as_view({'post': 'auth'}))
]
