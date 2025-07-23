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
    backup_dir = os.path.join(script_dir, "backups", f"console_log_backup_{timestamp}")
    
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
    print(Colors.colorize("The Console.log Remover will modify your files.", Colors.YELLOW))
    print(Colors.colorize("It's recommended to create backups before proceeding.", Colors.YELLOW))
    print()
    
    while True:
        try:
            response = input(Colors.colorize("Create backups before removing console.logs? (y/n): ", Colors.BOLD + Colors.CYAN)).strip().lower()
            
            if response in ['y', 'yes', 'j', 'ja']:
                return True
            elif response in ['n', 'no', 'nein']:
                return False
            else:
                print(Colors.colorize("❌ Please answer with 'y' or 'n'.", Colors.RED))
                
        except (KeyboardInterrupt, EOFError):
            return False

def remove_console_logs_from_file(file_path, backup_dir=None):
    """
    Remove console.log statements from JavaScript/TypeScript files
    Handles various console.log patterns while preserving code structure
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Count original console.log occurrences for reporting
        original_count = len(re.findall(r'console\.log\s*\(', content))
        
        if original_count == 0:
            return {
                'file': file_path,
                'original_logs': 0,
                'removed_logs': 0,
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
        
        # Pattern 1: Simple single-line console.log statements
        # Matches: console.log('message'); or console.log(variable);
        content = re.sub(r'^\s*console\.log\s*\([^)]*\);\s*$', '', content, flags=re.MULTILINE)
        
        # Pattern 2: Console.log without semicolon at end of line
        content = re.sub(r'^\s*console\.log\s*\([^)]*\)\s*$', '', content, flags=re.MULTILINE)
        
        # Pattern 3: Console.log with complex parameters (template literals, function calls, etc.)
        # This handles multiline console.log with balanced parentheses
        def remove_multiline_console_logs(text):
            lines = text.split('\n')
            result_lines = []
            i = 0
            
            while i < len(lines):
                line = lines[i]
                stripped = line.strip()
                
                # Check if line starts with console.log
                if re.match(r'^\s*console\.log\s*\(', line):
                    # Count parentheses to find the complete statement
                    paren_count = 0
                    log_lines = []
                    j = i
                    
                    while j < len(lines):
                        current_line = lines[j]
                        log_lines.append(current_line)
                        
                        # Count parentheses in this line
                        for char in current_line:
                            if char == '(':
                                paren_count += 1
                            elif char == ')':
                                paren_count -= 1
                        
                        # If parentheses are balanced and we found at least one opening paren
                        if paren_count == 0 and len(log_lines) > 0:
                            # Skip all these lines (they form the complete console.log)
                            i = j + 1
                            break
                        
                        j += 1
                    
                    # If we couldn't balance parentheses, treat as single line
                    if paren_count != 0:
                        result_lines.append(line)
                        i += 1
                else:
                    result_lines.append(line)
                    i += 1
            
            return '\n'.join(result_lines)
        
        content = remove_multiline_console_logs(content)
        
        # Pattern 4: Inline console.log in expressions (more complex)
        # Handle: someFunction(console.log('debug'), otherParam)
        # This is trickier and might need manual review
        
        # Pattern 5: Console.log with chained methods
        # Remove: console.log().someMethod() -> .someMethod()
        content = re.sub(r'console\.log\s*\([^)]*\)\.', '', content)
        
        # Clean up excessive empty lines (more than 2 consecutive empty lines)
        content = re.sub(r'\n\s*\n\s*\n\s*\n+', '\n\n\n', content)
        
        # Count remaining console.log occurrences
        remaining_count = len(re.findall(r'console\.log\s*\(', content))
        removed_count = original_count - remaining_count
        
        # Only write back if content changed
        modified = content != original_content
        if modified:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
        
        return {
            'file': file_path,
            'original_logs': original_count,
            'removed_logs': removed_count,
            'remaining_logs': remaining_count,
            'modified': modified,
            'backed_up': backed_up,
            'error': None
        }
        
    except Exception as e:
        return {
            'file': file_path,
            'original_logs': 0,
            'removed_logs': 0,
            'remaining_logs': 0,
            'modified': False,
            'backed_up': False,
            'error': str(e)
        }

def scan_and_remove_console_logs():
    """
    Scan all JavaScript and TypeScript files and remove console.log statements
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
    print(Colors.colorize("🧹 CONSOLE.LOG REMOVAL ANALYSIS", Colors.BOLD + Colors.CYAN))
    print(Colors.colorize("=" * 50, Colors.CYAN))
    print(Colors.colorize(f"📁 Search directory: {script_dir}", Colors.BLUE))
    print(Colors.colorize(f"📄 JavaScript files: {len([f for f in files if f.endswith('.js')])}", Colors.GREEN))
    print(Colors.colorize(f"📘 TypeScript files: {len([f for f in files if f.endswith('.ts')])}", Colors.GREEN))
    print(Colors.colorize(f"🔒 Backup enabled: {'Yes' if create_backup else 'No'}", Colors.YELLOW if create_backup else Colors.RED))
    print()
    
    # Prepare output content
    output_lines = []
    output_lines.append("CONSOLE.LOG REMOVAL REPORT")
    output_lines.append(f"Generated: {os.popen('date /t').read().strip()} {os.popen('time /t').read().strip()}")
    output_lines.append("=" * 80)
    output_lines.append(f"Analyzing {len(files)} JavaScript/TypeScript files for console.log removal...")
    output_lines.append(f"Search directory: {script_dir}")
    
    # Display file counts by type
    js_files = [f for f in files if f.endswith('.js')]
    ts_files = [f for f in files if f.endswith('.ts')]
    
    js_count_msg = f"JavaScript files: {len(js_files)}"
    ts_count_msg = f"TypeScript files: {len(ts_files)}"
    
    print(js_count_msg)
    print(ts_count_msg)
    output_lines.append(js_count_msg)
    output_lines.append(ts_count_msg)
    
    output_lines.append(f"Excluded directories: {', '.join(excluded_dirs)}")
    output_lines.append("")
    print(f"Excluded directories: {', '.join(excluded_dirs)}")
    print("")
    
    # Process each file
    total_original_logs = 0
    total_removed_logs = 0
    total_remaining_logs = 0
    files_modified = 0
    files_with_errors = 0
    files_backed_up = 0
    files_with_logs = []
    
    for file_path in files:
        file_name = os.path.basename(file_path)
        print(Colors.colorize(f"🔍 Processing: {file_name}", Colors.CYAN))
        result = remove_console_logs_from_file(file_path, backup_dir)
        
        if result['error']:
            files_with_errors += 1
            print(Colors.colorize(f"❌ ERROR processing {file_name}: {result['error']}", Colors.RED))
            continue
        
        if result['backed_up']:
            files_backed_up += 1
        
        if result['original_logs'] > 0:
            files_with_logs.append(result)
            total_original_logs += result['original_logs']
            total_removed_logs += result['removed_logs']
            total_remaining_logs += result['remaining_logs']
            
            if result['modified']:
                files_modified += 1
                print(Colors.colorize(f"  🧹 Removed {result['removed_logs']} console.logs", Colors.GREEN))
                if result['remaining_logs'] > 0:
                    print(Colors.colorize(f"  ⚠️ {result['remaining_logs']} console.logs remaining", Colors.YELLOW))
            else:
                print(Colors.colorize(f"  ℹ️ {result['original_logs']} console.logs found but couldn't be removed", Colors.BLUE))
        
        if result['original_logs'] > 0:
            files_with_logs.append(result)
        else:
            print(Colors.colorize(f"  ✅ No console.logs found", Colors.GREEN))
    
    # Sort files by number of original console.logs (most first)
    files_with_logs.sort(key=lambda x: x['original_logs'], reverse=True)
    
    # Top 10 files with most console.logs
    if files_with_logs:
        top_section = "=" * 80
        top_header = "=== TOP 10 FILES WITH MOST CONSOLE.LOGS (ORIGINAL) ==="
        
        print(top_section)
        print(top_header)
        print(top_section)
        
        output_lines.append(top_section)
        output_lines.append(top_header)
        output_lines.append(top_section)
        
        for i, result in enumerate(files_with_logs[:10]):
            rank_line = f"{i+1:2d}. {os.path.basename(result['file'])} ({result['original_logs']} original, {result['removed_logs']} removed, {result['remaining_logs']} remaining)"
            file_line = f"    File: {result['file']}"
            
            print(rank_line)
            print(file_line)
            print("")
            
            output_lines.append(rank_line)
            output_lines.append(file_line)
            output_lines.append("")
    
    # Files with remaining console.logs (need manual review)
    files_with_remaining = [f for f in files_with_logs if f['remaining_logs'] > 0]
    if files_with_remaining:
        remaining_header = "=== FILES WITH REMAINING CONSOLE.LOGS (NEED MANUAL REVIEW) ==="
        print(remaining_header)
        output_lines.append(remaining_header)
        
        for result in files_with_remaining:
            remaining_line = f"• {os.path.basename(result['file'])}: {result['remaining_logs']} remaining console.logs"
            print(remaining_line)
            output_lines.append(remaining_line)
        
        output_lines.append("")
        print("")
    
    # Overall summary
    print(Colors.colorize("\n" + "=" * 60, Colors.YELLOW))
    print(Colors.colorize("CONSOLE.LOG REMOVAL SUMMARY", Colors.YELLOW))
    print(Colors.colorize("=" * 60, Colors.YELLOW))
    
    print(Colors.colorize(f"📁 Files analyzed: {len(files)}", Colors.CYAN))
    print(Colors.colorize(f"🎯 Files with console.logs: {len(files_with_logs)}", Colors.CYAN))
    print(Colors.colorize(f"✏️ Files modified: {files_modified}", Colors.GREEN if files_modified > 0 else Colors.BLUE))
    print(Colors.colorize(f"💾 Files backed up: {files_backed_up}", Colors.GREEN if files_backed_up > 0 else Colors.BLUE))
    print(Colors.colorize(f"❌ Files with errors: {files_with_errors}", Colors.RED if files_with_errors > 0 else Colors.GREEN))
    print(Colors.colorize(f"📊 Total console.logs found: {total_original_logs}", Colors.BLUE))
    print(Colors.colorize(f"🧹 Total console.logs removed: {total_removed_logs}", Colors.GREEN))
    print(Colors.colorize(f"⚠️ Total console.logs remaining: {total_remaining_logs}", Colors.YELLOW if total_remaining_logs > 0 else Colors.GREEN))
    
    if backup_dir and files_backed_up > 0:
        print(Colors.colorize(f"💾 Backup location: {backup_dir}", Colors.CYAN))
    
    if total_removed_logs == 0:
        print(Colors.colorize("ℹ️ No console.log statements found to remove!", Colors.BLUE))
    else:
        success_rate = (total_removed_logs / total_original_logs) * 100 if total_original_logs > 0 else 0
        print(Colors.colorize(f"📈 Removal success rate: {success_rate:.1f}%", Colors.GREEN))
        
    if total_remaining_logs > 0:
        files_with_remaining = [f for f in files_with_logs if f['remaining_logs'] > 0]
        print(Colors.colorize(f"⚠️ Manual review needed for {len(files_with_remaining)} files with {total_remaining_logs} remaining console.logs", Colors.YELLOW))
    
    # Write summary to file
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    output_file = f"console_log_removal_report_{timestamp}.txt"
    
    output_lines = [
        "CONSOLE.LOG REMOVAL REPORT",
        "=" * 60,
        f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}",
        "",
        f"Files analyzed: {len(files)}",
        f"Files with console.logs: {len(files_with_logs)}",
        f"Files modified: {files_modified}",
        f"Files backed up: {files_backed_up}",
        f"Files with errors: {files_with_errors}",
        f"Total console.logs found: {total_original_logs}",
        f"Total console.logs removed: {total_removed_logs}",
        f"Total console.logs remaining: {total_remaining_logs}",
        ""
    ]
    
    if backup_dir and files_backed_up > 0:
        output_lines.append(f"Backup location: {backup_dir}")
        output_lines.append("")
    
    if total_removed_logs > 0:
        success_rate = (total_removed_logs / total_original_logs) * 100
        output_lines.append(f"Removal success rate: {success_rate:.1f}%")
        output_lines.append("")
    
    # Add detailed file information
    if files_with_logs:
        output_lines.append("DETAILED FILE RESULTS:")
        output_lines.append("-" * 40)
        for result in sorted(files_with_logs, key=lambda x: x['original_logs'], reverse=True):
            output_lines.append(f"File: {result['file']}")
            output_lines.append(f"  Original: {result['original_logs']}, Removed: {result['removed_logs']}, Remaining: {result['remaining_logs']}")
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
    print(Colors.colorize("🚀 Console.log Removal Tool", Colors.CYAN))
    print(Colors.colorize("=" * 40, Colors.CYAN))
    print(Colors.colorize("⚠️  WARNING: This will modify your files!", Colors.YELLOW))
    print(Colors.colorize("📁 Make sure you have backups or use the backup feature.", Colors.YELLOW))
    print()
    
    # Ask for confirmation
    response = input(Colors.colorize("Do you want to proceed? (y/N): ", Colors.CYAN)).strip().lower()
    if response in ['y', 'yes']:
        scan_and_remove_console_logs()
        print(Colors.colorize("\n✅ Console.log removal process completed!", Colors.GREEN))
    else:
        print(Colors.colorize("❌ Operation cancelled.", Colors.RED))
