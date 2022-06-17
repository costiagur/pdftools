from PyPDF2 import PdfFileMerger
from io import BytesIO

def mergepdfs(filesdict):

    merger = PdfFileMerger()
    targio = BytesIO()

    for key in filesdict.keys():

        merger.append(BytesIO(filesdict[key][1]))
    #
    merger.write(targio)
    merger.close()

    return targio.getvalue()
#