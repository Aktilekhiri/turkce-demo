// Ala-Too Türkçe v3 — данные, состояние, i18n, утилиты. Всё локально (mock), бэкенда нет.
(() => {
const D = window.DESIGN, C = window.CONTENT, X = window.EXTRA;
const LANGS = ["en","ru","ky","tr"];
const TX = { // key: [en, ru, ky, tr]; пропуск → английский
 home:["Home","Главная","Башкы бет","Ana sayfa"], path:["Journey","Путь","Жол","Yolculuk"], dict:["Dictionary","Словарь","Сөздүк","Sözlük"], stats:["Progress","Прогресс","Прогресс","İlerleme"], cert:["Certificate","Сертификат","Сертификат","Sertifika"], teacher:["Teacher","Преподаватель","Мугалим","Öğretmen"], admin:["Admin","Админ","Админ","Yönetici"],
 start:["Start learning","Начать учиться","Окуганды баштоо","Öğrenmeye başla"], signin:["Sign in","Войти","Кирүү","Giriş yap"], signup:["Create account","Регистрация","Каттоо","Kayıt ol"], guest:["Continue as guest","Продолжить как гость","Конок катары улантуу","Misafir olarak devam et"], google:["Continue with Google (demo)","Войти через Google (демо)","Google менен кирүү (демо)","Google ile devam et (demo)"],
 email:["Email","Эл. почта","Эл. почта","E-posta"], pass:["Password","Пароль","Сырсөз","Şifre"], name:["Full name","Имя и фамилия","Аты-жөнү","Ad soyad"], forgot:["Forgot password?","Забыли пароль?","Сырсөздү унуттуңузбу?","Şifreni mi unuttun?"], send:["Send reset link","Отправить ссылку","Шилтеме жөнөтүү","Bağlantı gönder"], mock:["Demo mode: nothing is sent to a server.","Демо: данные никуда не отправляются.","Демо: маалымат серверге жөнөтүлбөйт.","Demo: veri sunucuya gönderilmez."],
 next:["Continue","Дальше","Улантуу","Devam"], back:["Back","Назад","Артка","Geri"], check:["Check","Проверить","Текшерүү","Kontrol et"], close:["Close","Закрыть","Жабуу","Kapat"], finish:["Finish","Завершить","Бүтүрүү","Bitir"], retry:["Try again","Ещё раз","Кайра аракет","Tekrar dene"],
 ok:["Correct!","Верно!","Туура!","Doğru!"], no:["Not quite","Неверно","Ката","Yanlış"], answer:["Answer:","Ответ:","Жооп:","Cevap:"],
 welcome:["Welcome back","С возвращением","Кайра кош келдиңиз","Tekrar hoş geldin"], level:["Level","Уровень","Деңгээл","Seviye"], goal:["Daily goal","Цель дня","Күндүк максат","Günlük hedef"], xp:["XP","XP","XP","XP"], streak:["Day streak","Дней подряд","Күн катары","Günlük seri"], hearts:["Hearts","Жизни","Жүрөктөр","Canlar"], crystals:["Crystals","Кристаллы","Кристаллдар","Kristaller"], minutes:["min","мин","мүн","dk"],
 cont:["Continue learning","Продолжить","Улантуу","Öğrenmeye devam"], review:["Review words","Повторить слова","Сөздөрдү кайталоо","Kelimeleri tekrarla"], recent:["Recently learned","Недавно выучено","Жакында үйрөнүлгөн","Yeni öğrenilenler"], ach:["Achievements","Достижения","Жетишкендиктер","Başarılar"],
 units:["Units","Юниты","Бөлүмдөр","Üniteler"], vocab:["Vocabulary","Слова","Сөздөр","Kelimeler"], dialogs:["Dialogues","Диалоги","Диалогдор","Diyaloglar"], exercises:["Exercises","Упражнения","Көнүгүүлөр","Alıştırmalar"], test:["Unit test","Тест юнита","Бөлүм тести","Ünite testi"], wordlist:["Word list","Список слов","Сөздөр тизмеси","Kelime listesi"],
 flash:["Flashcards","Карточки","Карточкалар","Kartlar"], practice:["Practice","Практика","Практика","Pratik"], mixed:["Mixed exercises","Смешанные упражнения","Аралаш көнүгүүлөр","Karışık alıştırmalar"],
 soon:["Content in preparation","Материалы готовятся","Материалдар даярдалууда","İçerik hazırlanıyor"], words:["words","слов","сөз","kelime"], done:["Completed","Пройдено","Бүттү","Tamamlandı"],
 known:["Known","Знаю","Билем","Biliyorum"], again:["Review again","Повторить","Кайталоо","Tekrar"], tapflip:["Tap to reveal translations","Нажмите, чтобы увидеть перевод","Которууну көрүү үчүн басыңыз","Çeviriler için dokun"], slow:["Slow","Медленно","Жай","Yavaş"], example:["Example","Пример","Мисал","Örnek"], noex:["Example sentence in preparation","Пример готовится","Мисал даярдалууда","Örnek cümle hazırlanıyor"],
 replay:["Replay","Повтор","Кайра","Tekrar"], playall:["Play all","Проиграть всё","Баарын ойнотуу","Hepsini oynat"], speed:["Speed","Скорость","Ылдамдык","Hız"], taptr:["Tap a line to translate","Нажмите на реплику","Которуу үчүн басыңыз","Çeviri için dokun"],
 search:["Search in 4 languages…","Поиск на 4 языках…","4 тилде издөө…","4 dilde ara…"], allunits:["All units","Все юниты","Бардык бөлүмдөр","Tüm üniteler"], favs:["Favorites","Избранное","Тандалмалар","Favoriler"], mywords:["My words","Мои слова","Менин сөздөрүм","Kelimelerim"], nores:["Nothing found","Ничего не найдено","Эч нерсе табылган жок","Sonuç yok"],
 passed:["Test passed","Тест сдан","Тест ийгиликтүү","Test geçildi"], failed:["Not passed yet","Пока не сдан","Азырынча өткөн жок","Henüz geçilmedi"], score:["Score","Результат","Жыйынтык","Puan"], threshold:["Passing score","Проходной балл","Өтүү балы","Geçme notu"], timer:["Timer","Таймер","Таймер","Zamanlayıcı"],
 accuracy:["Accuracy","Точность","Тактык","Doğruluk"], learned:["Words learned","Выучено слов","Үйрөнүлгөн сөз","Öğrenilen kelime"], week:["This week","Эта неделя","Бул апта","Bu hafta"], time:["Learning time","Время обучения","Окуу убактысы","Öğrenme süresi"],
 lang:["Language","Язык","Тил","Dil"], trlang:["Translations","Переводы","Которуулар","Çeviriler"], demo:["Load demo progress","Загрузить демо-прогресс","Демо прогресс","Demo ilerleme yükle"], reset:["Reset","Сбросить","Тазалоо","Sıfırla"],
 print:["Print","Печать","Басып чыгаруу","Yazdır"], export:["Export CSV","Экспорт CSV","CSV экспорт","CSV dışa aktar"], soonlbl:["soon","скоро","жакында","yakında"],
 mic:["Say it aloud","Скажите вслух","Үн чыгарып айтыңыз","Yüksek sesle söyle"], iSaid:["I said it","Я сказал(а)","Мен айттым","Söyledim"], skip:["Skip","Пропустить","Өткөрүп жиберүү","Atla"]
};
const li = () => Math.max(0, LANGS.indexOf(S.ui));
const t = k => (TX[k] ? (TX[k][li()] || TX[k][0]) : k);
const KEY = "turkce-v3";
let S; try { S = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
S = Object.assign({ ui:"ru", tr:"ru", user:null, pref:null, xp:0, hearts:5, crystals:0, streak:0, last:"", done:{}, known:{}, fav:[], badges:[], act:[0,0,0,0,0,0,0], mins:0, scores:[], acc:[0,0], pass:80, role:"student", pub:{}, appr:{} }, S || {});
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };
const trl = () => (["ky","ru","en"].includes(S.tr) ? S.tr : "ru");
const L = o => o[trl()] || o.en || "";
const TT = o => o[S.ui === "tr" ? trl() : S.ui] || o.en;   // перевод заголовка на язык интерфейса
const h = (tag, a, ...kids) => { const e = document.createElement(tag); for (const k in a || {}) { const v = a[k]; if (k === "class") e.className = v; else if (k.startsWith("on")) e.addEventListener(k.slice(2), v); else if (k === "html") e.innerHTML = v; else if (v !== false && v != null) e.setAttribute(k, v); } for (const c of kids.flat(9)) if (c != null && c !== false) e.append(c.nodeType ? c : document.createTextNode(c)); return e; };
const shuf = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
const norm = s => s.toLocaleLowerCase("tr").replace(/ı/g,"i").replace(/ş/g,"s").replace(/ğ/g,"g").replace(/ü/g,"u").replace(/ö/g,"o").replace(/ç/g,"c").replace(/[^a-z0-9а-яёүөң ]/g,"").replace(/\s+/g," ").trim();
const nrm2 = s => s.toLocaleLowerCase().replace(/ё/g,"е").replace(/ү/g,"у").replace(/ө/g,"о").replace(/ң/g,"н");
const search = (s, q) => nrm2(norm(s)).includes(nrm2(norm(q)));
const lev = (a, b) => { const d = [...Array(b.length + 1).keys()]; for (let i = 1; i <= a.length; i++) { let p = d[0]; d[0] = i; for (let j = 1; j <= b.length; j++) { const q = d[j]; d[j] = Math.min(d[j] + 1, d[j - 1] + 1, p + (a[i - 1] === b[j - 1] ? 0 : 1)); p = q; } } return d[b.length]; };
const close = (a, b) => { a = norm(a); b = norm(b); return a === b || (b.length > 4 && lev(a, b) <= 1); };
const speak = (txt, cb, rate) => { try { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(txt); u.lang = "tr-TR"; u.rate = rate || .9; if (cb) u.onend = cb; speechSynthesis.speak(u); if (cb && !speechSynthesis.getVoices().length) setTimeout(cb, 900); } catch (e) { cb && cb(); } };
const IMG = f => "../../v2/img/" + f;
// ---- данные курса: 19 юнитов
const U19 = [
 ["alfabe","Alfabe","Алфавит","Алфавит","Alphabet","🔤",210],["renkler","Renkler","Цвета","Түстөр","Colours","🎨",330],["gunler","Haftanın Günleri","Дни недели","Жуманын күндөрү","Days of the Week","📅",40],
 ["tanisma","Tanışma ve Selamlaşma","Знакомство и приветствия","Таанышуу жана саламдашуу","Greetings","👋",170],["nerelisin","Nerelisin?","Откуда ты?","Кайдансың?","Countries","🌍",200],["sinif","Sınıftayız","Мы в классе","Биз класстабыз","Classroom","🏫",25],
 ["aile","Benim Ailem","Моя семья","Менин үй-бүлөм","My Family","👪",350],["ozellik","Kişisel Özellikler","Личные качества","Жеке сапаттар","Personal Characteristics","🙂",50],["ev","Benim Evim","Мой дом","Менин үйүм","My Home","🏠",20],
 ["meslek","Meslekler","Профессии","Кесиптер","Professions","👩‍⚕️",215],["gun","Bir Günüm","Мой день","Менин күнүм","My Day","⏰",270],["sehir","Şehir","Город","Шаар","City","🏙️",195],
 ["ulasim","Ulaşım","Транспорт","Транспорт","Transport","🚌",150],["manav","Manavdan Ne Alırsınız?","Что вы купите у зеленщика?","Жашылча дүкөнүнөн эмне аласыз?","At the Greengrocer","🍅",5],["hayvan","Hayvanlar Âlemi","Мир животных","Жаныбарлар дүйнөсү","Animals","🐾",120],
 ["hava","Bugün Hava Nasıl?","Какая сегодня погода?","Бүгүн аба ырайы кандай?","Weather","⛅",205],["kiyafet","Kıyafetler","Одежда","Кийимдер","Clothes","👕",290],["saglik","Sağlık","Здоровье","Ден соолук","Health","🩺",0],["davet","Davetlisiniz","Вы приглашены","Сиздер чакырылдыңыздар","Invitations","💌",310]
].map((r, i) => ({ id:r[0], n:i + 1, tr:r[1], name:{ ru:r[2], ky:r[3], en:r[4] }, icon:r[5], hue:r[6] }));
const CU = {}; [...C.units, ...X.units].forEach(u => CU[u.id] = u);
const DLG = Object.assign({}, C.dialogs, X.dialogs);
U19.forEach(u => { u.c = CU[u.id] || null; });
const allWords = () => { const m = new Map(); U19.forEach(u => u.c && u.c.lessons.forEach(l => (l.words || []).concat((l.pairs || []).map(p => p.job)).forEach(w => { if (!m.has(w.tr)) m.set(w.tr, Object.assign({ unit:u.id }, w)); }))); return [...m.values()]; };
const unitWords = u => u.c ? [...new Map(u.c.lessons.flatMap(l => (l.words || []).concat((l.pairs || []).map(p => p.job))).map(w => [w.tr, w])).values()] : [];
const unitLines = u => u.c ? u.c.lessons.filter(l => l.type === "dialog").flatMap(l => DLG[l.dialog].lines) : [];
const lessonPct = id => S.done[id] != null ? S.done[id] : null;
const unitPct = u => { if (!u.c) return 0; const ls = u.c.lessons; return Math.round(ls.filter(l => S.done[l.id] != null).length / ls.length * 100); };
const nextUnit = () => U19.find(u => u.c && unitPct(u) < 100) || U19.find(u => u.c);
const nextLesson = u => u.c.lessons.find(l => S.done[l.id] == null) || u.c.lessons[0];
const today = () => new Date().toISOString().slice(0, 10);
const touch = (xp, mins) => { const d = today(); if (S.last !== d) { const gap = S.last ? Math.min(7, Math.round((new Date(d) - new Date(S.last)) / 864e5)) : 0; for (let i = 0; i < gap; i++) { S.act.shift(); S.act.push(0); } const y = new Date(Date.now() - 864e5).toISOString().slice(0, 10); S.streak = S.last === y ? S.streak + 1 : 1; S.last = d; } S.xp += xp; S.act[6] += mins || 1; S.mins += mins || 1; };
const BADGES = [["first","🌱",["First lesson","Первый урок"]],["perf","💯",["100% score","100% результат"]],["unit","🏔️",["Unit completed","Юнит пройден"]],["streak","🔥",["3-day streak","3 дня подряд"]],["words","📚",["25 words known","25 слов выучено"]],["test","🎓",["Unit test passed","Тест сдан"]]];
const award = b => { if (!S.badges.includes(b)) { S.badges.push(b); return true; } return false; };
const knownCount = () => Object.keys(S.known).filter(k => S.known[k]).length;
const seedDemo = () => { S.xp = 840; S.streak = 6; S.crystals = 14; S.hearts = 5; S.mins = 214; S.act = [18, 25, 12, 30, 22, 15, 20]; S.last = today(); S.acc = [186, 231]; S.scores = [{u:"tanisma",p:88},{u:"renkler",p:100},{u:"ev",p:76}];
  ["ren-1","ren-t","tan-1","tan-2","tan-t","ev-1","ev-2","ev-3","ev-4"].forEach((id, i) => S.done[id] = [100,100,90,100,88,95,80,100,85][i]);
  allWords().slice(0, 48).forEach(w => S.known[w.tr] = true); S.badges = BADGES.map(b => b[0]); S.fav = ["merhaba","öğretmen","buzdolabı"]; save(); };
window.LIB = { D, C, X, LANGS, t, S, save, trl, L, TT, h, shuf, norm, search, close, speak, IMG, U19, CU, DLG, allWords, unitWords, unitLines, unitPct, lessonPct, nextUnit, nextLesson, touch, BADGES, award, knownCount, seedDemo, TX, today };
})();
