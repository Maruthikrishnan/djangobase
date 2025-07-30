from rest_framework import serializers
from .models import task
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

class UserSerializer(serializers.ModelSerializer):
    access =  serializers.SerializerMethodField(read_only = True)
    class Meta:
        model = User
        fields = ['username','access']
    def get_access(self,obj): 
        mtoken = RefreshToken.for_user(obj)
        return str(mtoken.access_token) 


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = task
        fields = ['id','taskname','taskdetails','iscompleted','duedate']
