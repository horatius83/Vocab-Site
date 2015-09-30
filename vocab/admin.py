from django.contrib import admin
from .models import Question, QuestionStats

for x in [Question, QuestionStats]:
    admin.site.register(x)
