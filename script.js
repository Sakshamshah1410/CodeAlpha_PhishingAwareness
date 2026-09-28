const pages=[["home","Home"],["recognize","Recognize"],["tactics","Tactics"],["examples","Examples"],["protect","Protect"],["quiz","Quiz"]];
const nav=document.getElementById("nav");
pages.forEach(([id,l])=>{const b=document.createElement("button");b.textContent=l;b.dataset.go=id;nav.appendChild(b)});
function show(id){
  if(!pages.some(p=>p[0]===id))id="home";
  document.querySelectorAll("section").forEach(s=>s.classList.toggle("on",s.id===id));
  nav.querySelectorAll("button").forEach(b=>b.toggleAttribute("aria-current",b.dataset.go===id)||b.removeAttribute("aria-current"));
  nav.querySelectorAll("button").forEach(b=>{if(b.dataset.go===id)b.setAttribute("aria-current","page")});
  window.scrollTo(0,0);
}
document.addEventListener("click",e=>{const g=e.target.closest("[data-go]");if(g){location.hash=g.dataset.go}});
window.addEventListener("hashchange",()=>show(location.hash.slice(1)));
show(location.hash.slice(1));

const notes=[
"Fake sender: the domain 'paypal-payrol1.com' has a number 1 in place of an 'l', and payroll would not use a PayPal domain.",
"Pressure: an artificial two-hour deadline is meant to rush you.",
"Generic greeting: your employer would know your name.",
"Threat: the consequence is meant to scare you into acting before you verify.",
"Suspicious link: hover before clicking. It would lead to a look-alike login page that captures your password.",
"Dangerous attachment: a double extension like .html.exe hides a program. Never open unexpected files."];
document.querySelectorAll(".flag").forEach(b=>b.addEventListener("click",()=>{
  document.getElementById("note").textContent=notes[b.dataset.f];b.classList.add("seen")}));

const Q=[
{q:"Which domain is the real Microsoft login?",o:["microsoft.com-secure.net/login","login.microsoft.com","rnicrosoft.com/login"],a:1,w:"The real domain is what comes before the first single slash, read right to left. Only login.microsoft.com belongs to microsoft.com."},
{q:"A padlock and HTTPS appear on a page. What does that prove?",o:["The site is legitimate","The connection is encrypted","The site is owned by a trusted company"],a:1,w:"HTTPS only encrypts the connection. Phishing sites use it too."},
{q:"Your 'CEO' emails asking you to buy gift cards now and keep it quiet. Best response?",o:["Buy them, it is urgent","Reply asking for the card codes to be sent later","Verify by calling the CEO on a known number, and report it"],a:2,w:"Urgency, secrecy and unusual payment methods are classic business email compromise signs. Verify on a separate channel."},
{q:"Which tactic is 'MFA fatigue'?",o:["Sending constant approval prompts until you accept","Guessing your password","Stealing your phone"],a:0,w:"Attackers with a stolen password spam approval requests hoping you tap Accept. Deny and report unexpected prompts."},
{q:"A text says a parcel is held and asks you to pay a small fee via a link. You do not recall ordering. What now?",o:["Pay, it is only a small fee","Ignore the link and check the courier's official app or site","Reply STOP"],a:1,w:"Small-fee parcel texts (smishing) harvest card details. Replying can also confirm your number is active."},
{q:"You entered your password on a page you now doubt. First step?",o:["Wait and see","Change that password from a clean device, enable MFA and report it","Delete the email and say nothing"],a:1,w:"Act fast: change the password (and anywhere it is reused), enable MFA and notify IT. Silence gives attackers time."}];
let i=0,score=0,done=false;
const box=document.getElementById("qbox"),prog=document.getElementById("prog");
function render(){
  prog.style.width=(i/Q.length*100)+"%";
  if(i>=Q.length){
    const msg=score>=5?"Excellent. You have a sharp eye.":score>=3?"Good start. Review the Recognize and Tactics pages.":"Worth another look. Start again from the Recognize page.";
    box.innerHTML=`<div class="card ${score>=4?"good":"bad"}"><h3>You scored ${score} of ${Q.length}</h3><p>${msg}</p></div><button class="btn" id="again">Retake quiz</button><button class="btn alt" data-go="protect">Review best practices</button>`;
    document.getElementById("again").onclick=()=>{i=0;score=0;render()};return}
  const q=Q[i];done=false;
  box.innerHTML=`<p><b>Question ${i+1} of ${Q.length}</b></p><h3 style="margin-top:0">${q.q}</h3><div id="opts"></div><div id="fb" role="status"></div>`;
  q.o.forEach((t,k)=>{const b=document.createElement("button");b.className="opt";b.textContent=t;b.onclick=()=>pick(k,b);document.getElementById("opts").appendChild(b)});
}
function pick(k,b){
  if(done)return;done=true;const q=Q[i];
  const bs=document.querySelectorAll(".opt");
  bs[q.a].classList.add("right");if(k!==q.a)b.classList.add("wrong");else score++;
  document.getElementById("fb").innerHTML=`<div class="card ${k===q.a?"good":"bad"}"><b>${k===q.a?"Correct.":"Not quite."}</b> ${q.w}</div><button class="btn" id="next">${i===Q.length-1?"See score":"Next question"}</button>`;
  document.getElementById("next").onclick=()=>{i++;render()};
}
render();