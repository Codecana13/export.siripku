'use client';

import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Loader } from 'lucide-react';
import { uploadToCloudinary } from '@/lib/cloudinary';

interface ImageUploadProps {
  onSuccess: (url: string) => void;
  onError?: (error: string) => void;
  label?: string;
  accept?: string;
}

export default function ImageUpload({ onSuccess, onError, label = 'Upload Image', accept = 'image/*' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    // Preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload
    setUploading(true);
    try {
      const result = await uploadToCloudinary(file);
      onSuccess(result.secure_url);
      setPreview(null);
    } catch (error) {
      onError?.(error instanceof Error ? error.message : 'Upload failed');
      setPreview(null);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-medium" style={{ color: 'var(--admin-text-secondary)' }}>
        {label}
      </label>
      
      <div
        className="relative border-2 border-dashed rounded-lg p-4 cursor-pointer transition-all hover:border-cyan-500/50"
        style={{ borderColor: 'var(--admin-border)', backgroundColor: 'var(--admin-input-bg)' }}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileSelect(file);
          }}
          className="hidden"
          disabled={uploading}
        />

        {preview ? (
          <div className="relative w-full h-32 bg-white/5 rounded overflow-hidden">
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            {uploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <Loader className="w-5 h-5 animate-spin text-cyan-400" />
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 gap-2">
            <Upload className="w-5 h-5" style={{ color: 'var(--admin-text-muted)' }} />
            <div>
              <p className="text-xs font-medium" style={{ color: 'var(--admin-text)' }}>Click to upload</p>
              <p className="text-[10px]" style={{ color: 'var(--admin-text-muted)' }}>or drag and drop</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
