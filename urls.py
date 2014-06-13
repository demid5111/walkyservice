from django.conf.urls import patterns, url

from jsdev import views

urlpatterns = patterns('',
    # ex: /polls/
    url(r'^$', views.index, name='index'),
    url(r'^like_category/$', views.like_category, name='like_category'),
    url(r'^mapsdraw/$', views.mapsdraw, name='mapsdraw'),
    #url(r'^maps_test/$', views.maps_test, name='maps_test'),
    #url(r'^maps_test/$', 'jsdev.views.maps_test'),
    url(r'^add/$', views.addRoutePage, name='addRoutePage'),
    url(r'^login/$', views.loginPage, name='loginPage'),
    url(r'^signup/$', views.signupPage, name='signupPage'),
    url(r'^addNewRoute/$', views.addRoute, name='addRoute'),
    url(r'^addNewUser/$', views.addUser, name='addUser'),
    url(r'^authUser/$', views.authUser, name='authUser'),
    url(r'^map_from_db/$', 'jsdev.views.get_points'),
    #url(r'^send_points/$', 'jsdev.views.send_points'),
)