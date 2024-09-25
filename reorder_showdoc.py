import base64
import json
import os
import tempfile
from io import BytesIO

from pdf2image import convert_from_bytes
from PIL import Image


def reorder_showdoc(uploadfile): #images to display in JS

    try:
        draftdir = tempfile.TemporaryDirectory()
        
        currentfolder = os.path.dirname(os.path.realpath(__file__))

        currentfolderlist = currentfolder.split("\\")
        upfolder = "\\".join(currentfolderlist[0:len(currentfolderlist)-1])

        poppath = upfolder + '\\poppler\\' + os.listdir(upfolder +'\\poppler\\')[0] + "\\Library\\bin"

        images = convert_from_bytes(uploadfile, dpi=200, output_folder= draftdir.name, poppler_path=poppath)

        resimg = []

        for img in images:
            imgIO = BytesIO()
            img.save(imgIO,format="jpeg")
            bstr = b'data:image/jpeg;base64,' + base64.b64encode(imgIO.getvalue())

            resimg.append(bstr.decode())
        #
        
        draftdir.cleanup()

        return json.dumps(resimg)

    except Exception as e:
        replymsg = json.dumps(["Error",__name__+"-" + str(e)]).encode('UTF-8')
        return replymsg
    #
#