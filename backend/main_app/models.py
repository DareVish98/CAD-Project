from django.db import models
import datetime
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    phone = models.CharField(max_length=20)
    registrationDate = models.DateField("Registration Date", auto_now_add=True)


class Listing(models.Model):
    username = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    lat = models.FloatField()
    lng = models.FloatField()
    owner = models.CharField(max_length=60)
    postcode = models.CharField(max_length=8)
    address = models.CharField(max_length=30, primary_key=True)
    town = models.CharField(max_length=30)
    county = models.CharField(max_length=30)
    energy = models.BooleanField(default=False)
    water = models.BooleanField(default=False)
    internet = models.BooleanField(default=False)
    gas = models.BooleanField(default=False)
    price = models.IntegerField(default=0)
    selectedContractLength = models.IntegerField(default=12)
    selectedBedrooms = models.IntegerField(default=1)
    selectedFromDate = models.DateField(default=datetime.date.today)
    description = models.TextField()
    image1_tag = models.CharField(max_length=30)
    image1_data = models.TextField(blank=True)
    image2_tag = models.CharField(max_length=30)
    image2_data = models.TextField(blank=True)
    image3_tag = models.CharField(max_length=30)
    image3_data = models.TextField(blank=True)
    phone = models.CharField(max_length=20)
    email = models.CharField(max_length=40)

    def __str__(self):
        return self.postcode


class Review(models.Model):
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE)
    username = models.CharField(max_length=30)
    rating = models.FloatField()
    description = models.TextField()


class Amenity(models.Model):
    address = models.ForeignKey(Listing, on_delete=models.CASCADE)
    lat = models.FloatField()
    lng = models.FloatField()
    tag = models.CharField(max_length=30)
