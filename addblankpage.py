import json
from io import BytesIO

from PyPDF2 import PdfReader, PdfWriter


def addblankpage(uploadfile):
    
    #try:

        initialfile = BytesIO(uploadfile)
        targetfile = BytesIO()

        pdfReader = PdfReader(initialfile)
        pdfWriter = PdfWriter()

        for i, eachpage in enumerate(pdfReader.pages):
                pdfWriter.add_page(eachpage)
        #

        newpage = pdfReader.pages[i-1].create_blank_page(pdfReader)

        pdfWriter.add_page(newpage)

        pdfWriter.write(targetfile)

        initialfile.close()
        
        targetfile.seek(0)

        resfiledata = targetfile.read()

        targetfile.close()

        return resfiledata

    #except Exception as e:
    #    replymsg = json.dumps(["Error",__name__+" -" + str(e)]).encode('UTF-8')
    #    return replymsg
    
#