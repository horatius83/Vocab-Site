# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('vocab', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='QuestionStats',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True, serialize=False)),
                ('tried', models.IntegerField(default=0)),
                ('failed', models.IntegerField(default=0)),
                ('last_attempted', models.DateTimeField(verbose_name='Last Attempted')),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True, serialize=False)),
                ('name', models.CharField(max_length=300)),
            ],
        ),
        migrations.RemoveField(
            model_name='question',
            name='failed',
        ),
        migrations.RemoveField(
            model_name='question',
            name='last_attempted',
        ),
        migrations.RemoveField(
            model_name='question',
            name='tried',
        ),
        migrations.AddField(
            model_name='questionstats',
            name='question',
            field=models.ForeignKey(to='vocab.Question'),
        ),
        migrations.AddField(
            model_name='questionstats',
            name='user',
            field=models.ForeignKey(to='vocab.User'),
        ),
    ]
