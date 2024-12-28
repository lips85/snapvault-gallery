import { Search, Upload, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface NavigationProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  openUploadDialog: () => void;
}

export const Navigation = ({ searchQuery, setSearchQuery, openUploadDialog }: NavigationProps) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <nav className="border-b bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-1 flex items-center">
            <h1 className="text-2xl font-bold text-foreground">SnapVault</h1>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="max-w-lg w-full">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Search className="h-5 w-5 text-muted-foreground" />
                </div>
                <Input
                  type="text"
                  placeholder="검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
          <div className="flex-1 flex justify-end space-x-4">
            <Button variant="outline" onClick={openUploadDialog}>
              <Upload className="h-4 w-4 mr-2" />
              업로드
            </Button>
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};