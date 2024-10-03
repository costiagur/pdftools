import json
from io import BytesIO
from os import path, replace, unlink
from tempfile import NamedTemporaryFile

from PyPDF2 import PdfFileMerger

import common


def mergepdfs(filesdict):

    try:
        merger = PdfFileMerger()
        resfile1 = NamedTemporaryFile(mode="w+b",delete=False,suffix=".pdf", prefix="result")

        for key in filesdict.keys():

            merger.append(BytesIO(filesdict[key][1]))
        #

        merger.write(resfile1)
        merger.close()
        resfile1.close()

        merger.close()
        resfile1.close()

        if path.getsize(resfile1.name) > 5000000:

            target = common.pointtodir(title='Select Folder to Save')
            replace(resfile1.name,target + r'/result.pdf')
            resbytes = b'saved'


        else:
            res = open(resfile1.name,"rb")
            resbytes = res.read()
            res.close()
            unlink(resfile1.name)
        #

        return resbytes

    except Exception as e:
        #common.errormsg(title=__name__,message=e)
        replymsg = json.dumps(["Error",__name__+" -" + str(e)]).encode('UTF-8')
        return replymsg
    #
#