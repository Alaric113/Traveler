PWA (React + Firebase) 項目管理
├── 項目管理
│   ├── 創建項目
│   │   ├── 名稱 (必填)
│   │   │   └── 文字輸入
│   │   ├── 描述 (可選)
│   │   │   └── 文字輸入 (可展開)
│   │   ├── 類型 (自定義 & 預設)
│   │   │   ├── 下拉選單 (預設類型)
│   │   │   ├── 自定義輸入框
│   │   │   ├── 視覺化標籤/類別  [Image of Project Type Selection with Presets and Custom Input]
│   │   │   └── 範本  [Image of Project Templates for Different Project Types]
│   │   ├── 形成日期 (Formation Date)
│   │   │   ├── 日期選擇器 (Date Picker) [Image of Date Picker UI Component]
│   │   │   ├── 預設為當天日期 (可選)
│   │   │   └── 可手動調整
│   │   └── ... (其他創建項目相關功能)
│   ├── 編輯項目
│   │   ├── 修改項目資訊
│   │   ├── 即時預覽 [Image of Edit Project Form with Live Preview]
│   │   └── 版本控制 (可選) [Image of Project Edit History with Version Control]
│   ├── 刪除項目
│   │   ├── 二次確認彈窗 [Image of Delete Project Confirmation Dialog with Warning]
│   │   ├── 警告訊息
│   │   └── 軟刪除 (可選)
│   ├── 項目列表
│   │   ├── 多種視圖模式
│   │   │   ├── 列表視圖
│   │   │   ├── 卡片視圖
│   │   │   └── 看板視圖 [Image of Project List with List View, Card View, and Kanban View Toggle]
│   │   ├── 篩選與排序 [Image of Project List with Filtering and Sorting Options]
│   │   │   ├── 豐富篩選條件 (類型, 形成日期, 時間, 關鍵字等)
│   │   │   └── 多種排序方式 (名稱, 日期, 類型, 形成日期等)
│   │   ├── 分組顯示 (按類型, 狀態等) [Image of Project List Grouped by Project Type]
│   │   └── 自訂列表欄位 [Image of Project List with Customizable Columns]
│   └── 項目詳細資訊
│       ├── 導航標籤 (Tabs) [Image of Project Details Page with Tabs for Wishlist, Expenses, and Itinerary]
│       │   ├── 願望清單
│       │   ├── 費用分析
│       │   └── 行程規劃
│       ├── 儀表板概覽 (Dashboard) [Image of Project Details Dashboard Overview with Key Metrics]
│       │   └── 項目進度, 費用總覽, 近期行程等
│       ├── 上下文操作按鈕 [Image of Section Headers with Contextual Action Buttons like "Add Wish"]
│       │   └── "新增願望", "新增費用", "新增行程" 等
│       ├── 願望清單
│       │   ├── 新增願望
│       │   │   └── 表單 (標題, 描述, 優先級) [Image of Add Wishlist Item Form Example]
│       │   ├── 編輯願望
│       │   │   └── 表單 / 原位編輯
│       │   ├── 刪除願望
│       │   │   └── 確認
│       │   ├── 願望列表
│       │   │   ├── 列表視圖 [Image of Wishlist Example]
│       │   │   ├── 優先級標籤 [Image of Wishlist with Priority Labels (High, Medium, Low)]
│       │   │   ├── 狀態指示 [Image of Wishlist with Status Indicators (To Do, In Progress, Completed)]
│       │   │   └── 拖曳排序 [Image of Wishlist with Drag and Drop Reordering]
│       │   └── 願望優先級
│       │       └── 高, 中, 低
│       │   └── 願望狀態追蹤
│       │       └── 待辦, 進行中, 已完成
│       ├── 費用分析
│       │   ├── 新增費用
│       │   │   └── 表單 (名稱, 金額, 日期, 類別等) [Image of Add Expense Form Example]
│       │   ├── 編輯費用
│       │   │   └── 表單 / 原位編輯
│       │   ├── 刪除費用
│       │   │   └── 確認
│       │   ├── 費用列表
│       │   │   └── 列表視圖 [Image of Expense List Example]
│       │   ├── 費用總覽 [Image of Expense Overview Example]
│       │   │   ├── 總支出, 預算比較
│       │   │   └── 視覺化摘要
│       │   ├── 分類統計 [Image of Expense Category Statistics Example]
│       │   │   ├── 圓餅圖, 柱狀圖, 折線圖 [Image of Expense Analysis Charts including Pie Chart, Line Chart, and Bar Chart]
│       │   │   └── 可自訂類別, 類別管理 [Image of Expense Category Management Panel with Add, Edit, Delete, and Reorder Options]
│       │   ├── 預算設定與追蹤 [Image of Expense Analysis with Budget Setting and Progress Tracking]
│       │   └── 費用匯出 (CSV, Excel) [Image of Expense Export Button with CSV and Excel Options]
│       └── 行程規劃
│           ├── 新增行程
│           │   └── 表單 (名稱, **行程日期 (Itinerary Date)**, 描述, 參與者, 重複) [Image of Add Itinerary Item Form Example]
│           │       └── **行程日期 (Itinerary Date)**  (原為：時間)
│           │           └── 日期時間選擇器 (Date & Time Picker) [Image of Date and Time Picker UI Component]
│           ├── 編輯行程
│           │   └── 表單 / 原位編輯
│           ├── 刪除行程
│           │   └── 確認
│           ├── 行程列表
│           │   └── 列表視圖 [Image of Itinerary List Example]
│           ├── 日曆視圖 [Image of Calendar View Example]
│           │   ├── 日曆組件
│           │   ├── 拖曳調整行程 [Image of Calendar View with Drag and Drop Event Rescheduling and Direct Event Creation]
│           │   └── 直接日曆上新增行程
│           ├── 行程提醒 [Image of Itinerary Item with Reminder Setting (e.g., 15 minutes before)]
│           │   └── 行程前通知 (應用內, 推播)
│           ├── 行程參與者 [Image of Itinerary Item with Participant List and Add Participant Option]
│           └── 行程重複設定 [Image of Itinerary Item with Recurrence Setting (Daily, Weekly, Monthly)]
├── Firebase
│   ├── Realtime Database
│   │   ├── 資料儲存 (JSON)
│   │   └── 即時同步 (協作)
│   └── Hosting
│       └── 網站部署 (靜態資源, CDN, SSL)
└── 技術細節
    ├── React
    │   ├── 元件化開發 (可重用 UI)
    │   └── 狀態管理 (Hooks / Redux / Zustand)
    ├── PWA
    │   ├── manifest.json (PWA 元數據)
    │   └── Service Worker (快取, 離線, 推播)
    └── Firebase SDK
        └── 資料庫存取 (簡化 Firebase 互動)