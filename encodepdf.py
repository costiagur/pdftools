from PyPDF2 import PdfFileReader, PdfFileWriter
from io import BytesIO
from os import unlink,path,replace
import common
from tempfile import NamedTemporaryFile


def encodepdf(password, endecrypt_sel, uploadpdfs):

    try:

        initialfile = BytesIO(uploadpdfs)
        resfile = NamedTemporaryFile(mode="w+b",delete=False,suffix=".pdf", prefix="result")

        pdfReader = PdfFileReader(initialfile)
        pdfWriter = PdfFileWriter()
        
        if endecrypt_sel == 'decrypt' and pdfReader.is_encrypted:
            pdfReader.decrypt(password)
        #    
        
        for i in range(0,pdfReader.numPages): 
            pdfWriter.addPage(pdfReader.getPage(i))
        #
        
        if endecrypt_sel == 'encrypt':
            pdfWriter.encrypt(password)
        #

        pdfWriter.write(resfile)

        initialfile.close()
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
