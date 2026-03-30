from rest_framework import serializers
from .models import Companyinfo,Job,Application,Skills
from Account.serializer import userserializer



class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model=Skills
        fields='__all__'

class Companyinfoserializer(serializers.ModelSerializer):

    have_company=serializers.SerializerMethodField()

    class Meta:
        model=Companyinfo
        fields='__all__'
        read_only_fields=['user']

    def get_have_company(self,obj):
        user=self.context['request'].user
        if user.is_anonymous:
            return False
        return Companyinfo.objects.filter(user=user).exists()


class Jobserializer(serializers.ModelSerializer):
    skills=SkillSerializer(many=True,read_only=True)
    user=userserializer(read_only=True)
    company=Companyinfoserializer(read_only=True)

    is_applied=serializers.SerializerMethodField()
    application_count=serializers.SerializerMethodField()

    class Meta:
        model=Job
        fields='__all__'


    def get_is_applied(self,obj):
        user=self.context['request'].user

        if user.is_anonymous:
            return False
        return Application.objects.filter(user=user,job=obj).exists()
    
    def get_application_count(self,obj):
        return Application.objects.filter(job=obj).count()


class Applicationserializer(serializers.ModelSerializer):
    user=userserializer(read_only=True)
    job=Jobserializer(read_only=True)
    job_id=serializers.PrimaryKeyRelatedField(
        queryset=Job.objects.all(),
        source='job',
        write_only=True
    )
    #company=Companyinfoserializer(read_only=True)
    class Meta:
        model=Application
        fields='__all__'



