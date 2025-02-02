from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class SharedAccess(models.Model):
    note = models.ForeignKey('Note', on_delete=models.CASCADE)
    shared_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='shared_access_notes')
    last_edit = models.DateTimeField()

    def update_last_edit(self):
        self.last_edit = timezone.now()
        self.save()


class Note(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=150)
    content = models.TextField(blank=True)
    category = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    users_with_edit_access = models.ManyToManyField(
        User,
        through='SharedAccess',
        through_fields=('note', 'shared_user'),
        related_name='edit_access_notes'
    )

    class Meta:
        ordering = ('title',)

    def __str__(self):
        return f'{self.user.username} Note'

    def save(self, *args, **kwargs):
        if not self.id:
            super().save(*args, **kwargs)
            self.notes_id = self.id
        else:
            super().save(*args, **kwargs)
        shared_access_list = SharedAccess.objects.filter(note=self)
        for shared_access in shared_access_list:
            shared_access.update_last_edit()
