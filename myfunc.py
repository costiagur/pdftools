import base64
import json

import common
from addblankpage import addblankpage
from addpagenums import addpagenums
from combinefromfolder import combinefromfolder
from do_ocr import do_ocr
from downloadpoppler import downloadpoppler
from downloadtika import downloadtika
from encodepdf import encodepdf
from mergepdfs import mergepdfs
from onepage import onepage
from renamebyregex import renamebyregex
from renameregtxt import renameregtxt
from reorder_commit import reorder_commit
from reorder_showdoc import reorder_showdoc
from splitbyn import splitbyn
from splitpdf import splitpdf
from watermark import watermark

CODESTR = "mypypdftools"

def myfunc(queryobj):   

    try:
        replymsg = ''
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
            file64enc = base64.b64encode(encodepdf(postdict["password"],postdict["endecrypt_sel"],filesdict["uploadpdf"][1]))
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
        elif postdict["request"] == "splitbyn":
            file64enc = base64.b64encode(splitbyn(filesdict["uploadpdf"][1],postdict["splitn"]))
            file64dec = file64enc.decode()
            replymsg = json.dumps(["result.zip",file64dec]).encode('UTF-8')
        
        #
        elif postdict["request"] == "reorder_showdoc":
            if downloadpoppler() == 1:
                replymsg = reorder_showdoc(filesdict["uploadpdf"][1]).encode('UTF-8')
            #
        #
        elif postdict["request"] == "reorder_commit":
            placesdict = json.loads(postdict["placesobj"])

            file64enc = base64.b64encode(reorder_commit(filesdict["uploadpdf"][1],placesdict))
            file64dec = file64enc.decode()
            replymsg = json.dumps(["result.pdf",file64dec]).encode('UTF-8')
        #

        elif postdict["request"] == "watermark":
            file64enc = base64.b64encode(watermark(filesdict))
            file64dec = file64enc.decode()
            replymsg = json.dumps(["result.pdf",file64dec]).encode('UTF-8')
        #

        elif postdict["request"] == "addblankpage":
            file64enc = base64.b64encode(addblankpage(filesdict["uploadpdf"][1]))
            file64dec = file64enc.decode()
            replymsg = json.dumps(["result.pdf",file64dec]).encode('UTF-8')
        #


        elif postdict["request"] == "renamebyregex":
            if downloadtika() == 1:
                file64enc = base64.b64encode(renamebyregex(filesdict,postdict["regexstr"]))
                file64dec = file64enc.decode()
                replymsg = json.dumps(["result.zip",file64dec]).encode('UTF-8')
            #
        #

        elif postdict["request"] == "renameregtxt":
            if downloadtika() == 1:
                file64enc = base64.b64encode(renameregtxt(filesdict["test"][1]))
                file64dec = file64enc.decode()
                replymsg = json.dumps(["result.txt",file64dec]).encode('UTF-8')
            #
        #

        elif postdict["request"] == "firstpage":
            replymsg = json.dumps(onepage(filesdict["pdffile"][1])).encode('UTF-8')
        #

        elif postdict["request"] == "do_ocr":
            file64enc = base64.b64encode(do_ocr(filesdict["pdffile"][1],postdict["onepage"],postdict["rollangle"],postdict["brightness"]))
            file64dec = file64enc.decode()
            replymsg = json.dumps(["result.txt",file64dec]).encode('UTF-8')
        #

        # reply message should be encoded to be sent back to browser ----------------------------------------------
        # encoding to base64 is used to send ansi hebrew data. it is decoded to become string and put into json.
        # json is encoded to be sent to browser.

        return replymsg
    #

    except Exception as e:
        #common.errormsg(title=__name__,message=e)
        replymsg = json.dumps(["Error",__name__+" -" + str(e)]).encode('UTF-8')
        return replymsg
    #
#
