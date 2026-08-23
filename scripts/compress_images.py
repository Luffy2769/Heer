import os
import glob
from PIL import Image
import pillow_heif

# Register HEIC opener with Pillow
pillow_heif.register_heif_opener()

ASSETS_DIR = os.path.join(os.path.dirname(__file__), "..", "src", "assets")
TARGET_MAX_BYTES = 100 * 1024  # 100 KB target limit

def compress_image_to_target(filepath, target_path):
    with Image.open(filepath) as img:
        img = img.convert("RGB")
        
        # Start with max dimension 1280px
        max_dim = 1280
        quality = 75
        
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
            
            resized_img.save(target_path, "JPEG", quality=quality, optimize=True)
            size = os.path.getsize(target_path)
            
            # If size is under target or we hit lower bounds, stop
            if size <= TARGET_MAX_BYTES or (quality <= 40 and max_dim <= 800):
                break
            
            # Adjust parameters for next iteration
            if quality > 50:
                quality -= 8
            else:
                max_dim = int(max_dim * 0.85)
                quality = 65

def compress_images():
    print(f"Compressing images to ~100KB max in: {ASSETS_DIR}")
    files = os.listdir(ASSETS_DIR)
    
    total_orig_size = 0
    total_new_size = 0
    processed_count = 0

    for file in files:
        filepath = os.path.join(ASSETS_DIR, file)
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
                target_path = os.path.join(ASSETS_DIR, target_file)
            else:
                target_file = file
                target_path = filepath

            compress_image_to_target(filepath, target_path)

            if ext == ".heic" and os.path.exists(filepath):
                os.remove(filepath)
            
            new_size = os.path.getsize(target_path)
            total_new_size += new_size
            processed_count += 1
            
            print(f"[OK] Processed {file} -> {target_file}: {orig_size / 1024:.1f} KB -> {new_size / 1024:.1f} KB")

        except Exception as e:
            print(f"[FAIL] Failed to process {file}: {e}")

    print("\n" + "="*50)
    print(f"Processed {processed_count} images.")
    print(f"Original total size: {total_orig_size / 1024 / 1024:.2f} MB")
    print(f"Compressed total size: {total_new_size / 1024 / 1024:.2f} MB")
    if total_orig_size > 0:
        saved_pct = (1 - (total_new_size / total_orig_size)) * 100
        print(f"Space Saved: {saved_pct:.1f}%")
    print("="*50)

if __name__ == "__main__":
    compress_images()
