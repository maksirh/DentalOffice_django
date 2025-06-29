from django.urls import path

from users.views import login, register, logout, profile

app_name = 'users'

urlpatterns = [
    path('login/', login, name='login'),
    path('register/', register, name='register'),
    path('logout/', logout,   name='logout'),
    path('profile/', profile, name="profile"),
]