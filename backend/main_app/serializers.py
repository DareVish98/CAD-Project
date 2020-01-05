from rest_framework import serializers
from rest_framework.settings import api_settings

from .models import Listing, CustomUser, Review, Amenity


class ListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = '__all__'


class AmenitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Amenity
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('phone', 'username', 'email', 'password')


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'


class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('phone', 'username', 'email')
