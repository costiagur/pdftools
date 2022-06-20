import base64
import json
from combinefromfolder import combinefromfolder
from addpagenums import addpagenums
from encodepdf import encodepdf
from mergepdfs import mergepdfs
from splitpdf import splitpdf

def myfunc(queryobj):

    postdict = queryobj._POST()
    filesdict = queryobj._FILES()

    print("POST = " + str(postdict) + "\n")
    #print("FILES = " + str(filesdict) + "\n")

    file64enc = b''

    if postdict["request"] == "combinefromfolder":
        file64enc = base64.b64encode(combinefromfolder())
        file64dec = file64enc.decode()
        replymsg = json.dumps(["result.pdf",file64dec]).encode('UTF-8')

    #
    elif postdict["request"] == "addpagenums":
        file64enc = base64.b64encode(addpagenums(postdict["startingpage"],filesdict["uploadpdfs"][1]))
        file64dec = file64enc.decode()
        replymsg = json.dumps(["result.pdf",file64dec]).encode('UTF-8')

    #
    elif postdict["request"] == "encodepdf":
        file64enc = base64.b64encode(encodepdf(postdict["password"],filesdict["uploadpdf"][1]))
        file64dec = file64enc.decode()
        replymsg = json.dumps(["result.pdf",file64dec]).encode('UTF-8')

    #
    elif postdict["request"] == "mergepdfs":
        file64enc = base64.b64encode(mergepdfs(filesdict))
        file64dec = file64enc.decode()
        replymsg = json.dumps(["result.pdf",file64dec]).encode('UTF-8')

    #
    elif postdict["request"] == "splitpdf":
        splitlist = json.loads(postdict["splitlist"])

        file64enc = base64.b64encode(splitpdf(filesdict["uploadpdf"][1],splitlist))
        file64dec = file64enc.decode()
        replymsg = json.dumps(["result.zip",file64dec]).encode('UTF-8')

    #

    # reply message should be encoded to be sent back to browser ----------------------------------------------
    # encoding to base64 is used to send ansi hebrew data. it is decoded to become string and put into json.
    # json is encoded to be sent to browser.

  
    return replymsg
#