# File Length Analyzer

A Python tool for analyzing web development project files to identify files that exceed recommended size limits. This tool helps maintain code quality by finding large files that may need refactoring or splitting.

## Overview

This analyzer scans HTML, CSS, SCSS, SASS, JavaScript, and TypeScript files to identify files longer than 400 lines. Large files can be difficult to maintain, debug, and understand, making them prime candidates for refactoring.

## Features

- **Multi-Format Support**: Analyzes 6 file types commonly used in web development
  - HTML files (`.html`)
  - CSS files (`.css`) 
  - SCSS files (`.scss`)
  - SASS files (`.sass`)
  - JavaScript files (`.js`)
  - TypeScript files (`.ts`)

- **Intelligent Analysis**: Distinguishes between different line types
  - Total lines (including empty lines)
  - Non-empty lines
  - Comment lines (basic detection)
  - Code lines (actual content)

- **Smart Filtering**: Automatically excludes build and dependency directories
- **Detailed Reporting**: Console output + comprehensive text file report
- **File Type Statistics**: Breakdown by file type with averages and maximums
- **Top 10 Ranking**: Identifies the largest files for priority refactoring

## Installation

No installation required! Just download the `analyze_file_length.py` file and place it in your project directory.

### Requirements
- Python 3.6 or higher
- Standard library modules only (no external dependencies)

## Usage

### Basic Usage
```bash
python analyze_file_length.py
```

The script will:
1. Scan all supported file types recursively from the script's directory
2. Identify files longer than 400 lines
3. Display results in the console
4. Generate a detailed report file `file_length_analysis.txt`

### What Gets Analyzed
- **HTML files**: Templates, components, static pages
- **CSS/SCSS/SASS files**: Stylesheets and style modules
- **JavaScript/TypeScript files**: Components, services, modules, utilities

### What Gets Excluded
The tool automatically excludes these directories:
- `node_modules/` - Package dependencies
- `.git/` - Git repository data
- `dist/` - Build output
- `build/` - Build artifacts
- `.angular/` - Angular CLI cache
- `coverage/` - Test coverage reports
- `.vscode/` - VS Code settings
- `.idea/` - IntelliJ IDEA settings

## Output

### Console Output
Real-time progress and summary information:
```
HTML files: 21
SCSS files: 42
JavaScript files: 1
TypeScript files: 107
Excluded directories: node_modules, .git, dist, build, .angular, coverage, .vscode, .idea

File: src/app/legal-notice/legal-notice.component.html
--------------------------------------------------------------------------------
  Type: HTML | Total lines: 474
  Non-empty: 474 | Comments: 0 | Code: 474

=== TOP 10 LARGEST FILES ===
 1. board-form.service.ts (883 lines)
    Type: TypeScript
    File: src/app/board/services/board-form.service.ts
```

### Report File
Detailed analysis saved to `file_length_analysis.txt` containing:
- File-by-file breakdown with line counts
- Top 10 largest files ranking
- Summary by file type
- Overall project statistics
- Refactoring recommendations

## File Size Guidelines

**Why 400 lines?**
- Files under 400 lines are generally easier to navigate
- Smaller files improve code organization
- Better separation of concerns
- Enhanced maintainability and readability

**Recommended Limits by File Type:**
- **HTML files**: 300-400 lines (break into components)
- **CSS/SCSS files**: 400-600 lines (use modular architecture)  
- **JavaScript/TypeScript files**: 300-400 lines (split into modules)

## Comment Detection

The analyzer identifies comments in different file types:
- **JavaScript/TypeScript**: `//` single-line, `/* */` multi-line
- **HTML**: `<!-- -->` comments
- **CSS/SCSS/SASS**: `/* */` and `//` comments
- **Basic detection**: May not catch all edge cases

## Example Use Cases

### Code Quality Audit
```bash
# Analyze entire project for oversized files
python analyze_file_length.py
# Review file_length_analysis.txt for refactoring priorities
```

### Pre-deployment Check
```bash
# Check for new large files before deployment
python analyze_file_length.py
# Ensure no files exceed size guidelines
```

### Legacy Code Assessment
```bash
# Identify largest files in existing codebase
python analyze_file_length.py
# Use Top 10 list to plan refactoring sprints
```

### Architecture Review
```bash
# Regular file size monitoring
python analyze_file_length.py
# Track file growth over time
```

## Customization

### Changing the Line Limit
Edit the threshold in the main scanning function:
```python
if file_info and file_info['total_lines'] > 400:  # Change 400 to your limit
```

### Adding More File Types
Add new patterns to the `file_patterns` list:
```python
file_patterns = [
    "**/*.html",
    "**/*.css", 
    "**/*.scss",
    "**/*.sass",
    "**/*.js",
    "**/*.ts",
    "**/*.vue",    # Add Vue files
    "**/*.jsx",    # Add JSX files
    "**/*.tsx"     # Add TSX files
]
```

### Custom Excluded Directories
Modify the `excluded_dirs` list:
```python
excluded_dirs = ['node_modules', '.git', 'dist', 'build', '.angular', 'coverage', '.vscode', '.idea', 'your_custom_dir']
```

## Sample Output Analysis

### Critical Files (>600 lines)
- **Immediate action required**
- Split into multiple smaller files
- Extract reusable components or utilities

### High Priority (500-600 lines)  
- **Plan refactoring in next sprint**
- Identify logical separation points
- Consider architectural improvements

### Medium Priority (400-500 lines)
- **Monitor and prevent further growth**
- Add documentation
- Consider minor optimizations

## Refactoring Strategies

### HTML Files
- Extract reusable components
- Split into multiple templates
- Use Angular structural directives
- Create shared partials

### CSS/SCSS Files
- Use modular architecture (BEM, CSS Modules)
- Split by components or features
- Create utility and base stylesheets
- Use SCSS partials and imports

### TypeScript/JavaScript Files
- Apply Single Responsibility Principle
- Extract services and utilities
- Create smaller, focused modules
- Use dependency injection

## Integration with Development Workflow

### VS Code Task
Add to `.vscode/tasks.json`:
```json
{
    "label": "Analyze File Length",
    "type": "shell",
    "command": "python",
    "args": ["analyze_file_length.py"],
    "group": "build",
    "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "shared"
    }
}
```

### Pre-commit Hook
Add to `.git/hooks/pre-commit`:
```bash
#!/bin/bash
python analyze_file_length.py
# Optional: Add logic to prevent commits with files over certain size
```

### Continuous Integration
```yaml
# GitHub Actions example
- name: Check File Sizes
  run: |
    python analyze_file_length.py
    # Parse output for CI gates
```

## Troubleshooting

### No Files Found
- Ensure script is in project root directory
- Check that project contains supported file types
- Verify excluded directories aren't filtering your code

### Encoding Issues
- Ensure files are UTF-8 encoded
- Check for BOM (Byte Order Mark) issues
- Verify file permissions

### Incorrect Line Counts
- Comment detection is basic - manual review recommended
- Multi-line strings may affect counts
- Generated files may skew results

## Best Practices

### Regular Monitoring
- Run analysis monthly or before major releases
- Track file size trends over time
- Set up automated alerts for size thresholds

### Team Guidelines
- Establish file size standards for your team
- Include file size in code review checklist
- Document refactoring decisions

### Project Health
- Use results to guide architectural decisions
- Plan refactoring based on priority rankings
- Monitor improvement after refactoring efforts

## Contributing

Potential enhancements:
1. **Advanced Comment Detection**: Language-specific parsers
2. **Configurable Thresholds**: Per-file-type limits
3. **Historical Tracking**: Compare with previous runs
4. **IDE Integration**: VS Code extension
5. **Export Formats**: JSON, CSV output options
6. **Complexity Metrics**: Combine with cyclomatic complexity

## License

This tool is provided as-is for code quality analysis. Feel free to modify and distribute according to your project's needs.

---

**Keep your files focused, your codebase organized, and your architecture clean!** 🏗️

*A well-organized codebase is a maintainable codebase.*
