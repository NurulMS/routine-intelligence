const workouts = {
  1:{title:"Monday / Tuesday",duration:"34 min", exercises:["Dumbbell Incline Bench Press","Dumbbell Incline Chest Flys","Dumbbell Single Arm Press","Dumbbell Russian Twist","Dumbbell Half Kneeling Wood Chopper","Bodyweight Feet Down Russian Twist","Dumbbell Glute Bridge","Dumbbell Goblet Squat","Dumbbell Goblet Lateral Lunge","Dumbbell Row Bilateral","Dumbbell Waiters Bow","Dumbbell Box Squat","Dumbbell Row Unilateral","Dumbbell Calf Raise"]},
  2:{title:"Monday / Tuesday",duration:"34 min", exercises:["Dumbbell Incline Bench Press","Dumbbell Incline Chest Flys","Dumbbell Single Arm Press","Dumbbell Russian Twist","Dumbbell Half Kneeling Wood Chopper","Bodyweight Feet Down Russian Twist","Dumbbell Glute Bridge","Dumbbell Goblet Squat","Dumbbell Goblet Lateral Lunge","Dumbbell Row Bilateral","Dumbbell Waiters Bow","Dumbbell Box Squat","Dumbbell Row Unilateral","Dumbbell Calf Raise"]},
  3:{title:"Wednesday / Thursday",duration:"30 min", exercises:["Dumbbell Russian Twist","Dumbbell Situp","Dumbbell Crunch","Dumbbell Lateral Raise","Dumbbell Front Raise","Dumbbell Alternating Arnold Press","Dumbbell Single Arm Neutral Overhead Press","Dumbbell Calf Raise","Dumbbell Row Unilateral","Dumbbell Row Bilateral","Dumbbell Incline Bench Press","Dumbbell Suitcase Crunch"]},
  4:{title:"Wednesday / Thursday",duration:"30 min", exercises:["Dumbbell Russian Twist","Dumbbell Situp","Dumbbell Crunch","Dumbbell Lateral Raise","Dumbbell Front Raise","Dumbbell Alternating Arnold Press","Dumbbell Single Arm Neutral Overhead Press","Dumbbell Calf Raise","Dumbbell Row Unilateral","Dumbbell Row Bilateral","Dumbbell Incline Bench Press","Dumbbell Suitcase Crunch"]},
  5:{title:"Friday",duration:"27 min", exercises:["Dumbbell Hip Thrust","Dumbbell Bulgarian Split Squat","Dumbbell Romanian Deadlift","Dumbbell Glute Bridge","Dumbbell Goblet Squat","Dumbbell Goblet Forward Lunge","Dumbbell Front Rack Squat","Dumbbell Cross Body Romanian Deadlift","Dumbbell Row Bilateral","Dumbbell Half Kneeling Romanian Deadlift","Dumbbell Half Kneeling Goblet Romanian Deadlift"]},
  6:{title:"Weekend / flexible",duration:"Rest or Pilates",exercises:[]},
  0:{title:"Weekend / flexible",duration:"Rest or Pilates",exercises:[]}
};
const today = new Date();
document.getElementById("dateLine").textContent = today.toLocaleDateString(undefined,{weekday:"long",month:"long",day:"numeric"});
const hour=today.getHours(); document.getElementById("greeting").textContent=hour<12?"Good morning":hour<18?"Good afternoon":"Good evening";
const workout=workouts[today.getDay()];
document.getElementById("workoutSummary").textContent=workout.title;
document.getElementById("workoutDuration").textContent=workout.duration;
document.getElementById("workoutCount").textContent=workout.exercises.length?`${workout.exercises.length} exercises`:"Flexible recovery";
document.getElementById("trainingTitle").textContent=workout.title;
document.getElementById("trainingStat").textContent=workout.duration;
const list=document.getElementById("exerciseList");
if(workout.exercises.length){workout.exercises.forEach((e,i)=>{const a=document.createElement("article");a.className="exercise";a.innerHTML=`<div class="num">${String(i+1).padStart(2,"0")}</div><div><strong>${e}</strong><p>Sets / reps / load remain unconfigured until you log them.</p></div>`;list.appendChild(a)})}
else list.innerHTML='<article class="focus-card"><h3>Flexible day</h3><p>Use this for rest, mobility or Pilates. V1 does not invent a session for you.</p></article>';

document.querySelectorAll(".tab").forEach(btn=>btn.onclick=()=>showPage(btn.dataset.page));
document.querySelectorAll("[data-jump]").forEach(btn=>btn.onclick=()=>showPage(btn.dataset.jump));
function showPage(id){document.querySelectorAll(".page").forEach(p=>p.classList.toggle("active",p.id===id));document.querySelectorAll(".tab").forEach(t=>t.classList.toggle("active",t.dataset.page===id));window.scrollTo({top:0,behavior:"smooth"})}

const key="routine-intelligence-"+today.toISOString().slice(0,10);
let state=JSON.parse(localStorage.getItem(key)||'{"tasks":{},"study":0}');
function render(){
  document.querySelectorAll(".flow-card").forEach(card=>{
    const done=!!state.tasks[card.dataset.task];card.classList.toggle("done",done);
    const b=card.querySelector(".complete-btn"); if(b)b.textContent=done?"✓ Completed":"Mark complete";
  });
  const done=Object.values(state.tasks).filter(Boolean).length, pct=Math.round(done/4*100);
  document.getElementById("todayProgress").textContent=pct+"%";document.getElementById("metricToday").textContent=pct+"%";
  document.getElementById("studyBar").style.width=Math.min(state.study/5*100,100)+"%";
  document.getElementById("studyText").textContent=`${state.study} of 5 focus sessions completed`;document.getElementById("metricStudy").textContent=`${state.study}/5`;
  localStorage.setItem(key,JSON.stringify(state));
}
document.querySelectorAll(".complete-btn").forEach(b=>b.onclick=()=>{const task=b.closest(".flow-card").dataset.task;state.tasks[task]=!state.tasks[task];render()});
document.getElementById("studyDone").onclick=()=>{if(state.study<5)state.study++;render()};
document.getElementById("resetBtn").onclick=()=>{if(confirm("Reset today's check-ins?")){state={tasks:{},study:0};render()}};
render();
