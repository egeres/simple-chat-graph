#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json, simplejson, string, pprint

printable         = set(string.printable)
data_to_export    = []
range_to_import   = 6
working_directory = ""

with open(working_directory+"result.json") as f:
    config = json.load(f)

    print config.keys()
    print type(config["chats"])
    print config["chats"].keys()
    print type(config["chats"]["list"])
    print config["chats"]["list"][0].keys()

    for i in config["chats"]["list"][0:range_to_import]:
        print "-------------------"
        if "name" in i.keys():
            print type(i)
            print i.keys()
            # print i["name"]
            if i["name"] != None:
                print filter(lambda x: x in printable, i["name"])
                data_to_export.append({"nombre":i["name"]})
            else:
                print "None"

    for i in config["chats"]["list"][0:range_to_import]:
        # print i["messages"][0:5]



        print pprint.pprint(i["messages"][0:5])

with open(working_directory+'data_0.json', 'w') as outfile:
    json.dump(data_to_export, outfile, sort_keys=True, indent=4, separators=(',', ': '))













#
