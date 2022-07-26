from PyPDF2 import PdfFileReader, PdfFileWriter
from io import BytesIO
from os import unlink,path,replace
import tkinter
from tkinter import filedialog, messagebox
from tempfile import NamedTemporaryFile


def encodepdf(password, uploadpdfs):

    try:

        initialfile = BytesIO(uploadpdfs)
        resfile = NamedTemporaryFile(mode="w+b",delete=False,suffix=".pdf", prefix="result")

        pdfReader = PdfFileReader(initialfile)
        pdfWriter = PdfFileWriter()

        for i in range(0,pdfReader.numPages): 
            pdfWriter.addPage(pdfReader.getPage(i))
        #

        pdfWriter.encrypt(password)

        pdfWriter.write(resfile)

        initialfile.close()
        resfile.close()
        
        if path.getsize(resfile.name) > 5000000:

            root = tkinter.Tk()
            root.attributes("-topmost", 1)
            target = filedialog.askdirectory(title='Select Folder to Save')
            replace(resfile.name,target + r'/result.pdf')
            resbytes = b'saved'

            root.destroy()
            root.mainloop()

        else:
            res = open(resfile.name,"rb")
            resbytes = res.read()
            res.close()
            unlink(resfile.name)
        #

        return resbytes

    except Exception as e:
        root = tkinter.Tk()
        root.attributes("-topmost", 1)
        messagebox.showerror(title="encodepdf",message=e)
        root.destroy()
        root.mainloop()
    #

#