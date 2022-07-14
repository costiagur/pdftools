import os
import urllib.request
import zipfile
from tempfile import NamedTemporaryFile
import logging
import tkinter

logger = logging.getLogger('pdftoolslog.downloadpoppler')

def downloadpoppler():

    try:
        #mypath = os.environ['PATH']
        currentfolder =  os.path.dirname(os.path.realpath(__file__))
        
        #print('poppler' in os.listdir(currentfolder))

        res = 0

        if 'poppler' in os.listdir(currentfolder): #or mypath.find('poppler') > -1:
            res = 1
        else:   
            with urllib.request.urlopen("https://github.com/oschwartz10612/poppler-windows/releases/download/v22.04.0-0/Release-22.04.0-0.zip") as popurl:
                with NamedTemporaryFile(mode="wb",suffix=".zip",delete=False) as tf:
                    tf.write(popurl.read())
                    tf.close()
                    popzip = zipfile.ZipFile(tf.name, mode='r')
                    popzip.extractall(currentfolder +'\\poppler\\')
                    popzip.close()
                    os.unlink(tf.name)
                    res = 1
                #
            #
        #
            
        return res
    #

    except Exception as e:

        root = tkinter.Tk()
        tkinter.messagebox.showerror(title="downloadpoppler",message=e)
        root.destroy()
        root.mainloop()

        logger.error(e)
    #
#

#print(downloadpoppler())