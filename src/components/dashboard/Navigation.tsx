import { Search, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";

interface NavigationProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  openUploadDialog?: () => void;
}

export const Navigation = ({ searchQuery, setSearchQuery }: NavigationProps) => {
  const navigate = useNavigate();

  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      return data;
    }
  });

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
          <div className="flex-1 flex justify-end space-x-4 items-center">
            <Avatar className="h-8 w-8">
              <AvatarImage src={profile?.avatar_url} />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};