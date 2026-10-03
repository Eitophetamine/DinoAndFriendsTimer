/* Cast: original dino pals. To use your own licensed art, add image:"img/file.png" to an entry. */
const CAST=[
 {name:'Plum',body:'#8e4fd6',belly:'#d9bdf7',spot:'#6a34b0',kind:'trex'},
 {name:'Pip',body:'#58c76a',belly:'#d6f5c8',spot:'#2f9a44',kind:'sprout'},
 {name:'Sunny',body:'#ffc83d',belly:'#fff0b8',spot:'#e29a00',kind:'horn'},
 {name:'Coral',body:'#ff8a7a',belly:'#ffe0d9',spot:'#e0564a',kind:'plates'},
 {name:'Bluey',body:'#58b4f0',belly:'#d3eefc',spot:'#2f86c4',kind:'long'}];
const eye=(x,y)=>`<circle cx="${x}" cy="${y}" r="11" fill="#fff"/><circle cx="${x+2}" cy="${y+1}" r="6" fill="#2b1650"/><circle cx="${x+4}" cy="${y-1}" r="2" fill="#fff"/>`;
function dinoSVG(c){
 const back=c.kind==='plates'?`<path d="M40 130l-12-26 20 10 2-28 16 20 10-26 8 28 16-16-2 30z" fill="${c.spot}"/>`:'';
 const top={
  trex:`<path d="M72 48l-8-16 16 8zM108 44l6-18 8 18z" fill="${c.spot}"/>`,
  sprout:`<path d="M100 42c-6-20 8-28 20-22-2 12-8 20-20 22zM100 42c-10-14-26-12-28 0 10 6 22 6 28 0z" fill="#2f9a44"/>`,
  horn:`<path d="M92 44l8-26 8 26z" fill="${c.spot}"/><path d="M62 60l-10-16 16 4zM138 60l10-16-16 4z" fill="${c.spot}"/>`,
  plates:'',
  long:`<rect x="92" y="14" width="16" height="34" rx="8" fill="${c.body}"/>`}[c.kind];
 return `<svg viewBox="0 0 200 220" role="img" aria-label="${c.name} the dino">
 <path d="M30 170c-26 4-28 30-10 34 22 4 34-14 40-26z" fill="${c.body}"/>${back}
 <ellipse cx="100" cy="150" rx="56" ry="58" fill="${c.body}"/>
 <ellipse cx="104" cy="160" rx="34" ry="42" fill="${c.belly}"/>
 <circle cx="70" cy="136" r="7" fill="${c.spot}" opacity=".5"/><circle cx="136" cy="130" r="9" fill="${c.spot}" opacity=".5"/>
 <ellipse cx="72" cy="206" rx="22" ry="11" fill="${c.spot}"/><ellipse cx="130" cy="206" rx="22" ry="11" fill="${c.spot}"/>
 <path d="M52 140c-16 2-20 22-6 28M148 140c16 2 20 22 6 28" stroke="${c.body}" stroke-width="16" stroke-linecap="round" fill="none"/>
 ${top}<ellipse cx="100" cy="82" rx="46" ry="42" fill="${c.body}"/>
 ${eye(82,74)}${eye(114,74)}
 <ellipse cx="98" cy="100" rx="22" ry="14" fill="${c.belly}"/>
 <path d="M84 100q14 14 28 0" stroke="#2b1650" stroke-width="4" fill="none" stroke-linecap="round"/>
 <circle cx="64" cy="96" r="6" fill="#ff9aa8" opacity=".7"/><circle cx="134" cy="96" r="6" fill="#ff9aa8" opacity=".7"/></svg>`;}
const $=id=>document.getElementById(id),pad=(n,l=2)=>String(n).padStart(l,'0');
const castEl=$('cast');
CAST.forEach(c=>{const d=document.createElement('div');d.className='pal';d.innerHTML=c.image?`<img src="${c.image}" alt="${c.name}">`:dinoSVG(c);castEl.appendChild(d);});
const cols=['#ff6fa5','#ffffff','#ff9f43','#b388ff'];
for(let i=0;i<26;i++){const e=document.createElement('i');e.style.left=Math.random()*98+'%';e.style.color=cols[i%4];e.style.animationDelay=-Math.random()*4+'s';$('flowers').appendChild(e);}
function cheer(){const pals=document.querySelectorAll('.pal');pals.forEach((p,i)=>{p.classList.remove('cheer');void p.offsetWidth;p.style.animationDelay=i*.1+'s';p.classList.add('cheer');});
 const card=document.querySelector('.card');card.classList.add('done');
 setTimeout(()=>{card.classList.remove('done');pals.forEach(p=>{p.classList.remove('cheer');p.style.animationDelay='';});},4200);}
function chime(){try{const a=new(window.AudioContext||window.webkitAudioContext)();
 [660,880,1100,880,1320].forEach((f,i)=>{const o=a.createOscillator(),g=a.createGain(),t=a.currentTime+i*.22;o.type='triangle';o.frequency.value=f;
 g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.3,t+.03);g.gain.exponentialRampToValueAtTime(.0001,t+.3);o.connect(g).connect(a.destination);o.start(t);o.stop(t+.32);});}catch(e){}}
/* Tabs */
let tab='timer';
function setTab(t){tab=t;document.querySelector('.tabs').classList.toggle('sw',t==='stopwatch');
 document.querySelectorAll('.tabs button').forEach(b=>b.setAttribute('aria-selected',b.dataset.tab===t));
 $('timer').hidden=t!=='timer';$('stopwatch').hidden=t!=='stopwatch';}
document.querySelectorAll('.tabs button').forEach(b=>b.onclick=()=>setTab(b.dataset.tab));
/* Timer */
const C=2*Math.PI*98;let total=300000,left=300000,tEnd=0,tRaf=0,tRun=false;
const fmtT=ms=>{const s=Math.ceil(ms/1000);return`${pad(Math.floor(s/3600))}:${pad(Math.floor(s%3600/60))}:${pad(s%60)}`};
const readInputs=()=>(+$('inH').value*3600+ +$('inM').value*60+ +$('inS').value)*1000;
function drawT(){$('timerReadout').textContent=fmtT(left);const f=total?left/total:0;$('ring').style.strokeDashoffset=C*(1-f);$('ring').classList.toggle('low',f<.15&&tRun);}
function setInputs(s){$('inH').value=Math.floor(s/3600);$('inM').value=Math.floor(s%3600/60);$('inS').value=s%60;total=left=s*1000;drawT();}
['inH','inM','inS'].forEach(id=>$(id).oninput=()=>{if(!tRun){total=left=readInputs();drawT();}});
document.querySelectorAll('.presets button').forEach(b=>b.onclick=()=>{if(!tRun)setInputs(+b.dataset.s)});
function tick(){left=Math.max(0,tEnd-performance.now());drawT();
 if(left<=0){tRun=false;$('timerStart').textContent='Start';$('timerStart').classList.remove('running');$('timerInputs').classList.remove('locked');$('timerStatus').textContent='Time is up! Hooray!';chime();cheer();return;}
 tRaf=requestAnimationFrame(tick);}
function timerToggle(){
 if(tRun){tRun=false;cancelAnimationFrame(tRaf);$('timerStart').textContent='Resume';$('timerStart').classList.remove('running');$('timerStatus').textContent='Paused';return;}
 if(left<=0){left=total=readInputs();}
 if(left<=0){$('timerStatus').textContent='Add some time first';return;}
 tRun=true;tEnd=performance.now()+left;$('timerStart').textContent='Pause';$('timerStart').classList.add('running');$('timerInputs').classList.add('locked');$('timerStatus').textContent='Counting down';tick();}
function timerReset(){tRun=false;cancelAnimationFrame(tRaf);total=left=readInputs();$('timerStart').textContent='Start';$('timerStart').classList.remove('running');$('timerInputs').classList.remove('locked');$('timerStatus').textContent='Ready when you are';drawT();}
$('timerStart').onclick=timerToggle;$('timerReset').onclick=timerReset;drawT();
/* Stopwatch */
let sw=0,swStart=0,swRun=false,swRaf=0,lastLap=0,lapN=0;
const fmtS=ms=>{const cs=Math.floor(ms/10),h=Math.floor(cs/360000),m=Math.floor(cs/6000)%60,s=Math.floor(cs/100)%60;return`${h?pad(h)+':':''}${pad(m)}:${pad(s)}.${pad(cs%100)}`};
function swTick(){sw=performance.now()-swStart;$('swReadout').textContent=fmtS(sw);swRaf=requestAnimationFrame(swTick);}
function swToggle(){
 if(swRun){swRun=false;cancelAnimationFrame(swRaf);$('swStart').textContent='Resume';$('swStart').classList.remove('running');$('swStatus').textContent='Paused';$('swLap').disabled=true;return;}
 swRun=true;swStart=performance.now()-sw;$('swStart').textContent='Stop';$('swStart').classList.add('running');$('swStatus').textContent='Running';$('swLap').disabled=false;swTick();}
function swLap(){if(!swRun)return;lapN++;const li=document.createElement('li');li.innerHTML=`<span>Lap ${lapN}</span><span>${fmtS(sw-lastLap)}</span><span>${fmtS(sw)}</span>`;$('laps').prepend(li);lastLap=sw;}
function swReset(){swRun=false;cancelAnimationFrame(swRaf);sw=lastLap=lapN=0;$('swReadout').textContent='00:00.00';$('laps').innerHTML='';$('swStart').textContent='Start';$('swStart').classList.remove('running');$('swStatus').textContent='Tap start to begin';$('swLap').disabled=true;}
$('swStart').onclick=swToggle;$('swLap').onclick=swLap;$('swReset').onclick=swReset;
addEventListener('keydown',e=>{const t=document.activeElement.tagName;
 if(e.code==='Space'&&!/INPUT|BUTTON/.test(t)){e.preventDefault();tab==='timer'?timerToggle():swToggle();}
 if((e.key==='l'||e.key==='L')&&tab==='stopwatch'&&t!=='INPUT')swLap();});
