'use client'

import { useState, useEffect } from 'react'
import { ArrowRight,} from 'lucide-react'
import Link from 'next/link'
import './globals.css'
export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)

    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth'

    // Enhance smooth scrolling with JavaScript
    const smoothScroll = (e: MouseEvent) => {
  e.preventDefault()
  const targetId = (e.currentTarget as HTMLAnchorElement).getAttribute('href')
  if (targetId && targetId.startsWith('#') && targetId.length > 1) { // Check if targetId is valid
    const targetElement = document.querySelector(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }
}

    const links = document.querySelectorAll('a[href^="#"]')
    links.forEach(link => {
      link.addEventListener('click', smoothScroll as EventListener)
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      links.forEach(link => {
        link.removeEventListener('click', smoothScroll as EventListener)
      })
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <nav className="nav-cus navbar navbar-expand-md sticky-top" style={{backgroundColor: '#fff',}}>
          <div className="container">
            <Link href="/" className="navbar-brand font-bold text-3xl">
              <span className="text-primary">Effortless</span><span className="text-secondary"> Tools</span>
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item">
                  <Link href="/background-remover" className="nav-link" aria-current="page">
                    <i className="bi bi-eye-slash-fill me-2" style={{color: '#28a745'}}></i>
                    <span className="text-dark">Background Remover</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/format-converter" className="nav-link">
                    <i className="bi bi-file-earmark-arrow-down-fill me-2" style={{color: '#ffc107'}}></i>
                    <span className="text-dark">Format Converter</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/video-downloader" className="nav-link">
                    <i className="bi bi-file-earmark-arrow-down-fill me-2" style={{color: '#ffc107'}}></i>
                    <span className="text-dark">YT Video Downloader</span>
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi bi-file-earmark-arrow-down-fill me-2" style={{color: '#ffc107'}}></i>
                    <span className="text-dark">All Tools</span>
                  </a>
                  <ul className="dropdown-menu animate slideIn" aria-labelledby="navbarDropdown">
                    <li><Link href="/background-remover" className="dropdown-item">Background Remover</Link></li>
                    <li><Link href="/format-converter" className="dropdown-item">Format Converter</Link></li>
                    <li><Link href="/video-downloader" className="dropdown-item">YT Video Downloader</Link></li>
                  </ul>
                </li>
              </ul>
              <div className="d-flex justify-content-end">
                <Link href="#tools">
                  <button className='cta' style={{borderRadius:'0.5rem'}}>
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </nav>

      <main className="flex items-center justify-center">
        <section className="pt-32 pb-20 px-6 md:p-20" style={{height: 'calc(100vh - 64px)'}}>
          <div className="container h-100 d-flex flex-column justify-content-center align-items-center">
            <h2>
              Effortless Tools for Instant Results
            </h2>
            <p>
              Simplify your workflow with our powerful and easy-to-use online tools.
            </p>
            <button className="rounded-pill">
              <a href="#tools">
              <span className="relative top-1">
                Get Started
              </span>
              <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </button>
          </div>
        </section>
        <section id="tools" className="py-20 px-6" style={{paddingBottom: '40px', paddingTop: '40px'}}>
          <div className="container">
            <h2 className="text-center text-4xl font-bold mb-10">Our Tools</h2>
          </div>
          <div className="container my-5">
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {/* Card 1 */}
              <div className="col">
                <div className="card h-100 shadow-sm">
                  <img src="/form.jpeg" className="card-img-top" alt="JPG to PNG" />
                  <div className="card-body">
                    <h5 className="card-title">Image Extension Converter</h5>
                    <p className="card-text text-muted">PNG Convert to JPG Remove</p>
                    <button className="mt-4 w-100" style={{borderRadius: '0.5rem'}}>
                    <Link href="/format-converter">
                        Use This Tool
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Card 2 */}
              <div className="col">
                <div className="card h-100 shadow-sm">
                  <img src="/form.jpeg" className="card-img-top" alt="Background Remove" />
                  <div className="card-body">
                    <h5 className="card-title">Image Background Remover</h5>
                    <p className="card-text text-muted">Image Editing Made Easy</p>
                    <button className="mt-4 w-100" style={{borderRadius: '0.5rem'}}>
                    <Link href="/background-remover">
                        Use This Tool
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Card 3 */}
              <div className="col">
                <div className="card h-100 shadow-sm">
                  <img src="/form.jpeg" className="card-img-top" alt="Use Tool" />
                  <div className="card-body">
                    <h5 className="card-title">YouTube Video Downloader</h5>
                    <p className="card-text text-muted">Do it All - GIF, PDF, Remove</p>
                    <button className="mt-4 w-100" style={{borderRadius: '0.5rem'}}>
                    <Link href="/video-downloader">
                        Use This Tool
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </section>

        <section id="how-it-works" className="bg-gray-50 md:flex md:flex-row md:justify-center" style={{padding: '80px'}}>
          <div className="container mx-auto md:w-1/2">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">How It Works</h2>
            <div className="max-w-3xl mx-auto">
              {[
                { step: 1, title: "Choose a Tool", description: "Select the tool you need from our wide range of options." },
                { step: 2, title: "Upload Your File", description: "Drag and drop or click to upload your file to our secure platform." },
                { step: 3, title: "Process and Download", description: "Let our tool work its magic, then download your processed file." },
              ].map((item, index) => (
                <div key={index} className="flex items-start mb-8 md:flex-row md:items-center">
                  <div className="flex-shrink-0 bg-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 md:mr-0 md:mb-0">
                    {item.step}
                  </div>
                  <div className="md:ml-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="contact" className="bg-gray-50 md:flex md:flex-row md:justify-center" style={{padding: '80px'}}>
          <div className="container mx-auto md:w-1/2">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Get in Touch</h2>
            <div className="max-w-3xl mx-auto">
              <form className="max-w-lg mx-auto p-8 rounded-lg">
                <div className="mb-5 ">
                  <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
                  <input type="text" className="form-control w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" id="name" placeholder="Your Name" required />
                </div>
                <div className="mb-5">
                  <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email Address</label>
                  <input type="email" className="form-control  w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" id="email" placeholder="name@example.com" required />
                </div>
                <div className="mb-5">
                  <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Message</label>
                  <textarea className="form-control w-full p-3  border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" id="message" rows={4} placeholder="Your Message" required></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100 flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md  bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition duration-150 ease-in-out">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
        
      </main>
      <footer className="bg-dark bg-gray-800 text-white p-4 text-center">
        <p className="mb-0">
          &copy; {new Date().getFullYear()} <a href="https://www.linkedin.com/in/haroon-ali-04861b328/">Haroon Ali</a>. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
