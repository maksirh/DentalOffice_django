from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.shortcuts import render, HttpResponseRedirect, redirect
from django.views.generic import UpdateView, DeleteView

from dental.models import Dentist, Patient, Service, Review
from dental.forms import AppointmentForm, ReviewForm
from django.urls import reverse, reverse_lazy


def home(request):
    context = {
        'services': Service.objects.all(),
        'dentists': Dentist.objects.all(),
        'reviews': Review.objects.all(),
    }
    return render(request, 'dental/home.html', context)


def patients(request):
    context = {
        'patients': Patient.objects.all(),
    }
    return render(request, 'dental/patients.html', context)

@login_required
def reviews(request):
    if request.method == "POST":
        form = ReviewForm(request.POST)
        if form.is_valid():
            review = form.save(commit=False)
            review.user = request.user
            review.save()
            return redirect("reviews")
    else:
        form = ReviewForm()


    all_reviews = Review.objects.select_related("user")
    return render(request, "dental/reviews.html",{"form": form, "reviews": all_reviews})


def appointment(request):
    if request.method == "POST":
        form = AppointmentForm(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect(reverse('home'))
    else:
        form = AppointmentForm()

    context = {'form': form}
    return render(request, 'dental/appointment.html', context)


class ReviewUpdateView(LoginRequiredMixin, UserPassesTestMixin, UpdateView):
    model = Review
    form_class = ReviewForm
    template_name = "dental/review_edit.html"
    success_url = reverse_lazy("reviews")

    def test_func(self):
        return self.request.user == self.get_object().user


class ReviewDeleteView(LoginRequiredMixin, UserPassesTestMixin, DeleteView):
    model = Review
    success_url = reverse_lazy("reviews")
    template_name = "dental/review_confirm_delete.html"

    def test_func(self):
        return self.request.user == self.get_object().user