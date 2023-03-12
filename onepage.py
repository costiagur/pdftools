from PIL import Image
from PIL import ImageEnhance
import base64
from pdf2image import convert_from_bytes
import tempfile
from io import BytesIO

def onepage(scanfile):

    demofile = BytesIO()
    draftdir = tempfile.TemporaryDirectory()
    
    images = convert_from_bytes(scanfile, dpi=400, output_folder= draftdir.name, single_file=True)

    images[0].save(demofile, format = "PNG")
    
    demofile.seek(0)
    
    resimg = base64.b64encode(demofile.read())

    resimg = b'data:image/png;base64,' + resimg

    draftdir.cleanup()

    return resimg.decode()     
#