const $=id=>document.getElementById(id);let currentPage="home",format="T20",matchType="AI",teamIndex=0,match={runs:0,wickets:0,balls:0,started:false,matches:0,boundaries:0};const teams=[{name:"INDIA",flag:"🇮🇳",bat:87,bowl:84},{name:"AUSTRALIA",flag:"🇦🇺",bat:85,bowl:86},{name:"ENGLAND",flag:"🏴",bat:84,bowl:83},{name:"SOUTH AFRICA",flag:"🇿🇦",bat:82,bowl:87},{name:"NEW ZEALAND",flag:"🇳🇿",bat:81,bowl:84},{name:"PAKISTAN",flag:"🇵🇰",bat:83,bowl:86},{name:"SRI LANKA",flag:"🇱🇰",bat:80,bowl:81},{name:"WEST INDIES",flag:"🏝️",bat:85,bowl:78}];
function toast(msg){const t=$("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2400)}
function go(page){document.querySelectorAll(".page").forEach(p=>p.classList.remove("active-page"));const target=$(page);if(target)target.classList.add("active-page");else{$("home").classList.add("active-page");page="home"}document.querySelectorAll(".nav button").forEach(b=>b.classList.toggle("active",b.dataset.page===page));currentPage=page;window.scrollTo({top:0,behavior:"smooth"})}
document.querySelectorAll("[data-page]").forEach(b=>b.onclick=()=>go(b.dataset.page));document.querySelectorAll("[data-go]").forEach(b=>b.onclick=()=>go(b.dataset.go));
document.querySelectorAll("[data-launch-page]").forEach(b=>b.addEventListener("click",()=>go(b.dataset.launchPage)));
document.querySelectorAll("[data-launch-format]").forEach(b=>b.addEventListener("click",()=>{const f=b.dataset.launchFormat;go("modes");const target=document.querySelector(`[data-format="${f}"]`);if(target)target.click();}));document.querySelectorAll(".hub").forEach(b=>b.onclick=()=>go(b.dataset.go));
document.querySelectorAll("[data-format]").forEach(b=>b.onclick=()=>{format=b.dataset.format;document.querySelectorAll("[data-format]").forEach(x=>x.classList.toggle("selected",x===b));const labels={T20:"T20 · 20 overs",T20I:"T20 International · 20 overs",BIHAR:"Bihar League mode",IPL:"IPL-style T20 league · 20 overs",ODI:"ODI · 50 overs",TEST:"Test cricket · multi-day",T10:"T10 · 10 overs",HUNDRED:"The Hundred · 100 balls",FIRST_CLASS:"First-Class · multi-day",QUICK:"Quick match · 2 overs"};toast(labels[format]+" selected. This prototype simulates a short demo innings.")});
document.querySelectorAll("[data-type]").forEach(b=>b.onclick=()=>{matchType=b.dataset.type;document.querySelectorAll("[data-type]").forEach(x=>x.classList.toggle("selected",x===b));if(matchType==="ONLINE")toast("Online multiplayer needs a server; preview only.");});
function showTeams(){const a=teams[teamIndex%teams.length],b=teams[(teamIndex+1)%teams.length];$("flag1").textContent=a.flag;$("team1").textContent=a.name;$("team2").textContent=b.name;$("flag2").textContent=b.flag;document.querySelector(".team-card .rating").textContent=`BAT ${a.bat} · BOWL ${a.bowl}`;document.querySelectorAll(".team-card .rating")[1].textContent=`BAT ${b.bat} · BOWL ${b.bowl}`;$("balance").textContent=Math.round((a.bat+a.bowl)/2)+"%";document.querySelector(".bar i").style.width=Math.round((a.bat+a.bowl)/2)+"%"}
$("prevTeam").onclick=()=>{teamIndex=(teamIndex+teams.length-1)%teams.length;showTeams()};$("nextTeam").onclick=()=>{teamIndex=(teamIndex+1)%teams.length;showTeams()};showTeams();
$("startGame").onclick=()=>{if(matchType==="ONLINE"){toast("Online play is not connected yet. Starting local demo instead.");}match={runs:0,wickets:0,balls:0,started:true,matches:match.matches,boundaries:match.boundaries};$("matchView").classList.remove("hidden");$("battingName").textContent=teams[teamIndex%teams.length].name;$("matchCommentary").textContent=`Welcome to CricketVerse! ${teams[teamIndex%teams.length].name} are ready to bat. Choose a shot.`;updateScore();$("matchView").scrollIntoView({behavior:"smooth",block:"start"});};
$("closeMatch").onclick=()=>$("matchView").classList.add("hidden");
function updateScore(){$("runs").textContent=match.runs;$("wickets").textContent=match.wickets;$("overs").textContent=`${Math.floor(match.balls/6)}.${match.balls%6}`;$("statMatches").textContent=match.matches;$("statRuns").textContent=match.runs;$("statWickets").textContent=match.wickets;$("statBoundaries").textContent=match.boundaries}
function delivery(shot){if(!match.started){toast("Start a match first.");return}if(match.balls>=12||match.wickets>=3){$("matchCommentary").textContent=`Innings complete! Final score: ${match.runs}/${match.wickets}. Start a new match to play again.`;match.started=false;match.matches++;updateScore();return}let choices=shot==="DEFEND"?[0,0,1,1,2,"W"]:shot==="DRIVE"?[0,1,2,3,4,4,"W"]:shot==="LOFT"?[0,2,4,4,6,"W","W"]:shot==="SWEEP"?[0,1,2,4,4,"W"]:[0,1,2,4];let r=choices[Math.floor(Math.random()*choices.length)];match.balls++;let en,hi;if(r==="W"){match.wickets++;en="OUT! The batter has lost the wicket.";hi="आउट! बल्लेबाज़ का विकेट गिर गया।"}else{match.runs+=r;if(r===4||r===6)match.boundaries++;en=r===6?"SIX! That is a magnificent hit over the boundary!":r===4?"FOUR! Beautifully timed and it races away!":r===0?"Dot ball. The bowler wins this delivery.":`${r} run${r>1?"s":""}. Good running between the wickets.`;hi=r===6?"छक्का! शानदार शॉट, गेंद सीमा रेखा के पार!":r===4?"चौका! बेहतरीन टाइमिंग के साथ गेंद बाउंड्री पार!":r===0?"कोई रन नहीं। गेंदबाज़ ने यह गेंद जीत ली।":`${r} रन लिए गए। विकेटों के बीच अच्छी दौड़।`;}$("lastBall").textContent=r==="W"?"WICKET":String(r);$("matchCommentary").textContent=en+" / "+hi;$("ball").style.left=(35+Math.random()*35)+"%";$("ball").style.top=(20+Math.random()*55)+"%";updateScore();if(match.balls>=12||match.wickets>=3){match.started=false;match.matches++;$("matchCommentary").textContent+=` Innings complete: ${match.runs}/${match.wickets}. / पारी समाप्त: ${match.runs}/${match.wickets}.`;updateScore()}}
document.querySelectorAll("[data-shot]").forEach(b=>b.onclick=()=>delivery(b.dataset.shot));$("nextDelivery").onclick=()=>delivery(["DEFEND","DRIVE","LOFT","SWEEP"][Math.floor(Math.random()*4)]);
document.querySelectorAll("[data-action]").forEach(b=>b.onclick=()=>toast(b.dataset.action==="room"?"Private rooms will be available when the multiplayer server is added.":b.dataset.action==="tournament"?"Tournament brackets are a UI preview for the next development phase.":"This feature is a UI preview; online services are not connected yet."));
document.querySelectorAll("[data-buy]").forEach(b=>b.onclick=()=>toast(`${b.dataset.buy}: demo item only. No real purchase is made.`));

// Gameplay controls inspired by the supplied batting/bowling gameplay video.
let activeRole="batting";
document.querySelectorAll("[data-role]").forEach(btn=>btn.addEventListener("click",()=>{
 activeRole=btn.dataset.role;
 document.querySelectorAll("[data-role]").forEach(x=>x.classList.toggle("selected",x===btn));
 document.querySelectorAll("[data-shot]").forEach(x=>x.disabled=activeRole!=="batting");
 $("bowlingPanel").classList.toggle("hidden",activeRole!=="bowling");
 $("fieldingPanel").classList.toggle("hidden",activeRole!=="fielding");
 $("matchCommentary").textContent=activeRole==="bowling"?"Bowling setup: choose delivery, line, length and power, then bowl. / गेंद चुनें, लाइन-लेंथ सेट करें और गेंद डालें।":activeRole==="fielding"?"Fielding controls ready: choose a position and action. / फील्डिंग पोज़िशन और एक्शन चुनें।":"Batting controls ready: choose a shot and time it. / बल्लेबाज़ी के लिए शॉट चुनें और सही टाइमिंग रखें।";
}));
$("bowlDelivery").onclick=()=>{
 if(!match.started){toast("Start a match first.");return}
 const type=$("deliveryType").value,line=$("lineChoice").value,length=$("lengthChoice").value,power=$("powerChoice").value;
 $("matchCommentary").textContent=`${type} delivery · ${line} · ${length} · power ${power}%. Bowling controls preview; AI batting outcome is simulated. / ${type} गेंद · ${line} · ${length} · पावर ${power}%.`;
 $("timingText").textContent="DELIVERY RELEASED";$("timingFill").style.width=power+"%";
 delivery(["DEFEND","DRIVE","LOFT","SWEEP"][Math.floor(Math.random()*4)]);
};
document.querySelectorAll("[data-shot]").forEach(btn=>btn.addEventListener("click",()=>{
 $("timingText").textContent="SHOT PLAYED · TIMING SIMULATED";
 $("timingFill").style.width=(35+Math.floor(Math.random()*60))+"%";
 $("hudBall").style.left=(20+Math.random()*60)+"%";
}));

$("fieldActionBtn").onclick=()=>{
 if(!match.started){toast("Start a match first.");return}
 const pos=$("fieldPosition").value,act=$("fieldAction").value,dir=$("fieldDirection").value;
 $("timingText").textContent=act;$("timingFill").style.width=(35+Math.floor(Math.random()*60))+"%";
 $("hudBall").style.left=(15+Math.random()*70)+"%";$("hudBall").style.top=(15+Math.random()*65)+"%";
 const en=`Fielding action: ${act} at ${pos}, moving ${dir.toLowerCase()}. Fielding result is simulated in this prototype.`;
 const hi=`फील्डिंग एक्शन: ${pos} पर ${act} — ${dir} दिशा में। इस प्रोटोटाइप में परिणाम सिम्युलेटेड है।`;
 $("matchCommentary").textContent=en+" / "+hi;toast("Fielding action preview played.");
};

// Community and future-roadmap prototype. Reviews stay in this browser only.
const reviewForm=document.getElementById('reviewForm');
function renderReviews(){const host=document.getElementById('reviewList');if(!host)return;let items=[];try{items=JSON.parse(localStorage.getItem('cv_demo_reviews')||'[]')}catch(e){}host.innerHTML=items.slice().reverse().map(r=>`<article><b>${'★'.repeat(Number(r.rating)||0)}${'☆'.repeat(5-(Number(r.rating)||0))} · ${escapeReview(r.kind)}</b><p>${escapeReview(r.text)}</p><small>${escapeReview(r.name||'Anonymous player')} · Local demo review</small></article>`).join('')||'<article><b>No reviews yet</b><p>Be the first to leave feedback in this browser.</p></article>'}
function escapeReview(value){return String(value||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
if(reviewForm){reviewForm.addEventListener('submit',e=>{e.preventDefault();const item={name:document.getElementById('reviewName').value.trim(),rating:document.getElementById('reviewRating').value,kind:document.getElementById('reviewKind').value,text:document.getElementById('reviewText').value.trim(),date:new Date().toISOString()};if(!item.text){toast('Please write a review first.');return}try{const items=JSON.parse(localStorage.getItem('cv_demo_reviews')||'[]');items.push(item);localStorage.setItem('cv_demo_reviews',JSON.stringify(items.slice(-30)));renderReviews();reviewForm.reset();toast('Feedback saved in this browser only.')}catch(err){toast('Browser storage unavailable; feedback was not saved.')}})}
renderReviews();

// Open the interactive site from the cinematic splash screen.
const launchScreen=document.getElementById('launchScreen');
const enterButton=document.getElementById('enterCricketVerse');
if(launchScreen && enterButton){enterButton.addEventListener('click',()=>{launchScreen.classList.add('dismissed');document.body.style.overflow='';});document.body.style.overflow='hidden';}
