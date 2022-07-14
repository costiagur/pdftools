from PyPDF2 import PdfFileMerger
from io import BytesIO
from tempfile import NamedTemporaryFile
from os import unlink,path,replace
import tkinter
from tkinter import filedialog
import logging

logger = logging.getLogger('pdftoolslog.mergepdfs')

def mergepdfs(filesdict):

    try:
        merger = PdfFileMerger()
        resfile = NamedTemporaryFile(mode="w+b",delete=False,suffix=".pdf", prefix="result")

        for key in filesdict.keys():

            merger.append(BytesIO(filesdict[key][1]))
        #

        merger.write(resfile)
        merger.close()
        resfile.close()

        #print(path.getsize(resfile.name))

        if path.getsize(resfile.name) > 5000000:

            root = tkinter.Tk()

            target = filedialog.askdirectory(title='Select Target Directory')
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
        tkinter.messagebox.showerror(title="mergepdfs",message=e)
        root.destroy()
        root.mainloop()

        logger.error(e)
    #
#