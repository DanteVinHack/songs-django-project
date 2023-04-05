from django.urls import path

from .views import AuthView, UserView

urlpatterns = [
    path('register/', AuthView.as_view({'post': 'register'})),
    path('login/', AuthView.as_view({'post': 'login'})),
    path('me/', UserView.as_view({'get': 'retrieve', 'put': 'update'})),
]
