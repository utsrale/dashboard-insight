import re

# File paths
files = [
    r"c:\Users\ASUS\dashboard-toko\dashboard-insight\app\analytics\page.tsx",
    r"c:\Users\ASUS\dashboard-toko\dashboard-insight\app\products\page.tsx",
    r"c:\Users\ASUS\dashboard-toko\dashboard-insight\app\transactions\page.tsx",
    r"c:\Users\ASUS\dashboard-toko\dashboard-insight\app\dashboard\page.tsx",
]

# Replacement patterns
replacements = [
    (r' dark:text-white', ' text-white'),
    (r' dark:text-gray-400', ' text-slate-400'),
    (r' dark:text-gray-300', ' text-slate-300'),
    (r' dark:text-gray-100', ' text-slate-100'),
    (r' dark:text-success-400', ' text-success-400'),
    (r' dark:text-danger-400', ' text-danger-400'),
    (r' dark:text-primary-400', ' text-primary-400'),
    (r' dark:text-warning-300', ' text-warning-300'),
    (r' dark:bg-gray-800', ' bg-slate-800'),
    (r' dark:bg-gray-700', ' bg-slate-700'),
    (r' dark:bg-gray-600', ' bg-slate-600'),
    (r' dark:border-gray-700', ' border-slate-700'),
    (r'text-gray-900 dark:text-white', 'text-white'),
    (r'text-gray-600 dark:text-gray-400', 'text-slate-400'),
    (r'text-gray-700 dark:text-gray-300', 'text-slate-300'),
    (r'text-success-600 dark:text-success-400', 'text-success-400'),
    (r'text-danger-600 dark:text-danger-400', 'text-danger-400'),
    (r'bg-gray-100 dark:bg-gray-700', 'bg-slate-700'),
    (r'bg-gray-200 dark:bg-gray-700', 'bg-slate-600'),
    (r'text-gray-500 dark:text-gray-400', 'text-slate-400'),
]

for file_path in files:
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Apply all replacements
        for pattern, replacement in replacements:
            content = re.sub(pattern, replacement, content)
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"✓ Updated: {file_path}")
    except Exception as e:
        print(f"✗ Error updating {file_path}: {e}")

print("\nAll files processed!")
