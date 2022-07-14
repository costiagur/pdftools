from PyPDF2 import PdfFileReader, PdfFileWriter
from io import BytesIO
import logging
import tkinter

logger = logging.getLogger('pdftoolslog.reorder_commit')

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
        root = tkinter.Tk()
        tkinter.messagebox.showerror(title="reorder_commit",message=e)
        root.destroy()
        root.mainloop()
       
        logger.error(e)
    #
   
#    