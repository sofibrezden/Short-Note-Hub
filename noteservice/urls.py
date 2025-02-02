"""ShortNote URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.urls import path, include
from django.views.generic.base import TemplateView
from users import views as user_views
from django.conf import settings
from django.conf.urls.static import static

from users.views import create_note, edit_note, view_note, delete_note, share_note_access, shared_notes, \
    view_statistics, logout_view, login_user

admin.site.site_header = "Admin"
admin.site.site_title = "Admin Portal"
admin.site.index_title = "Admin's Site"
urlpatterns = [
    path('admin/', admin.site.urls),
    path('register/', user_views.register, name='register'),
    path('login/', login_user, name='login'),
    path('logout/', logout_view, name='logout'),
    path('notes/<int:id>', user_views.notes, name='notes'),
    path('create_note/', create_note, name='create_note'),
    # path('create/', create, name='create'),
    path('edit_note/<int:id>/', edit_note, name='edit_note'),
    path('view_note/<int:id>/', view_note, name='view_note'),
    path('share/', share_note_access, name='share_note_access'),
    path('delete_note/<int:id>', delete_note, name='delete_note'),
    path('shared_notes/', shared_notes, name='shared_notes'),
    path('statistics/', view_statistics, name='statistics'),
    path('', include('main.urls'))
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
