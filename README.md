<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/12eW0QHUlFthjv4pwkbQSFrIOUZSUYcjv

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`


## Deploy To GitHub Pages


步驟 1：將本地程式碼推送到 GitHub
```
# 初始化 git (如果還沒做過)
git init

# 將所有檔案加入暫存區
git add .

# 提交檔案
git commit -m "Initial commit"

git remote add origin https://github.com/bustlec/stock-supply-chain.git
git branch -M main
git push -u origin main
```

步驟 2：安裝 GitHub Pages 部署工具
```
ng add angular-cli-ghpages
```

步驟 3：執行部署指令

因為 GitHub Pages 的網址通常是 https://帳號.github.io/專案名稱/，所以我們必須設定 Base HREF，否則 CSS 和 JS 檔案會找不到。
```
ng deploy --base-href=/stock-supply-chain/
```
步驟 5：完成！

等待指令執行完畢，最後會顯示 
```
🌟 Successfully published via angular-cli-ghpages!
```
前往您的 GitHub Repository 頁面。
點擊 Settings > Pages。
您應該會看到您的網站連結 https://bustlec.github.io/stock-supply-chain/
（可能需要等待 1-2 分鐘生效）。
