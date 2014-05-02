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
    userid = ndb.IntegerProperty(required=True)
    postid = ndb.IntegerProperty(required=True)
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
    def get(self):
        self.response.headers['Content-Type'] = 'application/json'  
        self.response.write('Insert Api')
class QueryAPI(webapp2.RequestHandler):
    def get(self):
        self.response.headers['Content-Type'] = 'application/json'  
        self.response.write('Query Api')

class DeleteAPI(webapp2.RequestHandler):
    def get(self):
        self.response.headers['Content-Type'] = 'application/json'  
        self.response.write('Delete Api')


application = webapp2.WSGIApplication([
    ('/', MainPage),
    ('/search', SearchAPI),
    ('/insert', InsertAPI),
    ('/delete', DeleteAPI), 
    ('/query', QueryAPI)
], debug=True)
