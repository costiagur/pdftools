import tkinter
from tkinter import filedialog
from PyPDF2 import PdfFileMerger
from tempfile import NamedTemporaryFile
from os import unlink,path,replace,walk
import logging

logger = logging.getLogger('pdftoolslog.combinefromfolder')

def combinefromfolder():

    try:
        root = tkinter.Tk()
        searchdir = filedialog.askdirectory(title='Select the Parent Directory')
        merger = PdfFileMerger()
        resfile = NamedTemporaryFile(mode="w+b",delete=False,suffix=".pdf", prefix="result")

        print("searchdir: " + searchdir)

        for upperdir, dirs, files in walk(top=searchdir, topdown=False):
            print("files: " + str(files))
            print("dirs: " + str(dirs))
            print("upperdir: " + str(upperdir))

            if files: #if list is not empty
                if files[0].find(".pdf") != -1 or files[0].find(".PDF") != -1:
                    merger.append(upperdir + '/' + files[0])
                #
            #
        #
        merger.write(resfile)
        merger.close()
        resfile.close()

        if path.getsize(resfile.name) > 5000000:

            target = filedialog.askdirectory(title='Select Target Directory')
            replace(resfile.name,target + r'/result.pdf')
            resbytes = b'saved'

        else:
            res = open(resfile.name,"rb")
            resbytes = res.read()
            res.close()
            unlink(resfile.name)
        #

        root.destroy()
        root.mainloop()

    except Exception as e:
        root = tkinter.Tk()
        tkinter.messagebox.showerror(title="combinefromfolder",message=e)
        root.destroy()
        root.mainloop()       
        
        logger.error(e)
    #

    finally:
        return resbytes
#