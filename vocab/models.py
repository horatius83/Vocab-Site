from django.db import models
from django.contrib.auth.models import User

class Question(models.Model):
    question_text = models.CharField(max_length=300)
    answer_text = models.CharField(max_length=300)

    def __str__(self):
        return self.question_text
    
class QuestionStat(models.Model):
    question = models.ForeignKey('Question')
    quiz = models.ForeignKey('Quiz')
    user = models.ForeignKey(User)
    tried = models.IntegerField(default=0)
    failed = models.IntegerField(default=0)
    last_attempted = models.DateTimeField('Last Attempted')

class Quiz(models.Model):
    title = models.CharField(max_length=300)
    last_attempted = models.DateTimeField('Last Attempted')

    def __str__(self):
        return self.title

class QuizQuestion(models.Model):
    question = models.ForeignKey('Question')
    quiz = models.ForeignKey('Quiz')

    def __str__(self):
        return '{} ({})'.format(self.question, self.quiz)
