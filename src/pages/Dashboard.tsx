import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/dashboard/Navigation";
import { PhotoGrid } from "@/components/dashboard/PhotoGrid";
import { Sidebar } from "@/components/dashboard/Sidebar";

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

  const { data: photos } = useQuery({
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

  const filteredPhotos = photos?.filter(photo => {
    const matchesSearch = 
      photo.site_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      photo.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      photo.process.toLowerCase().includes(searchQuery.toLowerCase()) ||
      photo.details.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedFilter === "all") return matchesSearch;
    return matchesSearch && photo.process === selectedFilter;
  });

  const uniqueProcesses = Array.from(new Set(photos?.map(photo => photo.process) || []));

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <div className="flex-1">
            <PhotoGrid photos={filteredPhotos || []} />
          </div>

          <Sidebar
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            processes={uniqueProcesses}
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;