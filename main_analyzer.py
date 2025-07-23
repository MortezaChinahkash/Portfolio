#!/usr/bin/env python3
"""
Main Analyzer Controller
Central control for all code analysis tools
"""
import os
import sys
import subprocess
from typing import Dict, List

# ANSI Color Codes for colored output
class Colors:
    # Text Colors
    RED = '\033[91m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    MAGENTA = '\033[95m'
    CYAN = '\033[96m'
    WHITE = '\033[97m'
    
    # Background Colors
    BG_RED = '\033[101m'
    BG_GREEN = '\033[102m'
    BG_YELLOW = '\033[103m'
    BG_BLUE = '\033[104m'
    
    # Styles
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'
    ITALIC = '\033[3m'
    
    # Reset
    RESET = '\033[0m'
    
    @staticmethod
    def colorize(text: str, color: str) -> str:
        """Colors text"""
        return f"{color}{text}{Colors.RESET}"

def print_header():
    """Shows the main header"""
    print(Colors.colorize("=" * 80, Colors.CYAN))
    print(Colors.colorize("🔍 CODE ANALYZER SUITE 🔍", Colors.BOLD + Colors.CYAN))
    print(Colors.colorize("Professional Code Analysis Tools", Colors.CYAN))
    print(Colors.colorize("=" * 80, Colors.CYAN))
    print()

def print_menu():
    """Shows the main menu"""
    menu_items = [
        ("1", "📏 File Length Analyzer", "Analyzes file lengths (HTML, CSS, JS, TS)", "analyze_file_length.py"),
        ("2", "📝 JSDoc Coverage Analyzer", "Checks JSDoc documentation in JS/TS", "analyze_jsdoc_coverage.py"),
        ("3", "🔧 Method Length Analyzer", "Analyzes method lengths in JS/TS", "analyze_method_length_improved.py"),
        ("4", "🧹 Console.log Remover", "Removes console.log statements", "remove_console_logs.py"),
        ("5", "💬 Inline Comment Remover", "Removes inline comments (preserves JSDoc)", "remove_inline_comments.py"),
        ("6", "📐 Empty Line Optimizer", "Optimizes empty lines in JS/TS files", "remove_empty_lines.py"),
        ("7", "🚀 Run All Analyzers", "Executes all analyzers sequentially", "all"),
        ("0", "❌ Exit", "Exit program", "exit")
    ]
    
    print(Colors.colorize("📋 AVAILABLE ANALYZERS:", Colors.BOLD + Colors.YELLOW))
    print()
    
    for number, title, description, _ in menu_items:
        print(f"{Colors.colorize(number, Colors.BOLD + Colors.GREEN)} - {Colors.colorize(title, Colors.BOLD + Colors.WHITE)}")
        print(f"    {Colors.colorize(description, Colors.BLUE)}")
        print()
    
    print(Colors.colorize("💡 TIP:", Colors.BOLD + Colors.CYAN))
    print(Colors.colorize("• Single selection: e.g. '1' or '3'", Colors.CYAN))
    print(Colors.colorize("• Multiple selection: e.g. '1,2,4' (comma separated)", Colors.CYAN))
    print(Colors.colorize("• Run all: '7'", Colors.CYAN))
    print()

def get_analyzer_info() -> Dict[str, Dict]:
    """Returns information about all available analyzers"""
    return {
        "1": {
            "name": "File Length Analyzer",
            "script": "analyze_file_length.py",
            "description": "Analyzes file lengths and finds files > 400 lines",
            "icon": "📏"
        },
        "2": {
            "name": "JSDoc Coverage Analyzer", 
            "script": "analyze_jsdoc_coverage.py",
            "description": "Checks JSDoc documentation in JavaScript/TypeScript",
            "icon": "📝"
        },
        "3": {
            "name": "Method Length Analyzer",
            "script": "analyze_method_length_improved.py", 
            "description": "Analyzes method lengths in JavaScript/TypeScript",
            "icon": "🔧"
        },
        "4": {
            "name": "Console.log Remover",
            "script": "remove_console_logs.py",
            "description": "Removes console.log statements from JS/TS files",
            "icon": "🧹"
        },
        "5": {
            "name": "Inline Comment Remover",
            "script": "remove_inline_comments.py",
            "description": "Removes inline comments while preserving JSDoc",
            "icon": "💬"
        },
        "6": {
            "name": "Empty Line Optimizer",
            "script": "remove_empty_lines.py",
            "description": "Optimizes empty lines in JS/TS files (max 2 consecutive)",
            "icon": "📐"
        }
    }

def run_analyzer(script_name: str) -> bool:
    """Executes a specific analyzer"""
    script_dir = os.path.dirname(os.path.abspath(__file__))
    script_path = os.path.join(script_dir, script_name)
    
    if not os.path.exists(script_path):
        print(Colors.colorize(f"❌ ERROR: Script {script_name} not found!", Colors.RED))
        return False
    
    try:
        print(Colors.colorize(f"🚀 Starting {script_name}...", Colors.GREEN))
        print(Colors.colorize("-" * 60, Colors.YELLOW))
        
        # Execute script
        result = subprocess.run([sys.executable, script_path], 
                              cwd=script_dir,
                              capture_output=False,
                              text=True)
        
        print(Colors.colorize("-" * 60, Colors.YELLOW))
        
        if result.returncode == 0:
            print(Colors.colorize(f"✅ {script_name} completed successfully!", Colors.GREEN))
        else:
            print(Colors.colorize(f"⚠️ {script_name} finished with errors (Exit Code: {result.returncode})", Colors.YELLOW))
        
        return result.returncode == 0
        
    except Exception as e:
        print(Colors.colorize(f"❌ ERROR executing {script_name}: {e}", Colors.RED))
        return False

def run_all_analyzers() -> None:
    """Executes all analyzers sequentially"""
    analyzers = get_analyzer_info()
    
    print(Colors.colorize("🚀 ALL ANALYZERS WILL BE EXECUTED", Colors.BOLD + Colors.MAGENTA))
    print(Colors.colorize("=" * 50, Colors.MAGENTA))
    print()
    
    results = []
    
    for key, info in analyzers.items():
        print(Colors.colorize(f"{info['icon']} {info['name']}", Colors.BOLD + Colors.CYAN))
        print(Colors.colorize(f"📄 {info['description']}", Colors.BLUE))
        print()
        
        success = run_analyzer(info['script'])
        results.append((info['name'], success))
        
        print()
        print(Colors.colorize("=" * 50, Colors.YELLOW))
        print()
    
    # Summary
    print(Colors.colorize("📊 SUMMARY OF ALL ANALYZERS", Colors.BOLD + Colors.MAGENTA))
    print(Colors.colorize("=" * 50, Colors.MAGENTA))
    
    for name, success in results:
        status = "✅ Successful" if success else "❌ Error"
        color = Colors.GREEN if success else Colors.RED
        print(f"{Colors.colorize(status, color)} - {name}")
    
    print()

def run_multiple_analyzers(choices: List[str]) -> None:
    """Executes multiple selected analyzers sequentially"""
    analyzers = get_analyzer_info()
    
    print(Colors.colorize(f"🔥 MULTIPLE SELECTION: {len(choices)} ANALYZERS WILL BE EXECUTED", Colors.BOLD + Colors.MAGENTA))
    print(Colors.colorize("=" * 60, Colors.MAGENTA))
    print()
    
    # Show all selected analyzers
    for choice in choices:
        info = analyzers[choice]
        print(f"{Colors.colorize(choice, Colors.BOLD + Colors.GREEN)} - {Colors.colorize(info['name'], Colors.CYAN)}")
    print()
    
    results = []
    
    for i, choice in enumerate(choices, 1):
        info = analyzers[choice]
        
        print(Colors.colorize(f"[{i}/{len(choices)}] {info['icon']} {info['name']}", Colors.BOLD + Colors.CYAN))
        print(Colors.colorize(f"📄 {info['description']}", Colors.BLUE))
        print()
        
        success = run_analyzer(info['script'])
        results.append((info['name'], success))
        
        # Separator between analyzers (except for the last one)
        if i < len(choices):
            print()
            print(Colors.colorize("=" * 60, Colors.YELLOW))
            print()
    
    # Summary
    print()
    print(Colors.colorize("📊 MULTIPLE SELECTION SUMMARY", Colors.BOLD + Colors.MAGENTA))
    print(Colors.colorize("=" * 60, Colors.MAGENTA))
    
    for name, success in results:
        status = "✅ Successful" if success else "❌ Error"
        color = Colors.GREEN if success else Colors.RED
        print(f"{Colors.colorize(status, color)} - {name}")
    
    print()

def get_user_choice() -> str:
    """Asks the user for their selection"""
    while True:
        try:
            choice = input(Colors.colorize("🔍 Your selection (0-7 or multiple with comma): ", Colors.BOLD + Colors.YELLOW)).strip()
            
            # Single selection
            if choice in ['0', '1', '2', '3', '4', '5', '6', '7']:
                return choice
            
            # Check multiple selection
            if ',' in choice:
                choices = [c.strip() for c in choice.split(',')]
                valid_choices = ['1', '2', '3', '4', '5', '6']
                
                # Check if all selections are valid
                if all(c in valid_choices for c in choices):
                    # Remove duplicates and sort
                    unique_choices = sorted(list(set(choices)))
                    return ','.join(unique_choices)
                else:
                    print(Colors.colorize("❌ Invalid multiple selection! Only 1,2,3,4,5,6 allowed (no 0 or 7).", Colors.RED))
            else:
                print(Colors.colorize("❌ Invalid input! Please choose 0-7 or multiple with comma.", Colors.RED))
                
        except KeyboardInterrupt:
            print(Colors.colorize("\n\nGoodbye!", Colors.YELLOW))
            sys.exit(0)
        except EOFError:
            print(Colors.colorize("\n\nGoodbye!", Colors.YELLOW))
            sys.exit(0)

def confirm_action(analyzer_name: str) -> bool:
    """Asks for confirmation before execution"""
    print(Colors.colorize(f"⚠️ You are about to run '{analyzer_name}'.", Colors.YELLOW))
    
    # Special warning for file-modifying analyzers
    if any(modifier in analyzer_name for modifier in ["Console.log Remover", "Inline Comment Remover", "Empty Line Optimizer"]):
        print(Colors.colorize("🚨 WARNING: This analyzer MODIFIES your files!", Colors.RED))
        print(Colors.colorize("   Make sure you have backups.", Colors.RED))
    
    while True:
        try:
            response = input(Colors.colorize("Continue? (y/Y for Yes, n/N for No): ", Colors.BOLD + Colors.CYAN)).strip().lower()
            
            if response in ['y', 'yes', 'j', 'ja']:
                return True
            elif response in ['n', 'no', 'nein']:
                return False
            else:
                print(Colors.colorize("❌ Please answer with 'y' or 'n'.", Colors.RED))
                
        except (KeyboardInterrupt, EOFError):
            return False

def main():
    """Main function"""
    try:
        while True:
            # Clear screen (works on Windows and Unix)
            os.system('cls' if os.name == 'nt' else 'clear')
            
            print_header()
            print_menu()
            
            choice = get_user_choice()
            
            if choice == '0':
                print(Colors.colorize("\n👋 Goodbye!", Colors.YELLOW))
                break
                
            elif choice == '7':
                print()
                if confirm_action("ALL ANALYZERS"):
                    print()
                    run_all_analyzers()
                else:
                    print(Colors.colorize("❌ Operation cancelled.", Colors.YELLOW))
                    
            elif ',' in choice:
                # Multiple selection
                choices = choice.split(',')
                analyzers = get_analyzer_info()
                
                # Show all selected analyzers
                print()
                print(Colors.colorize("🔥 MULTIPLE SELECTION:", Colors.BOLD + Colors.CYAN))
                for c in choices:
                    print(f"  {c} - {analyzers[c]['name']}")
                print()
                
                if confirm_action(f"{len(choices)} ANALYZERS"):
                    print()
                    run_multiple_analyzers(choices)
                else:
                    print(Colors.colorize("❌ Operation cancelled.", Colors.YELLOW))
                    
            else:
                # Single selection
                analyzers = get_analyzer_info()
                analyzer_info = analyzers[choice]
                
                print()
                if confirm_action(analyzer_info['name']):
                    print()
                    run_analyzer(analyzer_info['script'])
                else:
                    print(Colors.colorize("❌ Operation cancelled.", Colors.YELLOW))
            
            # Wait for user input
            print()
            input(Colors.colorize("📝 Press Enter to continue...", Colors.BOLD + Colors.GREEN))
    
    except KeyboardInterrupt:
        print(Colors.colorize("\n\n👋 Program terminated by user.", Colors.YELLOW))
    except Exception as e:
        print(Colors.colorize(f"\n❌ Unexpected error: {e}", Colors.RED))

if __name__ == "__main__":
    main()
