from django.contrib import admin
from .models import Book, UserBookStatus


@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ("title", "author", "genre", "uploaded_at")
    search_fields = ("title", "author", "genre")

@admin.register(UserBookStatus)
class UserBookStatusAdmin(admin.ModelAdmin):
    list_display = ("user", "book", "status", "progress", "last_read_at")
    list_filter = ("status",)