from rest_framework import generics
from django.contrib.auth.models import User
from .models import Book, UserBookStatus
from .serializers import BookSerializer, UserBookStatusSerializer, RegisterSerializer
from rest_framework.permissions import IsAuthenticated,IsAdminUser, AllowAny
from rest_framework.response import Response
from rest_framework import status as http_status
from rest_framework_simplejwt.tokens import RefreshToken


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

class UpdateReadingStatusView(generics.CreateAPIView):
    serializer_class = UserBookStatusSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        book_id = request.data.get("book")
        status_value = request.data.get("status")

        if not book_id or not status_value:
            return Response(
                {"error": "book and status are required"},
                status=http_status.HTTP_400_BAD_REQUEST,
            )

        book = Book.objects.get(id=book_id)

        obj, _ = UserBookStatus.objects.update_or_create(
            user=request.user,
            book=book,
            defaults={"status": status_value},
        )

        serializer = self.get_serializer(obj)
        return Response(serializer.data)
    
class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "username": user.username,
            },
            status=http_status.HTTP_201_CREATED,
        )
