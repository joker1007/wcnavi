#!/usr/bin/env python
# -*- coding: utf-8 -*-
execfile('def.py')  # include

#-------------------------------------------------------------------------------
class Args():
    stid = 0
    def check(self, obj):
        stid = cgi.escape(obj.request.get('stid'), True)
        if( isint(stid) ):
            self.stid = int(stid)
            return True
        return False

#-------------------------------------------------------------------------------
class Handler(webapp.RequestHandler):
    def get(self):
        json_header(self)
        a = Args()
        if(a.check(self) == True):
            s = 'Station'
            slist = []
            for obj in db.GqlQuery('SELECT * FROM '+s+' WHERE stid = :1', a.stid):
                slist.append(obj.liname)
            rdata = '{"res": 0, "lines": '
            rdata += simplejson.dumps(slist, ensure_ascii=False)
            rdata += '}'
            response(self, rdata)
        else:
            response(self, simplejson.dumps(dict(res=1, info="Bad parameter")))
            return

#-------------------------------------------------------------------------------
application = webapp.WSGIApplication([('/lines', Handler)])
def main(): run_wsgi_app(application)
if(__name__ == "__main__"): main()
