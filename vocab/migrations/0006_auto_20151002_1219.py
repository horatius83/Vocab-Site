# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('vocab', '0005_questionstats_user'),
    ]

    operations = [
        migrations.CreateModel(
            name='QuestionStat',
            fields=[
                ('id', models.AutoField(verbose_name='ID', auto_created=True, serialize=False, primary_key=True)),
                ('tried', models.IntegerField(default=0)),
                ('failed', models.IntegerField(default=0)),
                ('last_attempted', models.DateTimeField(verbose_name='Last Attempted')),
                ('question', models.ForeignKey(to='vocab.Question')),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Quiz',
            fields=[
                ('id', models.AutoField(verbose_name='ID', auto_created=True, serialize=False, primary_key=True)),
                ('title', models.CharField(max_length=300)),
                ('last_attempted', models.DateTimeField(verbose_name='Last Attempted')),
            ],
        ),
        migrations.CreateModel(
            name='QuizQuestion',
            fields=[
                ('id', models.AutoField(verbose_name='ID', auto_created=True, serialize=False, primary_key=True)),
                ('question', models.ForeignKey(to='vocab.Question')),
                ('quiz', models.ForeignKey(to='vocab.Quiz')),
            ],
        ),
        migrations.RemoveField(
            model_name='questionstats',
            name='question',
        ),
        migrations.RemoveField(
            model_name='questionstats',
            name='user',
        ),
        migrations.DeleteModel(
            name='QuestionStats',
        ),
    ]
