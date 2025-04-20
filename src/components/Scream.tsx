import { useEffect, useState } from "react";

export const Scream = () => {
  const [opacity, setOpacity] = useState(0);
  
  useEffect(() => {
    setOpacity(1);
    const timeout = setTimeout(() => {
      setOpacity(0);
    }, 1000);
    
    return () => clearTimeout(timeout);
  }, []);
  
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      style={{ 
        opacity, 
        transition: "opacity 200ms ease-in-out",
        pointerEvents: opacity > 0 ? "auto" : "none"
      }}
    >
      <div className="scream-container max-w-2xl mx-auto">
        <img 
          src="/placeholder.svg" 
          alt="Scream" 
          className="w-full max-h-[80vh] object-contain animate-pulse"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-6xl font-bold text-red-600 animate-pulse">
              ОН ИДЁТ
            </h2>
            <div className="mt-4 text-xl text-white">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="font-mono">
                  {Array.from({ length: 30 }).map((_, j) => (
                    <span 
                      key={j} 
                      className="inline-block"
                      style={{
                        transform: `rotate(${Math.random() * 10 - 5}deg)`,
                        opacity: Math.random() * 0.7 + 0.3
                      }}
                    >
                      {["Ж", "Щ", "Ф", "Ѫ", "Ҩ", "Ѭ"][Math.floor(Math.random() * 6)]}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
