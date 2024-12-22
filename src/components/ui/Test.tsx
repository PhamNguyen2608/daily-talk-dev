import React from "react";

const HexagonImage = ({ imageUrl }: { imageUrl?: string }) => {
  const defaultImage = "https://images.unsplash.com/photo-1579546929518-9e396f3cc809";

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = defaultImage;
  };

  return (
    <>
      <div className="relative w-64 h-64 mx-auto" style={{ filter: 'url(#goo)' }}>
        <div 
          className="absolute inset-0 bg-blue-500"
          style={{
            clipPath: "polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)",
          }}
        />
     
        
        <div className="absolute inset-2">
          <div className="relative w-full h-full" style={{ filter: 'url(#goo)' }}>
            <div 
              className="absolute inset-0 overflow-hidden"
              style={{
                clipPath: "polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)",
                backgroundColor: "#f3f4f6"
              }}
            >
              <img
                src={imageUrl || defaultImage}
                alt="Hexagon Content"
                onError={handleImageError}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div 
              className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 "
              style={{
                clipPath: "polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)"
              }}
            />
          </div>
        </div>
      </div>

      <svg style={{ visibility: 'hidden', position: 'absolute' }} width="0" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />    
            <feColorMatrix 
              in="blur" 
              mode="matrix" 
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" 
              result="goo" 
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
          </filter>
        </defs>
      </svg>
    </>
  );
};

export default HexagonImage;