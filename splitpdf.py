from PyPDF2 import PdfFileReader, PdfFileWriter
from io import BytesIO
from tempfile import NamedTemporaryFile
from os import unlink, system
import zipfile
import logging
import tkinter
from tkinter import filedialog

logger = logging.getLogger('pdftoolslog.splitpdf')

def splitpdf(inipdffile,splitlist):
    
    try:
        pdfReader = PdfFileReader(BytesIO(inipdffile))
    
        zipbite = BytesIO()
        zipres = zipfile.ZipFile(zipbite, mode='a')

        intsplitlist = []

        for eachnum in splitlist:
            if eachnum != '':
                intsplitlist.append(int(eachnum))
            #
        #

        if intsplitlist[len(intsplitlist)-1] < len(pdfReader.pages):
            intsplitlist.append(len(pdfReader.pages))
            
        #
        elif intsplitlist[len(intsplitlist)-1] > len(pdfReader.pages):
            intsplitlist[len(intsplitlist)-1] = len(pdfReader.pages)
        #

        totalpages = len(pdfReader.pages)

        for i in range(0,len(intsplitlist),1):

            resfile = NamedTemporaryFile(mode="w+b",delete=False)
            pdfWriter = PdfFileWriter()

            ivalue = intsplitlist[i]
            
            prevvalue = intsplitlist[i-1] if i>0 else 0      

            if ivalue == 1 or ivalue-prevvalue == 1: #single page
                pdfWriter.addPage(pdfReader.pages[ivalue-1])
                pdfWriter.write(resfile)
                archname = "split_" + str(ivalue) + ".pdf"
            
            elif i==0:
                
                for j in range(0,min(ivalue,totalpages),1):
                    pdfWriter.addPage(pdfReader.pages[j])
                    pdfWriter.write(resfile)
                    archname = "split_" + str(min(ivalue,totalpages)) + ".pdf"
                #
            
            elif i>0 and i<len(intsplitlist)-1:
                
                for j in range(prevvalue,min(ivalue,totalpages),1):
                    pdfWriter.addPage(pdfReader.pages[j])
                    pdfWriter.write(resfile)
                    archname = "split_" + str(min(ivalue,totalpages)) + ".pdf"
                #

            elif i>0 and i==len(intsplitlist)-1: #last i

                for j in range(prevvalue,totalpages,1):
                    pdfWriter.addPage(pdfReader.pages[j])
                    pdfWriter.write(resfile)
                    archname = "split_" + str(totalpages) + ".pdf"
                #
            #

            resfile.close()
            zipres.write(resfile.name,arcname = archname)
            unlink(resfile.name)
        #

        zipres.close()
        

        if zipbite.getbuffer().nbytes > 5000000:
            root = tkinter.Tk()
            target = filedialog.askdirectory(title='Select Target Directory')
            with open(target + r'/result.zip','wb') as zf:
                zf.write(zipbite.getbuffer())  
            #  
            res = b'saved'
            root.destroy()
            root.mainloop()
        else:
            zipbite.seek(0)
            res = zipbite.read()
        #

        zipbite.close()

        return res

    except Exception as e:
        root = tkinter.Tk()
        tkinter.messagebox.showerror(title="splitpdf",message=e)
        root.destroy()
        root.mainloop()
        
        logger.error(e)
    #
#