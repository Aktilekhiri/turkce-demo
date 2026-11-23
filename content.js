// Контент демо: взят из таблиц книги "Yabancılar İçin Temel Seviye Türkçe" (Ala-Too, 2026).
// Диалог составлен из фраз книги (переводы только из её таблиц).
// v = визуал слова: hex (цвет) или emoji. Реальные картинки из PDF подключаются позже.
window.CONTENT = {
  level: "A1",
  topics: [
    {
      id: "renkler",
      icon: "🎨",
      name: { tr: "Renkler", ky: "Түстөр", ru: "Цвета", en: "Colors" },
      words: [
        { tr: "beyaz", ky: "ак", ru: "белый", en: "white", v: { hex: "#ffffff" } },
        { tr: "turuncu", ky: "кызгылт сары", ru: "оранжевый", en: "orange", v: { hex: "#f97316" } },
        { tr: "mor", ky: "кызгылт көк / сүр", ru: "фиолетовый", en: "purple", v: { hex: "#7e22ce" } },
        { tr: "sarı", ky: "сары", ru: "жёлтый", en: "yellow", v: { hex: "#facc15" } },
        { tr: "kırmızı", ky: "кызыл", ru: "красный", en: "red", v: { hex: "#dc2626" } },
        { tr: "yeşil", ky: "жашыл", ru: "зелёный", en: "green", v: { hex: "#16a34a" } },
        { tr: "mavi", ky: "көк", ru: "синий", en: "blue", v: { hex: "#2563eb" } },
        { tr: "siyah", ky: "кара", ru: "чёрный", en: "black", v: { hex: "#111827" } },
        { tr: "kahverengi", ky: "күрөң", ru: "коричневый", en: "brown", v: { hex: "#78350f" } },
        { tr: "gri", ky: "боз", ru: "серый", en: "gray", v: { hex: "#9ca3af" } }
      ],
      dialog: null
    },
    {
      id: "tanisma",
      icon: "👋",
      name: { tr: "Tanışma ve selamlaşma", ky: "Таанышуу жана саламдашуу", ru: "Знакомство и приветствие", en: "Meeting and greeting" },
      words: [
        { tr: "Merhaba", ky: "Саламатсызбы", ru: "Здравствуйте", en: "Hello", v: { emoji: "👋" } },
        { tr: "Selam", ky: "Салам", ru: "Привет", en: "Hi", v: { emoji: "🙌" } },
        { tr: "Günaydın", ky: "Кутман таң", ru: "Доброе утро", en: "Good morning", v: { emoji: "🌅" } },
        { tr: "İyi günler", ky: "Кутман күн", ru: "Добрый день", en: "Have a nice day", v: { emoji: "☀️" } },
        { tr: "İyi akşamlar", ky: "Кутман кеч", ru: "Добрый вечер", en: "Good evening", v: { emoji: "🌆" } },
        { tr: "Adınız nedir?", ky: "Атыңыз ким", ru: "Как вас зовут?", en: "What is your name?", v: { emoji: "🪪" } },
        { tr: "Benim adım...", ky: "Менин атым...", ru: "Меня зовут...", en: "My name is...", v: { emoji: "🙋" } },
        { tr: "Tanıştığımıza memnun oldum", ky: "Таанышканыма кубанычтамын", ru: "Приятно познакомиться", en: "Nice to meet you", v: { emoji: "🤝" } },
        { tr: "Nasılsınız?", ky: "Кандайсыз?", ru: "Как дела? / Как вы?", en: "How are you?", v: { emoji: "💬" } },
        { tr: "İyiyim", ky: "Жакшы", ru: "Хорошо", en: "I am fine", v: { emoji: "🙂" } },
        { tr: "Teşekkür ederim", ky: "Рахмат", ru: "Спасибо", en: "Thank you", v: { emoji: "🙏" } },
        { tr: "Rica ederim", ky: "Арзыбайт", ru: "Пожалуйста", en: "You are welcome", v: { emoji: "😊" } },
        { tr: "Hoşça kal", ky: "Жакшы калыңыз", ru: "До свидания", en: "Goodbye", v: { emoji: "🚪" } },
        { tr: "Görüşürüz", ky: "Көрүшкөнчө", ru: "До встречи", en: "See you", v: { emoji: "🔜" } },
        { tr: "Lütfen", ky: "Сураныч", ru: "Пожалуйста", en: "Please", v: { emoji: "🤲" } },
        { tr: "Evet", ky: "Ооба", ru: "Да", en: "Yes", v: { emoji: "✅" } },
        { tr: "Hayır", ky: "Жок", ru: "Нет", en: "No", v: { emoji: "❌" } }
      ],
      dialog: [
        { who: "A", tr: "Merhaba.", ky: "Саламатсызбы", ru: "Здравствуйте", en: "Hello" },
        { who: "B", tr: "Merhaba.", ky: "Саламатсызбы", ru: "Здравствуйте", en: "Hello" },
        { who: "A", tr: "Adınız nedir?", ky: "Атыңыз ким", ru: "Как вас зовут?", en: "What is your name?" },
        { who: "B", tr: "Benim adım Ali.", ky: "Менин атым Али.", ru: "Меня зовут Али.", en: "My name is Ali." },
        { who: "A", tr: "Tanıştığımıza memnun oldum.", ky: "Таанышканыма кубанычтамын", ru: "Приятно познакомиться", en: "Nice to meet you" },
        { who: "B", tr: "Ben de memnun oldum.", ky: "Мен дагы кубанычтамын", ru: "Мне тоже", en: "Me too" },
        { who: "A", tr: "Nasılsınız?", ky: "Кандайсыз?", ru: "Как дела? / Как вы?", en: "How are you?" },
        { who: "B", tr: "İyiyim, teşekkür ederim. Siz nasılsınız?", ky: "Жакшы, рахмат. Өзүңүз кандайсыз?", ru: "Хорошо, спасибо. А вы?", en: "I am fine, thank you. And you?" },
        { who: "A", tr: "İyiyim.", ky: "Жакшы", ru: "Хорошо", en: "I am fine" },
        { who: "B", tr: "Görüşürüz.", ky: "Көрүшкөнчө", ru: "До встречи", en: "See you" },
        { who: "A", tr: "Hoşça kal.", ky: "Жакшы калыңыз", ru: "До свидания", en: "Goodbye" }
      ]
    }
  ]
};
