import json
import os
import urllib.request

import common


def downloadtika():

    try:
        currentfolder =  os.path.dirname(os.path.realpath(__file__))
        currentfolderlist = currentfolder.split("\\")
        upfolder = "\\".join(currentfolderlist[0:len(currentfolderlist)-1])

        res = 0

        if 'tikaserver' in os.listdir(upfolder): #or mypath.find('tikaserver') > -1:
            res = 1
        else:
            tikafolder = upfolder +'\\tikaserver\\'
            os.mkdir(tikafolder)
 
            common.infomsg(title="downloadtika",message="Tika is required. Downloading to application folder")

            jarstr = "http://search.maven.org/remotecontent?filepath=org/apache/tika/tika-server-standard/2.6.0/tika-server-standard-2.6.0.jar"
            md5str = "http://search.maven.org/remotecontent?filepath=org/apache/tika/tika-server-standard/2.6.0/tika-server-standard-2.6.0.jar.md5"

            urllib.request.urlretrieve(jarstr,tikafolder + "tika-server-standard-2.6.0.jar")
            urllib.request.urlretrieve(md5str,tikafolder + "tika-server-standard-2.6.0.jar.md5")
        
            if "tika-server-standard-2.6.0.jar" in os.listdir(tikafolder):
                res = 1
            else:
                raise FileNotFoundError("Tika download failed")
            #

            common.infomsg(title="downloadtika",message="Tika downloaded")

        #
            
        return res
    #

    except Exception as e:
        #common.errormsg(title=__name__,message=e)
        replymsg = json.dumps(["Error",__name__+" -" + str(e)]).encode('UTF-8')
        return replymsg

    #
#