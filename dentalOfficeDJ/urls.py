from django.contrib import admin
from django.urls import path, include
from dental.views import home, dentists, patients, reviews, profile, appointment, ReviewUpdateView, ReviewDeleteView
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home, name='home'),
    path('users/', include('users.urls', namespace='users')),
    path('dentists/', dentists, name = 'dentists'),
    path('patients/', patients),
    path("reviews/", reviews, name="reviews"),
    path("reviews/<int:pk>/edit/",   ReviewUpdateView.as_view(),   name="review_edit"),
    path("reviews/<int:pk>/delete/", ReviewDeleteView.as_view(),  name="review_delete"),
    path('profile/', profile),
    path("appointment/", appointment, name="appointment"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
