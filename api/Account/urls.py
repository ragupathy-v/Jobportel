
from django.urls import path,include
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from rest_framework.routers import DefaultRouter
from . import views

router=DefaultRouter()
router.register('register',views.UserViewset)


urlpatterns = [
    
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('',include(router.urls)),
    path('user/',views.userview.as_view()),
    path('resume/',views.updateresume.as_view()),
]