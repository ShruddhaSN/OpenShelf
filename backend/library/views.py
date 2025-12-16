from rest_framework import generics
from django.contrib.auth.models import User
from .models import Book, UserBookStatus
from .serializers import BookSerializer, UserBookStatusSerializer

class BookListView(generics.ListAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer


class BookDetailView(generics.RetrieveAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class UserBookStatusListView(generics.ListAPIView):
    serializer_class = UserBookStatusSerializer

    def get_queryset(self):
        user = self.request.user
        return UserBookStatus.objects.filter(user=user)
