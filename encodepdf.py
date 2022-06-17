from PyPDF2 import PdfFileReader, PdfFileWriter
from io import BytesIO

def encodepdf(password, uploadpdfs):
    
    initialfile = BytesIO(uploadpdfs)
    targetfile = BytesIO()

    pdfReader = PdfFileReader(initialfile)
    pdfWriter = PdfFileWriter()

    for i in range(0,pdfReader.numPages): 
        pdfWriter.addPage(pdfReader.getPage(i))
    #

    pdfWriter.encrypt(password)

    pdfWriter.write(targetfile)

    initialfile.close()
    
    targetfile.seek(0)

    resfiledata = targetfile.read()

    targetfile.close()
    
    return resfiledata
#