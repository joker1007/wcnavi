#!/usr/bin/env python
# -*- coding: utf-8 -*-
from django.utils                     import simplejson
from datetime                         import timedelta, datetime
from google.appengine.ext             import db, webapp
from google.appengine.ext.webapp      import template
from google.appengine.ext.webapp.util import run_wsgi_app
import cgi, math, geobox

SLEN           = 500
SLICE          = 10
RESOLUTION     = 3
DATETIMEFORMAT = '%Y/%m/%d %H:%M:%S'

execfile('util.py')  # include

class Toilet(db.Model):
    tid      = db.IntegerProperty()    # トイレID
    lat      = db.FloatProperty()      # 緯度
    lon      = db.FloatProperty()      # 経度
    geoboxes = db.StringListProperty() # 境界ボックス
    uid      = db.StringProperty()     # 投稿ユーザID
    cdate    = db.DateTimeProperty()   # 投稿日時
    tname    = db.StringProperty()     # トイレ名称
    stin     = db.IntegerProperty()    # 改札内外フラグ(1=内/0=外)
    stid     = db.IntegerProperty()    # 駅グループコード
    stname   = db.StringProperty()     # 駅名
    liname   = db.StringProperty()     # 路線名
    comment  = db.StringProperty()     # 投稿者コメント
    pos      = db.IntegerProperty()    # トイレの位置種別
    posinfo  = db.StringProperty()     # トイレの位置補足情報
    room     = db.IntegerProperty()    # 個室数
    urinal   = db.IntegerProperty()    # [小]数
    west     = db.IntegerProperty()    # 洋式数
    japan    = db.IntegerProperty()    # 和式数
    multi    = db.IntegerProperty()    # 多目的数
    public   = db.IntegerProperty()    # 公衆フラグ(1=公衆)
    gender   = db.IntegerProperty()    # 性別(0=男性トイレ/1=女性トイレ)
    point    = db.IntegerProperty()    # 評価点数合計値
    voters   = db.IntegerProperty()    # 評価者数
    rate     = db.FloatProperty()      # 評価点数平均値
    confirm  = db.IntegerProperty()    # 管理者承認フラグ(1=承認/0=未承認)
    def json(self):
        return simplejson.dumps(self.dict(), ensure_ascii=False)
    def dict(self):
        return dict( \
            tid      = self.tid, \
            lat      = self.lat, \
            lon      = self.lon, \
            geoboxes = ','.join(self.geoboxes).encode('utf-8'), \
            uid      = self.uid.encode('utf-8'), \
            cdate    = self.cdate.strftime(DATETIMEFORMAT), \
            tname    = self.tname.encode('utf-8'), \
            stin     = self.stin, \
            stid     = self.stid, \
            stname   = self.stname.encode('utf-8'), \
            liname   = self.liname.encode('utf-8'), \
            comment  = self.comment.encode('utf-8'), \
            pos      = self.pos, \
            posinfo  = self.posinfo.encode('utf-8'), \
            room     = self.room, \
            urinal   = self.urinal, \
            west     = self.west, \
            japan    = self.japan, \
            multi    = self.multi, \
            public   = self.public, \
            gender   = self.gender, \
            point    = self.point, \
            voters   = self.voters, \
            rate     = self.rate, \
            confirm  = self.confirm \
            )
    def make(self, line):
        x = line.split('\t')
        if(len(x) != 25):               return False
        if(isint     (x[ 0]) == False): return False
        if(isfloat   (x[ 1]) == False): return False
        if(islat     (x[ 1]) == False): return False
        if(isfloat   (x[ 2]) == False): return False
        if(islon     (x[ 2]) == False): return False
        if(len       (x[ 3])  > SLEN ): return False
        if(len       (x[ 4])  > SLEN ): return False
        if(isdatetime(x[ 5]) == False): return False
        if(len       (x[ 6])  > SLEN ): return False
        if(isint     (x[ 7]) == False): return False
        if(isint     (x[ 8]) == False): return False
        if(len       (x[ 9])  > SLEN ): return False
        if(len       (x[10])  > SLEN ): return False
        if(len       (x[11])  > SLEN ): return False
        if(isint     (x[12]) == False): return False
        if(len       (x[13])  > SLEN ): return False
        if(isint     (x[14]) == False): return False
        if(isint     (x[15]) == False): return False
        if(isint     (x[16]) == False): return False
        if(isint     (x[17]) == False): return False
        if(isint     (x[18]) == False): return False
        if(isint     (x[19]) == False): return False
        if(isint     (x[20]) == False): return False
        if(isint     (x[21]) == False): return False
        if(isint     (x[22]) == False): return False
        if(isfloat   (x[23]) == False): return False
        if(isint     (x[24]) == False): return False
        self.tid      = int(x[0])
        self.lat      = float(x[ 1])
        self.lon      = float(x[ 2])
        self.geoboxes = []
        self.geoboxes.extend(geobox.compute_set(self.lat, self.lon, RESOLUTION, SLICE))
        self.uid      = x[4].decode('utf-8')
        self.cdate    = datetime.strptime(x[5], DATETIMEFORMAT)
        self.tname    = x[6].decode('utf-8')
        self.stin     = int(x[7])
        self.stid     = int(x[8])
        self.stname   = x[9].decode('utf-8')
        self.liname   = x[10].decode('utf-8')
        self.comment  = x[11].decode('utf-8')
        self.pos      = int(x[12])
        self.posinfo  = x[13].decode('utf-8')
        self.room     = int(x[14])
        self.urinal   = int(x[15])
        self.west     = int(x[16])
        self.japan    = int(x[17])
        self.multi    = int(x[18])
        self.public   = int(x[19])
        self.gender   = int(x[20])
        self.point    = int(x[21])
        self.voters   = int(x[22])
        if(self.voters > 0): self.rate = float(self.point)/float(self.voters)
        else:                self.rate = 0.0
        self.confirm  = int(x[24])
        return True

class ToiletReview(db.Model):
    cid      = db.IntegerProperty()    # コメントID
    tid      = db.IntegerProperty()    # トイレID
    uid      = db.StringProperty()     # 投稿ユーザID
    cdate    = db.DateTimeProperty()   # 投稿日時
    comment  = db.StringProperty()     # コメント
    point    = db.IntegerProperty()    # 評価点数
    def json(self):
        return simplejson.dumps(self.dict(), ensure_ascii=False)
    def dict(self):
        return dict( \
            cid      = self.cid, \
            tid      = self.tid, \
            uid      = self.uid.encode('utf-8'), \
            cdate    = self.cdate.strftime(DATETIMEFORMAT), \
            comment  = self.comment.encode('utf-8'), \
            point    = self.point \
            )
    def make(self, line):
        x = line.split('\t')
        if(len(x) !=  6):               return False
        if(isint     (x[ 0]) == False): return False
        if(isint     (x[ 1]) == False): return False
        if(len       (x[ 2])  > SLEN ): return False
        if(isdatetime(x[ 3]) == False): return False
        if(len       (x[ 4])  > SLEN ): return False
        if(isint     (x[ 5]) == False): return False
        self.cid      = int(x[0])
        self.tid      = int(x[1])
        self.uid      = x[2].decode('utf-8')
        self.cdate    = datetime.strptime(x[3], DATETIMEFORMAT)
        self.comment  = x[4].decode('utf-8')
        self.point    = int(x[5])
        return True

class ToiletReport(db.Model):
    rid      = db.IntegerProperty()    # 通報ID
    tid      = db.IntegerProperty()    # トイレID
    uid      = db.StringProperty()     # 通報ユーザID
    cdate    = db.DateTimeProperty()   # 通報日時
    comment  = db.StringProperty()     # コメント
    type     = db.IntegerProperty()    # 通報タイプ
    def json(self):
        return simplejson.dumps(self.dict(), ensure_ascii=False)
    def dict(self):
        return dict( \
            rid      = self.rid, \
            tid      = self.tid, \
            uid      = self.uid.encode('utf-8'), \
            cdate    = self.cdate.strftime(DATETIMEFORMAT), \
            comment  = self.comment.encode('utf-8'), \
            type     = self.type \
            )
    def make(self, line):
        x = line.split('\t')
        if(len(x) !=  6):               return False
        if(isint     (x[ 0]) == False): return False
        if(isint     (x[ 1]) == False): return False
        if(len       (x[ 2])  > SLEN ): return False
        if(isdatetime(x[ 3]) == False): return False
        if(len       (x[ 4])  > SLEN ): return False
        if(isint     (x[ 5]) == False): return False
        self.rid      = int(x[0])
        self.tid      = int(x[1])
        self.uid      = x[2].decode('utf-8')
        self.cdate    = datetime.strptime(x[3], DATETIMEFORMAT)
        self.comment  = x[4].decode('utf-8')
        self.type     = int(x[5])
        return True

class Auth(db.Model):
    uid      = db.StringProperty()     # ユーザID
    passwd   = db.StringProperty()     # パスワード
    mail     = db.StringProperty()     # メールアドレス
    point    = db.IntegerProperty()    # 評価点数合計値
    voters   = db.IntegerProperty()    # 評価者数
    rate     = db.FloatProperty()      # 評価点数平均値
    gender   = db.IntegerProperty()    # 性別(0=男性/1=女性)
    def json(self):
        return simplejson.dumps(self.dict(), ensure_ascii=False)
    def dict(self):
        return dict( \
            uid      = self.uid.encode('utf-8'), \
            passwd   = self.passwd.encode('utf-8'), \
            mail     = self.mail.encode('utf-8'), \
            point    = self.point, \
            voters   = self.voters, \
            rate     = self.rate, \
            gender   = self.gender \
            )
    def make(self, line):
        x = line.split('\t')
        if(len(x) !=  7):               return False
        if(len       (x[ 0])  > SLEN ): return False
        if(len       (x[ 1])  > SLEN ): return False
        if(len       (x[ 2])  > SLEN ): return False
        if(isint     (x[ 3]) == False): return False
        if(isint     (x[ 4]) == False): return False
        if(isfloat   (x[ 5]) == False): return False
        if(isint     (x[ 6]) == False): return False
        self.uid      = x[0].decode('utf-8')
        self.passwd   = x[1].decode('utf-8')
        self.mail     = x[2].decode('utf-8')
        self.point    = int(x[3])
        self.voters   = int(x[4])
        if(self.voters > 0): self.rate = float(self.point)/float(self.voters)
        else:                self.rate = 0.0
        self.gender   = int(x[6])
        return True

class Station(db.Model):
    lid      = db.IntegerProperty()    # 路線ID
    stid     = db.IntegerProperty()    # 駅ID
    lcname   = db.StringProperty()     # 鉄道会社名
    liname   = db.StringProperty()     # 路線名
    stname   = db.StringProperty()     # 駅名
    pref     = db.IntegerProperty()    # 都道府県コード
    lat      = db.FloatProperty()      # 緯度
    lon      = db.FloatProperty()      # 経度
    geoboxes = db.StringListProperty() # 境界ボックス
    def json(self):
        return simplejson.dumps(self.dict(), ensure_ascii=False)
    def dict(self):
        return dict( \
            lid      = self.lid, \
            stid     = self.stid, \
            lcname   = self.lcname.encode('utf-8'), \
            liname   = self.liname.encode('utf-8'), \
            stname   = self.stname.encode('utf-8'), \
            pref     = self.pref, \
            lat      = self.lat, \
            lon      = self.lon, \
            geoboxes = ','.join(self.geoboxes).encode('utf-8') \
            )
    def make(self, line):
        x = line.split('\t')
        if(len(x) !=  9):               return False
        if(isint     (x[ 0]) == False): return False
        if(isint     (x[ 1]) == False): return False
        if(len       (x[ 2])  > SLEN ): return False
        if(len       (x[ 3])  > SLEN ): return False
        if(len       (x[ 4])  > SLEN ): return False
        if(isint     (x[ 5]) == False): return False
        if(isfloat   (x[ 6]) == False): return False
        if(islat     (x[ 6]) == False): return False
        if(isfloat   (x[ 7]) == False): return False
        if(islon     (x[ 7]) == False): return False
        if(len       (x[ 8])  > SLEN ): return False
        self.lid      = int(x[0])
        self.stid     = int(x[1])
        self.lcname   = x[2].decode('utf-8')
        self.liname   = x[3].decode('utf-8')
        self.stname   = x[4].decode('utf-8')
        self.pref     = int(x[5])
        self.lat      = float(x[ 6])
        self.lon      = float(x[ 7])
        self.geoboxes = []
        self.geoboxes.extend(geobox.compute_set(self.lat, self.lon, RESOLUTION, SLICE))
        return True

