import React, { useRef, useState } from 'react';
import { Box } from '@/ui/design-system/box/box';
import { Typography } from '@/ui/design-system/typography/typography';
import { Button } from '@/ui/design-system/button/button';
import Image from 'next/image';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageSelect(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      onImageSelect(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileSelect}
        className="hidden"
        ref={fileInputRef}
      />

      {preview ? (
        <div className="relative w-full h-64">
          <Image
            src={preview}
            alt="Aperçu du déchet"
            layout="fill"
            objectFit="contain"
          />
          <button
            onClick={() => {
              setPreview(null);
              if (fileInputRef.current) {
                fileInputRef.current.value = '';
              }
            }}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2"
          >
            ✕
          </button>
        </div>
      ) : (
        <div className="text-center">
          <Button
            variant="secondary"
            action={handleCameraCapture}
            className="mb-2"
          >
            📸 Prendre une photo
          </Button>
          <Typography variant="caption2" className="text-gray-500">
            ou glissez-déposez une image ici
          </Typography>
        </div>
      )}
    </div>
  );
}; 