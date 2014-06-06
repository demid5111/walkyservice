from django.db import models
from PIL import Image
# Create your models here.
class RouteInfo(models.Model):
	route_id = models.AutoField(primary_key=True,blank=False)
	route_author = models.IntegerField(default=0,blank=False)
	route_name = models.CharField(max_length=45,blank=False)
	route_likes = models.IntegerField(default=0,blank=False)
	route_date = models.DateField(auto_now_add=True)
	route_city = models.CharField(max_length=45,blank=False)
	route_length = models.FloatField(blank=False)
	route_duration = models.FloatField(blank=False)

	def __unicode__(self):
		return self.route_name

class RoutePoints(models.Model):
	point_id = models.AutoField(primary_key=True,blank=False)
	route_id = models.IntegerField(blank=False)
	point_longitude = models.FloatField(blank=False)
	point_latitude = models.FloatField(blank=False)

	def __unicode__(self):
		return str(self.route_id)

class RouteImages(models.Model):
	image_id = models.AutoField(primary_key=True,blank=False)
	route_id = models.IntegerField(blank=False)
	image_name = models.CharField(max_length=45,blank=False)
	image_path = models.CharField(max_length=200,blank=False)
	#image_entity = models.ImageField(upload_to='.')

	def __unicode__(self):
		return self.route_id

class RouteComments(models.Model):
	comment_id = models.AutoField(primary_key=True,blank=False)
	route_id = models.IntegerField(blank=False)
	user_id = models.IntegerField(blank=False)
	comment_name = models.CharField(max_length=45,blank=False)
	comment_text = models.TextField(blank=False)

	def __unicode__(self):
		return self.comment_name

class RouteUser(models.Model):
	user_id = models.AutoField(primary_key=True,blank=False)
	user_name = models.CharField(max_length=45,blank=False)
	user_surname = models.CharField(max_length=45,blank=False)
	user_password = models.CharField(max_length=45,blank=False)
	user_email = models.EmailField(blank=False)

	def __unicode__(self):
		return self.user_name
