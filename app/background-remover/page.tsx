'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Image as LucideImage } from 'lucide-react';

export default function BackgroundRemover() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setProcessedImage(null);
      setErrorMessage(null);
    } else {
      setErrorMessage('Please select a valid image file.');
    }
  };

  const removeBackground = async () => {
    if (!selectedFile) {
      setErrorMessage('Please select an image file to process.');
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await fetch('<YOUR_API_URL>/remove-background', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to process the image. Please try again.');
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setProcessedImage(imageUrl);
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light"
      style={{
        backgroundColor: '#ffffff',
        backgroundImage: 'radial-gradient(circle, #ccc 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }}
    >
      <header className="bg-white shadow-sm w-100 position-absolute top-0">
        <nav className="container py-3">
          <Link href="/" className="text-decoration-none text-primary d-flex align-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-left me-2"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
              />
            </svg>
            Back to Home
          </Link>
        </nav>
      </header>

      <main className="container py-5">
        <h1 className="mb-4 text-center">Background Remover</h1>

        <div className="card mb-4 mx-auto shadow-sm" style={{ maxWidth: '500px' }}>
          <div className="card-body">
            <div className="mb-3 text-center">
              <label htmlFor="file" className="form-label">
                Choose an image file:
              </label>
              <input type="file" accept=".jpg, .jpeg, .png" onChange={handleFileChange} className="form-control" />
              {selectedFile && (
                <img src={URL.createObjectURL(selectedFile)} alt="Preview" className="img-fluid mt-3" />
              )}
              {errorMessage && <div className="text-danger mt-2">{errorMessage}</div>}
            </div>

            <button
              onClick={removeBackground}
              className="btn btn-primary w-100 d-flex align-items-center justify-content-center"
              disabled={loading}
              style={{ borderRadius: '30px', padding: '10px' }}
            >
              {loading ? (
                'Processing...'
              ) : (
                <>
                  <LucideImage className="me-2" size={16} /> Remove Background
                </>
              )}
            </button>
            {loading && (
              <div className="spinner-border text-primary mt-3 d-block mx-auto" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
          </div>
        </div>

        {processedImage && (
          <div className="card mx-auto" style={{ maxWidth: '500px' }}>
            <div className="card-body text-center">
              <h5 className="card-title">Processed Image</h5>
              <img src={processedImage} alt="Processed" className="img-fluid" />
              <a href={processedImage} download="processed-image.png" className="btn btn-success mt-3 w-100">
                Download
              </a>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
