import json
import tkinter
from io import BytesIO
from tkinter import messagebox

from PyPDF2 import PdfReader, PdfWriter


def reorder_commit(uploadfile,placesdict):
    

    initialfile = BytesIO(uploadfile)
    targetfile = BytesIO()

    pdfReader = PdfReader(initialfile)
    pdfWriter = PdfWriter()

    i = 0

    for key in placesdict:
        if placesdict[key][2] == 1: #page should be deleted
            pass
        else:
            page = pdfReader.pages[int(placesdict[key][0])]
            page.compress_content_streams()
            pdfWriter.add_page(page)
                
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

    #
#