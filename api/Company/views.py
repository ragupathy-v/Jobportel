from django.shortcuts import render
from .models import Companyinfo,Job,Application
from .serializer import Companyinfoserializer,Jobserializer,Applicationserializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status,generics,mixins

from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser,FormParser

class CompanyViewset(ModelViewSet):
    permission_classes=[IsAuthenticated]
    queryset=Companyinfo.objects.all()
    serializer_class=Companyinfoserializer
    parser_classes=[MultiPartParser,FormParser]

class CompanyRegister(mixins.CreateModelMixin,mixins.ListModelMixin,generics.GenericAPIView):
    serializer_class=Companyinfoserializer
    permission_classes=[IsAuthenticated]
    #parser_classes=[MultiPartParser,FormParser]

    def get_queryset(self):
        return Companyinfo.objects.filter(user=self.request.user)
    def perform_create(self,serializer):
        user=self.request.user
        print('start regiter')
        if Companyinfo.objects.filter(user=self.request.user).exists():
            print('user alrady create a company')
            raise ValidationError({'message':'user already have company'})
        serializer.save(user=self.request.user)
        user.user_type='company'
        user.save()
    def get(self, request):
        return self.list(request)
    def post(self,request):
        return self.create(request)


''''
from rest_framework.response import Response
from rest_framework import status
from rest_framework import views
class JobView(views.APIView):

    def get(self,request):
        AllJob=Job.objects.all()
        serializer=Jobserializer(AllJob,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    def post(self,request):
        data=request.data
        serializer=Jobserializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response (serializer.errors,status=status.HTTP_400_BAD_REQUEST)'''

''''
from rest_framework.response import Response
from rest_framework import status
from rest_framework import views
from rest_framework import generics, mixins

class JobView(mixins.ListModelMixin,
              mixins.CreateModelMixin,
              mixins.DestroyModelMixin,
              generics.GenericAPIView):

    queryset = Job.objects.all()
    serializer_class = Jobserializer

    def get(self, request):
        return self.list(request)

    def post(self, request):
        return self.create(request)
    def delete(self, request,pk):
        return self.destroy(request)  '''
class jobViewset(ModelViewSet):
    queryset=Job.objects.all()
    serializer_class=Jobserializer
    permission_classes=[IsAuthenticated]

    def get_serializer_context(self):
        return {"request":self.request}
    def get_queryset(self):
        user=self.request.user
        if user.user_type=='employee':
            return Job.objects.all()
        elif user.user_type=='company':
            return Job.objects.filter(company__user=user)
        return Job.objects.none()
    
    def perform_create(self, serializer):
        user=self.request.user
        try:
            company=Companyinfo.objects.get(user=user) 
        except Companyinfo.DoesNotExist:
            raise ValidationError({'message':'create company first'})
        serializer.save(user=user,company=company)

from django.db import IntegrityError
from rest_framework.exceptions import ValidationError

class ApplicationViewset(ModelViewSet):
    queryset=Application.objects.all()
    serializer_class=Applicationserializer
    permission_classes=[IsAuthenticated]

    def perform_create(self, serializer):
        try:
            serializer.save(user=self.request.user)
        except IntegrityError:
            raise ValidationError({"message": "Already applied"})
        
    def get_queryset(self):
        job_id=self.request.query_params.get('job')
        if job_id:
            return Application.objects.filter(job__id=job_id)
        return Application.objects.all()
    