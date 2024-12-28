import { useState } from "react";
import { Search, Filter, Upload, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

interface Photo {
  id: string;
  site_name: string;
  inspection_date: string;
  location: string;
  process: string;
  details: string;
  image_url: string;
}

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);

  // Form states
  const [siteName, setSiteName] = useState("");
  const [inspectionDate, setInspectionDate] = useState("");
  const [location, setLocation] = useState("");
  const [process, setProcess] = useState("");
  const [details, setDetails] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const { data: photos, refetch } = useQuery({
    queryKey: ['photos'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('photos')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Photo[];
    }
  });

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const handleUpload = async () => {
    if (!selectedImage || !siteName || !inspectionDate || !location || !process || !details) {
      toast({
        title: "오류",
        description: "모든 필드를 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      const fileExt = selectedImage.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('photos')
        .upload(fileName, selectedImage);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('photos')
        .getPublicUrl(fileName);

      const { error: insertError } = await supabase
        .from('photos')
        .insert({
          site_name: siteName,
          inspection_date: inspectionDate,
          location: location,
          process: process,
          details: details,
          image_url: publicUrl,
        });

      if (insertError) throw insertError;

      toast({
        title: "성공",
        description: "사진이 업로드되었습니다.",
      });

      // Reset form
      setSiteName("");
      setInspectionDate("");
      setLocation("");
      setProcess("");
      setDetails("");
      setSelectedImage(null);
      refetch();

    } catch (error) {
      toast({
        title: "오류",
        description: "업로드 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const filteredPhotos = photos?.filter(photo => {
    const matchesSearch = 
      photo.site_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      photo.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      photo.process.toLowerCase().includes(searchQuery.toLowerCase()) ||
      photo.details.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedFilter === "all") return matchesSearch;
    return matchesSearch && photo.process === selectedFilter;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
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
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    업로드
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>사진 업로드</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="site">현장명</Label>
                      <Input
                        id="site"
                        value={siteName}
                        onChange={(e) => setSiteName(e.target.value)}
                        placeholder="현장명을 입력하세요"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="date">점검일자</Label>
                      <Input
                        id="date"
                        type="date"
                        value={inspectionDate}
                        onChange={(e) => setInspectionDate(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="location">점검위치</Label>
                      <Input
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="점검위치를 입력하세요"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="process">공정</Label>
                      <Input
                        id="process"
                        value={process}
                        onChange={(e) => setProcess(e.target.value)}
                        placeholder="공정을 입력하세요"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="details">세부내용</Label>
                      <Textarea
                        id="details"
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        placeholder="세부내용을 입력하세요"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="image">사진</Label>
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setSelectedImage(e.target.files?.[0] || null)}
                      />
                    </div>
                    <Button onClick={handleUpload} disabled={isUploading}>
                      {isUploading ? "업로드 중..." : "업로드"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant="ghost" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Photo grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPhotos?.map((photo) => (
                <Dialog key={photo.id}>
                  <DialogTrigger asChild>
                    <div className="relative group aspect-square overflow-hidden rounded-lg bg-muted cursor-pointer">
                      <img
                        src={photo.image_url}
                        alt={photo.site_name}
                        className="object-cover w-full h-full transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <h3 className="text-white font-medium">{photo.site_name}</h3>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>{photo.site_name}</DialogTitle>
                    </DialogHeader>
                    <div className="mt-4">
                      <img
                        src={photo.image_url}
                        alt={photo.site_name}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      <div className="mt-4 space-y-2">
                        <p className="text-sm text-muted-foreground">
                          #현장명: {photo.site_name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          #날짜: {new Date(photo.inspection_date).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          #점검위치: {photo.location}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          #공정: {photo.process}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          #세부내용: {photo.details}
                        </p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-64 shrink-0">
            <div className="sticky top-8 space-y-6 bg-card p-4 rounded-lg">
              <div>
                <h3 className="font-medium text-foreground mb-4">필터</h3>
                <div className="space-y-2">
                  <Button
                    variant={selectedFilter === "all" ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => setSelectedFilter("all")}
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    전체
                  </Button>
                  {Array.from(new Set(photos?.map(photo => photo.process))).map(process => (
                    <Button
                      key={process}
                      variant={selectedFilter === process ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => setSelectedFilter(process)}
                    >
                      {process}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;