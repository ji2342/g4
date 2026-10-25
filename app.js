const topics = [
 ['讓根系，牽住每一寸土地。','植被覆蓋可以減少雨滴直接沖擊土壤；根系有助於穩固土壤。保留適合當地環境的植被，是認識水土保持的起點。','一起行動：走既有步道，不任意踩踏植被或裸露坡面。'],
 ['沿著溪流，看見上下游的連結。','雨水沿著地形流動，串起坡地、溪流與聚落。照顧土地，也需要理解水往哪裡走；圖中的水流僅為概念示意。','一起行動：不向溪流或排水設施丟棄垃圾。'],
 ['讓地面，留一點呼吸的空間。','綠地與適當的透水鋪面，可以讓部分雨水滲入地面。實際效果仍受土壤、地形與維護情況影響。','一起行動：觀察住家附近的綠地、鋪面與雨水流向。'],
 ['把雨水的旅程，再延長一點。','妥善設計的雨水收集設施，可以將雨水用於適當的非飲用用途。圖中水桶為示意，實際設施需要遮蓋與定期維護。','一起行動：認識社區雨水利用設施與它的維護方式。']
];
const story = document.querySelector('#story-content');
function selectTopic(index) {
 story.replaceChildren();
 ['h3','p','div'].forEach((tag,i)=>{const el=document.createElement(tag);el.textContent=topics[index][i];if(i===2)el.className='tip';story.append(el);});
 document.querySelectorAll('[data-topic]').forEach(b=>{const selected=b.dataset.focus!==undefined?Number(b.dataset.focus)===Number(document.querySelector(".archipelago")?.dataset.selected||0):Number(b.dataset.topic)===index;b.setAttribute('aria-pressed',String(selected));b.classList.toggle('active',selected);});
 const live=document.querySelector('#live-story');if(live){live.replaceChildren();['h3','p'].forEach((tag,i)=>{const el=document.createElement(tag);el.textContent=topics[index][i];live.append(el);});}
}
document.querySelectorAll('[data-topic]').forEach(b=>b.addEventListener('click',()=>{selectTopic(Number(b.dataset.topic));if(b.classList.contains('hotspot'))document.querySelector('.explore').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'center'});}));
selectTopic(0);
const rain=document.querySelector('#rain');
document.querySelector('#weather').addEventListener('click',event=>{
 const button=event.currentTarget;const enabled=button.getAttribute('aria-pressed')!=='true';button.setAttribute('aria-pressed',String(enabled));button.textContent=enabled?'☀ 回到晴天':'☂ 看看下雨時';rain.replaceChildren();
 if(enabled)for(let i=0;i<75;i++){const line=document.createElementNS('http://www.w3.org/2000/svg','line');const x=100+(i*137)%1020,y=140+(i*79)%350;Object.entries({x1:x,y1:y,x2:x+8,y2:y+22}).forEach(([k,v])=>line.setAttribute(k,v));line.style.animationDelay=`${-(i%10)/10}s`;rain.append(line);}
});
document.querySelector('#motion').addEventListener('click',event=>{const b=event.currentTarget;const paused=document.querySelector('#scene').classList.toggle('paused');b.setAttribute('aria-pressed',String(paused));b.textContent=paused?'▶ 繼續動畫':'Ⅱ 暫停動畫';});
function loadVideo(){
 const config=window.ISLAND_CONFIG||{};if(!config.videoUrl)return;
 const player=document.querySelector('#player');const status=document.querySelector('#film-status');
 try{
 const url=new URL(config.videoUrl,location.href);if(!['http:','https:'].includes(url.protocol))throw new Error('unsupported protocol');
 let id='';const host=url.hostname.replace(/^www\./,'');
 if(host==='youtu.be')id=url.pathname.slice(1);else if(host==='youtube.com'||host==='m.youtube.com')id=url.searchParams.get('v')||url.pathname.match(/^\/(?:embed|shorts)\/([^/]+)/)?.[1]||'';
 let media;
 if(/^[\w-]{11}$/.test(id)){media=document.createElement('iframe');media.src=`https://www.youtube-nocookie.com/embed/${id}`;media.title=config.videoTitle||'水保宣導影片';media.allow='fullscreen; picture-in-picture';media.allowFullscreen=true;media.referrerPolicy='strict-origin-when-cross-origin';}
 else if(/\.(mp4|webm)$/i.test(url.pathname)){media=document.createElement('video');media.controls=true;media.playsInline=true;media.preload='metadata';media.src=url.href;media.setAttribute('aria-label',config.videoTitle||'水保宣導影片');media.addEventListener('error',()=>{status.textContent='影片載入失敗，請檢查來源';});}
 else throw new Error('unsupported video');
 if(media.tagName==='VIDEO'&&config.poster)media.poster=config.poster;
 player.replaceChildren(media);status.textContent=config.videoTitle||'水保宣導影片';
 }catch{status.textContent='影片網址格式不支援，請使用 YouTube 或 MP4／WebM';}
}
loadVideo();

