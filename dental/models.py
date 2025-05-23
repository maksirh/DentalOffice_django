from django.db import models
from users.models import User

class Dentist(models.Model):
    name = models.CharField(max_length=128)
    age = models.PositiveIntegerField()
    experience = models.PositiveIntegerField()
    phoneNumber = models.CharField(max_length=15)
    image = models.ImageField(upload_to='dentists_images')

    def __str__(self):
        return self.name

class Patient(models.Model):
    name = models.CharField(max_length=128)
    age = models.PositiveIntegerField()
    phoneNumber = models.CharField(max_length=15)
    image = models.ImageField(upload_to='patients_images')

    def __str__(self):
        return self.name

class Appointment(models.Model):
    name = models.CharField(max_length=128)
    age = models.PositiveIntegerField()
    phoneNumber = models.CharField(max_length=15)
    reason = models.TextField()

    def __str__(self):
        return f"{self.name} ({self.phoneNumber})"

class WorkerType(models.Model):
    name = models.CharField(max_length=128)
    description = models.TextField()

    def __str__(self):
        return self.name

class Worker(models.Model):
    name = models.CharField(max_length=128)
    age = models.PositiveIntegerField()
    phoneNumber = models.CharField(max_length=15)
    type = models.ForeignKey(to=WorkerType, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Service(models.Model):
    name = models.CharField(max_length=128)
    description = models.TextField()
    image = models.ImageField(upload_to='services_images')

    def __str__(self):
        return self.name

class Review(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="reviews",
        verbose_name="Користувач",
    )
    review = models.TextField("Відгук")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.user.username}: {self.review[:30]}"


