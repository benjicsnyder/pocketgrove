'use strict';

const REGION_WIDTH=440,REGION_HEIGHT=160;
const regionTiles=Array.from({length:REGION_HEIGHT},()=>Array(REGION_WIDTH).fill('tree'));
const regionBuildings=[
 {id:'home',name:'Your home',x:15,y:82,color:'#ce8473',kind:'home'},
 {id:'lab',name:'Professor Mina',x:29,y:80,color:'#829fb4',kind:'lab'},
 {id:'willow-rest',name:'Rest House',x:15,y:89,color:'#c77873',kind:'rest'},
 {id:'fern-rest',name:'Rest House',x:15,y:14,color:'#c77873',kind:'rest'},
 {id:'fern-gym',name:'Fern Gym',x:27,y:9,color:'#7ca768',kind:'gym',gym:0},
 {id:'league',name:'League shuttle',x:32,y:19,color:'#a298b6',kind:'league'},
 {id:'willow-shop',name:'Grove Mart',x:30,y:90,color:'#699db6',kind:'shop'},
 {id:'fern-shop',name:'Grove Mart',x:13,y:7,color:'#699db6',kind:'shop'},
 ...journeyVillages.slice(1).flatMap((v,index)=>{
  const gym=index+1,prefix=GYMS[gym].name.toLowerCase();
  return [
   {id:prefix+'-gym',name:GYMS[gym].name+' Gym',x:v.x-2,y:v.y-9,color:TYPES[GYMS[gym].type],kind:'gym',gym,village:gym},
   {id:prefix+'-shop',name:'Grove Mart',x:v.x-10,y:v.y-8,color:'#699db6',kind:'shop',village:gym},
   {id:gym===5?'frost-rest':prefix+'-rest',name:'Rest House',x:v.x+5,y:v.y-8,color:'#c77873',kind:'rest',village:gym}
  ];
 }),
 ...residents.map(r=>{const v=journeyVillages[r.village];return {id:r.id+'-home',name:r.name+'’s home',x:r.village?v.x-10:30,y:r.village?v.y+4:26,color:r.shirt,kind:'home',resident:r.id,village:r.village}})
];
const regionZones=[
 {name:'Willowbrook',sub:'Your story starts here · Route 1 lies north',x:12,y:77,w:26,h:21},
 {name:'Route 1 · Sprout Path',sub:'Willowbrook ↔ Whisperwood · Wild creatures Lv. 2–4',x:19,y:56,w:13,h:21},
 {name:'Whisperwood Forest',sub:'Follow the winding trail north to Fernwick · Lv. 3–5',x:9,y:26,w:35,h:30},
 {name:'Fernwick',sub:'Home of Flora and the Fern Gym · Rest House to the west',x:12,y:6,w:28,h:20},
 {name:'Route 2 · Brookside',sub:'Cross the wooden bridge · Wild creatures Lv. 3–5',x:38,y:78,w:50,h:15},
 {name:'Route 3 · Sunridge',sub:'The long scenic road to Fernwick · Lv. 4–6',x:76,y:25,w:17,h:53},
 {name:'Route 3 · Sunridge',sub:'Fernwick lies west · Willowbrook lies south',x:40,y:12,w:52,h:14},
 ...journeyVillages.slice(1).map((v,i)=>({name:`Route ${i+4} · ${v.name}`,sub:GYMS[i+1].name+' Gym · Homes, a Rest House, a shop and a fishing pond',x:v.x-12,y:v.y-12,w:25,h:25,level:GYMS[i+1].level-2,habitat:v.habitat,gym:i+1})),
 ...connectingRoutes.map(r=>({...r,name:'Route '+r.number+' · '+r.name,sub:'Required connecting route · Wild companions Lv. '+r.level+'–'+(r.level+2)})),
 {name:'Forgotten Quarry',sub:'Old stone, warm wind, and a distant heartbeat',x:318,y:39,w:9,h:10,secret:true,level:30,habitat:'ridge'},
 {name:'Stillwater Hollow',sub:'An unmarked clearing beneath the frozen ridge',x:408,y:129,w:9,h:10,secret:true,level:40,habitat:'brook'},
 {name:'Nightglass Grove',sub:'The stars seem closer here',x:228,y:129,w:9,h:10,secret:true,level:46,habitat:'forest'}
];
const regionPeople=[
 {...PEOPLE[0],route:[[23,88],[25,88]],lines:()=>['Welcome to Willowbrook! This region is much bigger than the old commons. Use the Region map button if you lose your way.','Head north on Route 1, follow the winding trail through Whisperwood, and you will reach Fernwick. Flora waits inside the Fern Gym.']},
 {...PEOPLE[1],name:'Kit',role:'Research assistant',route:[[28,86],[30,86]],lines:()=>['Professor Mina is in the blue-roofed laboratory just north of me. Walk onto the doorway and talk to her to choose your first partner!','Route 1 has gentle wild creatures. Route 2 and Route 3 make a longer loop back to Fernwick, with different companions to discover.']},
 {...PEOPLE[2],route:[[21,21],[23,21]],lines:()=>['Welcome to Fernwick! Flora is inside the green-roofed gym in the northeast of town. Orin lives in the house south of town.','Two connecting routes stand between each pair of gym villages. Start east through Amber Meadow and Cinder Crossing to reach Emberwick. The world map lists the whole journey.']},
 {...PEOPLE[3],route:[[70,84],[72,84]],lines:()=>['I walked all the way here from Willowbrook. The bridge over the brook is my favorite place to stop.','Keep east for Route 3, then follow the road north and west to Fernwick. It is a long way, so bring a healthy team.']},
 {...PEOPLE[4],route:[[23,73],[25,73]],lines:()=>['The Rest Houses are open in both towns. Step onto a building door to go inside.','You can also use Heal team on the sidebar any time between battles. The forest can be a long walk!']},
 {...PEOPLE[5],route:[[82,48],[84,48]],lines:()=>['Sunridge is perfect for training. I am looking for Spark and Stone creatures along this route.','There are two ways to Fernwick: the forest shortcut, or this long eastern loop. Both lead to the same first gym.']},
 {name:'Wren',role:'Forest ranger',shirt:'#849865',hair:'#69513c',skin:'#c89a75',route:[[16,42],[18,42]],lines:()=>['Whisperwood can feel like a maze. Follow the tan trail: west, north, east, north, and west again.','The tree walls are thick, but every trail connects. Check the map to see where you are. There is a supply pack just off the northern path.']},
 ...journeyVillages.slice(1).map((v,i)=>({name:['Rey','Coral','Petra','Watt','Holly','Lumen','Astra'][i],role:v.name+' resident',shirt:['#c69a72','#83afbb','#a98fba'][i%3],hair:'#685644',skin:'#d8ae89',route:[[v.x+2,v.y+2],[v.x+3,v.y+2]],lines:()=>['Welcome to '+v.name+'! Our neighbors have stories and side quests. Visit the home southwest of the gym.','Our gym leader is much stronger now. Train a full team, watch type matchups, and let your companions evolve. The Grove Dex lists evolution levels.']}))
];
const regionItems=[
 {id:'route1-orbs',x:27,y:64,name:'Trail supply pack',orbs:3,potions:1},
 {id:'forest-pack',x:36,y:33,name:'Ranger supply pack',orbs:2,potions:3},
 {id:'brook-pack',x:72,y:89,name:'Brookside supply pack',orbs:4,potions:2}
];
const interiorPeople={
 home:{name:'Mom',role:'Your biggest supporter',shirt:'#bb9cba',hair:'#614b43',skin:'#deb28c',route:[[15,7]],lines:()=>state.badges===8?['My champion! I am so proud of you and all your companions. This will always be your home.','Eight badges, so many adventures, and still my wonderful child. Come visit whenever you like!']:!state.starterReceived?['Your big adventure starts today! Visit Professor Mina in the blue-roofed laboratory northeast of here.','She has three wonderful partners waiting for you. I cannot wait to hear which one you choose!']:['Your partner looks happy to be traveling with you. You can always come home when you need a break.','I believe in you. When you have earned all eight badges, come home and show me!']},
 lab:{name:'Professor Mina',role:'Grove creature professor',shirt:'#e9e4c8',hair:'#4c455b',skin:'#b67f60',route:[[15,7]],lines:()=>['The Grove Dex records creatures you have seen and caught, including their evolution levels. All ordinary species can evolve; legendaries keep their legendary forms. Extra catches go into Storage boxes; open them to store and swap your team.','Legendary guardians appear as stars on your map after four, six, and eight badges. Follow their southern trails, stand near a guardian, and press E to challenge it. Great Balls work especially well after weakening them!']},
 rest:{...PEOPLE[4],route:[[15,7]],lines:()=>['Welcome! Your team is now fully rested, and your basic supplies have been replenished.','Travel safely. The exit is the little mat at the bottom of the room.']}
};
function paintRegion(x,y,w,h,tile){
 for(let row=y;row<y+h;row++)for(let col=x;col<x+w;col++)if(regionTiles[row]&&col>=0&&col<REGION_WIDTH)regionTiles[row][col]=tile;
}
function regionTrail(x1,y1,x2,y2,width=3,tile='path'){
 const half=Math.floor(width/2);
 if(x1===x2)paintRegion(x1-half,Math.min(y1,y2),width,Math.abs(y2-y1)+1,tile);
 else if(y1===y2)paintRegion(Math.min(x1,x2),y1-half,Math.abs(x2-x1)+1,width,tile);
 else throw new Error('Region trails must be horizontal or vertical.');
}
function createRegion(){
 for(const z of regionZones.slice(0,7))if(z.name!=='Whisperwood Forest')paintRegion(z.x,z.y,z.w,z.h,'lawn');
 regionTrail(24,95,24,54,3);regionTrail(14,86,37,86);regionTrail(14,94,35,94);
 regionTrail(24,86,85,86);regionTrail(84,86,84,19);regionTrail(24,19,84,19);
 paintRegion(40,80,42,4,'grass');paintRegion(42,89,34,3,'grass');
 paintRegion(78,29,4,43,'grass');paintRegion(87,29,4,43,'grass');paintRegion(47,14,25,3,'grass');
 paintRegion(21,60,3,12,'grass');paintRegion(26,59,4,12,'grass');
 paintRegion(59,78,6,15,'water');paintRegion(59,85,6,3,'bridge');
 paintRegion(10,27,33,28,'tree');
 regionTrail(24,56,24,49);regionTrail(15,49,24,49);regionTrail(15,41,15,49);
 regionTrail(15,41,33,41);regionTrail(33,32,33,41);regionTrail(24,32,33,32);regionTrail(24,23,24,32);
 paintRegion(22,46,6,3,'grass');paintRegion(12,43,3,4,'grass');paintRegion(28,38,4,3,'grass');
 paintRegion(30,30,8,4,'grass');paintRegion(22,34,4,3,'grass');
 regionTrail(24,35,24,32);regionTrail(33,33,36,33,1);
 regionTrail(16,19,37,19);regionTrail(24,10,24,24);regionTrail(24,13,29,13);
 paintRegion(13,8,7,4,'flowers');paintRegion(32,14,6,3,'flowers');
 paintRegion(13,78,5,3,'flowers');paintRegion(30,91,6,5,'flowers');
 for(const b of regionBuildings){
  regionTrail(b.x+2,b.y+4,b.x+2,b.y+6,3);
  for(let y=b.y;y<b.y+4;y++)for(let x=b.x;x<b.x+5;x++)regionTiles[y][x]='building';
  regionTiles[b.y+3][b.x+2]='door';
 }
 // Connect each doorstep to the town's central road.
 regionTrail(17,87,24,87);regionTrail(31,85,31,86);regionTrail(17,95,24,95);
 regionTrail(17,20,24,20);regionTrail(29,14,29,19);regionTrail(34,24,24,24);
 regionTrail(15,13,24,13);regionTrail(32,95,32,96);
 createExpandedJourneys();
 // Reapply footprints last so road and clearing generation never cuts through a building.
 for(const b of regionBuildings){for(let y=b.y;y<b.y+4;y++)for(let x=b.x;x<b.x+5;x++)regionTiles[y][x]='building';regionTiles[b.y+3][b.x+2]='door'}
}
createRegion();
function regionTile(x,y){return regionTiles[y]?.[x]||'tree'}
function validRegionSave(s){
 if(!validAdventureSave(s))return false;
 if(s.regionVersion===undefined)return s.x>=1&&s.x<=28&&s.y>=2&&s.y<=17;
 if(s.regionVersion!==1||!['region','interior','commons'].includes(s.scene))return false;
 if(s.collected!==undefined&&(!Array.isArray(s.collected)||!s.collected.every(id=>typeof id==='string'&&regionItems.some(item=>item.id===id))))return false;
 if(s.scene==='commons')return s.x>=1&&s.x<=28&&s.y>=2&&s.y<=17;
 if(s.scene==='interior')return regionBuildings.some(b=>b.id===s.inside)&&s.x>=6&&s.x<=23&&s.y>=3&&s.y<=17;
 return s.x>=0&&s.x<REGION_WIDTH&&s.y>=0&&s.y<REGION_HEIGHT;
}
function regionBlocked(x,y){
 if(state.scene==='interior')return interiorBlocked(x,y);
 return ['tree','water','building'].includes(regionTile(x,y));
}
function changeScene(scene,x,y,inside){
 held.clear();state.scene=scene;state.regionVersion=1;state.x=x;state.y=y;
 if(inside)state.inside=inside;else delete state.inside;
 visualX=x*32;visualY=y*32;effect=null;save();renderUI();canvas.focus();
}
function respawnRegion(){
 if(state.scene==='commons'){state.x=15;state.y=10;return}
 state.scene='region';state.x=24;state.y=86;delete state.inside;visualX=768;visualY=2752;
}
function regionZone(x=state.x,y=state.y){return regionZones.find(z=>x>=z.x&&x<z.x+z.w&&y>=z.y&&y<z.y+z.h)||regionZones[0]}
function currentBuilding(){return regionBuildings.find(b=>b.id===state.inside)}
function roomPerson(){
 const b=currentBuilding();if(!b)return null;
 if(b.resident)return {...residents.find(r=>r.id===b.resident),route:[[15,7]]};
 return b.kind==='gym'?{...LEADERS[b.gym],route:[[15,7]]}:b.kind==='shop'?{name:'Mira',role:'Grove Mart shopkeeper',shirt:'#82a9bb',hair:'#7d6858',skin:'#dfb78e',route:[[15,7]]}:b.kind==='league'?{name:'Ellis',role:'League shuttle conductor',shirt:'#9992b5',hair:'#52606c',skin:'#d8ac83',route:[[15,7]],lines:()=>['Nova awaits in Starfall, on Route 10! Cross Comet Fields and Aurora Approach west from Duskhollow for the final badge.','This optional shuttle visits the old League district. Use the sign on the right to depart after seven badges; the south gate there returns to Fernwick.']}:interiorPeople[b.kind];
}
function updateRegionUI(){
 if(state.scene==='commons'){
  $('area').textContent='Grove League District';$('area-sub').textContent='Astral Gym moved to Route 10 · South gate: E to return';
 }
 if(state.scene!=='commons'){
  const b=currentBuilding(),z=regionZone();
  $('area').textContent=state.scene==='interior'?(b?.name||'Inside'):z.name;
  $('area-sub').textContent=state.scene==='interior'?'E to talk · Bottom doorway to go outside':z.sub;
 }
 if(!state.team.length){
  $('quest-title').textContent='YOUR FIRST PARTNER';
  $('quest').textContent='Visit Professor Mina in Willowbrook. Her blue-roofed lab is northeast of the starting square. Enter its doorway, walk up to the professor, and press E to choose a partner.';
  return;
 }
 $('quest-title').textContent='YOUR NEXT DESTINATION';
 const next=state.badges,v=journeyVillages[Math.min(7,next)],pair=connectingRoutes.slice(Math.max(0,next-1)*2,Math.max(0,next-1)*2+2);
 $('quest').textContent=next===0?'First badge: train for Flora’s Lv. 12–14 team in Fernwick. Visit Orin’s house south of town for a fishing-rod quest.':next<8?`Next: ${GYMS[next].name} Gym in ${v.name} · Lv. ${GYMS[next].level}–${Math.min(50,GYMS[next].level+GYMS[next].species.length-1)}. Travel Routes ${pair.map(r=>r.number).join(' and ')}. Train, evolve your companions, and visit homes for side quests.`:!state.homecomingSeen?'All eight badges! Return to Willowbrook, your starting village. Mom is waiting to welcome her champion home.':'Grove champion! Explore all 24 routes, finish village stories, and hunt three hidden legendaries.';
}
function moveRegion(dx,dy){
 const x=state.x+dx,y=state.y+dy;
 if(!state.starterReceived&&state.scene==='region'){
  const z=regionZones[0];
  if(x<z.x||x>=z.x+z.w||y<z.y||y>=z.y+z.h){toast('Choose your first partner at Professor Mina\'s laboratory before leaving Willowbrook.');return}
 }
 if(regionBlocked(x,y))return;
 const previous=regionZone().name;state.x=x;state.y=y;walkFrame++;
 const tile=state.scene==='region'?regionTile(x,y):'floor';
 audio.play(tile==='grass'?'grass':'step');
 if(state.scene==='interior'&&y===17&&x>=14&&x<=16){leaveBuilding();return}
 if(state.scene==='region'&&tile==='door'){
  const b=regionBuildings.find(b=>x===b.x+2&&y===b.y+3);if(b){enterBuilding(b);return}
 }
 save();updateRegionUI();
 if(state.scene==='region'&&previous!==regionZone().name)toast(regionZone().name);
 if(momHomecoming())return;
 if(!state.team.length)return;
 state.steps=(state.steps||0)+1;
 if(state.scene==='region'&&tryTrainerChallenge())return;
 if(tile==='grass'&&tryLegendaryEncounter())return;
 if(tile==='grass'&&Math.random()<.12&&state.team.some(m=>m.hp>0)){
  const zone=regionZone(),z=zone.name,forest=z.includes('Forest'),route3=z.includes('Route 3'),pool=encounterPool(zone.habitat||(route3?'ridge':forest?'forest':z.includes('Route 2')?'brook':'meadow'));
  const species=pool[Math.floor(Math.random()*pool.length)],level=Math.min(50,(zone.level||(route3?8:forest?7:z.includes('Route 2')?5:4))+Math.floor(Math.random()*3));
  beginBattle([makeMon(species,level)],null);
 }
}
function enterBuilding(b){
 audio.play('switch');changeScene('interior',15,15,b.id);
 if(b.kind==='rest'&&state.team.length){heal();toast('Welcome! Your team and supplies have been restored.')}
 else toast(b.kind==='gym'?b.name+' · '+GYMS[b.gym].leader+' waits at the north end.':b.kind==='shop'?'Grove Mart · Speak to Mira at the counter.':b.name+' · Walk to the bottom mat to leave.');
}
function leaveBuilding(){
 const b=currentBuilding();if(!b){respawnRegion();save();return}
 audio.play('switch');changeScene('region',b.x+2,b.y+4);
 momHomecoming();
}
function regionNotice(title,text,button='Got it'){
 held.clear();$('modal-content').innerHTML='<div class="eyebrow">GROVE REGION FIELD NOTES</div><h1 id="notice-title"></h1><p id="notice-body"></p><button class="btn primary" id="notice-close"></button>';
 $('notice-title').textContent=title;$('notice-body').textContent=text;$('notice-close').textContent=button;
 $('notice-close').onclick=()=>{$('modal').classList.add('hidden');canvas.focus()};$('modal').classList.remove('hidden');$('notice-close').focus();
}
function interactRegion(){
 if(state.scene==='interior'){
  const b=currentBuilding();
  if(b?.kind==='league'&&state.x>=18&&state.y<=11){
   if(state.badges<7){regionNotice('Shuttle not ready','Collect seven badges to visit the old League district. For the final badge, cross Comet Fields and Aurora Approach from Duskhollow to Nova’s Astral Gym in Starfall.');return}
   changeScene('commons',15,16);toast('Welcome to the League district! South gate + E returns to Fernwick.');return;
  }
  const p=roomPerson();
  if(p&&Math.hypot(state.x-15,state.y-7)<=2.2){if(b.id==='lab')showProfessor();else if(b.id==='home'){if(!momHomecoming())talk(p)}else if(b.resident)showResident(residents.find(r=>r.id===b.resident));else if(b.kind==='shop')showShop();else talk(p);return}
  if(state.y>=15){leaveBuilding();return}
  toast(b?.kind==='gym'?'Walk to '+GYMS[b.gym].leader+' at the north end and press E.':b?.kind==='league'?'Talk to Ellis, or use the shuttle sign at the right.':'Walk to the person at the counter and press E.');return;
 }
 if(tryLegendaryEncounter(true))return;
 const near=[...regionPeople,...routeTrainers].map(person=>({person,pos:personPosition(person)})).filter(({pos})=>Math.hypot(pos.x-state.x,pos.y-state.y)<=1.8).sort((a,b)=>Math.hypot(a.pos.x-state.x,a.pos.y-state.y)-Math.hypot(b.pos.x-state.x,b.pos.y-state.y));
 if(near[0]?.person.trainerId){offerTrainerBattle(near[0].person);return}
 if(near.length){talk(near[0].person);return}
 const item=regionItems.find(item=>!state.collected?.includes(item.id)&&Math.hypot(state.x-item.x,state.y-item.y)<=1.5);
 if(item){state.collected??=[];state.collected.push(item.id);state.orbs+=item.orbs;state.potions+=item.potions;audio.play('caught');save();renderUI();toast(`${item.name}: +${item.orbs} capture orbs, +${item.potions} potions!`);return}
 const b=regionBuildings.find(b=>state.x===b.x+2&&Math.abs(state.y-(b.y+3))<=1);
 if(b){enterBuilding(b);return}
 const sign=regionSigns.find(s=>Math.hypot(s.x-state.x,s.y-state.y)<=1.5);
 if(sign){regionNotice(sign.title,sign.text);return}
 toast('E: talk, read signs, collect packs. Step onto a doorway to enter. Region map shows the paths.');
}
const regionSigns=[
 {x:26,y:77,title:'Route 1 · Sprout Path',text:'NORTH: Whisperwood Forest → Fernwick → Fern Gym. SOUTH: Willowbrook. Stay on the tan trail to avoid wild encounters.'},
 {x:26,y:54,title:'Whisperwood Forest',text:'Follow the winding trail west, north, east, north, then west toward Fernwick. Explore the clearings for wild creatures and supplies.'},
 {x:27,y:25,title:'Welcome to Fernwick',text:'The Fern Gym is in the northeast. The Rest House is in the west. The League shuttle is in the southeast.'},
 {x:40,y:88,title:'Route 2 · Brookside',text:'WEST: Willowbrook. EAST: bridge to Route 3. Route 3 leads north, then west, all the way to Fernwick.'},
 {x:86,y:76,title:'Route 3 · Sunridge',text:'NORTH: Fernwick via the scenic ridge. SOUTH AND WEST: Willowbrook via Route 2. At the northern junction, continue east through Routes 11 and 12 to Emberwick and the Ember Gym.'},
 ...connectingRoutes.map(r=>({x:r.from[0],y:r.from[1]+2,title:'Route '+r.number+' · '+r.name,text:'Follow the tan road through this route. Wild companions here train around level '+r.level+'. There are two connecting routes between every gym village. Check the world map with M.'})),
 ...journeyVillages.slice(1).map(v=>({x:v.x+3,y:v.y+2,title:v.name,text:'Welcome! The gym is north, the shop and Rest House are beside it, and a resident’s home is southwest. Visit homes for side quests. Fish beside the village pond with F once you have earned Orin’s rod.'}))
];
function drawRegionPlayer(time){
 const p={name:'You',shirt:'#d9ad64',hair:'#b95f54',skin:'#ebcda0'};
 drawPerson(ctx,p,visualX,visualY,time,held.size>0);
 rect(ctx,visualX-10,visualY-24,22,6,'#b95f54');rect(ctx,visualX-5,visualY-28,14,4,'#dc8568');
 rect(ctx,visualX-10,visualY-5,7,13,'#677f79');
 if(state.team.length)creature(ctx,state.team[0].species,visualX-24,visualY+12+(reducedMotion.matches?0:Math.sin(time/230)*2),.8);
 if(effect?.kind==='heal'){const p=Math.min(1,(time-effect.start)/effect.duration);for(let i=0;i<9;i++)sparkle(ctx,visualX+Math.sin(i*2.4)*30,visualY-p*60+i%3*12,3,'#efffc5')}
}
function drawRegionHouse(b){
 const x=(b.x+2)*32,y=(b.y+3)*32,w=148;
 rect(ctx,x-70,y+8,w+10,18,'#284d3d33');rect(ctx,x-69,y-65,138,77,'#e5d8ad');rect(ctx,x-69,y-14,138,26,'#c4bf94');
 rect(ctx,x-76,y-91,152,29,'#3e5950');rect(ctx,x-71,y-103,142,30,b.color);rect(ctx,x-59,y-112,118,12,b.color);rect(ctx,x-57,y-110,114,3,'#fff3c744');
 for(let i=0;i<11;i++){rect(ctx,x-67+i*13,y-100,1,24,'#173e3c22');rect(ctx,x-64+i*13,y-97,8,2,'#fff4cc22')}
 rect(ctx,x-18,y-23,36,36,'#567563');rect(ctx,x-13,y-18,26,32,'#294b49');rect(ctx,x-9,y-14,18,13,'#90b9a4');rect(ctx,x+7,y+3,3,3,'#f1d492');
 for(const offset of [-46,46]){rect(ctx,x+offset-12,y-46,24,27,'#54766b');rect(ctx,x+offset-9,y-43,18,21,'#8ebbb0');rect(ctx,x+offset-9,y-43,18,4,'#d7e6bf');rect(ctx,x+offset-1,y-43,2,21,'#f0e8bf');rect(ctx,x+offset-9,y-33,18,2,'#f0e8bf');rect(ctx,x+offset-15,y-16,30,4,'#82906b')}
 rect(ctx,x-55,y-67,110,16,'#355348');ctx.fillStyle='#f0e3b9';ctx.font='bold 11px monospace';ctx.textAlign='center';ctx.fillText(b.name.toUpperCase(),x,y-55);
 if(b.kind==='gym'&&state.badges===b.gym)sparkle(ctx,x,y-129+(reducedMotion.matches?0:Math.sin(performance.now()/230)*3),6,'#ffe0a0');
}
function drawRegionTile(tile,x,y,time){
 const px=x*32-16,py=y*32-16;
 const frost=x>=380&&y>=66,shadow=x>=308&&x<366&&y>=98,astral=x>=218&&x<308&&y>=98;
 rect(ctx,px,py,32,32,tile==='path'?(astral?'#d1c4c9':frost?'#dbded0':shadow?'#b1b38f':'#d8ca99'):tile==='grass'?(astral?'#899a9b':frost?'#abc8b7':shadow?'#71896e':'#7ca569'):tile==='water'?'#609b9a':tile==='bridge'?'#a58b61':astral?'#9eafa5':frost?'#c9d5c1':shadow?'#82977a':'#94b778');
 if(tile==='tree'){tree(px,py-7,(x+y)%3===0);return}
 if(tile==='building'||tile==='door')return;
 const hash=(x*17+y*31)%13;
 if(tile==='path'){if(hash<5)rect(ctx,px+5+hash*3,py+11,3,1,'#a59e733f');if(hash>8)rect(ctx,px+8,py+24,7,1,'#f2e5b555')}
 else if(tile==='water'){
  const drift=reducedMotion.matches?0:Math.sin(time/800+x)*3;rect(ctx,px+5+drift,py+9,14,2,'#b4d5bd');rect(ctx,px+15-drift,py+23,10,2,'#91c5b1');
 }else if(tile==='bridge'){rect(ctx,px,py+4,32,2,'#715c45');rect(ctx,px,py+19,32,2,'#715c45');rect(ctx,px,py,3,32,'#ddc298')}
 else if(tile==='grass'){
  const sway=reducedMotion.matches?0:Math.round(Math.sin(time/600+x+y));
  for(let i=0;i<4;i++){const gx=px+4+i*7,gy=py+10+(i%2)*12;rect(ctx,gx,gy,2,8,'#447b51');rect(ctx,gx-2+sway,gy-2,2,5,'#adc77b');rect(ctx,gx+2+sway,gy,2,4,'#578857')}
 }else{
  if(hash<4){rect(ctx,px+8,py+14,3,2,'#afc889');rect(ctx,px+18,py+22,2,3,'#749f64')}
  if(tile==='flowers'||hash===7){const color=['#f2d69d','#dfaaa6','#e7e2bb'][(x+y)%3];rect(ctx,px+10,py+11,2,9,'#578655');rect(ctx,px+7,py+8,8,5,color);rect(ctx,px+10,py+9,2,2,'#a8844f')}
 }
}
function drawInterior(time){
 drawAdventureInterior(time);
}
function drawRegion(time){
 if(state.scene==='interior'){drawInterior(time);return}
 const camX=Math.max(0,Math.min(REGION_WIDTH*32-960,visualX-480)),camY=Math.max(0,Math.min(REGION_HEIGHT*32-600,visualY-300));
 ctx.fillStyle='#94b778';ctx.fillRect(0,0,960,600);ctx.save();ctx.translate(-Math.round(camX),-Math.round(camY));
 const left=Math.max(0,Math.floor(camX/32)-2),top=Math.max(0,Math.floor(camY/32)-2);
 for(let y=top;y<Math.min(REGION_HEIGHT,top+24);y++)for(let x=left;x<Math.min(REGION_WIDTH,left+35);x++)drawRegionTile(regionTile(x,y),x,y,time);
 for(const b of regionBuildings)if(Math.abs((b.x+2)*32-(camX+480))<620&&Math.abs((b.y+2)*32-(camY+300))<440)drawRegionHouse(b);
 for(const sign of regionSigns){const x=sign.x*32,y=sign.y*32;rect(ctx,x-2,y-6,4,22,'#83694e');rect(ctx,x-13,y-18,27,17,'#876f50');rect(ctx,x-11,y-16,23,12,'#dcc797');rect(ctx,x-6,y-13,13,2,'#92794f');rect(ctx,x-6,y-9,9,2,'#92794f')}
 for(const item of regionItems)if(!state.collected?.includes(item.id)){const x=item.x*32,y=item.y*32;rect(ctx,x-8,y-8,16,17,'#826443');rect(ctx,x-6,y-11,12,17,'#ebc17b');rect(ctx,x-3,y-7,6,7,'#ad8055');sparkle(ctx,x+10,y-14,3,'#ffe5ac')}
 const actors=[...regionPeople,...routeTrainers].map(person=>({person,pos:personPosition(person,time)}));
 actors.push({player:true,pos:{y:visualY/32}});
 actors.sort((a,b)=>a.pos.y-b.pos.y);
 for(const actor of actors){if(actor.player){drawRegionPlayer(time);continue}const {person,pos}=actor;if(Math.abs(pos.x*32-(camX+480))>540||Math.abs(pos.y*32-(camY+300))>370)continue;drawPerson(ctx,person,pos.x*32,pos.y*32,time,pos.walking);if(state.team.length&&Math.hypot(pos.x-state.x,pos.y-state.y)<=1.8){rect(ctx,pos.x*32-8,pos.y*32-48,18,15,'#214235');ctx.textAlign='center';ctx.font='10px monospace';ctx.fillStyle='#ffe5ae';ctx.fillText('E',pos.x*32+1,pos.y*32-37)}}
 ctx.restore();
 drawAdventureHints(time,camX,camY);
 if(regionZone().name.includes('Forest')){ctx.fillStyle='#173f3722';ctx.fillRect(0,0,960,600)}
 if(!reducedMotion.matches)for(let i=0;i<12;i++){const x=(time*.012+i*127)%960,y=(i*73+Math.sin(time/1300+i)*15)%600;rect(ctx,x,y,3,2,'#e4e6b055')}
 drawCelebration(ctx,time);
}
function showRegionMap(){
 if(evolving||battle||!$('intro').classList.contains('hidden')||!$('modal').classList.contains('hidden'))return;
 held.clear();$('modal-content').innerHTML='<div class="eyebrow">GROVE REGION · 24 ROUTES · EIGHT BADGES</div><h1 style="font-size:26px;margin:8px 0">The road to champion</h1><canvas id="region-chart" width="880" height="320" style="width:100%;height:auto!important;margin:0 auto 10px;border:2px solid #78966b" aria-label="World map: 24 routes, eight gym villages, and two required connecting routes between every gym."></canvas><p style="font-size:9px;margin-bottom:10px">Fernwick → 11/12 → Emberwick → 13/14 → Tidehaven<br>15/16 → Quarryford → 17/18 → Copperton<br>19/20 → Frostmere → 21/22 → Duskhollow → 23/24 → Starfall<br><span style="color:#f4ce79">Gold: you · Numbered squares: gyms · Blue: shops · Pink: homes</span></p><button class="btn primary" id="chart-close">Back to exploring</button>';
 const c=$('region-chart').getContext('2d');c.imageSmoothingEnabled=false;
 const colors={tree:'#355b47',lawn:'#94b778',path:'#e0c991',grass:'#69925c',water:'#6ba8ab',bridge:'#bfa272',flowers:'#c1c58b',building:'#cb8c79',door:'#e5d7aa'};
 for(let y=0;y<REGION_HEIGHT;y++)for(let x=0;x<REGION_WIDTH;x++)rect(c,x*2,y*2,2,2,colors[regionTile(x,y)]);
 for(const building of regionBuildings)if(building.kind==='gym'||building.kind==='shop'||building.resident){const x=(building.x+2)*2,y=(building.y+2)*2;rect(c,x-5,y-6,13,13,building.kind==='gym'?'#cfda94':building.resident?'#dda7bc':'#8dc4d1');if(building.kind==='gym'){c.font='bold 10px monospace';c.textAlign='center';c.fillStyle='#28483e';c.fillText(String(building.gym+1),x+1,y+4)}}
 c.font='bold 9px monospace';c.textAlign='left';
 for(const [label,x,y] of [['FERNWICK',7,4],['FOREST',11,42],['WILLOWBROOK',8,102],['R2',50,98],['R3',88,62],...journeyVillages.slice(1).map(v=>[v.name.toUpperCase(),v.x-10,v.y-15]),...connectingRoutes.map(r=>['R'+r.number,r.x+2,r.y-2])]){c.fillStyle='#173b33';c.fillText(label,x*2+1,y*2+1);c.fillStyle='#f1e5b6';c.fillText(label,x*2,y*2)}
 for(const l of LEGENDARIES)if(state.badges>=l.badges&&!ownedCreatures().some(m=>m.species===l.species)){
  sparkle(c,l.x*2,l.y*2,6,l.accent);c.font='bold 10px monospace';c.fillStyle=l.accent;c.fillText(l.name.toUpperCase(),l.x*2-26,l.y*2+20);
 }
 const {x:px,y:py,label}=worldMapPosition();
 rect(c,px*2-4,py*2-4,10,10,'#183f38');rect(c,px*2-2,py*2-2,6,6,'#ffe19b');
 const locationLabel=document.createElement('p');locationLabel.id='chart-location';locationLabel.style.cssText='font-size:10px;color:#f4ce79;margin:4px 0 10px';locationLabel.textContent='YOU ARE HERE: '+label;$('region-chart').after(locationLabel);
 const hunt=document.createElement('p');hunt.style.cssText='font-size:9px;margin:0 0 8px;color:#e8d3a4';hunt.textContent='Glowing stars: legendary guardians. Unlock at 4 / 6 / 8 badges. Stand nearby and press E to challenge.';locationLabel.after(hunt);
 $('chart-close').onclick=()=>{$('modal').classList.add('hidden');canvas.focus()};$('modal').classList.remove('hidden');$('chart-close').focus();
}
$('region-map').onclick=showRegionMap;
