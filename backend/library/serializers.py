from rest_framework import serializers
from .models import Book, UserBookStatus


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = "__all__"
        
class UserBookStatusSerializer(serializers.ModelSerializer):
    book = BookSerializer(read_only=True)

    class Meta:
        model = UserBookStatus
        fields = "__all__"
