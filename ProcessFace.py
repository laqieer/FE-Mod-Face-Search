import os
import json
from PIL import Image

files = []

dirlist = ['face']

while len(dirlist) > 0:
    for (dirpath, dirnames, filenames) in os.walk(dirlist.pop()):
        dirlist.extend(dirnames)
        files.extend(map(lambda n: os.path.join(*n), zip([dirpath] * len(filenames), filenames)))

files = list(filter(lambda file: file.endswith('.png'), files))

for i, path in enumerate(files):
    with Image.open(path) as im:
        if im.width <= 64 or im.height <= 64:
            continue
        if im.width < 112 and im.height < 96:
            im.save('img/' + str(i) + '.png')
        if im.width == 128 and im.height == 112:
            imNew = Image.new('RGB', (96, 80))
            imNew.paste(im.crop((0, 0, 96, 80)))
            imNew.save('img/' + str(i) + '.png')
        if im.width == 160 and im.height == 160:
            imNew = Image.new('RGB', (128, 128))
            imNew.paste(im.crop((0, 0, 128, 128)))
            imNew.save('img/' + str(i) + '.png')

files_json = open("files.json", "w")
json.dump(files, files_json)
files_json.close()
