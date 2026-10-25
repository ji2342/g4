(() => {
 const defs=document.querySelector('#scene defs').innerHTML;
 const tiles=[
 {x:390,y:230,n:'涵養森林',t:0,k:'forest',c:'#a6bb79'},
 {x:650,y:230,n:'溪流源頭',t:1,k:'river',c:'#98b89b'},
 {x:260,y:385,n:'坡地農園',t:0,k:'farm',c:'#b7c487'},
 {x:520,y:385,n:'水保學堂',t:1,k:'school',c:'#cbc8a2'},
 {x:780,y:385,n:'雨水聚落',t:3,k:'town',c:'#b6c899'},
 {x:390,y:540,n:'透水公園',t:2,k:'park',c:'#a8bd8d'},
 {x:650,y:540,n:'生態濕地',t:1,k:'wetland',c:'#9bba94'},
 {x:520,y:695,n:'親水生活',t:2,k:'town',c:'#c2c69b'}
 ];
 const use=(id,x,y,s=1,cls='')=>`<g transform="translate(${x} ${y}) scale(${s})"><use href="#${id}" class="${cls}"/></g>`;
 const tree=(x,y,s=.42)=>use('tree',x,y,s,'tree-sway');
 const person=(x,y,i)=>`<g transform="translate(${x} ${y})"><g class="resident" style="--speed:${8+i%5}s;--delay:-${i*1.7}s;offset-path:path('M-18 4 Q5 -12 30 4 Q5 24 -18 4')">${use('person',0,0,.32)}</g></g>`;
 const wind=(x,y)=>`<g transform="translate(${x} ${y})"><path d="M0 0V-63" stroke="#e5dfc8" stroke-width="4"/><g transform="translate(0 -63)"><g class="windmill"><path d="M0 0 3-30-2-30ZM0 0 25 17 28 12ZM0 0-26 17-29 12Z" fill="#faf6dc"/></g><circle r="3" fill="#b3a78a"/></g></g>`;
 function detail(tile,i){let s='';
 if(tile.k==='forest'||tile.k==='river'){
 s+='<path d="M-60 1 4-112 66 2 2 32Z" fill="#739681"/><path d="M4-112 2 32-60 1Z" fill="#9db48b"/><path d="M4-112 26-73 9-80-3-67-16-78Z" fill="#e0dfbe"/>';
 if(tile.k==='river')s+='<path d="M15-44Q-25-15 11 8T72 43" fill="none" stroke="#77bfc6" stroke-width="17"/><path class="running-water" d="M15-44Q-25-15 11 8T72 43" fill="none" stroke="#dbf4e2" stroke-dasharray="7 14" stroke-width="2"/>';
 for(let j=0;j<10;j++)s+=use(j%3?'tree':'pine',-86+(j%5)*38,-12+Math.floor(j/5)*42,.34+(j%3)*.04,'tree-sway');
 }else if(tile.k==='farm'){
 for(let j=0;j<5;j++)s+=`<path d="M${-85+j*27} 4l48-26 20 11-48 27Z" fill="${j%2?'#d2bf77':'#6f9863'}"/>`;
 s+=use('house',-25,-28,.65)+tree(-88,-19)+tree(80,8)+wind(84,-27);
 }else if(tile.k==='wetland'){
 s+='<ellipse cx="0" cy="-3" rx="92" ry="38" fill="#6caaa8"/><ellipse class="pond-ring" cx="0" cy="-3" rx="68" ry="24" fill="none" stroke="#c1e4cb"/>';
 for(let j=0;j<9;j++)s+=`<g transform="translate(${-81+j*20} ${25+Math.sin(j)*6})"><path d="M0 0v-19m0 13-6-8m6 3 6-10" stroke="#617c46" stroke-width="2"/><ellipse cy="-20" rx="2" ry="4" fill="#ad8850"/></g>`;
 s+=tree(-95,-11)+tree(75,-19)+`<g class="duck"><ellipse cy="-8" rx="9" ry="4" fill="#fff4cf"/><circle cx="7" cy="-13" r="4" fill="#fff4cf"/><path d="M10-13h5" stroke="#c38d36" stroke-width="2"/></g>`;
 }else if(tile.k==='park'){
 s+='<path d="M-80 10Q0-50 80 10M0-40V53" stroke="#d9d4b1" stroke-width="13" fill="none"/><ellipse cy="7" rx="25" ry="13" fill="#72b9be"/><ellipse cy="7" rx="13" ry="6" fill="#c0e4d9"/>';
 for(let j=0;j<8;j++)s+=tree(-80+(j%4)*53,-22+Math.floor(j/4)*61,.37);
 s+=`<g class="fountain"><path d="M0 5Q-13-27-17-3M0 5Q13-27 17-3M0 5V-21" stroke="#ddf7e7" stroke-width="2" fill="none"/></g>`;
 }else{
 s+='<path d="m-90 13 90-44 90 44-90 43Z" fill="#ddd9bd"/><path d="M-86 13 0-29 85 13M0-28V52" stroke="#a7b3a1" stroke-dasharray="4 7" fill="none"/>';
 s+=use('house',-40,-11,.7)+use('house',35,-29,.78)+use('house',55,29,.53);
 if(tile.k==='school')s+='<path d="M-13-7v-70" stroke="#847d63" stroke-width="2"/><path d="M-12-76 14-69-12-60Z" fill="#dc9564" class="flag"/>';
 for(let j=0;j<6;j++)s+=tree(-98+(j%3)*83,-15+Math.floor(j/3)*61,.33);
 if(tile.t===3)s+='<g transform="translate(21 19)"><path d="M-8-13V2q8 7 16 0v-15Z" fill="#5eaaa8"/><ellipse cy="-13" rx="8" ry="4" fill="#b9daca"/></g>';
 }
 for(let j=0;j<4;j++)s+=person(-52+j*33,27+(j%2)*13,i*4+j);
 return s;
 }
 let islands=tiles.map((t,i)=>`<g class="district" data-district="${i}" transform="translate(${t.x} ${t.y})"><ellipse cy="48" rx="119" ry="65" fill="#395a5130" filter="url(#shadow)"/><path d="M-127-34 0-91 127-34V41L0 99-127 41Z" fill="#ad9f7b"/><path d="M0 78V99L127 41V20Z" fill="#8f9270"/><path class="tile-top" d="M-127-34 0-91 127-34V20L0 78-127 20Z" fill="${t.c}" stroke="#eee4c6" stroke-width="6"/><path d="M-115 17 0 69 115 17" stroke="#e4d8b5" stroke-width="3" fill="none"/>${detail(t,i)}<g class="map-label" role="button" tabindex="0" aria-label="探索${t.n}" data-topic="${t.t}" data-focus="${i}" transform="translate(0 61)"><rect x="-58" y="-13" width="116" height="28" rx="14"/><text text-anchor="middle" y="5">${String(i+1).padStart(2,'0')} ${t.n}</text></g></g>`).join('');
 let bridges='';const pairs=[[0,1],[0,2],[0,3],[1,3],[1,4],[2,5],[3,5],[3,6],[4,6],[5,7],[6,7]];
 pairs.forEach(([a,b])=>{const p=tiles[a],q=tiles[b];bridges+=`<path d="M${p.x} ${p.y+12}L${q.x} ${q.y+12}" stroke="#c7ba94" stroke-width="20"/><path d="M${p.x} ${p.y+12}L${q.x} ${q.y+12}" stroke="#f1e5c6" stroke-width="12"/>`;});
 let sea='';for(let i=0;i<30;i++)sea+=`<path class="sea-wave" style="animation-delay:-${i%6}s" d="M${(i*193)%1160} ${85+(i*97)%740}q13-5 27 0t27 0" stroke="#c5e3da" stroke-width="2" fill="none" opacity=".45"/>`;
 for(let i=0;i<6;i++)sea+=`<g transform="translate(${90+i*182} ${110+(i%3)*260})"><g class="sailboat" style="--delay:-${i*3}s"><ellipse cy="20" rx="24" ry="6" fill="#5c9ea047"/><path d="M-20 9h40l-8 10h-22Z" fill="#b97850"/><path d="M0 9v-43L-17 6Z" fill="#faf2d6"/><path d="M4 6v-33L19 6Z" fill="#e1d7b7"/></g></g>`;
 const menu=tiles.map((t,i)=>`<button data-topic="${t.t}" data-focus="${i}"><em>${String(i+1).padStart(2,'0')}</em><span>${t.n}</span><b>↗</b></button>`).join('');
 document.querySelector('.world').outerHTML=`<section class="world archipelago" aria-label="水保群島互動地圖"><div class="map-stage"><div class="map-heading"><span>WATER / LAND / LIFE</span><h1>把水土，連起來。</h1><p>八個生活場景，一座會呼吸的水保群島。</p></div><div class="map-tools"><button id="home-view">↗ 全景</button><button id="zoom-in" aria-label="放大地圖">＋</button><button id="zoom-out" aria-label="縮小地圖">−</button></div><svg id="scene" viewBox="0 0 1200 900" role="group" aria-label="可拖曳縮放的水保群島"><defs>${defs}</defs><rect x="-3000" y="-3000" width="8000" height="8000" fill="#83b6bb"/>${sea}<g class="bridges">${bridges}</g><g class="connections">${pairs.map(([a,b])=>`<path class="running-water" d="M${tiles[a].x} ${tiles[a].y}Q${tiles[a].x+80} ${tiles[b].y-120} ${tiles[b].x} ${tiles[b].y}"/>`).join('')}</g>${islands}<g class="couriers">${pairs.map(([a,b],i)=>`<g class="courier" style="offset-path:path('M${tiles[a].x} ${tiles[a].y+38} Q${(tiles[a].x+tiles[b].x)/2+20} ${(tiles[a].y+tiles[b].y)/2+25} ${tiles[b].x} ${tiles[b].y+38}');animation-delay:-${i*2}s"><ellipse cy="3" rx="7" ry="3" fill="#42675b33"/><circle cy="-10" r="3" fill="#e7c7a0"/><path d="M0-6v7" stroke="${i%2?'#ce8754':'#466e78'}" stroke-width="5"/><circle cx="5" cy="-2" r="3" fill="#e8d8a1"/></g>`).join('')}</g><g class="birds" fill="none" stroke="#f5f4dc" stroke-width="3"><path d="M100 100q10-12 20 0q10-12 20 0M143 124q7-9 14 0q7-9 14 0"/></g><g id="rain"></g></svg><div class="map-hint">拖曳探索 · 點選島嶼名牌 · ＋ / − 縮放</div><div class="scene-controls"><div><button id="daylight" aria-pressed="false">☾ 夜晚</button><button id="weather" aria-pressed="false">☂ 看看下雨時</button><button id="links" aria-pressed="false">⌁ 水系連結</button><button id="motion" aria-pressed="false">Ⅱ 暫停動畫</button></div></div></div><aside class="island-index"><span class="eyebrow">THE WATER & LAND INDEX</span><h2>從山林，到日常。</h2><p>跟著水的旅程，探索保水、保土與生活的關係。</p><div class="district-menu">${menu}</div><div id="live-story" aria-live="polite"></div><a href="#cinema" class="cinema-shortcut">▷ 觀看水保短片 <span>1:25 ↗</span></a><small>互動示意場景 · 非工程或災害模擬</small></aside></section>`;
 const svg=document.querySelector('#scene');let view={x:0,y:0,w:1200,h:900};
 function render(){svg.setAttribute('viewBox',`${view.x} ${view.y} ${view.w} ${view.h}`);}
 function zoom(f){const w=Math.max(500,Math.min(1800,view.w*f));const h=w*.75;view.x+=(view.w-w)/2;view.y+=(view.h-h)/2;view.w=w;view.h=h;render();}
 document.querySelector('#zoom-in').onclick=()=>zoom(.8);document.querySelector('#zoom-out').onclick=()=>zoom(1.25);
 document.querySelector('#home-view').onclick=()=>{view={x:0,y:0,w:1200,h:900};render();document.querySelectorAll('.district').forEach(g=>g.classList.remove('selected'));};
 document.querySelectorAll('[data-focus]').forEach(el=>{const focus=()=>{const index=Number(el.dataset.focus),t=tiles[index];document.querySelector('.archipelago').dataset.selected=String(index);document.querySelectorAll('.district').forEach((g,j)=>g.classList.toggle('selected',index===j));view={x:t.x-400,y:t.y-300,w:800,h:600};render();};el.addEventListener('click',focus);if(el.tagName.toLowerCase()==='g')el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();el.dispatchEvent(new MouseEvent('click',{bubbles:true}));}});});
 let drag=null;svg.addEventListener('pointerdown',e=>{if(e.target.closest('[data-focus]'))return;drag={x:e.clientX,y:e.clientY,vx:view.x,vy:view.y};svg.setPointerCapture(e.pointerId);});svg.addEventListener('pointermove',e=>{if(!drag)return;const scale=view.w/svg.getBoundingClientRect().width;view.x=drag.vx-(e.clientX-drag.x)*scale;view.y=drag.vy-(e.clientY-drag.y)*scale;render();});['pointerup','pointercancel'].forEach(name=>svg.addEventListener(name,()=>drag=null));
 document.querySelector('#daylight').onclick=e=>{const night=document.querySelector('.archipelago').classList.toggle('night');e.currentTarget.setAttribute('aria-pressed',night);e.currentTarget.textContent=night?'☀ 白天':'☾ 夜晚';};
 document.querySelector('#links').onclick=e=>{const show=svg.classList.toggle('show-links');e.currentTarget.setAttribute('aria-pressed',show);};
})();

