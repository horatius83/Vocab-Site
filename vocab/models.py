from django.db import models

class Question(models.Model):
    question_text = models.CharField(max_length=300)
    answer_text = models.CharField(max_length=300)
    tried = models.IntegerField(default=0)
    failed = models.IntegerField(default=0)
    last_attempted = models.DateTimeField('Last Attempted')
