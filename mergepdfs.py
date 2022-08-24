from PyPDF2 import PdfFileMerger
from io import BytesIO
from tempfile import NamedTemporaryFile
from os import unlink,path,replace
import common

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

            target = common.pointtodir(title='Select Folder to Save')
            replace(resfile.name,target + r'/result.pdf')
            resbytes = b'saved'


        else:
            res = open(resfile.name,"rb")
            resbytes = res.read()
            res.close()
            unlink(resfile.name)
        #

        return resbytes

    except Exception as e:
        common.errormsg(title=__name__,message=e)
        return b'Error: ' + str(e).encode()
   #
#