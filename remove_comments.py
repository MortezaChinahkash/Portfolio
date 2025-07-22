import os
import glob
import re
import shutil
from datetime import datetime

def is_jsdoc_comment(line):
    """Check if a line is part of JSDoc documentation"""
    stripped = line.strip()
    
    # JSDoc patterns to preserve
    jsdoc_patterns = [
        r'^\s*/\*\*',           # /** (JSDoc start)
        r'^\s*\*\s*@',          # * @param, * @returns, etc.
        r'^\s*\*\s*[A-Z]',      # * Description (starts with capital)
        r'^\s*\*\s*$',          # * (empty JSDoc line)
        r'^\s*\*/\s*$',         # */ (JSDoc end)
        r'^\s*\*\s*\w+.*:',     # * property: description
        r'^\s*\*\s*@fileoverview',  # @fileoverview
        r'^\s*\*\s*@author',        # @author
        r'^\s*\*\s*@version',       # @version
        r'^\s*\*\s*@class',         # @class
        r'^\s*\*\s*@interface',     # @interface
        r'^\s*\*\s*@implements',    # @implements
        r'^\s*\*\s*@constructor',   # @constructor
        r'^\s*\*\s*@private',       # @private
        r'^\s*\*\s*@public',        # @public
        r'^\s*\*\s*@protected',     # @protected
        r'^\s*\*\s*@static',        # @static
        r'^\s*\*\s*@readonly',      # @readonly
    ]
    
    for pattern in jsdoc_patterns:
        if re.match(pattern, stripped):
            return True
    
    return False

def is_normal_comment(line):
    """Check if a line is a normal comment (not JSDoc)"""
    stripped = line.strip()
    
    # Skip JSDoc comments
    if is_jsdoc_comment(line):
        return False
    
    # Normal comment patterns to remove
    comment_patterns = [
        r'^\s*//',              # // comments
        r'^\s*/\*(?!\*)',       # /* comments (but not /**)
        r'^\s*\*(?!\s*@)',      # * comments (but not JSDoc tags)
        r'^\s*\*/\s*$',         # */ end comments (non-JSDoc)
        r'^\s*<!--',            # HTML comments
        r'^\s*#',               # SCSS/SASS comments
    ]
    
    for pattern in comment_patterns:
        if re.match(pattern, stripped):
            return True
    
    return False

def should_preserve_line(line):
    """Determine if a line should be preserved"""
    stripped = line.strip()
    
    # Always preserve empty lines
    if not stripped:
        return True
    
    # Preserve JSDoc comments
    if is_jsdoc_comment(line):
        return True
    
    # Remove normal comments
    if is_normal_comment(line):
        return False
    
    # Preserve all other lines (code)
    return True

def clean_file_comments(file_path):
    """Remove normal comments from a file while preserving JSDoc"""
    try:
        # Read the file
        with open(file_path, 'r', encoding='utf-8') as f:
            lines = f.readlines()
        
        original_line_count = len(lines)
        cleaned_lines = []
        removed_lines = []
        in_jsdoc_block = False
        in_multiline_comment = False
        
        for i, line in enumerate(lines):
            stripped = line.strip()
            line_number = i + 1
            
            # Track JSDoc blocks
            if re.match(r'^\s*/\*\*', stripped):
                in_jsdoc_block = True
                cleaned_lines.append(line)
                continue
            elif in_jsdoc_block and re.match(r'^\s*\*/', stripped):
                in_jsdoc_block = False
                cleaned_lines.append(line)
                continue
            elif in_jsdoc_block:
                cleaned_lines.append(line)
                continue
            
            # Track normal multiline comments (/* */)
            if re.match(r'^\s*/\*(?!\*)', stripped) and not in_jsdoc_block:
                in_multiline_comment = True
                removed_lines.append((line_number, line.rstrip()))
                continue
            elif in_multiline_comment and re.match(r'.*\*/', stripped):
                in_multiline_comment = False
                removed_lines.append((line_number, line.rstrip()))
                continue
            elif in_multiline_comment:
                removed_lines.append((line_number, line.rstrip()))
                continue
            
            # Handle single line comments
            if should_preserve_line(line):
                cleaned_lines.append(line)
            else:
                removed_lines.append((line_number, line.rstrip()))
        
        # Write cleaned file
        with open(file_path, 'w', encoding='utf-8') as f:
            f.writelines(cleaned_lines)
        
        cleaned_line_count = len(cleaned_lines)
        removed_count = original_line_count - cleaned_line_count
        
        return {
            'file': file_path,
            'original_lines': original_line_count,
            'cleaned_lines': cleaned_line_count,
            'removed_lines': removed_count,
            'removed_content': removed_lines
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

def create_backup(file_path):
    """Create a backup of the original file"""
    backup_path = file_path + '.backup'
    try:
        shutil.copy2(file_path, backup_path)
        return backup_path
    except Exception as e:
        print(f"Warning: Could not create backup for {file_path}: {e}")
        return None

def clean_all_comments():
    """Remove normal comments from all relevant files while preserving JSDoc"""
    # Get the directory where this script is located
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Define file patterns to process
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
        should_exclude = any(excluded_dir in file_path for excluded_dir in excluded_dirs)
        if not should_exclude:
            files.append(file_path)
    
    # Prepare output
    output_lines = []
    output_lines.append("COMMENT REMOVAL ANALYSIS REPORT")
    output_lines.append(f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    output_lines.append("=" * 80)
    output_lines.append(f"Processing {len(files)} files...")
    output_lines.append(f"Search directory: {script_dir}")
    output_lines.append(f"Excluded directories: {', '.join(excluded_dirs)}")
    output_lines.append("")
    
    print("COMMENT REMOVAL TOOL")
    print("=" * 50)
    print(f"Processing {len(files)} files...")
    print(f"Preserving JSDoc comments, removing normal comments")
    print("")
    
    # Ask for confirmation
    response = input("Do you want to proceed? This will modify your files! (y/N): ")
    if response.lower() not in ['y', 'yes']:
        print("Operation cancelled.")
        return
    
    # Ask about backups
    create_backups = input("Create backup files? (Y/n): ")
    create_backups = create_backups.lower() not in ['n', 'no']
    
    processed_files = []
    total_removed_lines = 0
    files_with_changes = 0
    
    # Process each file
    for file_path in files:
        print(f"Processing: {os.path.basename(file_path)}...")
        
        # Create backup if requested
        if create_backups:
            backup_path = create_backup(file_path)
            if backup_path:
                output_lines.append(f"Backup created: {backup_path}")
        
        # Clean the file
        result = clean_file_comments(file_path)
        if result:
            processed_files.append(result)
            total_removed_lines += result['removed_lines']
            
            if result['removed_lines'] > 0:
                files_with_changes += 1
                
                file_output = f"File: {result['file']}"
                stats = f"  Original: {result['original_lines']} lines → Cleaned: {result['cleaned_lines']} lines"
                removed = f"  Removed: {result['removed_lines']} comment lines"
                
                print(f"  ✓ Removed {result['removed_lines']} comment lines")
                
                output_lines.append(file_output)
                output_lines.append(stats)
                output_lines.append(removed)
                
                # Log removed content
                if result['removed_content']:
                    output_lines.append("  Removed content:")
                    for line_num, content in result['removed_content'][:5]:  # Show first 5
                        output_lines.append(f"    Line {line_num}: {content}")
                    if len(result['removed_content']) > 5:
                        output_lines.append(f"    ... and {len(result['removed_content']) - 5} more lines")
                
                output_lines.append("")
            else:
                print(f"  ✓ No comments to remove")
    
    # Summary by file type
    output_lines.append("=" * 80)
    output_lines.append("SUMMARY BY FILE TYPE")
    output_lines.append("=" * 80)
    
    type_summary = {}
    for result in processed_files:
        file_type = get_file_type(result['file'])
        if file_type not in type_summary:
            type_summary[file_type] = {
                'files_processed': 0,
                'files_changed': 0,
                'total_removed': 0
            }
        
        type_summary[file_type]['files_processed'] += 1
        if result['removed_lines'] > 0:
            type_summary[file_type]['files_changed'] += 1
        type_summary[file_type]['total_removed'] += result['removed_lines']
    
    for file_type in ['TypeScript', 'JavaScript', 'HTML', 'SCSS', 'CSS', 'SASS']:
        if file_type in type_summary:
            data = type_summary[file_type]
            summary_line = f"{file_type}: {data['files_changed']}/{data['files_processed']} files changed, {data['total_removed']} lines removed"
        else:
            summary_line = f"{file_type}: No files processed"
        
        print(summary_line)
        output_lines.append(summary_line)
    
    # Overall summary
    output_lines.append("")
    output_lines.append("=" * 80)
    output_lines.append("OVERALL SUMMARY")
    output_lines.append("=" * 80)
    
    summary_stats = [
        f"Files processed: {len(processed_files)}",
        f"Files with changes: {files_with_changes}",
        f"Total comment lines removed: {total_removed_lines}",
        f"JSDoc comments preserved: YES",
        f"Backup files created: {'YES' if create_backups else 'NO'}"
    ]
    
    for stat in summary_stats:
        print(stat)
        output_lines.append(stat)
    
    if total_removed_lines > 0:
        output_lines.append("")
        output_lines.append("PRESERVED COMMENT TYPES:")
        output_lines.append("• JSDoc comments (/** ... */)")
        output_lines.append("• @param, @returns, @fileoverview, etc.")
        output_lines.append("• Component and method documentation")
        output_lines.append("")
        output_lines.append("REMOVED COMMENT TYPES:")
        output_lines.append("• Single-line comments (//)")
        output_lines.append("• Multi-line comments (/* ... */) - non-JSDoc")
        output_lines.append("• HTML comments (<!-- ... -->)")
        output_lines.append("• SCSS/SASS comments (#)")
    
    # Write report
    report_file = "comment_removal_report.txt"
    try:
        with open(report_file, 'w', encoding='utf-8') as f:
            f.write('\n'.join(output_lines))
        print(f"\nDetailed report saved to: {report_file}")
    except Exception as e:
        print(f"\nError saving report: {e}")
    
    print(f"\n✅ Comment removal completed!")
    print(f"📊 {total_removed_lines} comment lines removed from {files_with_changes} files")
    if create_backups:
        print(f"💾 Backup files created with .backup extension")

if __name__ == "__main__":
    clean_all_comments()
