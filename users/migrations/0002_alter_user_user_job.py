# Generated by Django 4.1.1 on 2023-02-13 07:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='user_job',
            field=models.EmailField(max_length=128, verbose_name='유저 직업'),
        ),
    ]
