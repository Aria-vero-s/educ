"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
# from accounts.views import UserProfileView, StudentListView, TeacherListView
from kiosk.views import KioskSessionViewSet, ActivityLogViewSet
from education.views import AIRequestViewSet, ask_openai
from .views import home

router = DefaultRouter()
router.register(r'kiosk_sessions', KioskSessionViewSet)
router.register(r'activity_logs', ActivityLogViewSet)
router.register(r'ai_requests', AIRequestViewSet)

urlpatterns = [
    path('', home, name='home'),
    # path('profile/', UserProfileView.as_view(), name='user_profile'),
    # path('students/', StudentListView.as_view(), name='student_list'),
    # path('teachers/', TeacherListView.as_view(), name='teacher_list'),
    path('api/ask_openai/', ask_openai, name='ask_openai'),
    path("api/", include("accounts.urls")),
]
