# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('vocab', '0004_delete_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='questionstats',
            name='user',
            field=models.ForeignKey(to=settings.AUTH_USER_MODEL, default=''),
            preserve_default=False,
        ),
    ]
