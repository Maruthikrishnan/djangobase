from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
class userdetails(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    address = models.CharField(max_length=150, null=False, blank=True)
    companyname = models.CharField(max_length=100, null=False, blank=True)
    id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.user.username


class task(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    taskname =   models.CharField(max_length=50, null=False, blank=True)
    taskdetails =   models.CharField(max_length=200, null=False, blank=True)
    duedate =   models.DateField(blank=True)
    iscompleted = models.BooleanField(null=False, blank=True)
    id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.taskname

