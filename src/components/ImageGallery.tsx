import { type Image as ImageType } from '@/types/image';
import Image from 'next/image';

export default function ImageGallery({ images }: { images: ImageType[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {images.map((image) => (
        <div
          key={image.id}
          className="group relative aspect-square overflow-hidden rounded-lg"
        >
          {/* 이미지 컨테이너 */}
          <div className="relative h-full w-full">
            <Image
              src={image.url}
              alt={image.title}
              fill
              className="object-cover transition-transform duration-200 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, 
                     (max-width: 768px) 50vw,
                     (max-width: 1024px) 33vw,
                     25vw"
              loading="lazy"
            />
          </div>
          
          {/* 이미지 정보 오버레이 */}
          <div className="absolute inset-0 bg-black/60 p-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <div className="flex h-full flex-col justify-end">
              <h3 className="text-lg font-semibold text-white">{image.title}</h3>
              <p className="mt-2 text-sm text-gray-200">{image.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 