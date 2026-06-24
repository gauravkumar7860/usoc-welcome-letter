# USoC Welcome Letter Generator
## Lamrin Tech Skills University — University School of Computing

A professional orientation welcome letter generator for USoC students. Students enter their details and instantly receive a beautifully designed, printable, and downloadable welcome letter.

---

## Features

- Personalised welcome letter with student name, father's name, course, and gender
- Auto-updating orientation date
- Random inspirational quote on every letter
- QR Code linking to university portal
- Print-ready A4 layout
- PDF download
- Confetti celebration animation
- Fully responsive (mobile, tablet, desktop)
- No database, no login required

---

## Local Setup

### Prerequisites
- Node.js 18+
- npm

### Steps

```bash
# 1. Clone or extract the project
cd usoc-welcome

# 2. Install dependencies
npm install

# 3. Start the server
npm start

# 4. Open in browser
# http://localhost:3000
```

---

## Deploy on Render (Free)

### Step 1 — Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit — USoC Welcome Letter Generator"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/usoc-welcome.git
git push -u origin main
```

### Step 2 — Create Render Web Service

1. Go to [https://render.com](https://render.com) and sign in / sign up (free).
2. Click **New → Web Service**.
3. Connect your GitHub account and select the `usoc-welcome` repository.
4. Configure:
   - **Name**: `usoc-welcome-letter` (or anything you like)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free
5. Click **Create Web Service**.

Render will auto-deploy. Your app will be live at:
`https://usoc-welcome-letter.onrender.com` (or similar URL shown in Render dashboard).

---

## Folder Structure

```
usoc-welcome/
├── public/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── app.js
├── views/
│   └── index.ejs
├── server.js
├── package.json
└── README.md
```

---

## Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Backend    | Node.js + Express.js                |
| Templating | EJS                                 |
| Frontend   | Vanilla HTML/CSS/JS                 |
| Fonts      | Google Fonts (Cinzel, Poppins, Cormorant Garamond) |
| Libraries  | canvas-confetti, QRCode.js, html2pdf.js, AOS |

---

## Customisation

- **QR Code URL**: Change the `text` value in `generateQR()` inside `public/js/app.js`
- **Quotes**: Edit the `QUOTES` array in `public/js/app.js`
- **University Name / Branding**: Update `views/index.ejs`
- **Colours**: Adjust CSS variables at the top of `public/css/style.css`

---

© Lamrin Tech Skills University — University School of Computing
