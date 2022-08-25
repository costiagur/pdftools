import os
import urllib.request
import zipfile
from tempfile import NamedTemporaryFile
import common

def downloadpoppler():

    try:
        #mypath = os.environ['PATH']
        currentfolder =  os.path.dirname(os.path.realpath(__file__))
        currentfolderlist = currentfolder.split("\\")
        upfolder = "\\".join(currentfolderlist[0:len(currentfolderlist)-1])

        res = 0

        if 'poppler' in os.listdir(upfolder): #or mypath.find('poppler') > -1:
            res = 1
        else:
            poplerfolder = upfolder +'\\poppler\\'
 
            common.infomsg(title="downloadpoppler",message="Poppler required. Downloading to application folder")

            with urllib.request.urlopen("https://github.com/oschwartz10612/poppler-windows/releases/download/v22.04.0-0/Release-22.04.0-0.zip") as popurl:
                with NamedTemporaryFile(mode="wb",suffix=".zip",delete=False) as tf:
                    tf.write(popurl.read())
                    tf.close()
                    popzip = zipfile.ZipFile(tf.name, mode='r')
                    popzip.extractall(poplerfolder)
                    popzip.close()
                    os.unlink(tf.name)
                    
                    poppath = poplerfolder + os.listdir(poplerfolder)[0] + "\\Library\\bin"
                    if os.path.isdir(poppath):
                        res = 1
                    else:
                        raise FileNotFoundError("Poppler download failed")
                    #
                #
            #

            common.infomsg(title="downloadpoppler",message="Poppler downloaded")

        #
            
        return res
    #

    except Exception as e:
        common.errormsg(title=__name__,message=e)
        return 0

    #
#