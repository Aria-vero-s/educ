from rest_framework import viewsets
from .models import AIRequest
from .serializers import AIRequestSerializer
from rest_framework.permissions import IsAuthenticated
import openai
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

class AIRequestViewSet(viewsets.ModelViewSet):
    queryset = AIRequest.objects.all()
    serializer_class = AIRequestSerializer
    permission_classes = [IsAuthenticated]

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def ask_openai(request):
    session_id = request.data.get("session_id")
    prompt = request.data.get("prompt")

    if not session_id or not prompt:
        return Response({"error": "Session ID and prompt are required"}, status=400)

    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}],
            api_key=settings.OPENAI_API_KEY
        )

        answer = response["choices"][0]["message"]["content"]

        return Response({"response": answer})
    
    except Exception as e:
        return Response({"error": str(e)}, status=500)
