import os
import tkinter
from tkinter import filedialog
from PyPDF2 import PdfFileMerger
from io import BytesIO

def combinefromfolder():

    root = tkinter.Tk()
    searchdir = filedialog.askdirectory(title='Select the Parent Directory')
    merger = PdfFileMerger()
    targio = BytesIO()

    print("searchdir: " + searchdir)

    for upperdir, dirs, files in os.walk(top=searchdir, topdown=False):
        print("files: " + str(files))
        print("dirs: " + str(dirs))
        print("upperdir: " + str(upperdir))

        if files: #if list is not empty
            if files[0].find(".pdf") != -1 or files[0].find(".PDF") != -1:
                merger.append(upperdir + '/' + files[0])
            #
        #
    #
    merger.write(targio)
    merger.close()

    root.destroy()

    root.mainloop()

    return targio.getvalue()
#