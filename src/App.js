import { useState, useEffect, useCallback } from "react";

const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap";
document.head.appendChild(fontLink);

// ── Icons ─────────────────────────────────────────────────────────────────────
const Icon = ({ name, size = 20, color = "currentColor", strokeWidth = 1.75 }) => {
  const p = {
    today: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
    schedule: <><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>,
    meals: <><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></>,
    progress: <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></>,
    check: <polyline points="20 6 9 17 4 12"/>,
    chevronDown: <polyline points="6 9 12 15 18 9"/>,
    chevronUp: <polyline points="18 15 12 9 6 15"/>,
    flame: <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>,
    bell: <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></>,
    zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>,
    plus: <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    minus: <line x1="5" y1="12" x2="19" y2="12"/>,
    trash: <><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></>,
    phone: <><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></>,
    refresh: <><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></>,
    edit: <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></>,
    user: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
    target: <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>,
    droplet: <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {p[name]}
    </svg>
  );
};

// ── Quotes ────────────────────────────────────────────────────────────────────
const QUOTES = [
  { text: "Go to the f**king gym.", author: "David Goggins" },
  { text: "Who's gonna carry the boats?", author: "David Goggins" },
  { text: "You can't cheat the grind.", author: "David Goggins" },
  { text: "Stay hard.", author: "David Goggins" },
  { text: "Don't stop when you're tired. Stop when you're done.", author: "David Goggins" },
  { text: "Discipline equals freedom.", author: "Jocko Willink" },
  { text: "Get comfortable being uncomfortable.", author: "Jocko Willink" },
  { text: "The only easy day was yesterday.", author: "US Navy SEALs" },
  { text: "Suffer now and live the rest of your life as a champion.", author: "Muhammad Ali" },
  { text: "Pain is temporary. Quitting lasts forever.", author: "Lance Armstrong" },
  { text: "You didn't wake up to be mediocre.", author: "Unknown" },
  { text: "Your future self is watching you right now.", author: "Unknown" },
  { text: "Make yourself proud.", author: "Unknown" },
  { text: "No one is coming to save you. Get up.", author: "Unknown" },
  { text: "Do something today your future self will thank you for.", author: "Unknown" },
  { text: "It never gets easier, you just get better.", author: "Unknown" },
  { text: "Be the dad your kids think you are.", author: "Unknown" },
  { text: "Your kids are watching. Show them how it's done.", author: "Unknown" },
  { text: "The clock is ticking. Are you becoming the person you want to be?", author: "Greg Plitt" },
  { text: "Don't wish for it. Work for it.", author: "Unknown" },
];

function QuoteBanner() {
  const q = QUOTES[Math.floor(Date.now() / 86400000) % QUOTES.length];
  return (
    <div style={{ background: "var(--surface)", borderRadius: 14, padding: "14px 16px", marginBottom: 12, border: "1px solid var(--border)", borderLeft: "3px solid var(--accent)" }}>
      <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.5 }}>"{q.text}"</div>
      <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 1.5, color: "var(--muted)", marginTop: 6 }}>— {q.author.toUpperCase()}</div>
    </div>
  );
}

// ── Fitness Level from BMI ─────────────────────────────────────────────────────
function getFitnessLevel(weight, height) {
  const bmi = weight / ((height / 100) ** 2);
  if (bmi >= 35) return "beginner";
  if (bmi >= 28) return "intermediate";
  return "active";
}

// ── Personalised Workout Data ─────────────────────────────────────────────────
function buildDays(profile) {
  const level = getFitnessLevel(profile.startWeight, profile.height || 175);

  const upper = {
    beginner: [
      { name: "Wall Push-ups", sets: "3 × 10", note: "Easier on joints — progress to floor push-ups over time" },
      { name: "Dumbbell Shoulder Press", sets: "3 × 10", note: "Seated, light weight" },
      { name: "Band Rows", sets: "3 × 12", note: "Anchor band to door, focus on squeezing shoulder blades" },
      { name: "Dumbbell Bicep Curls", sets: "3 × 10", note: "Slow on the way down" },
      { name: "Tricep Band Pushdowns", sets: "3 × 12", note: "Keep elbows tucked" },
    ],
    intermediate: [
      { name: "Push-ups", sets: "4 × 10", note: "Knees ok to start" },
      { name: "Dumbbell Shoulder Press", sets: "3 × 12", note: "Seated or standing" },
      { name: "Band Rows", sets: "4 × 12", note: "Anchor band to door" },
      { name: "Dumbbell Bicep Curls", sets: "3 × 10", note: "Slow on the way down" },
      { name: "Tricep Band Pushdowns", sets: "3 × 12", note: "" },
    ],
    active: [
      { name: "Push-ups", sets: "4 × 15", note: "Add a weighted vest if too easy" },
      { name: "Dumbbell Shoulder Press", sets: "4 × 12", note: "Standing, heavier weight" },
      { name: "Band Rows", sets: "4 × 15", note: "Increase band resistance" },
      { name: "Dumbbell Bicep Curls", sets: "4 × 12", note: "Superset with triceps" },
      { name: "Tricep Dips", sets: "4 × 12", note: "Use a sturdy chair" },
    ],
  };

  const lower = {
    beginner: [
      { name: "Bodyweight Squats", sets: "3 × 10", note: "Hold a wall for balance if needed" },
      { name: "Glute Bridges", sets: "3 × 15", note: "Lie on floor, press hips up" },
      { name: "Step-ups", sets: "3 × 8 each leg", note: "Use a low step or stair" },
      { name: "Seated Leg Extensions", sets: "3 × 12", note: "Use a resistance band" },
      { name: "Band Lateral Walks", sets: "3 × 10 each way", note: "Band around ankles, stay low" },
    ],
    intermediate: [
      { name: "Goblet Squats", sets: "4 × 12", note: "Hold one dumbbell at chest" },
      { name: "Romanian Deadlifts", sets: "4 × 10", note: "Hinge at hips, soft knees" },
      { name: "Dumbbell Lunges", sets: "3 × 10 each", note: "Alternate legs" },
      { name: "Glute Bridges", sets: "3 × 15", note: "Add dumbbell on hips for challenge" },
      { name: "Band Lateral Walks", sets: "3 × 12 each way", note: "Band around ankles" },
    ],
    active: [
      { name: "Goblet Squats", sets: "4 × 15", note: "Heavy dumbbell, full depth" },
      { name: "Romanian Deadlifts", sets: "4 × 12", note: "Challenge the weight each week" },
      { name: "Walking Lunges", sets: "3 × 12 each", note: "Add dumbbells for resistance" },
      { name: "Single-leg Glute Bridge", sets: "3 × 12 each", note: "Full hip extension at top" },
      { name: "Jump Squats", sets: "3 × 10", note: "Land softly, control the descent" },
    ],
  };

  const fullBody = {
    beginner: [
      { name: "Bodyweight Squat to Press", sets: "3 × 8", note: "Light dumbbells, or just bodyweight" },
      { name: "Incline Push-ups", sets: "3 × 10", note: "Hands on bench or step" },
      { name: "Band Deadlifts", sets: "3 × 10", note: "Stand on band, slow and controlled" },
      { name: "Marching in Place", sets: "3 × 30 sec", note: "High knees, keep core tight" },
      { name: "Seated Band Rows", sets: "3 × 12", note: "Sit on floor, band around feet" },
    ],
    intermediate: [
      { name: "Squat to Press", sets: "4 × 10", note: "Squat down, press up as you stand" },
      { name: "Push-ups", sets: "4 × 10", note: "" },
      { name: "Band Deadlifts", sets: "4 × 12", note: "Stand on band, hinge and pull" },
      { name: "Mountain Climbers", sets: "3 × 20 sec", note: "Core focus" },
      { name: "Renegade Row", sets: "3 × 8 each", note: "Plank position, row each arm" },
    ],
    active: [
      { name: "Dumbbell Thruster", sets: "4 × 12", note: "Squat to overhead press in one fluid movement" },
      { name: "Decline Push-ups", sets: "4 × 12", note: "Feet elevated on a chair" },
      { name: "Dumbbell Deadlifts", sets: "4 × 12", note: "Full hip hinge, heavy" },
      { name: "Burpees", sets: "3 × 8", note: "Full range, control the landing" },
      { name: "Renegade Row", sets: "4 × 10 each", note: "Heavier dumbbells" },
    ],
  };

  const l = level;
  return [
    { day: "Monday", short: "MON", type: "workout", label: "Upper Body", time: "6:00 – 6:25am", tag: "STRENGTH", ai: 0,
      warmup: "3 min — arm circles, shoulder rolls, jumping jacks", cooldown: "2 min — chest stretch, band pull-apart",
      exercises: upper[l] },
    { day: "Tuesday", short: "TUE", type: "rest", label: "Active Rest", time: "Lunch walk", tag: "REST", ai: 1, note: "10–15 min walk at lunch. Drink extra water." },
    { day: "Wednesday", short: "WED", type: "workout", label: "Lower Body", time: "6:00 – 6:25am", tag: "STRENGTH", ai: 0,
      warmup: "3 min — leg swings, hip circles, bodyweight squats", cooldown: "2 min — hip flexor stretch, hamstring stretch",
      exercises: lower[l] },
    { day: "Thursday", short: "THU", type: "rest", label: "Rest Day", time: "Full recovery", tag: "REST", ai: 1, note: "Muscles grow on rest days. Prioritise sleep." },
    { day: "Friday", short: "FRI", type: "workout", label: "Full Body", time: "6:00 – 6:25am", tag: "CIRCUIT", ai: 2,
      warmup: "3 min — light jog in place, full body circles", cooldown: "2 min — child's pose, deep breathing",
      exercises: fullBody[l] },
    { day: "Saturday", short: "SAT", type: "workout", label: "Family Walk + Core", time: "Morning with the boys", tag: "CARDIO", ai: 3,
      warmup: "The walk IS the warmup", cooldown: "2 min — lower back stretch, seated twist",
      exercises: [
        { name: "Family Walk / Park Run", sets: l === "beginner" ? "20–30 min" : l === "intermediate" ? "30–45 min" : "45–60 min", note: "Push the pram — extra resistance!" },
        { name: "Plank Hold", sets: l === "beginner" ? "3 × 15 sec" : l === "intermediate" ? "3 × 30 sec" : "3 × 45 sec", note: "Build time each week" },
        { name: "Dead Bug", sets: "3 × 10 each side", note: "Great for lower back" },
        { name: "Russian Twists", sets: "3 × 15", note: "Light weight, focus on rotation" },
      ]},
    { day: "Sunday", short: "SUN", type: "rest", label: "Full Rest", time: "Family day", tag: "REST", ai: 1, note: "Recharge. Church, family time, a good meal." },
  ];
}

// ── Personalised Meals ────────────────────────────────────────────────────────
function buildMeals(plan) {
  const cal = plan.targetCal;
  const isLowCal = cal < 1600;
  return [
    { meal: "Breakfast", time: "7:00am", goal: "High protein, quick prep", pct: 0.24,
      ideas: isLowCal
        ? ["2 scrambled eggs + 1 slice wholegrain toast", "Overnight oats (½ cup oats) + frozen berries", "Plain yogurt (½ cup) + banana + chia seeds"]
        : ["3 scrambled eggs + wholegrain toast + avocado", "Greek yoghurt + banana + almonds + oats", "Oats with protein powder + berries + peanut butter"],
      avoid: "Cereal, muesli bars, toast with jam only, flavoured yogurts" },
    { meal: "Morning Tea", time: "10:00am", goal: "Keep hunger at bay", pct: 0.10,
      ideas: isLowCal
        ? ["Apple or banana", "Boiled egg", "Black coffee or herbal tea"]
        : ["Apple + 1 tbsp peanut butter", "Boiled egg + rice crackers", "Black coffee or tea"],
      avoid: "Biscuits, chips, sugary drinks" },
    { meal: "Lunch", time: "12:30pm", goal: "Big, filling, protein-forward", pct: 0.30,
      ideas: isLowCal
        ? ["Tuna + brown rice + cucumber bowl", "Lentil & veg soup + wholegrain bread", "Chickpea & spinach stew"]
        : ["Chicken + brown rice + salad", "Tuna wrap with spinach + tomato", "Lentil soup + wholegrain roll"],
      avoid: "Meal deals with chips, white bread, creamy sauces" },
    { meal: "Afternoon Tea", time: "3:30pm", goal: "Bridge to dinner", pct: 0.10,
      ideas: isLowCal
        ? ["Carrot sticks + hummus", "Small banana", "Plain yogurt (¼ cup)"]
        : ["Piece of fruit + small handful of nuts", "Hummus + veggie sticks", "Protein shake if you trained"],
      avoid: "Don't skip — you'll overeat at dinner" },
    { meal: "Dinner", time: "6:00pm", goal: "Family meal, watch portions", pct: 0.36,
      ideas: isLowCal
        ? ["Baked chicken thigh + roasted veg + small serve brown rice", "Lentil dahl + ½ cup brown rice", "Egg & veg frittata + side salad"]
        : ["Protein + lots of veggies + small carbs", "Stir-fry with lean meat over brown rice", "Bolognese with lentils — less mince, more veg"],
      avoid: "Seconds, kids' leftovers, large desserts" },
  ];
}

const ACCENTS = ["#C8FF00", "#FF6B35", "#00D4FF", "#FF3B6B"];
const ACCENT = "#C8FF00";

// ── Storage ───────────────────────────────────────────────────────────────────
const store = {
  get: (k, fb = null) => { try { const v = localStorage.getItem(k); return v !== null ? JSON.parse(v) : fb; } catch { return fb; } },
  set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};

function todayKey() { return new Date().toISOString().slice(0, 10); }
function dayIdxToSchedule(jsDay) { return jsDay === 0 ? 6 : jsDay - 1; }

function nextFireTs(h, m) {
  const now = new Date();
  const t = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m, 0, 0);
  if (t.getTime() <= now.getTime()) t.setDate(t.getDate() + 1);
  return t.getTime();
}

async function requestNotifPerm() {
  if (!("Notification" in window)) return "unsupported";
  if (Notification.permission === "granted") return "granted";
  return await Notification.requestPermission();
}

async function sendAlarmsToSW(alarms) {
  try {
    const reg = await navigator.serviceWorker.ready;
    reg.active?.postMessage({ type: "SET_ALARMS", payload: alarms });
  } catch (e) { console.warn("SW alarm error", e); }
}

async function clearSWAlarms() {
  try {
    const reg = await navigator.serviceWorker.ready;
    reg.active?.postMessage({ type: "CLEAR_ALARMS" });
  } catch {}
}

// ── Plan Calculations (uses real height & age) ─────────────────────────────────
function calcPlan(profile) {
  const { startWeight, goalWeight, weeklyGoal, height = 175, age = 35 } = profile;
  const tolose = startWeight - goalWeight;
  const weeks = Math.round(tolose / weeklyGoal);
  // Mifflin-St Jeor for males (most accurate for weight loss)
  const bmr = (10 * startWeight) + (6.25 * height) - (5 * age) + 5;
  const tdee = Math.round(bmr * 1.375); // lightly active
  const dailyDeficit = Math.round((weeklyGoal * 7700) / 7);
  const targetCal = Math.max(1500, tdee - dailyDeficit);
  const proteinG = Math.round(startWeight * 1.8); // 1.8g/kg for weight loss + muscle retention
  const bmi = startWeight / ((height / 100) ** 2);
  const fitnessLevel = getFitnessLevel(startWeight, height);
  return { tolose, weeks, tdee, targetCal, proteinG, dailyDeficit, bmi: bmi.toFixed(1), fitnessLevel };
}

// ── Onboarding ────────────────────────────────────────────────────────────────
const iStyle = { width: "100%", padding: "14px 16px", borderRadius: 12, border: "1.5px solid var(--border)", background: "var(--surface2)", color: "var(--text)", fontSize: 16, outline: "none", fontFamily: "var(--font)" };
const lStyle = { fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 2, color: "var(--muted)", marginBottom: 8, display: "block" };

function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState({ name: "", startWeight: "", goalWeight: "", weeklyGoal: "0.5", height: "", age: "" });
  const [err, setErr] = useState("");
  const upd = (k, v) => setProfile(p => ({ ...p, [k]: v }));

  const plan = profile.startWeight && profile.goalWeight && profile.height && profile.age
    ? calcPlan({
        startWeight: parseFloat(profile.startWeight) || 90,
        goalWeight: parseFloat(profile.goalWeight) || 80,
        weeklyGoal: parseFloat(profile.weeklyGoal) || 0.5,
        height: parseFloat(profile.height) || 175,
        age: parseFloat(profile.age) || 35,
      })
    : null;

  const next = () => {
    if (step === 0 && !profile.name.trim()) { setErr("Enter your name"); return; }
    if (step === 1) {
      const sw = parseFloat(profile.startWeight), gw = parseFloat(profile.goalWeight);
      const h = parseFloat(profile.height), a = parseFloat(profile.age);
      if (isNaN(sw) || sw < 40) { setErr("Enter a valid starting weight"); return; }
      if (isNaN(gw) || gw < 40) { setErr("Enter a valid goal weight"); return; }
      if (gw >= sw) { setErr("Goal weight should be less than starting weight"); return; }
      if (isNaN(h) || h < 140 || h > 220) { setErr("Enter a valid height (140–220 cm)"); return; }
      if (isNaN(a) || a < 16 || a > 80) { setErr("Enter a valid age"); return; }
    }
    setErr("");
    if (step < 2) { setStep(s => s + 1); return; }
    const p = {
      ...profile,
      startWeight: parseFloat(profile.startWeight),
      goalWeight: parseFloat(profile.goalWeight),
      weeklyGoal: parseFloat(profile.weeklyGoal),
      height: parseFloat(profile.height),
      age: parseFloat(profile.age),
      createdAt: todayKey(),
    };
    store.set("profile", p);
    onComplete(p);
  };

  const levelLabels = { beginner: "Beginner — Lower impact, build the base", intermediate: "Intermediate — Standard programme", active: "Active — Higher intensity & volume" };

  const steps = [
    { icon: "user", title: "What's your name?", subtitle: "Let's make this personal",
      content: <input autoFocus value={profile.name} onChange={e => upd("name", e.target.value)} placeholder="Your first name" onKeyDown={e => e.key === "Enter" && next()} style={iStyle} /> },
    { icon: "target", title: "Your body & goals", subtitle: "Used to calculate your exact calorie target",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ flex: 1 }}><label style={lStyle}>Current weight (kg)</label><input type="number" value={profile.startWeight} onChange={e => upd("startWeight", e.target.value)} placeholder="e.g. 98" step="0.1" style={iStyle} /></div>
            <div style={{ flex: 1 }}><label style={lStyle}>Goal weight (kg)</label><input type="number" value={profile.goalWeight} onChange={e => upd("goalWeight", e.target.value)} placeholder="e.g. 88" step="0.1" style={iStyle} /></div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ flex: 1 }}><label style={lStyle}>Height (cm)</label><input type="number" value={profile.height} onChange={e => upd("height", e.target.value)} placeholder="e.g. 178" style={iStyle} /></div>
            <div style={{ flex: 1 }}><label style={lStyle}>Age</label><input type="number" value={profile.age} onChange={e => upd("age", e.target.value)} placeholder="e.g. 34" style={iStyle} /></div>
          </div>
          <div>
            <label style={lStyle}>Weekly loss target</label>
            <div style={{ display: "flex", gap: 8 }}>
              {[["0.25", "Gentle\n0.25kg/wk"], ["0.5", "Steady\n0.5kg/wk"], ["0.75", "Aggressive\n0.75kg/wk"]].map(([val, lbl]) => (
                <button key={val} onClick={() => upd("weeklyGoal", val)} style={{ flex: 1, padding: "10px 6px", borderRadius: 10, border: `1.5px solid ${profile.weeklyGoal === val ? ACCENT : "var(--border)"}`, background: profile.weeklyGoal === val ? "#C8FF0015" : "var(--surface2)", color: profile.weeklyGoal === val ? ACCENT : "var(--muted)", cursor: "pointer", fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 0.5, lineHeight: 1.5, whiteSpace: "pre-line", textAlign: "center" }}>{lbl}</button>
              ))}
            </div>
          </div>
        </div>
      )},
    { icon: "zap", title: "Your personalised plan", subtitle: "Calculated for your body — not a generic template",
      content: plan ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            ["To lose", `${plan.tolose.toFixed(1)}kg`],
            ["Timeline", `~${plan.weeks} weeks`],
            ["Daily calories", `~${plan.targetCal} kcal`],
            ["Daily protein", `~${plan.proteinG}g`],
            ["BMI", `${plan.bmi}`],
            ["Workout level", levelLabels[plan.fitnessLevel]],
          ].map(([l, v]) => (
            <div key={l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", background: "var(--surface2)", borderRadius: 10 }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: 1, color: "var(--muted)" }}>{l.toUpperCase()}</span>
              <span style={{ fontWeight: 700, fontSize: 14, color: ACCENT, textAlign: "right", maxWidth: "60%" }}>{v}</span>
            </div>
          ))}
        </div>
      ) : null },
  ];

  const cur = steps[step];
  return (
    <div style={{ minHeight: "100dvh", background: "var(--bg)", display: "flex", flexDirection: "column", justifyContent: "center", padding: "40px 24px", maxWidth: 480, margin: "0 auto" }}>
      <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 3, color: "var(--muted)", marginBottom: 32 }}>DADFIT · STEP {step + 1} OF 3</div>
      <div style={{ display: "flex", gap: 6, marginBottom: 40 }}>
        {[0,1,2].map(i => <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= step ? ACCENT : "var(--border)", transition: "background 0.3s" }} />)}
      </div>
      <Icon name={cur.icon} size={28} color={ACCENT} />
      <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.5, margin: "12px 0 6px" }}>{cur.title}</h1>
      <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: 32 }}>{cur.subtitle}</p>
      {cur.content}
      {err && <div style={{ marginTop: 12, fontSize: 12, color: "#FF6B6B" }}>{err}</div>}
      <button onClick={next} style={{ width: "100%", marginTop: 32, padding: "16px", borderRadius: 14, border: "none", background: ACCENT, color: "#000", cursor: "pointer", fontFamily: "var(--mono)", fontSize: 13, fontWeight: 700, letterSpacing: 1.5 }}>
        {step < 2 ? "CONTINUE →" : "START MY PLAN →"}
      </button>
      {step > 0 && <button onClick={() => { setStep(s => s - 1); setErr(""); }} style={{ width: "100%", marginTop: 12, padding: "14px", borderRadius: 14, border: "1px solid var(--border)", background: "none", color: "var(--muted)", cursor: "pointer", fontFamily: "var(--mono)", fontSize: 12, letterSpacing: 1 }}>← BACK</button>}
    </div>
  );
}

// ── Default water reminder times ──────────────────────────────────────────────
const DEFAULT_WATER_TIMES = [
  { id: 1, time: "07:00", label: "Morning" },
  { id: 2, time: "12:30", label: "Midday" },
  { id: 3, time: "19:00", label: "Evening" },
];

// ── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [profile, setProfile] = useState(() => store.get("profile", null));
  const [tab, setTab] = useState("today");
  const [expandedDay, setExpandedDay] = useState(null);
  const [expandedMeal, setExpandedMeal] = useState(null);
  const [completedDays, setCompletedDays] = useState(() => store.get("completedDays", {}));
  const [streak, setStreak] = useState(0);
  const [totalWorkouts, setTotalWorkouts] = useState(0);
  const [weights, setWeights] = useState(() => store.get("weights", []));
  const [weightInput, setWeightInput] = useState("");
  const [notifPerm, setNotifPerm] = useState(Notification?.permission || "default");
  const [notifTime, setNotifTime] = useState(() => store.get("notifTime", "05:55"));
  const [notifEnabled, setNotifEnabled] = useState(() => store.get("notifEnabled", false));
  const [waterEnabled, setWaterEnabled] = useState(() => store.get("waterEnabled", false));
  const [waterTimes, setWaterTimes] = useState(() => store.get("waterTimes", DEFAULT_WATER_TIMES));
  const [editingProfile, setEditingProfile] = useState(false);
  const [importText, setImportText] = useState("");
  const [importError, setImportError] = useState("");
  const [importSuccess, setImportSuccess] = useState(false);

  // Build personalised data from profile
  const DAYS = profile ? buildDays(profile) : [];
  const MEALS = profile ? buildMeals(calcPlan(profile)) : [];

  const todaySchedIdx = dayIdxToSchedule(new Date().getDay());
  const todayData = DAYS[todaySchedIdx];
  const todayK = todayKey();
  const isTodayDone = !!completedDays[todayK];

  const plan = profile ? calcPlan(profile) : null;
  const latestWeight = weights.length ? weights[weights.length - 1].kg : (profile?.startWeight || 90);
  const lost = profile ? Math.max(0, profile.startWeight - latestWeight) : 0;
  const pct = plan ? Math.min(100, (lost / plan.tolose) * 100) : 0;

  // Streak
  useEffect(() => {
    let s = 0;
    const today = new Date();
    for (let i = 0; i < 60; i++) {
      const d = new Date(today); d.setDate(d.getDate() - i);
      const k = d.toISOString().slice(0, 10);
      const sd = DAYS[dayIdxToSchedule(d.getDay())];
      if (!sd || sd.type === "rest") continue;
      if (completedDays[k]) s++;
      else if (i > 0) break;
    }
    setStreak(s);
    setTotalWorkouts(Object.values(completedDays).filter(Boolean).length);
  }, [completedDays]); // eslint-disable-line

  const markDone = useCallback(() => {
    const u = { ...completedDays, [todayK]: true };
    setCompletedDays(u); store.set("completedDays", u);
  }, [completedDays, todayK]);

  const unmarkDone = useCallback(() => {
    const u = { ...completedDays }; delete u[todayK];
    setCompletedDays(u); store.set("completedDays", u);
  }, [completedDays, todayK]);

  const MISSED_QUOTES = [
    { t: "You missed yesterday.", b: `No excuses, ${profile?.name || "Dad"}. Get back on it today.` },
    { t: "The gym didn't miss you.", b: "But your future self did. Don't skip again." },
    { t: "Yesterday you said tomorrow.", b: "Today IS tomorrow. Go to the f**king gym." },
    { t: "Missed a day.", b: "That's fine. Missing two is a choice. Don't." },
    { t: "Your kids are watching.", b: "Show them what consistency looks like." },
  ];

  const buildAndSendAlarms = useCallback((workoutTimeStr, includeWater, wTimes) => {
    const [wh, wm] = workoutTimeStr.split(":").map(Number);
    const todaySched = DAYS[dayIdxToSchedule(new Date().getDay())];
    const isWorkout = todaySched?.type === "workout";
    const mq = MISSED_QUOTES[Math.floor(Math.random() * MISSED_QUOTES.length)];
    const alarms = [
      { id: "workout", fireAt: nextFireTs(wh, wm), repeat: "daily",
        title: isWorkout ? `Time to train, ${profile?.name || "Dad"}!` : "Active rest day",
        body: isWorkout ? `${todaySched.label} — 25 mins. Get it done.` : "A short walk keeps the momentum going." },
      { id: "missed", fireAt: nextFireTs(20, 0), repeat: "daily", missedOnly: true, title: mq.t, body: mq.b },
    ];
    if (includeWater) {
      (wTimes || waterTimes).forEach(wt => {
        const [h, m] = wt.time.split(":").map(Number);
        const labels = { Morning: ["Morning hydration", "Start the day right — drink a full glass of water now."], Midday: ["Midday water check", "Halfway through the day. Aim for 1.5L by now."], Evening: ["Evening water reminder", "Don't forget to finish your 2–3L today."] };
        const [title, body] = labels[wt.label] || [`${wt.label} hydration`, "Time to drink some water!"];
        alarms.push({ id: `water-${wt.id}`, fireAt: nextFireTs(h, m), repeat: "daily", title, body });
      });
    }
    sendAlarmsToSW(alarms);
  }, [profile, waterTimes]); // eslint-disable-line

  const enableNotifs = async () => {
    const p = await requestNotifPerm();
    setNotifPerm(p);
    if (p === "granted") { setNotifEnabled(true); store.set("notifEnabled", true); buildAndSendAlarms(notifTime, waterEnabled, waterTimes); }
  };

  const toggleWater = async () => {
    if (notifPerm !== "granted") { const p = await requestNotifPerm(); setNotifPerm(p); if (p !== "granted") return; }
    const next = !waterEnabled;
    setWaterEnabled(next); store.set("waterEnabled", next);
    if (notifEnabled || next) buildAndSendAlarms(notifTime, next, waterTimes);
    else clearSWAlarms();
  };

  useEffect(() => {
    if (notifPerm === "granted" && (notifEnabled || waterEnabled)) buildAndSendAlarms(notifTime, waterEnabled, waterTimes);
  }, []); // eslint-disable-line

  const updateWaterTime = (id, newTime) => {
    const updated = waterTimes.map(w => w.id === id ? { ...w, time: newTime } : w);
    setWaterTimes(updated); store.set("waterTimes", updated);
    if (waterEnabled) buildAndSendAlarms(notifTime, true, updated);
  };
  const updateWaterLabel = (id, newLabel) => {
    const updated = waterTimes.map(w => w.id === id ? { ...w, label: newLabel } : w);
    setWaterTimes(updated); store.set("waterTimes", updated);
  };
  const addWaterTime = () => {
    const newId = Math.max(0, ...waterTimes.map(w => w.id)) + 1;
    const updated = [...waterTimes, { id: newId, time: "09:00", label: "Custom" }].sort((a, b) => a.time.localeCompare(b.time));
    setWaterTimes(updated); store.set("waterTimes", updated);
    if (waterEnabled) buildAndSendAlarms(notifTime, true, updated);
  };
  const removeWaterTime = (id) => {
    if (waterTimes.length <= 1) return;
    const updated = waterTimes.filter(w => w.id !== id);
    setWaterTimes(updated); store.set("waterTimes", updated);
    if (waterEnabled) buildAndSendAlarms(notifTime, true, updated);
  };

  const exportData = () => {
    const data = { v: 1, profile: store.get("profile"), completedDays: store.get("completedDays", {}), weights: store.get("weights", []), notifTime: store.get("notifTime", "05:55"), notifEnabled: store.get("notifEnabled", false), waterEnabled: store.get("waterEnabled", false), waterTimes: store.get("waterTimes", DEFAULT_WATER_TIMES), exportedAt: new Date().toISOString() };
    const str = btoa(JSON.stringify(data));
    navigator.clipboard?.writeText(str).then(() => alert("Backup code copied to clipboard!\n\nSave it in your Notes app or email it to yourself.")).catch(() => prompt("Copy this backup code:", str));
  };

  const importData = () => {
    setImportError(""); setImportSuccess(false);
    try {
      const data = JSON.parse(atob(importText.trim()));
      if (!data.v || !data.profile) throw new Error("Invalid");
      store.set("profile", data.profile); store.set("completedDays", data.completedDays || {}); store.set("weights", data.weights || []); store.set("notifTime", data.notifTime || "05:55"); store.set("notifEnabled", data.notifEnabled || false); store.set("waterEnabled", data.waterEnabled || false); store.set("waterTimes", data.waterTimes || DEFAULT_WATER_TIMES);
      setProfile(data.profile); setCompletedDays(data.completedDays || {}); setWeights(data.weights || []); setNotifTime(data.notifTime || "05:55"); setNotifEnabled(data.notifEnabled || false); setWaterEnabled(data.waterEnabled || false); setWaterTimes(data.waterTimes || DEFAULT_WATER_TIMES);
      setImportText(""); setImportSuccess(true);
    } catch { setImportError("Invalid backup code. Make sure you copied the full code."); }
  };

  const streakLabel = streak === 0 ? "Start today" : streak < 4 ? "Building momentum" : streak < 8 ? "On a roll" : streak < 12 ? "Unstoppable" : "Legend status";

  const levelBadgeColor = { beginner: "#FF6B35", intermediate: "#C8FF00", active: "#00D4FF" };
  const levelLabel = { beginner: "BEGINNER", intermediate: "INTERMEDIATE", active: "ACTIVE" };

  const CSS = `
    :root { --bg:#0f0f0f;--surface:#1a1a1a;--surface2:#222;--border:#2a2a2a;--text:#f0f0f0;--muted:#666;--accent:#C8FF00;--font:'DM Sans',sans-serif;--mono:'DM Mono',monospace; }
    *{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent;}
    body{background:var(--bg);color:var(--text);font-family:var(--font);}
    input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none;}
    input[type=time]{color-scheme:dark;}
    input:focus,textarea:focus{border-color:var(--accent)!important;}
  `;

  if (!profile || editingProfile) return (<><style>{CSS}</style><Onboarding onComplete={p => { setProfile(p); setEditingProfile(false); }} /></>);

  const acc = (idx) => ACCENTS[idx];

  return (
    <>
      <style>{CSS}</style>
      <div style={{ fontFamily: "var(--font)", background: "var(--bg)", minHeight: "100dvh", maxWidth: 480, margin: "0 auto", paddingBottom: 80 }}>

        {/* HEADER */}
        <div style={{ background: "var(--bg)", padding: "max(env(safe-area-inset-top),20px) 20px 0", borderBottom: "1px solid var(--border)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", paddingBottom: 20 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 3, color: "var(--muted)" }}>DADFIT · {profile.name.toUpperCase()}</div>
                <div style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: 1, color: levelBadgeColor[plan.fitnessLevel], background: levelBadgeColor[plan.fitnessLevel] + "20", padding: "2px 7px", borderRadius: 4 }}>{levelLabel[plan.fitnessLevel]}</div>
              </div>
              <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.5, lineHeight: 1 }}>
                {lost > 0 ? <><span style={{ color: "var(--accent)" }}>{lost.toFixed(1)}kg</span> down</> : `Hey ${profile.name}`}
              </div>
              <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>{(plan.tolose - lost).toFixed(1)}kg to go · ~{plan.weeks} week plan</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 36, fontWeight: 700, color: streak > 0 ? "var(--accent)" : "var(--muted)", letterSpacing: -2, lineHeight: 1 }}>{streak}</div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: 2, color: "var(--muted)" }}>DAY STREAK</div>
              {streak > 0 && <div style={{ fontSize: 11, color: "var(--accent)", marginTop: 2 }}>{streakLabel}</div>}
            </div>
          </div>
          <div style={{ height: 3, background: "var(--border)", position: "relative" }}>
            <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${pct}%`, background: "var(--accent)", borderRadius: 2, transition: "width 0.6s" }} />
          </div>
          <div style={{ display: "flex" }}>
            {[{ id: "today", icon: "today", label: "Today" }, { id: "schedule", icon: "schedule", label: "Schedule" }, { id: "meals", icon: "meals", label: "Meals" }, { id: "progress", icon: "progress", label: "Progress" }, { id: "settings", icon: "settings", label: "Settings" }].map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, background: "none", border: "none", cursor: "pointer", padding: "12px 4px 14px", borderBottom: tab === t.id ? `2px solid var(--accent)` : "2px solid transparent", color: tab === t.id ? "var(--accent)" : "var(--muted)", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, transition: "color 0.15s" }}>
                <Icon name={t.icon} size={18} strokeWidth={tab === t.id ? 2 : 1.5} />
                <span style={{ fontSize: 9, fontFamily: "var(--mono)", letterSpacing: 1 }}>{t.label.toUpperCase()}</span>
              </button>
            ))}
          </div>
        </div>

        <div style={{ padding: "20px 16px" }}>

          {/* TODAY */}
          {tab === "today" && (
            <div>
              <QuoteBanner />
              <div style={{ background: "var(--surface)", borderRadius: 16, padding: 20, marginBottom: 12, border: "1px solid var(--border)", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: acc(todayData.ai) }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <div>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 2, color: "var(--muted)", marginBottom: 6 }}>{todayData.tag} · {todayData.day.toUpperCase()}</div>
                    <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: -0.5 }}>{todayData.label}</div>
                    <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 4, display: "flex", alignItems: "center", gap: 6 }}><Icon name="today" size={13} color="var(--muted)" />{todayData.time}</div>
                  </div>
                  {isTodayDone && <div style={{ width: 44, height: 44, borderRadius: 22, background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon name="check" size={22} color="#000" strokeWidth={2.5} /></div>}
                </div>
                {todayData.type === "workout" && todayData.exercises && (
                  <>
                    <div style={{ background: "var(--surface2)", borderRadius: 10, padding: "10px 14px", marginBottom: 12, fontSize: 12, color: "var(--muted)", borderLeft: `3px solid ${acc(todayData.ai)}` }}>Warmup — {todayData.warmup}</div>
                    {todayData.exercises.map((ex, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "10px 0", borderBottom: i < todayData.exercises.length - 1 ? "1px solid var(--border)" : "none" }}>
                        <div><div style={{ fontWeight: 600, fontSize: 14 }}>{ex.name}</div>{ex.note && <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{ex.note}</div>}</div>
                        <div style={{ fontFamily: "var(--mono)", fontSize: 12, color: acc(todayData.ai), background: acc(todayData.ai) + "18", padding: "4px 10px", borderRadius: 6, whiteSpace: "nowrap", marginLeft: 12 }}>{ex.sets}</div>
                      </div>
                    ))}
                    <div style={{ background: "var(--surface2)", borderRadius: 10, padding: "10px 14px", marginTop: 12, fontSize: 12, color: "var(--muted)" }}>Cooldown — {todayData.cooldown}</div>
                  </>
                )}
                {todayData.type === "rest" && <div style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.6 }}>{todayData.note}</div>}
                <button onClick={isTodayDone ? unmarkDone : markDone} style={{ width: "100%", marginTop: 20, padding: "14px", borderRadius: 12, border: "none", cursor: "pointer", background: isTodayDone ? "var(--surface2)" : "var(--accent)", color: isTodayDone ? "var(--muted)" : "#000", fontFamily: "var(--mono)", fontSize: 13, fontWeight: 600, letterSpacing: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  <Icon name="check" size={16} color={isTodayDone ? "var(--muted)" : "#000"} strokeWidth={2.5} />
                  {isTodayDone ? "MARKED DONE — UNDO" : todayData.type === "rest" ? "MARK REST DAY DONE" : "MARK WORKOUT COMPLETE"}
                </button>
              </div>
              {streak > 0 && (
                <div style={{ background: "var(--surface)", borderRadius: 16, padding: 20, border: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 26, background: "#C8FF0018", border: "2px solid var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon name="flame" size={24} color="var(--accent)" /></div>
                  <div><div style={{ fontSize: 18, fontWeight: 700 }}>{streak} day streak</div><div style={{ fontSize: 13, color: "var(--muted)", marginTop: 2 }}>{streakLabel} — keep it going</div></div>
                </div>
              )}
            </div>
          )}

          {/* SCHEDULE */}
          {tab === "schedule" && (
            <div>
              <div style={{ background: "var(--surface)", borderRadius: 12, padding: "10px 14px", marginBottom: 16, border: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: 4, background: levelBadgeColor[plan.fitnessLevel] }} />
                <div style={{ fontSize: 13, color: "var(--muted)" }}>
                  Workouts set to <span style={{ color: levelBadgeColor[plan.fitnessLevel], fontWeight: 600 }}>{levelLabel[plan.fitnessLevel]}</span> level based on your BMI of {plan.bmi}
                </div>
              </div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 2, color: "var(--muted)", marginBottom: 16 }}>THIS WEEK</div>
              {DAYS.map((d, i) => {
                const today = new Date(), currIdx = dayIdxToSchedule(today.getDay());
                const dd = new Date(today); dd.setDate(today.getDate() + (i - currIdx));
                const done = completedDays[dd.toISOString().slice(0, 10)];
                const isToday = i === todaySchedIdx;
                const a = acc(d.ai);
                return (
                  <div key={d.day} style={{ background: "var(--surface)", borderRadius: 14, marginBottom: 8, overflow: "hidden", border: isToday ? `1px solid ${a}` : "1px solid var(--border)" }}>
                    <div onClick={() => d.type !== "rest" && setExpandedDay(expandedDay === i ? null : i)} style={{ display: "flex", alignItems: "center", padding: "14px 16px", gap: 14, cursor: d.type !== "rest" ? "pointer" : "default" }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, flexShrink: 0, background: done ? a : d.type === "rest" ? "var(--surface2)" : a + "18", border: `1px solid ${done ? a : d.type === "rest" ? "var(--border)" : a + "40"}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {done ? <Icon name="check" size={18} color="#000" strokeWidth={2.5} /> : <span style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: 1, color: d.type === "rest" ? "var(--muted)" : a, fontWeight: 600 }}>{d.short}</span>}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: 15, display: "flex", alignItems: "center", gap: 8 }}>{d.label}{isToday && <span style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: 1, color: a, background: a + "18", padding: "2px 6px", borderRadius: 4 }}>TODAY</span>}</div>
                        <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{d.time}</div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: 1.5, color: d.type === "rest" ? "var(--muted)" : a }}>{d.tag}</span>
                        {d.type !== "rest" && <Icon name={expandedDay === i ? "chevronUp" : "chevronDown"} size={16} color="var(--muted)" />}
                      </div>
                    </div>
                    {expandedDay === i && d.exercises && (
                      <div style={{ padding: "0 16px 16px", borderTop: "1px solid var(--border)" }}>
                        <div style={{ fontSize: 12, color: "var(--muted)", padding: "10px 0 10px 10px", borderLeft: `2px solid ${a}`, marginBottom: 4 }}>Warmup — {d.warmup}</div>
                        {d.exercises.map((ex, j) => (
                          <div key={j} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: j < d.exercises.length - 1 ? "1px solid var(--border)" : "none" }}>
                            <div><div style={{ fontWeight: 600, fontSize: 14 }}>{ex.name}</div>{ex.note && <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 1 }}>{ex.note}</div>}</div>
                            <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: a, background: a + "15", padding: "4px 10px", borderRadius: 6, whiteSpace: "nowrap", marginLeft: 12 }}>{ex.sets}</div>
                          </div>
                        ))}
                        <div style={{ fontSize: 12, color: "var(--muted)", paddingTop: 10, paddingLeft: 10, borderLeft: "2px solid var(--border)" }}>Cooldown — {d.cooldown}</div>
                      </div>
                    )}
                    {d.type === "rest" && d.note && <div style={{ padding: "0 16px 14px", fontSize: 12, color: "var(--muted)" }}>{d.note}</div>}
                  </div>
                );
              })}
            </div>
          )}

          {/* MEALS */}
          {tab === "meals" && (
            <div>
              <a href="/diet-plan.html" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#C8FF0012", borderRadius: 14, padding: "14px 16px", marginBottom: 12, border: "1px solid #C8FF0030", textDecoration: "none", cursor: "pointer" }}>
                <div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 2, color: "#C8FF00", marginBottom: 4 }}>FULL PLAN</div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: "var(--text)" }}>Budget Diet Plan</div>
                  <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>Low-sodium · Weight loss · ~$6/day</div>
                </div>
                <div style={{ fontFamily: "var(--mono)", fontSize: 18, color: "#C8FF00" }}>→</div>
              </a>
              <div style={{ background: "var(--surface)", borderRadius: 14, padding: 16, marginBottom: 16, border: "1px solid var(--border)", display: "flex", justifyContent: "space-between" }}>
                {[["Daily Target", `~${plan.targetCal} kcal`], ["Protein", `~${plan.proteinG}g`], ["Deficit", `~${plan.dailyDeficit} kcal`]].map(([l, v]) => (
                  <div key={l}><div style={{ fontSize: 15, fontWeight: 700, color: "var(--accent)" }}>{v}</div><div style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: 1, color: "var(--muted)", marginTop: 2 }}>{l.toUpperCase()}</div></div>
                ))}
              </div>
              {MEALS.map((m, i) => (
                <div key={m.meal} style={{ background: "var(--surface)", borderRadius: 14, marginBottom: 8, overflow: "hidden", border: "1px solid var(--border)" }}>
                  <div onClick={() => setExpandedMeal(expandedMeal === i ? null : i)} style={{ display: "flex", alignItems: "center", padding: "14px 16px", gap: 14, cursor: "pointer" }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: "#C8FF0015", border: "1px solid #C8FF0030", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon name="meals" size={18} color="var(--accent)" /></div>
                    <div style={{ flex: 1 }}><div style={{ fontWeight: 600, fontSize: 15 }}>{m.meal}</div><div style={{ fontSize: 12, color: "var(--muted)", marginTop: 1 }}>{m.time} · {m.goal}</div></div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}><span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--accent)" }}>~{Math.round(plan.targetCal * m.pct)}</span><Icon name={expandedMeal === i ? "chevronUp" : "chevronDown"} size={16} color="var(--muted)" /></div>
                  </div>
                  {expandedMeal === i && (
                    <div style={{ padding: "0 16px 16px", borderTop: "1px solid var(--border)" }}>
                      <div style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: 2, color: "var(--muted)", margin: "12px 0 8px" }}>GOOD OPTIONS</div>
                      {m.ideas.map((idea, j) => <div key={j} style={{ padding: "8px 12px", background: "var(--surface2)", borderRadius: 8, fontSize: 13, marginBottom: 4 }}>{idea}</div>)}
                      <div style={{ marginTop: 10, padding: "8px 12px", background: "#FF3B6B10", borderRadius: 8, fontSize: 12, color: "#FF6B6B", borderLeft: "3px solid #FF3B6B" }}>Avoid — {m.avoid}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* PROGRESS */}
          {tab === "progress" && (
            <div>
              <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                {[{ label: "START", val: `${profile.startWeight}kg` }, { label: "NOW", val: `${latestWeight}kg`, hi: true }, { label: "LOST", val: `${lost.toFixed(1)}kg` }, { label: "GOAL", val: `${profile.goalWeight}kg` }].map(s => (
                  <div key={s.label} style={{ flex: 1, background: s.hi ? "#C8FF0015" : "var(--surface)", borderRadius: 12, padding: "12px 8px", textAlign: "center", border: s.hi ? "1px solid #C8FF0040" : "1px solid var(--border)" }}>
                    <div style={{ fontSize: 18, fontWeight: 700, color: s.hi ? "var(--accent)" : "var(--text)" }}>{s.val}</div>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: 1.5, color: "var(--muted)", marginTop: 2 }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: "var(--surface)", borderRadius: 14, padding: 16, marginBottom: 12, border: "1px solid var(--border)" }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 2, color: "var(--muted)", marginBottom: 12 }}>LOG WEIGHT</div>
                <div style={{ display: "flex", gap: 8 }}>
                  <input type="number" value={weightInput} onChange={e => setWeightInput(e.target.value)} placeholder={`e.g. ${latestWeight}`} step="0.1" style={{ flex: 1, padding: "12px 14px", borderRadius: 10, border: "1px solid var(--border)", background: "var(--surface2)", color: "var(--text)", fontSize: 16, outline: "none", fontFamily: "var(--font)" }} />
                  <button onClick={() => { const w = parseFloat(weightInput); if (isNaN(w) || w < 40 || w > 200) return; const u = [...weights.filter(x => x.date !== todayK), { date: todayK, kg: w }].sort((a, b) => a.date.localeCompare(b.date)); setWeights(u); store.set("weights", u); setWeightInput(""); }} style={{ padding: "12px 18px", borderRadius: 10, border: "none", background: "var(--accent)", color: "#000", cursor: "pointer", fontFamily: "var(--mono)", fontSize: 12, fontWeight: 600, letterSpacing: 1, display: "flex", alignItems: "center", gap: 6 }}>
                    <Icon name="plus" size={16} color="#000" strokeWidth={2.5} /> LOG
                  </button>
                </div>
              </div>
              {weights.length > 1 && (
                <div style={{ background: "var(--surface)", borderRadius: 14, padding: 16, marginBottom: 12, border: "1px solid var(--border)" }}>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 2, color: "var(--muted)", marginBottom: 14 }}>WEIGHT HISTORY</div>
                  {weights.slice(-8).map((w, i, arr) => {
                    const max = Math.max(...arr.map(x => x.kg)), min = Math.min(...arr.map(x => x.kg));
                    const bw = 15 + ((w.kg - min) / (max - min || 1)) * 75;
                    const isLatest = i === arr.length - 1;
                    return (
                      <div key={w.date} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                        <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--muted)", width: 48, flexShrink: 0 }}>{w.date.slice(5)}</div>
                        <div style={{ flex: 1, height: 24, background: "var(--surface2)", borderRadius: 4, overflow: "hidden" }}><div style={{ height: "100%", width: `${bw}%`, background: isLatest ? "var(--accent)" : "#C8FF0050", borderRadius: 4 }} /></div>
                        <div style={{ fontFamily: "var(--mono)", fontSize: 12, fontWeight: 600, color: isLatest ? "var(--accent)" : "var(--text)", width: 48, textAlign: "right", flexShrink: 0 }}>{w.kg}kg</div>
                      </div>
                    );
                  })}
                </div>
              )}
              <div style={{ background: "var(--surface)", borderRadius: 14, padding: 16, marginBottom: 12, border: "1px solid var(--border)" }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 2, color: "var(--muted)", marginBottom: 14 }}>THIS WEEK</div>
                <div style={{ display: "flex", gap: 6 }}>
                  {DAYS.map((d, i) => {
                    const today = new Date(), currIdx = dayIdxToSchedule(today.getDay());
                    const dd = new Date(today); dd.setDate(today.getDate() + (i - currIdx));
                    const done = completedDays[dd.toISOString().slice(0, 10)];
                    const isToday = i === todaySchedIdx;
                    const a = acc(d.ai);
                    return (
                      <div key={d.day} style={{ flex: 1, textAlign: "center" }}>
                        <div style={{ height: 36, borderRadius: 8, background: done ? a : d.type === "rest" ? "var(--surface2)" : "var(--border)", border: isToday ? `2px solid ${a}` : "2px solid transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {done && <Icon name="check" size={14} color="#000" strokeWidth={2.5} />}
                        </div>
                        <div style={{ fontFamily: "var(--mono)", fontSize: 8, color: isToday ? a : "var(--muted)", marginTop: 4 }}>{d.short}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div style={{ background: "var(--surface)", borderRadius: 14, padding: 16, border: "1px solid var(--border)" }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 2, color: "var(--muted)", marginBottom: 14 }}>MILESTONES</div>
                {[0.25, 0.5, 0.75, 1].map((frac, i) => {
                  const target = plan.tolose * frac;
                  const reached = lost >= target;
                  return (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "10px 0", borderBottom: i < 3 ? "1px solid var(--border)" : "none" }}>
                      <div style={{ width: 36, height: 36, borderRadius: 18, flexShrink: 0, background: reached ? "var(--accent)" : "var(--surface2)", border: `1px solid ${reached ? "var(--accent)" : "var(--border)"}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {reached ? <Icon name="check" size={16} color="#000" strokeWidth={2.5} /> : <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--muted)" }}>W{Math.round(plan.weeks * frac)}</span>}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: 14, color: reached ? "var(--accent)" : "var(--text)" }}>−{target.toFixed(1)}kg</div>
                        <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 1 }}>{["Body adjusting, energy improving", "Clothes feeling looser", "Noticeably different in photos", "Goal achieved!"][i]}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SETTINGS */}
          {tab === "settings" && (
            <div>
              <div style={{ background: "var(--surface)", borderRadius: 14, padding: 16, marginBottom: 12, border: "1px solid var(--border)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}><Icon name="user" size={18} color="var(--accent)" /><div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 2, color: "var(--muted)" }}>YOUR PROFILE</div></div>
                  <button onClick={() => setEditingProfile(true)} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "1px solid var(--border)", borderRadius: 8, padding: "6px 12px", color: "var(--muted)", cursor: "pointer", fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 1 }}><Icon name="edit" size={13} color="var(--muted)" /> EDIT</button>
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {[
                    ["Name", profile.name],
                    ["Start", `${profile.startWeight}kg`],
                    ["Goal", `${profile.goalWeight}kg`],
                    ["Height", `${profile.height || "—"}cm`],
                    ["Age", `${profile.age || "—"}`],
                    ["Rate", `${profile.weeklyGoal}kg/wk`],
                    ["BMI", plan.bmi],
                    ["Level", levelLabel[plan.fitnessLevel]],
                    ["Timeline", `~${plan.weeks} wks`],
                    ["Calories", `~${plan.targetCal}`],
                    ["Protein", `~${plan.proteinG}g`],
                  ].map(([l, v]) => (
                    <div key={l} style={{ background: "var(--surface2)", borderRadius: 8, padding: "8px 12px", minWidth: "calc(33% - 6px)" }}>
                      <div style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: 1, color: "var(--muted)" }}>{l.toUpperCase()}</div>
                      <div style={{ fontWeight: 600, fontSize: 13, marginTop: 2, color: "var(--accent)" }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Workout reminders */}
              <div style={{ background: "var(--surface)", borderRadius: 14, padding: 16, marginBottom: 12, border: "1px solid var(--border)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}><Icon name="bell" size={18} color="var(--accent)" /><div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 2, color: "var(--muted)" }}>WORKOUT REMINDERS</div></div>
                {notifPerm === "denied" ? (
                  <div style={{ padding: "10px 14px", background: "#FF3B6B10", borderRadius: 10, fontSize: 13, color: "#FF6B6B", borderLeft: "3px solid #FF3B6B" }}>Notifications blocked. Enable in your phone settings.</div>
                ) : (
                  <>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                      <div><div style={{ fontWeight: 600, fontSize: 14 }}>Morning reminder</div><div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>Set 5 min before you want to start</div></div>
                      <input type="time" value={notifTime} onChange={e => { setNotifTime(e.target.value); store.set("notifTime", e.target.value); if (notifEnabled) buildAndSendAlarms(e.target.value, waterEnabled, waterTimes); }} style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid var(--border)", background: "var(--surface2)", color: "var(--text)", fontSize: 14, outline: "none", fontFamily: "var(--mono)" }} />
                    </div>
                    <button onClick={notifEnabled ? () => { setNotifEnabled(false); store.set("notifEnabled", false); if (!waterEnabled) clearSWAlarms(); } : enableNotifs} style={{ width: "100%", padding: "13px", borderRadius: 12, border: notifEnabled ? "1px solid var(--border)" : "none", background: notifEnabled ? "var(--surface2)" : "var(--accent)", color: notifEnabled ? "var(--muted)" : "#000", cursor: "pointer", fontFamily: "var(--mono)", fontSize: 12, fontWeight: 600, letterSpacing: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 8 }}>
                      <Icon name="bell" size={15} color={notifEnabled ? "var(--muted)" : "#000"} />
                      {notifEnabled ? `ON · ${notifTime} — TAP TO DISABLE` : "ENABLE WORKOUT REMINDERS"}
                    </button>
                    {notifEnabled && <div style={{ padding: "10px 14px", background: "var(--surface2)", borderRadius: 10, fontSize: 12, color: "var(--muted)" }}>Also fires at 8pm if you missed a workout day.</div>}
                  </>
                )}
              </div>

              {/* Water reminders */}
              <div style={{ background: "var(--surface)", borderRadius: 14, padding: 16, marginBottom: 12, border: "1px solid var(--border)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}><Icon name="droplet" size={18} color="#00D4FF" /><div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 2, color: "var(--muted)" }}>WATER REMINDERS</div></div>
                  <button onClick={addWaterTime} style={{ display: "flex", alignItems: "center", gap: 4, background: "#00D4FF15", border: "1px solid #00D4FF40", borderRadius: 8, padding: "6px 10px", color: "#00D4FF", cursor: "pointer", fontFamily: "var(--mono)", fontSize: 10 }}>
                    <Icon name="plus" size={13} color="#00D4FF" strokeWidth={2} /> ADD
                  </button>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
                  {waterTimes.sort((a, b) => a.time.localeCompare(b.time)).map(wt => (
                    <div key={wt.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", background: "var(--surface2)", borderRadius: 10 }}>
                      <input value={wt.label} onChange={e => updateWaterLabel(wt.id, e.target.value)} style={{ flex: 1, background: "none", border: "none", color: "var(--text)", fontSize: 13, fontWeight: 600, outline: "none", fontFamily: "var(--font)", minWidth: 0 }} maxLength={12} />
                      <input type="time" value={wt.time} onChange={e => updateWaterTime(wt.id, e.target.value)} style={{ padding: "6px 8px", borderRadius: 8, border: "1px solid var(--border)", background: "var(--bg)", color: "#00D4FF", fontSize: 13, outline: "none", fontFamily: "var(--mono)", flexShrink: 0 }} />
                      <button onClick={() => removeWaterTime(wt.id)} disabled={waterTimes.length <= 1} style={{ background: "none", border: "none", cursor: waterTimes.length <= 1 ? "default" : "pointer", color: waterTimes.length <= 1 ? "var(--border)" : "#FF3B6B", padding: 4, flexShrink: 0, display: "flex" }}>
                        <Icon name="minus" size={16} color={waterTimes.length <= 1 ? "var(--border)" : "#FF3B6B"} strokeWidth={2} />
                      </button>
                    </div>
                  ))}
                </div>
                <button onClick={toggleWater} style={{ width: "100%", padding: "13px", borderRadius: 12, background: waterEnabled ? "var(--surface2)" : "#00D4FF15", color: waterEnabled ? "var(--muted)" : "#00D4FF", cursor: "pointer", fontFamily: "var(--mono)", fontSize: 12, fontWeight: 600, letterSpacing: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, border: waterEnabled ? "1px solid var(--border)" : "1px solid #00D4FF40" }}>
                  <Icon name="droplet" size={15} color={waterEnabled ? "var(--muted)" : "#00D4FF"} />
                  {waterEnabled ? `WATER REMINDERS ON (${waterTimes.length}) — TAP TO DISABLE` : `ENABLE WATER REMINDERS (${waterTimes.length})`}
                </button>
              </div>

              {/* Backup */}
              <div style={{ background: "var(--surface)", borderRadius: 14, padding: 16, marginBottom: 12, border: "1px solid var(--border)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}><Icon name="phone" size={18} color="var(--accent)" /><div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 2, color: "var(--muted)" }}>BACKUP & RESTORE</div></div>
                <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6, marginBottom: 14 }}>Export a backup code — paste it on any new install to restore everything.</p>
                <button onClick={exportData} style={{ width: "100%", padding: "13px", borderRadius: 12, border: "none", background: "var(--accent)", color: "#000", cursor: "pointer", fontFamily: "var(--mono)", fontSize: 12, fontWeight: 700, letterSpacing: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 14 }}>
                  <Icon name="plus" size={15} color="#000" strokeWidth={2.5} /> EXPORT BACKUP CODE
                </button>
                <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 2, color: "var(--muted)", marginBottom: 8 }}>RESTORE FROM BACKUP</div>
                <textarea value={importText} onChange={e => { setImportText(e.target.value); setImportError(""); setImportSuccess(false); }} placeholder="Paste your backup code here..." rows={3} style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: `1px solid ${importError ? "#FF3B6B" : "var(--border)"}`, background: "var(--surface2)", color: "var(--text)", fontSize: 13, outline: "none", fontFamily: "var(--mono)", resize: "none", wordBreak: "break-all" }} />
                {importError && <div style={{ fontSize: 12, color: "#FF6B6B", marginTop: 6 }}>{importError}</div>}
                {importSuccess && <div style={{ fontSize: 12, color: "var(--accent)", marginTop: 6 }}>✓ Data restored successfully!</div>}
                <button onClick={importData} disabled={!importText.trim()} style={{ width: "100%", marginTop: 10, padding: "12px", borderRadius: 12, border: "1px solid var(--border)", background: importText.trim() ? "var(--surface2)" : "transparent", color: importText.trim() ? "var(--text)" : "var(--muted)", cursor: importText.trim() ? "pointer" : "default", fontFamily: "var(--mono)", fontSize: 12, fontWeight: 600, letterSpacing: 1 }}>
                  RESTORE DATA
                </button>
              </div>

              {/* Install */}
              <div style={{ background: "var(--surface)", borderRadius: 14, padding: 16, marginBottom: 12, border: "1px solid var(--border)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}><Icon name="phone" size={18} color="var(--accent)" /><div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 2, color: "var(--muted)" }}>INSTALL AS APP</div></div>
                {[{ label: "iPhone", detail: "Safari → Share → Add to Home Screen" }, { label: "Android", detail: "Chrome menu (⋮) → Add to Home Screen" }].map(p => (
                  <div key={p.label} style={{ padding: "10px 14px", background: "var(--surface2)", borderRadius: 10, marginBottom: 8 }}><div style={{ fontWeight: 600, fontSize: 13 }}>{p.label}</div><div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{p.detail}</div></div>
                ))}
              </div>

              {/* Reset */}
              <div style={{ background: "var(--surface)", borderRadius: 14, padding: 16, border: "1px solid var(--border)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}><Icon name="refresh" size={18} color="#FF3B6B" /><div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 2, color: "var(--muted)" }}>RESET</div></div>
                <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 12 }}>Clear all progress and start fresh.</p>
                <button onClick={() => { if (window.confirm("Reset everything? This can't be undone.")) { ["completedDays","weights","profile","notifEnabled","waterEnabled","waterTimes"].forEach(k => localStorage.removeItem(k)); setCompletedDays({}); setWeights([]); setProfile(null); setStreak(0); setTotalWorkouts(0); setWaterTimes(DEFAULT_WATER_TIMES); clearSWAlarms(); } }} style={{ width: "100%", padding: "13px", borderRadius: 12, border: "1px solid #FF3B6B40", background: "#FF3B6B10", color: "#FF6B6B", cursor: "pointer", fontFamily: "var(--mono)", fontSize: 12, fontWeight: 600, letterSpacing: 1 }}>
                  RESET ALL DATA
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
