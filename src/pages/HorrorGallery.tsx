import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { HorrorImage } from "@/components/HorrorImage";
import { Scream } from "@/components/Scream";
import { useNavigate } from "react-router-dom";

const horrorImages = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  title: `Кошмар №${i + 1}`,
  description: [
    "Ṫ̷̨̜͠h̸̪̣̋͒͘e̶̲͍̓ ̴̧͇̫̓ș̴̏ḩ̵̔̈́a̸̪̥̼̋̈́d̵̨̮̿́ǒ̸̩̩͗w̴̘̣̫̃͝ ̵̭͍͙̐͝ẃ̶̪̩͝á̸͕̭̮̄t̴̠̓c̴̡̿͘ͅh̶̖̥̒̕ë̵̹͔́̐s̶̝͑͘",
    "В̵̖̑̋̀ѝ̶͖́̓ж̵̡̘̝͘у̵̝̩̖̅ ̸̢̜͎̓̇т̵̪̟̍ё̵͍̳͕́̀̕б̵̡̯͒̂я̵̤͒̄̂",
    "N̴̛̮̂̀e̶̯̭̤͆v̶̦̭̱͗̽̂e̸̙͇̠̿͗r̶̼̗̀͜ ̴̱͚̽̎̽t̷̖͋͝͝ŭ̸̘̽͘r̸̛̙͛n̸̳̦̟͝ ̵̃͜a̸̫͔̾̉̅r̷̤̄̓̊o̵̧̻̓ư̵̳̮̑n̵̮̤̎d̸̞̎"
  ][i % 3],
  type: ["scream", "symbols", "distort", "invert"][i % 4],
  path: `/placeholder.svg`,
}));

const HorrorGallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [showScream, setShowScream] = useState(false);
  const [showSymbols, setShowSymbols] = useState(false);
  const navigate = useNavigate();

  const handleImageClick = (id: number) => {
    setSelectedImage(id);
    const image = horrorImages.find(img => img.id === id);
    
    if (image?.type === "scream") {
      setTimeout(() => {
        setShowScream(true);
        // Воспроизведение звука
        const audio = new Audio("/scream.mp3");
        audio.volume = 0.3;
        audio.play().catch(e => console.log("Audio failed to play:", e));
        
        setTimeout(() => {
          setShowScream(false);
          setSelectedImage(null);
        }, 1500);
      }, 500);
    } else if (image?.type === "symbols") {
      setShowSymbols(true);
      setTimeout(() => {
        setShowSymbols(false);
        setSelectedImage(null);
      }, 3000);
    } else if (image?.type === "distort") {
      // Эффект искажения страницы
      document.body.classList.add("distort");
      setTimeout(() => {
        document.body.classList.remove("distort");
        setSelectedImage(null);
      }, 2000);
    } else if (image?.type === "invert") {
      // Эффект инверсии цветов
      document.body.classList.add("invert");
      setTimeout(() => {
        document.body.classList.remove("invert");
        setSelectedImage(null);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2 text-red-600">Галерея Кошмаров</h1>
        <p className="text-gray-400">Н̵̘̊̐е̸̨̐ ̸̫̂̓н̸̡̗̎̍а̴̺̍ж̶̛̠и̶̢͙̏м̷̢̠̉ӓ̷̡̟́̅й̶̗̃ ̶̲͒н̴̲̺̓а̶̩̀͜ ̸͎͎̓и̸͓̂̊з̷̘̆͜о̴̣̓̉б̶̭̪̒͒р̸̗̝͑ӑ̴̲͉̚ж̶͊ͅе̵̞̙͒̓н̴̖̐й̴̜̚я̶̥͑</p>
        <button 
          className="mt-4 text-gray-400 hover:text-white transition-colors"
          onClick={() => navigate("/")}
        >
          ← Вернуться на главную
        </button>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {horrorImages.map((image) => (
          <HorrorImage 
            key={image.id}
            image={image}
            onClick={() => handleImageClick(image.id)}
          />
        ))}
      </div>

      <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="bg-black border-red-900 text-white max-w-2xl">
          {selectedImage && !showScream && !showSymbols && (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-red-600 mb-2">
                {horrorImages.find(img => img.id === selectedImage)?.title}
              </h2>
              <div className="my-4">
                <img 
                  src={horrorImages.find(img => img.id === selectedImage)?.path} 
                  alt="Horror" 
                  className="w-full h-64 object-cover filter contrast-125 brightness-75"
                />
              </div>
              <p className="text-gray-400 font-mono">
                {horrorImages.find(img => img.id === selectedImage)?.description}
              </p>
            </div>
          )}
          
          {showSymbols && (
            <div className="symbols-effect">
              <div className="symbols-container">
                {"Ṫ̷̨̜͠h̸̪̣̋͒͘e̶̲͍̓ ̴̧͇̫̓ș̴̏ḩ̵̔̈́a̸̪̥̼̋̈́d̵̨̮̿́ǒ̸̩̩͗w̴̘̣̫̃͝ ̵̭͍͙̐͝ẃ̶̪̩͝á̸͕̭̮̄t̴̠̓c̴̡̿͘ͅh̶̖̥̒̕ë̵̹͔́̐s̶̝͑͘"
                  .split("")
                  .map((char, i) => (
                    <span 
                      key={i} 
                      className="inline-block animate-pulse"
                      style={{ 
                        animationDelay: `${i * 0.05}s`,
                        fontSize: `${Math.random() * 1.5 + 1}rem` 
                      }}
                    >
                      {char}
                    </span>
                  ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {showScream && <Scream />}
    </div>
  );
};

export default HorrorGallery;
