# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('vocab', '0006_auto_20151002_1219'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='quizquestion',
            name='question',
        ),
        migrations.RemoveField(
            model_name='quizquestion',
            name='quiz',
        ),
        migrations.AddField(
            model_name='questionstat',
            name='quiz',
            field=models.ForeignKey(default=0, to='vocab.Quiz'),
            preserve_default=False,
        ),
        migrations.DeleteModel(
            name='QuizQuestion',
        ),
    ]
