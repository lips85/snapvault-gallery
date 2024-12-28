import { Camera, LayoutGrid } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Selection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground">SnapVault</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            원하시는 작업을 선택해주세요
          </p>
        </div>
        <div className="space-y-4">
          <Button
            onClick={() => navigate("/upload")}
            className="w-full h-16 text-lg"
            variant="outline"
          >
            <Camera className="mr-2 h-6 w-6" />
            사진 올리기
          </Button>
          <Button
            onClick={() => navigate("/dashboard")}
            className="w-full h-16 text-lg"
            variant="outline"
          >
            <LayoutGrid className="mr-2 h-6 w-6" />
            사진 갤러리
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Selection;