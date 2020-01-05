import requests
from django.contrib.auth import authenticate
from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from .serializers import ListingSerializer, UserSerializer, ReviewSerializer, UserInfoSerializer, AmenitySerializer
from .models import Listing, CustomUser, Review, Amenity
from rest_framework.response import Response

# Requires Places API to be activated
api_key = 'AIzaSyCEiD8oRAMONUJGI9OAgPNYwa7x7oR5uGc'

url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?"

@api_view(['GET', 'POST'])
def listing_list(request):
    if request.method == 'GET':
        data = Listing.objects.all()
        serializer = ListingSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        user = CustomUser.objects.get(username=request.data["username"])
        request.data["username"]=user.id
        serializer = ListingSerializer(data=request.data)
        serializer.is_valid()
        print(serializer.errors)
        if serializer.is_valid():
            serializer.save()
            location = request.data["lat"]+", "+request.data["lng"]
            address = request.data['address']
            listing = Listing.objects.get(address=address)
            language = 'en-GB'
            keywordTypes = [('store', 'grocery_or_supermarket'), ('store', 'drugstore'), ('atm', 'atm'),
                            ('theater', 'movie_theater'), ('bus', 'bus_station'), ('post', 'post_office'),
                            ('store', 'convenience_store'), ('food', 'restaurant'), ('shopping', 'shopping_mall'),
                            ('gym', 'gym'), ('barber', 'hair_care'), ('train', 'train_station'), ('airport', 'airport'),
                            ('university', 'university'), ('hospital', 'hospital'), ('bank', 'bank')]

            for pair in keywordTypes:
                keyword = pair[0]
                typePlace = pair[1]
                request = (url + 'location=' + location +
                           '&language=' + language +
                           '&keyword=' + keyword +
                           '&rankby=distance'
                           '&type=' + typePlace +
                           '&key=' + api_key)
                r = requests.get(request)
                x = r.json()
                y = x['results']
                # This is what we need in the frontend in a list of tuples
                if len(y) > 0:
                    tag = y[0]['name']
                    position = y[0]['geometry']['location']
                    Amenity(tag=tag, address=listing, lat=position['lat'], lng=position['lng'])
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE', 'GET'])
def listing_detail(request, *args, **kwargs):
    try:
        listing = Listing.objects.get(address=kwargs['address'])
    except Listing.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = ListingSerializer(listing, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        listing.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    elif request.method == 'GET':
        serializer = ListingSerializer(listing, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)


def amenities_listing(request, *args, **kwargs):
    amenities = Listing.objects.get(address=kwargs['address'])
    serializer = ListingSerializer(amenities, context={'request': request}, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = CustomUser.objects.all()


class AmenityView(viewsets.ModelViewSet):
    serializer_class = AmenitySerializer
    queryset = Amenity.objects.all()


class ListingView(viewsets.ModelViewSet):
    serializer_class = ListingSerializer
    queryset = Listing.objects.all()


class UsersListingView(viewsets.ModelViewSet):
    serializer_class = ListingSerializer

    def get_queryset(self):
        return Listing.objects.filter(username=self.kwargs['username'])


class UserInfoView(viewsets.ModelViewSet):
    serializer_class = UserInfoSerializer

    def get_queryset(self):
        return CustomUser.objects.filter(username=self.kwargs['username'])


class ListingReviewView(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer

    def get_queryset(self):
        return Review.objects.filter(listing=self.kwargs['listing'])


def create_review(request):
    serializer = ReviewSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def createUser(request):
    username = request.data['username']

    user = CustomUser.objects.filter(username=username)
    if len(user)>0:
        res = {
            'error': 'User already exist'}
        return Response(res, status=status.HTTP_409_CONFLICT)
    else:
        user = CustomUser.objects.create_user(username=username, email=request.data['username'],
                                              password=request.data['password'], phone=request.data['phone'])
        user.save()
        res = {
            'error': 'User created'}
        return Response(res, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([AllowAny, ])
def authenticate_user(request):

    username = request.data['username']
    password = request.data['password']

    user = authenticate(username=username, password=password)
    if user is not None:
        return Response({'id': user.id}, status=status.HTTP_200_OK)
    else:
        res = {
            'error': "User doesn't exist"}
        return Response(res, status=status.HTTP_409_CONFLICT)



