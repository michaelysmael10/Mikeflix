import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadVideo = async (file: File) => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'video',
          folder: 'streamflix/videos',
          transformation: [
            { quality: 'auto', fetch_format: 'auto' },
            { width: 1920, height: 1080, crop: 'limit' }
          ]
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });
  } catch (error) {
    console.error('Error uploading video:', error);
    throw error;
  }
};

export const uploadImage = async (file: File) => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'image',
          folder: 'streamflix/thumbnails',
          transformation: [
            { quality: 'auto', fetch_format: 'auto' },
            { width: 1280, height: 720, crop: 'fill', gravity: 'center' }
          ]
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

export const getVideoUrl = (publicId: string) => {
  return cloudinary.url(publicId, {
    resource_type: 'video',
    quality: 'auto',
    fetch_format: 'auto',
  });
};

export const getImageUrl = (publicId: string) => {
  return cloudinary.url(publicId, {
    resource_type: 'image',
    quality: 'auto',
    fetch_format: 'auto',
  });
};

export default cloudinary;