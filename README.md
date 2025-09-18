# Speedoodle 🚀 — בדיקת מהירות אינטרנט

אתר קטן בסגנון Fast.com לבדיקת מהירות (הורדה, העלאה, פינג וג'יטר) מול Cloudflare, נבנה עם Next.js.

## הרצה מקומית
```bash
npm install
npm run dev
```
ואז לפתוח את [http://localhost:3000](http://localhost:3000)

אפשר גם לבדוק שהכול נבנה כמו שצריך עם:
```bash
npm run build
```

## פריסה ל-Vercel
1. היכנס ל-[Vercel](https://vercel.com) → Import Project
2. בחר את הריפו `speedoodle`
3. Framework = **Next.js** (ברירת המחדל)
4. Build Command = `next build`
5. Output Directory = `.next`
6. Deploy 🚀

## חיבור דומיין
- הוסף את `speedoodle.com` תחת Settings → Domains ב-Vercel
- ב-DNS של הדומיין:
  - רשומת A ל-`76.76.21.21`
  - רשומת CNAME (www) ל-`cname.vercel-dns.com`

## ניטור ביצועים
הפרויקט משתמש ב-`@vercel/speed-insights` עבור מדידת ביצועים, כך שאחרי הדיפלוי פשוט להיכנס לדומיין כדי לראות נתונים בלוח הבקרה של Vercel.
