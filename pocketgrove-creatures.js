'use strict';

// These are original species, not recolors or evolutions of existing characters.
const newCreatureData=`
Budbun|Leaf|hare|9fc86b|f3e5aa|meadow
Kindlefox|Flame|fox|e79662|ffe3a0|meadow
Drizzlet|Water|bird|81bdcb|d8f0d0|meadow
Tumblehorn|Stone|deer|b7a47c|e8d6a6|meadow
Fuzzvolt|Spark|hare|e9cc65|9b714f|meadow
Dewbell|Frost|flower|b8ddd2|e8d8f1|meadow
Velvimp|Shade|bat|ad96bc|f0c9c5|meadow
Wishwing|Star|bird|e2b2c7|fff1ba|meadow
Cloveroo|Leaf|deer|a4bf73|dbe8ad|meadow
Flarefinch|Flame|bird|db8058|f6d17d|meadow
Pondoodle|Water|turtle|75aea9|c0dfb9|meadow
Craggle|Stone|golem|aaa081|e1ca95|meadow
Joltick|Spark|beetle|d6bb5e|747a9e|meadow
Fluffrost|Frost|hare|cadfd8|96b4d5|meadow
Duskit|Shade|fox|9a8caa|d5b4c8|meadow
Glimmoth|Star|bat|c7a7ce|f3dea4|meadow
Marigloop|Leaf|jelly|93bc79|efc675|meadow
Coalcoil|Flame|serpent|c77c60|f4bc78|meadow
Ripplecrab|Water|crab|7cbbc2|e5ceb1|meadow
Flintail|Stone|fox|b8ad92|877c99|meadow
Buzzbloom|Spark|flower|e7d582|a2c58e|meadow
Mintle|Frost|turtle|acd5c4|e4efce|meadow
Hushhoot|Shade|owl|a597b5|d8c6a1|meadow
Twinkit|Star|fox|e7c0c9|b59dd6|meadow
Petalisk|Leaf|serpent|88b478|edb9b1|meadow
Mossnook|Leaf|golem|789e6a|d9c48d|forest
Fernfawn|Leaf|deer|9dbd7c|e0d49b|forest
Sporecap|Leaf|mushroom|b39178|efce9c|forest
Thornettle|Leaf|beetle|719e70|c3d595|forest
Glowgrub|Spark|serpent|c9c66f|e9e7ae|forest
Lanternut|Flame|owl|c98b61|f4db85|forest
Brooktoad|Water|turtle|7eb6a1|dce2b3|forest
Frostrill|Frost|bird|b3d5d4|c4c2e6|forest
Umbrafly|Shade|bat|9787b2|b7d2bd|forest
Moonmantis|Star|beetle|d3bdd4|eddfa4|forest
Lichenox|Stone|deer|a49d7e|bdd19a|forest
Bramblebat|Leaf|bat|87ab78|d6ad92|forest
Hollowlume|Shade|golem|8d849f|dec991|forest
Mycelune|Star|mushroom|ccacc8|f1d9b2|forest
Ashantler|Flame|deer|bd8068|edd29c|forest
Nectara|Water|flower|8cb9b8|e5bed2|forest
Needlehop|Leaf|hare|9fb67a|cdb99d|forest
Saplingo|Leaf|dragon|80ad73|d7ce8c|forest
Cocoonix|Shade|beetle|a39aac|d2be92|forest
Acornaut|Stone|snail|b09a73|d7cfa3|forest
Wispore|Shade|mushroom|ae99b6|93cbb1|forest
Glacap|Frost|mushroom|bad8d6|e8bed7|forest
Thistlefin|Leaf|bird|8fa96c|d1b485|forest
Emberoot|Flame|flower|d28b72|b8ce89|forest
Starlingrove|Star|owl|c3b3cd|e8cc8a|forest
Bubbloom|Water|flower|80b9cf|e2c2d5|brook
Reedrake|Water|dragon|74aaa0|d1d9a2|brook
Coralpin|Water|crab|d3a1a3|b9dbd0|brook
Shellsip|Water|snail|8ab9c1|e3d0ac|brook
Tideglide|Water|bird|80aac3|f0dfbd|brook
Sleetle|Frost|beetle|a9cfdd|e6dda8|brook
Rimeshell|Frost|turtle|b2d9d5|9faac9|brook
Pearlume|Star|jelly|e3cbd2|c4dce2|brook
Siltusk|Stone|golem|b3a28d|ddd0a1|brook
Kelpkin|Leaf|serpent|7caa8b|d9d79f|brook
Stormskip|Spark|hare|c9c584|a2c6cb|brook
Mistmote|Shade|jelly|a8a4c4|d3e8d4|brook
Foamfawn|Water|deer|95c4c9|e7dfbe|brook
Thermolt|Flame|turtle|c69b7c|f1cd89|brook
Frostern|Frost|bird|c4dcdf|a4b2d3|brook
Marshmallowl|Frost|owl|d1e2d5|d1b3cb|brook
Inkabyss|Shade|crab|9293af|c6accc|brook
Opalisk|Star|serpent|d6c2da|b6e0d3|brook
Driftwoodle|Leaf|golem|9db28a|d9c399|brook
Shoreclaw|Stone|crab|b8b295|8fbfba|brook
Eelume|Spark|serpent|d4d68a|9ac9cd|brook
Puddlesprout|Leaf|flower|8fb7a0|d9d6ae|brook
Sprayfox|Water|fox|94c0cf|efdcc6|brook
Glittergill|Star|dragon|d6b9d0|bbe5df|brook
Snoval|Frost|snail|c0dddd|d9c6e7|brook
Basalisk|Stone|serpent|9c968b|e1c391|ridge
Quartzelle|Stone|deer|c6b3a5|f1d9ca|ridge
Cragrook|Stone|bird|a5a08d|d8c48f|ridge
Obsidrake|Shade|dragon|86839e|c49bba|ridge
Volcaroo|Flame|hare|d58b66|e9c687|ridge
Magmole|Flame|golem|b97767|eeb37d|ridge
Suncinder|Flame|flower|dcaa67|f2df9f|ridge
Cometalon|Star|bird|ceafca|f5d18c|ridge
Aurorant|Frost|deer|c0dad6|cfb4e0|ridge
Teslafox|Spark|fox|dfc97c|a598c1|ridge
Cracklejaw|Spark|dragon|d1b961|cbd49b|ridge
Ironettle|Stone|beetle|a7ae9e|d3c78b|ridge
Cobaltoad|Water|turtle|819ebc|bbd8c4|ridge
Dustbloom|Leaf|flower|b1b887|edd1a0|ridge
Nightquill|Shade|owl|8e88a6|d4c0b6|ridge
Cinderclaw|Flame|crab|cf846e|e8cfa2|ridge
Boltmane|Spark|deer|dfcb87|b3b0ce|ridge
Snowdrake|Frost|dragon|b5d2df|e4c9e7|ridge
Orbitoad|Star|turtle|c9b3cd|e9d99b|ridge
Rubblebug|Stone|snail|aaa38e|cfb79b|ridge
Echowing|Shade|bat|9a8eae|b6c7d3|ridge
Solflare|Flame|fox|e2a477|f7dfa8|ridge
Prismite|Star|golem|c0b5d2|d0e2b9|ridge
Fulgurfly|Spark|beetle|d5cf8a|a2b7cf|ridge
Zenithorn|Star|deer|d5bad7|f2d8a0|ridge
`.trim().split('\n');
for(const [index,row] of newCreatureData.entries()){
 const [name,type,shape,color,accent,habitat]=row.split('|');
 const dark='#'+color.match(/[0-9a-f]{2}/gi).map(channel=>Math.round(parseInt(channel,16)*.58).toString(16).padStart(2,'0')).join('');
 SPECIES.push({name,type,shape,color:'#'+color,accent:'#'+accent,dark,habitat,pattern:index%5});
}
const originalHabitats=['meadow','meadow','meadow','ridge','ridge','brook','forest','ridge'];
for(let i=0;i<8;i++)SPECIES[i].habitat=originalHabitats[i];
const habitatNames={meadow:'Route 1 · Sprout Path',forest:'Whisperwood Forest',brook:'Route 2 · Brookside',ridge:'Route 3 · Sunridge'};
const LEGENDARIES=[
 {name:'Solvarion',type:'Flame',shape:'dragon',color:'#e3ad68',dark:'#8a5448',accent:'#fff0ac',pattern:2,habitat:'quarry',legendary:true,level:38,badges:4,x:144,y:39,rumor:'After four badges, seek a warm breath beyond the unmarked quarry trail. Walk the tiny clearing patiently; a rare presence may answer.'},
 {name:'Thaloryx',type:'Water',shape:'serpent',color:'#8dc8d4',dark:'#4a7196',accent:'#e3e2ff',pattern:1,habitat:'hollow',legendary:true,level:44,badges:6,x:196,y:140,rumor:'After six badges, search below Frostfall for water that never freezes. Its guardian very rarely breaks the silence.'},
 {name:'Noxastra',type:'Star',shape:'deer',color:'#bca4d9',dark:'#5c528b',accent:'#fff0b0',pattern:4,habitat:'nightglass',legendary:true,level:50,badges:8,x:219,y:21,rumor:'Only a champion may awaken the last starlight. North of the shadow road, a narrow passage leads into forgotten woods.'}
];
const legendaryPowers=[
 {title:'The Sunforged Sovereign',signature:'Solar Cataclysm',hpBonus:240,attackBonus:2.15,level:48,lore:'A sun-armored dragon with enormous ember wings, a blazing heart, golden talons, and a crown of solar fire.'},
 {title:'The Abyssal Leviathan',signature:'Abyssal Maelstrom',hpBonus:280,attackBonus:2.05,level:49,lore:'An armored ocean serpent with a sweeping spiral tail, pearl horns, luminous tide runes, and flowing turquoise fins.'},
 {title:'The Eclipse Monarch',signature:'Eclipse Supernova',hpBonus:260,attackBonus:2.25,level:50,lore:'A celestial stag with branching constellation antlers, a flowing nebula mane, golden hooves, and an orbiting eclipse halo.'}
];
for(const [i,legend] of LEGENDARIES.entries()){Object.assign(legend,legendaryPowers[i]);legend.species=SPECIES.length;SPECIES.push(legend)}
Object.assign(habitatNames,{quarry:'Unmarked quarry clearing',hollow:'Hidden frozen hollow',nightglass:'Forgotten starlit woods'});
function encounterPool(habitat){
 const pool=SPECIES.map((s,id)=>({s,id})).filter(({s})=>!s.legendary&&!s.stage&&(habitat==='league'||s.habitat===habitat||habitat==='starlight'&&['Star','Shade','Spark'].includes(s.type))).map(({id})=>id);
 if(!pool.length)throw new Error('No encounter species for habitat: '+habitat);
 return pool;
}
function drawNewCreature(c,id,x,y,scale,back){
 if(SPECIES[id].legendary){drawLegendaryCreature(c,id,x,y,scale,back);return}
 const s=SPECIES[id],ink=s.dark,accent=s.accent;
 c.save();c.translate(Math.round(x),Math.round(y));c.scale(scale,scale);
 if(s.stage){for(const sign of [-1,1]){rect(c,sign<0?-16:12,-7,5,14,accent);rect(c,sign<0?-13:9,-22,4,9,accent)}rect(c,-3,-26,7,12,accent);if(s.stage===2){rect(c,-10,-30,5,12,accent);rect(c,7,-30,5,12,accent);rect(c,-3,-35,7,12,accent)}}
 rect(c,-12,9,26,3,'#233d3530');
 // Each silhouette has its own appendages, body proportions, and face placement.
 const wide=['crab','turtle','golem','snail'].includes(s.shape),slim=['serpent','flower','bird'].includes(s.shape),w=wide?26:slim?16:21;
 if(s.shape==='bat'){for(const sign of [-1,1]){rect(c,sign<0?-24:8,-17,16,18,ink);rect(c,sign<0?-21:11,-20,10,20,s.color);rect(c,sign<0?-19:13,-15,6,12,accent)}}
 if(s.shape==='bird'||s.shape==='owl'){rect(c,-17,-9,9,16,ink);rect(c,9,-9,9,16,ink);rect(c,-15,-7,6,9,accent);rect(c,12,-7,4,9,accent)}
 if(s.shape==='dragon'){rect(c,-20,-17,12,17,ink);rect(c,10,-17,12,17,ink);rect(c,-18,-13,7,10,accent);rect(c,13,-13,7,10,accent);rect(c,10,4,12,5,ink);rect(c,18,-1,5,8,s.color)}
 if(s.shape==='crab'){rect(c,-22,-8,10,8,s.color);rect(c,14,-8,10,8,s.color);rect(c,-24,-13,6,9,ink);rect(c,21,-13,6,9,ink);rect(c,-25,-15,4,6,accent);rect(c,25,-15,4,6,accent)}
 if(s.shape==='beetle'){for(let i=0;i<3;i++){rect(c,-16,-5+i*5,8,2,ink);rect(c,10,-5+i*5,8,2,ink)}rect(c,-8,-22,3,11,ink);rect(c,7,-22,3,11,ink);rect(c,-10,-24,5,4,accent);rect(c,7,-24,5,4,accent)}
 if(s.shape==='hare'){rect(c,-10,-30,6,20,ink);rect(c,5,-33,6,23,ink);rect(c,-8,-27,3,14,accent);rect(c,7,-30,3,17,accent)}
 if(s.shape==='fox'){rect(c,-13,-23,9,16,ink);rect(c,6,-23,9,16,ink);rect(c,-10,-20,4,10,accent);rect(c,9,-20,4,10,accent);rect(c,10,1,12,10,ink);rect(c,17,-8,9,15,s.color);rect(c,20,-11,6,8,accent)}
 if(s.shape==='deer'){for(const sign of [-1,1]){rect(c,sign<0?-9:8,-30,3,18,ink);rect(c,sign<0?-15:10,-25,7,3,ink);rect(c,sign<0?-15:14,-31,3,8,accent)}}
 if(s.shape==='snail'){rect(c,0,-17,18,24,ink);rect(c,3,-14,14,18,accent);rect(c,6,-11,7,11,s.color);rect(c,-12,-23,2,12,ink);rect(c,-4,-25,2,13,ink)}
 if(s.shape==='serpent'){rect(c,-14,7,31,5,ink);rect(c,10,-1,8,11,s.color);rect(c,15,-7,4,9,accent)}
 rect(c,-Math.floor(w/2),-12,w,20,ink);rect(c,-Math.floor(w/2)+2,-15,w-4,24,s.color);rect(c,-Math.floor(w/2)-1,-7,w+2,12,s.color);
 if(!['serpent','jelly','flower','snail'].includes(s.shape)){rect(c,-9,7,7,5,ink);rect(c,4,7,7,5,ink)}
 if(s.shape==='turtle'){rect(c,-15,-4,7,9,ink);rect(c,10,-4,7,9,ink);rect(c,-8,-14,17,5,accent)}
 if(s.shape==='golem'){rect(c,-16,-7,7,14,ink);rect(c,12,-7,7,14,ink);rect(c,-5,-20,12,8,accent);rect(c,-12,-13,6,8,accent)}
 if(s.shape==='jelly'){rect(c,-13,-14,28,8,s.color);rect(c,-9,-19,20,6,s.color);rect(c,-5,-22,12,4,accent);for(let i=0;i<4;i++)rect(c,-10+i*7,6,3,10-i%2*3,ink)}
 if(s.shape==='mushroom'){rect(c,-19,-19,39,8,ink);rect(c,-15,-26,31,10,s.color);rect(c,-10,-30,21,6,s.color);rect(c,-12,-24,6,5,accent);rect(c,3,-27,7,5,accent);rect(c,11,-21,5,4,accent)}
 if(s.shape==='flower'){rect(c,-3,-28,6,37,ink);for(const [px,py] of [[-15,-18],[7,-18],[-4,-30],[-4,-8]])rect(c,px,py,12,12,accent);rect(c,-8,-23,16,16,s.color);rect(c,-11,2,12,5,accent);rect(c,2,-2,12,5,accent)}
 if(s.pattern===0){rect(c,-7,0,5,4,accent);rect(c,4,1,4,4,accent)}
 if(s.pattern===1){rect(c,-9,-1,19,3,accent);rect(c,-6,4,13,2,accent)}
 if(s.pattern===2){rect(c,-2,-15,5,5,accent);rect(c,-5,1,11,6,accent)}
 if(s.pattern===3){rect(c,-9,-9,3,15,accent);rect(c,7,-9,3,15,accent)}
 if(s.pattern===4){rect(c,-5,1,12,4,accent);rect(c,-2,-16,5,3,accent);rect(c,-3,5,7,2,accent)}
 const eyeY=s.shape==='flower'?-18:-8,eyeX=s.shape==='snail'?-7:0;
 if(back){rect(c,-5,-8,12,5,ink)}
 else{
  if(s.shape==='owl'){rect(c,-9,-13,9,11,accent);rect(c,2,-13,9,11,accent)}
  rect(c,eyeX-5,eyeY,3,4,'#223b3b');rect(c,eyeX+5,eyeY,3,4,'#223b3b');rect(c,eyeX-5,eyeY,1,1,'#fff2d3');rect(c,eyeX+5,eyeY,1,1,'#fff2d3');
  if(s.shape==='bird'||s.shape==='owl')rect(c,-1,-3,5,4,accent);else rect(c,eyeX,-2,3,2,ink);
 }
 rect(c,-6,-12,4,2,'#ffffff33');c.restore();
}
function drawLegendaryCreature(c,id,x,y,scale,back){
 const s=SPECIES[id],time=reducedMotion.matches?0:performance.now()/1000;
 const ink='#25233e',gold='#ffd479',light='#fff4c5';
 const polygon=(points,color)=>{c.fillStyle=color;c.beginPath();points.forEach(([px,py],i)=>i?c.lineTo(px,py):c.moveTo(px,py));c.closePath();c.fill()};
 c.save();c.translate(Math.round(x),Math.round(y));c.scale(scale,scale);
 rect(c,-25,11,50,3,'#14203933');
 c.globalAlpha=.55;
 for(let i=0;i<10;i++){
  const a=i*Math.PI/5+time*.2;
  sparkle(c,Math.round(Math.cos(a)*35),Math.round(-17+Math.sin(a)*28),i%3===0?2:1,s.accent);
 }
 c.globalAlpha=1;
 if(s.type==='Flame'){
  for(const sign of [-1,1]){
   c.save();c.scale(sign,1);
   const lift=reducedMotion.matches?0:Math.round(Math.sin(time*2)*1);
   c.translate(0,lift);
   polygon([[7,-22],[15,-30],[20,-42],[25,-38],[25,-31],[32,-38],[35,-31],[34,-16],[38,-8],[30,-10],[29,0],[23,-6],[18,1],[14,-12],[7,-7]],ink);
   polygon([[12,-21],[20,-34],[22,-27],[30,-32],[31,-20],[34,-13],[27,-16],[26,-7],[22,-12],[18,-6],[16,-18]],'#a7464d');
   polygon([[18,-22],[23,-25],[24,-19],[29,-22],[28,-16],[23,-17],[22,-11]],'#f68446');
   rect(c,19,-32,2,12,gold);rect(c,27,-29,2,10,gold);rect(c,14,-19,3,8,'#ffdc89');
   rect(c,9,-14,7,9,ink);rect(c,11,-13,5,6,'#df8952');
   rect(c,13,-8,6,3,gold);rect(c,13,-8,2,5,light);rect(c,17,-8,2,4,light);
   rect(c,5,1,7,10,ink);rect(c,6,2,5,6,'#bf634a');rect(c,4,9,11,3,gold);
   rect(c,5,9,2,3,light);rect(c,11,9,2,3,light);
   c.restore();
  }
  polygon([[-9,-24],[8,-24],[11,-13],[9,4],[4,9],[-5,9],[-11,1],[-12,-13]],ink);
  polygon([[-7,-22],[6,-22],[9,-11],[6,3],[0,7],[-7,2],[-9,-10]],'#dc854d');
  for(let i=0;i<3;i++){rect(c,-7,-16+i*6,14,3,gold);rect(c,-4,-14+i*6,8,2,'#f8b661')}
  rect(c,-9,-33,18,14,ink);rect(c,-7,-33,14,11,'#e9b169');
  rect(c,-11,-29,4,5,gold);rect(c,7,-29,4,5,gold);
  for(const sign of [-1,1]){polygon([[sign*4,-32],[sign*6,-42],[sign*10,-46],[sign*9,-36],[sign*7,-31]],gold);rect(c,sign<0?-7:3,-29,4,2,back?'#a45c48':light)}
  rect(c,-2,-43,4,9,'#ff9252');rect(c,-1,-47,2,7,light);
  if(back){for(let i=0;i<5;i++)polygon([[-3,-25+i*6],[0,-30+i*6],[4,-25+i*6]],gold)}
  else{
   rect(c,-6,-29,1,2,ink);rect(c,5,-29,1,2,ink);rect(c,-5,-23,10,2,ink);
   rect(c,-4,-23,2,3,light);rect(c,3,-23,2,3,light);
   polygon([[0,-15],[5,-10],[3,-4],[-3,-4],[-5,-10]],'#a83d45');
   sparkle(c,0,-9,4,gold);sparkle(c,0,-9,2,light);
  }
 }else if(s.type==='Water'){
  if(back)c.scale(-1,1);
  polygon([[-29,3],[-34,-4],[-31,-13],[-22,-17],[-5,-15],[7,-10],[12,-1],[8,6],[-4,11],[-24,11],[-28,7],[-9,7],[1,3],[3,-2],[-3,-6],[-20,-9],[-26,-6],[-24,-1],[-18,2]],ink);
  polygon([[-28,2],[-31,-4],[-28,-11],[-21,-14],[-5,-12],[4,-8],[9,-1],[5,4],[-5,8],[-23,8],[-24,7],[-8,5],[4,1],[5,-3],[-3,-9],[-21,-12],[-28,-7],[-27,-1]],'#448ba9');
  rect(c,-23,5,15,2,'#a5f6e4');rect(c,-27,-11,11,2,'#72dbd4');
  polygon([[1,0],[4,-14],[2,-24],[6,-34],[16,-37],[25,-30],[22,-20],[16,-16],[14,-4],[9,4]],ink);
  polygon([[4,-1],[7,-13],[5,-24],[8,-31],[16,-34],[22,-28],[19,-22],[12,-20],[11,-5],[8,1]],'#68c4cf');
  polygon([[4,-16],[6,-26],[10,-31],[13,-30],[10,-21],[8,-10],[7,-3],[4,-1]],'#c2f7e9');
  for(let i=0;i<5;i++){
   const px=-22+i*6,py=-11+Math.round(i*i*.36);
   polygon([[px,py],[px+3,py-3],[px+5,py],[px+3,py+3]],'#9debdc');
  }
  for(let i=0;i<4;i++){rect(c,10,-20+i*5,4,2,'#377895');rect(c,11,-19+i*5,2,1,'#e5fff2')}
  polygon([[-26,-8],[-35,-18],[-31,-19],[-25,-15],[-22,-26],[-18,-23],[-19,-11]],'#77e6dd');
  polygon([[10,-18],[18,-25],[28,-15],[22,-14],[28,-5],[21,-7],[20,0],[14,-5]],'#3f6d9b');
  polygon([[14,-18],[19,-21],[23,-16],[20,-14],[23,-9],[18,-11],[17,-5]],'#9cf5e2');
  polygon([[6,-31],[3,-40],[6,-45],[9,-33]],'#dffcf0');
  polygon([[16,-34],[18,-44],[22,-47],[21,-36]],'#dffcf0');
  rect(c,6,-37,2,3,'#91dce0');rect(c,18,-40,2,3,'#91dce0');
  polygon([[19,-29],[28,-27],[31,-22],[25,-19],[17,-22]],ink);
  rect(c,20,-26,8,4,'#9be4e2');rect(c,24,-21,3,2,'#eefef1');
  if(back){rect(c,12,-30,3,12,'#39789d');rect(c,13,-31,2,5,'#dffcf0')}
  else{rect(c,17,-30,5,2,gold);rect(c,20,-30,1,2,ink);rect(c,26,-25,2,1,ink)}
  const drift=reducedMotion.matches?0:Math.round(Math.sin(time*2)*2);
  rect(c,27,-20,2,7,'#dcfff0');rect(c,29,-14,2,6+drift,'#dcfff0');rect(c,27,-8+drift,3,2,'#dcfff0');
  sparkle(c,11,-34,2,light);
 }else{
  const haloY=-29;
  for(let i=0;i<28;i++){const a=i*Math.PI/14;rect(c,Math.round(Math.cos(a)*14)-1,Math.round(haloY+Math.sin(a)*13)-1,2,2,i%3===0?light:'#b79ddc')}
  polygon([[-22,-8],[-17,-14],[-1,-13],[10,-8],[11,2],[-2,6],[-18,4],[-24,-2]],ink);
  polygon([[-20,-7],[-15,-11],[-1,-10],[8,-6],[7,1],[-3,3],[-17,1]],'#8476b6');
  polygon([[-17,-8],[-7,-10],[3,-7],[4,-2],[-5,1],[-17,-1]],'#bcace0');
  polygon([[-23,-7],[-31,-16],[-33,-10],[-29,-4],[-34,0],[-26,2],[-21,-1]],'#b89adc');
  rect(c,-30,-12,2,7,'#e4cbef');rect(c,-29,-1,5,2,gold);
  for(const [px,py,far] of [[-18,0,true],[1,1,true],[-12,2,false],[9,-1,false]]){
   polygon([[px,py],[px+4,py],[px+2,7],[px+3,11],[px-2,11],[px-2,7]],ink);
   rect(c,px,py+1,2,7-py,far?'#796da7':'#c2bbe8');rect(c,px-2,10,6,3,far?'#c8a97d':gold);
  }
  polygon([[1,-8],[2,-21],[6,-30],[14,-30],[18,-24],[15,-13],[12,-3],[7,2]],ink);
  polygon([[5,-8],[5,-20],[8,-27],[13,-27],[15,-23],[11,-11],[9,-4]],'#ccb4e5');
  polygon([[3,-23],[-4,-21],[-8,-15],[-4,-14],[-9,-8],[-3,-8],[-6,-3],[2,-5],[6,-17]],'#6c5c9d');
  rect(c,-3,-17,3,6,'#b9a9e2');rect(c,-3,-7,2,3,'#e9cdf0');
  polygon([[9,-33],[18,-32],[20,-27],[27,-25],[25,-20],[16,-21],[11,-24]],ink);
  polygon([[11,-31],[17,-30],[18,-25],[24,-24],[23,-22],[16,-24],[12,-25]],'#d9c0eb');
  polygon([[11,-30],[5,-33],[5,-37],[12,-34]],'#bb9bd9');
  for(const [offset,sign] of [[11,-1],[17,1]]){
   polygon([[offset,-31],[offset-1,-37],[offset+sign*3,-40],[offset+sign*4,-47],[offset+sign*6,-47],[offset+sign*5,-39],[offset+sign*10,-43],[offset+sign*13,-43],[offset+sign*13,-41],[offset+sign*5,-36],[offset+2,-31]],'#e6c6ef');
   rect(c,offset+sign*5-1,-47,2,3,light);
   sparkle(c,offset+sign*12,-42,1,gold);
  }
  if(back){rect(c,11,-29,3,7,'#927ab6');rect(c,7,-15,2,8,'#f1d7f0')}
  else{rect(c,17,-28,4,2,light);rect(c,19,-28,1,2,ink);rect(c,24,-24,2,1,'#705485')}
  for(const [px,py] of [[-16,-6],[-9,-8],[-2,-4]]){sparkle(c,px,py,1,light)}
  sparkle(c,9,-18,3,gold);sparkle(c,9,-18,1,light);
 }
 c.restore();
}
function drawLegendaryAttack(c,s,source,target,p,motion){
 const progress=motion?p:.65,alpha=motion?Math.sin(p*Math.PI)*.7:.4;
 c.save();c.globalAlpha=alpha;c.fillStyle=s.dark;c.fillRect(0,0,960,400);
 c.globalAlpha=motion?Math.sin(p*Math.PI):.8;
 const x=source.x+(target.x-source.x)*progress,y=source.y+(target.y-source.y)*progress;
 if(s.type==='Flame'){
  for(let i=0;i<16;i++){const angle=i*Math.PI/8+progress*4,r=28+progress*48;sparkle(c,x+Math.cos(angle)*r,y+Math.sin(angle)*r,5+i%3*3,i%2?s.accent:s.color)}
  sparkle(c,x,y,26,s.color);sparkle(c,x,y,17,s.accent);
 }else if(s.type==='Water'){
  for(let ring=0;ring<4;ring++)for(let i=0;i<16;i++){const angle=i*Math.PI/8+progress*8+ring,r=20+ring*14;rect(c,target.x+Math.cos(angle)*r,target.y+Math.sin(angle)*r*.55,9,5,ring%2?s.accent:s.color)}
 }else{
  c.fillStyle=s.dark;c.beginPath();c.arc(target.x,target.y,24+progress*48,0,Math.PI*2);c.fill();
  for(let i=0;i<16;i++){const angle=i*Math.PI/8+progress*3,r=38+progress*50;sparkle(c,target.x+Math.cos(angle)*r,target.y+Math.sin(angle)*r,5+i%3,s.accent)}
  sparkle(c,target.x,target.y,20,s.color);sparkle(c,target.x,target.y,11,s.accent);
 }
 c.globalAlpha=1;c.textAlign='center';c.font='bold 18px monospace';c.fillStyle='#172939';c.fillText(s.signature.toUpperCase(),482,38);c.fillStyle=s.accent;c.fillText(s.signature.toUpperCase(),480,36);c.restore();
}
function ownedCreatures(){return [...state.team,...(state.reserve||[])]}
let storagePage=0,storageTeamSlot=0;
function showStorageBoxes(){
 if(evolving||battle||!state.team.length||!$('intro').classList.contains('hidden')||!$('modal').classList.contains('hidden'))return;
 held.clear();storagePage=0;storageTeamSlot=0;renderStorageBoxes();$('modal').classList.remove('hidden');$('storage-close').focus({preventScroll:true});$('modal-content').scrollTop=0;
}
function storageCanReplace(index,replacement){
 return state.team.some((mon,i)=>i===index?replacement?.hp>0:mon.hp>0);
}
function changeStorage(action,index){
 if(evolving||battle||!$('storage-grid')||$('modal').classList.contains('hidden'))return;
 state.reserve??=[];
 const selected=state.team[storageTeamSlot],stored=state.reserve[index];
 if(action==='deposit'){
  if(!selected||state.team.length<=1||!storageCanReplace(storageTeamSlot,null)){renderStorageBoxes('Keep at least one healthy companion on your team.');return}
  state.reserve.push(state.team.splice(storageTeamSlot,1)[0]);
 }else if(action==='withdraw'){
  if(!stored||state.team.length>=6){renderStorageBoxes('Your team is full. Select a team member, then use Swap instead.');return}
  state.team.push(state.reserve.splice(index,1)[0]);
 }else if(action==='swap'){
  if(!selected||!stored||!storageCanReplace(storageTeamSlot,stored)){renderStorageBoxes('This swap would leave you without a healthy companion. Heal your team first.');return}
  state.team[storageTeamSlot]=stored;state.reserve[index]=selected;
 }else{renderStorageBoxes('Choose Store, Add to team, or Swap.');return}
 save();renderUI();audio.play('switch');renderStorageBoxes(storageAvailable?'Team and storage saved.':'Storage is unavailable. Keep this tab open to preserve your companions.');
}
function renderStorageBoxes(message='Select a team member to store or swap. Extra catches go into these boxes automatically.'){
 const reserve=state.reserve||[],pages=Math.max(1,Math.ceil(reserve.length/30));
 storagePage=Math.max(0,Math.min(storagePage,pages-1));storageTeamSlot=Math.max(0,Math.min(storageTeamSlot,state.team.length-1));
 $('modal-content').innerHTML='<div class="eyebrow">COMPANION STORAGE · 30 PER BOX</div><h1 id="storage-title">Your storage boxes</h1><div class="storage-team" id="storage-team"></div><button class="btn" id="storage-deposit"></button><div class="storage-toolbar"><button class="btn" id="storage-prev" aria-label="Previous storage box">Previous</button><span id="storage-page"></span><button class="btn" id="storage-next" aria-label="Next storage box">Next</button></div><div class="storage-grid" id="storage-grid"></div><p id="storage-status" role="status" aria-live="polite"></p><button class="btn primary" id="storage-close">Back to exploring</button>';
 state.team.forEach((mon,index)=>{
  const button=document.createElement('button');button.className='btn'+(index===storageTeamSlot?' selected':'');button.setAttribute('aria-pressed',String(index===storageTeamSlot));
  button.textContent=(index===0?'Lead · ':'')+SPECIES[mon.species].name+' · Lv. '+mon.level+' · '+mon.hp+'/'+maxHP(mon)+' HP';
  button.onclick=()=>{storageTeamSlot=index;renderStorageBoxes()};$('storage-team').appendChild(button);
 });
 const selected=state.team[storageTeamSlot],deposit=$('storage-deposit');
 deposit.textContent='Store '+SPECIES[selected.species].name+' · Free a team slot';
 deposit.disabled=state.team.length<=1||!storageCanReplace(storageTeamSlot,null);deposit.onclick=()=>changeStorage('deposit');
 $('storage-page').textContent='Box '+(storagePage+1)+' / '+pages+' · '+reserve.length+' stored';
 $('storage-page').style.fontSize='9px';
 $('storage-prev').disabled=storagePage===0;$('storage-next').disabled=storagePage===pages-1;
 $('storage-prev').onclick=()=>{storagePage--;renderStorageBoxes()};$('storage-next').onclick=()=>{storagePage++;renderStorageBoxes()};
 reserve.slice(storagePage*30,storagePage*30+30).forEach((mon,offset)=>{
  const index=storagePage*30+offset,s=SPECIES[mon.species],card=document.createElement('div');card.className='storage-card';
  card.innerHTML='<canvas width="96" height="96" aria-hidden="true"></canvas><strong></strong><small></small>';
  card.querySelector('strong').textContent=s.name;card.querySelector('small').textContent='Lv. '+mon.level+' · '+mon.hp+'/'+maxHP(mon)+' HP';
  const c=card.querySelector('canvas').getContext('2d');c.imageSmoothingEnabled=false;creature(c,mon.species,48,68,s.legendary?1:s.stage===2?1.1:1.4);
  for(const action of state.team.length<6?['withdraw','swap']:['swap']){
   const button=document.createElement('button');button.className='btn';button.textContent=action==='withdraw'?'Add to team':'Swap selected';
   button.disabled=action==='swap'&&!storageCanReplace(storageTeamSlot,mon);button.onclick=()=>changeStorage(action,index);card.appendChild(button);
  }
  $('storage-grid').appendChild(card);
 });
 if(!reserve.length){const empty=document.createElement('p');empty.style.fontSize='10px';empty.style.gridColumn='1 / -1';empty.textContent='This box is empty. Select a team member above and choose Store to make room for new catches.';$('storage-grid').appendChild(empty)}
 $('storage-status').textContent=message;$('storage-close').onclick=()=>{$('modal').classList.add('hidden');canvas.focus()};
}
function showFieldGuide(){
 if(evolving||battle||!$('intro').classList.contains('hidden')||!$('modal').classList.contains('hidden'))return;
 if(!state.hasDex){toast('Professor Mina will give you a Grove Dex when you choose your partner in her laboratory.');return}
 held.clear();renderFieldGuide();$('modal').classList.remove('hidden');$('guide-close').focus();
}
function renderFieldGuide(){
 const owned=new Set(ownedCreatures().map(m=>m.species)),seen=new Set([...(state.seen||[]),...owned]);
 $('modal-content').innerHTML='<div class="eyebrow">GROVE DEX · CREATURE JOURNAL</div><h1 style="font-size:27px;margin:7px 0">Discover the impossible</h1><p id="guide-count" style="font-size:10px;margin:0 0 9px"></p><div class="guide-tools"><label>Find <input id="guide-search" type="search" placeholder="Name, type, or habitat" aria-label="Search creatures"></label><select id="dex-filter" class="btn" aria-label="Filter Dex"><option value="all">All</option><option value="seen">Seen</option><option value="caught">Caught</option><option value="legendary">Legendary</option></select><button class="btn primary" id="guide-close">Done</button></div><div class="guide-grid" id="guide-grid"></div>';
 $('guide-count').textContent=`${seen.size} seen · ${owned.size} / ${SPECIES.length} caught · ${state.reserve?.length||0} in reserve. Reserve creatures can replace your lead.`;
 const populate=()=>{
  const query=$('guide-search').value.trim().toLowerCase(),grid=$('guide-grid');grid.replaceChildren();
  SPECIES.forEach((s,id)=>{
   const filter=$('dex-filter').value,known=seen.has(id),secret=s.legendary&&!known;
   if(filter==='seen'&&!known||filter==='caught'&&!owned.has(id)||filter==='legendary'&&!s.legendary)return;
   if(!`${secret?'Unknown legend':s.name} ${secret?'':s.type} ${habitatNames[s.habitat]}`.toLowerCase().includes(query))return;
   const index=state.reserve?.findIndex(m=>m.species===id)??-1,card=document.createElement('div');card.className='guide-card'+(owned.has(id)?' owned':'');
   card.innerHTML=`<small>#${String(id+1).padStart(3,'0')} ${owned.has(id)?'· CAUGHT':known?'· SEEN':'· UNKNOWN'}</small><canvas width="96" height="96" aria-hidden="true"></canvas><strong>${secret?'Unknown legend':s.name}</strong><span style="color:${TYPES[s.type]}">${secret?'???':s.type}${s.legendary?' · LEGENDARY':''}</span><small>${habitatNames[s.habitat]}</small>`;
   const c=card.querySelector('canvas').getContext('2d');c.imageSmoothingEnabled=false;if(secret)c.filter='brightness(0)';creature(c,id,48,68,s.legendary?1:1.55);c.filter='none';
   if(s.legendary){const rumor=document.createElement('small');rumor.className='dex-rumor';rumor.textContent=state.badges>=s.badges?s.rumor:'Rumor sealed until '+s.badges+' badges.';card.appendChild(rumor)}
   if(s.legendary&&known){const lore=document.createElement('small');lore.className='dex-rumor';lore.textContent=s.title+' · '+s.lore+' Signature: '+s.signature+'. Bonus HP: '+s.hpBonus+' · Attack: '+s.attackBonus+'x';card.appendChild(lore)}
   if(s.evolution||s.stage){const info=document.createElement('small');info.className='dex-rumor';info.textContent=s.evolution?'Evolves at Lv. '+s.evolution.level+' into '+SPECIES[s.evolution.species].name:s.stage?'Fully evolved · Enhanced HP and attack':'';card.appendChild(info)}
   if(index>=0){const button=document.createElement('button');button.className='btn';button.textContent=state.team.length<6?'Add to team':'Make lead';button.onclick=()=>{if(battle)return;const [mon]=state.reserve.splice(index,1);if(state.team.length<6)state.team.push(mon);else{state.reserve.push(state.team[0]);state.team[0]=mon}save();renderUI();renderFieldGuide();toast(s.name+' is now on your team.')};card.appendChild(button)}
   grid.appendChild(card);
  });
  if(!grid.children.length){const empty=document.createElement('p');empty.textContent='No creatures match that search.';grid.appendChild(empty)}
 };
 $('guide-search').oninput=populate;$('dex-filter').onchange=populate;
 $('guide-close').onclick=()=>{$('modal').classList.add('hidden');canvas.focus()};
 populate();
}
function consumeFreshStart(){
 if(location.hash!=='#fresh-start')return;
 try{
  localStorage.removeItem(SAVE);
  history.replaceState(null,'',location.href.split('#')[0]);
  toast('A fresh adventure! Visit Professor Mina for your very first companion.');
 }catch(error){console.error('Pocketgrove restart failed:',error);throw new Error('Could not clear saved progress. Use New adventure to restart.')}
}
$('field-guide').onclick=showFieldGuide;
$('storage-boxes').onclick=showStorageBoxes;
