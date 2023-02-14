# Generated by Django 4.1.1 on 2023-02-13 07:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_alter_user_user_job'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='user_name',
            field=models.CharField(max_length=16, verbose_name='유저 이름'),
        ),
        migrations.AlterField(
            model_name='user',
            name='user_tel',
            field=models.CharField(max_length=128, unique=True, verbose_name='유저 전화번호'),
        ),
    ]
