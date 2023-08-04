from django.shortcuts import render
from tokenize import Token
from django.shortcuts import render
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
from django.contrib.auth import get_user_model
from rest_framework.response import Response
import requests 
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view

# Create your views here.


User = get_user_model()

# class GoogleLogin(SocialLoginView): # if you want to use Authorization Code Grant, use this
#     adapter_class = GoogleOAuth2Adapter
#     callback_url = "http://127.0.0.1:8000/accounts/google/login/callback/"
#     client_class = OAuth2Client
# Create your views here.


@api_view(('GET',))
def getUser(request):
    access_token = request.GET['access_token']
    api_call_request = requests.get(url=f'https://openidconnect.googleapis.com/v1/userinfo?access_token={access_token}')
    name = api_call_request.json()['name']
    email = api_call_request.json()['email']

    get_user = User.objects.filter(email=email)
    user = None 
    token = None 
    if not get_user:
        user = User(first_name=name, email=email, username=email, password="oauthClient")
        user.save()
        token = Token.objects.create(user=user)
    else:
        user = get_user[0]
        token = Token.objects.get(user=user)
    return Response({'session_id': token.key})