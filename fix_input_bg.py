import re
import os

files = [
    r"c:\Users\ASUS\dashboard-toko\dashboard-insight\app\dashboard\page.tsx",
    r"c:\Users\ASUS\dashboard-toko\dashboard-insight\app\analytics\page.tsx",
    r"c:\Users\ASUS\dashboard-toko\dashboard-insight\app\transactions\page.tsx",
    r"c:\Users\ASUS\dashboard-toko\dashboard-insight\app\products\page.tsx",
]

for file_path in files:
    if os.path.exists(file_path):
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original = content
            
            # Fix input fields - add bg-slate-800 text-white if missing
            # Match input className that has border but no bg
            content = re.sub(
                r'(className="[^"]*)(border[^"]*)"(\s*/>|\s*\n)',
                lambda m: m.group(1) + m.group(2) + ' bg-slate-800 text-white"' + m.group(3) if 'bg-' not in m.group(2) else m.group(0),
                content
            )
            
            # Also handle textareas
            content = re.sub(
                r'(<textarea[^>]*className="[^"]*)(border[^"]*)"',
                lambda m: m.group(1) + m.group(2) + ' bg-slate-800 text-white"' if 'bg-' not in m.group(2) else m.group(0),
                content
            )
            
            if content != original:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"✓ Fixed inputs in: {os.path.basename(file_path)}")
            else:
                print(f"○ No input fixes needed: {os.path.basename(file_path)}")
        except Exception as e:
            print(f"✗ Error: {os.path.basename(file_path)}: {e}")

print("\n✅ All input fields fixed!")
