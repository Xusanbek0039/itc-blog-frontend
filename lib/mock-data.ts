// Mock articles kategoriyalarini backend bilan mos keltiramiz
export const mockArticles: Array<{
  _id: string
  title: string
  content: string
  image?: string
  author: {
    name: string
    _id: string
  }
  category: string
  createdAt: string
  likes: number
  commentsCount: number
}> = [
  {
    _id: "mock-article-1",
    title: "JavaScript zamonaviy dasturlash tili",
    content:
      "JavaScript bugungi kunda eng ko'p ishlatiladigan dasturlash tillaridan biri hisoblanadi. U web-dasturlash, mobil ilovalar, server tomonidagi dasturlash va hatto desktop ilovalar yaratish uchun ishlatiladi. Bu maqolada JavaScript ning asosiy xususiyatlari va uning zamonaviy dasturlash olamidagi o'rni haqida so'z yuritamiz. JavaScript ning eng katta afzalliklaridan biri uning ko'p platformali ekanligidir.",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=2274&auto=format&fit=crop",
    author: {
      name: "Akbar Turdiyev",
      _id: "mock-user-1",
    },
    category: "Frontend", // Backend enum dan
    createdAt: new Date().toISOString(),
    likes: 42,
    commentsCount: 5,
  },
  {
    _id: "mock-article-2",
    title: "React.js bilan zamonaviy UI yaratish",
    content:
      "React.js - bu Facebook tomonidan yaratilgan JavaScript kutubxonasi bo'lib, u foydalanuvchi interfeyslarini yaratish uchun ishlatiladi. React komponentlarga asoslangan yondashuv bilan ishlab, qayta ishlatilishi mumkin bo'lgan UI elementlarini yaratish imkonini beradi. Bu maqolada React.js ning asosiy tushunchalari va undan foydalanish usullari haqida ma'lumot beramiz. React ning virtual DOM texnologiyasi performance ni sezilarli darajada oshiradi.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop",
    author: {
      name: "Dilshod Rahmonov",
      _id: "mock-user-2",
    },
    category: "Frontend", // Backend enum dan
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    likes: 38,
    commentsCount: 7,
  },
  {
    _id: "mock-article-3",
    title: "Node.js va Express bilan backend yaratish",
    content:
      "Node.js - bu JavaScript ni server tomonida ishlatish imkonini beruvchi platforma. Express esa Node.js uchun eng mashhur framework hisoblanadi. Bu maqolada Node.js va Express yordamida qanday qilib tez va samarali backend yaratish mumkinligi haqida so'z yuritamiz. Node.js ning asenkron tabiati uni juda tez va samarali qiladi. Express framework esa routing, middleware va boshqa server funksiyalarini osonlashtiradi.",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=2274&auto=format&fit=crop",
    author: {
      name: "Sardor Ibrohimov",
      _id: "mock-user-3",
    },
    category: "Backend", // Backend enum dan
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    likes: 27,
    commentsCount: 3,
  },
  {
    _id: "mock-article-4",
    title: "MongoDB - zamonaviy NoSQL ma'lumotlar bazasi",
    content:
      "MongoDB - bu document-oriented NoSQL ma'lumotlar bazasi bo'lib, u katta hajmdagi ma'lumotlarni saqlash va qayta ishlash uchun mo'ljallangan. Bu maqolada MongoDB ning asosiy xususiyatlari, uni o'rnatish va undan foydalanish usullari haqida ma'lumot beramiz. MongoDB ning JSON-ga o'xshash BSON formatida ma'lumot saqlash imkoniyati uni juda moslashuvchan qiladi. Shuningdek, MongoDB horizontal scaling imkoniyatini ham taklif etadi.",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop",
    author: {
      name: "Aziza Karimova",
      _id: "mock-user-4",
    },
    category: "Database", // Backend enum dan
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    likes: 19,
    commentsCount: 2,
  },
  {
    _id: "mock-article-5",
    title: "TypeScript - JavaScript ning kengaytmasi",
    content:
      "TypeScript - bu JavaScript ga static typing qo'shadigan dasturlash tili. U Microsoft tomonidan yaratilgan bo'lib, katta loyihalarda kod sifatini oshirish va xatolarni kamaytirish uchun ishlatiladi. Bu maqolada TypeScript ning asosiy xususiyatlari va undan foydalanish usullari haqida ma'lumot beramiz. TypeScript compile vaqtida xatolarni aniqlash imkonini beradi va IDE support ni sezilarli yaxshilaydi.",
    image: "https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?q=80&w=2070&auto=format&fit=crop",
    author: {
      name: "Bobur Aliyev",
      _id: "mock-user-5",
    },
    category: "Frontend", // Backend enum dan
    createdAt: new Date(Date.now() - 345600000).toISOString(),
    likes: 31,
    commentsCount: 4,
  },
  {
    _id: "mock-article-6",
    title: "Next.js - React uchun framework",
    content:
      "Next.js - bu React uchun framework bo'lib, u server-side rendering, static site generation, API routes va boshqa ko'plab xususiyatlarni o'z ichiga oladi. Bu maqolada Next.js ning asosiy xususiyatlari va undan foydalanish usullari haqida ma'lumot beramiz. Next.js ning file-based routing tizimi va automatic code splitting xususiyatlari development jarayonini sezilarli darajada osonlashtiradi.",
    image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=2070&auto=format&fit=crop",
    author: {
      name: "Gulnora Sobirova",
      _id: "mock-user-6",
    },
    category: "Frontend", // Backend enum dan
    createdAt: new Date(Date.now() - 432000000).toISOString(),
    likes: 45,
    commentsCount: 8,
  },
]

// Array ekanligini tekshirish
if (!Array.isArray(mockArticles)) {
  console.error("mockArticles is not an array!")
}

export const mockUser = {
  id: "mock-user-1",
  _id: "mock-user-1",
  name: "Demo Foydalanuvchi",
  email: "demo@example.com",
  bio: "Bu demo foydalanuvchi hisoblanadi. Server ishlamayotganda demo rejimda ko'rish uchun.",
  avatar: "https://ui-avatars.com/api/?name=Demo+User&background=random",
  createdAt: new Date().toISOString(),
}

export const mockComments: Array<{
  _id: string
  content: string
  author: {
    name: string
    _id: string
  }
  createdAt: string
}> = [
  {
    _id: "mock-comment-1",
    content: "Juda foydali maqola, rahmat!",
    author: {
      name: "Aziza Karimova",
      _id: "mock-user-4",
    },
    createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 soat oldin
  },
  {
    _id: "mock-comment-2",
    content: "Bu mavzu bo'yicha ko'proq ma'lumot bersangiz yaxshi bo'lardi.",
    author: {
      name: "Sardor Ibrohimov",
      _id: "mock-user-3",
    },
    createdAt: new Date(Date.now() - 7200000).toISOString(), // 2 soat oldin
  },
  {
    _id: "mock-comment-3",
    content: "Maqola juda yaxshi yozilgan, lekin ba'zi misollar qo'shish kerak deb o'ylayman.",
    author: {
      name: "Bobur Aliyev",
      _id: "mock-user-5",
    },
    createdAt: new Date(Date.now() - 10800000).toISOString(), // 3 soat oldin
  },
]

// Verify it's an array
if (!Array.isArray(mockComments)) {
  console.error("mockComments is not an array!")
}
