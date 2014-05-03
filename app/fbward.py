import cgi
import urllib
import json

from google.appengine.api import users
from google.appengine.ext import ndb
import webapp2


# def guestbook_key(guestbook_name=DEFAULT_GUESTBOOK_NAME):
#     """Constructs a Datastore key for a Guestbook entity with guestbook_name."""
#     return ndb.Key('Guestbook', guestbook_name)


class Ward(ndb.Model):
    userid = ndb.StringProperty(required=True)
    postid = ndb.StringProperty(required=True)
    date = ndb.DateTimeProperty(auto_now_add=True)


class MainPage(webapp2.RequestHandler):
    def get(self):
        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.dumps({'Hello' : 'World'}))

class SearchAPI(webapp2.RequestHandler):
    def get(self):
        self.response.headers['Content-Type'] = 'application/json'  
        self.response.write('Search Api')

class InsertAPI(webapp2.RequestHandler):
    def post(self):
        self.response.headers['Content-Type'] = 'application/json'  
        self.response.write('Insert Api')
        user_id = self.request.get('user_id')
        post_id = self.request.get('post_id')
        ward = Ward(userid= user_id, postid= post_id)
        ward.put()
        self.response.write("User inserted")
        # self.redirect('/')

    def get(self):
        self.error(405)


class QueryAPI(webapp2.RequestHandler):
    def get(self):
        self.response.headers['Content-Type'] = 'application/json'  
        self.response.write('Query Api')

class DeleteAPI(webapp2.RequestHandler):
    def post(self):
        self.response.headers['Content-Type'] = 'application/json'  
        self.response.write('Delete Api\n')
        user_id = self.request.get('user_id')
        post_id = self.request.get('post_id')
        wards = ndb.gql("SELECT * FROM Ward WHERE userid = %(user_id)s and postid = %(post_id)s" %{ "user_id" : user_id,
                                                                                                    "post_id" : post_id})
        # To Do
        for w in wards:
            w.key.delete()

        self.response.write("User deleted")
        # self.redirect('/')
    def get(self):
        self.error(405)

application = webapp2.WSGIApplication([
    ('/', MainPage),
    ('/search', SearchAPI),
    ('/insert', InsertAPI),
    ('/delete', DeleteAPI), 
    ('/query', QueryAPI)
], debug=True)
