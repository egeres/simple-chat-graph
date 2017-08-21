from os import listdir
from os.path import isfile, join


path = "../chats"

def read_beginning():
    pass

onlyfiles = [f for f in listdir(path) if isfile(join(path, f))]
print "created the list of files..."

num_today = read_beginning(day, month, year) #45343537 por ejemplo

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

    for j in content:
        numeric_day_0 =       read_beginning(day, month,year) #45343000 quizás
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
