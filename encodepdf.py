import json
from io import BytesIO
from os import path, replace, unlink
from tempfile import NamedTemporaryFile

from PyPDF2 import PdfReader, PdfWriter

import common


def encodepdf(password, endecrypt_sel, uploadpdfs):

        initialfile = BytesIO(uploadpdfs)
        resfile = NamedTemporaryFile(mode="w+b",delete=False,suffix=".pdf", prefix="result")

        pdfReader = PdfReader(initialfile)
        pdfWriter = PdfWriter()
        
        if endecrypt_sel == 'decrypt' and pdfReader.is_encrypted:
            pdfReader.decrypt(password)
        #    
        
        for i in range(0,pdfReader.numPages): 
            pdfWriter.add_page(pdfReader.pages[i])
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


#
