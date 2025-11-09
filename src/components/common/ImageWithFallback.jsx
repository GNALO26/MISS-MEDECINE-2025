import React, { useState } from 'react'

const ImageWithFallback = ({ 
  src, 
  alt, 
  fallbackSrc = '/images/candidates/default-avatar.jpg',
  className = '',
  ...props 
}) => {
  const [imgSrc, setImgSrc] = useState(src)
  const [loading, setLoading] = useState(true)

  const handleError = () => {
    setImgSrc(fallbackSrc)
    setLoading(false)
  }

  const handleLoad = () => {
    setLoading(false)
  }

  return (
    <div className={`relative ${className}`}>
      {loading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
          <span className="text-gray-400">Chargement...</span>
        </div>
      )}
      <img
        src={imgSrc}
        alt={alt}
        onError={handleError}
        onLoad={handleLoad}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          loading ? 'opacity-0' : 'opacity-100'
        } ${className}`}
        {...props}
      />
    </div>
  )
}

export default ImageWithFallback