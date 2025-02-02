from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm

from users.models import Note


class UserRegisterForm(UserCreationForm):
    email = forms.EmailField()
    first_name = forms.CharField(max_length=30, required=False)
    last_name = forms.CharField(max_length=30, required=False)

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'password1', 'password2']


class NoteForm(forms.ModelForm):
    class Meta:
        model = Note
        fields = ['id','title', 'content', 'category']


class ShareAccessForm(forms.Form):
    username = forms.CharField(max_length=150, label='Username')
