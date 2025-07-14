from django.db import models

class User(models.Model):
    name = models.CharField(max_length=50, null=False, blank=True)
    phoneNumber = models.CharField(max_length=20, null=False, blank=True)
    mail = models.CharField(max_length=50, null=True, blank=True)
    id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name

