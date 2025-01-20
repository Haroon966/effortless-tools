'use client'; // Indicates that this component is a client component in Next.js
import { useState } from 'react'; 
import Link from 'next/link'; 
import { ArrowRight, Play as LucidePlay } from 'lucide-react'; 

export default function YouTubeVideoDownloader() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null); 
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null); 
  const [loading, setLoading] = useState<boolean>(false); 
  const [errorMessage, setErrorMessage] = useState<string | null>(null); 
  const [fileName, setFileName] = useState<string>('video.mp4'); // New state for filename

  const handleVideoUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value; 
    setVideoUrl(value); 
    setDownloadUrl(null); 
    setErrorMessage(null); 
  };

  const handleFileNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(event.target.value); // Update filename state
  };

  const downloadVideo = async () => {
    if (!videoUrl) {
      setErrorMessage('Please enter a valid YouTube video URL.'); 
      return;
    }

    setLoading(true); 
    setErrorMessage(null); 

    const url = new URL(videoUrl); 
    const videoId = url.searchParams.get('v'); 

    if (!videoId) {
      setErrorMessage('Invalid YouTube video URL.'); 
      setLoading(false); 
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:5000/download-video?videoId=${videoId}&fileName=${encodeURIComponent(fileName)}`); // Include filename in request

      if (!response.ok) {
        throw new Error('Failed to download the video. Please try again.'); 
      }

      const data = await response.json(); 
      setDownloadUrl(data.downloadUrl); 
    } catch (error: any) {
      console.error(error); 
      setErrorMessage(error.message || 'An unexpected error occurred.'); 
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light">
      <header className="bg-white shadow-sm w-100 position-absolute top-0">
        <nav className="container py-3">
          <Link href="/" className="text-decoration-none text-primary d-flex align-items-center">
            <ArrowRight className="me-2" />
            Back to Home
          </Link>
        </nav>
      </header>

      <main className="container py-5">
        <h1 className="mb-4 text-center">YouTube Video Downloader</h1>

        <div className="card mb-4 mx-auto shadow-sm" style={{ maxWidth: '500px' }}>
          <div className="card-body">
            <div className="mb-3 text-center">
              <label htmlFor="videoUrl" className="form-label">Enter a YouTube video URL:</label>
              <input
                type="url"
                onChange={handleVideoUrlChange}
                className="form-control"
                placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              />
              {errorMessage && <div className="text-danger mt-2">{errorMessage}</div>}
            </div>

            <div className="mb-3 text-center">
              <label htmlFor="fileName" className="form-label">Enter a filename:</label>
              <input
                type="text"
                value={fileName}
                onChange={handleFileNameChange}
                className="form-control"
                placeholder="video.mp4"
              />
            </div>

            <button
              onClick={downloadVideo}
              className="btn w-100 d-flex align-items-center justify-content-center"
              disabled={loading}
              style={{ borderRadius : '30px', padding: '10px' }}
            >
              {loading ? (
                'Downloading...'
              ) : (
                <>
                  <LucidePlay className="me-2" size={16} /> Download
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

        {downloadUrl && (
          <div className="card mx-auto" style={{ maxWidth: '500px' }}>
            <div className="card-body text-center">
              <h5 className="card-title">Downloaded Video</h5>
              <a href={downloadUrl} download={fileName} className="btn btn-success mt-3 w-100">
                Download
              </a>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}