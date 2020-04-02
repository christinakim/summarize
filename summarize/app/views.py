from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from transformers import pipeline

from summarize.app.serializers import GroupSerializer
from summarize.app.serializers import UserSerializer
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

summarizer = pipeline('summarization')


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]

@api_view(['GET'])
def summarize(request):
    text_to_summarize = request.query_params.get('text', None)
    print(text_to_summarize)
    if request.method == 'GET':
        summary = summarizer(text_to_summarize)
        print(summary)
        return Response(summary, status=status.HTTP_201_CREATED)
