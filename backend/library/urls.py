from django.urls import path
from .views import (
    BookListView,
    BookDetailView,
    UserBookStatusListView,
)

urlpatterns = [
    path("books/", BookListView.as_view(), name="book-list"),
    path("books/<int:pk>/", BookDetailView.as_view(), name="book-detail"),
    path("my-books/", UserBookStatusListView.as_view(), name="user-book-status"),
]
