import os
import re
from PIL import Image

ASSETS_DIR = os.path.join(os.path.dirname(__file__), "..", "src", "assets")
SRC_DIR = os.path.join(os.path.dirname(__file__), "..", "src")

def convert_assets_to_webp():
    files = os.listdir(ASSETS_DIR)
    replacements = {}
    
    for file in files:
        filepath = os.path.join(ASSETS_DIR, file)
        if not os.path.isfile(filepath):
            continue
        
        name, ext = os.path.splitext(file)
        ext_lower = ext.lower()
        
        # Skip videos or already webp or logos that need PNG transparency
        if ext_lower in [".mov", ".webp"] or file.lower().startswith("logo"):
            continue
        
        webp_filename = f"{name}.webp"
        webp_filepath = os.path.join(ASSETS_DIR, webp_filename)
        
        try:
            with Image.open(filepath) as img:
                has_alpha = img.mode in ("RGBA", "LA") or (img.mode == "P" and "transparency" in img.info)
                if has_alpha:
                    img = img.convert("RGBA")
                    img.save(webp_filepath, "WEBP", quality=80, method=6)
                else:
                    img = img.convert("RGB")
                    img.save(webp_filepath, "WEBP", quality=72, method=6)
            
            orig_size = os.path.getsize(filepath)
            new_size = os.path.getsize(webp_filepath)
            print(f"[WEBP] Converted {file} -> {webp_filename}: {orig_size / 1024:.1f} KB -> {new_size / 1024:.1f} KB")
            
            replacements[file] = webp_filename
            
            # Remove original non-webp file
            if os.path.exists(filepath) and file != webp_filename:
                os.remove(filepath)
                
        except Exception as e:
            print(f"[FAIL] Error converting {file}: {e}")

    # Update source code imports
    for root, _, src_files in os.walk(SRC_DIR):
        for sfile in src_files:
            if sfile.endswith((".ts", ".tsx", ".js", ".jsx")):
                sfpath = os.path.join(root, sfile)
                with open(sfpath, "r", encoding="utf-8") as f:
                    content = f.read()
                
                new_content = content
                for orig, webp in replacements.items():
                    new_content = new_content.replace(orig, webp)
                
                if new_content != content:
                    with open(sfpath, "w", encoding="utf-8") as f:
                        f.write(new_content)
                    print(f"[CODE] Updated references in {sfile}")

if __name__ == "__main__":
    convert_assets_to_webp()
