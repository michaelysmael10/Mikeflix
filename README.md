# 🎬 MIKEFLIX - Netflix-Style Streaming Platform

MIKEFLIX is a modern, production-ready streaming platform inspired by Netflix and Disney+, built using **Next.js**, **Tailwind CSS**, and **shadcn/ui**. It features user authentication, subscription management, GCash/Bank Transfer integration, Cloudinary-powered video hosting, and a clean responsive design.

---

## 🚀 Features

- ✅ User authentication (Login, Signup)
- 💳 Subscription plans (Free & Premium - Monthly/Yearly)
- 💰 GCash and Bank Transfer integration
- 🎞️ Cloudinary-based video storage and streaming
- 🎬 Movies & Series with categories and caption language options
- 🛠️ Admin panel for managing users and content
- 📝 User profiles and personal watchlists
- 📱 Responsive dark-themed UI (Netflix-inspired)
- 🌐 Footer with GitHub & LinkedIn links

---

## 📦 Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui
- **Authentication**: NextAuth or custom auth
- **Storage**: Cloudinary (videos)
- **Payment**: GCash, Bank Transfer (custom integration)
- **Deployment**: Vercel or any Node-based hosting

---

## 🛠️ Project Structure
```bash
Mikeflix/
├── app/
│   ├── admin/
│   ├── auth/
│   ├── movies/
│   ├── subscription/
│   ├── tv-shows/
│   ├── watch/
│   ├── watchlist/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Layout/
│   └── ui/
├── hooks/
│   └── use-toast.ts
├── lib/
│   ├── cloudinary.ts
│   └── utils.ts
├── types/
│   └── index.ts
├── .env.local
├── .eslintrc.json
├── .gitattributes
├── .gitignore
├── components.json
├── next-env.d.ts
├── next.config.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── tailwind.config.ts
└── README.md
```


---

## 🧪 How to Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/mikeflix.git
cd mikeflix
```

Install Dependencies
```bash
npm install
```

Configure Environment Variables
Create a .env.local file at the root and add:
```bash
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
GCASH_PAYMENT_LINK=https://...
BANK_TRANSFER_DETAILS=...
```
(Include actual credentials/configs you're using)


Run the Development Server
```bash
npm run dev
```
Go to http://localhost:3000 to see the app in action.

📌 Notes
Admin page: /admin
Watch page: /watch/[id]
Watchlist page: /watchlist
Movies & Series routes are dynamic
Payment system and Cloudinary video streaming are fully functional
Built with mobile-first responsive design





