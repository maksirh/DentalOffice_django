from django.shortcuts import render

def home(request):
    return render(request, 'dental/home.html')

def login(request):
    return render(request, 'dental/login.html')

def register(request):
    return render(request, 'dental/register.html')

def dentalreg(request):
    return render(request, 'dental/dentistReg.html')

def patientreg(request):
    return render(request, 'dental/patientReg.html')

def reviews(request):
    return render(request, 'dental/review.html')

def profile(request):
    return render(request, 'dental/profile.html')

def appointment(request):
    return render(request, 'dental/appointment.html')
