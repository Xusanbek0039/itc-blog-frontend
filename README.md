# 📝 ITC Blog Frontend

![Made with HTML/CSS/JS](https://img.shields.io/badge/Made%20with-HTML%2C%20CSS%2C%20JS-blue)
![API Driven](https://img.shields.io/badge/API-REST--based-success)
![Node.js Backend](https://img.shields.io/badge/Backend-Node.js-green)

ITC Blog — bu Node.js backendga ulangan, foydalanuvchi interfeysi to'liq HTML, CSS va JavaScript yordamida yozilgan zamonaviy blog platformasi frontendidir. Ushbu loyiha [https://itc-blog.uz](https://itc-blog.uz) saytida joylashgan.

## 📌 Asosiy imkoniyatlar

- 📰 Maqolalarni ko‘rish, o‘qish
- 🔐 Ro‘yxatdan o‘tish va tizimga kirish
- ✍️ Foydalanuvchilar uchun maqola yaratish (API orqali)
- 🌙 Qorong‘i/yorug‘ rejim
- 🌐 Tilni almashtirish (UZ / RU)
- 📱 To‘liq mobil moslashuvchan dizayn
- 📦 RESTful API bilan integratsiya

## 📁 Loyihaning tuzilishi

```plaintext
itc-blog-frontend/
│
├── index.html           # Bosh sahifa
├── login.html           # Kirish sahifasi
├── register.html        # Ro‘yxatdan o‘tish sahifasi
├── create.html          # Maqola yaratish formasi
├── article.html         # Maqola tafsilotlari sahifasi
├── js/
│   ├── api.js           # API so‘rovlarini boshqaruvchi fayl
│   ├── auth.js          # Kirish/chiqish jarayonlari
│   └── main.js          # UI funksiyalari
├── css/
│   └── style.css        # Bosh stil fayli
└── assets/              # Rasmlar va boshqa statik fayllar
```
🚀 Ishga tushirish (local)
1. Klonlash:
```bash
git clone https://github.com/Xusanbek0039/itc-blog-frontend.git
cd itc-blog-frontend
```

2. Backendga ulanish
Backend Node.js (Express) orqali tuzilgan bo‘lib, u alohida ishlaydi. API URL quyidagi ko‘rinishda bo‘lishi mumkin:
```bash
https://api.itc-blog.uz/api
```
Agar .env yoki konfiguratsiya fayl mavjud bo‘lsa, BASE_URL ni shu manzilga yo‘naltiring.

3. Mahalliy serverda ochish
Oddiy HTML/JS loyihasi bo‘lgani uchun VS Code Live Server orqali ochish kifoya:
```bash
# VS Code Live Server yoki:
npx serve .
```

📡 API haqida
Ushbu frontend quyidagi asosiy endpointlar orqali ishlaydi:

```bash
| Method | Endpoint           | Tavsif                          |
| ------ | ------------------ | ------------------------------- |
| POST   | /api/auth/register | Foydalanuvchi ro‘yxatdan o‘tadi |
| POST   | /api/auth/login    | Tizimga kirish                  |
| GET    | /api/articles      | Barcha maqolalarni olish        |
| GET    | /api/articles/\:id | Maqola tafsilotlari             |
| POST   | /api/articles      | Yangi maqola yaratish (auth)    |
| PUT    | /api/articles/\:id | Maqolani tahrirlash             |
| DELETE | /api/articles/\:id | Maqolani o‘chirish              |
```


🧑‍💻 Muallif
Husanbek Xusanov
Frontend Developer | YouTube: https://youtube.com/@it_creative
Sayt: https://husanbek-coder.uz


🪪 Litsenziya
Ushbu loyiha ochiq manbali va hozircha maxsus litsenziyasiz tarqatilmoqda. Istasangiz, uni MIT litsenziyasi ostida tarqatishingiz mumkin.