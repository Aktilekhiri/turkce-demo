// Ala-Too Türkçe v2 — общий движок (vanilla JS, без сборки). Скин задаётся window.SKIN: "path" | "cards" | "decks".
(() => {
const C = window.CONTENT, $ = s => document.querySelector(s), app = $("#app");
const T = {
 ky:{home:"Башкы",dict:"Сөздүк",me:"Мен",start:"Баштоо",again:"Кайра",next:"Улантуу",check:"Текшерүү",ok:"Туура!",no:"Туура жооп:",xp:"XP",streak:"күн",done:"Бүттү",
  search:"Издөө…",listen:"Угуу",flash:"Сөздү үйрөн",pic:"Бул эмне?",tr:"Которуу",hear:"Эмнени уктуң?",type:"Түркчө жаз",match:"Жуптарды тап",tf:"Туурабы?",fill:"Бош жерди толтур",asm:"Сүйлөмдү түз",
  yes:"Туура",nope:"Ката",lose:"Жүрөктөр бүттү",again2:"Кайра аракет",pass:"Тест өттү!",fail:"Тест өтпөдү (керек: 80%)",words:"сөз",dialog:"Диалог",playall:"Баарын ойнотуу",tap:"Которуу үчүн сап басыңыз",
  badges:"Жетишкендиктер",lang:"Тил",close:"Жабуу",lesson:"Сабак",nores:"Табылган жок",flipH:"Басып которуу",finish:"Бүтүрүү",score:"Жыйынтык",book:"Китептеги көнүгүүлөр",test:"Тест",
  b_first:"Биринчи сабак",b_perf:"100% сабак",b_unit:"Бөлүм өттү",b_streak:"3 күн катары менен"},
 ru:{home:"Главная",dict:"Словарь",me:"Я",start:"Начать",again:"Ещё раз",next:"Дальше",check:"Проверить",ok:"Верно!",no:"Правильно:",xp:"XP",streak:"дн.",done:"Пройдено",
  search:"Поиск…",listen:"Слушать",flash:"Выучи слово",pic:"Что это?",tr:"Перевод",hear:"Что ты услышал?",type:"Напиши по-турецки",match:"Найди пары",tf:"Верно?",fill:"Заполни пропуск",asm:"Собери фразу",
  yes:"Верно",nope:"Неверно",lose:"Сердца закончились",again2:"Попробовать снова",pass:"Тест сдан!",fail:"Тест не сдан (нужно 80%)",words:"слов",dialog:"Диалог",playall:"Проиграть всё",tap:"Нажми на реплику — перевод",
  badges:"Достижения",lang:"Язык",close:"Закрыть",lesson:"Урок",nores:"Ничего не найдено",flipH:"Нажми — перевод",finish:"Завершить",score:"Результат",book:"Упражнения из книги",test:"Тест",
  b_first:"Первый урок",b_perf:"Урок на 100%",b_unit:"Юнит пройден",b_streak:"3 дня подряд"},
 en:{home:"Home",dict:"Dictionary",me:"Me",start:"Start",again:"Again",next:"Continue",check:"Check",ok:"Correct!",no:"Correct answer:",xp:"XP",streak:"days",done:"Done",
  search:"Search…",listen:"Listen",flash:"Learn the word",pic:"What is this?",tr:"Translate",hear:"What did you hear?",type:"Type in Turkish",match:"Match the pairs",tf:"True or false?",fill:"Fill in the blank",asm:"Build the phrase",
  yes:"True",nope:"False",lose:"Out of hearts",again2:"Try again",pass:"Test passed!",fail:"Test failed (80% needed)",words:"words",dialog:"Dialogue",playall:"Play all",tap:"Tap a line for translation",
  badges:"Achievements",lang:"Language",close:"Close",lesson:"Lesson",nores:"Nothing found",flipH:"Tap to translate",finish:"Finish",score:"Score",book:"Book exercises",test:"Test",
  b_first:"First lesson",b_perf:"100% lesson",b_unit:"Unit completed",b_streak:"3-day streak"}};
const KEY="turkce-v2";
let S; try{S=JSON.parse(localStorage.getItem(KEY))}catch(e){}
S=Object.assign({lang:"ru",xp:0,streak:0,last:"",done:{},badges:[]},S||{});
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}};
const t=k=>T[S.lang][k]||k, L=o=>o[S.lang]||o.en, esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const h=(tag,attrs,...kids)=>{const e=document.createElement(tag);for(const k in attrs||{}){const v=attrs[k];if(k==="class")e.className=v;else if(k.startsWith("on"))e.addEventListener(k.slice(2),v);else if(v!==false&&v!=null)e.setAttribute(k,v)}
 for(const c of kids.flat())if(c!=null&&c!==false)e.append(c.nodeType?c:document.createTextNode(c));return e};
const shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const norm=s=>s.toLocaleLowerCase("tr").replace(/ı/g,"i").replace(/ş/g,"s").replace(/ğ/g,"g").replace(/ü/g,"u").replace(/ö/g,"o").replace(/ç/g,"c").replace(/[^a-z0-9 ]/g,"").replace(/\s+/g," ").trim();
const lev=(a,b)=>{const d=[...Array(b.length+1).keys()];for(let i=1;i<=a.length;i++){let p=d[0];d[0]=i;for(let j=1;j<=b.length;j++){const q=d[j];d[j]=Math.min(d[j]+1,d[j-1]+1,p+(a[i-1]===b[j-1]?0:1));p=q}}return d[b.length]};
const close=(a,b)=>{a=norm(a);b=norm(b);return a===b||(b.length>4&&lev(a,b)<=1)};
const IMG=f=>"../img/"+f;
// ---- звук (временно: синтез речи браузера; позже — записи носителя)
const speak=(txt,cb)=>{try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(txt);u.lang="tr-TR";u.rate=.85;if(cb)u.onend=cb;speechSynthesis.speak(u);if(!speechSynthesis.getVoices().length&&cb)setTimeout(cb,900)}catch(e){cb&&cb()}};
// ---- данные
const units=C.units, allW=u=>u.lessons.flatMap(l=>l.words||[]).concat(u.lessons.flatMap(l=>(l.pairs||[]).flatMap(p=>[p.job])));
const uniq=a=>[...new Map(a.map(w=>[w.tr,w])).values()];
const findLesson=(u,l)=>{const U=units.find(x=>x.id===u);return[U,U&&U.lessons.find(x=>x.id===l)]};
const unitDone=u=>u.lessons.every(l=>S.done[l.id]!=null);
function award(b){if(!S.badges.includes(b)){S.badges.push(b);return true}return false}
function touchStreak(){const d=new Date().toISOString().slice(0,10);if(S.last===d)return;const y=new Date(Date.now()-864e5).toISOString().slice(0,10);S.streak=S.last===y?S.streak+1:1;S.last=d}
// ---- оболочка
function shell(view,active){
 app.replaceChildren(
  h("header",{class:"top"},h("a",{href:"#/",class:"brand"},h("b",null,"Ala-Too"),h("span",null,"Türkçe")),
   h("div",{class:"stats"},h("span",{class:"chip"},"🔥 "+S.streak),h("span",{class:"chip"},"⭐ "+S.xp+" "+t("xp")),
    h("select",{class:"lang","aria-label":t("lang"),onchange:e=>{S.lang=e.target.value;save();route()}},["ky","ru","en"].map(l=>h("option",{value:l,selected:l===S.lang},l.toUpperCase()))))),
  h("main",{class:"view"},view),
  h("nav",{class:"bar"},[["/","home","🏠"],["/dict","dict","📖"],["/me","me","🏅"]].map(([p,k,i])=>h("a",{href:"#"+p,class:active===k?"on":""},h("i",null,i),t(k)))));
}
// ---- главная (3 раскладки)
function home(){
 const v=h("div",{class:"home "+window.SKIN});
 units.forEach((u,ui)=>{
  const doneN=u.lessons.filter(l=>S.done[l.id]!=null).length;
  const head=h("div",{class:"unit-head",style:`--c:${u.color}`},h("span",{class:"ic"},u.icon),h("div",null,h("small",null,"Unit "+u.num+" · "+u.name.tr),h("h2",null,L(u.name))),h("em",null,doneN+"/"+u.lessons.length));
  const box=h("div",{class:"lessons"});
  u.lessons.forEach((l,i)=>{
   const d=S.done[l.id],ico={words:"🔤",dialog:"💬",book:"📘",test:"🏆",places:"📍"}[l.type];
   box.append(h("a",{class:"lesson"+(d!=null?" done":"")+(window.SKIN==="path"?" off"+(i%4):""),href:`#/l/${u.id}/${l.id}`,style:`--c:${u.color}`},
    h("span",{class:"node"},d!=null?"✓":ico),h("span",{class:"lt"},h("b",null,L(l.title)),h("small",null,l.words?l.words.length+" "+t("words"):l.type==="dialog"?t("dialog"):l.type==="test"?t("test"):t("book"))),d!=null&&h("span",{class:"pct"},d+"%")));
  });
  v.append(h("section",{class:"unit"},head,box));
 });
 shell(v,"home");
}
// ---- словарь + модалка (обычный overlay вместо <dialog>)
function dict(){
 const all=uniq(units.flatMap(allW)),inp=h("input",{type:"search",placeholder:t("search"),"aria-label":t("search"),class:"q"}),list=h("div",{class:"dl"});
 const draw=()=>{const q=norm(inp.value);const r=all.filter(w=>!q||[w.tr,w.ky,w.ru,w.en].some(x=>norm(x).includes(q)));
  list.replaceChildren(...(r.length?r.map(w=>h("button",{class:"row",onclick:()=>modal(w)},w.img?h("img",{src:IMG(w.img),alt:"",loading:"lazy"}):h("span",{class:"noimg"},w.tr[0].toUpperCase()),h("span",null,h("b",null,w.tr),h("small",null,L(w))))):[h("p",{class:"muted"},t("nores"))]))};
 inp.addEventListener("input",draw);draw();shell(h("div",null,inp,list),"dict");
}
function modal(w){
 const close=()=>m.remove(),m=h("div",{class:"ov",onclick:e=>{if(e.target===m)close()}},h("div",{class:"md",role:"dialog","aria-modal":"true"},
  w.img&&h("img",{src:IMG(w.img),alt:w.tr}),h("h3",null,w.tr),h("p",null,["ky","ru","en"].map(l=>h("span",{class:"tl"},h("i",null,l.toUpperCase()),w[l]))),
  h("div",{class:"btns"},h("button",{class:"btn ghost",onclick:()=>speak(w.tr)},"🔊 "+t("listen")),h("button",{class:"btn",onclick:close},t("close")))));
 document.body.append(m);
}
// ---- профиль
function me(){
 const names={first:"b_first",perf:"b_perf",unit:"b_unit",streak:"b_streak"},ic={first:"🌱",perf:"💯",unit:"🏆",streak:"🔥"};
 shell(h("div",{class:"me"},h("h2",null,t("badges")),h("div",{class:"badges"},Object.keys(names).map(k=>h("div",{class:"badge"+(S.badges.includes(k)?" on":"")},h("span",null,ic[k]),t(names[k])))),
  h("p",{class:"muted"},"⭐ "+S.xp+" · 🔥 "+S.streak)),"me");
}
// ---- генерация упражнений
function wordItems(ws,pool,n){
 const q=[];ws=uniq(ws);
 ws.forEach(w=>q.push({k:"flash",w}));
 const kinds=["pic","tr","listen","type"];
 shuf(ws).forEach((w,i)=>{q.push({k:w.img&&i%2===0?"pic":kinds[i%4],w,pool})});
 shuf(ws).slice(0,Math.min(4,ws.length)).forEach(w=>q.push({k:"listen",w,pool}));
 if(ws.length>=5)for(let i=0;i<ws.length&&i<10;i+=5){const g=shuf(ws).slice(0,5);q.push({k:"match",ws:g})}
 return q;
}
function choicesFor(w,pool,field){const o=shuf(uniq(pool).filter(x=>x.tr!==w.tr)).slice(0,3);return shuf([w,...o]).map(x=>({v:x,t:field==="tr"?x.tr:L(x)}))}
function dialogItems(d){
 const lines=C.dialogs[d].lines,q=[{k:"dialog",d}];
 shuf(lines.filter(l=>l.tr.split(" ").length>=3&&l.tr.split(" ").length<=8)).slice(0,3).forEach(l=>q.push({k:"asm",line:l}));
 shuf(lines).slice(0,2).forEach(l=>q.push({k:"trline",line:l,pool:lines}));return q;
}
function bookItems(b){
 const B=C.book[b],q=[];
 B.fill.items.forEach(it=>q.push({k:"fill",it,opts:B.fill.options}));
 B.tf.forEach(it=>q.push({k:"tfq",it}));
 q.push({k:"bmatch",pairs:B.match});return q;
}
function placeItems(l){
 const q=[];l.pairs.forEach(p=>q.push({k:"flash",w:p.job}));
 const places=l.pairs.map(p=>p.place);
 shuf(l.pairs).forEach(p=>q.push({k:"place",p,places}));
 q.push({k:"bmatch",pairs:shuf(l.pairs).slice(0,5).map(p=>[p.job.tr,p.place.tr]),loose:true});return q;
}
function testItems(u){
 const ws=uniq(allW(u)),q=[];
 shuf(ws).slice(0,15).forEach((w,i)=>q.push({k:["pic","tr","listen","type"][i%4],w:w,pool:ws,test:true}));return q;
}
// ---- проигрыватель урока
function lesson(uid,lid){
 const [U,Ls]=findLesson(uid,lid);if(!Ls)return location.hash="#/";
 const pool=uniq(allW(U));let q;
 if(Ls.type==="words")q=wordItems(Ls.words,pool);else if(Ls.type==="dialog")q=dialogItems(Ls.dialog);else if(Ls.type==="book")q=bookItems(Ls.book);else if(Ls.type==="places")q=placeItems(Ls);else q=testItems(U);
 const st={i:0,hearts:5,first:0,total:q.filter(x=>!["flash","dialog"].includes(x.k)).length,q,wrong:0};
 const isTest=Ls.type==="test";
 const bar=h("div",{class:"prog"},h("i")),hearts=h("span",{class:"hearts"}),stage=h("div",{class:"stage"});
 const upd=()=>{bar.firstChild.style.width=Math.min(100,st.i/st.q.length*100)+"%";hearts.textContent=isTest?"":"❤️".repeat(st.hearts)};
 shell(h("div",{class:"play"},h("div",{class:"ptop"},h("a",{href:"#/",class:"x","aria-label":t("close")},"✕"),bar,hearts),stage),"home");
 function next(){upd();if(st.i>=st.q.length)return end();show(st.q[st.i])}
 function answered(ok,item,fb){
  if(!ok){st.wrong++;if(!isTest){st.hearts--;st.q.push(Object.assign({},item,{retry:true}))}}else if(!item.retry)st.first++;
  upd();
  const bar2=h("div",{class:"fb "+(ok?"good":"bad")},h("b",null,ok?t("ok"):t("no")+" "+(fb||"")),h("button",{class:"btn",autofocus:true,onclick:()=>{st.i++;if(st.hearts<=0&&!isTest)return lose();next()}},t("next")));
  stage.append(bar2);bar2.querySelector("button").focus();stage.querySelectorAll("button.opt,input").forEach(b=>b.disabled=true);
 }
 function lose(){stage.replaceChildren(h("div",{class:"end"},h("div",{class:"big"},"💔"),h("h2",null,t("lose")),h("a",{class:"btn",href:`#/l/${uid}/${lid}`,onclick:()=>setTimeout(route)},t("again2"))))}
 function end(){
  const pct=st.total?Math.round(st.first/st.total*100):100,pass=!isTest||pct>=80,gain=pass?Math.round(st.first*10+(pct===100?10:0)):0;
  let newB=[];
  if(pass){S.done[lid]=Math.max(S.done[lid]||0,pct);S.xp+=gain;touchStreak();if(award("first"))newB.push("first");if(pct===100&&st.total&&award("perf"))newB.push("perf");if(unitDone(U)&&award("unit"))newB.push("unit");if(S.streak>=3&&award("streak"))newB.push("streak")}
  save();
  const nxt=U.lessons[U.lessons.findIndex(x=>x.id===lid)+1];
  stage.replaceChildren(h("div",{class:"end"},h("div",{class:"big"},pass?(pct===100?"🎉":"👍"):"😕"),h("h2",null,isTest?(pass?t("pass"):t("fail")):t("done")),
   st.total>0&&h("p",{class:"score"},t("score")+": "+pct+"%"+(gain?"  ·  +"+gain+" XP":"")),
   newB.length>0&&h("p",{class:"newb"},newB.map(b=>({first:"🌱 "+t("b_first"),perf:"💯 "+t("b_perf"),unit:"🏆 "+t("b_unit"),streak:"🔥 "+t("b_streak")}[b])).join("  ")),
   h("div",{class:"btns"},h("a",{class:"btn ghost",href:`#/l/${uid}/${lid}`,onclick:()=>setTimeout(route)},t("again")),
    pass&&nxt?h("a",{class:"btn",href:`#/l/${uid}/${nxt.id}`},t("next")):h("a",{class:"btn",href:"#/"},t("finish")))));
  upd();bar.firstChild.style.width="100%";
 }
 function show(it){stage.replaceChildren();R[it.k](it)}
 const card=(title,...x)=>stage.append(h("div",{class:"ex"},h("p",{class:"hint"},title),...x));
 const wimg=w=>w.img?h("img",{class:"wimg",src:IMG(w.img),alt:""}):null;
 function choice(title,prompt,opts,correct,item){
  card(title,prompt,h("div",{class:"opts"},opts.map(o=>h("button",{class:"opt",onclick:e=>{const ok=o.v===correct;e.currentTarget.classList.add(ok?"right":"wrong");[...e.currentTarget.parentNode.children].forEach(b=>{if(b._v===correct)b.classList.add("right")});answered(ok,item,typeof correct==="boolean"?(correct?t("yes"):t("nope")):(correct.tr||correct))}},o.t)).map((b,i)=>(b._v=opts[i].v,b))));
 }
 const R={
  flash:it=>{const w=it.w;let flipped=false;const back=h("div",{class:"back"},L(w)),c=h("button",{class:"flash",onclick:()=>{flipped=!flipped;back.classList.toggle("show",flipped);speak(w.tr)}},wimg(w),h("div",{class:"front"},w.tr),back,h("small",null,t("flipH")));
   card(t("flash"),c,h("button",{class:"btn",onclick:()=>{st.i++;next()}},t("next")));speak(w.tr)},
  pic:it=>{const w=it.w;choice(t("pic"),h("div",{class:"prompt"},wimg(w)||h("div",{class:"big tr"},w.tr)),choicesFor(w,it.pool,"l"),w,it)},
  tr:it=>{const w=it.w;choice(t("tr"),h("div",{class:"prompt"},wimg(w),h("div",{class:"big tr"},w.tr),h("button",{class:"btn ghost sm",onclick:()=>speak(w.tr)},"🔊")),choicesFor(w,it.pool,"l"),w,it)},
  listen:it=>{const w=it.w;choice(t("hear"),h("div",{class:"prompt"},h("button",{class:"btn big-sound",onclick:()=>speak(w.tr)},"🔊")),choicesFor(w,it.pool,"tr"),w,it);speak(w.tr)},
  type:it=>{const w=it.w,inp=h("input",{class:"ti",autocomplete:"off",autocapitalize:"off",spellcheck:"false","aria-label":t("type")});
   const go=()=>{if(inp.disabled||!inp.value.trim())return;answered(close(inp.value,w.tr),it,w.tr)};
   inp.addEventListener("keydown",e=>{if(e.key==="Enter")go()});
   const keys=h("div",{class:"keys"},[..."çğıöşü"].map(c=>h("button",{type:"button",onclick:()=>{inp.value+=c;inp.focus()}},c)));
   card(t("type"),h("div",{class:"prompt"},wimg(w),h("div",{class:"big"},L(w))),inp,keys,h("button",{class:"btn",onclick:go},t("check")));inp.focus()},
  match:it=>{const L1=shuf(it.ws),R1=shuf(it.ws);let sel=null,left=it.ws.length,miss=false;
   const mk=(w,side)=>{const b=h("button",{class:"opt m"},side==="a"?w.tr:L(w));b._w=w;b.onclick=()=>{if(b.classList.contains("gone"))return;
    if(!sel||sel.side===side){sel&&sel.b.classList.remove("sel");sel={b,side};b.classList.add("sel");return}
    const ok=sel.b._w===w;if(ok){[sel.b,b].forEach(x=>x.classList.replace("sel","gone")||x.classList.add("gone"));sel=null;if(!--left){st.q.splice(st.i,1,it);if(!miss)st.first++;answeredMatch()}}
    else{miss=true;st.hearts--;st.wrong++;upd();b.classList.add("wrong");sel.b.classList.add("wrong");const a=sel.b;setTimeout(()=>{a.classList.remove("wrong","sel");b.classList.remove("wrong")},500);sel=null;if(st.hearts<=0&&!isTest)lose()}};return b};
   const answeredMatch=()=>{const f=h("div",{class:"fb good"},h("b",null,t("ok")),h("button",{class:"btn",onclick:()=>{st.i++;next()}},t("next")));stage.append(f);f.querySelector("button").focus()};
   card(t("match"),h("div",{class:"cols"},h("div",null,L1.map(w=>mk(w,"a"))),h("div",null,R1.map(w=>mk(w,"b")))))},
  dialog:it=>{const D=C.dialogs[it.d],av=D.avatars;let cur=-1,playing=false;const rows=[];
   const lines=D.lines.map((l,i)=>{const tl=h("div",{class:"tl2"},L(l)),row=h("div",{class:"line"+(Object.keys(av)[0]===l.who?" a":" b"),style:`--av:${av[l.who]}`,onclick:()=>{row.classList.toggle("tr-on");speak(l.tr)}},h("span",{class:"av"},l.who[0]),h("div",{class:"bub"},h("small",null,l.who),h("div",{class:"ttr"},l.tr),tl));rows.push(row);return row});
   const hl=i=>rows.forEach((r,j)=>r.classList.toggle("now",j===i));
   const play=()=>{if(playing){playing=false;speechSynthesis.cancel();hl(-1);return}playing=true;const step=i=>{if(!playing||i>=D.lines.length){playing=false;hl(-1);return}hl(i);rows[i].scrollIntoView({block:"center",behavior:"smooth"});speak(D.lines[i].tr,()=>setTimeout(()=>step(i+1),250))};step(0)};
   stage.append(h("div",{class:"ex dlg"},h("p",{class:"hint"},t("tap")),h("div",{class:"lines"},lines),h("div",{class:"btns"},h("button",{class:"btn ghost",onclick:play},"▶ "+t("playall")),h("button",{class:"btn",onclick:()=>{playing=false;speechSynthesis.cancel();st.i++;next()}},t("next")))))},
  asm:it=>{const words=it.line.tr.replace(/[.!?,]/g,m=>" "+m).split(/\s+/).filter(Boolean),pool=h("div",{class:"bank"}),ans=h("div",{class:"ans"});
   shuf(words.map((w,i)=>({w,i}))).forEach(o=>{const b=h("button",{class:"tok",onclick:()=>{if(b.parentNode===pool)ans.append(b);else pool.append(b)}},o.w);b._i=o.i;pool.append(b)});
   const go=()=>{const s=[...ans.children].map(b=>b.textContent).join(" ").replace(/ ([.!?,])/g,"$1");answered(s===it.line.tr,it,it.line.tr)};
   card(t("asm"),h("div",{class:"prompt"},h("div",{class:"big sm2"},L(it.line))),ans,pool,h("button",{class:"btn",onclick:go},t("check")))},
  trline:it=>{const l=it.line,o=shuf([l,...shuf(it.pool.filter(x=>x!==l)).slice(0,3)]).map(x=>({v:x,t:L(x)}));
   choice(t("tr"),h("div",{class:"prompt"},h("div",{class:"big sm2"},l.tr),h("button",{class:"btn ghost sm",onclick:()=>speak(l.tr)},"🔊")),o,l,Object.assign(it,{}));},
  fill:it=>{const o=it.opts.map(x=>({v:x,t:x}));choice(t("fill"),h("div",{class:"prompt"},h("div",{class:"big sm2"},it.it.tr),h("small",null,L(it.it))),shuf(o),it.it.a,it)},
  tfq:it=>{choice(t("tf"),h("div",{class:"prompt"},h("div",{class:"big sm2"},it.it.tr),h("small",null,L(it.it))),[{v:true,t:t("yes")},{v:false,t:t("nope")}],it.it.a,it);},
  place:it=>{const c=it.p.place,o=shuf(uniq(it.places).filter(p=>p.tr!==c.tr)).slice(0,3);
   choice(t("pic"),h("div",{class:"prompt"},wimg(it.p.job),h("div",{class:"big tr"},it.p.job.tr)),shuf([c,...o]).map(p=>({v:p.tr,t:p.tr})),c.tr,it)},
  bmatch:it=>{const A=it.pairs.map(p=>p[0]),B=shuf(it.pairs.map(p=>p[1]));let sel=null,left=A.length,miss=false;
   const lb=A.map(a=>h("button",{class:"opt m"},a)),rb=B.map(b=>h("button",{class:"opt m"},b));
   [...lb,...rb].forEach(b=>b.onclick=()=>{if(b.classList.contains("gone"))return;const side=lb.includes(b)?"a":"b";
    if(!sel||sel.side===side){sel&&sel.b.classList.remove("sel");sel={b,side};b.classList.add("sel");return}
    const x=side==="a"?b:sel.b,y=side==="a"?sel.b:b,ok=it.pairs.some(p=>p[0]===x.textContent&&p[1]===y.textContent);
    if(ok){[x,y].forEach(e=>{e.classList.remove("sel");e.classList.add("gone")});sel=null;if(!--left){if(!miss)st.first++;const f=h("div",{class:"fb good"},h("b",null,t("ok")),h("button",{class:"btn",onclick:()=>{st.i++;next()}},t("next")));stage.append(f);f.querySelector("button").focus()}}
    else{miss=true;st.hearts--;st.wrong++;upd();const s=sel.b;b.classList.add("wrong");s.classList.add("wrong");sel=null;setTimeout(()=>{b.classList.remove("wrong","sel");s.classList.remove("wrong","sel")},500);if(st.hearts<=0&&!isTest)lose()}});
   card(t("match"),h("div",{class:"cols"},h("div",null,lb),h("div",null,rb)))}
 };
 next();
}
// ---- маршрутизатор
function route(){
 const p=location.hash.slice(1)||"/";try{speechSynthesis.cancel()}catch(e){}
 document.querySelectorAll(".ov").forEach(x=>x.remove());
 let m;if(m=p.match(/^\/l\/([^/]+)\/([^/]+)/))lesson(m[1],m[2]);else if(p==="/dict")dict();else if(p==="/me")me();else home();
 scrollTo(0,0);document.documentElement.dataset.skin=window.SKIN;
}
addEventListener("hashchange",route);route();
})();
