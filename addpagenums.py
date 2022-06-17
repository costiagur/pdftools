from fpdf import FPDF
from PyPDF2 import PdfFileReader, PdfFileWriter
from io import BytesIO
from tempfile import NamedTemporaryFile
from os import unlink #, system

def addpagenums(startpage, inipdffile):

    startpage = int(startpage)

    pdfReader = PdfFileReader(BytesIO(inipdffile))
    pdfWriter = PdfFileWriter()
    resfile= BytesIO()

    for i in range(0,pdfReader.numPages):   

        currentpage = pdfReader.getPage(i)
        currentpage.compress_content_streams()

        class myFPDF(FPDF):
            def footer(self):
                self.set_y(-10)
                self.set_font('Arial', '', 8)
                self.set_text_color(128)
                self.cell(w=0,txt=str(i+1), align='C')
            #
        #

        if currentpage.mediaBox.getHeight()<currentpage.mediaBox.getWidth():
            pdflass = myFPDF(orientation  = 'L')
        else:
            pdflass = myFPDF(orientation  = 'P')
        #

        pdflass.add_page()
        pdflass.footer()

        pagefile = NamedTemporaryFile(mode='w+b',suffix=".pdf", delete=False) 

        pdflass.output(name=pagefile.name, dest ='F')

        #pagefile.close()
        pagefile.seek(0)
        #print(pagefile.read())
        #system(pagefile.name)

        pdfReadnumfile = PdfFileReader(pagefile)
        #pdfReadnumfile = PdfFileReader(open(pagefile.name, "rb"))
        numpage = pdfReadnumfile.getPage(0)
        numpage.compress_content_streams()
        currentpage.merge_page(numpage)
        currentpage.compress_content_streams()
        pdfWriter.addPage(currentpage)
        pdfWriter.write(resfile)
 
        pagefile.close()
        unlink(pagefile.name)
    #
    
    resfile.seek(0)

    resfiledata = resfile.read()

    resfile.close()
    
    return resfiledata
#









