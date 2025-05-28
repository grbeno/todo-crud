from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Todo
from .serializers import TodoSerializer

class TodoView(APIView):
    
    def post(self, request):
        data = self.request.data.get('todo_data', {
            'title': request.data['title'],
            'body': request.data['body']
        })
        serializer = TodoSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
    def get(self, request):
        instance = Todo.objects.all()
        if not instance:
            return Response(status=404)
        serializer = TodoSerializer(instance, many=True)
        return Response(serializer.data)
    
    def put(self, request, pk):
        instance = Todo.objects.get(pk=pk)
        serializer = TodoSerializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    
    def delete(self, request, pk):
        instance = Todo.objects.get(pk=pk)
        if not instance:
            return Response(status=404)
        print(instance)
        instance.delete()
        return Response(status=204)
