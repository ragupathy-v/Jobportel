from django.db import models
from django.conf import settings


# Create your models here.


class Companyinfo(models.Model):
    user=models.OneToOneField(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    name=models.CharField(max_length=50)
    about=models.TextField()
    address=models.TextField()
    created_at=models.DateTimeField( auto_now_add=True)
    logo=models.ImageField(upload_to='company_logos/',blank=True,null=True)
    website=models.URLField(null=True,blank=True)

    def __str__(self):
        return self.name
    

class Skills(models.Model):
    name=models.CharField(max_length=200)   
    def __str__(self):
        return self.name

class Job(models.Model):
    title=models.CharField(max_length=200)
    description=models.TextField()


    experience_min=models.IntegerField()
    experience_max=models.IntegerField()

    salary_min=models.IntegerField()
    salary_max=models.IntegerField()

    location=models.CharField(max_length=100)
    skills=models.ManyToManyField(Skills)
    user=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    company=models.ForeignKey(Companyinfo,on_delete=models.CASCADE,related_name='jobs')
    applylink=models.URLField(null=True,blank=True)
    created_at=models.DateTimeField( auto_now_add=True)

    def __str__(self):
        return f"{self.title}-{self.company}"

class Application(models.Model):
    status_choice=[
        ('pending',"pending"),
        ('rejected','rejected'),
        ('recive_mail','recive mail')
    ]

    user=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    job=models.ForeignKey(Job,on_delete=models.CASCADE)
    status=models.CharField(max_length=20,choices=status_choice,default='pending')

    class Meta:
        unique_together=['user','job']

    def __str__(self):
        return self.job.title
    
