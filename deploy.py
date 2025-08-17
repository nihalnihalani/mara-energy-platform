#!/usr/bin/env python3
"""
Deployment script for SLA-Smart Energy Arbitrage Platform
"""

import os
import subprocess
import sys

def run_command(command, description):
    """Run a shell command and handle errors"""
    print(f"🔄 {description}...")
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        print(f"✅ {description} completed successfully")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ {description} failed: {e}")
        print(f"   Error output: {e.stderr}")
        return False

def main():
    print("🚀 SLA-Smart Energy Arbitrage Platform - Deployment Script")
    print("=" * 60)
    
    # Check if git is installed
    if not run_command("git --version", "Checking git installation"):
        print("❌ Git is not installed. Please install git first.")
        return
    
    # Check if we're in the right directory
    if not os.path.exists("main.py"):
        print("❌ main.py not found. Please run this script from the project root directory.")
        return
    
    # Initialize git repository
    if not run_command("git init", "Initializing git repository"):
        return
    
    # Add all files
    if not run_command("git add .", "Adding files to git"):
        return
    
    # Initial commit
    if not run_command('git commit -m "Initial commit: SLA-Smart Energy Arbitrage Platform"', "Creating initial commit"):
        return
    
    print("\n🎉 Local git repository created successfully!")
    print("\n📋 Next steps:")
    print("1. Create a new repository on GitHub:")
    print("   - Go to https://github.com")
    print("   - Click 'New repository'")
    print("   - Name it: mara-energy-platform")
    print("   - Make it public")
    print("   - Don't initialize with README")
    print("\n2. After creating the repository, run these commands:")
    print("   git remote add origin https://github.com/YOUR_USERNAME/mara-energy-platform.git")
    print("   git branch -M main")
    print("   git push -u origin main")
    print("\n3. Replace YOUR_USERNAME with your actual GitHub username")
    
    # Ask if user wants to continue with remote setup
    response = input("\n🤔 Do you want to continue with remote repository setup? (y/n): ")
    if response.lower() == 'y':
        username = input("Enter your GitHub username: ")
        repo_name = input("Enter repository name (default: mara-energy-platform): ") or "mara-energy-platform"
        
        remote_url = f"https://github.com/{username}/{repo_name}.git"
        
        if run_command(f"git remote add origin {remote_url}", "Adding remote origin"):
            if run_command("git branch -M main", "Setting main branch"):
                if run_command("git push -u origin main", "Pushing to GitHub"):
                    print(f"\n🎉 Successfully deployed to GitHub!")
                    print(f"🌐 Repository: {remote_url}")
                    print(f"📱 You can now view your project on GitHub!")
                else:
                    print("❌ Failed to push to GitHub. Please check your credentials.")
            else:
                print("❌ Failed to set main branch.")
        else:
            print("❌ Failed to add remote origin.")
    
    print("\n✨ Deployment script completed!")

if __name__ == "__main__":
    main()
