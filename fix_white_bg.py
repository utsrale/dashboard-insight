import re
import os

# Search for all bg-white and replace with bg-slate-800
files = [
    r"c:\Users\ASUS\dashboard-toko\dashboard-insight\app\dashboard\page.tsx",
    r"c:\Users\ASUS\dashboard-toko\dashboard-insight\app\analytics\page.tsx",
    r"c:\Users\ASUS\dashboard-toko\dashboard-insight\app\transactions\page.tsx",
    r"c:\Users\ASUS\dashboard-toko\dashboard-insight\app\products\page.tsx",
]

replacements = [
    (r'bg-white\s', 'bg-slate-800 '),
    (r'bg-white"', 'bg-slate-800"'),
    (r'border-gray-200', 'border-slate-700'),
    (r'text-gray-900', 'text-white'),
    (r'text-gray-600', 'text-slate-400'),
    (r'text-gray-700', 'text-slate-300'),
    (r'hover:bg-gray-100', 'hover:bg-slate-700'),
]

for file_path in files:
    if os.path.exists(file_path):
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original = content
            for pattern, replacement in replacements:
                content = re.sub(pattern, replacement, content)
            
            if content != original:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"✓ Updated: {file_path}")
            else:
                print(f"○ No changes: {file_path}")
        except Exception as e:
            print(f"✗ Error: {file_path}: {e}")
    else:
        print(f"✗ Not found: {file_path}")

print("\nDone!")
