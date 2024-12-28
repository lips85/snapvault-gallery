import { useState } from "react";
import { Search, Filter, Upload, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const MOCK_PHOTOS = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    title: "Working from home",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    title: "Tech setup",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    title: "Circuit board",
  },
];

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const handleUpload = () => {
    toast({
      title: "Coming soon",
      description: "Photo upload will be implemented in the next version",
    });
  };

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
                    placeholder="Search photos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
            <div className="flex-1 flex justify-end space-x-4">
              <Button onClick={handleUpload} variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </Button>
              <Button variant="ghost">
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
              {MOCK_PHOTOS.map((photo) => (
                <div
                  key={photo.id}
                  className="relative group aspect-square overflow-hidden rounded-lg bg-muted"
                >
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="object-cover w-full h-full transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <h3 className="text-white font-medium">{photo.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-64 shrink-0">
            <div className="sticky top-8 space-y-6 bg-card p-4 rounded-lg">
              <div>
                <h3 className="font-medium text-foreground mb-4">Filters</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Filter className="h-4 w-4 mr-2" />
                    All Photos
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Recent
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Favorites
                  </Button>
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