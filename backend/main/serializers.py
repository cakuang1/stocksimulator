from rest_framework import serializers
from .models import Stock  # Replace '.models' with the correct path to your Stock model.

class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = '__all__'