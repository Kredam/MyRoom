from rest_framework import serializers
from .models import User
from django.contrib.auth.hashers import make_password

class UserSerializerCreate(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('username', 'email', 'password')

  def create(self, validated_data):
    UserModel = self.Meta.model
    validated_data['password'] = make_password(validated_data['password'])
    user = UserModel._default_manager.create(**validated_data)
    return user
    
class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('id', 'last_login', 'username', 'first_name', 'last_name', 'is_staff', 'date_joined', 'joined', 'born', 'NSFW')