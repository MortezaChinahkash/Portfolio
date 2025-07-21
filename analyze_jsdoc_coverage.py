import os
import re
import glob

def analyze_jsdoc_coverage(file_path):
    """
    Analyze JSDoc coverage for methods and functions in TypeScript and JavaScript files
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        lines = content.split('\n')
        missing_jsdoc = []
        
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
                'interface' in stripped or
                'enum' in stripped or
                'type ' in stripped or
                (stripped.startswith('class ') and '{' in stripped)):
                i += 1
                continue
            
            # Check for method/function declarations
            if is_method_declaration(stripped, lines, i):
                method_info = analyze_method_jsdoc(lines, i, file_path)
                if method_info and not method_info['has_jsdoc']:
                    missing_jsdoc.append(method_info)
                i = method_info['end_line'] if method_info else i + 1
            else:
                i += 1
        
        return missing_jsdoc
        
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return []

def is_method_declaration(stripped, lines, i):
    """Check if this line is a method/function declaration"""
    # Constructor
    if stripped.startswith('constructor'):
        return True
    
    # Regular method/function with parentheses and either : or {
    if ('(' in stripped and ')' in stripped and 
        ((':' in stripped and ('{' in stripped or 
         (i + 1 < len(lines) and lines[i + 1].strip() == '{'))) or
         stripped.startswith('async ') or
         stripped.startswith('function ') or
         stripped.startswith('const ') or
         stripped.startswith('let ') or
         stripped.startswith('var '))):
        return True
    
    # Angular lifecycle hooks
    if (stripped.startswith('ngOnInit') or 
        stripped.startswith('ngOnDestroy') or 
        stripped.startswith('ngOnChanges') or
        stripped.startswith('ngAfterViewInit') or
        stripped.startswith('ngAfterContentInit') or
        stripped.startswith('ngAfterViewChecked') or
        stripped.startswith('ngAfterContentChecked')):
        return True
    
    # Arrow functions assigned to variables
    if '=>' in stripped and ('=' in stripped or 'const' in stripped):
        return True
    
    return False

def analyze_method_jsdoc(lines, start_line, file_path):
    """Analyze a method for JSDoc documentation"""
    try:
        method_line = lines[start_line].strip()
        
        # Extract method name
        method_name = extract_method_name(method_line)
        if not method_name:
            return None
        
        # Check for JSDoc comment above the method
        has_jsdoc = check_for_jsdoc(lines, start_line)
        
        # Find method boundaries
        brace_count = 0
        method_started = False
        end_line = start_line
        
        i = start_line
        while i < len(lines):
            line = lines[i]
            
            # Count braces to find method boundaries
            open_braces = line.count('{')
            close_braces = line.count('}')
            
            if open_braces > 0:
                method_started = True
            
            brace_count += open_braces - close_braces
            
            # Method ends when brace count returns to 0 or we hit a semicolon for arrow functions
            if method_started and brace_count <= 0:
                end_line = i
                break
            elif '=>' in method_line and ';' in line:
                end_line = i
                break
            
            i += 1
        
        return {
            'file': file_path,
            'method_name': method_name,
            'start_line': start_line + 1,  # 1-based line numbers
            'end_line': end_line + 1,
            'declaration': method_line,
            'has_jsdoc': has_jsdoc,
            'method_type': determine_method_type(method_line)
        }
        
    except Exception as e:
        return None

def check_for_jsdoc(lines, method_line_index):
    """Check if there's a JSDoc comment above the method"""
    # Look backwards from the method line to find JSDoc
    i = method_line_index - 1
    
    # Skip empty lines and decorators
    while i >= 0:
        line = lines[i].strip()
        
        # Empty line - continue looking
        if not line:
            i -= 1
            continue
        
        # Decorator - continue looking
        if line.startswith('@'):
            i -= 1
            continue
        
        # Access modifier line - continue looking
        if line in ['public', 'private', 'protected', 'static', 'readonly']:
            i -= 1
            continue
        
        # Found JSDoc end marker
        if line.endswith('*/'):
            # Look backwards to find JSDoc start
            j = i
            while j >= 0:
                jsdoc_line = lines[j].strip()
                if jsdoc_line.startswith('/**'):
                    return True
                if not (jsdoc_line.startswith('*') or jsdoc_line.startswith('/*') or not jsdoc_line):
                    break
                j -= 1
            break
        
        # Found single line JSDoc
        if line.startswith('/**') and line.endswith('*/'):
            return True
        
        # Found regular comment or other code - stop looking
        if line.startswith('//') or not line.startswith('*'):
            break
        
        i -= 1
    
    return False

def extract_method_name(method_line):
    """Extract method name from declaration line"""
    # Constructor
    if method_line.startswith('constructor'):
        return 'constructor'
    
    # Angular lifecycle hooks
    for hook in ['ngOnInit', 'ngOnDestroy', 'ngOnChanges', 'ngAfterViewInit', 
                'ngAfterContentInit', 'ngAfterViewChecked', 'ngAfterContentChecked']:
        if method_line.startswith(hook):
            return hook
    
    # Arrow functions
    if '=>' in method_line:
        arrow_patterns = [
            r'(const|let|var)\s+(\w+)\s*=',  # const methodName =
            r'(\w+)\s*=\s*\(',  # methodName = (
            r'(\w+)\s*:\s*\(',  # methodName: (
        ]
        for pattern in arrow_patterns:
            match = re.search(pattern, method_line)
            if match:
                return match.group(2) if match.lastindex >= 2 else match.group(1)
    
    # Regular methods/functions
    patterns = [
        r'function\s+(\w+)\s*\(',  # function methodName(
        r'(\w+)\s*\(',  # methodName(
        r'async\s+(\w+)\s*\(',  # async methodName(
        r'private\s+(\w+)\s*\(',  # private methodName(
        r'public\s+(\w+)\s*\(',  # public methodName(
        r'protected\s+(\w+)\s*\(',  # protected methodName(
        r'static\s+(\w+)\s*\(',  # static methodName(
        r'get\s+(\w+)\s*\(',  # get methodName(
        r'set\s+(\w+)\s*\(',  # set methodName(
    ]
    
    for pattern in patterns:
        match = re.search(pattern, method_line)
        if match:
            return match.group(1)
    
    return 'unknown_method'

def determine_method_type(method_line):
    """Determine the type of method for categorization"""
    if method_line.startswith('constructor'):
        return 'Constructor'
    elif any(hook in method_line for hook in ['ngOnInit', 'ngOnDestroy', 'ngOnChanges', 'ngAfterView']):
        return 'Lifecycle Hook'
    elif method_line.startswith('private'):
        return 'Private Method'
    elif method_line.startswith('public'):
        return 'Public Method'
    elif method_line.startswith('protected'):
        return 'Protected Method'
    elif method_line.startswith('static'):
        return 'Static Method'
    elif '=>' in method_line:
        return 'Arrow Function'
    elif method_line.startswith('function'):
        return 'Function'
    elif method_line.startswith('async'):
        return 'Async Method'
    elif 'get ' in method_line:
        return 'Getter'
    elif 'set ' in method_line:
        return 'Setter'
    else:
        return 'Method'

def scan_all_files_for_jsdoc():
    """Scan all TypeScript and JavaScript files for missing JSDoc"""
    # Get the directory where this script is located
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Search for both .ts and .js files recursively from script directory
    ts_pattern = os.path.join(script_dir, "**", "*.ts")
    js_pattern = os.path.join(script_dir, "**", "*.js")
    
    ts_files = glob.glob(ts_pattern, recursive=True)
    js_files = glob.glob(js_pattern, recursive=True)
    all_files = ts_files + js_files
    
    # Filter out node_modules and other unwanted directories
    excluded_dirs = ['node_modules', '.git', 'dist', 'build', '.angular', 'coverage', '.vscode', '.idea']
    files = []
    for file_path in all_files:
        # Check if file contains any excluded directory in its path
        should_exclude = any(excluded_dir in file_path for excluded_dir in excluded_dirs)
        if not should_exclude:
            files.append(file_path)
    
    ts_files_filtered = [f for f in files if f.endswith('.ts')]
    js_files_filtered = [f for f in files if f.endswith('.js')]
    
    # Prepare output content
    output_lines = []
    output_lines.append("JSDOC COVERAGE ANALYSIS REPORT")
    output_lines.append(f"Generated: {os.popen('date /t').read().strip()} {os.popen('time /t').read().strip()}")
    output_lines.append("=" * 80)
    output_lines.append(f"Analyzing {len(files)} TypeScript/JavaScript files for missing JSDoc...")
    output_lines.append(f"Search directory: {script_dir}")
    output_lines.append(f"TypeScript files: {len(ts_files_filtered)}")
    output_lines.append(f"JavaScript files: {len(js_files_filtered)}")
    output_lines.append(f"Excluded directories: {', '.join(excluded_dirs)}")
    output_lines.append("")
    
    print(f"Analyzing {len(files)} TypeScript/JavaScript files for missing JSDoc...")
    print(f"Search directory: {script_dir}")
    print(f"TypeScript files: {len(ts_files_filtered)}")
    print(f"JavaScript files: {len(js_files_filtered)}")
    print(f"Excluded directories: {', '.join(excluded_dirs)}")
    print("")
    
    all_missing_methods = []
    files_with_missing_jsdoc = 0
    
    for file_path in files:
        missing_methods = analyze_jsdoc_coverage(file_path)
        if missing_methods:
            files_with_missing_jsdoc += 1
            all_missing_methods.extend(missing_methods)
            
            file_output = f"File: {file_path}"
            separator = "-" * 80
            
            print(file_output)
            print(separator)
            output_lines.append(file_output)
            output_lines.append(separator)
            
            for method in missing_methods:
                method_info = f"  Method: {method['method_name']} (Line {method['start_line']})"
                method_type = f"     Type: {method['method_type']}"
                declaration = f"     Declaration: {method['declaration'][:70]}..."
                
                print(method_info)
                print(method_type)
                print(declaration)
                print("")
                
                output_lines.append(method_info)
                output_lines.append(method_type)
                output_lines.append(declaration)
                output_lines.append("")
    
    # Group by method type
    methods_by_type = {}
    for method in all_missing_methods:
        method_type = method['method_type']
        if method_type not in methods_by_type:
            methods_by_type[method_type] = []
        methods_by_type[method_type].append(method)
    
    # Summary by method type
    type_section = "=" * 80
    type_header = "=== MISSING JSDOC BY METHOD TYPE ==="
    
    print(type_section)
    print(type_header)
    print(type_section)
    
    output_lines.append(type_section)
    output_lines.append(type_header)
    output_lines.append(type_section)
    
    for method_type, methods in sorted(methods_by_type.items()):
        type_line = f"{method_type}: {len(methods)} methods missing JSDoc"
        print(type_line)
        output_lines.append(type_line)
        
        # Show first few examples
        for i, method in enumerate(methods[:3]):
            example = f"  - {method['method_name']} in {os.path.basename(method['file'])}"
            print(example)
            output_lines.append(example)
        
        if len(methods) > 3:
            more = f"  ... and {len(methods) - 3} more"
            print(more)
            output_lines.append(more)
        print("")
        output_lines.append("")
    
    # Top files with most missing JSDoc
    files_summary = {}
    for method in all_missing_methods:
        file_path = method['file']
        if file_path not in files_summary:
            files_summary[file_path] = []
        files_summary[file_path].append(method)
    
    top_files = sorted(files_summary.items(), key=lambda x: len(x[1]), reverse=True)
    
    top_section = "=" * 80
    top_header = "=== TOP 10 FILES WITH MOST MISSING JSDOC ==="
    
    print(top_section)
    print(top_header)
    print(top_section)
    
    output_lines.append(top_section)
    output_lines.append(top_header)
    output_lines.append(top_section)
    
    for i, (file_path, methods) in enumerate(top_files[:10]):
        rank_line = f"{i+1:2d}. {os.path.basename(file_path)} ({len(methods)} missing)"
        file_line = f"    File: {file_path}"
        
        print(rank_line)
        print(file_line)
        
        output_lines.append(rank_line)
        output_lines.append(file_line)
        
        # Show method names
        method_names = [m['method_name'] for m in methods[:5]]
        methods_line = f"    Methods: {', '.join(method_names)}"
        if len(methods) > 5:
            methods_line += f" ... and {len(methods) - 5} more"
        
        print(methods_line)
        print("")
        
        output_lines.append(methods_line)
        output_lines.append("")
    
    # Overall summary
    summary_header = "=== OVERALL SUMMARY ==="
    files_analyzed = f"Files analyzed: {len(files)}"
    files_missing = f"Files with missing JSDoc: {files_with_missing_jsdoc}"
    total_missing = f"Total methods missing JSDoc: {len(all_missing_methods)}"
    
    print(summary_header)
    print(files_analyzed)
    print(files_missing)
    print(total_missing)
    
    output_lines.append(summary_header)
    output_lines.append(files_analyzed)
    output_lines.append(files_missing)
    output_lines.append(total_missing)
    
    if len(all_missing_methods) == 0:
        perfect_msg = "Perfect! All methods have JSDoc documentation!"
        print(perfect_msg)
        output_lines.append(perfect_msg)
    else:
        coverage_percent = ((len(files) * 10 - len(all_missing_methods)) / (len(files) * 10)) * 100  # Rough estimate
        coverage_msg = f"Estimated JSDoc coverage: {coverage_percent:.1f}%"
        
        print(coverage_msg)
        output_lines.append(coverage_msg)
        
        # Recommendations
        recommendations = [
            "\n=== RECOMMENDATIONS ===",
            "• Add JSDoc comments to all public methods and functions",
            "• Private methods should have at least a brief description",
            "• Include @param and @returns tags for complex methods",
            "• Document any thrown exceptions with @throws",
            "• Use @deprecated for methods planned for removal"
        ]
        
        for rec in recommendations:
            print(rec)
            output_lines.append(rec)
    
    # Write to file
    output_file = "jsdoc_coverage_analysis.txt"
    try:
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write('\n'.join(output_lines))
        print(f"\nResults saved to: {output_file}")
    except Exception as e:
        print(f"\nError saving to file: {e}")

if __name__ == "__main__":
    scan_all_files_for_jsdoc()
