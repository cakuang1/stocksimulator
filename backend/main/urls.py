from django.urls import path
from rest_framework import routers
from .views import TrendingView,TickerView
from django.urls import path

urlpatterns = [
    # Your other URL patterns go here
    path('trending/', TrendingView.as_view(), name='trending-view'),
    path('ticker/<str:ticker>/', TickerView.as_view(), name='ticker-view'),
]


