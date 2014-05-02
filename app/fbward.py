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
def check_ward (userid, postid) :
    list = ndb.gql ("select * from Ward where userid = '%s' and postid = '%s'"%(userid, postid))
    if not list:
        return False
    return True

class SearchAPI(webapp2.RequestHandler):
    def post(self):
        self.response.headers['Content-Type'] = 'application/json'  
        #self.response.write('Search Api')
        userid = self.request.get('user_id', -1)
        postid = self.request.get('post_id', -1)
        if check_ward (userid, postid) :
            self.response.write(json.dumps(["FALSE"]))
        else :
            self.response.write(json.dumps(["TRUE"]))


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
