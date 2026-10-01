const SCREENS = {
  login:      {img:"login-reference.png", hs:[
    {x:6.5,y:80.5,w:87,h:6.5,to:"login1",label:"Masuk ke Futurely"}]},
  login1:     {img:"login 1 -refrence.png", hs:[
    {x:6,y:88,w:88,h:6.5,to:"login2",label:"Mulai Sekarang"}]},
  login2:     {img:"login 2-refrence.png", hs:[
    {x:6.2,y:89.7,w:87.7,h:6.5,to:"home",label:"Lanjutkan"}]},
  home:       {img:"home-reference.png", hs:[
    {x:5,y:38,w:45,h:12,to:"potential",label:"Tes Potensi"},
    {x:50,y:38,w:45,h:12,to:"career",label:"Career Path"},
    {x:5,y:50,w:45,h:12,to:"chat",label:"Konsultasi AI"},
    {x:50,y:50,w:45,h:12,to:"settings",label:"Data Saya"},
    {x:0,y:90,w:25,h:10,to:"home",label:"Beranda"},
    {x:25,y:90,w:25,h:10,to:"potential",label:"Potensi Diri"},
    {x:50,y:90,w:25,h:10,to:"chat",label:"Konsultasi"},
    {x:75,y:90,w:25,h:10,to:"settings",label:"Akun"}]},
  potential:  {img:"potential-test-reference.png", hs:[
    {x:10,y:63.4,w:81,h:6.7,to:"results",label:"Analisis Potensiku"},
    {x:0,y:90,w:25,h:10,to:"home",label:"Beranda"},
    {x:25,y:90,w:25,h:10,to:"potential",label:"Potensi Diri"},
    {x:50,y:90,w:25,h:10,to:"chat",label:"Konsultasi"},
    {x:75,y:90,w:25,h:10,to:"settings",label:"Akun"}]},
  results:    {img:"potential-results-reference.png", hs:[
    {x:7.5,y:70.7,w:85,h:7.1,to:"potential",label:"Ulangi Tes"},
    {x:7.5,y:91.5,w:85,h:6.9,to:"home",label:"Kembali"}]},
  career:     {img:"Career path-refrence.png", hs:[
    {x:6.2,y:19.1,w:89.8,h:7.1,to:"kedokteran",label:"Kedokteran dan Kesehatan"},
    {x:6.2,y:27.6,w:89.8,h:7.1,to:"teknik",label:"Teknik dan Teknologi"},
    {x:6.2,y:36.1,w:89.8,h:7.1,to:"seni",label:"Seni dan Desain"},
    {x:6.2,y:44.7,w:89.8,h:7.1,to:"fmipa",label:"FMIPA"},
    {x:6.2,y:53.3,w:89.8,h:7.1,to:"keuangan",label:"Keuangan dan Administrasi"},
    {x:6.2,y:61.9,w:89.8,h:7.1,to:"polotik",label:"Ilmu Sosial dan Politik"},
    {x:6.2,y:70.4,w:89.8,h:7.1,to:"sastra",label:"Sastra dan Bahasa"},
    {x:7.1,y:89.6,w:88.8,h:6.4,to:"home",label:"Beranda"}]},
  kedokteran: {img:"kedokteran-refrence.png", hs:[{x:2.5,y:5,w:15,h:7,to:"career",label:"Kembali"}]},
  teknik:     {img:"Teknik-refrence.png",      hs:[{x:2.5,y:5,w:15,h:7,to:"career",label:"Kembali"}]},
  seni:       {img:"Seni-refrence.png",        hs:[{x:2.5,y:5,w:15,h:7,to:"career",label:"Kembali"}]},
  fmipa:      {img:"FMIPA-refrence.png",       hs:[{x:2.5,y:5,w:15,h:7,to:"career",label:"Kembali"}]},
  keuangan:   {img:"keuangan-refrence.png",    hs:[{x:2.5,y:5,w:15,h:7,to:"career",label:"Kembali"}]},
  polotik:    {img:"polotik-refrence.png",     hs:[{x:2.5,y:5,w:15,h:7,to:"career",label:"Kembali"}]},
  sastra:     {img:"Sastra-refrence.png",      hs:[{x:2.5,y:5,w:15,h:7,to:"career",label:"Kembali"}]},
  settings:   {img:"Settings-refrence.png", hs:[
    {x:4.7,y:84.4,w:90.4,h:7.3,to:"login",label:"Log Out"},
    {x:0,y:91,w:25,h:9,to:"home",label:"Beranda"},
    {x:25,y:91,w:25,h:9,to:"potential",label:"Potensi Diri"},
    {x:50,y:91,w:25,h:9,to:"chat",label:"Konsultasi"},
    {x:75,y:91,w:25,h:9,to:"settings",label:"Akun"}]},
  chat:       {img:null, hs:[]}
};
const ORDER = ["login","login1","login2","home","potential","results","career","kedokteran","teknik","seni","fmipa","keuangan","polotik","sastra","settings","chat"];
const device = document.getElementById("device");
const routeLabel = document.getElementById("routeLabel");
const imgScreens = {};

function buildImgScreen(name){
  const cfg = SCREENS[name];
  const sec = document.createElement("section");
  sec.className = "screen"; sec.dataset.screen = name; sec.hidden = true;
  const img = document.createElement("img");
  img.className = "shot"; img.src = "/assets/" + cfg.img; img.alt = "Figma screen: " + name;
  sec.append(img);
  for(const h of cfg.hs){
    const b = document.createElement("button");
    b.className = "hs"; b.type = "button";
    b.style.cssText = "left:" + h.x + "%;top:" + h.y + "%;width:" + h.w + "%;height:" + h.h + "%";
    b.dataset.label = h.label;
    b.setAttribute("aria-label", h.label + " ke " + h.to);
    b.addEventListener("click", () => go(h.to));
    sec.append(b);
  }
  device.insertBefore(sec, document.getElementById("screen-chat"));
  imgScreens[name] = sec;
}
for(const name of ORDER) if(name !== "chat") buildImgScreen(name);

function go(name, push){
  if(push === undefined) push = true;
  if(!ORDER.includes(name)) name = "login";
  for(const n of Object.keys(imgScreens)) imgScreens[n].hidden = (n !== name);
  document.getElementById("screen-chat").hidden = (name !== "chat");
  routeLabel.textContent = "route: #/" + name;
  if(push && location.hash !== "#/" + name) location.hash = "#/" + name;
  if(name === "chat") renderChat();
}
window.addEventListener("hashchange", () => go(location.hash.replace("#/",""), false));
document.getElementById("debugHint").textContent = "Tambahkan ?debug di URL untuk melihat hotspot";
if(new URLSearchParams(location.search).has("debug")) document.body.classList.add("debug");

/* ---- AI Consultant chat (proxy ke NVIDIA NIM) ---- */
const CHAT_KEY = "futurely.chat.v1";
const WELCOME = {role:"bot", text:"Halo Amanda \u{1F389}\nApa yang ingin di konsultasikan hari ini", time:"10:15"};
let chat = loadChat();
function loadChat(){
  try{ const v = JSON.parse(localStorage.getItem(CHAT_KEY)); if(Array.isArray(v) && v.length) return v; }catch(e){}
  return [WELCOME];
}
function saveChat(){ try{ localStorage.setItem(CHAT_KEY, JSON.stringify(chat)); }catch(e){} }
function stamp(){ return new Date().toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit"}); }
function renderChat(){
  const body = document.getElementById("chatBody");
  body.replaceChildren();
  for(const m of chat){
    const d = document.createElement("div");
    d.className = "msg " + (m.role === "me" ? "me" : m.role === "err" ? "err" : "bot");
    const t = document.createElement("span"); t.textContent = m.text; d.append(t);
    if(m.role !== "err"){ const meta = document.createElement("span"); meta.className = "meta"; meta.textContent = m.time + (m.role === "me" ? " \u2713\u2713" : ""); d.append(meta); }
    body.append(d);
  }
  body.scrollTop = body.scrollHeight;
}
document.getElementById("chatHome").addEventListener("click", () => go("home"));
document.querySelectorAll(".chat-nav button").forEach(b => b.addEventListener("click", () => go(b.dataset.nav)));
document.getElementById("chatForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const input = document.getElementById("chatInput");
  const text = input.value.trim();
  if(!text) return;
  input.value = "";
  chat.push({role:"me", text, time:stamp()}); saveChat(); renderChat();
  const sendBtn = document.querySelector(".send"); sendBtn.disabled = true; input.disabled = true;
  try{
    const prior = chat.filter(m => m.role === "me" || m.role === "bot").slice(0,-1)
      .map(m => ({role: m.role === "me" ? "user" : "assistant", content: m.text}));
    const payload = {messages:[
      {role:"system", content:"Kamu adalah Rara, konselor AI pintar di aplikasi Futurely untuk pelajar Indonesia. Jawab hangat, ringkas, dan membantu seputar pendidikan, potensi diri, dan karier. Bahasa Indonesia, kecuali pengguna memakai bahasa lain."},
      ...prior,
      {role:"user", content:text}
    ]};
    const r = await fetch("/api/chat", {method:"POST", headers:{"content-type":"application/json"}, body:JSON.stringify(payload)});
    let d = {}; try{ d = await r.json(); }catch(e2){}
    if(!r.ok) throw new Error(d.error || ("Server error " + r.status));
    chat.push({role:"bot", text:String(d.reply || "(kosong)"), time:stamp()});
  }catch(err){
    const msg = (String(err.message).indexOf("Failed to fetch") >= 0) ? "Tidak dapat terhubung ke server lokal." : String(err.message);
    chat.push({role:"err", text:msg, time:stamp()});
  }finally{
    saveChat(); renderChat(); sendBtn.disabled = false; input.disabled = false; input.focus();
  }
});

go(location.hash.replace("#/","") || "login", false);
