from django.shortcuts import render
from django.template.loader import get_template
from django.http import HttpResponse, HttpResponseRedirect
from django.template import Template, Context
from django.shortcuts import render_to_response
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
#for json
import json
from django.utils import simplejson
import sqlite3
from jsdev.models import RouteInfo

def index(request):
	routeType =  "pedestrian"
	routesList = RouteInfo.objects.filter(route_type = routeType)				
	
	response  = {}
	response["routes"] = {}
	for i in routesList:

		response["routes"][i.route_id] = {}
		response["routes"][i.route_id]["route_name"]	= i.route_name
		response["routes"][i.route_id]["route_likes"]	= i.route_likes
		response["routes"][i.route_id]["route_duration"] = i.route_duration
		response["routes"][i.route_id]["route_city"] = i.route_city
		response["routes"][i.route_id]["route_length"] = i.route_length
		response["routes"][i.route_id]["route_city"] = i.route_city
		response["routes"][i.route_id]["route_author"] = i.route_author
		response["routes"][i.route_id]["route_type"] = i.route_type
	print "response ",response
	return render(request,'jsdev/main_page.html', response)


@csrf_exempt
def get_info(environ):
	print "in get_info"
	
	
	routesList = []
	if environ.is_ajax():
		
		jInfo = json.loads(environ.body)
		routeType =  jInfo["route_type"]
		routesList = RouteInfo.objects.filter(route_type = routeType)				
	
	response  = {}
	response["routes"] = {}
	for i in routesList:

		response["routes"][i.route_id] = {}
		response["routes"][i.route_id]["route_name"]	= i.route_name
		response["routes"][i.route_id]["route_likes"]	= i.route_likes
		response["routes"][i.route_id]["route_duration"] = i.route_duration
		response["routes"][i.route_id]["route_city"] = i.route_city
		response["routes"][i.route_id]["route_length"] = i.route_length
		response["routes"][i.route_id]["route_city"] = i.route_city
		response["routes"][i.route_id]["route_author"] = i.route_author
		response["routes"][i.route_id]["route_type"] = i.route_type
	print "response ",response
	#return render(environ,'jsdev/main_page.html', response)
	return HttpResponse(response)
	#return render(environ,'jsdev/main_page.html', {})

def category(request, category_name_url):
    context = RequestContext(request)
    cat_list = get_category_list()
    category_name = decode_url(category_name_url)

    context_dict = {'cat_list': cat_list, 'category_name': category_name}

    try:
            category = Category.objects.get(name=category_name)

            # Add category to the context so that we can access the id and likes
            context_dict['category'] = category

            pages = Page.objects.filter(category=category)
            context_dict['pages'] = pages
    except Category.DoesNotExist:
            pass

    return render_to_response('jsdev/main_page.html', context_dict, context)

@login_required
def like_category(request):
	print "HERE!!!"#, request
	#context = RequestContext(request)
	cat_id = None
	if request.method == 'GET':
		print "GET"
		print request.GET
		cat_id = request.GET['category_id']
		print cat_id
	likes = 0
	if cat_id:
		category = Category.objects.get(id=int(cat_id))
		if category:
			likes = category.likes + 1
			category.likes =  likes
			category.save()
	return HttpResponse(likes)



def mapsdraw(request):
	text = 'demid'
	t = get_template('jsdev/mapsdraw.html')
	#html = t.render(Context({'text': text}))
	html = t.render(Context({}))
	return HttpResponse(html)

def maps_test(request):
	route = 'from Moscow to NN'
	t = get_template('jsdev/maps_test.html')
	html = t.render(Context({'route': route}))
	return HttpResponse(html)
#deprecated
def get_points(request):
	#allpoints = RouteInfo.objects.all()
	js_data = {}
	#print allpoints[0].latitude
	t = get_template('jsdev/map_from_db.html')
	points_array = {}
	
	points_array["point_0"] = {'lat':'56.268440' , 'lon':'43.877693'}
	points_array["point_1"] = {'lat':'56.298745' , 'lon':'43.944931'}
	points_array["point_2"] = {'lat':'56.325152' , 'lon':'44.022191'}
	#return HttpResponse(json.dumps(js_data), mimetype='application/json')
	return render_to_response('jsdev/map_from_db.html', {"obj_as_json": simplejson.dumps(points_array)})

def showRoute(request,routeId):
	print routeId
	#allpoints = RouteInfo.objects.all()
	js_data = {}
	#print allpoints[0].latitude
	t = get_template('jsdev/map_from_db.html')
	points_array = {}
	
	points_array["point_0"] = {'lat':'56.268440' , 'lon':'43.877693'}
	points_array["point_1"] = {'lat':'56.298745' , 'lon':'43.944931'}
	points_array["point_2"] = {'lat':'56.325152' , 'lon':'44.022191'}
	#return HttpResponse(json.dumps(js_data), mimetype='application/json')
	return render_to_response('jsdev/map_from_db.html', {"obj_as_json": simplejson.dumps(points_array)})


def addRoutePage(request):	
	return render(request,'jsdev/addRoute.html', {})	

@csrf_exempt
def addRoute(environ):
	print "in addRoutes"
	newRoute = RouteInfo()
	data = {}
	
	
	if environ.is_ajax():
		print "is ajax"
		jData = json.loads(environ.body)
		print jData
		
		newRoute.route_name = jData["route_name"]
		newRoute.route_duration = jData["route_duration"]
		newRoute.route_likes = jData["route_likes"]
		newRoute.route_length = jData["route_length"]
		newRoute.route_city = jData["route_city"]
		newRoute.route_author = 1
		print "Before save"

		newRoute.save()
		print 'After save'
		#newRoute.route_author = jData["route_author"]
	#return render(environ,'jsdev/main_page.html', {})	
	return HttpResponseRedirect("/jsdev/")



