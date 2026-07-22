from . import views
from django.urls import path

urlpatterns = [
    path('',views.home,name="home"),
    path('contact/',views.contact,name="contact"),
    path('projects/',views.all_projects,name="all_projects"),
]
