# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('vocab', '0007_auto_20151005_1254'),
    ]

    operations = [
        migrations.CreateModel(
            name='QuizQuestion',
            fields=[
                ('id', models.AutoField(serialize=False, auto_created=True, verbose_name='ID', primary_key=True)),
                ('question', models.ForeignKey(to='vocab.Question')),
                ('quiz', models.ForeignKey(to='vocab.Quiz')),
            ],
        ),
    ]
