from django.urls import path,include
from rest_framework.routers import DefaultRouter
from . import views

router=DefaultRouter()
router.register('company',views.CompanyViewset)
router.register('jobs',views.jobViewset)
router.register('application',views.ApplicationViewset)


urlpatterns = [
    path('',include(router.urls)),
    #path('job/',views.JobView.as_view()),
    path('companyregister/',views.CompanyRegister.as_view())
    
]
