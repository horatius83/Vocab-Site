from django.contrib import admin
from .models import Question, QuestionStat, Quiz 

for x in [Question, QuestionStat, Quiz]:
    admin.site.register(x)
