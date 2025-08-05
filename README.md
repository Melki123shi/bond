# 💵 Bond Search Form & Results Table

A modern Next.js app to filter and display bond data with style and speed.

---

## ✨ Overview

This project is a **Next.js** application that allows users to **search and filter bonds** based on:

* 📈 **Coupon rate range**
* 📅 **Maturity date range**

The results are displayed in a **responsive**, easy-to-read table using **mock data**, with clear feedback when no results are found.

Built using modern tools like:

* ⚡️ Next.js
* 🎨 Tailwind CSS
* 🧠 Zustand (state management)
* 🧩 Shadcn UI (components)
* ✅ Zod (input validation)

---

## 🔍 Features

### 🔧 Bond Search Form

Filter bonds by:

* 📉 **Min & Max Coupon Rate** (%)
* 📆 **Maturity Date Range** (Before and After)

### 📊 Results Table

Displays matching bonds with:

* 🏷️ **Bond Name & Issuer**
* 💸 **Coupon Rate (%)**
* 🗓️ **Maturity Date**
* 💰 **Face Value**
* 📉 **Market Price**
* 🟢🟡🔵 **Status**:

  * Premium (🟢 Green)
  * Discount (🔴 Red)
  * Par (🔵 Blue)

### 🛡️ Input Validation

* Ensures **positive numbers** and **valid date ranges**
* Ensures **min ≤ max** and logical inputs

### 💻 Responsive Design

* Clean layout
* Optimized for **all screen sizes**
* Form on top, table below

### 😕 No Results Message

* Friendly message with an icon when nothing matches

### 🔄 Reset Filters

* One-click **clear/reset** button

---

## 📦 Prerequisites

Make sure you have:

* 🟢 **Node.js** ≥ 18
* 📦 **npm** ≥ 8

---

## ⚙️ Installation

```bash
# 1. Clone the repo
git clone <repository-url>
cd bond

# 2. Install dependencies
npm install

# 3. Run the dev server
npm run dev
```

Open 👉 [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚀 Production Build

```bash
# Build for production
npm run build

# Start the production server
npm start
```

---

## 📸 Screenshots
<img width="1905" height="886" alt="image" src="https://github.com/user-attachments/assets/920fbd09-3feb-4450-ad34-e3f153e6ddda" />


---

## 🗂️ Project Structure

```
bond/
├── components/              # Reusable components
│   ├── BondResultsTable.tsx # Results table
│   ├── BondSearchForm.tsx   # Search form
│   ├── Header.tsx           # Page header
│   └── ui/                  # Shadcn UI elements
├── store/
│   └── bondStore.ts         # Zustand store & mock data
├── types/
│   └── bond.ts              # Bond & filter types
├── pages/
│   └── page.tsx             # Main page
├── public/
│   └── screenshots/         # 📸 Screenshot folder
├── styles/                  # Tailwind styles
├── package.json             # Project metadata & scripts
└── README.md                # You’re here!
```

---

## 🧩 Dependencies

* 🧪 [Next.js](https://nextjs.org/)
* ⚛️ [React](https://reactjs.org/)
* 🌈 [Tailwind CSS](https://tailwindcss.com/)
* 🔗 [Zustand](https://zustand-demo.pmnd.rs/)
* 💡 [Lucide React](https://lucide.dev/)
* 🧱 [Shadcn UI](https://ui.shadcn.com/)
* 📏 [Zod](https://zod.dev/)

---

## 🛠️ Usage

1. Open the app in your browser.
2. Use the form to:

   * 🔽 Enter **min & max coupon rate**
   * 📅 Pick a **maturity date range**
3. Scroll down to view **filtered bond results**.
4. Click **“Reset Filters”** to start fresh.

---

## 🧠 Development Notes

* **State Management:**
  Zustand handles the filters and bond list.

* **Validation:**
  Zod and custom logic ensure clean input.

* **Mock Data:**
  Static bond list (5–10 items) lives in `bondStore.ts`.

* **UI Library:**
  Built using **Shadcn UI** components & **Lucide** icons.

* **Mobile Friendly:**
  Responsive layout using Tailwind grid/flex.

---

## 🔮 Future Improvements

* 🔀 Add **sorting** (e.g., by coupon or maturity date)
* 📄 Add **pagination** for large datasets
* 🔌 Connect to **live bond API**
* 🔍 Add **advanced filters** (issuer, type, etc.)

---

## 🪪 License

MIT License 📄
Feel free to use, fork, and build on this project!

---
