#!/usr/bin/env python
# -*- coding: utf-8 -*-

#-------------------------------------------------------------------------------
# check value: float
def isfloat(s):
    try:
        p = float(s)
    except ValueError:
        return False
    return True
# check value: int
def isint(s):
    try:
        p = int(s)
    except ValueError:
        return False
    return True
# check value: geo(float)
def isgeo(lat,lon):
    if(isfloat(lat) and isfloat(lon)):
        if( float(lat) >= - 90.0 and float(lat) <=  90.0 \
        and float(lon) >= -180.0 and float(lon) <= 180.0):
            return True
    return False

# check value: lat(float)
def islat(lat):
    if(isfloat(lat)):
        if( float(lat) >= -90.0 and float(lat) <= 90.0):
            return True
    return False

# check value: lon(float)
def islon(lon):
    if(isfloat(lon)):
        if( float(lon) >= -180.0 and float(lon) <= 180.0):
            return True
    return False

# check value: datetime
def isdatetime(s):
    try:
        dt = datetime.strptime(s, DATETIMEFORMAT)
    except ValueError:
        return False
    return True

#-------------------------------------------------------------------------------
# calc distance
def dist(x1, y1, x2, y2):
    return math.sqrt( math.pow(x2-x1, 2.0) + math.pow(y2-y1, 2.0) )

#-------------------------------------------------------------------------------
# response
def json_header(obj):
    obj.response.headers['Content-Type'] = 'application/json; charset=utf-8'

def response(obj, s):
    obj.response.out.write(s)
