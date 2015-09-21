# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.AutoField(primary_key=True, auto_created=True, serialize=False, verbose_name='ID')),
                ('question_text', models.CharField(max_length=300)),
                ('answer_text', models.CharField(max_length=300)),
                ('tried', models.IntegerField(default=0)),
                ('failed', models.IntegerField(default=0)),
                ('last_attempted', models.DateTimeField(verbose_name='Last Attempted')),
            ],
        ),
    ]
