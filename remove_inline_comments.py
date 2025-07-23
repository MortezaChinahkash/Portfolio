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
    backup_dir = os.path.join(script_dir, "backups", f"inline_comments_backup_{timestamp}")
    
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
    print(Colors.colorize("The Inline Comment Remover will modify your files.", Colors.YELLOW))
    print(Colors.colorize("It's recommended to create backups before proceeding.", Colors.YELLOW))
    print()
    
    while True:
        try:
            response = input(Colors.colorize("Create backups before removing inline comments? (y/n): ", Colors.BOLD + Colors.CYAN)).strip().lower()
            
            if response in ['y', 'yes', 'j', 'ja']:
                return True
            elif response in ['n', 'no', 'nein']:
                return False
            else:
                print(Colors.colorize("❌ Please answer with 'y' or 'n'.", Colors.RED))
                
        except (KeyboardInterrupt, EOFError):
            return False

def remove_inline_comments_from_file(file_path, backup_dir=None):
    """
    Remove inline comments from JavaScript/TypeScript files while preserving JSDoc comments
    Handles various comment patterns while preserving code structure
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Count original inline comments for reporting
        single_line_comments = len(re.findall(r'//(?!\*)', content))
        multiline_comments = len(re.findall(r'/\*(?!\*)', content))
        original_count = single_line_comments + multiline_comments
        
        if original_count == 0:
            return {
                'file': file_path,
                'original_comments': 0,
                'removed_comments': 0,
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
        
        # Remove inline comments while preserving JSDoc comments
        content = remove_comments_preserve_jsdoc(content)
        
        # Count remaining inline comments
        remaining_single = len(re.findall(r'//(?!\*)', content))
        remaining_multiline = len(re.findall(r'/\*(?!\*)', content))
        remaining_count = remaining_single + remaining_multiline
        removed_count = original_count - remaining_count
        
        # Only write back if content changed
        modified = content != original_content
        if modified:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
        
        return {
            'file': file_path,
            'original_comments': original_count,
            'removed_comments': removed_count,
            'remaining_comments': remaining_count,
            'modified': modified,
            'backed_up': backed_up,
            'error': None
        }
        
    except Exception as e:
        return {
            'file': file_path,
            'original_comments': 0,
            'removed_comments': 0,
            'remaining_comments': 0,
            'modified': False,
            'backed_up': False,
            'error': str(e)
        }

def remove_comments_preserve_jsdoc(content):
    """
    Remove inline comments while preserving JSDoc comments and important code structure
    """
    lines = content.split('\n')
    result_lines = []
    in_multiline_comment = False
    in_jsdoc_comment = False
    in_string = False
    string_char = None
    
    for line in lines:
        original_line = line
        new_line = ""
        i = 0
        
        while i < len(line):
            char = line[i]
            next_char = line[i + 1] if i + 1 < len(line) else ''
            
            # Handle string literals (preserve everything inside strings)
            if not in_multiline_comment and not in_jsdoc_comment:
                if char in ['"', "'", '`'] and (i == 0 or line[i-1] != '\\'):
                    if not in_string:
                        in_string = True
                        string_char = char
                        new_line += char
                    elif char == string_char:
                        in_string = False
                        string_char = None
                        new_line += char
                    else:
                        new_line += char
                    i += 1
                    continue
                
                if in_string:
                    new_line += char
                    i += 1
                    continue
            
            # Handle JSDoc comments /** ... */
            if char == '/' and next_char == '*' and i + 2 < len(line) and line[i + 2] == '*':
                # Start of JSDoc comment
                in_jsdoc_comment = True
                new_line += char + next_char + line[i + 2]
                i += 3
                continue
            
            # Handle regular multiline comments /* ... */
            elif char == '/' and next_char == '*' and not in_jsdoc_comment:
                # Start of regular multiline comment - skip it
                in_multiline_comment = True
                i += 2
                # Skip until end of multiline comment on same line
                while i < len(line):
                    if i + 1 < len(line) and line[i] == '*' and line[i + 1] == '/':
                        in_multiline_comment = False
                        i += 2
                        break
                    i += 1
                continue
            
            # Handle end of multiline comments
            elif char == '*' and next_char == '/' and (in_multiline_comment or in_jsdoc_comment):
                if in_jsdoc_comment:
                    # End of JSDoc comment - preserve it
                    new_line += char + next_char
                    in_jsdoc_comment = False
                else:
                    # End of regular multiline comment - skip it
                    in_multiline_comment = False
                i += 2
                continue
            
            # Handle single-line comments //
            elif char == '/' and next_char == '/' and not in_multiline_comment and not in_jsdoc_comment:
                # Check if it's part of a URL (http:// or https://)
                if i >= 5 and line[i-5:i] == 'http:':
                    new_line += char
                    i += 1
                    continue
                elif i >= 6 and line[i-6:i] == 'https:':
                    new_line += char
                    i += 1
                    continue
                else:
                    # Regular single-line comment - remove everything from here to end of line
                    break
            
            # Regular character handling
            elif not in_multiline_comment:
                if in_jsdoc_comment:
                    # Preserve JSDoc content
                    new_line += char
                else:
                    # Regular code content
                    new_line += char
            
            i += 1
        
        # Clean up trailing whitespace but preserve intentional spacing
        if new_line.strip() == "" and original_line.strip() != "":
            # If original line had content but new line is empty, preserve as empty line
            result_lines.append("")
        else:
            result_lines.append(new_line.rstrip())
    
    # Clean up excessive empty lines (more than 2 consecutive empty lines)
    final_content = '\n'.join(result_lines)
    final_content = re.sub(r'\n\s*\n\s*\n\s*\n+', '\n\n\n', final_content)
    
    return final_content

def scan_and_remove_inline_comments():
    """
    Scan all JavaScript and TypeScript files and remove inline comments while preserving JSDoc
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
    print(Colors.colorize("🧹 INLINE COMMENT REMOVAL ANALYSIS", Colors.BOLD + Colors.CYAN))
    print(Colors.colorize("=" * 50, Colors.CYAN))
    print(Colors.colorize(f"📁 Search directory: {script_dir}", Colors.BLUE))
    print(Colors.colorize(f"📄 JavaScript files: {len([f for f in files if f.endswith('.js')])}", Colors.GREEN))
    print(Colors.colorize(f"📘 TypeScript files: {len([f for f in files if f.endswith('.ts')])}", Colors.GREEN))
    print(Colors.colorize(f"🔒 Backup enabled: {'Yes' if create_backup else 'No'}", Colors.YELLOW if create_backup else Colors.RED))
    print(Colors.colorize("📝 JSDoc comments will be preserved", Colors.GREEN))
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
    total_original_comments = 0
    total_removed_comments = 0
    total_remaining_comments = 0
    files_modified = 0
    files_with_errors = 0
    files_backed_up = 0
    files_with_comments = []
    
    for file_path in files:
        file_name = os.path.basename(file_path)
        print(Colors.colorize(f"🔍 Processing: {file_name}", Colors.CYAN))
        result = remove_inline_comments_from_file(file_path, backup_dir)
        
        if result['error']:
            files_with_errors += 1
            print(Colors.colorize(f"❌ ERROR processing {file_name}: {result['error']}", Colors.RED))
            continue
        
        if result['backed_up']:
            files_backed_up += 1
        
        if result['original_comments'] > 0:
            files_with_comments.append(result)
            total_original_comments += result['original_comments']
            total_removed_comments += result['removed_comments']
            total_remaining_comments += result['remaining_comments']
            
            if result['modified']:
                files_modified += 1
                print(Colors.colorize(f"  🧹 Removed {result['removed_comments']} inline comments", Colors.GREEN))
                if result['remaining_comments'] > 0:
                    print(Colors.colorize(f"  ⚠️ {result['remaining_comments']} comments remaining (possibly JSDoc or complex patterns)", Colors.YELLOW))
            else:
                print(Colors.colorize(f"  ℹ️ {result['original_comments']} comments found but couldn't be removed", Colors.BLUE))
        else:
            print(Colors.colorize(f"  ✅ No inline comments found", Colors.GREEN))
    
    # Sort files by number of original comments (most first)
    files_with_comments.sort(key=lambda x: x['original_comments'], reverse=True)
    
    # Top 10 files with most comments
    if files_with_comments:
        top_section = "=" * 80
        top_header = "=== TOP 10 FILES WITH MOST INLINE COMMENTS (ORIGINAL) ==="
        
        print(top_section)
        print(top_header)
        print(top_section)
        
        for i, result in enumerate(files_with_comments[:10]):
            rank_line = f"{i+1:2d}. {os.path.basename(result['file'])} ({result['original_comments']} original, {result['removed_comments']} removed, {result['remaining_comments']} remaining)"
            file_line = f"    File: {result['file']}"
            
            print(rank_line)
            print(file_line)
            print("")
    
    # Files with remaining comments (need manual review)
    files_with_remaining = [f for f in files_with_comments if f['remaining_comments'] > 0]
    if files_with_remaining:
        remaining_header = "=== FILES WITH REMAINING COMMENTS (POSSIBLY JSDOC OR COMPLEX PATTERNS) ==="
        print(remaining_header)
        
        for result in files_with_remaining:
            remaining_line = f"• {os.path.basename(result['file'])}: {result['remaining_comments']} remaining comments"
            print(remaining_line)
        
        print("")
    
    # Overall summary
    print(Colors.colorize("\n" + "=" * 60, Colors.YELLOW))
    print(Colors.colorize("INLINE COMMENT REMOVAL SUMMARY", Colors.YELLOW))
    print(Colors.colorize("=" * 60, Colors.YELLOW))
    
    print(Colors.colorize(f"📁 Files analyzed: {len(files)}", Colors.CYAN))
    print(Colors.colorize(f"🎯 Files with comments: {len(files_with_comments)}", Colors.CYAN))
    print(Colors.colorize(f"✏️ Files modified: {files_modified}", Colors.GREEN if files_modified > 0 else Colors.BLUE))
    print(Colors.colorize(f"💾 Files backed up: {files_backed_up}", Colors.GREEN if files_backed_up > 0 else Colors.BLUE))
    print(Colors.colorize(f"❌ Files with errors: {files_with_errors}", Colors.RED if files_with_errors > 0 else Colors.GREEN))
    print(Colors.colorize(f"📊 Total inline comments found: {total_original_comments}", Colors.BLUE))
    print(Colors.colorize(f"🧹 Total inline comments removed: {total_removed_comments}", Colors.GREEN))
    print(Colors.colorize(f"⚠️ Total comments remaining: {total_remaining_comments}", Colors.YELLOW if total_remaining_comments > 0 else Colors.GREEN))
    
    if backup_dir and files_backed_up > 0:
        print(Colors.colorize(f"💾 Backup location: {backup_dir}", Colors.CYAN))
    
    if total_removed_comments == 0:
        print(Colors.colorize("ℹ️ No inline comments found to remove!", Colors.BLUE))
    else:
        success_rate = (total_removed_comments / total_original_comments) * 100 if total_original_comments > 0 else 0
        print(Colors.colorize(f"📈 Removal success rate: {success_rate:.1f}%", Colors.GREEN))
        
    if total_remaining_comments > 0:
        files_with_remaining = [f for f in files_with_comments if f['remaining_comments'] > 0]
        print(Colors.colorize(f"📝 {len(files_with_remaining)} files have {total_remaining_comments} remaining comments (likely JSDoc or complex patterns)", Colors.BLUE))
    
    # Write summary to file
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    output_file = f"inline_comment_removal_report_{timestamp}.txt"
    
    output_lines = [
        "INLINE COMMENT REMOVAL REPORT",
        "=" * 60,
        f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}",
        "",
        "PRESERVATION POLICY:",
        "✓ JSDoc comments (/** ... */) are preserved",
        "✗ Single-line comments (//) are removed",
        "✗ Multi-line comments (/* ... */) are removed",
        "✓ Comments inside strings are preserved",
        "✓ URLs with // are preserved",
        "",
        f"Files analyzed: {len(files)}",
        f"Files with comments: {len(files_with_comments)}",
        f"Files modified: {files_modified}",
        f"Files backed up: {files_backed_up}",
        f"Files with errors: {files_with_errors}",
        f"Total inline comments found: {total_original_comments}",
        f"Total inline comments removed: {total_removed_comments}",
        f"Total comments remaining: {total_remaining_comments}",
        ""
    ]
    
    if backup_dir and files_backed_up > 0:
        output_lines.append(f"Backup location: {backup_dir}")
        output_lines.append("")
    
    if total_removed_comments > 0:
        success_rate = (total_removed_comments / total_original_comments) * 100
        output_lines.append(f"Removal success rate: {success_rate:.1f}%")
        output_lines.append("")
    
    # Add detailed file information
    if files_with_comments:
        output_lines.append("DETAILED FILE RESULTS:")
        output_lines.append("-" * 40)
        for result in sorted(files_with_comments, key=lambda x: x['original_comments'], reverse=True):
            output_lines.append(f"File: {result['file']}")
            output_lines.append(f"  Original: {result['original_comments']}, Removed: {result['removed_comments']}, Remaining: {result['remaining_comments']}")
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
    print(Colors.colorize("🚀 Inline Comment Removal Tool", Colors.CYAN))
    print(Colors.colorize("=" * 40, Colors.CYAN))
    print(Colors.colorize("📝 Preserves JSDoc comments (/** ... */)", Colors.GREEN))
    print(Colors.colorize("🗑️  Removes inline comments (// and /* */)", Colors.YELLOW))
    print(Colors.colorize("⚠️  WARNING: This will modify your files!", Colors.YELLOW))
    print(Colors.colorize("📁 Make sure you have backups or use the backup feature.", Colors.YELLOW))
    print()
    
    # Ask for confirmation
    response = input(Colors.colorize("Do you want to proceed? (y/N): ", Colors.CYAN)).strip().lower()
    if response in ['y', 'yes']:
        scan_and_remove_inline_comments()
        print(Colors.colorize("\n✅ Inline comment removal process completed!", Colors.GREEN))
    else:
        print(Colors.colorize("❌ Operation cancelled.", Colors.RED))
