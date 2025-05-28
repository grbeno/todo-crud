from django.urls import path
from .views import TodoView


urlpatterns = [
    path('', TodoView.as_view(), name='todo-list'),
    path('<int:pk>', TodoView.as_view(), name='todo-detail'),
]