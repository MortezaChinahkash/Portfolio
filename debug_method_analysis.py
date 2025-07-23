import os
import re
import glob

def debug_analyze_file(file_path):
    """Debug analysis of a specific file"""
    print(f"\n=== DEBUGGING FILE: {file_path} ===")
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        lines = content.split('\n')
        print(f"Total lines in file: {len(lines)}")
        
        method_count = 0
        
        for i, line in enumerate(lines):
            stripped = line.strip()
            
            # Look for any method-like patterns
            if '(' in stripped and ')' in stripped and not stripped.startswith('//'):
                if ('function' in stripped or 
                    '=>' in stripped or 
                    '{' in stripped or
                    re.match(r'^\s*[a-zA-Z_$][a-zA-Z0-9_$]*\s*\([^)]*\)', stripped)):
                    print(f"Line {i+1}: {stripped[:80]}...")
                    method_count += 1
        
        print(f"Found {method_count} potential methods")
        
    except Exception as e:
        print(f"Error reading file: {e}")

def main():
    # Test with a specific file
    test_file = r"c:\Users\china\OneDrive\Desktop\Developer Akademie\El Pollo Loco\classes.js\character.class.js"
    
    if os.path.exists(test_file):
        debug_analyze_file(test_file)
    else:
        print(f"File not found: {test_file}")
        
        # List all JS files
        script_dir = os.path.dirname(os.path.abspath(__file__))
        js_pattern = os.path.join(script_dir, "**", "*.js")
        js_files = glob.glob(js_pattern, recursive=True)
        
        print(f"\nFound {len(js_files)} JS files:")
        for js_file in js_files[:10]:  # Show first 10
            print(f"  {js_file}")

if __name__ == "__main__":
    main()
