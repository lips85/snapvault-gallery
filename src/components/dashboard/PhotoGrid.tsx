import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Photo {
  id: string;
  site_name: string;
  inspection_date: string;
  location: string;
  process: string;
  details: string;
  image_url: string;
}

interface PhotoGridProps {
  photos: Photo[];
}

export const PhotoGrid = ({ photos }: PhotoGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {photos?.map((photo) => (
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
  );
};