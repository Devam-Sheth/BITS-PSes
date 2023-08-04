from django.contrib import admin
from .models import Courses,Review,SemEntry
from import_export import fields, resources
from import_export.admin import ImportExportModelAdmin
from import_export.widgets import ForeignKeyWidget

class CourseResource(resources.ModelResource):
   class Meta:
      model = Courses
class CourseAdmin(ImportExportModelAdmin):
   resource_class = CourseResource
   
class SemEntryResource(resources.ModelResource):
   course = fields.Field(
      column_name='course',
      attribute='course',
      widget=ForeignKeyWidget(Courses, field='CourseID')
   )
   class Meta:
      model = SemEntry
class SemEntryAdmin(ImportExportModelAdmin):
   resource_class = SemEntryResource

admin.site.register(Courses,CourseAdmin)
admin.site.register(SemEntry,SemEntryAdmin)
admin.site.register(Review)