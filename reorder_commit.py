import json
import tkinter
from io import BytesIO
from tkinter import messagebox

from PyPDF2 import PdfFileReader, PdfFileWriter


def reorder_commit(uploadfile,placesdict):
    
    try:

        initialfile = BytesIO(uploadfile)
        targetfile = BytesIO()

        pdfReader = PdfFileReader(initialfile)
        pdfWriter = PdfFileWriter()

        i = 0

        for key in placesdict:
            if placesdict[key][2] == 1: #page should be deleted
                pass
            else:
                pdfWriter.addPage(pdfReader.getPage(int(placesdict[key][0])))
                
                if placesdict[key][1] != '0': #page should be rotated
                    pdfWriter.pages[i].rotate(int(placesdict[key][1]))
                #
                i = i+1
            #
        #
        
        pdfWriter.write(targetfile)

        initialfile.close()
        
        targetfile.seek(0)

        resfiledata = targetfile.read()

        targetfile.close()

        return resfiledata

    except Exception as e:
        replymsg = json.dumps(["Error",__name__+" -" + str(e)]).encode('UTF-8')
        return replymsg
    #
#