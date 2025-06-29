from django import forms
from dental.models import Appointment, Review

class AppointmentForm(forms.ModelForm):
    class Meta:
        model  = Appointment
        fields = ("name", "age", "phoneNumber", "reason")

class ReviewForm(forms.ModelForm):
    class Meta:
        model  = Review
        fields = ("review",)
        widgets = {
            'review': forms.Textarea(attrs={
                'id': 'my-review-field',
                'class': '',
                'rows': 5
            }),
        }
