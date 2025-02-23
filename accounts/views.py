from django.contrib.auth import authenticate
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
import json

User = get_user_model()

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)

        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return JsonResponse({"token": token.key, "role": user.role})
        else:
            return JsonResponse({"error": "Identifiants invalides"}, status=400)

@csrf_exempt  # Désactive temporairement CSRF pour tester
def register(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            username = data.get("username")
            password = data.get("password")

            if User.objects.filter(username=username).exists():
                return JsonResponse({"error": "Utilisateur déjà existant"}, status=400)

            user = User.objects.create_user(username=username, password=password)
            return JsonResponse({"message": "Inscription réussie"}, status=201)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Méthode non autorisée"}, status=405)
