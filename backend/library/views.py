from rest_framework import generics
from django.contrib.auth.models import User
from .models import Book, UserBookStatus
from .serializers import BookSerializer, UserBookStatusSerializer
from rest_framework.permissions import IsAuthenticated,IsAdminUser

class BookListView(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    def get_permissions(self):
        if self.request.method == "POST":
            return [IsAdminUser()]
        return []


class BookDetailView(generics.RetrieveAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class UserBookStatusListView(generics.ListAPIView):
    serializer_class = UserBookStatusSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return UserBookStatus.objects.filter(user=user)
