const MATH_KEY='learning-garden-math-v1';
function defaultMath(p){return p.id==='three'?{add:true,subtract:true,multiply:true,divide:false,max:99,multiplyMax:10,length:15,missing:true}:{add:true,subtract:true,multiply:false,divide:false,max:9,multiplyMax:10,length:15,missing:true}}
function mathConfig(p){return {...defaultMath(p),...(p.math||{})}}
const symbols={add:'+',subtract:'−',multiply:'×',divide:'÷'};
function rand(min,max){return Math.floor(Math.random()*(max-min+1))+min}
function makeQuestion(op,c,missing){let a,b,result;
 if(op==='add'){a=rand(c.max>9?10:0,c.max);b=rand(c.max>9?10:0,c.max);result=a+b}
 if(op==='subtract'){a=rand(c.max>9?10:0,c.max);b=rand(c.max>9?10:0,c.max);if(b>a)[a,b]=[b,a];result=a-b}
 if(op==='multiply'){a=rand(0,c.multiplyMax);b=rand(0,c.multiplyMax);result=a*b}
 if(op==='divide'){b=rand(1,c.multiplyMax);result=rand(0,c.multiplyMax);a=b*result}
 let blank=missing?rand(0,1):2;
 return {op,a,b,result,blank,answer:[a,b,result][blank],key:`${op}:${a}:${b}:${blank}`}}
function generateRound(c,previous=new Set()){let ops=['add','subtract','multiply','divide'].filter(o=>c[o]);if(!ops.length)ops=['add'];let count=c.length||15,questions=[],seen=new Set();let order=Array.from({length:count},(_,i)=>ops[i%ops.length]).sort(()=>Math.random()-.5);
 for(let i=0;i<count;i++){let q;for(let attempt=0;attempt<500;attempt++){let isMissing=c.missing&&i%5===2;q=makeQuestion(order[i],c,isMissing);if(!seen.has(q.key)&&!previous.has(q.key))break}if(seen.has(q.key)||previous.has(q.key)){for(let attempt=0;attempt<500;attempt++){q=makeQuestion(order[i],c,false);if(!seen.has(q.key))break}}seen.add(q.key);questions.push(q)}return questions}
