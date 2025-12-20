from django.urls import path
from .views import (
    BookListView,
    BookDetailView,
    UserBookStatusListView,
    UpdateReadingStatusView
)

urlpatterns = [
    path("books/", BookListView.as_view(), name="book-list"),
    path("books/<int:pk>/", BookDetailView.as_view(), name="book-detail"),
    path("my-books/", UserBookStatusListView.as_view(), name="user-book-status"),
    path(
    "reading-status/",
    UpdateReadingStatusView.as_view(),
    name="update-reading-status",
),
]
