require('./check-search-completion.cjs');
const assert=require('node:assert/strict');
const {startVisibleAutoscroll}=require('../lib/visibleAutoscroll.ts');
let tick,observe,cleared=false,disconnected=false,moves=0,reduced=false;
class Observer { constructor(callback){observe=callback;} observe(){} disconnect(){disconnected=true;} }
global.IntersectionObserver=Observer;
global.window={IntersectionObserver:Observer,matchMedia:()=>({matches:reduced}),setInterval:(callback,delay)=>{tick=callback;assert.equal(delay,4500);return 1;},clearInterval:()=>{cleared=true;},innerHeight:800};
global.document={hidden:false};
const element={getBoundingClientRect:()=>({top:100,bottom:200})};
const cleanup=startVisibleAutoscroll(element,()=>moves++,4500);
tick();assert.equal(moves,0,'offscreen track does not move');
observe([{isIntersecting:true}]);tick();assert.equal(moves,1,'visible track still moves');
document.hidden=true;tick();assert.equal(moves,1,'hidden tab pauses');
document.hidden=false;observe([{isIntersecting:false}]);tick();assert.equal(moves,1,'leaving viewport pauses');
cleanup();assert.ok(cleared&&disconnected,'cleanup releases timer and observer');
reduced=true;tick=undefined;startVisibleAutoscroll(element,()=>moves++,4500);assert.equal(tick,undefined,'reduced-motion preference respected');
reduced=false;window.IntersectionObserver=undefined;const cleanupFallback=startVisibleAutoscroll({getBoundingClientRect:()=>({top:900,bottom:1000})},()=>moves++,4500);tick();assert.equal(moves,1,'unsupported-browser fallback skips offscreen tracks');cleanupFallback();
console.log('PASS: viewport-aware scrolling, hidden-tab pause, reduced-motion preference, cleanup and unsupported-browser fallback');
