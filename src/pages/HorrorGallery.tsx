import { useState, useEffect } from "react";
import { HorrorImage } from "../components/HorrorImage";
import { Scream } from "../components/Scream";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Link } from "react-router-dom";

// Создаем 120 изображений с разными эффектами
const generateHorrorImages = () => {
  // Функция для генерации случайной строки символов
  const generateSymbols = (length: number) => {
    const symbols = "ҨҎӾӿѮҘӨҸҺӜӬӘҼҾȺӂӜҿΩӢӪԱӧӔԲөӫӗХӨѺӐӜѦ";
    return Array.from({ length }, () => symbols[Math.floor(Math.random() * symbols.length)]).join('');
  };

  return Array.from({ length: 120 }, (_, i) => {
    // Разные типы эффектов
    const types = ["scream", "symbols", "distortion", "inversion"];
    const type = types[Math.floor(Math.random() * types.length)];
    
    return {
      id: i + 1,
      title: `${generateSymbols(8)}`,
      description: `${generateSymbols(30)}`,
      type,
      path: "/placeholder.svg", // Заглушка для изображений
    };
  });
};

export default function HorrorGallery() {
  const [images] = useState(generateHorrorImages());
  const [showScream, setShowScream] = useState(false);
  const [selectedImage, setSelectedImage] = useState<null | {
    id: number;
    title: string;
    description: string;
    type: string;
    path: string;
  }>(null);
  const [showSymbols, setShowSymbols] = useState(false);
  const [distortedImage, setDistortedImage] = useState(false);
  const [invertedImage, setInvertedImage] = useState(false);

  useEffect(() => {
    if (showSymbols) {
      const timeout = setTimeout(() => {
        setShowSymbols(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [showSymbols]);

  useEffect(() => {
    if (distortedImage) {
      const timeout = setTimeout(() => {
        setDistortedImage(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [distortedImage]);

  useEffect(() => {
    if (invertedImage) {
      const timeout = setTimeout(() => {
        setInvertedImage(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [invertedImage]);

  const handleImageClick = (image: {
    id: number;
    title: string;
    description: string;
    type: string;
    path: string;
  }) => {
    setSelectedImage(image);
    
    // Разные эффекты в зависимости от типа изображения
    if (image.type === "scream") {
      setShowScream(true);
      
      // Проигрывание звука скримера (добавьте звуковой файл)
      // const audio = new Audio('/scream.mp3');
      // audio.play();
    } else if (image.type === "symbols") {
      setShowSymbols(true);
    } else if (image.type === "distortion") {
      setDistortedImage(true);
    } else if (image.type === "inversion") {
      setInvertedImage(true);
    }
  };

  return (
    <div className={`min-h-screen bg-black text-white ${invertedImage ? 'invert' : ''}`}>
      {showScream && <Scream />}
      
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-red-600">ӬӐҬҾҒӉҎ ѺҔӞӬҒ</h1>
          <Button variant="outline" className="border-red-700 text-red-600">
            <Link to="/">ӚѦӚҘҒ</Link>
          </Button>
        </div>
        
        {showSymbols && (
          <div className="fixed inset-0 flex items-center justify-center z-40 bg-black bg-opacity-80 pointer-events-none">
            <div className="text-8xl text-red-600 animate-pulse">
              {Array.from({ length: 100 }).map((_, i) => (
                <span 
                  key={i} 
                  style={{
                    position: 'absolute',
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    transform: `rotate(${Math.random() * 360}deg)`,
                    opacity: Math.random(),
                  }}
                >
                  {["Ж", "Щ", "Ф", "Ѫ", "Ҩ", "Ѭ", "Ө", "Ӿ", "Ҏ", "ӿ", "Ѯ", "Ҙ"][Math.floor(Math.random() * 12)]}
                </span>
              ))}
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {images.map((image) => (
            <HorrorImage 
              key={image.id} 
              image={image} 
              onClick={() => handleImageClick(image)}
            />
          ))}
        </div>
      </div>
      
      <Dialog open={selectedImage !== null} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className={`bg-gray-900 text-white max-w-3xl ${distortedImage ? 'distorted' : ''}`}>
          <DialogTitle className="text-red-600 text-2xl font-bold">
            {selectedImage?.title}
          </DialogTitle>
          
          <div className="mt-4">
            <img 
              src={selectedImage?.path} 
              alt={selectedImage?.title} 
              className="w-full h-64 object-cover opacity-80" 
            />
          </div>
          
          <div className="mt-4 font-mono text-green-500">
            <p className="mb-2 text-lg font-bold">ӚӁҾҒҾᴥ:</p>
            <div className="text-sm">
              {selectedImage?.description}
            </div>
            <div className="mt-4 text-xs text-gray-400">
              <span>ID: {selectedImage?.id}</span>
              <span className="ml-4">ӨӜҺ: {selectedImage?.type}</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
