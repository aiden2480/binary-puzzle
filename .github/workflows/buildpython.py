import os
import subprocess

# Move exe file
base = os.getcwd()
os.rename(f"{base}\\dist\\binarypuzzle.exe", f"{base}\\binarypuzzle.exe")
print(f"* Moved {base}\\dist\\binarypuzzle.exe -> {base}\\binarypuzzle.exe")

# Update git config
if os.system("git config --global user.email"): # Non-zero status code
    os.system("git config --global user.email build-python@harakirimail.com")
if os.system("git config --global user.name"):
    os.system("git config --global user.name build-python")

# Determine current commit hash
raw = subprocess.check_output(["git", "rev-parse", "HEAD"])
sha = raw.strip().decode("ascii")[:7]
print(f"* Current git commit is {sha}")

# Upload build
os.system("git add binarypuzzle.exe")
os.system(f'git commit -m "Build Python {sha}"')
os.system("git push origin main")
print(f"* Python built successfully!")
