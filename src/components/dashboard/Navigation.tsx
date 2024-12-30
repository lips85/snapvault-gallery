import { Search, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface NavigationProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  openUploadDialog?: () => void;
}

interface UserMetadata {
  avatar_url?: string;
  email?: string;
  full_name?: string;
  name?: string;
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
      
      const metadata = user.user_metadata as UserMetadata;
      
      return {
        ...data,
        email: metadata.email,
        name: metadata.name,
        full_name: metadata.full_name,
        created_at: user.created_at,
      };
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
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={profile?.avatar_url} />
                    <AvatarFallback>{profile?.name?.[0] || 'U'}</AvatarFallback>
                  </Avatar>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="end">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={profile?.avatar_url} />
                      <AvatarFallback>{profile?.name?.[0] || 'U'}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold">{profile?.name || '사용자'}</h4>
                      <p className="text-sm text-muted-foreground">{profile?.email}</p>
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <dl className="space-y-2 text-sm">
                      <div>
                        <dt className="text-muted-foreground">가입일</dt>
                        <dd className="font-medium">
                          {profile?.created_at ? new Date(profile.created_at).toLocaleDateString('ko-KR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          }) : '정보 없음'}
                        </dd>
                      </div>
                      {profile?.full_name && (
                        <div>
                          <dt className="text-muted-foreground">전체 이름</dt>
                          <dd className="font-medium">{profile.full_name}</dd>
                        </div>
                      )}
                    </dl>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};