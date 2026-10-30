'use strict';

const BALLS={
 normal:{name:'Normal Ball',key:'orbs',multiplier:1},
 great:{name:'Great Ball',key:'greatBalls',multiplier:2.5},
 master:{name:'Master Ball',key:'masterBalls',multiplier:Infinity}
};
const SHOP_ITEMS=[
 {id:'normal',name:'Normal Ball',key:'orbs',price:150,description:'Standard capture ball. Weaken wild creatures first.',badges:0},
 {id:'great',name:'Great Ball',key:'greatBalls',price:600,description:'2.5× the capture chance. Excellent for weakened legendaries.',badges:0},
 {id:'master',name:'Master Ball',key:'masterBalls',price:20000,description:'Guaranteed wild capture. Unlocks after six badges.',badges:6},
 {id:'potion',name:'Potion',key:'potions',price:200,description:'Restores 45% of max HP, at least 55 HP, during battle.',badges:0}
];
const routeTrainers=[
 {name:'Finn',trainerId:'finn',route:[[25,67],[25,69]],level:4,species:[8],reward:350},
 {name:'Lark',trainerId:'lark',route:[[31,40],[32,40]],level:5,species:[34,36],reward:450},
 {name:'Rio',trainerId:'rio',route:[[72,85],[74,85]],level:5,species:[58],reward:450},
 {name:'Tess',trainerId:'tess',route:[[83,45],[85,45]],level:6,species:[81,87],reward:550},
 {name:'Cora',trainerId:'cora',route:[[101,20],[103,20]],level:7,species:[17,25],reward:650},
 {name:'Flint',trainerId:'flint',route:[[121,24],[121,26]],level:8,species:[22,98],reward:700},
 {name:'Neri',trainerId:'neri',route:[[119,34],[119,36]],level:9,species:[59,62],reward:800},
 {name:'Sora',trainerId:'sora',route:[[124,61],[126,61]],level:10,species:[60,65],reward:850},
 {name:'Rook',trainerId:'rook',route:[[137,59],[139,59]],level:11,species:[83,91],reward:950},
 {name:'Indi',trainerId:'indi',route:[[163,65],[165,65]],level:12,species:[90,102],reward:1000},
 {name:'Jett',trainerId:'jett',route:[[165,82],[165,84]],level:13,species:[93,99],reward:1100},
 {name:'Lex',trainerId:'lex',route:[[163,110],[163,112]],level:14,species:[106,18],reward:1200},
 {name:'Faye',trainerId:'faye',route:[[186,111],[188,111]],level:15,species:[63,72],reward:1300},
 {name:'Koa',trainerId:'koa',route:[[220,113],[222,113]],level:16,species:[100,82],reward:1400},
 {name:'Nyx',trainerId:'nyx',route:[[218,85],[218,87]],level:17,species:[86,105],reward:1500},
 {name:'Aster',trainerId:'aster',route:[[220,57],[220,59]],level:18,species:[94,107],reward:1600},
 {name:'Lyra',trainerId:'lyra',route:[[189,31],[189,33]],level:19,species:[107,105],reward:1800},
 {name:'Sol',trainerId:'sol',route:[[250,110],[252,110]],level:46,species:[7,4,6],reward:2500}
].map((t,i)=>{
 const r=connectingRoutes[i-4],vertical=r&&r.from[0]===r.to[0],x=r?Math.floor(r.x+r.w/2):0,y=r?Math.floor(r.y+r.h/2):0;
 return {...t,...(r?{route:vertical?[[x+1,y-1],[x+1,y+1]]:[[x-1,y+1],[x+1,y+1]],level:r.level,reward:600+r.level*55}:{}),role:'Route challenger',shirt:['#ab8dba','#d4a16e','#83adae','#a6b87b'][i%4],hair:['#6d4f42','#9d765a','#4d5367'][i%3],skin:['#dcb28a','#b98464','#eac7a0'][i%3]};
});
function validAdventureSave(s){
 for(const key of ['coins','greatBalls','masterBalls','steps'])if(s[key]!==undefined&&(!Number.isSafeInteger(s[key])||s[key]<0))return false;
 if(s.seen!==undefined&&(!Array.isArray(s.seen)||!s.seen.every(id=>Number.isInteger(id)&&id>=0&&id<SPECIES.length)))return false;
 if(s.defeatedTrainers!==undefined&&(!Array.isArray(s.defeatedTrainers)||!s.defeatedTrainers.every(id=>routeTrainers.some(t=>t.trainerId===id))))return false;
 return validJourneySave(s);
}
function initializeAdventure(){
 const established=state.team.length>0;
 state.adventureStarted??=established;state.starterReceived??=established;state.hasDex??=established;state.homecomingSeen??=false;
 migrateJourney();state.sideQuests??=[];state.fishingRod??=false;state.fishCaught??=0;
 state.coins??=600;state.greatBalls??=0;state.masterBalls??=0;state.steps??=0;
 state.defeatedTrainers??=[];state.seen??=[];
 state.seen=[...new Set([...state.seen,...ownedCreatures().map(m=>m.species)])];
 if(state.adventureStarted)save();
}
function recordSeen(monsters){
 state.seen=[...new Set([...(state.seen||[]),...ownedCreatures().map(m=>m.species),...monsters.map(m=>m.species)])];
 save();
}
function isWildBattle(){return !!battle&&battle.gym===null&&!battle.trainer}
function captureChance(mon,ball){
 if(!BALLS[ball])throw new Error('Unknown capture ball: '+ball);
 if(ball==='master')return 1;
 const weakness=1-mon.hp/maxHP(mon),base=SPECIES[mon.species].legendary ? .18+.42*weakness : .25+.7*weakness;
 return Math.min(.99,base*BALLS[ball].multiplier);
}
function battleRewards(){
 let coins=0;
 if(battle.trainer){
  state.defeatedTrainers??=[];
  if(!state.defeatedTrainers.includes(battle.trainer.trainerId)){coins=battle.trainer.reward;state.defeatedTrainers.push(battle.trainer.trainerId)}
 }else if(battle.gym!==null&&state.badges===battle.gym)coins=1000+battle.gym*500;
 state.coins=(state.coins??600)+coins;
 return coins;
}
function startTrainerBattle(trainer){
 if(battle||state.defeatedTrainers?.includes(trainer.trainerId))return;
 beginBattle(trainer.species.map((id,i)=>trainedMon(id,Math.min(50,trainer.level+i))),null,trainer);
}
function offerTrainerBattle(trainer){
 if(state.defeatedTrainers?.includes(trainer.trainerId)){regionNotice(trainer.name+' · Trainer','You won our battle fair and square! Keep exploring. The trainers farther along the road still have coins to award.');return}
 held.clear();$('modal-content').innerHTML='<div class="eyebrow">A TRAINER WANTS TO BATTLE</div><h1 id="trainer-name"></h1><p id="trainer-info"></p><div class="actions"><button class="btn" id="trainer-later">Not now</button><button class="btn primary" id="trainer-fight">Accept challenge</button></div>';
 $('trainer-name').textContent=trainer.name;$('trainer-info').textContent=`${trainer.species.length} companions · Lv. ${trainer.level} · Win ${trainer.reward} coins. Trainer creatures cannot be captured.`;
 $('trainer-later').onclick=()=>{$('modal').classList.add('hidden');canvas.focus()};
 $('trainer-fight').onclick=()=>{$('modal').classList.add('hidden');startTrainerBattle(trainer)};
 $('modal').classList.remove('hidden');$('trainer-fight').focus();
}
function tryTrainerChallenge(){
 if(!state.team.some(m=>m.hp>0))return false;
 const candidate=routeTrainers.find(t=>{
  if(state.defeatedTrainers?.includes(t.trainerId))return false;
  const p=personPosition(t),x=Math.round(p.x),y=Math.round(p.y),dx=state.x-x,dy=state.y-y;
  if((dx!==0&&dy!==0)||Math.abs(dx)+Math.abs(dy)>4||Math.abs(dx)+Math.abs(dy)<1)return false;
  const distance=Math.max(Math.abs(dx),Math.abs(dy));
  for(let i=1;i<distance;i++)if(regionBlocked(x+Math.sign(dx)*i,y+Math.sign(dy)*i))return false;
  return true;
 });
 if(!candidate||Math.random()>.35)return false;
 startTrainerBattle(candidate);return !!battle;
}
function tryLegendaryEncounter(interact=false){
 if(battle||evolving||state.scene!=='region'||!state.team.some(m=>m.hp>0))return false;
 const legend=LEGENDARIES.find(l=>state.badges>=l.badges&&!ownedCreatures().some(m=>m.species===l.species)&&Math.hypot(state.x-l.x,state.y-l.y)<=3);
 if(!legend||!interact&&Math.random()>=.25)return false;
 beginBattle([makeMon(legend.species,legend.level)],null);return !!battle;
}
function showShop(){
 if(battle||currentBuilding()?.kind!=='shop'||state.scene!=='interior')return;
 if(!state.starterReceived){regionNotice('Your first supplies','Professor Mina has your first 5 Normal Balls and Grove Dex. Visit her laboratory and choose your partner before shopping.');return}
 held.clear();renderShop();$('modal').classList.remove('hidden');$('shop-close').focus();
}
function renderShop(message='Welcome! Trainer and gym victories earn coins.'){
 $('modal-content').innerHTML='<div class="eyebrow">GROVE MART · TRAINER SUPPLIES</div><h1 style="font-size:30px;margin:8px 0">Ready for the road?</h1><p id="shop-wallet" style="margin:0 0 9px;font-size:11px"></p><div class="shop-grid" id="shop-grid"></div><p id="shop-message" role="status" aria-live="polite" style="font-size:10px;margin:12px 0"></p><button class="btn primary" id="shop-close">Back to the shop</button>';
 $('shop-wallet').textContent=(state.coins??600)+' coins · Master Balls unlock at 6 badges';
 const grid=$('shop-grid');
 for(const item of SHOP_ITEMS){
  const locked=state.badges<item.badges,card=document.createElement('div');card.className='shop-card';
  card.innerHTML='<canvas width="64" height="64" aria-hidden="true"></canvas><strong></strong><small></small><span></span><button class="btn"></button>';
  drawShopItem(card.querySelector('canvas').getContext('2d'),item.id);
  card.querySelector('strong').textContent=item.name;card.querySelector('small').textContent=item.description;
  card.querySelector('span').textContent=item.price.toLocaleString()+' coins · Own '+(state[item.key]||0);
  const button=card.querySelector('button');button.textContent=locked?'Needs '+item.badges+' badges':'Buy one';button.disabled=locked||(state.coins??600)<item.price;button.onclick=()=>buyShopItem(item.id);grid.appendChild(card);
 }
 $('shop-message').textContent=message;$('shop-close').onclick=()=>{$('modal').classList.add('hidden');canvas.focus()};
}
function buyShopItem(id){
 const item=SHOP_ITEMS.find(item=>item.id===id);
 if(battle||state.scene!=='interior'||currentBuilding()?.kind!=='shop'){toast('Purchases are only available inside a Grove Mart.');return false}
 if(!item){renderShop('That item is not available.');return false}
 if(state.badges<item.badges){renderShop('Master Balls unlock after six badges.');return false}
 if((state.coins??600)<item.price){renderShop('Not enough coins. Win trainer and gym battles to earn more.');return false}
 if(!Number.isSafeInteger((state[item.key]||0)+1)){renderShop('Your bag cannot hold any more of that item.');return false}
 state.coins=(state.coins??600)-item.price;state[item.key]=(state[item.key]||0)+1;audio.play('caught');save();renderUI();renderShop('Bought one '+item.name+'!');return true;
}
function drawShopItem(c,id){
 c.imageSmoothingEnabled=false;
 if(id==='potion'){rect(c,22,10,20,8,'#657786');rect(c,19,18,26,35,'#bbc8d2');rect(c,22,24,20,24,'#b38eb7');rect(c,30,28,5,17,'#f5e6c9');rect(c,24,34,17,5,'#f5e6c9');return}
 const color=id==='master'?'#ab8acb':id==='great'?'#78a9c8':'#d58b77';
 rect(c,14,14,36,36,'#304b48');rect(c,17,17,30,14,color);rect(c,17,34,30,13,'#efe4c1');rect(c,26,26,12,12,'#304b48');rect(c,29,29,6,6,'#f3d491');
 if(id==='master'){rect(c,19,18,4,7,'#e0b0ca');rect(c,41,18,4,7,'#e0b0ca')}
 if(id==='great'){rect(c,20,17,5,9,'#d69084');rect(c,39,17,5,9,'#d69084')}
}
function drawAdventureHints(time,camX,camY){
 ctx.save();ctx.translate(-Math.round(camX),-Math.round(camY));
 for(const [x,y] of [[258,108],[268,113],[284,108],[294,113]]){rect(ctx,x*32-5,y*32-6,11,22,'#7d8491');rect(ctx,x*32-8,y*32-11,17,7,'#c1b9ca');sparkle(ctx,x*32,y*32-20,5,'#eee1bc')}
 for(const t of routeTrainers){const p=personPosition(t,time);if(Math.abs(p.x*32-(camX+480))>520||Math.abs(p.y*32-(camY+300))>350)continue;ctx.font='bold 12px monospace';ctx.textAlign='center';ctx.fillStyle=state.defeatedTrainers?.includes(t.trainerId)?'#b7d3a0':'#ffe0a1';ctx.fillText(state.defeatedTrainers?.includes(t.trainerId)?'✓':'!',p.x*32,p.y*32-38)}
 for(const l of LEGENDARIES)if(state.badges>=l.badges&&!ownedCreatures().some(m=>m.species===l.species)){
  const x=l.x*32,y=l.y*32;if(Math.abs(x-camX-480)>560||Math.abs(y-camY-300)>420)continue;
  rect(ctx,x-17,y-8,34,24,'#615e79');rect(ctx,x-13,y-12,26,23,'#b6b1bb');creature(ctx,l.species,x,y-15,.95);
  ctx.textAlign='center';ctx.font='bold 12px monospace';ctx.fillStyle='#fff1b2';ctx.fillText(l.name.toUpperCase()+' · E TO CHALLENGE',x,y-75);
  if(!reducedMotion.matches)for(let i=0;i<8;i++)sparkle(ctx,x+Math.sin(time/900+i)*40,y-25+Math.cos(time/1100+i)*35,2,l.accent);
 }
 ctx.restore();
}

const miniMapTerrain=document.createElement('canvas');
miniMapTerrain.width=REGION_WIDTH;miniMapTerrain.height=REGION_HEIGHT;
$('mini-map').width=REGION_WIDTH;$('mini-map').height=REGION_HEIGHT;
const miniMapContext=miniMapTerrain.getContext('2d');
const miniMapColors={tree:'#294e40',lawn:'#8da675',path:'#d8c393',grass:'#60895d',water:'#639fab',bridge:'#c2a77d',flowers:'#b7ba86',building:'#c78d7d',door:'#efdbab'};
for(let y=0;y<REGION_HEIGHT;y++)for(let x=0;x<REGION_WIDTH;x++)rect(miniMapContext,x,y,1,1,miniMapColors[regionTile(x,y)]);
for(const b of regionBuildings)if(b.kind==='gym'||b.kind==='shop')rect(miniMapContext,b.x,b.y,5,4,b.kind==='gym'?'#e9d69b':'#90c7e2');
let lastMiniMapKey='';
function worldMapPosition(){
 const b=currentBuilding();
 if(state.scene==='commons')return {x:34,y:23,label:'Grove League District · Shuttle stop in Fernwick'};
 if(state.scene==='interior'&&b)return {x:b.x+2,y:b.y+4,label:b.name+' · '+regionZone(b.x+2,b.y+4).name};
 return {x:state.x,y:state.y,label:regionZone().name};
}
function updateMapHud(time=performance.now()){
 const hud=$('world-map-hud');
 const visible=state.team.length>0&&!battle&&!evolving&&$('intro').classList.contains('hidden')&&$('modal').classList.contains('hidden');
 hud.classList.toggle('hidden',!visible);
 if(!visible)return;
 const p=worldMapPosition(),blink=reducedMotion.matches?0:Math.floor(time/600)%2,key=p.x+','+p.y+','+blink+','+state.badges+','+LEGENDARIES.map(l=>ownedCreatures().some(m=>m.species===l.species)?1:0).join('');
 hud.title='You are here: '+p.label+' · Click or press M for the full map';
 if(key===lastMiniMapKey)return;
 lastMiniMapKey=key;
 const c=$('mini-map').getContext('2d');c.imageSmoothingEnabled=false;c.clearRect(0,0,REGION_WIDTH,REGION_HEIGHT);c.drawImage(miniMapTerrain,0,0);
 for(const l of LEGENDARIES)if(state.badges>=l.badges&&!ownedCreatures().some(m=>m.species===l.species))sparkle(c,l.x,l.y,3,l.accent);
 rect(c,p.x-3,p.y-3,7,7,'#173d36');rect(c,p.x-2,p.y-2,5,5,blink?'#fff2bd':'#f8cb72');rect(c,p.x-5,p.y,2,1,'#fff2bd');rect(c,p.x+4,p.y,2,1,'#fff2bd');rect(c,p.x,p.y-5,1,2,'#fff2bd');rect(c,p.x,p.y+4,1,2,'#fff2bd');
}
function toggleWorldMap(){
 if(!$('modal').classList.contains('hidden')&&$('chart-close')){$('chart-close').click();return}
 showRegionMap();
}
$('world-map-hud').onclick=showRegionMap;

function roomFurniture(b){
 if(!b)return [];
 if(b.kind==='gym')return [{kind:'pillar',x:8,y:9,w:2,h:2},{kind:'pillar',x:21,y:9,w:2,h:2},{kind:'pillar',x:8,y:13,w:2,h:2},{kind:'pillar',x:21,y:13,w:2,h:2}];
 if(b.kind==='home')return [{kind:'bed',x:7,y:6,w:3,h:5},{kind:'bookcase',x:20,y:6,w:3,h:2},{kind:'sofa',x:19,y:11,w:4,h:2},{kind:'table',x:12,y:11,w:2,h:2},{kind:'plant',x:7,y:15,w:1,h:1}];
 if(b.kind==='lab')return [{kind:'machine',x:7,y:6,w:4,h:3},{kind:'machine',x:20,y:6,w:3,h:3},{kind:'specimens',x:8,y:12,w:4,h:2},{kind:'specimens',x:19,y:12,w:4,h:2}];
 if(b.kind==='rest')return [{kind:'healer',x:7,y:6,w:4,h:3},{kind:'bed',x:20,y:6,w:3,h:4},{kind:'sofa',x:7,y:12,w:4,h:2},{kind:'sofa',x:19,y:12,w:4,h:2}];
 if(b.kind==='shop')return [{kind:'shelf',x:7,y:6,w:4,h:3},{kind:'shelf',x:20,y:6,w:3,h:3},{kind:'shelf',x:7,y:12,w:4,h:2},{kind:'shelf',x:20,y:12,w:3,h:2}];
 return [{kind:'bench',x:7,y:8,w:4,h:2},{kind:'bench',x:7,y:12,w:4,h:2},{kind:'kiosk',x:20,y:8,w:3,h:3}];
}
function interiorBlocked(x,y){
 if(x<6||x>23||y<3||y>17||y<=5)return true;
 const b=currentBuilding();
 if(y===7&&x>=12&&x<=18)return true;
 return roomFurniture(b).some(f=>x>=f.x&&x<f.x+f.w&&y>=f.y&&y<f.y+f.h);
}
function furnitureArt(f,time){
 const x=f.x*32-16,y=f.y*32-16,w=f.w*32,h=f.h*32;
 rect(ctx,x+5,y+h-5,w,10,'#263f3b33');
 if(f.kind==='bed'){
  rect(ctx,x,y,w,h,'#78694f');rect(ctx,x+5,y+8,w-10,h-17,'#eee3bd');rect(ctx,x+10,y+15,w-20,26,'#fff4d7');rect(ctx,x+5,y+49,w-10,h-58,'#92b2a7');rect(ctx,x+5,y+52,w-10,6,'#c6d7bd');rect(ctx,x+8,y+h-9,5,10,'#665741');rect(ctx,x+w-13,y+h-9,5,10,'#665741');
 }else if(f.kind==='sofa'||f.kind==='bench'){
  rect(ctx,x,y+5,w,h-8,'#577b70');rect(ctx,x+6,y,w-12,15,'#8fb09a');for(let i=0;i<3;i++)rect(ctx,x+8+i*(w-16)/3,y+19,(w-22)/3,h-28,'#a9bea0');rect(ctx,x,y+8,7,h-12,'#6b8c77');rect(ctx,x+w-7,y+8,7,h-12,'#6b8c77');
 }else if(f.kind==='table'){
  rect(ctx,x+3,y+4,w-6,h-8,'#997b55');rect(ctx,x,y,w,9,'#dfc495');rect(ctx,x+7,y+10,w-14,h-23,'#c3a16e');rect(ctx,x+12,y+12,17,17,'#ede2ba');rect(ctx,x+17,y+16,8,8,'#a5c093');rect(ctx,x+w-17,y+10,7,11,'#b98167');
 }else if(f.kind==='plant'){
  rect(ctx,x+5,y+16,w-10,h-13,'#a48463');rect(ctx,x+10,y-6,10,28,'#4d7f5c');rect(ctx,x,y+3,24,8,'#85aa70');rect(ctx,x+14,y-9,18,10,'#b2c781');
 }else if(f.kind==='pillar'){
  rect(ctx,x+8,y,w-16,h,'#8f9d8a');rect(ctx,x+12,y+8,w-24,h-18,'#c4cbb0');rect(ctx,x+5,y-5,w-10,12,'#e1dbb5');rect(ctx,x+4,y+h-8,w-8,10,'#6a8170');
 }else if(f.kind==='machine'||f.kind==='healer'||f.kind==='kiosk'){
  rect(ctx,x,y+7,w,h-8,'#668482');rect(ctx,x+5,y,w-10,h-17,'#bdcbb9');rect(ctx,x+12,y+9,w-24,Math.max(18,h/2),'#254c52');rect(ctx,x+17,y+14,w-34,Math.max(10,h/2-10),'#82c4b0');
  const glow=reducedMotion.matches?1:.65+Math.sin(time/500)*.25;ctx.globalAlpha=glow;rect(ctx,x+22,y+21,w-44,4,'#dbf5c3');ctx.globalAlpha=1;
  for(let i=0;i<3;i++)rect(ctx,x+14+i*15,y+h-24,7,5,['#d8998c','#f1d18b','#a4c78e'][i]);
  if(f.kind==='healer'){rect(ctx,x+w/2-4,y+19,8,27,'#f6e4c3');rect(ctx,x+w/2-13,y+28,27,8,'#f6e4c3')}
 }else if(f.kind==='specimens'){
  rect(ctx,x,y+14,w,h-15,'#849a8f');rect(ctx,x-2,y+9,w+4,10,'#d8d2aa');
  for(let i=0;i<3;i++){rect(ctx,x+10+i*36,y-12,26,23,'#8cb7b1');rect(ctx,x+13+i*36,y-17,20,5,'#d2dbc0');creature(ctx,(i+8+f.x)%108,x+22+i*36,y+4,.4)}
 }else{
  rect(ctx,x,y,w,h,'#6f6652');for(let row=0;row<2;row++){rect(ctx,x+4,y+6+row*(h/2),w-8,h/2-10,'#344e47');for(let col=0;col<Math.floor(w/16);col++)rect(ctx,x+8+col*15,y+11+row*(h/2),9,h/2-19,['#8faeb1','#c5ae77','#b68f99','#a6b883'][(col+row)%4]);rect(ctx,x,y+h/2-3+row*(h/2),w,5,'#c0a179')}
 }
}
function drawAdventureInterior(time){
 const b=currentBuilding(),gym=b?.kind==='gym'?GYMS[b.gym]:null,color=gym?TYPES[gym.type]:b?.kind==='shop'?'#83adbb':b?.kind==='rest'?'#d5a09b':'#c5be94';
 ctx.fillStyle='#10262c';ctx.fillRect(0,0,960,600);
 const floor=gym?['#b9c2a1','#c6ccaa']:b?.kind==='lab'?['#c4d1c0','#b5c5b9']:b?.kind==='home'?['#d5bd91','#c6aa7e']:['#dfd2aa','#d1c59e'];
 for(let y=3;y<=17;y++)for(let x=6;x<=23;x++){rect(ctx,x*32-16,y*32-16,32,32,floor[(x+y)%2]);rect(ctx,x*32-16,y*32+14,32,1,'#455a3c11');if(b?.kind==='home')rect(ctx,x*32+14,y*32-16,1,32,'#8b765a33')}
 rect(ctx,176,72,576,92,color);rect(ctx,176,72,576,7,'#eff0cb66');rect(ctx,176,153,576,12,'#3c625355');rect(ctx,176,75,8,490,'#244a3833');rect(ctx,744,75,8,490,'#244a3833');
 for(const x of [220,669]){rect(ctx,x,94,43,42,'#557e73');rect(ctx,x+4,98,35,34,'#9cc6bc');rect(ctx,x+20,98,3,34,'#ebdfb8');rect(ctx,x+4,113,35,3,'#ebdfb8')}
 ctx.textAlign='center';ctx.font='bold 18px monospace';ctx.fillStyle='#294c41';ctx.fillText(b?.name.toUpperCase()||'WELCOME',480,121);
 rect(ctx,399,282,162,218,gym?'#819469':b?.kind==='home'?'#a07b77':'#809c92');rect(ctx,404,287,152,208,'#d7ce9c44');rect(ctx,410,291,3,199,'#f1dc9f77');rect(ctx,546,291,3,199,'#f1dc9f77');
 if(gym)drawGymTheme(gym,time);
 else{rect(ctx,369,204,224,36,'#806b51');rect(ctx,365,192,232,15,'#eee0b4');rect(ctx,374,210,214,3,'#be9c72');if(b?.kind==='shop'){for(let i=0;i<3;i++)rect(ctx,394+i*65,178,28,16,['#d89880','#8eafbd','#bc9bc4'][i])}}
 for(const f of roomFurniture(b))furnitureArt(f,time);
 const p=roomPerson();if(p)drawPerson(ctx,p,480,224,time);
 if(state.y<=9&&Math.abs(state.x-15)<=2){ctx.font='bold 12px monospace';ctx.fillStyle='#4b6549';ctx.fillText(b?.kind==='shop'?'E · SHOP':'E · TALK',480,270)}
 if(b?.kind==='league'){ctx.font='bold 12px monospace';ctx.fillStyle='#e4e8c3';ctx.fillText('E · DEPART',672,390)}
 rect(ctx,441,523,78,36,'#786350');rect(ctx,446,527,68,28,'#d0b581');ctx.font='bold 10px monospace';ctx.fillStyle='#4d5942';ctx.fillText('EXIT ↓',480,546);
 drawRegionPlayer(time);
 const light=ctx.createRadialGradient(470,250,70,470,310,450);light.addColorStop(0,'#fff1c009');light.addColorStop(1,'#122f2b30');ctx.fillStyle=light;ctx.fillRect(176,74,576,490);
 drawCelebration(ctx,time);
}
function drawGymTheme(gym,time){
 const b=currentBuilding(),i=b.gym,color=TYPES[gym.type];
 rect(ctx,418,185,124,69,'#4d715c');rect(ctx,424,191,112,57,color);rect(ctx,429,196,102,47,'#e8e5bc33');
 ctx.textAlign='center';ctx.fillStyle='#274a44';ctx.font='bold 24px monospace';ctx.fillText(gym.symbol,480,218);
 const themes=[
  ['#688d5d','#a8c482'],['#9a6350','#f2b96f'],['#5b989e','#b7dbce'],['#929080','#d5d0b0'],
  ['#9c985b','#f3dc86'],['#91b8be','#d9efdf'],['#6e6485','#c3acd7'],['#9e86ac','#f3d9ab']
 ],palette=themes[i];
 for(const left of [true,false]){
  const x=left?344:584;
  for(let j=0;j<5;j++){
   const y=293+j*39;
   if(i===0){rect(ctx,x,y,32,22,palette[0]);rect(ctx,x+5,y-6,21,23,palette[1]);rect(ctx,x+11,y-12,9,13,'#c9da9c')}
   else if(i===1){rect(ctx,x+5,y,22,25,palette[0]);for(let k=0;k<4;k++)rect(ctx,x+7+k*5,y-14-(reducedMotion.matches?0:Math.sin(time/100+j+k)*3),5,17,palette[1])}
   else if(i===2||i===5){rect(ctx,x-8,y,49,31,palette[0]);rect(ctx,x+(reducedMotion.matches?0:Math.sin(time/900+j)*4),y+9,28,2,palette[1]);if(i===5)sparkle(ctx,x+14,y+14,7,palette[1])}
   else if(i===3){rect(ctx,x-3,y+4,38,23,palette[0]);rect(ctx,x+3,y-6,23,25,palette[1]);rect(ctx,x+6,y-7,12,4,'#f0e1bb')}
   else if(i===4){rect(ctx,x+8,y,13,28,palette[0]);rect(ctx,x+2,y-3,25,6,palette[1]);if(!reducedMotion.matches){ctx.strokeStyle=palette[1];ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x+15,y);ctx.lineTo(x+8+Math.sin(time/80+j)*5,y-9);ctx.lineTo(x+21,y-18);ctx.stroke()}}
   else{rect(ctx,x+10,y,8,27,palette[0]);sparkle(ctx,x+14,y-1,8,palette[1]);if(i===7)sparkle(ctx,x+28,y+19,3,'#f6e5b4')}
  }
 }
}
