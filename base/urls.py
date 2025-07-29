from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.GetToken.as_view(), name='login'),
    path('task/', views.getTask, name='task'),
    path('addtask/', views.createTask, name='addtask'),
    path('removetask/<int:id>', views.removedTask, name='deletetask'),
    path('updatetask/<int:id>', views.updateTask, name='updatetask'),
]