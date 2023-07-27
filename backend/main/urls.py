from django.urls import path
from rest_framework import routers
from .views import TrendingView
from django.urls import path

urlpatterns = [
    # Your other URL patterns go here
    path('trending/', TrendingView.as_view(), name='trending-view'),
]


