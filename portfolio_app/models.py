from django.db import models

# Create your models here.
class Contact(models.Model):
    name= models.CharField(max_length=40)
    email=models.EmailField(max_length=40)
    content=models.TextField(max_length=400)
    subject= models.CharField(max_length=40)

    def __str__(self):
        return self.name


class Project(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(max_length=500)
    image = models.ImageField(upload_to='projects/')
    live_link = models.URLField(blank=True, null=True)
    github_link = models.URLField(blank=True, null=True)
    technologies = models.CharField(max_length=200, help_text="Comma-separated tech tags, e.g., Python, Django, Flask")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title

