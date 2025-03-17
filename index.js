const { fromPath } = require('pdf2pic')
const path = require('path')
const fs = require('fs')
const { PDFDocument } = require('pdf-lib')

// Path to your PDF file
const pdfFilePath = path.join(__dirname, 'uploads', 'assetX_march_2025.pdf')
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
    const options = {
      density: 300, // Higher for better quality
      saveFilename: 'page',
      savePath: outputDir,
      format: 'jpeg'
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
