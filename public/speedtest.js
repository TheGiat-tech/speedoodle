'use strict';
(function(){
  if (window.__speedoodle && window.__speedoodle.initialized) return;
  window.__speedoodle = { initialized: true };
  const $ = (id)=>document.getElementById(id);
  const clamp = (v,a,b)=> Math.min(b,Math.max(a,v));
  const bitsToMbps = (bits)=> bits/1e6;

  // slot-machine style counter animation
  function animateCounter(el, target, duration=1000){
    if(!el) return;
    let finalValue = Number(target);
    if(!Number.isFinite(finalValue)) finalValue = 0;
    const prev = el.dataset && el.dataset.final;
    let start = prev!=null ? parseFloat(prev) : parseFloat(el.textContent);
    if(!Number.isFinite(start)) start = 0;
    const t0 = performance.now();
    el.dataset.final = String(finalValue);
    (function raf(now){
      const progress = Math.min(1,(now-t0)/duration);
      const value = start + (finalValue-start)*progress;
      el.textContent = value.toFixed(2);
      if(progress<1) requestAnimationFrame(raf);
    })(t0);
  }

  function resetMetric(id){
    const el=$(id);
    if(!el) return;
    if(el.dataset) delete el.dataset.final;
    el.textContent='—';
  }
  function metricValue(id,max=200){ resetMetric(id); const v=Math.random()*max; animateCounter($(id),v,1400); return v; }

  // ===== CSV builder =====
  const csvData = { results:[] };
  function addResult(label,val){ csvData.results.push([label,val]); }
  function buildCSV(){
    const rows=[['Metric','Value']];
    rows.push(...csvData.results);
    return rows.map(r=>r.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n');
  }

  // ===== Canvas chart (line with interactive tooltips) =====
  class Line{
    constructor(canvas){
      this.c=canvas; if(!canvas) return;
      this.ctx=canvas.getContext('2d');
      this.data=[]; this.times=[];
      this._coords=[]; this._hover=-1; this._autoIdx=null; this._startT=null; this.maxY=5;
      this.tipEl=document.getElementById('speedTip');
      canvas.addEventListener('pointermove',e=>{
        const rect=this.c.getBoundingClientRect();
        const x=e.clientX-rect.left, y=e.clientY-rect.top;
        let best=-1, bestD=99999;
        for(let i=0;i<this._coords.length;i++){
          const p=this._coords[i]; const d=Math.hypot(p.x-x,p.y-y);
          if(d<bestD){ bestD=d; best=i; }
        }
        if(bestD<40){ this._hover=best; this._autoIdx=null; this.redraw(); } else { this._hover=-1; this._autoIdx=this.data.length-1; this.redraw(); }
      });
      canvas.addEventListener('pointerleave',()=>{ this._hover=-1; this._autoIdx=this.data.length-1; this.redraw(); });
      window.addEventListener('resize',()=>this.resize());
      this.resize();
    }
    resize(){ const dpr=window.devicePixelRatio||1; this.c.width=this.c.clientWidth*dpr; this.c.height=this.c.clientHeight*dpr; this.ctx.setTransform(1,0,0,1,0,0); this.ctx.scale(dpr,dpr); this.redraw(); }
    clear(){ this.data.length=0; this.times.length=0; this._coords=[]; this._hover=-1; this._autoIdx=null; this._startT=null; this.hideTip(); this.redraw(); }
    push(y){ if(this._startT==null) this._startT=performance.now(); this.data.push(y); const tSec=(performance.now()-this._startT)/1000; this.times.push(tSec); this.maxY=Math.max(this.maxY,y*1.1); if(this.data.length>400){ this.data.shift(); this.times.shift(); } this.redraw(); this._autoIdx=this.data.length-1; this.positionTip(this._autoIdx,true); }
    positionTip(idx,show){ if(!this.tipEl) return; if(!show){ this.tipEl.style.display='none'; return; } const p=this._coords[idx]; if(!p) return; const val=this.data[idx]; this.tipEl.style.display='block'; this.tipEl.textContent=`${val.toFixed(2)} Mbps`; this.tipEl.style.left=`${p.x}px`; this.tipEl.style.top=`${p.y}px`; }
    hideTip(){ this.positionTip(0,false); }
    redraw(){ const ctx=this.ctx,W=this.c.clientWidth,H=this.c.clientHeight; ctx.clearRect(0,0,W,H); ctx.strokeStyle='rgba(255,255,255,0.06)'; for(let i=0;i<=4;i++){ const y=H-(H*i/4); ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); ctx.fillStyle='rgba(200,220,255,0.6)'; ctx.font='12px system-ui,-apple-system,Segoe UI,Roboto,sans-serif'; ctx.fillText(((this.maxY*(i/4))|0)+'',4,y-2);} ctx.fillText('Mbps',4,12); ctx.textAlign='right'; ctx.fillText('sec',W-4,H-6);
      this._coords=[]; if(this.data.length<2) return; const step=W/Math.max(this.data.length-1,1); ctx.beginPath(); let x0=0,y0=H-(this.data[0]/this.maxY)*H; this._coords.push({x:0,y:y0}); ctx.moveTo(x0,y0); for(let j=1;j<this.data.length;j++){ const x=j*step,y=H-(this.data[j]/this.maxY)*H; this._coords.push({x,y}); const mx=(x0+x)/2, my=(y0+y)/2; ctx.quadraticCurveTo(x0,y0,mx,my); x0=x; y0=y; } ctx.quadraticCurveTo(x0,y0,W,H-(this.data[this.data.length-1]/this.maxY)*H); ctx.strokeStyle='rgba(33,208,195,1)'; ctx.lineWidth=2; ctx.stroke(); ctx.lineTo(W,H); ctx.lineTo(0,H); ctx.closePath(); ctx.fillStyle='rgba(33,208,195,0.08)'; ctx.fill();
      const tipIdx=this._hover>=0?this._hover:this._autoIdx; if(tipIdx>=0) this.positionTip(tipIdx,true); else this.hideTip(); }
  }
  const line = new Line($('speedCanvas'));

  // ===== Gauge (spring animation) =====
  const gauge = $('scoreCanvas');
  let scorePos=0, scoreVel=0, scoreTarget=0, running=false, lastT=0;
  function drawGauge(score){ if(!gauge) return; const g=gauge.getContext('2d'), dpr=window.devicePixelRatio||1; const W=gauge.clientWidth,H=gauge.clientHeight; gauge.width=W*dpr; gauge.height=H*dpr; g.setTransform(1,0,0,1,0,0); g.scale(dpr,dpr); const cx=W/2, cy=H*0.95, r=Math.min(cx,cy)-12; g.clearRect(0,0,W,H); g.lineWidth=16; g.lineCap='round'; g.strokeStyle='#243044'; g.beginPath(); g.arc(cx,cy,r,Math.PI,0); g.stroke(); const s=clamp(score,0,100); const grad=g.createLinearGradient(0,0,W,0); grad.addColorStop(0,'#ff5470'); grad.addColorStop(0.5,'#f2c94c'); grad.addColorStop(1,'#21d6c7'); g.strokeStyle=grad; g.beginPath(); g.arc(cx,cy,r,Math.PI, Math.PI+Math.PI*(s/100)); g.stroke(); g.save(); g.translate(cx,cy); g.rotate(Math.PI); for(let i=0;i<=10;i++){ const t=i/10, a=Math.PI*t, len=(i%5===0)?12:6; const x1=(r-8)*Math.cos(a), y1=(r-8)*Math.sin(a), x2=(r-8-len)*Math.cos(a), y2=(r-8-len)*Math.sin(a); g.strokeStyle='rgba(255,255,255,0.2)'; g.lineWidth=2; g.beginPath(); g.moveTo(x1,y1); g.lineTo(x2,y2); g.stroke(); } g.restore(); const ang=Math.PI+Math.PI*(s/100), nx=cx+(r-18)*Math.cos(ang), ny=cy+(r-18)*Math.sin(ang); g.strokeStyle='#cde8ff'; g.lineWidth=3; g.beginPath(); g.moveTo(cx,cy); g.lineTo(nx,ny); g.stroke(); }
  function setScoreTarget(t){ scoreTarget=clamp(+t||0,0,100); if(!running){ running=true; lastT=performance.now(); requestAnimationFrame(step); } }
  function step(now){ const dt=Math.min(0.05,(now-lastT)/1000); lastT=now; const k=14, c=8; const a=k*(scoreTarget-scorePos)-c*scoreVel; scoreVel+=a*dt; scorePos+=scoreVel*dt; if(Math.abs(scoreVel)<0.01 && Math.abs(scoreTarget-scorePos)<0.2){ scorePos=scoreTarget; scoreVel=0; running=false; } $('scoreCenter').textContent=String(Math.round(scorePos)); drawGauge(scorePos); if(running) requestAnimationFrame(step); }

  // ===== scoring & verdict =====
  function scoreConnection(o){ const down=Math.min(o.downMbps/100,1)*35; const up=Math.min(o.upMbps/20,1)*35; const ping=Math.min(15/Math.max(o.pingMs,1),1)*20; const jit=Math.min(5/Math.max(o.jitterMs,1),1)*10; return Math.round(down+up+ping+jit); }
  function qualityLabel(o){ if(o.downMbps>=3&&o.upMbps>=2.5&&o.pingMs<=60) return 'Excellent for 1080p'; if(o.downMbps>=1.2&&o.upMbps>=1.2&&o.pingMs<=100) return 'Good for 720p'; if(o.downMbps>=0.6&&o.upMbps>=0.6) return 'Okay for basic video'; return 'Poor - audio only'; }
  function verdictText(o){ const parts=[]; if(o.downMbps<1.2||o.upMbps<1.2) parts.push('Low bandwidth'); if(o.pingMs>80) parts.push('High latency'); if(o.jitterMs>20) parts.push('High jitter'); return parts.length?('• '+parts.join('\n• ')):'Looks great for video calls.'; }

  // ===== endpoints & helpers =====
  const CF_DOWN='https://speed.cloudflare.com/__down?bytes=';
  const CF_UP  ='https://speed.cloudflare.com/__up';
  function fetchWithTimeout(url,opts={},timeoutMs=2000){ const c=('AbortController' in window)?new AbortController():null; if(c) opts.signal=c.signal; const t=setTimeout(()=>{ if(c) c.abort(); }, timeoutMs); return fetch(url,opts).finally(()=>clearTimeout(t)); }
  function safeFillRandom(u8){ try{ if(!(crypto&&crypto.getRandomValues)) return; for(let i=0;i<u8.byteLength;i+=65536){ crypto.getRandomValues(u8.subarray(i,Math.min(i+65536,u8.byteLength))); } }catch(_){} }

  // ===== tests =====
  function testPing(samples=4){ const arr=[]; const one=()=>{ const t0=performance.now(); return fetchWithTimeout(CF_DOWN+'1',{cache:'no-store',mode:'cors'},1200).then(()=>arr.push(performance.now()-t0)).catch(()=>arr.push(1200)); }; let p=Promise.resolve(); for(let i=0;i<samples;i++) p=p.then(one); return p.then(()=>{ const mean=arr.length?arr.reduce((a,b)=>a+b,0)/arr.length:Infinity; const jit=arr.length?Math.sqrt(arr.map(x=>(x-mean)**2).reduce((a,b)=>a+b,0)/arr.length):Infinity; return {pingMs:mean,jitterMs:jit}; }); }
  function testDownload(ms=3500, parallel=3){ let loaded=0; const start=performance.now(), end=start+ms; let dlEMA=null; function run(){ return new Promise((resolve)=>{ (function loop(){ if(performance.now()>=end){ resolve(); return; } const size=4*1024*1024; fetchWithTimeout(CF_DOWN+size,{cache:'no-store',mode:'cors'},2000).then(r=>r.arrayBuffer()).then(b=>{ loaded+=(b&&b.byteLength?b.byteLength:0)*8; }).catch(()=>{}).finally(()=>{ const elapsed=(performance.now()-start)/1000; const mbps=bitsToMbps(loaded/Math.max(elapsed,0.001)); dlEMA = dlEMA==null? mbps : (dlEMA*0.8 + mbps*0.2); line.push(dlEMA); loop(); }); })(); }); } const ps=[]; for(let k=0;k<parallel;k++) ps.push(run()); return Promise.all(ps).then(()=>({downMbps: bitsToMbps(loaded/(ms/1000))})); }
  function testUpload(ms=2500, parallel=2){ const payload=new Uint8Array(64*1024); safeFillRandom(payload); let sent=0; const start=performance.now(), end=start+ms; let usingBeacon=false; setTimeout(()=>{ if(sent===0 && 'sendBeacon' in navigator){ usingBeacon=true; const n=$('uplNote'); if(n) n.textContent='using beacon fallback'; } },1000); function run(){ return new Promise((resolve)=>{ (function loop(){ if(performance.now()>=end){ resolve(); return; } if(usingBeacon && navigator.sendBeacon){ try{ if(navigator.sendBeacon(CF_UP,payload)) sent+=payload.byteLength*8; }catch(_){} setTimeout(loop,0); return; } fetchWithTimeout(CF_UP,{method:'POST',mode:'cors',cache:'no-store',headers:{'Content-Type':'application/octet-stream'},body:payload},1500).then(()=>{ sent+=payload.byteLength*8; }).catch(()=>{}).finally(()=>loop()); })(); }); } const ps=[]; for(let k=0;k<parallel;k++) ps.push(run()); return Promise.all(ps).then(()=>({upMbps: bitsToMbps(sent/(ms/1000))})); }

  function runDemo(){ const ping=metricValue('pingVal',140); const jitter=metricValue('jitterVal',40); line.clear(); let cur=5, steps=140, i=0; (function tick(){ const target=i<90?Math.min(180,cur+Math.random()*6):Math.max(40,cur-Math.random()*3); cur=Math.max(5,Math.min(200,target)); line.push(cur); setScoreTarget(scoreConnection({downMbps:cur,upMbps:0.8,pingMs:ping,jitterMs:jitter})); i++; if(i<steps){ setTimeout(tick,35); return; } const dl=Math.max(30,Math.min(200,cur+(Math.random()*10-5))); const ul=0.8+Math.random()*1.2; animateCounter($('dlVal'), dl, 900); animateCounter($('ulVal'), ul, 900); const all={downMbps:dl,upMbps:ul,pingMs:ping,jitterMs:jitter}; setScoreTarget(scoreConnection(all)); $('scoreBadge').textContent=qualityLabel(all); $('verdict').textContent=verdictText(all)+' (demo)'; })(); }

  // ===== CPU & memory =====
  function setBadge(id,pct){ const el=$(id); if(!el) return; el.classList.remove('status-ok','status-warn','status-bad'); if(pct<60){ el.textContent='OK'; el.classList.add('status-ok'); } else if(pct<85){ el.textContent='High'; el.classList.add('status-warn'); } else { el.textContent='Very High'; el.classList.add('status-bad'); } }
  let longTaskMs=0, lastTick=performance.now();
  try{ if('PerformanceObserver' in window){ const po=new PerformanceObserver((list)=>{ const es=list.getEntries(); for(let i=0;i<es.length;i++) longTaskMs += es[i].duration||0; }); po.observe({type:'longtask', buffered:true}); } }catch(_){ }
  const frameDur=[]; (function rafSampler(){ let prev=performance.now(); function s(t){ frameDur.push(t-prev); if(frameDur.length>60) frameDur.shift(); prev=t; requestAnimationFrame(s);} requestAnimationFrame(s);} )();
  setInterval(()=>{
    const now=performance.now(), dt=(now-lastTick)/1000; lastTick=now; const cpuPct=clamp(100*(longTaskMs/(dt*1000)),0,100); longTaskMs=0; setBadge('cpuBadge',cpuPct); const c=$('cpuBar'); if(c) c.style.width=cpuPct+'%';
    try{ if(performance.memory){ const u=performance.memory.usedJSHeapSize, t=performance.memory.jsHeapSizeLimit; const pct=(u/t)*100; $('memVal').textContent=(u/1e6).toFixed(1)+' MB / '+(t/1e6).toFixed(0)+' MB'; setBadge('memBadge',pct); const b=$('memBar'); if(b) b.style.width=pct+'%'; } }catch(_){ }
  },1500);

  // ===== GO button & orchestration =====
  const btn=$('startBtn'), busyEl=$('busy');
  function setBusy(b){ if(busyEl){ b?busyEl.classList.add('show'):busyEl.classList.remove('show'); } if(btn){ btn.disabled=b; if(b){ btn.style.opacity='0.5'; btn.style.cursor='not-allowed'; } else { btn.style.opacity='1'; btn.style.cursor='pointer'; } } }

  async function runFullTest(){
    setBusy(true);
    ['dlVal','ulVal','pingVal','jitterVal'].forEach(id=>resetMetric(id));
    line.clear(); csvData.results=[];
    const ver=$('verdict'); if(ver) ver.textContent='—';
    const badge=$('scoreBadge'); if(badge) badge.textContent='—';
    setScoreTarget(0);
    try{
      const p=await testPing(4);
      animateCounter($('pingVal'), p.pingMs, 500);
      animateCounter($('jitterVal'), p.jitterMs, 500);
      const d=await testDownload(3500,3);
      animateCounter($('dlVal'), d.downMbps, 900);
      const u=await testUpload(2500,2);
      animateCounter($('ulVal'), u.upMbps, 900);
      const all={downMbps:d.downMbps,upMbps:u.upMbps,pingMs:p.pingMs,jitterMs:p.jitterMs};
      setScoreTarget(scoreConnection(all));
      if(badge) badge.textContent=qualityLabel(all);
      if(ver) ver.textContent=verdictText(all);
      addResult('Download (Mbps)',d.downMbps.toFixed(2));
      addResult('Upload (Mbps)',u.upMbps.toFixed(2));
      addResult('Ping (ms)',p.pingMs.toFixed(2));
      addResult('Jitter (ms)',p.jitterMs.toFixed(2));
      addResult('Quality',qualityLabel(all));
      addResult('Score',scoreConnection(all));
    }catch(e){ if(ver) ver.textContent='Test failed. Try again.'; console.error(e); }
    setBusy(false);
  }

  if(btn){ btn.addEventListener('click',runFullTest); }
  const csvBtn=$('metricsCsv');
  if(csvBtn){ csvBtn.addEventListener('click',()=>{ const txt=buildCSV(); const blob=new Blob([txt],{type:'text/csv'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='speedoodle-metrics.csv'; a.click(); URL.revokeObjectURL(url); }); }

  // ===== browser, OS =====
  const ua=navigator.userAgent||'';
  const browser=(()=>{ if(ua.includes('Edg/')) return 'Edge'; if(ua.includes('Chrome/')) return 'Chrome'; if(ua.includes('Safari/')&&!ua.includes('Chrome')) return 'Safari'; if(ua.includes('Firefox/')) return 'Firefox'; return 'Unknown'; })();
  const os=(()=>{ if(ua.includes('Win')) return 'Windows'; if(ua.includes('Mac')) return 'macOS'; if(ua.includes('Linux')) return 'Linux'; if(ua.includes('Android')) return 'Android'; if(ua.includes('iPhone')||ua.includes('iPad')) return 'iOS'; return 'Unknown'; })();
  const browserEl=$('browserVal'), osEl=$('osVal');
  if(browserEl) browserEl.textContent=browser;
  if(osEl) osEl.textContent=os;

  // ===== tests for correctness (do not remove) =====
  try{
    console.assert(scoreConnection({downMbps:0,upMbps:0,pingMs:999,jitterMs:999})>=0,'score lo bound');
    console.assert(scoreConnection({downMbps:200,upMbps:100,pingMs:1,jitterMs:1})<=100,'score hi bound');
    console.assert(typeof line !== 'undefined','line instance');
  }catch(_){ }
})();
