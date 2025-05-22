from django.contrib import admin
from django.urls import path
from dental.views import home, login, register, dentists, patients, reviews, profile, appointment
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home),
    path('login/', login),
    path('register/', register),
    path('dentists/', dentists),
    path('patients/', patients),
    path('reviews/', reviews),
    path('profile/', profile),
    path('appointment/', appointment),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
