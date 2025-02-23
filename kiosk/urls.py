from django.urls import path, include
from .views import UserProfileView, StudentListView, TeacherListView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterView
from rest_framework.routers import DefaultRouter
from .views import KioskSessionViewSet, AIRequestViewSet, ActivityLogViewSet
from .views import ask_openai

router = DefaultRouter()
router.register(r'kiosk_sessions', KioskSessionViewSet)
router.register(r'ai_requests', AIRequestViewSet)
router.register(r'activity_logs', ActivityLogViewSet)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', UserProfileView.as_view(), name='user_profile'),
    path('students/', StudentListView.as_view(), name='student_list'),
    path('teachers/', TeacherListView.as_view(), name='teacher_list'),
    path('api/ask_openai/', ask_openai, name='ask_openai'),
    path('api/', include(router.urls)),
]
