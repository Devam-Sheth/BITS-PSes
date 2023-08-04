from rest_framework import serializers
from .models import Review
class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ["user","sem","pr","overall_exp","liteness","grade_sat", 'tips']
