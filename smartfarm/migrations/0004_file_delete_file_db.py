# Generated by Django 4.1.1 on 2023-10-04 18:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_alter_user_user_job'),
        ('smartfarm', '0003_alter_file_db_file_root'),
    ]

    operations = [
        migrations.CreateModel(
            name='File',
            fields=[
                ('file_id', models.AutoField(primary_key=True, serialize=False)),
                ('file_type', models.CharField(blank=True, max_length=200)),
                ('file_title', models.CharField(max_length=200)),
                ('file_root', models.FileField(upload_to='file/<user_id>')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('user_id', models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='users.user')),
            ],
        ),
        migrations.DeleteModel(
            name='File_db',
        ),
    ]