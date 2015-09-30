# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('vocab', '0002_auto_20150930_1412'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='questionstats',
            name='user',
        ),
    ]
