'use strict';

const journeyVillages=[
 {name:'Fernwick',x:29,y:19,habitat:'forest'},
 {name:'Emberwick',x:140,y:20,habitat:'meadow'},
 {name:'Tidehaven',x:230,y:20,habitat:'brook'},
 {name:'Quarryford',x:320,y:20,habitat:'ridge'},
 {name:'Copperton',x:410,y:20,habitat:'ridge'},
 {name:'Frostmere',x:410,y:110,habitat:'brook'},
 {name:'Duskhollow',x:320,y:110,habitat:'forest'},
 {name:'Starfall',x:230,y:110,habitat:'starlight'}
];
const connectingRoutes=[
 {number:11,name:'Amber Meadow',x:93,y:14,w:18,h:13,from:[93,20],to:[110,20],habitat:'meadow',level:12},
 {number:12,name:'Cinder Crossing',x:111,y:14,w:17,h:13,from:[111,20],to:[127,20],habitat:'ridge',level:14},
 {number:13,name:'Reedbank Trail',x:153,y:14,w:33,h:13,from:[153,20],to:[185,20],habitat:'meadow',level:18},
 {number:14,name:'Rainwater Reach',x:186,y:14,w:32,h:13,from:[186,20],to:[217,20],habitat:'brook',level:20},
 {number:15,name:'Shale Walk',x:243,y:14,w:33,h:13,from:[243,20],to:[275,20],habitat:'ridge',level:24},
 {number:16,name:'Echo Canyon',x:276,y:14,w:32,h:13,from:[276,20],to:[307,20],habitat:'ridge',level:26},
 {number:17,name:'Copperwood',x:333,y:14,w:33,h:13,from:[333,20],to:[365,20],habitat:'forest',level:29},
 {number:18,name:'Thunder Span',x:366,y:14,w:32,h:13,from:[366,20],to:[397,20],habitat:'ridge',level:31},
 {number:19,name:'Windchill Pass',x:404,y:33,w:13,h:33,from:[410,33],to:[410,65],habitat:'ridge',level:34},
 {number:20,name:'Snowmelt Trail',x:404,y:66,w:13,h:32,from:[410,66],to:[410,97],habitat:'brook',level:36},
 {number:21,name:'Moonpine Path',x:366,y:104,w:32,h:13,from:[397,110],to:[366,110],habitat:'brook',level:39},
 {number:22,name:'Lanternwood',x:333,y:104,w:33,h:13,from:[365,110],to:[333,110],habitat:'forest',level:41},
 {number:23,name:'Comet Fields',x:276,y:104,w:32,h:13,from:[307,110],to:[276,110],habitat:'starlight',level:44},
 {number:24,name:'Aurora Approach',x:243,y:104,w:33,h:13,from:[275,110],to:[243,110],habitat:'starlight',level:46}
];
const residents=[
 {id:'orin',name:'Orin',village:0,role:'Retired angler',shirt:'#7dacc0',hair:'#c9c3ab',skin:'#c79c76',quests:[
  {id:'orin-favorite',title:'An angler’s favorite',text:'My favorite companion is Drizzlet! Catch one in the meadow grass on Route 1. Trade me one for my fishing rod, and I will give it a happy home.',species:10,consume:true,reward:{fishingRod:true},rewardText:'Fishing rod · Fish beside water with F or Fish'},
  {id:'orin-fishing',title:'First real catch',text:'Use your new rod beside the brook on Route 2. Catch a Water creature while fishing and show it to me. You keep your catch!',fishing:true,reward:{greatBalls:5,coins:900},rewardText:'5 Great Balls + 900 coins'}
 ]},
 {id:'nella',name:'Nella',village:1,role:'Village gardener',shirt:'#99b878',hair:'#715242',skin:'#e0b48d',quests:[
  {id:'nella-budbun',title:'A garden companion',text:'Show me a Budbun from Route 1 or Amber Meadow. Its little paws are perfect for tending a garden. You keep your companion.',species:8,reward:{potions:5,coins:800},rewardText:'5 potions + 800 coins'},
  {id:'nella-growth',title:'Watch friendship bloom',text:'Raise any companion until it evolves, then show me an evolved form. A little patience can grow something wonderful.',evolved:true,reward:{greatBalls:6,coins:1400},rewardText:'6 Great Balls + 1,400 coins'}
 ]},
 {id:'tavi',name:'Tavi',village:2,role:'Waterside cook',shirt:'#81bac0',hair:'#525e68',skin:'#bc8b68',quests:[
  {id:'tavi-water',title:'A friend for the harbor',text:'Show me any Water companion. Fishing beside the village pond is a lovely way to find one. You keep your companion.',type:'Water',reward:{potions:6,coins:1000},rewardText:'6 potions + 1,000 coins'},
  {id:'tavi-angler',title:'Harbor fishing club',text:'Catch three creatures while fishing. There is no need to trade them away; just bring your fishing journal.',fishCount:3,reward:{greatBalls:8,coins:1800},rewardText:'8 Great Balls + 1,800 coins'}
 ]},
 {id:'bram',name:'Bram',village:3,role:'Stone sculptor',shirt:'#b39b7d',hair:'#776356',skin:'#d3a277',quests:[
  {id:'bram-stone',title:'Living inspiration',text:'Show me a Stone companion from Shale Walk or Echo Canyon. You keep it; I only need a little inspiration.',type:'Stone',reward:{coins:1800,potions:5},rewardText:'1,800 coins + 5 potions'},
  {id:'bram-badge',title:'Solid foundations',text:'Earn the Boulder badge and return. A sculptor appreciates someone who never gives up.',badges:4,reward:{greatBalls:10,coins:1800},rewardText:'10 Great Balls + 1,800 coins'}
 ]},
 {id:'ika',name:'Ika',village:4,role:'Clockwork tinkerer',shirt:'#d1b56c',hair:'#594f60',skin:'#e1b991',quests:[
  {id:'ika-spark',title:'A spark of inspiration',text:'Show me a Spark companion from Thunder Span. Your friend keeps its freedom; I will study how its electricity moves.',type:'Spark',reward:{coins:2200,potions:8},rewardText:'2,200 coins + 8 potions'},
  {id:'ika-growth',title:'Power beyond the ordinary',text:'Show me a final-stage evolved companion. The Grove Dex tells you the levels needed to evolve.',stage:2,reward:{greatBalls:12,coins:2500},rewardText:'12 Great Balls + 2,500 coins'}
 ]},
 {id:'miri',name:'Miri',village:5,role:'Mountain naturalist',shirt:'#a5c8cb',hair:'#c3b9aa',skin:'#a87962',quests:[
  {id:'miri-frost',title:'A winter companion',text:'Show me a Frost companion from Snowmelt Trail or Moonpine Path. You keep your friend.',type:'Frost',reward:{coins:2600,potions:10},rewardText:'2,600 coins + 10 potions'},
  {id:'miri-collection',title:'A living field guide',text:'Record 35 different species as seen in the Grove Dex. Every little discovery matters.',seen:35,reward:{greatBalls:15,coins:3000},rewardText:'15 Great Balls + 3,000 coins'}
 ]},
 {id:'sable',name:'Sable',village:6,role:'Lantern keeper',shirt:'#a492bc',hair:'#4e4a61',skin:'#d4a47f',quests:[
  {id:'sable-shade',title:'A friend in the dark',text:'Show me a Shade companion from Lanternwood. Even the quietest creatures deserve a friend.',type:'Shade',reward:{greatBalls:10,coins:3000},rewardText:'10 Great Balls + 3,000 coins'},
  {id:'sable-seven',title:'Light the champion’s road',text:'Earn seven badges, then come back before your final journey through Comet Fields and Aurora Approach.',badges:7,reward:{potions:15,coins:3500},rewardText:'15 potions + 3,500 coins'}
 ]},
 {id:'elio',name:'Elio',village:7,role:'Stargazer',shirt:'#ceabc3',hair:'#847094',skin:'#e3bb99',quests:[
  {id:'elio-star',title:'A star of your own',text:'Show me a Star companion from Comet Fields or Aurora Approach. You keep it, of course.',type:'Star',reward:{greatBalls:15,coins:4000},rewardText:'15 Great Balls + 4,000 coins'},
  {id:'elio-champion',title:'A legend comes home',text:'Earn all eight badges and come tell me your story. I saved something very special for our champion.',badges:8,reward:{masterBalls:1},rewardText:'1 Master Ball'}
 ]}
];
const allSideQuests=residents.flatMap(r=>r.quests);
const evolutionLines=[
 [0,'Bramblehart','Verdantitan','deer','dragon','#64aa71','#d8ef9d'],
 [1,'Blazemane','Pyrodrake','fox','dragon','#e77a4b','#ffe395'],
 [2,'Tiderover','Leviapaw','turtle','serpent','#59a6c2','#a5efdd'],
 [3,'Cragwarden','Terracrown','golem','golem','#a79d86','#e4cf84'],
 [4,'Stormhare','Thunderex','hare','dragon','#dfbe4c','#bcdbfa'],
 [5,'Frostcrest','Glacierhorn','deer','deer','#a0d7dc','#eee8ff'],
 [6,'Duskreaver','Nightsovereign','bat','dragon','#9681b8','#e8b8dc'],
 [7,'Astralynx','Cosmora','fox','deer','#d599bd','#ffe9a4']
];
function addEvolution(base,name,shape,color,accent,stage,level){
 const prior=SPECIES[base],id=SPECIES.length;
 SPECIES.push({...prior,name,shape,color,accent,pattern:stage+1,stage,evolvedFrom:base,hpBonus:stage===1?32:76,attackBonus:stage===1?1.2:1.42,size:stage===1?1.12:1.25,habitat:'evolution'});
 prior.evolution={species:id,level};return id;
}
for(const [base,first,last,shape1,shape2,color,accent] of evolutionLines){
 const middle=addEvolution(base,first,shape1,color,accent,1,12);
 addEvolution(middle,last,shape2,color,accent,2,28);
}
for(const [base,name,shape,color,accent] of [[8,'Bloomjack','deer','#83b95f','#f3d387'],[9,'Infernovix','dragon','#de7952','#ffe3a0'],[10,'Monsoonwing','bird','#64aebd','#e1f4b7'],[11,'Boulderstag','deer','#a79b7c','#f1d29a']])addEvolution(base,name,shape,color,accent,1,18);
const expandedEvolutions=`
Thunderbound|hare
Glacierose|flower
Velvortex|dragon
Wishphoenix|bird
Clovercrown|deer
Infernohawk|bird
Pondwarden|turtle
Cragcolossus|golem
Joltitan|beetle
Blizzardbun|hare
Duskvulpine|fox
Glimmerwing|bat
Maricanopy|jelly
Cindercoil|serpent
Tsunamiclaw|crab
Flintmane|fox
Thunderblossom|flower
Mintfortress|turtle
Hushoracle|owl
Twinkarion|fox
Petalwyrm|dragon
Mossmonolith|golem
Fernregent|deer
Sporelord|mushroom
Thornarmada|beetle
Glowwyrm|dragon
Lanternsage|owl
Brookbastion|turtle
Frostplume|bird
Umbravern|dragon
Moonknight|beetle
Lichenlord|deer
Bramblewing|bat
Hollowguardian|golem
Mycelestial|mushroom
Ashcrown|deer
Nectaroyal|flower
Needlelance|hare
Canopydrake|dragon
Cocoonreaper|bat
Acorncitadel|snail
Wispwarden|mushroom
Glacathedral|mushroom
Thistlehawk|bird
Emberorchid|flower
Stararchon|owl
Bubblelotus|flower
Reedleviathan|dragon
Coralregent|crab
Shellpalace|snail
Tidealbatross|bird
Sleetknight|beetle
Rimefortress|turtle
Pearlnebula|jelly
Siltitan|golem
Kelpwyrm|serpent
Tempestbound|hare
Mistphantom|jelly
Foamcrown|deer
Thermoforge|turtle
Frostempest|bird
Snoworacle|owl
Inkoverlord|crab
Opalwyrm|dragon
Driftwarden|golem
Shorecrusher|crab
Eelstrom|serpent
Lotusprout|flower
Sprayvulpine|fox
Glitterwyrm|dragon
Avalanshell|snail
Basalord|serpent
Quartzregina|deer
Cragcondor|bird
Obsidread|dragon
Volcavolt|hare
Magmacolossus|golem
Sunblossom|flower
Cometphoenix|bird
Auroracrown|deer
Teslareign|fox
Thundermaw|dragon
Ironbastion|beetle
Cobaltguard|turtle
Dustgarden|flower
Nightaugur|owl
Cindercrusher|crab
Boltsovereign|deer
Blizzardrake|dragon
Orbitress|turtle
Rubblefort|snail
Echoreaver|bat
Solregent|fox
Prismonolith|golem
Fulgurknight|beetle
Zenithcrown|deer
`.trim().split('\n');
expandedEvolutions.forEach((row,index)=>{
 const base=index+12,[name,shape]=row.split('|'),s=SPECIES[base];
 addEvolution(base,name,shape,s.color,s.accent,1,20+index%3*2);
});
habitatNames.evolution='Evolves through training · Not found in wild grass';
const hardGymTeams=[
 {level:12,species:[8,32,0]},
 {level:18,species:[9,17,4,1]},
 {level:24,species:[18,26,5,2]},
 {level:29,species:[19,11,3,4,3]},
 {level:34,species:[12,20,3,4,4]},
 {level:39,species:[13,29,5,2,6,5]},
 {level:44,species:[14,30,6,4,7,6]},
 {level:47,species:[15,31,7,4,6,7]}
];
hardGymTeams.forEach((team,i)=>Object.assign(GYMS[i],team));
Object.assign(LEGENDARIES[0],{x:322,y:43,pathY:20,rumor:'After four badges, follow the southern trail from Quarryford to Solvarion at (322, 43). Look for its star marker on the map. Stand nearby and press E to challenge it. Great Balls work especially well after weakening it.'});
Object.assign(LEGENDARIES[1],{x:412,y:133,pathY:110,rumor:'After six badges, follow the southern trail from Frostmere to Thaloryx at (412, 133). Look for its star marker on the map. Stand nearby and press E to challenge it. Great Balls work especially well after weakening it.'});
Object.assign(LEGENDARIES[2],{x:232,y:133,pathY:110,rumor:'After eight badges, follow the southern trail from Starfall to Noxastra at (232, 133). Look for its star marker on the map. Stand nearby and press E to challenge it. Great Balls work especially well after weakening it.'});
let evolving=false,evolutionVisual=null;
function trainedMon(species,level){
 while(SPECIES[species].evolution&&level>=SPECIES[species].evolution.level)species=SPECIES[species].evolution.species;
 return makeMon(species,Math.min(50,level));
}
function consumePowerGift(){
 if(location.hash!=='#power-gift')return;
 const roster=ownedCreatures(),gifts=[0,1,2].map(id=>{
  const gift=trainedMon(id,50),owned=roster.find(mon=>mon.species===gift.species);
  if(!owned)return gift;
  owned.level=50;owned.hp=maxHP(owned);return owned;
 });
 const others=roster.filter(mon=>!gifts.includes(mon));
 state.team=[...gifts,...others.slice(0,3)];state.reserve=others.slice(3);
 state.adventureStarted=true;state.starterReceived=true;state.hasDex=true;
 $('intro').classList.add('hidden');recordSeen(gifts);
 history.replaceState(null,'',location.href.split('#')[0]);
 toast(storageAvailable?'Gift received! Verdantitan, Pyrodrake, and Leviapaw joined your team at Lv. 50.':'Gift received! Browser storage is unavailable; keep this tab open to keep your companions.');
}
async function evolveCompanions(monsters=state.team){
 if(evolving)return;
 evolving=true;held.clear();
 try{
  for(const mon of monsters){
   while(SPECIES[mon.species].evolution&&mon.level>=SPECIES[mon.species].evolution.level){
    const from=mon.species,oldHP=maxHP(mon),next=SPECIES[from].evolution.species;
    mon.species=next;mon.hp=mon.hp===0?0:Math.min(maxHP(mon),Math.ceil(mon.hp/oldHP*maxHP(mon)));
    recordSeen([mon]);renderUI();
    evolutionVisual={from,to:next,start:performance.now()};
    $('evolution-text').textContent=SPECIES[from].name+' evolved into '+SPECIES[next].name+'! Bigger, stronger, and ready for adventure.';
    $('evolution').classList.remove('hidden');audio.play('caught');
    await wait(reducedMotion.matches?700:2100);
   }
  }
 }finally{evolutionVisual=null;$('evolution').classList.add('hidden');evolving=false;save()}
}
function drawEvolution(time){
 if(!evolutionVisual)return;
 const c=$('evolution-art').getContext('2d'),p=Math.min(1,(time-evolutionVisual.start)/1800);
 c.imageSmoothingEnabled=false;c.clearRect(0,0,480,240);
 const next=SPECIES[evolutionVisual.to],color=next.accent;
 for(let i=0;i<20;i++){const a=i*Math.PI/10+(reducedMotion.matches?0:time/800),r=65+(i%3)*15;sparkle(c,240+Math.cos(a)*r,132+Math.sin(a)*r,2+i%3,color)}
 c.save();if(!reducedMotion.matches&&p<.6)c.filter='brightness('+(1+p*5)+')';
 creature(c,p<.5?evolutionVisual.from:evolutionVisual.to,240,163,3);c.restore();
 c.textAlign='center';c.fillStyle=color;c.font='bold 14px monospace';c.fillText('A NEW CHAPTER OF FRIENDSHIP',240,27);
}
function createExpandedJourneys(){
 regionTrail(84,20,140,20);
 for(let i=1;i<journeyVillages.length;i++){
  const v=journeyVillages[i];paintRegion(v.x-12,v.y-12,25,25,'lawn');
  regionTrail(v.x-13,v.y,v.x+13,v.y);
  if(i===4||i===5)regionTrail(v.x,v.y-13,v.x,v.y+13);
  paintRegion(v.x+5,v.y+5,5,4,'water');
  paintRegion(v.x-10,v.y+7,5,3,'flowers');
 }
 for(const r of connectingRoutes){
  paintRegion(r.x,r.y,r.w,r.h,'lawn');
  const vertical=r.from[0]===r.to[0];
  if(vertical){paintRegion(r.x+1,r.y+2,3,r.h-4,'grass');paintRegion(r.x+9,r.y+2,3,r.h-4,'grass')}
  else{paintRegion(r.x+2,r.y+1,r.w-4,3,'grass');paintRegion(r.x+2,r.y+9,r.w-4,3,'grass')}
  regionTrail(...r.from,...r.to);
 }
 regionTrail(410,20,410,110);
 regionTrail(230,110,410,110);
 for(const r of connectingRoutes){
  if([14,18,20,21].includes(r.number)){
   const vertical=r.from[0]===r.to[0],x=Math.floor(r.x+r.w/2),y=Math.floor(r.y+r.h/2);
   if(vertical){paintRegion(r.x,y-1,r.w,3,'water');paintRegion(x-1,y-1,3,3,'bridge')}
   else{paintRegion(x-1,r.y,3,r.h,'water');paintRegion(x-1,y-1,3,3,'bridge')}
  }
  if([16,17,22].includes(r.number))for(let x=r.x+4;x<r.x+r.w-3;x+=7){paintRegion(x,r.y,2,3,'tree');paintRegion(x+2,r.y+r.h-3,2,3,'tree')}
 }
 // Secret trails remain separate from every required inter-village route.
 for(const l of LEGENDARIES){
  paintRegion(l.x-3,l.y-3,7,7,'grass');
  regionTrail(l.x,l.y,l.x,l.pathY,1);
 }
 for(const b of regionBuildings){
  const v=b.village===undefined?null:journeyVillages[b.village];
  if(v){
   if(b.resident){regionTrail(b.x+2,b.y+4,v.x,b.y+4);regionTrail(v.x,b.y+4,v.x,v.y)}
   else{regionTrail(b.x+2,b.y+4,b.x+2,v.y);regionTrail(b.x+2,v.y,v.x,v.y)}
  }
 }
}
function migrateJourney(){
 if(state.journeyVersion===1)return;
 if(state.scene==='region'&&(state.x>=93||state.y>=100)){
  const v=journeyVillages[Math.min(7,state.badges)];state.x=v.x;state.y=v.y;delete state.inside;
 }
 state.journeyVersion=1;
}
function validStorySave(s){
 for(const key of ['adventureStarted','starterReceived','hasDex','homecomingSeen'])if(s[key]!==undefined&&typeof s[key]!=='boolean')return false;
 if(s.team.length)return s.adventureStarted!==false&&s.starterReceived!==false&&s.hasDex!==false;
 const village=regionZones[0];
 return s.adventureStarted===true&&s.starterReceived===false&&s.hasDex===false&&s.homecomingSeen===false&&s.badges===0&&s.wins===0&&s.orbs===0&&!(s.reserve?.length)&&!(s.seen?.length)&&!(s.sideQuests?.length)&&!s.fishingRod&&!(s.fishCaught||0)&&!(s.greatBalls||0)&&!(s.masterBalls||0)&&!(s.defeatedTrainers?.length)&&!(s.collected?.length)&&s.regionVersion===1&&(s.scene==='interior'&&['home','lab','willow-rest','willow-shop'].includes(s.inside)||s.scene==='region'&&s.x>=village.x&&s.x<village.x+village.w&&s.y>=village.y&&s.y<village.y+village.h);
}
function showProfessor(){
 if(state.starterReceived){talk(interiorPeople.lab);return}
 held.clear();
 $('modal-content').innerHTML='<div class="eyebrow">PROFESSOR MINA\'S LABORATORY</div><h1>Your first partner</h1><p>Welcome! Choose one of these three friends. I will give you 5 Normal Balls and your own Grove Dex to begin your journey.</p><div class="starters" id="professor-starters"></div><button class="btn" id="professor-later">Let me think</button>';
 for(let id=0;id<3;id++){
  const button=document.createElement('button');button.className='starter';
  button.innerHTML='<canvas width="96" height="96" aria-hidden="true"></canvas><strong>'+SPECIES[id].name+'</strong><small>'+SPECIES[id].type.toUpperCase()+' COMPANION</small>';
  const c=button.querySelector('canvas').getContext('2d');c.imageSmoothingEnabled=false;creature(c,id,48,63,2.2);
  button.onclick=()=>receiveStarter(id);$('professor-starters').appendChild(button);
 }
 $('professor-later').onclick=()=>{$('modal').classList.add('hidden');canvas.focus({preventScroll:true})};
 $('modal').classList.remove('hidden');$('professor-starters').firstElementChild.focus({preventScroll:true});
}
function receiveStarter(species){
 if(!Number.isInteger(species)||species<0||species>2||!state.adventureStarted||state.starterReceived||state.team.length||state.scene!=='interior'||currentBuilding()?.id!=='lab'){toast('Visit Professor Mina in her laboratory to choose your first partner.');return false}
 state.team=[makeMon(species,5)];state.orbs=5;state.starterReceived=true;state.hasDex=true;
 recordSeen(state.team);$('modal').classList.add('hidden');renderUI();audio.play('caught');
 talk({...interiorPeople.lab,lines:()=>['Here is your '+SPECIES[species].name+'! Take these 5 Normal Balls and 1 Grove Dex. Your partner is ready to explore with you.','All ordinary companions can evolve through training. Check your Dex for their evolution levels. Start north on Route 1, and come visit whenever you like!']});
 return true;
}
function momHomecoming(){
 if(state.badges!==8||state.homecomingSeen||!$('modal').classList.contains('hidden'))return false;
 const z=regionZones[0],home=state.scene==='interior'&&currentBuilding()?.id==='home',village=state.scene==='region'&&state.x>=z.x&&state.x<z.x+z.w&&state.y>=z.y&&state.y<z.y+z.h;
 if(!home&&!village)return false;
 state.homecomingSeen=true;save();renderUI();
 talk({...interiorPeople.home,lines:()=>['Wow, I never thought you would become this good.','All eight gym badges! You and your companions have become the champions of the Grove. I am so proud of you. Welcome home!']});
 return true;
}
function validJourneySave(s){
 if(!validStorySave(s))return false;
 if(s.journeyVersion!==undefined&&s.journeyVersion!==1)return false;
 if(s.sideQuests!==undefined&&(!Array.isArray(s.sideQuests)||new Set(s.sideQuests).size!==s.sideQuests.length||!s.sideQuests.every(id=>allSideQuests.some(q=>q.id===id))))return false;
 if(s.fishingRod!==undefined&&typeof s.fishingRod!=='boolean')return false;
 if(s.fishCaught!==undefined&&(!Number.isSafeInteger(s.fishCaught)||s.fishCaught<0))return false;
 return true;
}
function questReady(q){
 const owned=ownedCreatures();
 if(q.fishing)return (state.fishCaught||0)>=1;
 if(q.fishCount)return (state.fishCaught||0)>=q.fishCount;
 if(q.badges)return state.badges>=q.badges;
 if(q.seen)return (state.seen||[]).length>=q.seen;
 return owned.some(m=>q.species!==undefined?m.species===q.species:q.type?SPECIES[m.species].type===q.type:q.stage?SPECIES[m.species].stage>=q.stage:q.evolved?SPECIES[m.species].stage>0:false);
}
function residentQuest(resident){return resident.quests.find(q=>!state.sideQuests?.includes(q.id))}
function showResident(resident,message=''){
 held.clear();const q=residentQuest(resident);
 $('modal-content').innerHTML='<div class="eyebrow" id="resident-role"></div><h1 id="resident-name"></h1><p id="resident-story"></p><p id="resident-reward" style="color:#f4ce79;font-size:10px"></p><p id="resident-message" role="status" style="font-size:10px"></p><div class="actions"><button class="btn" id="resident-close">See you later</button><button class="btn primary" id="resident-claim"></button></div>';
 $('resident-role').textContent=journeyVillages[resident.village].name+' · '+resident.role;$('resident-name').textContent=resident.name;
 $('resident-story').textContent=q?q.title+' — '+q.text:'You have helped with all of my requests. You and your companions are always welcome here!';
 $('resident-reward').textContent=q?'Reward: '+q.rewardText:'All requests completed';
 $('resident-message').textContent=message;
 const claim=$('resident-claim');claim.hidden=!q;
 if(q){claim.textContent=q.consume?'Choose companion to trade':'Complete request';claim.disabled=!questReady(q);claim.onclick=()=>q.consume?showQuestTrade(resident,q):completeResidentQuest(resident,q)}
 $('resident-close').onclick=()=>{$('modal').classList.add('hidden');canvas.focus()};
 $('modal').classList.remove('hidden');$('resident-close').focus();
}
function showQuestTrade(resident,q){
 if(residentQuest(resident)!==q||!questReady(q))return;
 $('modal-content').innerHTML='<div class="eyebrow">A REAL TRADE · YOUR COMPANION WILL LEAVE</div><h1>Choose your companion</h1><p id="trade-info"></p><div id="trade-list" class="actions"></div><button class="btn" id="trade-cancel">Keep my companions</button>';
 $('trade-info').textContent='Choose one '+SPECIES[q.species].name+' to give '+resident.name+'. It leaves your team or reserve permanently in exchange for a fishing rod. Your last team member cannot be traded.';
 for(const [source,monsters] of [['team',state.team],['reserve',state.reserve||[]]]){
  monsters.forEach((mon,index)=>{
   if(mon.species!==q.species)return;
   const b=document.createElement('button');b.className='btn';b.textContent='Trade '+SPECIES[mon.species].name+' · Lv. '+mon.level+' · '+source;
   b.disabled=source==='team'&&(state.team.length===1||mon.hp>0&&!state.team.some(other=>other!==mon&&other.hp>0));
   b.onclick=()=>completeResidentQuest(resident,q,{source,index,mon});$('trade-list').appendChild(b);
  });
 }
 $('trade-cancel').onclick=()=>showResident(resident);$('trade-cancel').focus();
}
function completeResidentQuest(resident,q,trade){
 if(battle||evolving||state.scene!=='interior'||currentBuilding()?.resident!==resident.id||residentQuest(resident)!==q||!questReady(q)){toast('Visit the resident at home with the requested companion or milestone.');return false}
 if(Object.entries(q.reward).some(([key,value])=>typeof value==='number'&&!Number.isSafeInteger((state[key]||0)+value))){showResident(resident,'Your bag cannot hold this reward yet. Make room before completing the request.');return false}
 if(q.consume){
  const source=trade?.source==='team'?state.team:trade?.source==='reserve'?state.reserve:null;
  if(!source||source[trade.index]!==trade.mon||trade.mon.species!==q.species||source===state.team&&(source.length===1||trade.mon.hp>0&&!source.some(m=>m!==trade.mon&&m.hp>0))){showResident(resident,'Keep at least one healthy companion on your team before making this trade.');return false}
  source.splice(trade.index,1);
 }
 state.sideQuests??=[];state.sideQuests.push(q.id);
 for(const [key,value] of Object.entries(q.reward))if(typeof value==='boolean')state[key]=value;else state[key]=(state[key]||0)+value;
 save();renderUI();audio.play('caught');showResident(resident,'Request completed! Received '+q.rewardText+'.');return true;
}
function showQuestJournal(){
 if(battle||evolving||!state.team.length||!$('modal').classList.contains('hidden'))return;
 held.clear();$('modal-content').innerHTML='<div class="eyebrow">VILLAGE STORIES · SIDE QUEST JOURNAL</div><h1 style="font-size:25px">Friends along the road</h1><div id="quest-list" class="quest-list"></div><button class="btn primary" id="journal-close">Back to exploring</button>';
 for(const r of residents){
  const q=residentQuest(r),row=document.createElement('p');row.style.cssText='font-size:10px;line-height:1.8;border-bottom:1px solid #78966b55;padding-bottom:12px';
  row.textContent=r.name+' · '+journeyVillages[r.village].name+' · '+(q?(questReady(q)?'READY: ':'')+q.title+' — '+q.text+' Reward: '+q.rewardText:'All requests complete');$('quest-list').appendChild(row);
 }
 $('journal-close').onclick=()=>{$('modal').classList.add('hidden');canvas.focus()};$('modal').classList.remove('hidden');$('journal-close').focus();
}
function fish(){
 if(battle||evolving||!state.team.length||!$('intro').classList.contains('hidden')||!$('modal').classList.contains('hidden'))return;
 held.clear();
 if(state.scene!=='region'){toast('Go outside and stand beside water to fish.');return}
 if(!state.fishingRod){regionNotice('You need a fishing rod','Visit Orin’s house in Fernwick. He will trade you a fishing rod for his favorite companion, Drizzlet.');return}
 if(![[1,0],[-1,0],[0,1],[0,-1]].some(([dx,dy])=>regionTile(state.x+dx,state.y+dy)==='water')){toast('Stand directly beside blue water, then press F or Fish to cast.');return}
 if(!state.team.some(m=>m.hp>0)){toast('Heal your team before fishing.');return}
 const water=SPECIES.map((s,id)=>({s,id})).filter(({s})=>s.type==='Water'&&!s.legendary&&!s.stage),pool=water.map(({id})=>id);
 const zone=regionZone(),level=Math.min(46,(zone.level||Math.max(4,state.badges*5))+Math.floor(Math.random()*3));
 audio.play('grass');
 beginBattle([makeMon(pool[Math.floor(Math.random()*pool.length)],level)],null);battle.fishing=true;
 battleMessage('A bite! A wild Water companion took the lure. Weaken it and throw a ball to land your catch.');
}
$('quest-journal').onclick=showQuestJournal;
$('fish').onclick=fish;
