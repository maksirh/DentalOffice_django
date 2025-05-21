from django.contrib import admin
from django.urls import path
from dental.views import home, login, register, dentalreg, patientreg, reviews, profile, appointment

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home),
    path('login/', login),
    path('register/', register),
    path('dentalreg/', dentalreg),
    path('patientreg/', patientreg),
    path('reviews/', reviews),
    path('profile/', profile),
    path('appointment/', appointment),
]
