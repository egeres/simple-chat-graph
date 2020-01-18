import os
import re
import emoji
import numpy as np
import matplotlib.pyplot as plt
from pprint import pprint

dict_chats                           = {}
histogram_of_all_characters_ammount  = np.zeros(200)
histogram_of_all_words_ammount       = np.zeros(200)
histogram_of_all_emojis              = np.zeros(200)
histogram_of_sent_characters_ammount = np.zeros(200)
histogram_of_sent_words_ammount      = np.zeros(200)
histogram_of_sent_emojis             = np.zeros(200)
tuples_all_words_emojis              = []
tuples_all_characters_words          = []
tuples_sent_words_emojis             = []
tuples_sent_characters_words         = []

def char_is_emoji(character):
    return character in emoji.UNICODE_EMOJI

for file in os.listdir("chats_to_process"):
    # print ("file... ", file)
    with open("chats_to_process/" + file, encoding="utf-8") as f:
        content = f.readlines()

    content          = [x.strip()                        for x in content]
    cleaned_content  = [":".join(x.split(":")[2::])[1::] for x in content][1::] # Lo de [1::] es para quitar el primer mensaje
    sent_content     = [":".join(x.split(":")[2::])[1::] for x in content if (len(x.split("-")) > 1 and     "Heyy" in x.split("-")[1])]
    received_content = [":".join(x.split(":")[2::])[1::] for x in content if (len(x.split("-")) > 1 and not "Heyy" in x.split("-")[1])]


    # for i in 

    for i in cleaned_content:

        count_chars = len(i)
        if count_chars < len(histogram_of_all_words_ammount):
            histogram_of_all_characters_ammount[count_chars] += 1

        count_words = len(i.split(" "))
        if count_words < len(histogram_of_all_words_ammount):
            histogram_of_all_words_ammount[count_words] += 1

        # count_emojies = len(re.findall(ru'[\U0001f600-\U0001f650]', i))
        # count_emojies = len(re.findall(ru'\w+|[\U0001f600-\U0001f650]', i))
        # count_emojies = len(re.findall(u'\w+|[\U0001f600-\U0001f650]', i.decode('utf-8')))
        # count_emojies = len(re.findall(u'\w+|[\U0001f600-\U0001f650]', i))
        count_emojies = len([c for c in i if char_is_emoji(c)])
        if count_emojies < len(histogram_of_all_emojis):
            histogram_of_all_emojis[count_emojies] += 1

        tuples_all_words_emojis.append(    [count_words, count_emojies])
        tuples_all_characters_words.append([count_words, count_chars])

        # if count_emojies == 9:
        #     print (i)
        #     exit()

    for i in sent_content:

        count_chars = len(i)
        if count_chars < len(histogram_of_sent_words_ammount):
            histogram_of_sent_characters_ammount[count_chars] += 1

        count_words = len(i.split(" "))
        if count_words < len(histogram_of_sent_words_ammount):
            histogram_of_sent_words_ammount[count_words] += 1

        count_emojies = len([c for c in i if char_is_emoji(c)])
        if count_emojies < len(histogram_of_sent_emojis):
            histogram_of_sent_emojis[count_emojies] += 1

        tuples_sent_words_emojis.append(    [count_words, count_emojies])
        tuples_sent_characters_words.append([count_words, count_chars])


    # if "Curto" in file:
    #     print (content)
    #     print (cleaned_content)
    #     pprint (   [x.split("-") for x in content]   )
    #     print ("")
    #     print (sent_content)

    # total_mensajes  = len(content)

    print ("file... ", file, len(content))

    # dict_chats[file.replace(" ", "_")] = {
    #     "total": total_mensajes
    # }


tuples_all_words_emojis      = np.array(tuples_all_words_emojis)
tuples_all_characters_words  = np.array(tuples_all_characters_words)
tuples_sent_words_emojis     = np.array(tuples_sent_words_emojis)
tuples_sent_characters_words = np.array(tuples_sent_characters_words)

# print (tuples_all_words_emojis.shape)
# plt.plot(histogram_of_messages)
# plt.plot(histogram_of_all_emojis)
plt.scatter(tuples_sent_words_emojis[:, 0], tuples_sent_words_emojis[:, 1],    alpha="0.1")
plt.scatter(tuples_all_words_emojis[:, 0],  tuples_all_words_emojis[:, 1], alpha="0.1")
plt.show()



