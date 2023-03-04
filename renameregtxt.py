from PyPDF2 import PdfFileReader 
from io import BytesIO
import common
import tika
from tika import parser
from os import environ

def renameregtxt(filedata):

    try:
        environ["TIKA_SERVER_JAR"] = "file://tikaserver/tika-server.jar"
        reader = parser.from_buffer(BytesIO(filedata),xmlContent=True)
            
        resbytes = reader["content"].encode()

        return resbytes
    #
    except Exception as e:
        common.errormsg(title=__name__,message=e)
        return b'Error: ' + str(e).encode()
   #
#
