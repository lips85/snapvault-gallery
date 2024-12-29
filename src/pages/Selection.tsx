import { Camera, LayoutGrid } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Selection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-5xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col items-center justify-center p-8 border rounded-lg hover:border-foreground transition-colors">
          <Button
            onClick={() => navigate("/upload")}
            className="w-full h-32 text-lg"
            variant="outline"
          >
            <Camera className="mr-2 h-12 w-12" />
            사진 올리기
          </Button>
        </div>
        
        <div className="flex flex-col items-center justify-center p-8 border rounded-lg hover:border-foreground transition-colors">
          <Button
            onClick={() => navigate("/dashboard")}
            className="w-full h-32 text-lg"
            variant="outline"
          >
            <LayoutGrid className="mr-2 h-12 w-12" />
            사진 갤러리
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Selection;