## Trip SIM card with Next.js

## 目錄結構

    .
    ├── .next                 
    ├── components         
    │   ├── common              # 共用 component
    │   ├── constants
    │       ├── index.js        # constant data
    │   ├── delivery
    │   ├── Header
    │   ├── payment
    │   ├── Product
    │   ├── Provider            # 所有 Provider
    │   ├── Footer
    ├── lib                     # 共用 function
    │   ├── helper
    │       ├── data.js         
    │       ├── fetch.js        # fetch api
    │       ├── screen.js       # 畫面有關
    │   ├── helper.js
    ├── pages                   
    │   ├── _app.js             # 設定檔
    │   ├── _document.js        # 設定檔
    │   ├── booking.js          # 產品介紹
    │   ├── index.js            # 首頁
    │   ├── process.js          # 訂購流程
    │   └── thanks.js           # 訂單完成頁
    ├── static                  # 靜態檔案，圖片
    ├── styled                  # css
    ├── sw
    │   └── service-worke.js    
    ├── .babelrc
    ├── .eslintrc.js
    ├── .gitignore
    ├── next.config.js
    ├── package.json
    ├── server.js
    

## Web: 

```bash
漫遊卡官網正式站域名為： www.aircoolnet.com

# beta（使用 branch:develop）
http://beta-www.aircoolnet.com
server IP : 10.32.2.41
folder : /webapp/roam
```

## Technologies: 
1. react Hook
2. react Context
3. service-worke
4. Material-UI
5. ESLint

## Deploy:

```bash
$ npm run build
$ pm2 restart
```

## 備註:
#### 登入(Header.js)
1. 回如意卡網站
2. url 如果有 '/?sessionId' 拿下 value 存入 localStorage

#### Provider
1. MainProvider.js
2. MemberProvider.js
3. PayProvider.js
4. ProductProvider.js
