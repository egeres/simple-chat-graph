from datetime import datetime as dt
import time

def toYearFraction(date):
    def sinceEpoch(date): # returns seconds since epoch
        return time.mktime(date.timetuple())
    s = sinceEpoch

    year = date.year
    startOfThisYear = dt(year=year, month=1, day=1)
    startOfNextYear = dt(year=year+1, month=1, day=1)

    yearElapsed = s(date) - s(startOfThisYear)
    yearDuration = s(startOfNextYear) - s(startOfThisYear)
    fraction = yearElapsed/yearDuration

    return date.year + fraction

print toYearFraction(dt.today())

print dt.now().timetuple().tm_yday

print dt(2010, 12, 30, 23, 59, 59)
print dt(2010, 12, 31, 23, 59, 59).timetuple().tm_yday

print (dt.now() - dt(2010, 12, 31, 23, 59, 59)).days

print dt.strptime('2016-05-28T14:09:54', '%Y-%m-%dT%H:%M:%S')
