from django.test import TestCase
from django.urls import reverse
from django.test import Client

# Create your tests here.

class TodViewTestCase(TestCase):

    def setUp(self):
        # Set up any necessary data or state for the tests
        self.client = Client()
        self.todo_url = '/api'  #reverse('todo-list')
        self.todo_data = {
            'id': 1,
            'title': 'Test Todo',
            'body': 'This is a test todo item.',
        }
        self.response = self.client.get(self.todo_url, self.todo_data)
    
    def test_todo_view_0(self):
        self.assertEqual(self.response.status_code, 301)
        
    def test_todo_view_1(self):
        self.assertEqual(self.response.status_code, 200)
