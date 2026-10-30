'use strict';

function attackPose(kind,p){
 const wind=Math.min(1,p/.22),flight=Math.max(0,Math.min(1,(p-.22)/.5)),recover=Math.max(0,Math.min(1,(p-.72)/.28));
 if(kind==='tackle')return {travel:p<.22?-wind*.035:p<.72?flight*.86:(1-recover)*.86,lift:p<.22?0:Math.sin(flight*Math.PI)*30*(1-recover),squash:p<.22?1-wind*.1:1};
 return {travel:p<.22?-wind*.025:Math.sin(flight*Math.PI)*.075*(1-recover),lift:0,squash:p<.22?1-wind*.06:1};
}
function drawMoveAnimation(c,type,source,target,p,motion,kind='attack'){
 const color=TYPES[type],dx=target.x-source.x,dy=target.y-source.y,direction=Math.sign(dx);
 const charge=Math.min(1,p/.22),travel=Math.max(0,Math.min(1,(p-.22)/.5)),impact=Math.max(0,(p-.72)/.28);
 c.save();c.lineCap='round';c.lineJoin='round';
 const line=(points,ink,width)=>{c.strokeStyle=ink;c.lineWidth=width;c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.stroke()};
 const ring=(x,y,r,ink,width=3)=>{c.strokeStyle=ink;c.lineWidth=width;c.beginPath();c.ellipse(x,y,r,r*.48,0,0,Math.PI*2);c.stroke()};
 if(!motion){
  ring(target.x,target.y,35,color);sparkle(c,target.x,target.y,12,color);c.restore();return;
 }
 if(p<.22){
  c.globalAlpha=charge*.8;
  ring(source.x,source.y+20,35-charge*15,color);
  for(let i=0;i<8;i++){const a=i*Math.PI/4,r=45-charge*28;rect(c,source.x+Math.cos(a)*r,source.y+Math.sin(a)*r,4,4,color)}
 }else if(p<.75){
  if(kind==='tackle'){
   for(let i=0;i<7;i++){const x=source.x+dx*travel*.86-direction*i*13,y=source.y+dy*travel*.86+18;c.globalAlpha=(1-i/7)*.65;line([[x-direction*40,y+i*3],[x,y+i*3]],'#f6efcf',3)}
  }else if(type==='Leaf'){
   const tipX=source.x+dx*travel,tipY=source.y+dy*travel;
   const points=Array.from({length:20},(_,i)=>{const q=i/19;return [source.x+(tipX-source.x)*q,source.y+(tipY-source.y)*q+Math.sin(q*Math.PI*3-p*14)*14*Math.sin(q*Math.PI)]});
   line(points,'#315c3d',9);line(points,'#a4cf72',4);
   for(let i=0;i<5;i++){const q=Math.max(0,travel-i*.045),x=source.x+dx*q,y=source.y+dy*q-Math.sin(q*Math.PI)*35;c.save();c.translate(x,y);c.rotate(p*10+i);rect(c,-5,-10,10,19,i%2?'#d2e89b':'#6ba85e');rect(c,0,-7,1,14,'#eff5b9');c.restore()}
  }else if(type==='Flame'){
   for(let i=14;i>=0;i--){const q=Math.max(0,travel-i*.018),x=source.x+dx*q,y=source.y+dy*q-Math.sin(q*Math.PI)*35,r=Math.max(2,16-i*.8);c.globalAlpha=1-i/17;sparkle(c,x,y,r,i<4?'#ffdf88':'#e77546');rect(c,x-3,y-8,6,13,'#fff1b5')}
   for(let i=0;i<9;i++){const q=Math.max(0,travel-i*.025);rect(c,source.x+dx*q,source.y+dy*q-20-Math.sin(i*4+p*20)*18,3,5,'#ffbc60')}
  }else if(type==='Water'){
   for(let i=0;i<12;i++){const q=Math.max(0,travel-i*.022),x=source.x+dx*q,y=source.y+dy*q+Math.sin(q*18-p*20)*9;c.globalAlpha=1-i/15;ring(x,y,18-i*.7,i%2?'#c7f5e4':'#5daec5',6);rect(c,x-5,y-5,10,10,'#a7e0df')}
  }else if(type==='Stone'){
   for(let i=0;i<5;i++){const q=Math.max(0,Math.min(1,(travel-i*.06)*1.3)),x=source.x+dx*q,y=source.y+dy*q-Math.sin(q*Math.PI)*(75+i*8);c.save();c.translate(x,y);c.rotate(q*7+i);rect(c,-10,-11,22,23,'#766b63');rect(c,-8,-12,15,17,'#bfaf8b');rect(c,-5,-10,7,4,'#f0dfb6');c.restore()}
  }else if(type==='Spark'){
   const endX=source.x+dx*travel,endY=source.y+dy*travel;
   const points=Array.from({length:15},(_,i)=>[source.x+(endX-source.x)*i/14,source.y+(endY-source.y)*i/14+(i===0||i===14?0:Math.sin(i*13+Math.floor(p*35))*22)]);
   line(points,'#b17f3b',12);line(points,'#f4d967',7);line(points,'#fff8cf',2);
   for(let i=3;i<13;i+=3){const [x,y]=points[i];line([[x,y],[x-direction*12,y-18],[x+direction*8,y-27]],'#fff0a1',3)}
  }else if(type==='Frost'){
   for(let i=0;i<7;i++){const q=Math.max(0,travel-i*.035),x=source.x+dx*q,y=source.y+dy*q+Math.sin(i*3+p*14)*16;c.save();c.translate(x,y);c.rotate(Math.atan2(dy,dx));c.fillStyle=i%2?'#eafffa':'#83cbd4';c.beginPath();c.moveTo(17,0);c.lineTo(-9,-7);c.lineTo(-4,0);c.lineTo(-9,7);c.closePath();c.fill();c.restore();sparkle(c,x-12*direction,y+10,3,'#d7f9f3')}
  }else if(type==='Shade'){
   for(let i=9;i>=0;i--){const q=Math.max(0,travel-i*.025),x=source.x+dx*q,y=source.y+dy*q+Math.sin(q*14-p*13)*20;c.globalAlpha=1-i/12;sparkle(c,x,y,18-i,'#675082');ring(x,y,19-i,'#c1a3d6',3)}
   c.globalAlpha=1;const x=source.x+dx*travel,y=source.y+dy*travel;rect(c,x-8,y-4,5,3,'#f8cfde');rect(c,x+4,y-4,5,3,'#f8cfde');
  }else if(type==='Star'){
   for(let i=12;i>=0;i--){const q=Math.max(0,travel-i*.018),x=source.x+dx*q,y=source.y+dy*q-Math.sin(q*Math.PI)*65;c.globalAlpha=1-i/14;sparkle(c,x,y,i===0?18:5,i%2?'#b4a6ed':'#ffe7aa')}
  }
 }
 if(impact>0){
  c.globalAlpha=Math.max(0,1-impact);
  ring(target.x,target.y+25,18+impact*90,color,4);
  for(let i=0;i<18;i++){
   const a=i*2.399,r=15+impact*(55+i%4*13),x=target.x+Math.cos(a)*r,y=target.y+Math.sin(a)*r*.65+impact*impact*32;
   if(type==='Water')ring(x,y,3+i%3,'#c7f7eb',2);
   else if(type==='Frost'||type==='Star')sparkle(c,x,y,3+i%3,color);
   else rect(c,x,y,4+i%4,4+i%3,i%2?color:'#fff0bd');
  }
  line([[target.x-direction*17,target.y+24],[target.x,target.y-20],[target.x+direction*12,target.y+7]],'#fff4d4',5);
 }
 c.restore();
}
