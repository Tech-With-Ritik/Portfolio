from django.contrib import admin
from .models import Contact, Project

admin.site.register(Contact)


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at', 'updated_at')
    search_fields = ('title', 'description', 'technologies')
    ordering = ('-created_at',)

