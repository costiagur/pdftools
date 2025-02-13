import json
from io import BytesIO
from os import path, replace, unlink
from tempfile import NamedTemporaryFile

from PyPDF2 import PdfReader, PdfWriter

import common


def watermark(filesdict):

    #try:
        resfile = NamedTemporaryFile(mode="w+b",delete=False,suffix=".pdf", prefix="result")

        cleanreader = PdfReader(BytesIO(filesdict['upload_waterclean'][1]))
        writer = PdfWriter()

        for eachpage in cleanreader.pages:
            mediabox = eachpage.mediabox

            # You need to load it again, as the last time it was overwritten
            waterreader = PdfReader(BytesIO(filesdict['upload_watermark'][1])).pages[0]

            waterreader.merge_page(eachpage)
            waterreader.mediabox = mediabox

            writer.add_page(waterreader)
        #

        writer.write(resfile)

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

    #except Exception as e:
        #common.errormsg(title=__name__,message=e)
        #replymsg = json.dumps(["Error",__name__+" -" + str(e)]).encode('UTF-8')
        #return replymsg
    #
#