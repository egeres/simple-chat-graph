# simple-chat-graph
Small web application to display a graph with the message intensity of telegram chats.

![](https://github.com/egeres/simple-chat-graph/blob/master/others/screenshot_0.png)

## How to use :

### Step 0 : Export your Telegram chats to a JSON file.
Install the Telegram desktop app. Navigate to Settings > Advanced, then click "Export Telegram data". Disable all the options except for "Personal chats". At the bottom, select "Machine-readable JSON". You can change the download path to set the destination folder of the exported information. Whe you are ready, click "EXPORT" at the bottom. The process might take a few minutes to complete. Once it has finished, you will see a folder named "DataExport_<current date>" in the selected directory.

### Step 1 : Generate your chat files
You must have Python installed to complete the next step (any version greater than 2.7). Execute the generator_files.py script as shown :

```
cd repository_directory/test_multifiles
python generator_files.py ..DataExport_<current date>/result.json repository_directory/test_multifiles/files
```

This will generate a list of .json files at repository_directory/test_multifiles/files.

### Step 2 : Update the test_multifiles.html file.
Change the value of the variable filenames by the output of the python script : list_of_exported_files = [...]
