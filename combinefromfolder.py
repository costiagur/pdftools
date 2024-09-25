import json
import tkinter
from os import path, replace, unlink, walk
from tempfile import NamedTemporaryFile
from tkinter import filedialog, messagebox

from PyPDF2 import PdfFileMerger


def combinefromfolder():

    try:
        root = tkinter.Tk()
        root.attributes("-topmost", 1)
        searchdir = filedialog.askdirectory(title='Select the Parent Directory')
        merger = PdfFileMerger()
        resfile = NamedTemporaryFile(mode="w+b",delete=False,suffix=".pdf", prefix="result")

        for upperdir, dirs, files in walk(top=searchdir, topdown=False):

            if files: #if list is not empty
                for eachfile in files:
                    if eachfile.find(".pdf") != -1 or eachfile.find(".PDF") != -1:
                        merger.append(upperdir + '/' + eachfile)
                    #
                #
            #
        #
        merger.write(resfile)
        merger.close()
        resfile.close()

        if path.getsize(resfile.name) > 5000000:

            target = filedialog.askdirectory(title='Select Folder to Save')
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

        return resbytes
    #

    except Exception as e:
        replymsg = json.dumps(["Error",__name__+" -" + str(e)]).encode('UTF-8')
        return replymsg
    #
#