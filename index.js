const { fromPath } = require('pdf2pic')
const path = require('path')
const fs = require('fs')
const { PDFDocument } = require('pdf-lib')

// Path to your PDF file
const fileName = 'sample.pdf' //replace with the name of your PDF
const pdfFilePath = path.join(__dirname, 'uploads', fileName)
const outputDir = path.join(__dirname, 'output')

// Function to get total pages from PDF
async function getTotalPages(pdfPath) {
  const pdfBuffer = fs.readFileSync(pdfPath)
  const pdfDoc = await PDFDocument.load(pdfBuffer)
  return pdfDoc.getPageCount()
}

// Function to convert PDF to images
async function convertPdfToJpeg() {
  try {
    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir)
    }

    console.log('Fetching total pages...')
    const totalPages = await getTotalPages(pdfFilePath)
    console.log(`Total Pages: ${totalPages}`)

    // Set up pdf2pic options
    // Set up options for pdf2pic
    const options = {
      density: 150, // DPI (Lower to 150 for faster conversion)
      saveFilename: 'page',
      savePath: outputDir,
      format: 'png', // Output format
      width: 1920, // Optional width
      height: 1080 // Optional height
    }

    const storeAsImage = fromPath(pdfFilePath, options)

    console.log('Starting conversion...')

    for (let i = 1; i <= totalPages; i++) {
      const result = await storeAsImage(i)
      console.log(`Page ${i} converted: ${result.path}`)
    }

    console.log('All pages converted successfully!')
  } catch (error) {
    console.error('Error processing the PDF:', error)
  }
}

// Start the conversion
convertPdfToJpeg()
