import { useState, useEffect } from "react";

type HorrorImageProps = {
  image: {
    id: number;
    title: string;
    description: string;
    type: string;
    path: string;
  };
  onClick: () => void;
};

export const HorrorImage = ({ image, onClick }: HorrorImageProps) => {
  const [hover, setHover] = useState(false);
  const [glitchClass, setGlitchClass] = useState("");
  
  useEffect(() => {
    if (hover) {
      const interval = setInterval(() => {
        setGlitchClass(prev => prev ? "" : "glitch");
      }, 200);
      return () => clearInterval(interval);
    } else {
      setGlitchClass("");
    }
  }, [hover]);

  return (
    <div 
      className="relative overflow-hidden aspect-square cursor-pointer bg-gray-900 transition-transform hover:scale-105"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className={`relative w-full h-full ${glitchClass}`}>
        <img 
          src={image.path} 
          alt={image.title} 
          className="w-full h-full object-cover opacity-60 transition-opacity hover:opacity-80"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-red-500 mix-blend-difference">
            {image.id}
          </span>
        </div>
        {hover && (
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-70">
            <h3 className="text-red-600 font-bold text-sm truncate">{image.title}</h3>
            <p className="text-xs text-gray-400 font-mono truncate">{image.description.substring(0, 20)}...</p>
          </div>
        )}
      </div>
    </div>
  );
};
