import os
import glob
import re
import shutil
from datetime import datetime

# ANSI Color Codes for colored output
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
        """Colors text"""
        return f"{color}{text}{Colors.RESET}"

def create_backup_folder():
    """Creates a backup folder with timestamp"""
    script_dir = os.path.dirname(os.path.abspath(__file__))
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_dir = os.path.join(script_dir, "backups", f"empty_lines_backup_{timestamp}")
    
    try:
        os.makedirs(backup_dir, exist_ok=True)
        return backup_dir
    except Exception as e:
        print(Colors.colorize(f"❌ ERROR: Could not create backup folder: {e}", Colors.RED))
        return None

def backup_file(file_path: str, backup_dir: str) -> bool:
    """Creates a backup of a file maintaining directory structure"""
    try:
        script_dir = os.path.dirname(os.path.abspath(__file__))
        
        # Get relative path from script directory
        rel_path = os.path.relpath(file_path, script_dir)
        
        # Create backup file path
        backup_file_path = os.path.join(backup_dir, rel_path)
        
        # Create directories if they don't exist
        backup_file_dir = os.path.dirname(backup_file_path)
        os.makedirs(backup_file_dir, exist_ok=True)
        
        # Copy the file
        shutil.copy2(file_path, backup_file_path)
        
        return True
    except Exception as e:
        print(Colors.colorize(f"⚠️ WARNING: Could not backup {file_path}: {e}", Colors.YELLOW))
        return False

def ask_for_backup() -> bool:
    """Asks user if they want to create backups"""
    print(Colors.colorize("🔒 BACKUP OPTION", Colors.BOLD + Colors.CYAN))
    print(Colors.colorize("The Empty Line Remover will modify your files.", Colors.YELLOW))
    print(Colors.colorize("It's recommended to create backups before proceeding.", Colors.YELLOW))
    print()
    
    while True:
        try:
            response = input(Colors.colorize("Create backups before removing empty lines? (y/n): ", Colors.BOLD + Colors.CYAN)).strip().lower()
            
            if response in ['y', 'yes', 'j', 'ja']:
                return True
            elif response in ['n', 'no', 'nein']:
                return False
            else:
                print(Colors.colorize("❌ Please answer with 'y' or 'n'.", Colors.RED))
                
        except (KeyboardInterrupt, EOFError):
            return False

def remove_empty_lines_from_file(file_path, backup_dir=None):
    """
    Remove excessive empty lines from JavaScript/TypeScript files
    Preserves intentional spacing while removing clutter
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Count original empty lines for reporting
        lines = content.split('\n')
        original_empty_lines = sum(1 for line in lines if line.strip() == '')
        
        if original_empty_lines == 0:
            return {
                'file': file_path,
                'original_empty_lines': 0,
                'removed_empty_lines': 0,
                'modified': False,
                'backed_up': False,
                'error': None
            }
        
        # Create backup if backup directory is provided
        backed_up = False
        if backup_dir:
            backed_up = backup_file(file_path, backup_dir)
            if backed_up:
                print(Colors.colorize(f"📋 Backed up: {os.path.basename(file_path)}", Colors.GREEN))
        
        # Remove excessive empty lines
        content = remove_excessive_empty_lines(content)
        
        # Count remaining empty lines
        new_lines = content.split('\n')
        remaining_empty_lines = sum(1 for line in new_lines if line.strip() == '')
        removed_empty_lines = original_empty_lines - remaining_empty_lines
        
        # Only write back if content changed
        modified = content != original_content
        if modified:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
        
        return {
            'file': file_path,
            'original_empty_lines': original_empty_lines,
            'removed_empty_lines': removed_empty_lines,
            'remaining_empty_lines': remaining_empty_lines,
            'modified': modified,
            'backed_up': backed_up,
            'error': None
        }
        
    except Exception as e:
        return {
            'file': file_path,
            'original_empty_lines': 0,
            'removed_empty_lines': 0,
            'remaining_empty_lines': 0,
            'modified': False,
            'backed_up': False,
            'error': str(e)
        }

def remove_excessive_empty_lines(content):
    """
    Remove excessive empty lines while preserving intentional spacing
    SPECIAL RULES:
    - INSIDE functions/methods (between {}): Remove ALL empty lines
    - OUTSIDE functions/methods: Maximum 1 consecutive empty line
    - ALWAYS ensure 1 empty line BEFORE JSDoc comments (/**) for readability
    - NO empty line AFTER JSDoc comments (before the function/method)
    """
    lines = content.split('\n')
    result_lines = []
    
    in_jsdoc = False
    in_multiline_comment = False
    in_string = False
    string_char = None
    brace_level = 0
    inside_function = False
    
    i = 0
    while i < len(lines):
        line = lines[i].rstrip()  # Remove trailing whitespace
        stripped = line.strip()
        
        # Track string literals
        if not in_multiline_comment and not in_jsdoc:
            for j, char in enumerate(line):
                if char in ['"', "'", '`'] and (j == 0 or line[j-1] != '\\'):
                    if not in_string:
                        in_string = True
                        string_char = char
                    elif char == string_char:
                        in_string = False
                        string_char = None
        
        # Track JSDoc comments
        if '/**' in line and not in_string:
            in_jsdoc = True
        if '*/' in line and in_jsdoc and not in_string:
            in_jsdoc = False
        
        # Track multiline comments
        if '/*' in line and not '/**' in line and not in_string:
            in_multiline_comment = True
        if '*/' in line and in_multiline_comment and not in_string:
            in_multiline_comment = False
        
        # Track brace levels and function context
        if not in_string and not in_jsdoc and not in_multiline_comment:
            # Count opening and closing braces
            opening_braces = line.count('{')
            closing_braces = line.count('}')
            
            # Update brace level
            brace_level += opening_braces - closing_braces
            
            # Determine if we're inside a function/method
            if opening_braces > 0:
                # Check if this line looks like a function/method/class definition
                if any(keyword in line for keyword in ['function', 'class', '=>', 'constructor', 'get ', 'set ']):
                    inside_function = True
                elif brace_level > 0:
                    inside_function = True
            elif brace_level == 0:
                inside_function = False
        
        # Handle empty lines
        if stripped == '':
            # Look ahead to count consecutive empty lines
            empty_count = 0
            j = i
            while j < len(lines) and lines[j].strip() == '':
                empty_count += 1
                j += 1
            
            # Get context before and after empty lines
            prev_line = lines[i-1].strip() if i > 0 else ''
            next_line = lines[j].strip() if j < len(lines) else ''
            
            # RULE 1: INSIDE FUNCTIONS -> REMOVE ALL EMPTY LINES
            if inside_function and brace_level > 0:
                keep_count = 0  # Remove all empty lines inside functions
            else:
                # RULE 2: OUTSIDE FUNCTIONS
                keep_count = 0  # Default: remove all empty lines
                
                # SPECIAL CASE: Before JSDoc -> ALWAYS ensure 1 empty line
                if next_line.startswith('/**'):
                    keep_count = 1
                # SPECIAL CASE: After function closing brace -> prepare for potential JSDoc
                elif prev_line == '}':
                    # Look ahead to see if there's a JSDoc coming
                    future_line_index = j
                    while future_line_index < len(lines):
                        future_line = lines[future_line_index].strip()
                        if future_line == '':
                            future_line_index += 1
                            continue
                        elif future_line.startswith('/**'):
                            keep_count = 1  # Keep 1 empty line before JSDoc
                        break
                # SPECIAL CASE: After variable/property declaration -> prepare for potential JSDoc
                elif (prev_line.endswith(';') or prev_line.endswith('];') or prev_line.endswith('};')):
                    # Look ahead to see if there's a JSDoc coming
                    future_line_index = j
                    while future_line_index < len(lines):
                        future_line = lines[future_line_index].strip()
                        if future_line == '':
                            future_line_index += 1
                            continue
                        elif future_line.startswith('/**'):
                            keep_count = 1  # Keep 1 empty line before JSDoc
                        break
            
            # Add the determined number of empty lines
            for _ in range(keep_count):
                result_lines.append('')
            
            # Skip ahead past all the empty lines we just processed
            i = j - 1
        else:
            # Non-empty line - add it
            result_lines.append(line)
        
        i += 1
    
    # Remove empty lines at the very beginning and end of file
    while result_lines and result_lines[0].strip() == '':
        result_lines.pop(0)
    
    while result_lines and result_lines[-1].strip() == '':
        result_lines.pop()
    
    # POST-PROCESSING: Ensure perfect JSDoc spacing
    final_lines = []
    i = 0
    while i < len(result_lines):
        current_line = result_lines[i]
        current_stripped = current_line.strip()
        
        # Add current line
        final_lines.append(current_line)
        
        # RULE: After JSDoc end (*/) -> NO empty line before function
        if current_stripped.endswith('*/') and i + 1 < len(result_lines):
            # Remove any empty lines after JSDoc
            j = i + 1
            while j < len(result_lines) and result_lines[j].strip() == '':
                j += 1
            # Skip to next non-empty line (no gap after JSDoc)
            i = j - 1
        
        # RULE: Before JSDoc start (/**) -> ENSURE 1 empty line (but only if not already there)
        elif i + 1 < len(result_lines):
            next_line = result_lines[i + 1].strip()
            # Check if the next non-empty line is JSDoc
            if next_line.startswith('/**'):
                # Only add empty line if current line is not already empty
                if current_stripped != '':
                    final_lines.append('')
        
        i += 1
    
    # Ensure file ends with single newline
    if final_lines and final_lines[-1] != '':
        final_lines.append('')
    
    return '\n'.join(final_lines)

def scan_and_remove_empty_lines():
    """
    Scan all JavaScript and TypeScript files and remove excessive empty lines
    """
    # Ask for backup confirmation
    create_backup = ask_for_backup()
    
    # Create backup folder if requested
    backup_dir = None
    if create_backup:
        backup_dir = create_backup_folder()
        if backup_dir:
            print(Colors.colorize(f"📁 Backup folder created: {backup_dir}", Colors.GREEN))
        else:
            print(Colors.colorize("❌ Failed to create backup folder. Proceeding without backup.", Colors.RED))
            create_backup = False
    
    # Get the directory where this script is located
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Define file patterns to search for
    file_patterns = [
        "**/*.js",
        "**/*.ts"
    ]
    
    # Collect all files
    all_files = []
    for pattern in file_patterns:
        full_pattern = os.path.join(script_dir, pattern)
        files = glob.glob(full_pattern, recursive=True)
        all_files.extend(files)
    
    # Filter out unwanted directories (including backup folders)
    excluded_dirs = ['node_modules', '.git', 'dist', 'build', '.angular', 'coverage', '.vscode', '.idea', 'backups']
    files = []
    for file_path in all_files:
        # Check if file contains any excluded directory in its path
        should_exclude = any(excluded_dir in file_path for excluded_dir in excluded_dirs)
        if not should_exclude:
            files.append(file_path)
    
    print()
    print(Colors.colorize("🧹 EMPTY LINE REMOVAL ANALYSIS", Colors.BOLD + Colors.CYAN))
    print(Colors.colorize("=" * 50, Colors.CYAN))
    print(Colors.colorize(f"📁 Search directory: {script_dir}", Colors.BLUE))
    print(Colors.colorize(f"📄 JavaScript files: {len([f for f in files if f.endswith('.js')])}", Colors.GREEN))
    print(Colors.colorize(f"📘 TypeScript files: {len([f for f in files if f.endswith('.ts')])}", Colors.GREEN))
    print(Colors.colorize(f"🔒 Backup enabled: {'Yes' if create_backup else 'No'}", Colors.YELLOW if create_backup else Colors.RED))
    print(Colors.colorize("✨ Perfect JSDoc spacing: 1 empty line before, none after", Colors.GREEN))
    print(Colors.colorize("🧹 All empty lines inside functions will be removed", Colors.GREEN))
    print()
    
    # Display file counts by type
    js_files = [f for f in files if f.endswith('.js')]
    ts_files = [f for f in files if f.endswith('.ts')]
    
    js_count_msg = f"JavaScript files: {len(js_files)}"
    ts_count_msg = f"TypeScript files: {len(ts_files)}"
    
    print(js_count_msg)
    print(ts_count_msg)
    print(f"Excluded directories: {', '.join(excluded_dirs)}")
    print("")
    
    # Process each file
    total_original_empty_lines = 0
    total_removed_empty_lines = 0
    total_remaining_empty_lines = 0
    files_modified = 0
    files_with_errors = 0
    files_backed_up = 0
    files_with_empty_lines = []
    
    for file_path in files:
        file_name = os.path.basename(file_path)
        print(Colors.colorize(f"🔍 Processing: {file_name}", Colors.CYAN))
        result = remove_empty_lines_from_file(file_path, backup_dir)
        
        if result['error']:
            files_with_errors += 1
            print(Colors.colorize(f"❌ ERROR processing {file_name}: {result['error']}", Colors.RED))
            continue
        
        if result['backed_up']:
            files_backed_up += 1
        
        if result['original_empty_lines'] > 0:
            files_with_empty_lines.append(result)
            total_original_empty_lines += result['original_empty_lines']
            total_removed_empty_lines += result['removed_empty_lines']
            total_remaining_empty_lines += result['remaining_empty_lines']
            
            if result['modified']:
                files_modified += 1
                print(Colors.colorize(f"  🧹 Removed {result['removed_empty_lines']} excessive empty lines", Colors.GREEN))
                print(Colors.colorize(f"  📏 {result['remaining_empty_lines']} empty lines remaining (optimized)", Colors.BLUE))
            else:
                print(Colors.colorize(f"  ✅ Empty lines already optimized", Colors.GREEN))
        else:
            print(Colors.colorize(f"  ✅ No empty lines found", Colors.GREEN))
    
    # Sort files by number of removed empty lines (most first)
    files_with_empty_lines.sort(key=lambda x: x['removed_empty_lines'], reverse=True)
    
    # Top 10 files with most removed empty lines
    if files_with_empty_lines:
        top_section = "=" * 80
        top_header = "=== TOP 10 FILES WITH MOST REMOVED EMPTY LINES ==="
        
        print(top_section)
        print(top_header)
        print(top_section)
        
        for i, result in enumerate(files_with_empty_lines[:10]):
            if result['removed_empty_lines'] > 0:
                rank_line = f"{i+1:2d}. {os.path.basename(result['file'])} ({result['original_empty_lines']} original, {result['removed_empty_lines']} removed, {result['remaining_empty_lines']} remaining)"
                file_line = f"    File: {result['file']}"
                
                print(rank_line)
                print(file_line)
                print("")
    
    # Overall summary
    print(Colors.colorize("\n" + "=" * 60, Colors.YELLOW))
    print(Colors.colorize("EMPTY LINE REMOVAL SUMMARY", Colors.YELLOW))
    print(Colors.colorize("=" * 60, Colors.YELLOW))
    
    print(Colors.colorize(f"📁 Files analyzed: {len(files)}", Colors.CYAN))
    print(Colors.colorize(f"🎯 Files with empty lines: {len(files_with_empty_lines)}", Colors.CYAN))
    print(Colors.colorize(f"✏️ Files modified: {files_modified}", Colors.GREEN if files_modified > 0 else Colors.BLUE))
    print(Colors.colorize(f"💾 Files backed up: {files_backed_up}", Colors.GREEN if files_backed_up > 0 else Colors.BLUE))
    print(Colors.colorize(f"❌ Files with errors: {files_with_errors}", Colors.RED if files_with_errors > 0 else Colors.GREEN))
    print(Colors.colorize(f"📊 Total empty lines found: {total_original_empty_lines}", Colors.BLUE))
    print(Colors.colorize(f"🧹 Total empty lines removed: {total_removed_empty_lines}", Colors.GREEN))
    print(Colors.colorize(f"📏 Total empty lines remaining: {total_remaining_empty_lines}", Colors.BLUE))
    
    if backup_dir and files_backed_up > 0:
        print(Colors.colorize(f"💾 Backup location: {backup_dir}", Colors.CYAN))
    
    if total_removed_empty_lines == 0:
        print(Colors.colorize("ℹ️ No excessive empty lines found to remove!", Colors.BLUE))
    else:
        optimization_rate = (total_removed_empty_lines / total_original_empty_lines) * 100 if total_original_empty_lines > 0 else 0
        print(Colors.colorize(f"📈 Empty line reduction: {optimization_rate:.1f}%", Colors.GREEN))
        print(Colors.colorize(f"💡 Code is now more compact while maintaining readability!", Colors.GREEN))
    
    # Write summary to file
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    output_file = f"empty_line_removal_report_{timestamp}.txt"
    
    output_lines = [
        "EMPTY LINE REMOVAL REPORT",
        "=" * 60,
        f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}",
        "",
        "OPTIMIZATION RULES:",
        "• ALL empty lines inside functions/methods removed",
        "• Exactly 1 empty line BEFORE JSDoc comments (/**)",
        "• NO empty lines AFTER JSDoc comments", 
        "• Empty lines at file start/end removed",
        "• Clean and consistent code formatting",
        "",
        f"Files analyzed: {len(files)}",
        f"Files with empty lines: {len(files_with_empty_lines)}",
        f"Files modified: {files_modified}",
        f"Files backed up: {files_backed_up}",
        f"Files with errors: {files_with_errors}",
        f"Total empty lines found: {total_original_empty_lines}",
        f"Total empty lines removed: {total_removed_empty_lines}",
        f"Total empty lines remaining: {total_remaining_empty_lines}",
        ""
    ]
    
    if backup_dir and files_backed_up > 0:
        output_lines.append(f"Backup location: {backup_dir}")
        output_lines.append("")
    
    if total_removed_empty_lines > 0:
        optimization_rate = (total_removed_empty_lines / total_original_empty_lines) * 100
        output_lines.append(f"Empty line reduction: {optimization_rate:.1f}%")
        output_lines.append("")
    
    # Add detailed file information
    if files_with_empty_lines:
        output_lines.append("DETAILED FILE RESULTS:")
        output_lines.append("-" * 40)
        for result in sorted(files_with_empty_lines, key=lambda x: x['removed_empty_lines'], reverse=True):
            if result['removed_empty_lines'] > 0:
                output_lines.append(f"File: {result['file']}")
                output_lines.append(f"  Original: {result['original_empty_lines']}, Removed: {result['removed_empty_lines']}, Remaining: {result['remaining_empty_lines']}")
                output_lines.append(f"  Status: {'Modified' if result['modified'] else 'No changes needed'}")
                if result['backed_up']:
                    output_lines.append(f"  Backup: Created")
                output_lines.append("")
    
    try:
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write('\n'.join(output_lines))
        print(Colors.colorize(f"\n💾 Report saved to: {output_file}", Colors.CYAN))
    except Exception as e:
        print(Colors.colorize(f"\n❌ Error saving report: {e}", Colors.RED))

if __name__ == "__main__":
    print(Colors.colorize("🚀 Empty Line Removal Tool", Colors.CYAN))
    print(Colors.colorize("=" * 40, Colors.CYAN))
    print(Colors.colorize("📏 Optimizes empty lines in JS/TS files", Colors.GREEN))
    print(Colors.colorize("✨ Perfect JSDoc spacing: 1 line before, none after", Colors.YELLOW))
    print(Colors.colorize("🧹 Removes ALL empty lines inside functions", Colors.YELLOW))
    print(Colors.colorize("💡 Creates clean and consistent code formatting", Colors.BLUE))
    print(Colors.colorize("⚠️  WARNING: This will modify your files!", Colors.YELLOW))
    print(Colors.colorize("📁 Make sure you have backups or use the backup feature.", Colors.YELLOW))
    print()
    
    # Ask for confirmation
    response = input(Colors.colorize("Do you want to proceed? (y/N): ", Colors.CYAN)).strip().lower()
    if response in ['y', 'yes']:
        scan_and_remove_empty_lines()
        print(Colors.colorize("\n✅ Empty line optimization process completed!", Colors.GREEN))
    else:
        print(Colors.colorize("❌ Operation cancelled.", Colors.RED))
