import cloudinary
import cloudinary.uploader
import cloudinary.api
from app.config import settings

def init_cloudinary():
    if not settings.CLOUDINARY_CLOUD_NAME:
        return
        
    cloudinary.config(
        cloud_name=settings.CLOUDINARY_CLOUD_NAME,
        api_key=settings.CLOUDINARY_API_KEY,
        api_secret=settings.CLOUDINARY_API_SECRET,
        secure=True
    )

def upload_image(image_path: str, folder: str = "siripku/articles") -> dict:
    """Upload an image to Cloudinary and return the URL and metadata."""
    init_cloudinary()
    
    # In this pipeline, images are manually uploaded by the user according to the config.
    # This function serves as a utility if we need to programmatically attach an existing image.
    try:
        response = cloudinary.uploader.upload(
            image_path,
            folder=folder,
            use_filename=True,
            unique_filename=True
        )
        return {
            "url": response.get("secure_url"),
            "public_id": response.get("public_id"),
            "width": response.get("width"),
            "height": response.get("height")
        }
    except Exception as e:
        print(f"Cloudinary upload error: {str(e)}")
        return None
