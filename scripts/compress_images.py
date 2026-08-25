import os
import glob
from PIL import Image
import pillow_heif

# Register HEIC opener with Pillow
pillow_heif.register_heif_opener()

ASSETS_DIR = os.path.join(os.path.dirname(__file__), "..", "src", "assets")
PUBLIC_DIR = os.path.join(os.path.dirname(__file__), "..", "public")

TARGET_MAX_BYTES = 45 * 1024  # 45 KB target limit for portfolio photos

def compress_png_logo(filepath, target_path, max_dim=800):
    """Compress PNG images (including transparent logos) without loss of transparency."""
    with Image.open(filepath) as img:
        w, h = img.size
        if w > max_dim or h > max_dim:
            if w >= h:
                new_w = max_dim
                new_h = int(h * (max_dim / w))
            else:
                new_h = max_dim
                new_w = int(w * (max_dim / h))
            img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
        
        # Check if file is a photo (no alpha channel or opaque)
        has_alpha = img.mode in ("RGBA", "LA") or (img.mode == "P" and "transparency" in img.info)
        if has_alpha:
            # Preserve transparency for logos
            quantized = img.quantize(colors=256, method=Image.Quantize.FASTOCTREE)
            quantized.save(target_path, "PNG", optimize=True)
        else:
            # Compress as RGB JPEG inside the container if opaque
            img = img.convert("RGB")
            img.save(target_path, "PNG", optimize=True)

def compress_jpeg_photo(filepath, target_path, target_max_bytes=TARGET_MAX_BYTES):
    """Compress JPEG/photo images to high-efficiency ~45KB target."""
    with Image.open(filepath) as img:
        img = img.convert("RGB")
        max_dim = 960
        quality = 72
        
        while True:
            w, h = img.size
            if w > max_dim or h > max_dim:
                if w >= h:
                    new_w = max_dim
                    new_h = int(h * (max_dim / w))
                else:
                    new_h = max_dim
                    new_w = int(w * (max_dim / h))
                resized_img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
            else:
                resized_img = img.copy()
            
            resized_img.save(target_path, "JPEG", quality=quality, optimize=True, progressive=True)
            size = os.path.getsize(target_path)
            
            if size <= target_max_bytes or (quality <= 45 and max_dim <= 640):
                break
            
            if quality > 55:
                quality -= 6
            else:
                max_dim = int(max_dim * 0.85)
                quality = 55

def process_directory(directory_path, dir_label):
    print(f"\nCompressing images in {dir_label}: {directory_path}")
    files = os.listdir(directory_path)
    
    total_orig_size = 0
    total_new_size = 0
    processed_count = 0

    for file in files:
        filepath = os.path.join(directory_path, file)
        if not os.path.isfile(filepath):
            continue
        
        ext = os.path.splitext(file)[1].lower()
        if ext not in [".jpg", ".jpeg", ".png", ".heic"]:
            continue
        
        orig_size = os.path.getsize(filepath)
        total_orig_size += orig_size
        
        try:
            if ext == ".heic":
                target_file = os.path.splitext(file)[0] + ".jpg"
                target_path = os.path.join(directory_path, target_file)
                compress_jpeg_photo(filepath, target_path)
                if os.path.exists(filepath):
                    os.remove(filepath)
            elif ext == ".png":
                target_file = file
                target_path = filepath
                compress_png_logo(filepath, target_path)
            else:
                target_file = file
                target_path = filepath
                compress_jpeg_photo(filepath, target_path)

            new_size = os.path.getsize(target_path)
            total_new_size += new_size
            processed_count += 1
            
            print(f"[{dir_label}] Processed {file} -> {target_file}: {orig_size / 1024:.1f} KB -> {new_size / 1024:.1f} KB")

        except Exception as e:
            print(f"[{dir_label}] Failed to process {file}: {e}")

    print("-" * 50)
    print(f"[{dir_label}] Processed {processed_count} images.")
    print(f"[{dir_label}] Original total: {total_orig_size / 1024 / 1024:.2f} MB")
    print(f"[{dir_label}] Compressed total: {total_new_size / 1024 / 1024:.2f} MB")
    if total_orig_size > 0:
        saved_pct = (1 - (total_new_size / total_orig_size)) * 100
        print(f"[{dir_label}] Space Saved: {saved_pct:.1f}%")

def compress_all():
    process_directory(ASSETS_DIR, "src/assets")
    process_directory(PUBLIC_DIR, "public")

if __name__ == "__main__":
    compress_all()
