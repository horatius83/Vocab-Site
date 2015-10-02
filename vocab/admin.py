from django.contrib import admin
from .models import Question, QuestionStat, Quiz, QuizQuestion

for x in [Question, QuestionStat, Quiz, QuizQuestion]:
    admin.site.register(x)
