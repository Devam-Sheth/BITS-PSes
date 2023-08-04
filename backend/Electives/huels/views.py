from django.shortcuts import render
import io
from django.core import serializers
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer
from django.http import HttpResponse, JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from .models import *
from rest_framework import status
from rest_framework.views import APIView, Response
from rest_framework.permissions import IsAuthenticated
import json
from django.contrib.auth.mixins import LoginRequiredMixin
from .serializers import ReviewSerializer
import statistics

# @csrf_exempt
class CourseList(APIView):
    def get(self, request):
        SomeModel_json = serializers.serialize("json", Courses.objects.all())
        response1 = []
        data = {"Course List": SomeModel_json}
        courses = Courses.objects.all()
        for course in courses:

            response1.append(
                {
                    "course_name": course.CourseName,
                    "CourseID": course.CourseID,
                    "Units": course.Units,
                }
            )

        # return JsonResponse(data)
        return Response(response1, status=status.HTTP_200_OK)


class CourseView(APIView):
    # permission_classes = [IsAuthenticated]
    def post(self, request):
        temp = request.data
        course_id = request.data["CourseID"]
        course = Courses.objects.filter(CourseID=course_id).first()
        sem = SemEntry.objects.filter(course=course).first()
        response = []
        print(course)
        review = Review.objects.filter(sem=sem)
        prlist = []
        overalllist = []
        litenesslist = []
        gradinglist = []
        prmedian = 0
        experiencemedian = 0
        litenessmedian = 0
        gradingmedian = 0
        reviews = {}
        for r in review:
            prlist.append(r.pr)
            overalllist.append(r.overall_exp)
            litenesslist.append(r.liteness)
            gradinglist.append(r.grade_sat)
            reviews[r.user.get_username()] = r.tips
        
        
        res_dict = {}
        if(course):
            res_dict["CourseID"] = course.CourseID
            res_dict["CourseName"] = course.CourseName
            res_dict["Units"] = course.Units
            res_dict["about"] = course.about
        if(sem):
            res_dict["IC_Name"] = sem.IC_Name
        else:
            res_dict["IC_Name"] = "Null"
        if prlist:
            prmedian = statistics.median(prlist)
            res_dict["pr"] = prmedian
        else:
            res_dict["pr"] = 0
        if overalllist:
            experiencemedian = statistics.median(overalllist)
            res_dict["overall_exp"] = experiencemedian
        else:
            res_dict["overall_exp"] = 0
        if litenesslist:
            litenessmedian = statistics.median(litenesslist)
            res_dict["liteness"] = litenessmedian
        else:
            res_dict["liteness"] = 0
        if gradinglist:
            gradingmedian = statistics.median(gradinglist)
            res_dict["grade_sat"] = gradingmedian
        else:
            res_dict["grade_sat"] = 0
        if(reviews):
            res_dict["Reviews"] = json.dumps(reviews)

        if(res_dict=={}):
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            response.append(
            res_dict
        )

        return Response(response, status=status.HTTP_200_OK)


class ReviewView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, *args, **kwargs):
        course = request.data["course"]
        # sem= request.data['sem']
        course_obj = Courses.objects.filter(CourseName=course).first()
        sementry = SemEntry.objects.filter(course=course_obj).first()
        data = {
            "user": request.user.id,
            "sem": sementry.id,
            "pr": request.data.get("pr"),
            "overall_exp": request.data.get("overall_exp"),
            "liteness": request.data.get("liteness"),
            "grade_sat": request.data.get("grade_sat"),
            "tips": request.data.get("tips"),
        }
        serializer = ReviewSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
