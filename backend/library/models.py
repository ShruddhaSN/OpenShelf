from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    genre = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    pdf = models.FileField(
        upload_to="books/pdfs/",
        null=True,
        blank=True
    )

    cover_image = models.ImageField(
        upload_to="books/covers/",
        null=True,
        blank=True
    )

    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class UserBookStatus(models.Model):
    STATUS_CHOICES = [
        ("not_read", "Not Read"),
        ("reading", "Reading"),
        ("read", "Read"),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="not_read"
    )

    progress = models.PositiveIntegerField(default=0)
    last_read_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ("user", "book")

    def __str__(self):
        return f"{self.user.username} - {self.book.title} ({self.status})"