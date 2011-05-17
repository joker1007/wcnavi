#!/usr/bin/env python
# -*- coding: utf-8 -*-
execfile('def.py')  # include

#-------------------------------------------------------------------------------
class Args():
    uid     = ''
    tid     = 0
    comment = ''
    point   = 0
    def check(self, obj):
        uid     = cgi.escape(obj.request.get('uid'), True)
        tid     = cgi.escape(obj.request.get('tid'), True)
        comment = cgi.escape(obj.request.get('comment'), True)
        point   = cgi.escape(obj.request.get('point'), True)
        if( len(uid) <= SLEN and \
            isint(tid) and \
            len(comment) <= SLEN and \
            isint(point) and \
            1):
            self.uid     = uid
            self.tid    = int(tid)
            self.comment = comment
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
            c = ToiletReview()
            #================= tid
            q = db.GqlQuery('SELECT * FROM Toilet WHERE tid = :1', a.tid)
            if(len(q.fetch(1)) == 0):
                response(self, simplejson.dumps(dict(res=1, info="Bad parameter: No such tid")))
                return
            t = q.fetch(1)[0]
            #================= tid, uid
            c.tid = a.tid
            c.uid = a.uid
            #================= cid
            q = db.GqlQuery('SELECT * FROM ToiletReview WHERE tid = :1 AND uid = :2', a.tid, a.uid)
            if(len(q.fetch(1)) == 0):  # 新規登録
                q = db.GqlQuery('SELECT * FROM ToiletReview ORDER BY cid DESC')
                clist = q.fetch(1)
                if(len(clist) > 0): c.cid = clist[0].cid + 1
                else:               c.cid = 0
            else:  # 既にある場合は上書き登録 (tid, uid は同じ)
                c = q.fetch(1)[0]
            #================= comment, cdate, point
            c.comment = a.comment
            c.cdate   = datetime.now() + timedelta(hours=9)
            c.point   = a.point
            #================= ToiletReview に put
            c.put()
            #================= Toilet に put (平均値算出は直近1000件で行う)
            q = db.GqlQuery('SELECT * FROM ToiletReview WHERE tid = :1', a.tid)
            t.point = 0
            t.voters = len(q.fetch(1000))
            for c in q.fetch(1000):
                t.point += c.point
            t.rate = float(t.point) / float(t.voters)
            t.put()
            #================= response
            rdata = '{"res": 0, "toiletreview": '
            rdata += c.json()
            rdata += ', "toilet": '
            rdata += t.json()
            rdata += '}'
            response(self, rdata)
        else:
            response(self, simplejson.dumps(dict(res=1, info="Bad parameter")))
            return

#-------------------------------------------------------------------------------
application = webapp.WSGIApplication([('/feedback', Handler)])
def main(): run_wsgi_app(application)
if(__name__ == "__main__"): main()
