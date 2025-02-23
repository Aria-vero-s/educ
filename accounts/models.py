from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    ROLE_CHOICES = [
        ('student', 'Élève'),
        ('teacher', 'Enseignant'),
        ('parent', 'Parent'),
        ('director', 'Directeur'),
        ('secretary', 'Secrétaire'),
        ('other', 'Autre'),
    ]
    
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='student')
