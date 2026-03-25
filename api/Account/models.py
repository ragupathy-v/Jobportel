from django.db import models
from django.contrib.auth.models import AbstractUser

#cloudinary model fiels for files
from cloudinary.models import CloudinaryField

# Create your models here.


class UserModel(AbstractUser):
    user_type_choise=(
        ('employee','employee'),
        ('company','company'),
    )
    
    name=models.CharField(max_length=100,blank=True,null=True)
    user_type=models.CharField(choices=user_type_choise,max_length=20, default='employee')
    phone_num=models.CharField(max_length=15,unique=True)
    # profileImg=models.ImageField(upload_to='profile/',blank=True,null=True)
    #resume=models.FileField(upload_to='resumes/',blank=True,null=True)
    
    #cloudinary useage for file
    resume=CloudinaryField(resource_type='raw',blank=True,null=True)
    profileImg=CloudinaryField('profile_image',blank=True,null=True)
    




