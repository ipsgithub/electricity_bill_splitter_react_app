# Electricity Bill Splitter

A React application to split electricity bills across multiple households based on unit consumption and slab rates.

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher (bundled with Node.js)

---

## 1. Installation (Local Setup)

### Step 1 — Scaffold a new Vite + React project

```bash
npm create vite@latest electricity-bill-splitter -- --template react
cd electricity-bill-splitter
```

### Step 2 — Install dependencies

```bash
npm install
```

### Step 3 — Install and configure shadcn/ui

```bash
npx shadcn@latest init
```

Follow the prompts to configure your project. Then add the required components:

```bash
npx shadcn@latest add card input button
```

### Step 4 — Add the app component

Copy `electricity_bill_splitter_react_app.jsx` into `src/` and update `src/App.jsx` to import it:

```jsx
import ElectricityBillSplitter from './electricity_bill_splitter_react_app'

function App() {
  return <ElectricityBillSplitter />
}

export default App
```

---

## 2. Running Locally

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173` by default.

To build for production:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## 3. Deploying to Vercel

### Option A — Deploy via Vercel CLI

1. Install the Vercel CLI globally:

```bash
npm install -g vercel
```

2. From the project root, run:

```bash
vercel
```

3. Follow the prompts (log in, select scope, confirm project settings). Vercel auto-detects Vite and sets the build command to `npm run build` and the output directory to `dist`.

4. For subsequent deployments:

```bash
vercel --prod
```

### Option B — Deploy via Vercel Dashboard (GitHub)

1. Push your project to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) and click **Add New Project**.
3. Import your GitHub repository.
4. Vercel will auto-detect the Vite framework. Confirm the settings:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
5. Click **Deploy**.

Every subsequent push to the `main` branch will trigger an automatic redeployment.

---

## Project Structure

```
src/
├── components/
│   └── ui/          # shadcn/ui components (card, input, button)
├── electricity_bill_splitter_react_app.jsx
└── App.jsx
```
