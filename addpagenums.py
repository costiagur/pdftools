from fpdf import FPDF
from PyPDF2 import PdfFileReader, PdfFileWriter
from io import BytesIO
from tempfile import NamedTemporaryFile
import common
from os import path, replace, unlink

def addpagenums(startpage, inipdffile):
 
    try:
        startpage = int(startpage)
 
        pdfReader = PdfFileReader(BytesIO(inipdffile))
        pdfWriter = PdfFileWriter()
        resfile= NamedTemporaryFile(mode="w+b",delete=False,suffix=".pdf", prefix="result")      

        infoobj = common.infopopup(common.root)

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

            infoobj.show(str(i+1))

            if currentpage.mediaBox.getHeight()<currentpage.mediaBox.getWidth():
                pdflass = myFPDF(orientation  = 'L')
            else:
                pdflass = myFPDF(orientation  = 'P')
            #

            pdflass.add_page()
            pdflass.footer()

            pagefile = NamedTemporaryFile(mode='w+b',suffix=".pdf", delete=False) 

            pdflass.output(name=pagefile.name, dest ='F')

            pagefile.seek(0)

            pdfReadnumfile = PdfFileReader(pagefile)
            numpage = pdfReadnumfile.getPage(0)
            numpage.compress_content_streams()
            currentpage.merge_page(numpage)
            currentpage.compress_content_streams()
            pdfWriter.addPage(currentpage)
            
            pdfWriter.write(resfile)

            pagefile.close()
            unlink(pagefile.name)
            
        #
        infoobj.close()

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









