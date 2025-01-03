export interface IPhoto {
  id: string
  site_name: string
  inspection_date: string
  location: string
  process: string
  details: string
  image_url: string
  user_id: string
  created_at: string
}

export interface IPhotoUploadDialogProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}
