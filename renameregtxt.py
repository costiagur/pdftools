import json
from io import BytesIO
from os import environ

import tika
from PyPDF2 import PdfReader
from tika import parser

import common


def renameregtxt(filedata):

    try:
        environ["TIKA_SERVER_JAR"] = "file://tikaserver/tika-server.jar"
        reader = parser.from_buffer(BytesIO(filedata),xmlContent=True)
            
        resbytes = reader["content"].encode()

        return resbytes
    #
    except Exception as e:
        #common.errormsg(title=__name__,message=e)
        replymsg = json.dumps(["Error",__name__+" -" + str(e)]).encode('UTF-8')
        return replymsg
    #
#
