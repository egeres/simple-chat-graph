#!/usr/bin/env python
# -*- coding: utf-8 -*-

from   os import listdir
from   os.path import isfile, join
import time
import datetime
import unicodedata
import csv

path = "../chats"

def read_beginning(day, month, year):

    fmt = '%Y.%m.%d'

    if len(str(day)) == 1:
        day = "0" + str(day)


    # s = '2012.11.07'
    s = str(year) + "." + str(month) + "." + str(day)

    dt = datetime.datetime.strptime(s, fmt)
    tt = dt.timetuple()

    value = tt.tm_yday

    return int(int(value) + int(year) * 365)

onlyfiles = [f for f in listdir(path) if isfile(join(path, f))]
print "created the list of files..."

time.strftime("%d/%m/%Y")

# day   = int(time.strftime("%d"))
# month = int(time.strftime("%m"))
# year  = int(time.strftime("%Y"))
# num_today = read_beginning(day, month, year) #45343537 por ejemplo

num_today = datetime.datetime.now().timetuple().tm_yday + 2017 * 365

output = []
for i in range(365):
    buff = []
    for j in range(len(onlyfiles)):
        buff.append(0)
    output.append(buff)
print "data structure created..."



for n, i in enumerate(onlyfiles):

    with open("../chats/" + str(i)) as f:
        content = f.readlines()

    content = [x.strip() for x in content]

    numeric_day_1 = None
    counter       = 0

    #content is a list containing evert single line
    for j in content:

        if len(j) > 0 and j[0].isdigit():

            # print "j =", j
            # print type(j)
            # print j.split(" ")
            # print j.split(" ")[0]
            # print j.split(" ")[0].split(".")
            # print j.split(" ")[0].split(".")[0]

            day           = int(j.split(" ")[0].split(".")[0])
            month         = int(j.split(" ")[0].split(".")[1])
            year          = int(j.split(" ")[0].split(".")[2])

            numeric_day_0 =       read_beginning(day, month, year) #45343000 quizs
            day_index     = - abs(numeric_day_0 - num_today)

            if numeric_day_1:
                if numeric_day_1 == numeric_day_0:
                    counter += 1
                else:
                    output[day_index][n] = counter
                    counter = 0
            else:
                output[day_index][n] = counter
            numeric_day_1 = numeric_day_0

    print n, "loaded chat..."



# output_commit_info = sorted(output_commit_info, key=lambda x: x[0])


with open('data.csv', 'wb') as myfile:

    wr = csv.writer(myfile, quoting=csv.QUOTE_ALL)

    wr.writerow(["a", "b", "c", "d", "e", "f", "g", "h", "i"][0:len(output[0])])

    for i in output:

        wr.writerow(i)

        # wr.writerow(
        # [
        # (i[1]).encode("utf-8"),
        # (i[2]).encode("utf-8")
        # ])
