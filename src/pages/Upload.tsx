import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PhotoUploadDialog } from "@/components/dashboard/PhotoUploadDialog";

const Upload = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    navigate("/selection");
  };

  const handleSuccess = () => {
    navigate("/dashboard");
  };

  return (
    <PhotoUploadDialog
      isOpen={isOpen}
      onClose={handleClose}
      onSuccess={handleSuccess}
    />
  );
};

export default Upload;