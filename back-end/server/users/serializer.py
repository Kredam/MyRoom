from rest_framework import serializers
from .models import User, Followed
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
    is_followed = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ('id', 'last_login', 'username', 'email', 'first_name',
                  'last_name', 'is_staff', 'date_joined', 'joined', 'born', 'NSFW', 'is_followed')
    
    def get_is_followed(self, obj):
        user = self.context.get('user')
        print(obj)
        if user is None:
            return None
        return Followed.objects.filter(following=user.pk, follower=obj['id']).exists()


class ListUserSerializer(serializers.Serializer):
    nrOfUsers = serializers.IntegerField()
    users = serializers.ListField(child=UserSerializer())


class FollowUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Followed
        fields = '__all__'
