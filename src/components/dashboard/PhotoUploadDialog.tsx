import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PhotoUploadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const PhotoUploadDialog = ({ isOpen, onClose, onSuccess }: PhotoUploadDialogProps) => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [siteName, setSiteName] = useState("");
  const [inspectionDate, setInspectionDate] = useState("");
  const [location, setLocation] = useState("");
  const [process, setProcess] = useState("");
  const [details, setDetails] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

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
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

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
          user_id: user.id
        });

      if (insertError) throw insertError;

      toast({
        title: "성공",
        description: "사진이 업로드되었습니다.",
      });

      // Reset form and close dialog
      setSiteName("");
      setInspectionDate("");
      setLocation("");
      setProcess("");
      setDetails("");
      setSelectedImage(null);
      onSuccess();
      onClose();

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
  );
};