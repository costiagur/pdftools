from PyPDF2 import PdfFileMerger
from io import BytesIO
from tempfile import NamedTemporaryFile
from os import unlink,path,replace
import tkinter
from tkinter import filedialog, messagebox

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
        messagebox.showerror(title="mergepdfs",message=e)
        root.destroy()
        root.mainloop()
   #
#