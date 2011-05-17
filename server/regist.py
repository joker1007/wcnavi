#!/usr/bin/env python
# -*- coding: utf-8 -*-
execfile('def.py')  # include

#-------------------------------------------------------------------------------
class Args():
    lat     = 0.0
    lon     = 0.0
    uid     = ''
    tname   = ''
    stin    = 0
    stid    = 0
    comment = ''
    pos     = 0
    posinfo = ''
    room    = 0
    urinal  = 0
    west    = 0
    japan   = 0
    multi   = 0
    public  = 0
    gender  = 0
    point   = 0
    def check(self, obj):
        lat     = cgi.escape(obj.request.get('lat'), True)
        lon     = cgi.escape(obj.request.get('lon'), True)
        uid     = cgi.escape(obj.request.get('uid'), True)
        tname   = cgi.escape(obj.request.get('tname'), True)
        stin    = cgi.escape(obj.request.get('stin'), True)
        stid    = cgi.escape(obj.request.get('stid'), True)
        comment = cgi.escape(obj.request.get('comment'), True)
        posinfo = cgi.escape(obj.request.get('posinfo'), True)
        room    = cgi.escape(obj.request.get('room'), True)
        urinal  = cgi.escape(obj.request.get('urinal'), True)
        west    = cgi.escape(obj.request.get('west'), True)
        japan   = cgi.escape(obj.request.get('japan'), True)
        multi   = cgi.escape(obj.request.get('multi'), True)
        public  = cgi.escape(obj.request.get('public'), True)
        gender  = cgi.escape(obj.request.get('gender'), True)
        point   = cgi.escape(obj.request.get('point'), True)
        if( islat(lat) and \
            islon(lon) and \
            len(uid) <= SLEN and \
            len(tname) <= SLEN and \
            isint(stin) and \
            isint(stid) and \
            len(comment) <= SLEN and \
            len(posinfo) <= SLEN and \
            isint(room) and \
            isint(urinal) and \
            isint(west) and \
            isint(japan) and \
            isint(multi) and \
            isint(public) and \
            isint(gender) and \
            isint(point) and \
            1):
            self.lat     = float(lat)
            self.lon     = float(lon)
            self.uid     = uid
            self.tname   = tname
            self.stin    = int(stin)
            self.stid    = int(stid)
            self.comment = comment
            self.posinfo = posinfo
            self.room    = int(room)
            self.urinal  = int(urinal)
            self.west    = int(west)
            self.japan   = int(japan)
            self.multi   = int(multi)
            self.public  = int(public)
            self.gender  = int(gender)
            self.point   = int(point)
            return True
        return False

#-------------------------------------------------------------------------------
class Handler(webapp.RequestHandler):
    def post(self): ############################### POST
        json_header(self)
        a = Args()
        if(a.check(self) == True):
            err = 0
            #================= geoboxes, cdate, confirm, voters, rate
            t = Toilet()
            t.geoboxes = geobox.compute_set(a.lat, a.lon, RESOLUTION, SLICE)
            t.cdate = datetime.now() + timedelta(hours=9)
            t.confirm = 0
            t.voters = 1  # 投稿者が最初の評価者
            t.rate = float(a.point)
            #================= tid
            q = db.GqlQuery('SELECT * FROM Toilet ORDER BY tid DESC')
            tlist = q.fetch(1)
            if(len(tlist) > 0): t.tid = tlist[0].tid + 1
            else:               t.tid = 0
            #================= stname, liname
            q = db.GqlQuery('SELECT * FROM Station WHERE stid = :1', a.stid)
            stlist = q.fetch(1)
            if(len(stlist) > 0):
                t.stname = stlist[0].stname
                t.liname = stlist[0].liname
            else:
                response(self, simplejson.dumps(dict(res=1, info="Bad parameter: stid")))
                return
            #================= params
            t.lat     = a.lat
            t.lon     = a.lon
            t.uid     = a.uid
            t.tname   = a.tname
            t.stin    = a.stin
            t.stid    = a.stid
            t.comment = a.comment
            t.posinfo = a.posinfo
            t.room    = a.room
            t.urinal  = a.urinal
            t.west    = a.west
            t.japan   = a.japan
            t.multi   = a.multi
            t.public  = a.public
            t.gender  = a.gender
            t.point   = a.point
            #================= put
            t.put()
            #================= ToiletReview更新
            c = ToiletReview()
            c.tid     = t.tid
            c.uid     = a.uid
            c.comment = a.comment
            c.cdate   = datetime.now() + timedelta(hours=9)
            c.point   = a.point
            q = db.GqlQuery('SELECT * FROM ToiletReview ORDER BY cid DESC')
            clist = q.fetch(1)
            if(len(clist) > 0): c.cid = clist[0].cid + 1
            else:               c.cid = 0
            c.put()
            #================= response
            rdata = '{"res": 0, "toilet": '
            rdata += t.json()
            rdata += ', "toiletreview": '
            rdata += c.json()
            rdata += '}'
            response(self, rdata)
        else:
            response(self, simplejson.dumps(dict(res=1, info="Bad parameter")))
            return

#-------------------------------------------------------------------------------
application = webapp.WSGIApplication([('/regist', Handler)])
def main(): run_wsgi_app(application)
if(__name__ == "__main__"): main()
