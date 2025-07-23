import os
import glob

# ANSI Color Codes für farbige Ausgabe
class Colors:
    RED = '\033[91m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    MAGENTA = '\033[95m'
    CYAN = '\033[96m'
    WHITE = '\033[97m'
    BOLD = '\033[1m'
    RESET = '\033[0m'
    
    @staticmethod
    def colorize(text: str, color: str) -> str:
        return f"{color}{text}{Colors.RESET}"

def analyze_file_length(file_path):
    """
    Analyze file lengths for HTML, CSS, SCSS, SASS, JS, TS files
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            lines = f.readlines()
        
        total_lines = len(lines)
        
        # Count non-empty lines
        non_empty_lines = sum(1 for line in lines if line.strip())
        
        # Count comment lines and JSDoc separately
        comment_lines = 0
        jsdoc_lines = 0
        in_multiline_comment = False
        in_jsdoc_block = False
        
        for line in lines:
            stripped = line.strip()
            
            # Check for JSDoc start
            if stripped.startswith('/**'):
                in_jsdoc_block = True
                jsdoc_lines += 1
                continue
            
            # Check for multiline comment start (but not JSDoc)
            elif stripped.startswith('/*') and not stripped.startswith('/**'):
                in_multiline_comment = True
                comment_lines += 1
                continue
            
            # Check for comment/JSDoc end
            elif stripped.endswith('*/'):
                if in_jsdoc_block:
                    jsdoc_lines += 1
                    in_jsdoc_block = False
                elif in_multiline_comment:
                    comment_lines += 1
                    in_multiline_comment = False
                continue
            
            # Lines inside JSDoc block
            elif in_jsdoc_block:
                jsdoc_lines += 1
            
            # Lines inside multiline comment block
            elif in_multiline_comment:
                comment_lines += 1
            
            # Single line comments and other comment types
            elif (stripped.startswith('//') or  # JS/TS single line comments
                  stripped.startswith('*') or   # continuation of multiline comments
                  stripped.startswith('<!--') or  # HTML comments
                  stripped.startswith('#')):    # SCSS/SASS comments
                comment_lines += 1
        
        # Calculate code lines (non-empty, non-comment, non-jsdoc)
        code_lines = non_empty_lines - comment_lines - jsdoc_lines
        
        return {
            'file': file_path,
            'total_lines': total_lines,
            'non_empty_lines': non_empty_lines,
            'comment_lines': comment_lines,
            'jsdoc_lines': jsdoc_lines,
            'code_lines': code_lines,
            'file_type': get_file_type(file_path)
        }
        
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return None

def get_file_type(file_path):
    """Get the file type based on extension"""
    extension = os.path.splitext(file_path)[1].lower()
    type_mapping = {
        '.html': 'HTML',
        '.css': 'CSS',
        '.scss': 'SCSS',
        '.sass': 'SASS',
        '.js': 'JavaScript',
        '.ts': 'TypeScript'
    }
    return type_mapping.get(extension, 'Unknown')

def scan_all_files():
    """Scan all HTML, CSS, SCSS, SASS, JS, TS files for length analysis"""
    # Get the directory where this script is located
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Define file patterns to search for
    file_patterns = [
        "**/*.html",
        "**/*.css", 
        "**/*.scss",
        "**/*.sass",
        "**/*.js",
        "**/*.ts"
    ]
    
    # Collect all files
    all_files = []
    for pattern in file_patterns:
        full_pattern = os.path.join(script_dir, pattern)
        files = glob.glob(full_pattern, recursive=True)
        all_files.extend(files)
    
    # Filter out unwanted directories
    excluded_dirs = ['node_modules', '.git', 'dist', 'build', '.angular', 'coverage', '.vscode', '.idea']
    files = []
    for file_path in all_files:
        # Check if file contains any excluded directory in its path
        should_exclude = any(excluded_dir in file_path for excluded_dir in excluded_dirs)
        if not should_exclude:
            files.append(file_path)
    
    # Group files by type
    files_by_type = {
        'HTML': [f for f in files if f.endswith('.html')],
        'CSS': [f for f in files if f.endswith('.css')],
        'SCSS': [f for f in files if f.endswith('.scss')],
        'SASS': [f for f in files if f.endswith('.sass')],
        'JavaScript': [f for f in files if f.endswith('.js')],
        'TypeScript': [f for f in files if f.endswith('.ts')]
    }
    
    # Prepare output content
    output_lines = []
    output_lines.append("FILE LENGTH ANALYSIS REPORT")
    output_lines.append(f"Generated: {os.popen('date /t').read().strip()} {os.popen('time /t').read().strip()}")
    output_lines.append("=" * 80)
    output_lines.append(f"Analyzing {len(files)} files for length > 400 lines...")
    output_lines.append(f"Search directory: {script_dir}")
    
    # Display file counts by type
    for file_type, type_files in files_by_type.items():
        if type_files:
            count_msg = f"{file_type} files: {len(type_files)}"
            print(count_msg)
            output_lines.append(count_msg)
    
    output_lines.append(f"Excluded directories: {', '.join(excluded_dirs)}")
    output_lines.append("")
    print(f"Excluded directories: {', '.join(excluded_dirs)}")
    print("")
    
    all_large_files = []
    files_over_400 = 0
    
    # Analyze each file
    for file_path in files:
        file_info = analyze_file_length(file_path)
        if file_info and file_info['total_lines'] > 400:
            files_over_400 += 1
            all_large_files.append(file_info)
            
            file_output = f"File: {file_path}"
            separator = "-" * 80
            
            print(file_output)
            print(separator)
            output_lines.append(file_output)
            output_lines.append(separator)
            
            details = f"  Type: {file_info['file_type']} | Total lines: {file_info['total_lines']}"
            breakdown = f"  Non-empty: {file_info['non_empty_lines']} | Comments: {file_info['comment_lines']} | JSDoc: {file_info['jsdoc_lines']} | Code: {file_info['code_lines']}"
            
            print(details)
            print(breakdown)
            print("")
            
            output_lines.append(details)
            output_lines.append(breakdown)
            output_lines.append("")
    
    # Sort by total lines (largest first)
    all_large_files.sort(key=lambda x: x['total_lines'], reverse=True)
    
    # Top 10 largest files
    top_section = "=" * 80
    top_header = "=== TOP 10 LARGEST FILES ==="
    
    print(top_section)
    print(top_header)
    print(top_section)
    
    output_lines.append(top_section)
    output_lines.append(top_header)
    output_lines.append(top_section)
    
    for i, file_info in enumerate(all_large_files[:10]):
        rank_line = f"{i+1:2d}. {os.path.basename(file_info['file'])} ({file_info['total_lines']} lines)"
        type_line = f"    Type: {file_info['file_type']}"
        file_line = f"    File: {file_info['file']}"
        
        print(rank_line)
        print(type_line)
        print(file_line)
        print("")
        
        output_lines.append(rank_line)
        output_lines.append(type_line)
        output_lines.append(file_line)
        output_lines.append("")
    
    # Summary by file type
    summary_header = "=== SUMMARY BY FILE TYPE ==="
    print(summary_header)
    output_lines.append(summary_header)
    
    type_summary = {}
    for file_info in all_large_files:
        file_type = file_info['file_type']
        if file_type not in type_summary:
            type_summary[file_type] = {
                'count': 0,
                'total_lines': 0,
                'max_lines': 0,
                'files': []
            }
        type_summary[file_type]['count'] += 1
        type_summary[file_type]['total_lines'] += file_info['total_lines']
        type_summary[file_type]['max_lines'] = max(type_summary[file_type]['max_lines'], file_info['total_lines'])
        type_summary[file_type]['files'].append(file_info)
    
    for file_type in ['HTML', 'CSS', 'SCSS', 'SASS', 'JavaScript', 'TypeScript']:
        if file_type in type_summary:
            data = type_summary[file_type]
            avg_lines = data['total_lines'] / data['count']
            type_line = f"{file_type}: {data['count']} files > 400 lines (avg: {avg_lines:.1f}, max: {data['max_lines']})"
        else:
            type_line = f"{file_type}: 0 files > 400 lines"
        
        print(type_line)
        output_lines.append(type_line)
    
    # Overall summary
    overall_header = "\n=== OVERALL SUMMARY ==="
    files_analyzed = f"Files analyzed: {len(files)}"
    files_over_limit = f"Files over 400 lines: {files_over_400}"
    
    print(overall_header)
    print(files_analyzed)
    print(files_over_limit)
    
    output_lines.append(overall_header)
    output_lines.append(files_analyzed)
    output_lines.append(files_over_limit)
    
    if files_over_400 == 0:
        no_large_files_msg = "No files longer than 400 lines found!"
        print(no_large_files_msg)
        output_lines.append(no_large_files_msg)
    else:
        avg_length = sum(f['total_lines'] for f in all_large_files) / len(all_large_files)
        largest = max(all_large_files, key=lambda x: x['total_lines'])
        avg_msg = f"Average length of large files: {avg_length:.1f} lines"
        largest_msg = f"Largest file: {os.path.basename(largest['file'])} ({largest['total_lines']} lines)"
        
        print(avg_msg)
        print(largest_msg)
        
        output_lines.append(avg_msg)
        output_lines.append(largest_msg)
        
        # Recommendations
        recommendations = [
            "\n=== RECOMMENDATIONS ===",
            "• Files > 500 lines: Consider splitting into multiple files",
            "• HTML files > 400 lines: Break into components or templates", 
            "• CSS/SCSS files > 600 lines: Use modular architecture (BEM, modules)",
            "• JS/TS files > 400 lines: Split into smaller modules or services"
        ]
        
        for rec in recommendations:
            print(rec)
            output_lines.append(rec)
    
    # Write to file
    output_file = "file_length_analysis.txt"
    try:
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write('\n'.join(output_lines))
        print(f"\nResults saved to: {output_file}")
    except Exception as e:
        print(f"\nError saving to file: {e}")

if __name__ == "__main__":
    scan_all_files()
