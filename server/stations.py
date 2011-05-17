#!/usr/bin/env python
# -*- coding: utf-8 -*-
execfile('def.py')  # include

#-------------------------------------------------------------------------------
class Args():
    lat = 0.0
    lon = 0.0
    sort  = ''
    def check(self, obj):
        lat   = cgi.escape(obj.request.get('lat'), True)
        lon   = cgi.escape(obj.request.get('lon'), True)
        self.sort  = cgi.escape(obj.request.get('sort'), True)
        if( islat(lat) and islon(lon) and len(self.sort) >= 0 and len(self.sort) <= 10):
            if(self.sort == '' or self.sort == 'distance'):
                self.lat = float(lat)
                self.lon = float(lon)
                return True
        return False

#-------------------------------------------------------------------------------
class Handler(webapp.RequestHandler):
    def get(self):
        json_header(self)
        a = Args()
        if(a.check(self) == True):
            ubox = []  # user geobox
            ubox = geobox.compute_set(a.lat, a.lon, RESOLUTION, SLICE)
            s = 'Station'
            olist = []
            m = 0
            for obj in db.GqlQuery('SELECT * FROM '+s+' WHERE geoboxes IN :1', ubox):
                if(a.sort == ''):         olist.append(obj)
                if(a.sort == 'distance'): olist.append((dist(obj.lat, obj.lon, a.lat, a.lon), obj))
                m += 1
            if(a.sort != ''): olist.sort()
            i = 0
            rdata = '{"res": 0, "stations": ['
            while(i<m):
                if(i!=0): rdata += ", "
                if(a.sort != ''): rdata += olist[i][1].json()
                else:             rdata += olist[i].json()
                i += 1
            rdata += ']}'
            response(self, rdata)
        else:
            response(self, simplejson.dumps(dict(res=1, info="Bad parameter")))
            return

#-------------------------------------------------------------------------------
application = webapp.WSGIApplication([('/stations', Handler)])
def main(): run_wsgi_app(application)
if(__name__ == "__main__"): main()
