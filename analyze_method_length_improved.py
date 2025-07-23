import os
import re
import glob

def analyze_method_length(file_path):
    """Analyze method/function lengths in JavaScript files"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        lines = content.split('\n')
        long_methods = []
        
        i = 0
        while i < len(lines):
            line = lines[i]
            stripped = line.strip()
            
            # Skip empty lines, comments, and non-method lines
            if (not stripped or 
                stripped.startswith('//') or 
                stripped.startswith('*') or 
                stripped.startswith('/*') or
                stripped.startswith('export ') or
                stripped.startswith('import ') or
                stripped.startswith('@') or
                stripped.startswith('constructor') or  # Skip constructors
                'interface' in stripped or
                'enum' in stripped or
                (stripped.startswith('class ') and '{' in stripped)):
                i += 1
                continue
            
            # Check for method/function declarations
            if is_method_declaration(stripped, lines, i):
                method_info = analyze_method_from_line(lines, i, file_path)
                if method_info and method_info['code_lines'] > 14:
                    long_methods.append(method_info)
                i = method_info['end_line'] if method_info else i + 1
            else:
                i += 1
        
        return long_methods
        
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return []

def is_method_declaration(stripped, lines, i):
    """Check if this line is a method/function declaration"""
    # Skip constructor - allowed to be longer than 14 lines
    if stripped.startswith('constructor'):
        return False
    
    # JavaScript function declarations
    if stripped.startswith('function ') and '(' in stripped:
        return True
    
    # Arrow functions (const funcName = () => {)
    if '=' in stripped and '=>' in stripped and '(' in stripped:
        return True
    
    # Function expressions (const funcName = function() {)
    if '=' in stripped and 'function' in stripped and '(' in stripped:
        return True
    
    # Method declarations in classes/objects
    method_pattern = re.match(r'^\s*[a-zA-Z_$][a-zA-Z0-9_$]*\s*\([^)]*\)\s*\{', stripped)
    if method_pattern:
        return True
    
    # Method declarations spanning multiple lines
    if ('(' in stripped and ')' in stripped and 
        i + 1 < len(lines) and lines[i + 1].strip() == '{'):
        return True
    
    # Async functions and methods
    if stripped.startswith('async ') and '(' in stripped:
        return True
    
    # Static methods
    if stripped.startswith('static ') and '(' in stripped:
        return True
    
    return False

def analyze_method_from_line(lines, start_line, file_path):
    """Analyze a method starting from a specific line"""
    try:
        method_line = lines[start_line].strip()
        
        # Extract method name
        method_name = extract_method_name(method_line)
        if not method_name:
            return None
        
        # Find method boundaries
        brace_count = 0
        method_started = False
        code_lines = 0
        total_lines = 0
        
        i = start_line
        while i < len(lines):
            line = lines[i]
            stripped = line.strip()
            
            # Count braces to find method boundaries
            open_braces = line.count('{')
            close_braces = line.count('}')
            
            if open_braces > 0:
                method_started = True
            
            brace_count += open_braces - close_braces
            
            # Count lines
            total_lines += 1
            
            # Count actual code lines (not empty, not comments, not just braces)
            if (method_started and stripped and 
                not stripped.startswith('//') and 
                not stripped.startswith('*') and 
                not stripped.startswith('/*') and
                not stripped.startswith('*/') and
                stripped != '{' and 
                stripped != '}'):
                code_lines += 1
            
            # Method ends when brace count returns to 0 after starting
            if method_started and brace_count <= 0:
                return {
                    'file': file_path,
                    'method_name': method_name,
                    'start_line': start_line + 1,  # 1-based line numbers
                    'end_line': i + 1,
                    'total_lines': total_lines,
                    'code_lines': code_lines,
                    'declaration': method_line
                }
            
            i += 1
        
        return None
        
    except Exception as e:
        print(f"Error analyzing method at line {start_line}: {e}")
        return None

def extract_method_name(method_line):
    """Extract method name from declaration line"""
    # Function declarations
    if method_line.startswith('function '):
        match = re.search(r'function\s+(\w+)\s*\(', method_line)
        if match:
            return match.group(1)
    
    # Arrow functions (const/let/var funcName = () => {)
    arrow_match = re.search(r'(?:const|let|var)\s+(\w+)\s*=.*=>', method_line)
    if arrow_match:
        return arrow_match.group(1)
    
    # Function expressions (const funcName = function() {)
    func_expr_match = re.search(r'(?:const|let|var)\s+(\w+)\s*=\s*function', method_line)
    if func_expr_match:
        return func_expr_match.group(1)
    
    # Static methods
    static_match = re.search(r'static\s+(\w+)\s*\(', method_line)
    if static_match:
        return static_match.group(1)
    
    # Async functions and methods
    async_match = re.search(r'async\s+(?:function\s+)?(\w+)\s*\(', method_line)
    if async_match:
        return async_match.group(1)
    
    # Object method or class method (methodName() {)
    method_match = re.search(r'^\s*(\w+)\s*\([^)]*\)\s*{', method_line)
    if method_match:
        return method_match.group(1)
    
    # Method declarations without immediate opening brace
    simple_match = re.search(r'^\s*(\w+)\s*\([^)]*\)', method_line)
    if simple_match:
        return simple_match.group(1)
    
    return None

def main():
    """Scan all JavaScript files for long methods"""
    print("METHOD LENGTH ANALYSIS - IMPROVED VERSION")
    print("=" * 60)
    
    # Get the directory where this script is located
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Search for .js files recursively
    js_pattern = os.path.join(script_dir, "**", "*.js")
    all_js_files = glob.glob(js_pattern, recursive=True)
    
    # Filter out directories, backup files, and Python analysis files  
    excluded_dirs = ['node_modules', '.git', 'dist', 'build', '.angular', 'coverage', 'backups', '__pycache__']
    files = []
    for file_path in all_js_files:
        # Check if file contains any excluded directory in its path
        should_exclude = any(excluded_dir in file_path for excluded_dir in excluded_dirs)
        # Ensure it's actually a file, not a directory
        if not should_exclude and os.path.isfile(file_path):
            files.append(file_path)
    
    # Prepare output content for both console and file
    output_lines = []
    output_lines.append("METHOD LENGTH ANALYSIS - IMPROVED VERSION")
    output_lines.append("=" * 60)
    output_lines.append(f"Generated: {os.popen('date /t').read().strip()} {os.popen('time /t').read().strip()}")
    output_lines.append(f"Analyzing {len(files)} JavaScript files for methods > 14 lines...")
    output_lines.append(f"Search directory: {script_dir}")
    output_lines.append(f"Excluded directories: {', '.join(excluded_dirs)}")
    output_lines.append("NOTE: Constructors are excluded from analysis")
    output_lines.append("")
    
    print(f"Analyzing {len(files)} JavaScript files for methods > 14 lines...")
    print(f"Search directory: {script_dir}")
    print(f"Excluded directories: {', '.join(excluded_dirs)}")
    print("NOTE: Constructors are excluded from analysis")
    print("")
    
    all_long_methods = []
    files_with_long_methods = 0
    
    for file_path in files:
        print(f"Processing: {file_path}")
        long_methods = analyze_method_length(file_path)
        if long_methods:
            files_with_long_methods += 1
            all_long_methods.extend(long_methods)
            
            file_output = f"File: {file_path}"
            separator = "-" * 80
            
            print(f"  Found {len(long_methods)} long methods in this file:")
            output_lines.append(file_output)
            output_lines.append(separator)
            
            for method in long_methods:
                method_info = f"  Method: {method['method_name']} (Line {method['start_line']}-{method['end_line']})"
                details = f"     Code lines: {method['code_lines']} | Total lines: {method['total_lines']}"
                declaration = f"     Declaration: {method['declaration'][:70]}..."
                
                print(f"    - {method['method_name']} ({method['code_lines']} lines)")
                output_lines.append(method_info)
                output_lines.append(details)
                output_lines.append(declaration)
                output_lines.append("")
    
    print("\n" + "=" * 60)
    print("SUMMARY")
    print("=" * 60)
    
    summary_header = "=" * 60
    summary_title = "SUMMARY"
    files_analyzed = f"Files analyzed: {len(files)}"
    files_with_long = f"Files with long methods: {files_with_long_methods}"
    total_methods = f"Total methods > 14 lines: {len(all_long_methods)}"
    
    output_lines.append("")
    output_lines.append(summary_header)
    output_lines.append(summary_title)
    output_lines.append(summary_header)
    output_lines.append(files_analyzed)
    output_lines.append(files_with_long)
    output_lines.append(total_methods)
    
    print(files_analyzed)
    print(files_with_long)
    print(total_methods)
    
    if len(all_long_methods) == 0:
        success_msg = "✅ No methods longer than 14 lines found!"
        guidelines_msg = "All methods follow the recommended length guidelines."
        print(success_msg)
        print(guidelines_msg)
        output_lines.append("")
        output_lines.append(success_msg)
        output_lines.append(guidelines_msg)
    else:
        # Sort by code lines (longest first)
        all_long_methods.sort(key=lambda x: x['code_lines'], reverse=True)
        
        top_section = "=" * 60
        top_header = "LONGEST METHODS"
        
        output_lines.append("")
        output_lines.append(top_section)
        output_lines.append(top_header)
        output_lines.append(top_section)
        
        print(f"\n{top_header}")
        print(top_section)
        
        for i, method in enumerate(all_long_methods[:5]):
            method_line = f"{i+1}. {method['method_name']} ({method['code_lines']} lines) - {os.path.basename(method['file'])}"
            file_line = f"   File: {method['file']}"
            line_line = f"   Line: {method['start_line']}-{method['end_line']}"
            
            print(method_line)
            output_lines.append(method_line)
            output_lines.append(file_line)
            output_lines.append(line_line)
            output_lines.append("")
        
        avg_length = sum(m['code_lines'] for m in all_long_methods) / len(all_long_methods)
        longest = max(all_long_methods, key=lambda x: x['code_lines'])
        avg_msg = f"Average length: {avg_length:.1f} lines"
        longest_msg = f"Longest method: {longest['method_name']} ({longest['code_lines']} lines)"
        recommendation = "⚠️  Consider refactoring methods longer than 20-25 lines"
        
        print(f"\n{avg_msg}")
        print(longest_msg)
        print(f"\n{recommendation}")
        
        output_lines.append(avg_msg)
        output_lines.append(longest_msg)
        output_lines.append("")
        output_lines.append(recommendation)
    
    # Write to file
    output_file = "method_length_analysis_improved.txt"
    try:
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write('\n'.join(output_lines))
        print(f"\n📄 Results saved to: {output_file}")
    except Exception as e:
        print(f"\n❌ Error saving to file: {e}")

if __name__ == "__main__":
    main()
