from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render_to_response
from django.views.decorators.csrf import csrf_exempt
import json

from django.utils import simplejson
import sqlite3
from jsdev.models import RouteInfo, RouteUser

def index(request):
	return render(request,'jsdev/main_page.html', {})


# def mapsdraw(request):
# 	text = 'demid'
# 	t = get_template('jsdev/mapsdraw.html')
# 	#html = t.render(Context({'text': text}))
# 	html = t.render(Context({}))
# 	return HttpResponse(html)

# def maps_test(request):
# 	route = 'from Moscow to NN'
# 	t = get_template('jsdev/maps_test.html')
# 	html = t.render(Context({'route': route}))
# 	return HttpResponse(html)

# def get_points(request):
# 	#allpoints = RouteInfo.objects.all()
# 	js_data = {}
# 	#print allpoints[0].latitude
# 	t = get_template('jsdev/map_from_db.html')
# 	points_array = {}
	
# 	points_array["point_0"] = {'lat':'56.268440' , 'lon':'43.877693'}
# 	points_array["point_1"] = {'lat':'56.298745' , 'lon':'43.944931'}
# 	points_array["point_2"] = {'lat':'56.325152' , 'lon':'44.022191'}
# 	#return HttpResponse(json.dumps(js_data), mimetype='application/json')
# 	return render_to_response('jsdev/map_from_db.html', {"obj_as_json": simplejson.dumps(points_array)})

# def addRoutePage(request):	
# 	return render(request,'jsdev/addRoute.html', {})	

# @csrf_exempt
# def addRoute(environ):
# 	data = {}
# 	print "in addRoutes"
# 	sqlQuery = ""
# 	route_name = ""
# 	route_type = ""
# 	route_likes = ""
# 	route_city = ""
# 	route_length = ""
# 	route_duration = ""
# 	points = {}
# 	conn = sqlite3.connect('db.sqlite3')
# 	if environ.is_ajax():
# 		print "is ajax"
# 		jData = json.loads(environ.body)
# 		for i in jData.keys():
# 			data[i] = jData[i]
# 		#print data["route_name"]	
# 		route_name = data["route_name"]
# 		route_type = data["route_type"]
# 		route_likes = data["route_likes"]		
# 		route_city = data["route_city"]
# 		route_length = data["route_length"]
# 		route_duration= data["route_duration"]
# 		for i in data["points"].keys():
# 			print "Key = ",  i,  " Latitude = ", data["points"][i]['lat'], " Longitude = ", data["points"][i]['lon']

# 		#sqlQuery = "INSERT INTO jsdev_routeinfo(route_name, route_likes, route_city, route_length, route_duration) values(" + route_name + "," + route_likes + "," + route_city + "," + route_length + "," + route_duration + ")"	
# 		#conn.execute(sqlQuery)
# 		#conn.commit()
# 		#conn.close
# 	#return render(environ,'jsdev/main_page.html', {})	
# 	return HttpResponse()

# @csrf_exempt
# def send_points(environ):
# 	#allpoints = Routepoint.objects.all()
# 	#print allpoints
# 	if environ.is_ajax():
# 		message = "Yes, AJAX!" #+ (str)(environ.POST)
# 		#jInfo = json.loads(environ.POST.keys()[0])
# 		jInfo = json.loads(environ.body)
# 		#print jInfo
# 		#print jInfo['start']['A']
# 		for i in jInfo.keys():
# 			print "Key = ",  i,  " Latitude = ", jInfo[i]['lat'], " Longitude = ", jInfo[i]['lon']
# 			#point = Routepoint(pointname=i, route=route , latitude=jInfo[i]['lat'], longitude=jInfo[i]['lon'])
# 			#point.save()
# 	else:
# 		message = "Not Ajax"
# 	return HttpResponse(message)

# def loginPage(request):
# 	return render(request,'jsdev/loginPage.html', {})

# @csrf_exempt
# def addUser(environ):
# 	data = {}
# 	print "in addUser"
# 	sqlQuery = ""
# 	user_name = ""
# 	user_surname = ""
# 	user_email = ""
# 	user_password = ""

# 	conn = sqlite3.connect('db.sqlite3')
# 	if environ.is_ajax():
# 		print "is ajax"
# 		jData = json.loads(environ.body)
# 		for i in jData.keys():
# 			data[i] = jData[i]
# 		#print data["route_name"]	
# 		user_name = data["user_name"]
# 		user_surname = data["user_surname"]
# 		user_email = data["user_email"]		
# 		user_password = data["user_password"]
# 		print "user_name = ",  user_name,  " user_surname = ", user_surname, " user_email = ", user_email, " user_password = ", user_password

# 		#sqlQuery = "INSERT INTO jsdev_routeinfo(route_name, route_likes, route_city, route_length, route_duration) values(" + route_name + "," + route_likes + "," + route_city + "," + route_length + "," + route_duration + ")"	
# 		#conn.execute(sqlQuery)
# 		#conn.commit()
# 		#conn.close
# 		new_user = RouteUser()
# 		new_user.user_name = user_name
# 		new_user.user_surname = user_surname
# 		new_user.user_email = user_email
# 		new_user.user_password = user_password
# 		new_user.save()

# 	#return render(environ,'jsdev/main_page.html', {})	
# 	return HttpResponse()

# def signupPage(request):
# 	return render(request,'jsdev/signupPage.html', {})

# @csrf_exempt
# def authUser(environ):
# 	data = {}
# 	print "in authUser"
# 	user_email = ""
# 	user_password = ""
# 	if environ.is_ajax():
# 		print "is ajax"
# 		jData = json.loads(environ.body)
# 		for i in jData.keys():
# 			data[i] = jData[i]
# 		#print data["route_name"]	
# 		user_email = data["user_email"]		
# 		user_password = data["user_password"]
# 		print "user_email = ", user_email, " user_password = ", user_password
# 		authUser = RouteUser.objects.filter(user_email=user_email)
# 		if (authUser[0].user_password==user_password):
# 			return HttpResponse("User Found")
# 	return HttpResponse("User Not Found")

# @csrf_exempt
# def get_info(environ):
# 	pass
# 	# print "in get_info"


# 	# routesList = []
# 	# if environ.is_ajax():

# 	# 	jInfo = json.loads(environ.body)
# 	# 	routeType = jInfo["route_type"]
# 	# 	routesList = RouteInfo.objects.filter(route_type = routeType) 

# 	# 	response = {}
# 	# 	response["routes"] = {}
# 	# 	for i in routesList:

# 	# 		response["routes"][i.route_id] = {}
# 	# 		response["routes"][i.route_id]["route_name"] = i.route_name
# 	# 		response["routes"][i.route_id]["route_likes"] = i.route_likes
# 	# 		response["routes"][i.route_id]["route_duration"] = i.route_duration
# 	# 		response["routes"][i.route_id]["route_city"] = i.route_city
# 	# 		response["routes"][i.route_id]["route_length"] = i.route_length
# 	# 		response["routes"][i.route_id]["route_city"] = i.route_city
# 	# 		response["routes"][i.route_id]["route_author"] = i.route_author
# 	# 		response["routes"][i.route_id]["route_type"] = i.route_type
# 	# print "response ",response
# 	# #return render(environ,'jsdev/main_page.html', response)
# 	# return HttpResponse(response)
# 	# #return render(environ,'jsdev/main_page.html', {})


# def showRoute(request,routeId):
# 	print routeId
# 	# #allpoints = RouteInfo.objects.all()
# 	# js_data = {}
# 	# #print allpoints[0].latitude
# 	# t = get_template('jsdev/map_from_db.html')
# 	# points_array = {}
	
# 	# points_array["point_0"] = {'lat':'56.268440' , 'lon':'43.877693'}
# 	# points_array["point_1"] = {'lat':'56.298745' , 'lon':'43.944931'}
# 	# points_array["point_2"] = {'lat':'56.325152' , 'lon':'44.022191'}
# 	# #return HttpResponse(json.dumps(js_data), mimetype='application/json')
# 	# return render_to_response('jsdev/map_from_db.html', {"obj_as_json": simplejson.dumps(points_array)})