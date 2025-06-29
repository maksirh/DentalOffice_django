from django.contrib import admin
from django.urls import path, include
from dental.views import home, patients, reviews, appointment, ReviewUpdateView, ReviewDeleteView
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home, name='home'),
    path('dental/', include('dental.urls',namespace='dental')),
    path('users/', include('users.urls', namespace='users')),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
