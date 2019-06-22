#!/usr/bin/env python
# -*- coding: utf-8 -*-

from datetime import datetime
import json, simplejson, string, pprint

printable         = set(string.printable)
data_to_export    = []
range_to_import   = 60
days_range        = 700
working_directory = ""

with open(working_directory+"result.json") as f:
    config = json.load(f)

    print config.keys()
    print type(config["chats"])
    print config["chats"].keys()
    print type(config["chats"]["list"])
    print config["chats"]["list"][0].keys()

    for n, i in enumerate(config["chats"]["list"][0:range_to_import]):
        print "-------------------"
        if "name" in i.keys():
            print type(i)
            print i.keys()
            # print i["name"]
            if i["name"] != None:
                print filter(lambda x: x in printable, i["name"])
                # data_to_export.append({"nombre"         : i["name"]})

                tmp_dict = {}
                tmp_dict["nombre"          ] = str(n)
                tmp_dict["chat_messages_1" ] = [0]*days_range
                tmp_dict["chat_messages_4" ] = [ [0,0,0,0], [1,1,1,1] ]
                tmp_dict["chat_messages_12"] = [ [7,7,7,7,0,0,0,0,1,1,1,1] ]

                # data_to_export.append({"nombre"          : str(n)})
                # data_to_export.append({"chat_messages_1" : [0]*days_range})
                # data_to_export.append({"chat_messages_4" : [ [0,0,0,0], [1,1,1,1] ]})
                # data_to_export.append({"chat_messages_12": [ [7,7,7,7,0,0,0,0,1,1,1,1] ]})

                data_to_export.append(tmp_dict)


            else:
                # print "None"
                data_to_export.append({})

    # print data_to_export

    for n, i in enumerate(config["chats"]["list"][0:range_to_import-1]):
        # print i["messages"][0:5]

        print n
        if (len(data_to_export[n].keys()) > 0):
            # print pprint.pprint(i["messages"][0:5])
            print len(data_to_export)
            valid = 0
            for j in i["messages"]:
                this_date = datetime.strptime(j["date"], '%Y-%m-%dT%H:%M:%S')
                days = (datetime.now() - this_date).days
                if (days < days_range):
                    valid += 1
                    # print data_to_export[n]
                    # print type(days)
                    # print n, "|", days, data_to_export[n]
                    # print data_to_export[n]["chat_messages_1"][days]

                    try:
                        data_to_export[n]["chat_messages_1"][days] += 1
                    except:
                        print n, "|", days, data_to_export[n]
                        print n, "|", days, data_to_export[n]["chat_messages_1"][days]

            print "valid =", valid
        else:
            print "pasando..."

with open(working_directory+'data_1.json', 'w') as outfile:
    json.dump(data_to_export, outfile, sort_keys=True, indent=4, separators=(',', ': '))













#
