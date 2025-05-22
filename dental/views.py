from django.shortcuts import render
from dental.models import Dentist, Patient, Service


def home(request):
    context = {
        'services': Service.objects.all(),
    }
    return render(request, 'dental/home.html', context)

def login(request):
    return render(request, 'dental/login.html')

def register(request):
    return render(request, 'dental/register.html')

def dentists(request):
    context = {
        'dentists': Dentist.objects.all(),
    }
    return render(request, 'dental/dentists.html', context)

def patients(request):
    context = {
        'patients': Patient.objects.all(),
    }
    return render(request, 'dental/patients.html', context)

def reviews(request):
    return render(request, 'dental/review.html')

def profile(request):
    return render(request, 'dental/profile.html')

def appointment(request):
    return render(request, 'dental/appointment.html')
