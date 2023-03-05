from django.contrib import admin
from .models import User, Followed
from .forms import CustomUserCreationForm
from django.contrib.auth.admin import UserAdmin
# Register your models here.


class CustomUserAdmin(UserAdmin):
    model = User
    add_form = CustomUserCreationForm


admin.site.register(User, CustomUserAdmin)
admin.site.register(Followed)
