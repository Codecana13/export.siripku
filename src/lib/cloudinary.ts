export interface CloudinaryUploadResponse {
  public_id: string;
  version: number;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: any[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  folder: string;
  original_filename: string;
  path: string;
  thumbnail_url: string;
}

export async function uploadToCloudinary(file: File): Promise<CloudinaryUploadResponse> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload image');
  }

  return response.json();
}

export function getCloudinaryUrl(publicId: string, options?: {
  width?: number;
  height?: number;
  crop?: string;
  quality?: string;
}): string {
  const baseUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
  
  const transformations = [];
  
  if (options?.width) transformations.push(`w_${options.width}`);
  if (options?.height) transformations.push(`h_${options.height}`);
  if (options?.crop) transformations.push(`c_${options.crop}`);
  if (options?.quality) transformations.push(`q_${options.quality}`);
  
  const transform = transformations.length > 0 ? `/${transformations.join(',')}` : '';
  
  return `${baseUrl}${transform}/${publicId}`;
}
