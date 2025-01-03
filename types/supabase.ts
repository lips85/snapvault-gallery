export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      photos: {
        Row: {
          id: string
          created_at: string
          site_name: string
          inspection_date: string
          location: string
          process: string
          details: string
          image_url: string
          user_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          site_name: string
          inspection_date: string
          location: string
          process: string
          details: string
          image_url: string
          user_id: string
        }
        Update: {
          id?: string
          created_at?: string
          site_name?: string
          inspection_date?: string
          location?: string
          process?: string
          details?: string
          image_url?: string
          user_id?: string
        }
      }
    }
  }
}
