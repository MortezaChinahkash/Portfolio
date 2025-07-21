# Method Length Analyzer

A Python tool for analyzing TypeScript and JavaScript codebases to identify methods and functions that exceed recommended length limits.

## Overview

This tool scans TypeScript (`.ts`) and JavaScript (`.js`) files in your project to find methods and functions longer than 14 lines of actual code. It helps maintain code quality by identifying functions that might benefit from refactoring.

## Features

- **Universal Compatibility**: Works in any TypeScript/JavaScript project
- **Intelligent Filtering**: Automatically excludes common build and dependency directories
- **Detailed Analysis**: Provides line counts, file locations, and method declarations
- **Multiple Output Formats**: Console output + detailed text file report
- **Smart Method Detection**: Recognizes various method types including:
  - Regular methods and functions
  - Angular lifecycle hooks (`ngOnInit`, `ngOnDestroy`, etc.)
  - Constructors
  - Async functions
  - Private/public/protected methods
  - Static methods
  - Getters and setters

## Installation

No installation required! Just download the `analyze_method_length_simple.py` file and place it in your project directory.

### Requirements
- Python 3.6 or higher
- Standard library modules only (no external dependencies)

## Usage

### Basic Usage
```bash
python analyze_method_length_simple.py
```

The script will:
1. Scan all `.ts` and `.js` files recursively from the script's directory
2. Identify methods/functions longer than 14 lines
3. Display results in the console
4. Generate a detailed report file `method_length_analysis.txt`

### What Gets Analyzed
- **TypeScript files** (`.ts`): Services, components, interfaces, classes
- **JavaScript files** (`.js`): Functions, classes, modules

### What Gets Excluded
The tool automatically excludes these directories:
- `node_modules/` - Package dependencies
- `.git/` - Git repository data
- `dist/` - Build output
- `build/` - Build artifacts
- `.angular/` - Angular CLI cache
- `coverage/` - Test coverage reports

## Output

### Console Output
Real-time progress and summary information:
```
Analyzing 108 TypeScript/JavaScript files for methods > 14 lines...
Search directory: C:\Your\Project\Path
TypeScript files: 107
JavaScript files: 1
Excluded directories: node_modules, .git, dist, build, .angular, coverage

File: src/app/services/contacts-crud.service.ts
--------------------------------------------------------------------------------
  Method: validateContactData (Line 45-76)
     Code lines: 32 | Total lines: 32
     Declaration: validateContactData(contact: Contact): ValidationResult {

=== TOP 10 LONGEST METHODS ===
 1. validateContactData (32 lines)
    File: src/app/services/contacts-crud.service.ts
    Line: 45-76
```

### Report File
Detailed analysis saved to `method_length_analysis.txt` containing:
- Complete file-by-file analysis
- Method details with line numbers
- Top 10 longest methods ranking
- Summary statistics
- Refactoring recommendations

## Method Detection Logic

The analyzer identifies methods using these patterns:
- Method declarations with parentheses and braces
- Angular lifecycle hooks
- Constructor methods
- Function declarations
- Async functions

It intelligently skips:
- Comments and documentation
- Import/export statements
- Interface definitions
- Enum declarations
- Class declarations

## Code Quality Guidelines

**Why 14 lines?**
- Functions under 15 lines are generally easier to understand
- Smaller functions are easier to test
- Single responsibility principle compliance
- Better code maintainability

**Refactoring Recommendations:**
- Methods 15-20 lines: Consider minor refactoring
- Methods 20+ lines: Strong candidate for breaking down
- Methods 30+ lines: High priority for refactoring

## Example Use Cases

### Code Review Process
```bash
# Before committing changes
python analyze_method_length_simple.py
# Review the generated report for new long methods
```

### Continuous Integration
```bash
# In CI pipeline
python analyze_method_length_simple.py
# Parse method_length_analysis.txt for quality gates
```

### Legacy Code Analysis
```bash
# Identify refactoring candidates in existing codebase
python analyze_method_length_simple.py
# Use Top 10 list to prioritize refactoring efforts
```

## Customization

### Changing the Line Limit
Edit line 30 in the script:
```python
if method_info and method_info['code_lines'] > 14:  # Change 14 to your limit
```

### Adding More Excluded Directories
Edit the `excluded_dirs` list:
```python
excluded_dirs = ['node_modules', '.git', 'dist', 'build', '.angular', 'coverage', 'your_dir']
```

### File Type Support
Currently supports `.ts` and `.js` files. To add more:
```python
# Add patterns in scan_all_ts_files function
vue_pattern = os.path.join(script_dir, "**", "*.vue")
vue_files = glob.glob(vue_pattern, recursive=True)
```

## Troubleshooting

### No Files Found
- Ensure the script is in your project directory
- Check that your project contains `.ts` or `.js` files
- Verify excluded directories aren't filtering out your code

### Encoding Issues
The script uses UTF-8 encoding. If you encounter issues:
- Ensure your files are UTF-8 encoded
- Check for BOM (Byte Order Mark) issues

### Permission Errors
- Ensure read permissions on all source files
- Run with appropriate user permissions

## Integration with Development Workflow

### Pre-commit Hook
Add to `.git/hooks/pre-commit`:
```bash
#!/bin/bash
python analyze_method_length_simple.py
# Add logic to fail commit if too many long methods found
```

### VS Code Integration
1. Add to VS Code tasks.json:
```json
{
    "label": "Analyze Method Length",
    "type": "shell",
    "command": "python",
    "args": ["analyze_method_length_simple.py"],
    "group": "build"
}
```

## Contributing

To enhance this tool:
1. Add support for more file types
2. Implement configurable thresholds
3. Add JSON output format
4. Include cyclomatic complexity analysis
5. Add IDE integration plugins

## License

This tool is provided as-is for code quality analysis. Feel free to modify and distribute according to your project's needs.

---

**Happy Refactoring!** 🚀

Keep your methods short, your code clean, and your bugs minimal.

Made by Morteza Chinahkash
