from PyPDF2 import PdfFileReader, PdfFileWriter
from io import BytesIO
import logging
import tkinter

logger = logging.getLogger('pdftoolslog.encodepdf')

def encodepdf(password, uploadpdfs):

    try:

        initialfile = BytesIO(uploadpdfs)
        targetfile = BytesIO()

        pdfReader = PdfFileReader(initialfile)
        pdfWriter = PdfFileWriter()

        for i in range(0,pdfReader.numPages): 
            pdfWriter.addPage(pdfReader.getPage(i))
        #

        pdfWriter.encrypt(password)

        pdfWriter.write(targetfile)

        initialfile.close()
        
        targetfile.seek(0)

        resfiledata = targetfile.read()

        targetfile.close()

        return resfiledata

    except Exception as e:

        root = tkinter.Tk()
        tkinter.messagebox.showerror(title="encodepdf",message=e)
        root.destroy()
        root.mainloop()

        logger.error(e)
    #

#