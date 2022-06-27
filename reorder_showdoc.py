from pdf2image import convert_from_bytes
import tempfile
import base64
from PIL import Image
import json
from io import BytesIO

def reorder_showdoc(uploadfile): #images to display in JS

    draftdir = tempfile.TemporaryDirectory()
    
    images = convert_from_bytes(uploadfile, dpi=200, output_folder= draftdir.name)

    resimg = []

    for img in images:
        imgIO = BytesIO()
        img.save(imgIO,format="jpeg")
        bstr = b'data:image/jpeg;base64,' + base64.b64encode(imgIO.getvalue())

        resimg.append(bstr.decode())
    #
    
    draftdir.cleanup()

    return json.dumps(resimg)
#