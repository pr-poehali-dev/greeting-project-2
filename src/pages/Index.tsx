import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 max-w-md">
        <h1 className="text-4xl font-bold mb-4 text-black">Добро пожаловать!</h1>
        <p className="text-xl text-gray-600 mb-8">Выберите, куда хотите перейти</p>
        
        <Button 
          onClick={() => navigate("/horror-gallery")}
          className="bg-red-900 hover:bg-red-800 text-white py-2 px-4 rounded-md transition-colors"
        >
          Галерея Кошмаров
        </Button>
        
        <div className="mt-4 text-sm text-gray-500">
          <span className="block">⚠️ Предупреждение</span>
          <span className="block">Галерея содержит пугающие изображения и эффекты</span>
        </div>
      </div>
    </div>
  );
};

export default Index;
