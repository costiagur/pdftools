import json
import zipfile
from io import BytesIO
from os import path, replace, unlink
from tempfile import NamedTemporaryFile

from PyPDF2 import PdfReader, PdfWriter

import common


def splitpdf(inipdffile,splitlist):
    
    #try:
        pdfReader = PdfReader(BytesIO(inipdffile))
    
        zipbite = NamedTemporaryFile(mode="w+b",delete=False)
        zipres = zipfile.ZipFile(zipbite.name, mode='a')

        intsplitlist = []

        for eachnum in splitlist:
            if eachnum != '':
                intsplitlist.append(int(eachnum))
            #
        #

        if intsplitlist[len(intsplitlist)-1] < len(pdfReader.pages):
            intsplitlist.append(len(pdfReader.pages))
            
        #
        elif intsplitlist[len(intsplitlist)-1] > len(pdfReader.pages):
            intsplitlist[len(intsplitlist)-1] = len(pdfReader.pages)
        #

        totalpages = len(pdfReader.pages)

        for i in range(0,len(intsplitlist),1):

            resfile = NamedTemporaryFile(mode="w+b",delete=False)
            pdfWriter = PdfWriter()

            ivalue = intsplitlist[i]
            
            prevvalue = intsplitlist[i-1] if i>0 else 0      

            if ivalue == 1 or ivalue-prevvalue == 1: #single page
                pdfWriter.add_page(pdfReader.pages[ivalue-1])
                pdfWriter.write(resfile)
                archname = "split_" + str(ivalue) + ".pdf"
            
            elif i==0:
                
                for j in range(0,min(ivalue,totalpages),1):
                    pdfWriter.add_page(pdfReader.pages[j])
                    pdfWriter.write(resfile)
                    archname = "split_" + str(min(ivalue,totalpages)) + ".pdf"
                #
            
            elif i>0 and i<len(intsplitlist)-1:
                
                for j in range(prevvalue,min(ivalue,totalpages),1):
                    pdfWriter.add_page(pdfReader.pages[j])
                    pdfWriter.write(resfile)
                    archname = "split_" + str(min(ivalue,totalpages)) + ".pdf"
                #

            elif i>0 and i==len(intsplitlist)-1: #last i

                for j in range(prevvalue,totalpages,1):
                    pdfWriter.add_page(pdfReader.pages[j])
                    pdfWriter.write(resfile)
                    archname = "split_" + str(totalpages) + ".pdf"
                #
            #

            resfile.close()
            zipres.write(resfile.name,arcname = archname)
            unlink(resfile.name)
        #

        zipres.close()
        zipbite.seek(0)
        zipbite.close()

        if path.getsize(zipbite.name) > 5000000:

            target = common.pointtodir(title='Select Folder to Save')
            replace(zipbite.name,target + r'/result.zip')
            resbytes = b'saved'


        else:
            res = open(zipbite.name,"rb")
            resbytes = res.read()
            res.close()
            unlink(zipbite.name)
        #

        return resbytes

    #except Exception as e:
        #common.errormsg(title=__name__,message=e)
        #replymsg = json.dumps(["Error",__name__+" -" + str(e)]).encode('UTF-8')
        #return replymsg
    #
#