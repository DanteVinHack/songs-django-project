from django.urls import path

from . import views

urlpatterns = [
    path('genre/', views.GenreView.as_view()),

    path('track/', views.TrackView.as_view({'get': 'list'})),
    path('track/<int:pk>/', views.TrackView.as_view(
        {'get': 'retrieve', 'put': 'update'}
    )),

    path('playlist/', views.PlaylistView.as_view(
        {'get': 'list', 'post': 'create'}
    )),

    path('playlist/<int:pk>/', views.PlaylistView.as_view(
        {'put': 'update', 'delete': 'destroy'}
    )),

    path('me/album/', views.AlbumView.as_view(
        {'get': 'list', 'post': 'create'}
    )),
    path('me/album/<int:pk>/', views.AlbumView.as_view(
        {'put': 'update', 'delete': 'destroy'}
    )),

    path('me/track/', views.TrackAuthorView.as_view(
        {'get': 'list', 'post': 'create'}
    )),
    path('me/track/<int:pk>/', views.TrackAuthorView.as_view(
        {'put': 'update', 'delete': 'destroy'}
    )),

]
