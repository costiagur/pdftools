# pdftools
Tools to manipulate pdf files:
  1. Encode/Decode pdf file
  2. Merge several pdf files or merge pdf files from several folders - Ordinary merging of files or in case you've got several subfolders, each holding a pdf file and you want to merge them into one pdf file.
  3. Split pdf file - split after some specific pages or every X pages.
  4. Add page numbers to pdf file - Suppose you've got a pdf file without page numbers, probably a result of merging several files together. You want to add page numbers.
  5. Add watermark to pdf file - suppose you want to add "DRAFT" text behind the original text. Create a pdf file with such a text ("DRAFT") that will serve as watermark. Then this function may combine them into one. 
  6. Reorder pages in pdf file: delete pages, rotate, reorder
  7. Rename pdf files by regular expression - Suppose you've got several pdf files (like invoices) named by some arbitary names. You want to rename them based on some text inside these files (suppose invoice number). This function may do it if you can distinguish your text using regular expression. In addition you can simply get text of one pdf file, by clicking Test button. Uses TIKA. Requires Java.
  8. OCR pdf file - Try conversion of image pdf (e.g. scanned document) into text. Uses Tesseract-OCR, which should be installed first.
