from django.db import models
from django.contrib.auth import get_user_model
import datetime
# Create your models here.

User = get_user_model()

class Courses(models.Model):
    CourseID=models.CharField(max_length=100)
    CourseName=models.CharField(max_length=100)
    Units=models.SmallIntegerField()
    about = models.TextField(default="No About for this HuEl")
    
    def __str__(self) -> str:
        return self.CourseName

class SemEntry(models.Model):
    IC_Name = models.CharField(max_length=50, default="---")
    year = models.IntegerField(default=datetime.date.today().year)
    sem = models.IntegerField(choices=((1, 1), (2, 2)))
    overall_exp = models.DecimalField(max_digits=2, decimal_places=1)
    liteness = models.DecimalField(max_digits=2, decimal_places=1)
    grade_sat = models.DecimalField(max_digits=2, decimal_places=1)
    pr = models.IntegerField()
    course=models.ForeignKey(Courses, on_delete=models.CASCADE,null=True)
    
    def __str__(self) -> str:
        return f'{self.course.CourseID}/Sem{self.sem}-{self.year}'

class Review(models.Model):
    user=models.ForeignKey(User, on_delete=models.CASCADE,null=True)
    sem=models.ForeignKey(SemEntry, on_delete=models.CASCADE,null=True)
    pr=models.IntegerField()
    overall_exp = models.DecimalField(max_digits=2, decimal_places=1)
    liteness = models.DecimalField(max_digits=2, decimal_places=1)
    grade_sat = models.DecimalField(max_digits=2, decimal_places=1)
    tips=models.TextField(max_length=500)
    
    def __str__(self) -> str:
        return f'{self.user.get_username()} {self.sem.course.CourseID}/Sem{self.sem.sem}-{self.sem.year}'