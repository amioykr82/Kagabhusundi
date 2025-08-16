#!/usr/bin/env python3
"""
Validate requirements.txt for potential Vercel deployment issues
"""

def validate_requirements():
    print("🔍 Validating requirements.txt for Vercel deployment...")
    
    with open('requirements.txt', 'r') as f:
        lines = f.readlines()
    
    issues = []
    for i, line in enumerate(lines, 1):
        line = line.strip()
        if not line or line.startswith('#'):
            continue
            
        # Check for common problematic patterns
        if '==' in line:
            package, version = line.split('==')
            
            # Known problematic packages on Vercel
            if package in ['pydantic', 'pydantic-settings'] and '2.5' in version:
                issues.append(f"Line {i}: {package} {version} may conflict with FastAPI")
            
            if package == 'openai' and version == '1.3.8':
                print(f"✅ OpenAI {version} - Good")
            
            if package == 'fastapi':
                print(f"✅ FastAPI {version} - Good")
                
    if issues:
        print("⚠️  Potential issues found:")
        for issue in issues:
            print(f"   {issue}")
    else:
        print("✅ No obvious issues found in requirements.txt")
    
    print(f"\n📦 Total packages: {len([l for l in lines if l.strip() and not l.startswith('#')])}")

if __name__ == "__main__":
    validate_requirements()
