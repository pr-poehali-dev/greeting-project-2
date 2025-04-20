import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center p-8 max-w-md">
        <h1 className="text-4xl font-bold mb-4 text-red-600">ҜѦϻѺҌѦғϮ</h1>
        <p className="text-xl text-gray-400 mb-8">ӾӬӘҼҾȺӂӜҿҸҾҺӜ</p>
        
        <Button 
          onClick={() => navigate("/horror-gallery")}
          className="bg-red-900 hover:bg-red-800 text-white py-2 px-4 rounded-md transition-colors"
        >
          ҜҺҾӬӈҿҸӬҾӐ
        </Button>
        
        <div className="mt-4 text-sm text-red-800">
          <span className="block">⚠️ ӾҺӀѿӨѺӀӐӜѦѦ</span>
          <span className="block">ФӬԬӚӦԱӧӪӞԲөӫӗХԁѧӦӧΩ</span>
        </div>
      </div>
    </div>
  );
};

export default Index;
