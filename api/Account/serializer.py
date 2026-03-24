from .models import UserModel
from rest_framework import serializers

class userserializer(serializers.ModelSerializer):
    
    class Meta:
        model=UserModel
        fields='__all__'
        extra_kwargs={
            'password':{'write_only':True}
        }
    def create(self, validated_data):
        user=UserModel.objects.create_user(**validated_data)
        return user