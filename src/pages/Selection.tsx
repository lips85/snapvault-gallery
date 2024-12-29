import { Camera, LayoutGrid } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Selection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fbfbfd]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl sm:text-5xl font-semibold text-center mb-4 text-[#1d1d1f]">
          SnapVault
        </h1>
        <p className="text-xl text-center text-[#86868b] mb-12">
          현장 사진을 손쉽게 관리하세요
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div 
            onClick={() => navigate("/upload")}
            className="group cursor-pointer"
          >
            <div className="aspect-square rounded-3xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center p-8 border border-gray-100">
              <Camera className="w-16 h-16 mb-6 text-[#06c] group-hover:scale-110 transition-transform duration-300" />
              <h2 className="text-2xl font-semibold text-[#1d1d1f] mb-2">사진 올리기</h2>
              <p className="text-[#86868b] text-center">
                현장 사진을 업로드하고 관리하세요
              </p>
            </div>
          </div>

          <div 
            onClick={() => navigate("/dashboard")}
            className="group cursor-pointer"
          >
            <div className="aspect-square rounded-3xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center p-8 border border-gray-100">
              <LayoutGrid className="w-16 h-16 mb-6 text-[#06c] group-hover:scale-110 transition-transform duration-300" />
              <h2 className="text-2xl font-semibold text-[#1d1d1f] mb-2">사진 갤러리</h2>
              <p className="text-[#86868b] text-center">
                업로드된 사진들을 한눈에 확인하세요
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Selection;