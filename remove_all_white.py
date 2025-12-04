import re
import os

# All page files
files = [
    r"c:\Users\ASUS\dashboard-toko\dashboard-insight\app\dashboard\page.tsx",
    r"c:\Users\ASUS\dashboard-toko\dashboard-insight\app\analytics\page.tsx",
    r"c:\Users\ASUS\dashboard-toko\dashboard-insight\app\transactions\page.tsx",
    r"c:\Users\ASUS\dashboard-toko\dashboard-insight\app\products\page.tsx",
]

# Comprehensive replacements for ALL white/light backgrounds
replacements = [
    # Background colors
    (r'bg-white(["\s])', r'bg-slate-800\1'),
    (r'bg-gray-50(["\s])', r'bg-slate-800\1'),
    (r'bg-gray-100(["\s])', r'bg-slate-700\1'),
    (r'bg-gray-200(["\s])', r'bg-slate-600\1'),
    
    # Border colors
    (r'border-white(["\s])', r'border-slate-600\1'),
    (r'border-gray-100(["\s])', r'border-slate-700\1'),
    (r'border-gray-200(["\s])', r'border-slate-700\1'),
    (r'border-gray-300(["\s])', r'border-slate-600\1'),
    
    # Hover states
    (r'hover:bg-white(["\s])', r'hover:bg-slate-700\1'),
    (r'hover:bg-gray-50(["\s])', r'hover:bg-slate-700\1'),
    (r'hover:bg-gray-100(["\s])', r'hover:bg-slate-700\1'),
    (r'hover:bg-gray-200(["\s])', r'hover:bg-slate-600\1'),
    
    # Focus states
    (r'focus:bg-white(["\s])', r'focus:bg-slate-700\1'),
    
    # Placeholder colors
    (r'placeholder-gray-400', r'placeholder-slate-500'),
    (r'placeholder-gray-500', r'placeholder-slate-400'),
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
                print(f"✓ Updated: {os.path.basename(file_path)}")
            else:
                print(f"○ No changes: {os.path.basename(file_path)}")
        except Exception as e:
            print(f"✗ Error: {os.path.basename(file_path)}: {e}")
    else:
        print(f"✗ Not found: {file_path}")

print("\n✅ All white backgrounds removed!")
