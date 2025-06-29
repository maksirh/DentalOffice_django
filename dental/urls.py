
from django.urls import path, include
from dental.views import  patients, reviews, appointment, ReviewUpdateView, ReviewDeleteView
from django.conf.urls.static import static
from django.conf import settings


app_name = "dental"

urlpatterns = [

    path('patients/', patients),
    path("reviews/", reviews, name="reviews"),
    path("reviews/<int:pk>/edit/",   ReviewUpdateView.as_view(),   name="review_edit"),
    path("reviews/<int:pk>/delete/", ReviewDeleteView.as_view(),  name="review_delete"),
    path("appointment/", appointment, name="appointment"),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
