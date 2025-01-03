import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
  processes: string[];
}

export const Sidebar = ({ selectedFilter, setSelectedFilter, processes }: SidebarProps) => {
  return (
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
            {processes.map(process => (
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
  );
};