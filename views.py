########################
##author : Demidovskij A.
##last update : 16.03 31.08.14
########################

from django.views.decorators.csrf import csrf_protect
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render_to_response
from django.views.decorators.csrf import csrf_exempt
import json
from django.template import loader
from django.utils import simplejson
import sqlite3
from jsdev.models import RouteInfo, RouteUser, RoutePoints
import random
from django.core import serializers
from django.conf import settings
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth.models import User
from django.contrib import auth
from django.core.context_processors import csrf
from django.contrib.auth.forms import UserCreationForm
from jsdev.forms import MyRegistrationForm
from collections import OrderedDict


def routes2dic(routes_list):
  """Function gets list of RouteInfo instances and convert it to the dictionary,
  which then renders in django template on the client side"""
  routes_dic = OrderedDict()
  for route in routes_list:
    #print route.route_id
    routes_dic[route.route_id] = {}
    routes_dic[route.route_id]["route_name"] = route.route_name
    routes_dic[route.route_id]["route_type"] = route.route_type
    routes_dic[route.route_id]["route_likes"] = route.route_likes
    routes_dic[route.route_id]["route_city"] = route.route_city
    routes_dic[route.route_id]["route_length"] = route.route_length
    routes_dic[route.route_id]["route_duration"] = route.route_duration
  return routes_dic

def index(request):
# """ Function initializes the first page with route lists
# if there is no route: creates three default
# renderers in the django template"""
    routeType = "pedestrian"
    # print RouteInfo.objects.all().delete()
    routesList = RouteInfo.objects.filter(route_type=routeType)\
                                    .order_by('-route_date')
    print "list: ",routesList
    if len(routesList) == 0:
        tmp1 = RouteInfo(route_name="My first {} route".format(routeType),
                         route_author=1,
                         route_city="N.N.",
                         route_type=routeType,
                         route_length=random.random(),
                         route_duration=random.random(),
                         route_likes = 1)
        tmp1.save()
        tmp2 = RouteInfo(route_name="My second {} route".format(routeType),
                         route_author=2,
                         route_city="N.N.",
                         route_type=routeType,
                         route_length=random.random(),
                         route_duration=random.random(),
                         route_likes = 2)
        tmp2.save()
        tmp3 = RouteInfo(route_name="My third {} route".format(routeType),
                         route_author=3,
                         route_city="N.N.",
                         route_type=routeType,
                         route_length=random.random(),
                         route_duration=random.random(),
                         route_likes = 3)
        tmp3.save()

        routesList = RouteInfo.objects.filter(route_type=routeType)\
                                    .order_by('-route_date')
    # j = 1
    # for i in routesList:
    #   i.route_likes = j
    #   j += 1
    #   i.save()
    routes_dic = routes2dic(routesList)
    print routes_dic
    return render(request, 'jsdev/index.html', {"routes_dic": routes_dic})

def getRoutes(request,route_type):
  # """Function gets all objects of routes of requested type 
  # and rerenders the extended template index_routes_ext.html"""
  print "in get_info " + route_type

  
  if request.method == "GET":
    routes_dic = {}
    print "Get request"
    route_type = request.GET["route_type"]
    category_type = request.GET["category_type"]
    print category_type
    print route_type
    routesList = []
    sort_order = {}
    # routesList = RouteInfo.objects.filter(route_type=route_type)
    if category_type == "top":
      routesList = RouteInfo.objects.filter(route_type=route_type)\
                                    .order_by('-route_likes')
    elif category_type == "new":
      routesList = RouteInfo.objects.filter(route_type=route_type)\
                                    .order_by('-route_date')
      # i = 0
      # for route in routesList:
      #   # print route.route_id
      #   sort_order[route.route_id] = i
      #   i += 1
      # print "sort order: ",sort_order
    res =  routes2dic(routesList)
    # print res
    # res_list = sorted(routes2dic(routesList).keys(), \
    #                     key=lambda x:sort_order[x])
    # print res_list
    # for i in res_list:
    #   if i not in routes_dic.keys():
    #     routes_dic[i] = {}
    #   print routes_dic
    #   print res[i]  
    #   routes_dic[i] = res[i]
    # print routes_dic
    topic_list = json.dumps({'routes_dic': routes_dic})
    print routesList
    return render_to_response('jsdev/index_routes_ext.html', {'routes_dic': res})
  return HttpResponse(topic_list)

def save_route(request):
    json_info = """{
        "route_name":"NAMEE",
        "user_name":"walkyuser",
        "route_distance":"0.799",
        "route_duration":10,
        "route_type":"pedestrian",
        "route_city":"N.N.",
        "route_points":[
        {
        "point_id":0,
        "point_lat":40.73855929950343,
        "point_lng":-73.78789186477661,
        "point_name":"N1",
        "point_description":"D1"
        },
        {
        "point_id":1,
        "point_lat":40.73756753107997,
        "point_lng":-73.78499507904053,
        "point_name":"n2",
        "point_description":"d2"
        },
        {
        "point_id":2,
        "point_lat":40.73995750527805,
        "point_lng":-73.78284931182861,
        "point_name":"n3",
        "point_description":"d3"
        }
        ]
        }"""
    route_dic = json.loads(json_info)
    #TODO: make user mdels and save in routes using authors
    author = User.objects.get(username = route_dic["user_name"])
    print "author: ", author
    if author == None:
        print "No such author"
        return
    route = RouteInfo(route_name=route_dic["route_name"],
                     route_author=author.id,
                     route_city=route_dic["route_city"],
                     route_type=route_dic["route_type"],
                     route_length=route_dic["route_distance"],
                     route_duration=route_dic["route_duration"],
                     route_likes = 0)
    route.save()
    print "route: ", route.route_type
    route_points = []
    for point in route_dic["route_points"]:
        p = RoutePoints(route_id = route.route_id,
                        point_longitude = point["point_lng"],
                        point_latitude = point["point_lat"],
                        point_name = point["point_name"],
                        point_description = point["point_description"],
                        point_order = point["point_id"])
        p.save()
        print p
    return HttpResponse()
#############################################################
#####Deprecated functionality
#####Needs to be rewritten if important or to be got rid of in future releases
#############################################################
def mapsdraw(request):
    text = 'demid'
    t = get_template('jsdev/mapsdraw.html')
    # html = t.render(Context({'text': text}))
    html = t.render(Context({}))
    return HttpResponse(html)


def maps_test(request):
    route = 'from Moscow to NN'
    t = get_template('jsdev/maps_test.html')
    html = t.render(Context({'route': route}))
    return HttpResponse(html)


def get_points(request):
    # allpoints = RouteInfo.objects.all()
    js_data = {}
    # print allpoints[0].latitude
    t = get_template('jsdev/map_from_db.html')
    points_array = {}

    points_array["point_0"] = {'lat': '56.268440', 'lon': '43.877693'}
    points_array["point_1"] = {'lat': '56.298745', 'lon': '43.944931'}
    points_array["point_2"] = {'lat': '56.325152', 'lon': '44.022191'}
    # return HttpResponse(json.dumps(js_data), mimetype='application/json')
    return render_to_response('jsdev/map_from_db.html', {"obj_as_json": simplejson.dumps(points_array)})


def addRoutePage(request):
    #return render(request, 'jsdev/addRoute.html', {})
    return render(request, 'jsdev/add_route.html', {})


@csrf_exempt
def addRoute(environ):
    data = {}
    print "in addRoutes"

    route_name = ""
    route_type = ""
    route_likes = ""
    route_city = ""
    route_length = ""
    route_duration = ""
    points = {}
    conn = sqlite3.connect('db.sqlite3')
    if environ.is_ajax():
        print "is ajax"
        jData = json.loads(environ.body)
        for i in jData.keys():
            data[i] = jData[i]
        # print data["route_name"]
        route_name = data["route_name"]
        route_type = data["route_type"]
        route_likes = data["route_likes"]
        route_city = data["route_city"]
        route_length = data["route_length"]
        route_duration = data["route_duration"]
        for i in data["points"].keys():
            print "Key = ",  i,  " Latitude = ", data["points"][i]['lat'], " Longitude = ", data["points"][i]['lon']

        # sqlQuery = "INSERT INTO jsdev_routeinfo(route_name, route_likes, route_city, route_length, route_duration) values(" + route_name + "," + route_likes + "," + route_city + "," + route_length + "," + route_duration + ")"
        # conn.execute(sqlQuery)
        # conn.commit()
        # conn.close
    # return render(environ,'jsdev/main_page.html', {})
    return HttpResponse()


@csrf_exempt
def send_points(environ):
    # allpoints = Routepoint.objects.all()
    # print allpoints
    if environ.is_ajax():
        message = "Yes, AJAX!"  # + (str)(environ.POST)
        # jInfo = json.loads(environ.POST.keys()[0])
        jInfo = json.loads(environ.body)
        # print jInfo
        # print jInfo['start']['A']
        for i in jInfo.keys():
            print "Key = ",  i,  " Latitude = ", jInfo[i]['lat'], " Longitude = ", jInfo[i]['lon']
            # point = Routepoint(pointname=i, route=route , latitude=jInfo[i]['lat'], longitude=jInfo[i]['lon'])
            # point.save()
    else:
        message = "Not Ajax"
    return HttpResponse(message)


def loginPage(request):
    return render(request, 'jsdev/loginPage.html', {})

def login(request):
  c = {}
  c.update(csrf(request))
  return render_to_response('jsdev/marat_login.html', c)

def auth_view(request):
  username = request.POST.get('username', '')  
  password = request.POST.get('password', '') 
  user = auth.authenticate(username = username,  password = password)

  if user is not None:
    auth.login(request, user)
    return HttpResponseRedirect('../loggedin') 
  else:
    return HttpResponseRedirect('../invalid')


def loggedin(request):
  return render_to_response("jsdev/loggedin.html", {'full_name': request.user.username}) 

def logout(request):
  auth.logout(request)
  return render_to_response('jsdev/logout.html')

def invalid(request):
  return render_to_response('jsdev/invalid.html')  

def register_user(request):
  if request.method == 'POST':
    form = MyRegistrationForm(request.POST)
    if form.is_valid():
      form.save()
      return HttpResponseRedirect('../register_success')

  args = {}
  args.update(csrf(request)) 
  args['form'] = MyRegistrationForm()

  return render_to_response('jsdev/register.html', args)   


def register_success(request):
  return render_to_response('jsdev/register_success.html')

@csrf_exempt
def addUser(environ):

    data = {}
    print "in addUser"
    sqlQuery = ""
    user_name = ""

    user_email = ""
    user_password = ""

    conn = sqlite3.connect('db.sqlite3')
    if environ.is_ajax():
        print "is ajax"
        jData = json.loads(environ.body)
        for i in jData.keys():
            data[i] = jData[i]
        # print data["route_name"]
        user_name = data["user_name"]

        user_email = data["user_email"]
        user_password = data["user_password"]
        print "user_name = ",  user_name,   " user_email = ", user_email, " user_password = ", user_password

        # sqlQuery = "INSERT INTO jsdev_routeuser(user_name, user_password, user_email) values(" + user_name + "," + user_password + "," + user_email + ")"
        # conn.execute(sqlQuery)
        # conn.commit()
        # conn.close
        print "before RouteUser()"
        # new_user = RouteUser()
        # new_user.user_name = user_name
        # new_user.user_email = user_email
        # new_user.user_password = user_password
        # new_user.save()
        user = User.objects.create_user(
        username = user_name,
        password = user_password,
        email = user_email
        )
        user.save( )
        print "saved"

    # return render(environ,'jsdev/main_page.html', {})
    return HttpResponse("User created")


def signupPage(request):
    return render(request, 'jsdev/signupPage.html', {})


@csrf_exempt
def authUser(environ):
    data = {}
    print "in authUser"
    user_email = ""
    user_password = ""
    if environ.is_ajax():
        print "is ajax"
        jData = json.loads(environ.body)
        for i in jData.keys():
            data[i] = jData[i]
        # print data["route_name"]
        user_email = data["user_email"]
        user_password = data["user_password"]
       
        print "user_email = ", user_email, " user_password = ", user_password
        authUser = User.objects.filter(email=user_email)
        if (authUser[0].password == user_password):
            return HttpResponse("User Found")
    return HttpResponse("User Not Found")






def showRoute(request, routeId):
    # print routeId
    routeInfo = RouteInfo.objects.filter(route_id=routeId)
    routePoints = RoutePoints.objects.filter(route_id=routeId)

    js_data = {}
    # print allpoints[0].latitude

    points_array = {}
    for i in routePoints:
        points_array[i.point_id] = {
            "lat": i.point_latitude, "lon": i.point_longitude}
        # print i.point_id
    # points_array["point_0"] = {'lat':'56.268440' , 'lon':'43.877693'}
    # points_array["point_1"] = {'lat':'56.298745' , 'lon':'43.944931'}
    # points_array["point_2"] = {'lat':'56.325152' , 'lon':'44.022191'}
    # return HttpResponse(json.dumps(js_data), mimetype='application/json')
    return render_to_response('jsdev/map_from_db.html', {"obj_as_json": simplejson.dumps(points_array)})


@csrf_exempt
def addUser(environ):
    data = {}
    print "in addUser"
    sqlQuery = ""
    user_name = ""
    user_surname = ""
    user_email = ""
    user_password = ""

    conn = sqlite3.connect('db.sqlite3')
    if environ.is_ajax():
        print "is ajax"
        jData = json.loads(environ.body)
        for i in jData.keys():
            data[i] = jData[i]
        # print data["route_name"]
        user_name = data["user_name"]
        user_surname = data["user_surname"]
        user_email = data["user_email"]
        user_password = data["user_password"]
        print "user_name = ",  user_name,  " user_surname = ", user_surname, " user_email = ", user_email, " user_password = ", user_password

        # sqlQuery = "INSERT INTO jsdev_routeinfo(route_name, route_likes, route_city, route_length, route_duration) values(" + route_name + "," + route_likes + "," + route_city + "," + route_length + "," + route_duration + ")"
        # conn.execute(sqlQuery)
        # conn.commit()
        # conn.close
        new_user = RouteUser()
        new_user.user_name = user_name
        new_user.user_surname = user_surname
        new_user.user_email = user_email
        new_user.user_password = user_password
        new_user.save()

    # return render(environ,'jsdev/main_page.html', {})
    return HttpResponse()


def signupPage(request):
    return render(request, 'jsdev/signupPage.html', {})


@csrf_exempt
def authUser(environ):
    data = {}
    print "in authUser"
    user_email = ""
    user_password = ""
    if environ.is_ajax():
        print "is ajax"
        jData = json.loads(environ.body)
        for i in jData.keys():
            data[i] = jData[i]
        # print data["route_name"]
        user_email = data["user_email"]
        user_password = data["user_password"]
        print "user_email = ", user_email, " user_password = ", user_password
        authUser = RouteUser.objects.filter(user_email=user_email)
        if (authUser[0].user_password == user_password):
            return HttpResponse("User Found")
    return HttpResponse("User Not Found")





def showRoute(request, routeId):
    # print routeId
    routeInfo = RouteInfo.objects.filter(route_id=routeId)
    routePoints = RoutePoints.objects.filter(route_id=routeId)

    js_data = {}
    # print allpoints[0].latitude

    points_array = {}
    for i in routePoints:
        points_array[i.point_id] = {
            "lat": i.point_latitude, "lon": i.point_longitude}
        # print i.point_id
    # points_array["point_0"] = {'lat':'56.268440' , 'lon':'43.877693'}
    # points_array["point_1"] = {'lat':'56.298745' , 'lon':'43.944931'}
    # points_array["point_2"] = {'lat':'56.325152' , 'lon':'44.022191'}
    # return HttpResponse(json.dumps(js_data), mimetype='application/json')
    #return render_to_response('jsdev/map_from_db.html', {"obj_as_json": simplejson.dumps(points_array)})
    return render_to_response('jsdev/route_view.html', {"obj_as_json": simplejson.dumps(points_array)})
