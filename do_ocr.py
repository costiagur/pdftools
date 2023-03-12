from PIL import Image
from PIL import ImageEnhance
import pytesseract
import tempfile
from pdf2image import convert_from_bytes

def do_ocr (scanfile,onepage=True,rollangle="0", brightness="1.0", langset='heb'):

    brightness = float(brightness)
    rollangle = int(rollangle)

    draftdir = tempfile.TemporaryDirectory()

    if onepage == 'true':
        onepage = True
    elif onepage == 'false':
        onepage = False
    #

    images = convert_from_bytes(scanfile, dpi=400, output_folder= draftdir.name, single_file=onepage)


    addlang = ''

    if langset != '' and langset.find('+',0,1) == -1: #prevent state of +'' or ++'...'
        addlang = '+' + langset
            
    elif langset != '':
        addlang = langset
    #

    totalstr= ""
    i= 0

    for eachimg in images:
        if rollangle != 0:
            eachimg = eachimg.rotate(rollangle)
        #

        if brightness < 0.0 or brightness == 1.0:
            pass
        else:
            eachimg = ImageEnhance.Brightness(eachimg).enhance(brightness)
        #

        eachimg = ImageEnhance.Color(eachimg).enhance(0.0) #turn black and white for OCR

        ocr_str = pytesseract.image_to_string(eachimg, lang='eng'+addlang, config='--textord_tablefind_recognize_tables')
        
        print(ocr_str)

        i = i + 1

        totalstr = totalstr + ocr_str + "\n ----------------- page" + str(i) + "----------------"
    #

    print(totalstr)
  
    return totalstr.encode()
#
