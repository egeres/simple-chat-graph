#!/usr/bin/env python
# -*- coding: utf-8 -*-

from datetime import datetime
import json, simplejson, string, pprint, sys

printable                = set(string.printable)
data_to_export           = []
range_of_chats_to_import = 25
days_range               = 300
working_directory        = ""
output_directory         = None
list_of_exported_files   = []

filename = working_directory+"result.json"
if len(sys.argv) > 1:
    filename          = sys.argv[1]
    working_directory = "\\".join(filename.split("\\")[:-1])
    print ("working_directory = " + working_directory)

if len(sys.argv) > 2:
    output_directory = sys.argv[2]
    # working_directory = "\\".join(filename.split("\\")[:-1])
    # print ("working_directory = " + working_directory)


with open(filename) as f:
    config = json.load(f)

    # print config.keys()
    # print type(config["chats"])
    # print config["chats"].keys()
    # print type(config["chats"]["list"])
    # print config["chats"]["list"][0].keys()

    print ("\nPre processing !")
    # This for generates the dictionary structure to fill in with real data later
    for n, i in enumerate(config["chats"]["list"][0:range_of_chats_to_import]):
        print "Processing...",
        if "name" in i.keys():
            # print type(i)
            # print i.keys()
            # print i["name"]
            if i["name"] != None:
                print filter(lambda x: x in printable, i["name"])

                tmp_dict = {}
                # tmp_dict["nombre"          ] = str(n)
                # tmp_dict["nombre"          ] = str(i["name"])
                # tmp_dict["nombre"          ] = i["name"].encode('utf-8')
                tmp_dict["nombre"          ] = i["name"].encode('ascii', 'ignore').replace(":", "")
                tmp_dict["chat_messages_1" ] = [0]*days_range                # Daily messages
                tmp_dict["chat_messages_4" ] = [ [0,0,0,0], [1,1,1,1] ]      # Each 4 days  (currently not in use)
                tmp_dict["chat_messages_12"] = [ [7,7,7,7,0,0,0,0,1,1,1,1] ] # Each 12 days (currently not in use)

                data_to_export.append(tmp_dict)


            else:
                # print "None"
                data_to_export.append({})
        else:
            print "Unnamed"
            tmp_dict = {}
            # tmp_dict["nombre"          ] = str(n)
            # tmp_dict["nombre"          ] = str(i["name"])
            tmp_dict["nombre"          ] = "Unnamed"
            tmp_dict["chat_messages_1" ] = [0]*days_range                # Daily messages
            tmp_dict["chat_messages_4" ] = [ [0,0,0,0], [1,1,1,1] ]      # Each 4 days  (currently not in use)
            tmp_dict["chat_messages_12"] = [ [7,7,7,7,0,0,0,0,1,1,1,1] ] # Each 12 days (currently not in use)

            data_to_export.append(tmp_dict)


    # print data_to_export

    print ("\nFilling chats !")
    # This for fills the previous structure with the real values
    for n, i in enumerate(config["chats"]["list"][0:range_of_chats_to_import-1]):
        print "Generating... " + data_to_export[n]["nombre"].ljust(10),
        # print ("Generating... ", data_to_export[n].keys())
        # print i["messages"][0:5]

        # print n
        if (len(data_to_export[n].keys()) > 0):
            # print pprint.pprint(i["messages"][0:5])
            # print len(data_to_export)
            valid = 0

            dic_to_dump = {
                "title":data_to_export[n]["nombre"],
                "type":"timeline_float",
                "timeline_float_min":0,
                "timeline_float_max":0,
                "data":[]
            }

            # We increase the number of the messages per day
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

            print "found messages =", valid # messages in the range of days

            max_value = 0
            for j in data_to_export[n]["chat_messages_1"]:
                if j >= max_value:
                    max_value = j

            dic_to_dump["timeline_float_max"] = max_value
            dic_to_dump["data"] = data_to_export[n]["chat_messages_1"][::-1]

            if output_directory != None:
                with open(output_directory+'\\chat_'+data_to_export[n]["nombre"]+'.json', 'w+') as outfile:
                    json.dump(dic_to_dump, outfile, sort_keys=True, indent=4, separators=(',', ': '))
                    list_of_exported_files.append('chat_'+data_to_export[n]["nombre"]+'.json')
            else:
                with open(working_directory+'\\files\\chat_'+data_to_export[n]["nombre"]+'.json', 'w+') as outfile:
                    json.dump(dic_to_dump, outfile, sort_keys=True, indent=4, separators=(',', ': '))
                    list_of_exported_files.append('chat_'+data_to_export[n]["nombre"]+'.json')

        else:
            print "it's empthy..."

print ("\nlist_of_exported_files = " + str(list_of_exported_files))


# with open(working_directory+'\\files\\data_1.json', 'w') as outfile:
#     json.dump(data_to_export, outfile, sort_keys=True, indent=4, separators=(',', ': '))













#
