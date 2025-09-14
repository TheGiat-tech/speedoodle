# Speedoodle 🚀 — בדיקת מהירות אינטרנט

אתר קטן בסגנון Fast.com לבדיקת מהירות (הורדה, העלאה ופינג) מול Cloudflare.

## הרצה מקומית
```bash
npx serve .
# או
python3 -m http.server 9000
```
ואז לפתוח את [http://localhost:9000](http://localhost:9000)

## פריסה ל-Vercel
1. היכנס ל-[Vercel](https://vercel.com) → Import Project
2. בחר את הריפו `speedoodle`
3. Framework = **Other**
4. Build Command = ריק
5. Output Directory = `.`
6. Deploy 🚀

## חיבור דומיין
- הוסף את `speedoodle.com` תחת Settings → Domains ב-Vercel
- ב-DNS של הדומיין:
  - רשומת A ל-`76.76.21.21`
  - רשומת CNAME (www) ל-`cname.vercel-dns.com`

