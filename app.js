"use strict";
const C = window.CONTENT;
const KEY = "turkce-demo-v1";
const LANGS = ["ky", "ru", "en"];

const UI = {
  ky: { topics: "Темалар", vocab: "Сөздөр", dialog: "Диалог", ex: "Көнүгүүлөр", dict: "Сөздүк", pts: "упай", back: "Артка", tap: "Сөздү басыңыз", match: "Жуптарды тап", yn: "Туурабы?", yes: "Ооба", no: "Жок", ok: "Туура!", bad: "Туура эмес", again: "Кайра", score: "Жыйынтык", video: "Видео жакында", search: "Издөө", listen: "Угуу", close: "Жабуу", demo: "Демо версия", pickEx: "Көнүгүүнү тандаңыз", level: "Деңгээл", done: "Бүттү" },
  ru: { topics: "Темы", vocab: "Слова", dialog: "Диалог", ex: "Упражнения", dict: "Словарь", pts: "баллов", back: "Назад", tap: "Нажмите на слово", match: "Найди пары", yn: "Верно?", yes: "Да", no: "Нет", ok: "Верно!", bad: "Неверно", again: "Ещё раз", score: "Результат", video: "Видео скоро", search: "Поиск", listen: "Слушать", close: "Закрыть", demo: "Демо-версия", pickEx: "Выберите упражнение", level: "Уровень", done: "Готово" },
  en: { topics: "Topics", vocab: "Vocabulary", dialog: "Dialogue", ex: "Exercises", dict: "Dictionary", pts: "points", back: "Back", tap: "Tap a word", match: "Match the pairs", yn: "Correct?", yes: "Yes", no: "No", ok: "Correct!", bad: "Wrong", again: "Again", score: "Score", video: "Video coming soon", search: "Search", listen: "Listen", close: "Close", demo: "Demo version", pickEx: "Choose an exercise", level: "Level", done: "Done" }
};

// ---------- состояние (localStorage, с защитой от ошибок) ----------
const fresh = () => ({ lang: "ru", points: 0, seen: {}, dialog: {}, ex: {} });
let S = (() => { try { return Object.assign(fresh(), JSON.parse(localStorage.getItem(KEY) || "{}")); } catch (e) { return fresh(); } })();
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };

const t = (k) => UI[S.lang][k];
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const $ = (s, r = document) => r.querySelector(s);
const topicById = (id) => C.topics.find((x) => x.id === id);
const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

// Произношение: встроенный синтез речи браузера (tr-TR). Настоящие аудиозаписи — позже.
const canSpeak = "speechSynthesis" in window;
function speak(text) {
  if (!canSpeak) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "tr-TR"; u.rate = 0.85;
  speechSynthesis.speak(u);
}
const speakBtn = (text) => canSpeak ? `<button class="btn ghost" data-say="${esc(text)}" aria-label="${t("listen")}">🔊 ${t("listen")}</button>` : "";

const visual = (v) => v.hex
  ? `<div class="sw" style="background:${v.hex}"></div>`
  : `<div class="sw" aria-hidden="true">${v.emoji}</div>`;

// порядок переводов: выбранный язык первым
const trLines = (w) => [S.lang, ...LANGS.filter((l) => l !== S.lang)]
  .map((l, i) => `<div class="${i === 0 ? "me" : ""}"><b>${l.toUpperCase()}</b><span>${esc(w[l])}</span></div>`).join("");

// ---------- прогресс ----------
function progress(id) {
  const tp = topicById(id);
  const parts = [
    (S.seen[id] || []).length >= tp.words.length,
    tp.dialog ? !!S.dialog[id] : true,
    !!(S.ex[id] && S.ex[id].match != null),
    !!(S.ex[id] && S.ex[id].yn != null)
  ];
  return Math.round((parts.filter(Boolean).length / parts.length) * 100);
}

// ---------- каркас ----------
const app = $("#app");
function shell(inner, back) {
  app.innerHTML = `
    <div class="bar">
      ${back ? `<a class="back" href="${back}">← ${t("back")}</a>` : `<span class="brand">Alatoo <b>Türkçe</b></span>`}
      <span class="pts" aria-live="polite">⭐ ${S.points} ${t("pts")}</span>
      <div class="langs" role="group" aria-label="Language">
        ${LANGS.map((l) => `<button data-lang="${l}" aria-pressed="${l === S.lang}">${l.toUpperCase()}</button>`).join("")}
      </div>
    </div>${inner}
    <p class="foot">${t("demo")} · ${C.level}</p>`;
}

// ---------- экраны ----------
function home() {
  shell(`
    <h1>Türkçe <span class="badge">${C.level}</span></h1>
    <p class="sub">${t("topics")}</p>
    <div class="list">${C.topics.map((tp) => `
      <a class="topic" href="#/t/${tp.id}/vocab">
        <span class="ic">${tp.icon}</span>
        <span class="tt"><strong>${esc(tp.name.tr)}</strong><small>${esc(tp.name[S.lang])}</small>
          <div class="prog" role="progressbar" aria-valuenow="${progress(tp.id)}" aria-valuemin="0" aria-valuemax="100"><i style="width:${progress(tp.id)}%"></i></div>
        </span><b>${progress(tp.id)}%</b>
      </a>`).join("")}
    </div>
    <h2>${t("dict")}</h2><a class="btn ghost" href="#/dict" style="display:inline-block;text-decoration:none">📖 ${t("dict")}</a>`);
}

function topicShell(tp, sec, inner) {
  const tabs = [["vocab", t("vocab")], ["dialog", t("dialog")], ["ex", t("ex")], ["dict", t("dict")]];
  shell(`
    <h1>${tp.icon} ${esc(tp.name.tr)}</h1><p class="sub">${esc(tp.name[S.lang])}</p>
    <nav class="tabs">${tabs.map(([k, n]) => `<a href="#/t/${tp.id}/${k}" ${k === sec ? 'aria-current="page"' : ""}>${n}</a>`).join("")}</nav>
    ${inner}`, "#/");
}

function vocab(tp) {
  const seen = S.seen[tp.id] || [];
  topicShell(tp, "vocab", `<p class="sub">${t("tap")}</p>
    <div class="grid">${tp.words.map((w, i) => `
      <button class="tile ${seen.includes(i) ? "seen" : ""}" data-card="${i}">${visual(w.v)}<span class="w">${esc(w.tr)}</span></button>`).join("")}
    </div><dialog id="dlg"></dialog>`);
  const dlg = $("#dlg");
  app.querySelectorAll("[data-card]").forEach((b) => b.addEventListener("click", () => {
    const i = +b.dataset.card, w = tp.words[i];
    dlg.innerHTML = `<div class="cardx">${visual(w.v)}<div class="big">${esc(w.tr)}</div>
      ${speakBtn(w.tr)}<div class="tl">${trLines(w)}</div>
      <button class="btn" id="x">${t("close")}</button></div>`;
    $("#x", dlg).addEventListener("click", () => dlg.close());
    dlg.showModal();
    if (!seen.includes(i)) { seen.push(i); S.seen[tp.id] = seen; save(); b.classList.add("seen"); }
  }));
}

function dialog(tp) {
  if (!tp.dialog) { topicShell(tp, "dialog", `<p class="sub">—</p>`); return; }
  S.dialog[tp.id] = true; save();
  topicShell(tp, "dialog", `
    <div class="video">▶ ${t("video")}</div>
    <div class="chat">${tp.dialog.map((m) => `
      <div class="msg ${m.who}"><div class="who">${m.who}</div><div class="t">${esc(m.tr)}</div>
      <div class="x">${esc(m[S.lang])}</div>${speakBtn(m.tr)}</div>`).join("")}</div>`);
}

// Упражнение 1: найди пары (тап по слову → тап по переводу; работает и на телефоне)
function exMatch(tp) {
  const pick = shuffle(tp.words).slice(0, 5);
  const right = shuffle(pick);
  const wrong = new Set(); let sel = null, left = pick.length, gained = 0;
  topicShell(tp, "ex", `<h2>${t("match")}</h2>
    <div class="pair"><div class="col">${pick.map((w, i) => `<button class="opt" data-l="${i}">${esc(w.tr)}</button>`).join("")}</div>
    <div class="col">${right.map((w, i) => `<button class="opt" data-r="${i}">${esc(w[S.lang])}</button>`).join("")}</div></div>
    <div class="fb" id="fb"></div>`);
  const L = (i) => $(`[data-l="${i}"]`), R = (i) => $(`[data-r="${i}"]`);
  app.querySelectorAll("[data-l]").forEach((b) => b.addEventListener("click", () => {
    if (sel != null) L(sel).classList.remove("sel");
    sel = +b.dataset.l; b.classList.add("sel");
  }));
  app.querySelectorAll("[data-r]").forEach((b) => b.addEventListener("click", () => {
    if (sel == null) return;
    const w = pick[sel];
    if (right[+b.dataset.r] === w) {
      [L(sel), b].forEach((e) => { e.className = "opt ok"; e.disabled = true; });
      if (!wrong.has(sel)) { S.points += 10; gained += 10; }
      sel = null; left--; save();
      $(".pts").textContent = `⭐ ${S.points} ${t("pts")}`;
      if (!left) finish(tp, "match", gained, pick.length * 10, exMatch);
    } else {
      wrong.add(sel); b.classList.add("bad"); setTimeout(() => b.classList.remove("bad"), 450);
    }
  }));
}

// Упражнение 2: верно / неверно
function exYN(tp) {
  const qs = shuffle(tp.words).slice(0, 6); let n = 0, gained = 0, locked = false;
  const show = () => {
    const w = qs[n], isTrue = Math.random() < 0.5;
    const other = shuffle(tp.words.filter((x) => x !== w))[0];
    const shown = isTrue ? w : other;
    topicShell(tp, "ex", `<div class="yn"><h2>${t("yn")} (${n + 1}/${qs.length})</h2>
      <div class="q">${esc(w.tr)}</div><div class="a">= ${esc(shown[S.lang])}</div>
      <div class="row"><button class="btn" data-a="1">✅ ${t("yes")}</button><button class="btn" data-a="0">❌ ${t("no")}</button></div>
      <div class="fb" id="fb"></div></div>`);
    locked = false;
    app.querySelectorAll("[data-a]").forEach((b) => b.addEventListener("click", () => {
      if (locked) return; locked = true;
      const good = (b.dataset.a === "1") === isTrue, fb = $("#fb");
      fb.className = "fb " + (good ? "ok" : "bad"); fb.textContent = good ? t("ok") : t("bad");
      if (good) { S.points += 10; gained += 10; save(); $(".pts").textContent = `⭐ ${S.points} ${t("pts")}`; }
      setTimeout(() => { n++; n < qs.length ? show() : finish(tp, "yn", gained, qs.length * 10, exYN); }, 700);
    }));
  };
  show();
}

function finish(tp, kind, gained, max, again) {
  S.ex[tp.id] = Object.assign(S.ex[tp.id] || {}, { [kind]: Math.max(gained, (S.ex[tp.id] || {})[kind] || 0) }); save();
  topicShell(tp, "ex", `<div class="res"><div>${t("score")}</div><div class="n">${gained} / ${max}</div>
    <p><button class="btn" id="again">${t("again")}</button></p></div>`);
  $("#again").addEventListener("click", () => again(tp));
}

function exMenu(tp) {
  topicShell(tp, "ex", `<p class="sub">${t("pickEx")}</p><div class="list">
    <button class="topic" id="m1"><span class="ic">🔗</span><span class="tt"><strong>${t("match")}</strong></span></button>
    <button class="topic" id="m2"><span class="ic">✅</span><span class="tt"><strong>${t("yn")}</strong></span></button></div>`);
  $("#m1").addEventListener("click", () => exMatch(tp));
  $("#m2").addEventListener("click", () => exYN(tp));
}

// Словарь: все слова всех тем, поиск по любому из 4 языков
function dict(tp) {
  const words = (tp ? tp.words : C.topics.flatMap((x) => x.words)).slice().sort((a, b) => a.tr.localeCompare(b.tr, "tr"));
  const inner = `<input type="search" id="q" placeholder="${t("search")}" aria-label="${t("search")}"><div class="dict" id="d"></div>`;
  tp ? topicShell(tp, "dict", inner) : shell(`<h1>📖 ${t("dict")}</h1>${inner}`, "#/");
  const draw = (q) => {
    q = q.trim().toLowerCase();
    $("#d").innerHTML = words.filter((w) => !q || ["tr", ...LANGS].some((l) => w[l].toLowerCase().includes(q)))
      .map((w) => `<div class="row"><b>${esc(w.tr)}</b>${[S.lang, ...LANGS.filter((l) => l !== S.lang)].map((l) => `<small>${l.toUpperCase()} · ${esc(w[l])}</small>`).join("")}</div>`).join("");
  };
  $("#q").addEventListener("input", (e) => draw(e.target.value)); draw("");
}

// ---------- роутер ----------
function render() {
  const [, page, id, sec] = location.hash.split("/");
  const tp = topicById(id);
  if (page === "t" && tp) ({ vocab, dialog, ex: exMenu, dict }[sec] || vocab)(tp);
  else if (page === "dict") dict(null);
  else home();
  window.scrollTo(0, 0);
}
addEventListener("hashchange", render);

// делегирование: язык интерфейса и кнопки «Слушать»
document.addEventListener("click", (e) => {
  const l = e.target.closest("[data-lang]");
  if (l) { S.lang = l.dataset.lang; save(); render(); return; }
  const s = e.target.closest("[data-say]");
  if (s) { speak(s.dataset.say); return; }
  // повторный тап по активной вкладке (например «Упражнения») возвращает в меню раздела
  const tab = e.target.closest(".tabs a");
  if (tab && tab.getAttribute("href") === location.hash) render();
});
render();
