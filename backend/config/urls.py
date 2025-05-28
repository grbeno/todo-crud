from django.shortcuts import redirect
from django.contrib import admin
from django.urls import path, include

def api_redirect(request):
    return redirect('http://localhost:8001', permanent=False)

urlpatterns = [
    path('', api_redirect, name='root'),
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls')),
    path('api/', include('app.urls')),
]
