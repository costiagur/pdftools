from io import BytesIO
from tempfile import NamedTemporaryFile
from os import unlink,replace, path
import common
import re
from zipfile import ZipFile
#from tika import parser
#from os import environ
import fitz


def renamebyregex(filesdict,regexstr):

    try:

        regcomp = re.compile(regexstr,re.MULTILINE)
        mainzipf = NamedTemporaryFile(mode="w+b",delete=False)

#        environ["TIKA_SERVER_JAR"] = "file://tikaserver/tika-server.jar"

        with ZipFile(mainzipf.name,'a') as myzip:

            for key in filesdict.keys():
            
                #reader = parser.from_buffer(BytesIO(filesdict[key][1]),xmlContent=True)

                doc = fitz.Document(stream=BytesIO(filesdict[key][1]))
                text = ""
                
                for page in doc:
                    text += page.get_text()
                #

                #relist = regcomp.findall(reader["content"])
                relist = regcomp.findall(text)
                
                newname = ""

                if len(relist) == 0:
                    newname = key + ".pdf"
                else:
                    newname = relist[0] + ".pdf"
                #

                pdffile = NamedTemporaryFile(mode="w+b",delete=False)
                pdffile.write(BytesIO(filesdict[key][1]).getbuffer())
                pdffile.seek(0)
                pdffile.close()

                myzip.write(pdffile.name, arcname = newname)

                unlink(pdffile.name)
            #
        #
        mainzipf.seek(0)
        mainzipf.close()

        if path.getsize(mainzipf.name) > 5000000:

            target = common.pointtodir(title='Select Folder to Save')
            replace(mainzipf.name,target + r'/result.zip')
            resbytes = b'saved'


        else:
            res = open(mainzipf.name,"rb")
            resbytes = res.read()
            res.close()
            unlink(mainzipf.name)
        #

        return resbytes
    #

    except Exception as e:
        common.errormsg(title=__name__,message=e)
        return b'Error: ' + str(e).encode()
   #
#