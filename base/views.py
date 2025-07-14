from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import User
from .serializer import UserSerializer

@api_view(["GET"])
def getUser(request):
    data = UserSerializer(User.objects.all(),many=True)
    return Response(data.data)
