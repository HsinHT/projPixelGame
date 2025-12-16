# Pixel Art Quiz Game 🎮

一個復古像素風格的網頁問答遊戲，結合 React 前端與 Google Sheets 作為後端資料庫。
支援像素風視覺特效 (CRT 掃描線)、DiceBear 動態頭像生成，以及即時成績結算。

## 🛠️ 技術棧
- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS (Pixel Art Config)
- **Backend**: Google Apps Script (GAS)
- **Database**: Google Sheets

---

## 🚀 快速開始 (Installation)

1. **Clone 專案並安裝依賴**
   ```bash
   npm install
   ```

2. **設定環境變數**
   複製 `.env.example` 為 `.env`：
   ```bash
   cp .env.example .env
   ```
   *稍後填入 Google Apps Script URL*

3. **啟動開發伺服器**
   ```bash
   npm run dev
   ```

---

## � 部署到 GitHub Pages

本專案已設定 GitHub Actions 自動部署流程。

### 1. 啟用 GitHub Pages
1.  將此專案上傳至 GitHub Repository。
2.  進入 Repository 的 **Settings** > **Pages**。
3.  在 **Build and deployment** 區塊：
    -   **Source**: 選擇 `GitHub Actions`。

### 2. 設定 Secrets (環境變數)
為了讓 GitHub Action 能讀取環境變數進行建置，請設定 Secrets：

1.  進入 Repository 的 **Settings** > **Secrets and variables** > **Actions**。
2.  點擊 **New repository secret**，新增以下變數 (內容參考 `.env` 或 `.env.example`)：

    | Secret Name | 說明 | 範例值 |
    | :--- | :--- | :--- |
    | `VITE_GOOGLE_APP_SCRIPT_URL` | Google Apps Script 部署網址 | `https://script.google.com/macros/s/XXX/exec` |
    | `VITE_PASS_THRESHOLD` | 通關門檻 (答對題數) | `3` |
    | `VITE_QUESTION_COUNT` | 每局題目數量 | `5` |

### 3. 觸發部署
設定完成後，只要將程式碼 Push 到 `main` 或 `master` 分支，GitHub Action 就會自動開始建置並部署。
部署完成後，您可以在 Repository 首頁右側的 **Deployments** 看到網址。

---


## �📝 後端設定 (Google Sheets & Apps Script)

### 步驟 1: 建立 Google Sheet
請建立一個新的 Google Sheet，並下方建立兩個工作表 (Tabs)：

#### 工作表 1: `題目`
欄位順序 (Row 1):
`題號` | `題目` | `A` | `B` | `C` | `D` | `解答`

#### 工作表 2: `回答`
欄位順序 (Row 1):
`ID` | `闖關次數` | `總分` | `最高分` | `第一次通關分數` | `花了幾次通關` | `最近遊玩時間`

### 步驟 2: 設定 Google Apps Script
1. 在 Google Sheets 中，點選上方選單 **「擴充功能 (Extensions)」** > **「Apps Script」**。
2. 將專案中 `backend/Code.js` 的完整程式碼複製並貼上到編輯器中。
3. 儲存專案 (Ctrl+S)。

### 步驟 3: 部署為 Web App
1. 點選右上角 **「部署 (Deploy)」** > **「新增部署 (New deployment)」**。
2. 點選齒輪圖示，選擇 **「網頁應用程式 (Web app)」**。
3. 設定如下：
   - **執行身分 (Execute as)**: `我 (My account)`
   - **誰可以存取 (Who has access)**: `所有人 (Anyone)` **(⚠️ 重要：必須選所有人，前端才能呼叫)**
4. 點選部署，授予權限。
5. **複製 Web App URL** (以 `https://script.google.com/.../exec` 結尾)。

### 步驟 4: 連接前端
打開專案中的 `.env` 檔案，填入剛才複製的網頁連結：
```env
VITE_GOOGLE_APP_SCRIPT_URL=https://script.google.com/macros/s/你的部署ID/exec
VITE_PASS_THRESHOLD=3
VITE_QUESTION_COUNT=5
```

---

## 🤖 測試題庫：生成式 AI 基礎知識 (10題)

您可以直接複製以下表格內容到 Google Sheets 的 **「題目」** 工作表 (從 A2 儲存格開始貼上)。

| 題號 | 題目 | A | B | C | D | 解答 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | ChatGPT 背後使用的核心模型架構是什麼？ | CNN (卷積神經網絡) | RNN (循環神經網絡) | Transformer (變換器) | GAN (生成對抗網絡) | Transformer (變換器) |
| 2 | 生成式 AI 產生錯誤或虛構資訊的現象稱為什麼？ | 夢遊 (Sleepwalking) | 幻覺 (Hallucination) | 遺忘 (Forgetting) | 漂移 (Drift) | 幻覺 (Hallucination) |
| 3 | 在 Prompt Engineering 中，給定模型 0 個範例讓其直接回答的方式叫什麼？ | One-shot Prompting | Few-shot Prompting | Zero-shot Prompting | Chain-of-Thought | Zero-shot Prompting |
| 4 | 下列哪一個主要是「文生圖 (Text-to-Image)」的 AI 工具？ | ChatGPT | GitHub Copilot | Midjourney | Claude | Midjourney |
| 5 | LLM 中「Context Window (上下文視窗)」的大小主要影響什麼？ | 模型的生成速度 | 模型能一次處理的資訊量/記憶長度 | 模型的訓練時間 | 模型的詞彙庫大小 | 模型能一次處理的資訊量/記憶長度 |
| 6 | 「Temperature (溫度)」參數設得越高 (例如 1.0)，AI 的回答通常會？ | 越固定、保守 | 越隨機、更有創意 | 越簡短 | 越容易出錯 | 越隨機、更有創意 |
| 7 | 將文字轉換為機器可理解的數字序列的過程稱為什麼？ | Tokenization (標記化) | Normalization (正規化) | Quantization (量化) | Pruning (剪枝) | Tokenization (標記化) |
| 8 | 下列何者並非大型語言模型 (LLM)？ | GPT-4 | Llama 3 | Claude 3 | AlphaGo | AlphaGo |
| 9 | 能夠同時處理文字、圖片、聲音等多種輸入的模型稱為什麼？ | 單模態模型 | 多模態模型 (Multimodal) | 混合模型 | 跨域模型 | 多模態模型 (Multimodal) |
| 10 | RAG 技術的全名是用來解決什麼問題？ | 減少模型訓練成本 | 讓模型能夠檢索外部知識庫以增強回答準確性 | 加快推理速度 | 自動生成提示詞 | 讓模型能夠檢索外部知識庫以增強回答準確性 |
