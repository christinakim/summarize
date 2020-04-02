import csv

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
    if request.method == 'GET':
        summary_response = summarizer(text_to_summarize)
        summary = summary_response[0]['summary_text']
        print(summary)
        write_summary_to_csv(summary)
        return Response(summary, status=status.HTTP_201_CREATED)


def write_summary_to_csv(summary: str):
    with open('/Users/christina/projects/summarize/summarize.csv', 'a+', newline='') as csvfile:
        summary_writer = csv.writer(csvfile, delimiter='',
                                quotechar='|', quoting=csv.QUOTE_MINIMAL)
        summary_writer.writerow(summary)
