# GitHub Deployment Guide (हिंदी/English)

## पहले Git Install करें (Install Git First)

### Windows के लिए:

1. **Git Download करें:**
   - https://git-scm.com/download/win पर जाएं
   - या Chocolatey से: `choco install git`
   - Download करके install करें

2. **Installation के बाद:**
   - PowerShell या Command Prompt खोलें
   - `git --version` type करें - अगर version दिखे तो install हो गया है ✅

3. **Git Configure करें:**
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```

---

## GitHub पर Project Deploy करें

### Step 1: GitHub Account बनाएं (अगर नहीं है)
- https://github.com पर जाएं
- Sign Up करें

### Step 2: GitHub पर नया Repository बनाएं
1. GitHub पर login करें
2. Top right corner पर **"+"** button पर click करें
3. **"New repository"** select करें
4. Repository name दें (जैसे: `coding-club-cu` या `projectclub`)
5. **Public** या **Private** select करें
6. **"Create repository"** button पर click करें
7. ⚠️ **IMPORTANT:** "Initialize with README" को **uncheck** रखें (क्योंकि हमारे पास already README.md है)

### Step 3: Local Project को GitHub पर Push करें

PowerShell या Command Prompt में project folder में जाएं:

```bash
cd C:\Users\mohda\OneDrive\Desktop\projectclub
```

अब ये commands run करें:

```bash
# Step 1: Git initialize करें
git init

# Step 2: सभी files को add करें
git add .

# Step 3: पहला commit करें
git commit -m "Initial commit: Coding Club website"

# Step 4: GitHub repository को add करें
# NOTE: YOUR_USERNAME और REPO_NAME को replace करें
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Step 5: Code को GitHub पर push करें
git branch -M main
git push -u origin main
```

### Step 4: Username और Password
- जब आप `git push` करेंगे, तो GitHub का username और password मांगेगा
- Password के लिए, GitHub Personal Access Token use करना होगा
- Settings → Developer settings → Personal access tokens → Generate new token
- Token को save कर लें, वो दोबारा नहीं दिखेगा

---

## Quick Commands Summary

```bash
cd C:\Users\mohda\OneDrive\Desktop\projectclub
git init
git add .
git commit -m "Initial commit: Coding Club website"
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main
```

---

## अगर Error आए:

### Error: "git is not recognized"
→ Git install नहीं है, पहले install करें

### Error: "fatal: remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
```

### Error: "Authentication failed"
→ Personal Access Token use करें password की जगह

---

## बाद में Updates के लिए:

```bash
git add .
git commit -m "Update: describe your changes"
git push
```

---

## GitHub Pages पर Deploy (Optional - Website को Live करने के लिए)

1. GitHub repository में जाएं
2. **Settings** tab पर click करें
3. Left sidebar में **Pages** option select करें
4. Source में **"Deploy from a branch"** select करें
5. Branch: **main**, Folder: **/ (root)**
6. **Save** करें
7. कुछ minutes बाद आपकी website live होगी:
   `https://YOUR_USERNAME.github.io/REPO_NAME`

---

**Need Help?** GitHub documentation देखें या issues report करें!

