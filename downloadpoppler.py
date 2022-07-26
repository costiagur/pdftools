import os
import urllib.request
import zipfile
from tempfile import NamedTemporaryFile
from tkinter import messagebox
import tkinter

def downloadpoppler():

    try:
        #mypath = os.environ['PATH']
        currentfolder =  os.path.dirname(os.path.realpath(__file__))
        
        res = 0

        if 'poppler' in os.listdir(currentfolder): #or mypath.find('poppler') > -1:
            res = 1
        else:
            root = tkinter.Tk()
            root.attributes("-topmost", 1)
            messagebox.showinfo(title="downloadpoppler",message="Poppler required. Downloading to application folder")
            root.withdraw()

            with urllib.request.urlopen("https://github.com/oschwartz10612/poppler-windows/releases/download/v22.04.0-0/Release-22.04.0-0.zip") as popurl:
                with NamedTemporaryFile(mode="wb",suffix=".zip",delete=False) as tf:
                    tf.write(popurl.read())
                    tf.close()
                    popzip = zipfile.ZipFile(tf.name, mode='r')
                    popzip.extractall(currentfolder +'\\poppler\\')
                    popzip.close()
                    os.unlink(tf.name)
                    
                    poppath = currentfolder + '\\poppler\\' + os.listdir(currentfolder +'\\poppler\\')[0] + "\\Library\\bin"
                    if os.path.isdir(poppath):
                        res = 1
                    else:
                        raise FileNotFoundError("Poppler download failed")
                    #
                #
            #
            root.deiconify()
            messagebox.showinfo(title="downloadpoppler",message="Poppler downloaded")
            root.destroy()
            root.mainloop()

        #
            
        return res
    #

    except Exception as e:
        root = tkinter.Tk()
        root.attributes("-topmost", 1)
        messagebox.showerror(title="downloadpoppler",message=e)
        root.destroy()
        root.mainloop()

    #
#