from django.shortcuts import render
from .serializer import userserializer
from .models import UserModel
from rest_framework import viewsets
from rest_framework import views
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser,JSONParser
# Create your views here.

class UserViewset(viewsets.ModelViewSet):
    queryset=UserModel.objects.all()
    serializer_class=userserializer
    parser_classes = [MultiPartParser, FormParser]
    

class userview(views.APIView):
    permission_classes=[IsAuthenticated]
    def get(self, request):
        user=request.user
        serializer=userserializer(user)
        return Response(serializer.data,status=status.HTTP_200_OK)

class updateresume(views.APIView):
    permission_classes=[IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser,JSONParser]
    def patch(self,request):
        user=request.user
        
        serializer=userserializer(
            instance=user,
            data=request.data,
            partial=True
                                  )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
      
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
