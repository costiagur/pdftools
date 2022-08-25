from pdf2image import convert_from_bytes
import tempfile
import base64
from PIL import Image
import json
from io import BytesIO
import os
from tkinter import messagebox
import tkinter


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
        root = tkinter.Tk()
        root.attributes("-topmost", 1)
        messagebox.showerror(title="reorder_showdoc",message=e)
        root.destroy()
        root.mainloop()
    #
       
#