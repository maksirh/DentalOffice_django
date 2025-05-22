from django.contrib import admin
from dental.models import Dentist, Patient, WorkerType, Worker, Service

admin.site.register(Dentist)
admin.site.register(Patient)
admin.site.register(WorkerType)
admin.site.register(Worker)
admin.site.register(Service)
