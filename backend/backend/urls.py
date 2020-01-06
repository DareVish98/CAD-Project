"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.urls import path, include
from rest_framework import routers
from main_app import views

router = routers.DefaultRouter()
router.register(r'users', views.UserView, 'User')
router.register(r'amenity', views.AmenityView, 'Amenity')

urlpatterns = [
    path('api/', include(router.urls)),
    path('listings/<username>/', views.UsersListingView),
    path('reviews/<address>/', views.ListingReviewView.as_view({'get': 'list'})),
    path('users/<username>/', views.UserInfoView.as_view({'get': 'list'})),
    url(r'^api/listings/$', views.listing_list),
    path('api/listings/<address>/', views.listing_detail),
    path('api/amenities/<address>/', views.amenities_listing),
    url(r'^api/user/create/$', views.createUser),
    url(r'^api/user/auth/$', views.authenticate_user),
    url(r'^api/postreview/$', views.create_review),
]
