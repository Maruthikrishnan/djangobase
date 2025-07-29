from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import task
from .serializer import TaskSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import IsAdminUser,IsAuthenticated
from rest_framework import status
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data['username'] = self.user.username
        return data


class GetToken(TokenObtainPairView):
    serializer_class =MyTokenObtainPairSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getTask(request):
    serializer = TaskSerializer(task.objects.all().filter(user = request.user ),many=True)
    return Response(serializer.data,status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createTask(request):
    taskname = task.objects.create(user= request.user,taskname=request.data['taskname'],taskdetails=request.data['taskdetails'],duedate=request.data['duedate'],iscompleted=request.data['iscompleted'])
    # serializer = TaskSerializer(newtask,many=True)
    return Response(str(taskname) +" task is added",status=status.HTTP_201_CREATED)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def removedTask(request,id):
    obj = task.objects.get(id=id)
    obj.delete()
    return Response(str(obj.taskname) +" task is removed",status=status.HTTP_200_OK)

@api_view(['PUT'])
# @permission_classes([IsAuthenticated])
def updateTask(request,id):
    obj = task.objects.get(id=id)
    obj.taskdetails = request.data['taskdetails']
    obj.taskname = request.data['taskname']
    obj.iscompleted = request.data['iscompleted']
    obj.duedate = request.data['duedate']
    obj.save()
    return Response(str(obj.taskname) +" task is updated",status=status.HTTP_200_OK)


   