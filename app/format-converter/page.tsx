'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Image as LucideImage } from 'lucide-react'
export default function ImageConverter() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [convertedImage, setConvertedImage] = useState<string | null>(null)
  const [targetFormat, setTargetFormat] = useState<string>('png')
  const [loading, setLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setConvertedImage(null)
      setErrorMessage(null)
    } else {
      setErrorMessage("Please select a valid image file.")
    }
  }

  const convertImage = () => {
    if (!selectedFile) {
      setErrorMessage("Please select an image file to convert.")
      return
    }

    setLoading(true)
    setErrorMessage(null)

    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new window.Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')
        if (ctx) {
          // Set white background for the canvas when converting to JPEG
          if (targetFormat === 'jpg' || targetFormat === 'jpeg' || targetFormat === 'jfif' || targetFormat === 'pjpeg' || targetFormat === 'pjp') {
            ctx.fillStyle = '#ffffff'
            ctx.fillRect(0, 0, canvas.width, canvas.height)
          }

          ctx.drawImage(img, 0, 0)

          let convertedUrl: string | null = null
          if (targetFormat === 'png') {
            convertedUrl = canvas.toDataURL('image/png')
          } else if (targetFormat === 'jpg' || targetFormat === 'jpeg' || targetFormat === 'jfif' || targetFormat === 'pjpeg' || targetFormat === 'pjp') {
            convertedUrl = canvas.toDataURL('image/jpeg')
          } else if (targetFormat === 'svg') {
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
            svg.setAttribute('width', String(canvas.width))
            svg.setAttribute('height', String(canvas.height))
            const foreignObject = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject')
            foreignObject.setAttribute('width', String(canvas.width))
            foreignObject.setAttribute('height', String(canvas.height))
            foreignObject.appendChild(canvas)
            svg.appendChild(foreignObject)
            convertedUrl = 'data:image/svg+xml,' + encodeURIComponent(svg.outerHTML)
          } else if (targetFormat === 'webp') {
            convertedUrl = canvas.toDataURL('image/webp')
          }

          setConvertedImage(convertedUrl)
          setLoading(false)
        }
      }
      img.src = e.target?.result as string
    }
    reader.readAsDataURL(selectedFile)
  }

  return (
    <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light" style={{backgroundColor:'#ffffff', backgroundImage: 'radial-gradient(circle, #ccc 1px, transparent 1px)', backgroundSize: '20px 20px'}}>
      <header className="bg-white shadow-sm w-100 position-absolute top-0">
        <nav className="container py-3">
          <Link href="/" className="text-decoration-none text-primary d-flex align-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left me-2" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
            </svg>
            Back to Home
          </Link>
        </nav>
      </header>

      <main className="container py-5">
        <h1 className="mb-4 text-center">Image Converter</h1>
        
        <div className="card mb-4 mx-auto shadow-sm" style={{ maxWidth: '500px' }}>
          <div className="card-body">
            <div className="mb-3 text-center">
              <label htmlFor="file" className="form-label">Choose an image file:</label>
              <input type="file" accept=".jpg, .jpeg, .jfif, .pjpeg, .pjp, .png, .svg, .webp, .gif, .bmp, .ico, .tiff, .psd" onChange={handleFileChange} className="form-control" />
              {selectedFile && <img src={URL.createObjectURL(selectedFile)} alt="Preview" className="img-fluid mt-3" />}
              {errorMessage && <div className="text-danger mt-2">{errorMessage}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="targetFormat" className="form-label">Select target format:</label>
              <div className="input-group">
                <input type="search" id="search" className="form-control" placeholder="Search by file type" onChange={(e) => {
                  const searchValue = e.target.value.toLowerCase()
                  const options = document.querySelectorAll('#targetFormat option')
                  const selectedOption = Array.from(options).find(option => option.textContent?.toLowerCase().includes(searchValue))
                  if (selectedOption && selectedOption instanceof HTMLOptionElement) {
                    setTargetFormat(selectedOption.value)
                  }
                }} />
                <select id="targetFormat" value={targetFormat} onChange={(e) => setTargetFormat(e.target.value)} className="form-select">
                  <option value="png">PNG</option>
                  <option value="jpg">JPG</option>
                  <option value="jpeg">JPEG</option>
                  <option value="jfif">JFIF</option>
                  <option value="pjpeg">PJPEG</option>
                  <option value="pjp">PJP</option>
                  <option value="svg">SVG</option>
                  <option value="webp">WEBP</option>
                  <option value="gif">GIF</option>
                  <option value="bmp">BMP</option>
                  <option value="ico">ICO</option>
                  <option value="tiff">TIFF</option>
                  <option value="psd">PSD</option>
                </select>
              </div>
            </div>

            <button onClick={convertImage} className="w-100 d-flex align-items-center justify-content-center" disabled={loading} style={{ borderRadius: '30px', padding: '10px' }}>
              {loading ? 'Converting...' : <>
                <LucideImage className="me-2" size={16} /> Convert Image
              </>}
            </button>
            {loading && <div className="spinner-border text-primary mt-3 d-block mx-auto" role="status"><span className="visually-hidden">Loading...</span></div>}
          </div>
        </div>

        {convertedImage && (
          <div className="card mx-auto" style={{ maxWidth: '500px' }}>
            <div className="card-body text-center">
              <h5 className="card-title">Converted Image</h5>
              <img src={convertedImage} alt="Converted" className="img-fluid" />
              <a href={convertedImage} download={`converted-image.${targetFormat}`} className="btn btn-success mt-3 w-100">Download</a>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}


