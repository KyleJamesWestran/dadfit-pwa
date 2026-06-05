import { useState, useEffect, useCallback } from "react";

// ── Google Fonts ───────────────────────────────────────────────────────────────
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap";
document.head.appendChild(fontLink);

// ── SVG Icons ─────────────────────────────────────────────────────────────────
const Icon = ({ name, size = 20, color = "currentColor", strokeWidth = 1.75 }) => {
  const paths = {
    today: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
    schedule: <><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>,
    meals: <><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></>,
    progress: <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></>,
    check: <polyline points="20 6 9 17 4 12"/>,
    chevronDown: <polyline points="6 9 12 15 18 9"/>,
    chevronUp: <polyline points="18 15 12 9 6 15"/>,
    flame: <><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></>,
    bell: <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></>,
    zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>,
    trophy: <><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></>,
    plus: <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    trash: <><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></>,
    phone: <><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></>,
    refresh: <><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></>,
    edit: <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></>,
    user: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
    target: <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
};

// ── Workout Data ───────────────────────────────────────────────────────────────
const DAYS = [
  { day: "Monday", short: "MON", type: "workout", label: "Upper Body", time: "6:00 – 6:25am", tag: "STRENGTH", accentIdx: 0,
    warmup: "3 min — arm circles, shoulder rolls, jumping jacks",
    cooldown: "2 min — chest stretch, band pull-apart",
    exercises: [
      { name: "Push-ups", sets: "4 × 10", note: "Knees ok to start" },
      { name: "Dumbbell Shoulder Press", sets: "3 × 12", note: "Seated or standing" },
      { name: "Band Rows", sets: "4 × 12", note: "Anchor band to door" },
      { name: "Dumbbell Bicep Curls", sets: "3 × 10", note: "Slow on the way down" },
      { name: "Tricep Band Pushdowns", sets: "3 × 12", note: "" },
    ],
  },
  { day: "Tuesday", short: "TUE", type: "rest", label: "Active Rest", time: "Lunch walk", tag: "REST", accentIdx: 1,
    note: "10–15 min walk at lunch. Drink extra water." },
  { day: "Wednesday", short: "WED", type: "workout", label: "Lower Body", time: "6:00 – 6:25am", tag: "STRENGTH", accentIdx: 0,
    warmup: "3 min — leg swings, hip circles, bodyweight squats",
    cooldown: "2 min — hip flexor stretch, hamstring stretch",
    exercises: [
      { name: "Goblet Squats", sets: "4 × 12", note: "Hold one dumbbell at chest" },
      { name: "Romanian Deadlifts", sets: "4 × 10", note: "Hinge at hips, soft knees" },
      { name: "Dumbbell Lunges", sets: "3 × 10 each", note: "Alternate legs" },
      { name: "Glute Bridges", sets: "3 × 15", note: "Add dumbbell on hips for challenge" },
      { name: "Band Lateral Walks", sets: "3 × 12 each way", note: "Band around ankles" },
    ],
  },
  { day: "Thursday", short: "THU", type: "rest", label: "Rest Day", time: "Full recovery", tag: "REST", accentIdx: 1,
    note: "Muscles grow on rest days. Prioritise sleep." },
  { day: "Friday", short: "FRI", type: "workout", label: "Full Body", time: "6:00 – 6:25am", tag: "CIRCUIT", accentIdx: 2,
    warmup: "3 min — light jog in place, full body circles",
    cooldown: "2 min — child's pose, deep breathing",
    exercises: [
      { name: "Squat to Press", sets: "4 × 10", note: "Squat down, press up as you stand" },
      { name: "Push-ups", sets: "4 × 10", note: "" },
      { name: "Band Deadlifts", sets: "4 × 12", note: "Stand on band, hinge and pull" },
      { name: "Mountain Climbers", sets: "3 × 20 sec", note: "Core focus" },
      { name: "Renegade Row", sets: "3 × 8 each", note: "Plank position, row each arm" },
    ],
  },
  { day: "Saturday", short: "SAT", type: "workout", label: "Family Walk + Core", time: "Morning with the boys", tag: "CARDIO", accentIdx: 3,
    warmup: "The walk IS the warmup",
    cooldown: "2 min — lower back stretch, seated twist",
    exercises: [
      { name: "Family Walk / Park Run", sets: "30–45 min", note: "Push the pram — extra resistance!" },
      { name: "Plank Hold", sets: "3 × 30 sec", note: "Build to 60 sec over weeks" },
      { name: "Dead Bug", sets: "3 × 10 each side", note: "Great for lower back" },
      { name: "Russian Twists", sets: "3 × 15", note: "Light weight, focus on rotation" },
    ],
  },
  { day: "Sunday", short: "SUN", type: "rest", label: "Full Rest", time: "Family day", tag: "REST", accentIdx: 1,
    note: "Recharge. Church, family time, a good meal." },
];

const MEALS = [
  { meal: "Breakfast", time: "7:00am", goal: "High protein, quick prep",
    ideas: ["3 scrambled eggs + wholegrain toast", "Greek yoghurt + banana + almonds", "Oats with protein powder + berries"],
    avoid: "Cereal, muesli bars, toast with jam only", pct: 0.24 },
  { meal: "Morning Tea", time: "10:00am", goal: "Keep hunger at bay",
    ideas: ["Apple + small handful of almonds", "Boiled egg + rice crackers", "Black coffee or tea"],
    avoid: "Biscuits, chips, sugary drinks", pct: 0.10 },
  { meal: "Lunch", time: "12:30pm", goal: "Big, filling, protein-forward",
    ideas: ["Chicken + brown rice + salad", "Tuna wrap with spinach + tomato", "Last night's leftovers"],
    avoid: "Meal deals with chips, white bread", pct: 0.30 },
  { meal: "Afternoon Tea", time: "3:30pm", goal: "Bridge to dinner",
    ideas: ["Piece of fruit", "Hummus + veggie sticks", "Protein shake if you trained"],
    avoid: "Don't skip — you'll overeat at dinner", pct: 0.10 },
  { meal: "Dinner", time: "6:00pm", goal: "Family meal, watch portions",
    ideas: ["Protein + lots of veggies + small carbs", "Stir-fry with lean meat over brown rice", "Bolognese with lentils — less mince, more veg"],
    avoid: "Seconds, kids' leftovers, large desserts", pct: 0.36 },
];

const ACCENTS = ["#C8FF00", "#FF6B35", "#00D4FF", "#FF3B6B"];
const ACCENT = "#C8FF00";

// ── Storage ────────────────────────────────────────────────────────────────────
const store = {
  get: (k, fb = null) => { try { const v = localStorage.getItem(k); return v !== null ? JSON.parse(v) : fb; } catch { return fb; } },
  set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};

function todayKey() { return new Date().toISOString().slice(0, 10); }
function dayIdxToSchedule(jsDay) { return jsDay === 0 ? 6 : jsDay - 1; }
function msUntil(h, m) {
  const now = new Date(), t = new Date();
  t.setHours(h, m, 0, 0);
  if (t <= now) t.setDate(t.getDate() + 1);
  return t - now;
}
function fireNotif(title, body) {
  if (Notification.permission !== "granted") return;
  navigator.serviceWorker?.ready.then(reg => {
    reg.showNotification(title, { body, icon: "/icon-192.png", vibrate: [200, 100, 200], tag: "dadfit" });
  }).catch(() => new Notification(title, { body }));
}
async function requestNotifPerm() {
  if (!("Notification" in window)) return "unsupported";
  if (Notification.permission === "granted") return "granted";
  return await Notification.requestPermission();
}

// ── Derived plan calculations ──────────────────────────────────────────────────
function calcPlan(profile) {
  const { startWeight, goalWeight, weeklyGoal } = profile;
  const tolose = startWeight - goalWeight;
  const weeks = Math.round(tolose / weeklyGoal);
  // Harris-Benedict BMR (male, assume ~35yo, 175cm) adjusted for sedentary
  const bmr = 88.36 + (13.4 * startWeight) + (4.8 * 175) - (5.7 * 35);
  const tdee = Math.round(bmr * 1.2); // sedentary
  const dailyDeficit = Math.round((weeklyGoal * 7700) / 7); // 7700 kcal per kg
  const targetCal = Math.max(1500, tdee - dailyDeficit);
  const proteinG = Math.round(startWeight * 1.6); // 1.6g per kg
  return { tolose, weeks, tdee, targetCal, proteinG, dailyDeficit };
}

// ── Onboarding ─────────────────────────────────────────────────────────────────
function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState({ name: "", startWeight: "", goalWeight: "", weeklyGoal: "0.5" });
  const [err, setErr] = useState("");

  const update = (k, v) => setProfile(p => ({ ...p, [k]: v }));

  const validate = () => {
    const sw = parseFloat(profile.startWeight), gw = parseFloat(profile.goalWeight);
    if (!profile.name.trim()) return "Enter your name";
    if (isNaN(sw) || sw < 40 || sw > 300) return "Enter a valid starting weight";
    if (isNaN(gw) || gw < 40 || gw > 300) return "Enter a valid goal weight";
    if (gw >= sw) return "Goal weight should be less than starting weight";
    return "";
  };

  const handleNext = () => {
    if (step === 0 && !profile.name.trim()) { setErr("Enter your name"); return; }
    if (step === 1) {
      const e = validate();
      if (e) { setErr(e); return; }
    }
    setErr("");
    if (step < 2) { setStep(s => s + 1); return; }
    const p = { ...profile, startWeight: parseFloat(profile.startWeight), goalWeight: parseFloat(profile.goalWeight), weeklyGoal: parseFloat(profile.weeklyGoal), createdAt: todayKey() };
    store.set("profile", p);
    onComplete(p);
  };

  const plan = profile.startWeight && profile.goalWeight ? calcPlan({ startWeight: parseFloat(profile.startWeight) || 90, goalWeight: parseFloat(profile.goalWeight) || 80, weeklyGoal: parseFloat(profile.weeklyGoal) || 0.5 }) : null;

  const steps = [
    {
      icon: "user", title: "What's your name?", subtitle: "Let's make this personal",
      content: (
        <input autoFocus value={profile.name} onChange={e => update("name", e.target.value)}
          placeholder="Your first name" onKeyDown={e => e.key === "Enter" && handleNext()}
          style={inputStyle} />
      )
    },
    {
      icon: "weight", title: "Your weight goals", subtitle: "We'll calculate everything from this",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <div style={labelStyle}>Current weight (kg)</div>
            <input type="number" value={profile.startWeight} onChange={e => update("startWeight", e.target.value)}
              placeholder="e.g. 98" step="0.1" style={inputStyle} />
          </div>
          <div>
            <div style={labelStyle}>Goal weight (kg)</div>
            <input type="number" value={profile.goalWeight} onChange={e => update("goalWeight", e.target.value)}
              placeholder="e.g. 88" step="0.1" style={inputStyle} />
          </div>
          <div>
            <div style={labelStyle}>Weekly loss target</div>
            <div style={{ display: "flex", gap: 8 }}>
              {[["0.25", "Gentle\n0.25kg/wk"], ["0.5", "Steady\n0.5kg/wk"], ["0.75", "Aggressive\n0.75kg/wk"]].map(([val, lbl]) => (
                <button key={val} onClick={() => update("weeklyGoal", val)} style={{
                  flex: 1, padding: "10px 6px", borderRadius: 10, border: `1.5px solid ${profile.weeklyGoal === val ? ACCENT : "var(--border)"}`,
                  background: profile.weeklyGoal === val ? "#C8FF0015" : "var(--surface2)",
                  color: profile.weeklyGoal === val ? ACCENT : "var(--muted)",
                  cursor: "pointer", fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 0.5,
                  lineHeight: 1.4, whiteSpace: "pre-line", textAlign: "center",
                }}>
                  {lbl}
                </button>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      icon: "target", title: "Your plan", subtitle: "Here's what we calculated",
      content: plan ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { label: "To lose", val: `${plan.tolose.toFixed(1)}kg` },
            { label: "Timeline", val: `~${plan.weeks} weeks` },
            { label: "Daily calories", val: `~${plan.targetCal} kcal` },
            { label: "Daily protein", val: `~${plan.proteinG}g` },
            { label: "Weekly deficit", val: `~${(plan.dailyDeficit * 7).toLocaleString()} kcal` },
          ].map(s => (
            <div key={s.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", background: "var(--surface2)", borderRadius: 10 }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: 1, color: "var(--muted)" }}>{s.label.toUpperCase()}</span>
              <span style={{ fontWeight: 700, fontSize: 16, color: ACCENT }}>{s.val}</span>
            </div>
          ))}
          <div style={{ padding: "10px 14px", background: "#C8FF0010", borderRadius: 10, borderLeft: `3px solid ${ACCENT}`, fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }}>
            {plan.weeks <= 12 ? "Achievable and sustainable — great goal." : plan.weeks <= 20 ? "A solid, healthy timeline. Consistency wins." : "Long-term transformation. Consider a smaller weekly target."}
          </div>
        </div>
      ) : null
    }
  ];

  const current = steps[step];

  return (
    <div style={{ minHeight: "100dvh", background: "var(--bg)", display: "flex", flexDirection: "column", justifyContent: "center", padding: "40px 24px", maxWidth: 480, margin: "0 auto" }}>
      <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 3, color: "var(--muted)", marginBottom: 32 }}>
        DADFIT · STEP {step + 1} OF 3
      </div>
      <div style={{ display: "flex", gap: 6, marginBottom: 40 }}>
        {[0,1,2].map(i => (
          <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= step ? ACCENT : "var(--border)", transition: "background 0.3s" }} />
        ))}
      </div>

      <div style={{ marginBottom: 8 }}>
        <Icon name={current.icon} size={28} color={ACCENT} />
      </div>
      <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.5, marginBottom: 6, marginTop: 12 }}>{current.title}</h1>
      <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: 32 }}>{current.subtitle}</p>

      {current.content}

      {err && <div style={{ marginTop: 12, fontSize: 12, color: "#FF6B6B" }}>{err}</div>}

      <button onClick={handleNext} style={{
        width: "100%", marginTop: 32, padding: "16px", borderRadius: 14, border: "none",
        background: ACCENT, color: "#000", cursor: "pointer",
        fontFamily: "var(--mono)", fontSize: 13, fontWeight: 700, letterSpacing: 1.5,
      }}>
        {step < 2 ? "CONTINUE →" : "START MY PLAN →"}
      </button>

      {step > 0 && (
        <button onClick={() => { setStep(s => s - 1); setErr(""); }} style={{
          width: "100%", marginTop: 12, padding: "14px", borderRadius: 14, border: "1px solid var(--border)",
          background: "none", color: "var(--muted)", cursor: "pointer",
          fontFamily: "var(--mono)", fontSize: 12, letterSpacing: 1,
        }}>
          ← BACK
        </button>
      )}
    </div>
  );
}

const inputStyle = {
  width: "100%", padding: "14px 16px", borderRadius: 12,
  border: "1.5px solid var(--border)", background: "var(--surface2)",
  color: "var(--text)", fontSize: 16, outline: "none",
  fontFamily: "var(--font)", transition: "border-color 0.2s",
};
const labelStyle = {
  fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 2,
  color: "var(--muted)", marginBottom: 8, display: "block",
};

// ── Main App ───────────────────────────────────────────────────────────────────
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
  const [editingProfile, setEditingProfile] = useState(false);

  const todaySchedIdx = dayIdxToSchedule(new Date().getDay());
  const todayData = DAYS[todaySchedIdx];
  const todayK = todayKey();
  const isTodayDone = !!completedDays[todayK];

  // Derived from profile
  const plan = profile ? calcPlan(profile) : null;
  const latestWeight = weights.length ? weights[weights.length - 1].kg : (profile?.startWeight || 90);
  const lost = profile ? Math.max(0, profile.startWeight - latestWeight) : 0;
  const pct = plan ? Math.min(100, (lost / plan.tolose) * 100) : 0;
  const mealCal = plan ? plan.targetCal : 1900;

  useEffect(() => {
    let s = 0;
    const today = new Date();
    for (let i = 0; i < 60; i++) {
      const d = new Date(today); d.setDate(d.getDate() - i);
      const k = d.toISOString().slice(0, 10);
      const sd = DAYS[dayIdxToSchedule(d.getDay())];
      if (sd.type === "rest") continue;
      if (completedDays[k]) s++;
      else if (i > 0) break;
    }
    setStreak(s);
    setTotalWorkouts(Object.values(completedDays).filter(Boolean).length);
  }, [completedDays]);

  const markDone = useCallback(() => {
    const u = { ...completedDays, [todayK]: true };
    setCompletedDays(u); store.set("completedDays", u);
  }, [completedDays, todayK]);

  const unmarkDone = useCallback(() => {
    const u = { ...completedDays }; delete u[todayK];
    setCompletedDays(u); store.set("completedDays", u);
  }, [completedDays, todayK]);

  const scheduleNotif = useCallback((timeStr) => {
    const [h, m] = timeStr.split(":").map(Number);
    const delay = msUntil(h, m);
    const sd = DAYS[dayIdxToSchedule(new Date().getDay())];
    const isW = sd.type === "workout";
    fireNotif(isW ? `Time to train, ${profile?.name || "Dad"}!` : "Active rest day", isW ? `${sd.label} — 25 mins. Get it done.` : "A short walk keeps the momentum going.");
    setTimeout(() => scheduleNotif(timeStr), delay + 1000);
  }, [profile]);

  const enableNotifs = async () => {
    const p = await requestNotifPerm();
    setNotifPerm(p);
    if (p === "granted") { setNotifEnabled(true); store.set("notifEnabled", true); scheduleNotif(notifTime); }
  };

  useEffect(() => {
    if (notifEnabled && notifPerm === "granted") scheduleNotif(notifTime);
  }, []); // eslint-disable-line

  const addWeight = () => {
    const w = parseFloat(weightInput);
    if (isNaN(w) || w < 40 || w > 200) return;
    const updated = [...weights.filter(x => x.date !== todayK), { date: todayK, kg: w }]
      .sort((a, b) => a.date.localeCompare(b.date));
    setWeights(updated); store.set("weights", updated); setWeightInput("");
  };

  const streakLabel = streak === 0 ? "Start today" : streak < 4 ? "Building momentum" : streak < 8 ? "On a roll" : streak < 12 ? "Unstoppable" : "Legend status";

  const cssVars = `
    :root {
      --bg: #0f0f0f; --surface: #1a1a1a; --surface2: #222;
      --border: #2a2a2a; --text: #f0f0f0; --muted: #666;
      --accent: #C8FF00; --font: 'DM Sans', sans-serif; --mono: 'DM Mono', monospace;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
    body { background: var(--bg); color: var(--text); font-family: var(--font); }
    input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; }
    input[type=time] { color-scheme: dark; }
    input:focus { border-color: var(--accent) !important; }
  `;

  if (!profile || editingProfile) {
    return (
      <>
        <style>{cssVars}</style>
        <Onboarding onComplete={p => { setProfile(p); setEditingProfile(false); }} />
      </>
    );
  }

  return (
    <>
      <style>{cssVars}</style>
      <div style={{ fontFamily: "var(--font)", background: "var(--bg)", minHeight: "100dvh", maxWidth: 480, margin: "0 auto", paddingBottom: 80 }}>

        {/* ── HEADER ── */}
        <div style={{ background: "var(--bg)", padding: "max(env(safe-area-inset-top), 20px) 20px 0", borderBottom: "1px solid var(--border)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", paddingBottom: 20 }}>
            <div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 3, color: "var(--muted)", marginBottom: 4 }}>
                DADFIT · {profile.name.toUpperCase()}
              </div>
              <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.5, lineHeight: 1 }}>
                {lost > 0
                  ? <><span style={{ color: "var(--accent)" }}>{lost.toFixed(1)}kg</span> down</>
                  : `Hey ${profile.name}`}
              </div>
              <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>
                {(plan.tolose - lost).toFixed(1)}kg to go · ~{plan.weeks} week plan
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 36, fontWeight: 700, color: streak > 0 ? "var(--accent)" : "var(--muted)", letterSpacing: -2, lineHeight: 1 }}>{streak}</div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: 2, color: "var(--muted)" }}>DAY STREAK</div>
              {streak > 0 && <div style={{ fontSize: 11, color: "var(--accent)", marginTop: 2 }}>{streakLabel}</div>}
            </div>
          </div>
          <div style={{ height: 3, background: "var(--border)", position: "relative" }}>
            <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${pct}%`, background: "var(--accent)", borderRadius: 2, transition: "width 0.6s ease" }} />
          </div>
          <div style={{ display: "flex", marginTop: 0 }}>
            {[
              { id: "today", icon: "today", label: "Today" },
              { id: "schedule", icon: "schedule", label: "Schedule" },
              { id: "meals", icon: "meals", label: "Meals" },
              { id: "progress", icon: "progress", label: "Progress" },
              { id: "settings", icon: "settings", label: "Settings" },
            ].map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                flex: 1, background: "none", border: "none", cursor: "pointer",
                padding: "12px 4px 14px",
                borderBottom: tab === t.id ? `2px solid var(--accent)` : "2px solid transparent",
                color: tab === t.id ? "var(--accent)" : "var(--muted)",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                transition: "color 0.15s",
              }}>
                <Icon name={t.icon} size={18} strokeWidth={tab === t.id ? 2 : 1.5} />
                <span style={{ fontSize: 9, fontFamily: "var(--mono)", letterSpacing: 1 }}>{t.label.toUpperCase()}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── CONTENT ── */}
        <div style={{ padding: "20px 16px" }}>

          {/* TODAY */}
          {tab === "today" && (
            <div>
              <div style={{ background: "var(--surface)", borderRadius: 16, padding: 20, marginBottom: 12, border: "1px solid var(--border)", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: ACCENTS[todayData.accentIdx] }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <div>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 2, color: "var(--muted)", marginBottom: 6 }}>{todayData.tag} · {todayData.day.toUpperCase()}</div>
                    <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: -0.5 }}>{todayData.label}</div>
                    <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 4, display: "flex", alignItems: "center", gap: 6 }}>
                      <Icon name="today" size={13} color="var(--muted)" />
                      {todayData.time}
                    </div>
                  </div>
                  {isTodayDone && (
                    <div style={{ width: 44, height: 44, borderRadius: 22, background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon name="check" size={22} color="#000" strokeWidth={2.5} />
                    </div>
                  )}
                </div>
                {todayData.type === "workout" && todayData.exercises && (
                  <>
                    <div style={{ background: "var(--surface2)", borderRadius: 10, padding: "10px 14px", marginBottom: 12, fontSize: 12, color: "var(--muted)", borderLeft: `3px solid ${ACCENTS[todayData.accentIdx]}` }}>
                      Warmup — {todayData.warmup}
                    </div>
                    {todayData.exercises.map((ex, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "10px 0", borderBottom: i < todayData.exercises.length - 1 ? "1px solid var(--border)" : "none" }}>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 14 }}>{ex.name}</div>
                          {ex.note && <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{ex.note}</div>}
                        </div>
                        <div style={{ fontFamily: "var(--mono)", fontSize: 12, color: ACCENTS[todayData.accentIdx], background: ACCENTS[todayData.accentIdx] + "18", padding: "4px 10px", borderRadius: 6, whiteSpace: "nowrap", marginLeft: 12 }}>
                          {ex.sets}
                        </div>
                      </div>
                    ))}
                    <div style={{ background: "var(--surface2)", borderRadius: 10, padding: "10px 14px", marginTop: 12, fontSize: 12, color: "var(--muted)" }}>
                      Cooldown — {todayData.cooldown}
                    </div>
                  </>
                )}
                {todayData.type === "rest" && <div style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.6 }}>{todayData.note}</div>}
                <button onClick={isTodayDone ? unmarkDone : markDone} style={{
                  width: "100%", marginTop: 20, padding: "14px", borderRadius: 12, border: "none", cursor: "pointer",
                  background: isTodayDone ? "var(--surface2)" : "var(--accent)",
                  color: isTodayDone ? "var(--muted)" : "#000",
                  fontFamily: "var(--mono)", fontSize: 13, fontWeight: 600, letterSpacing: 1,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                }}>
                  <Icon name="check" size={16} color={isTodayDone ? "var(--muted)" : "#000"} strokeWidth={2.5} />
                  {isTodayDone ? "MARKED DONE — UNDO" : todayData.type === "rest" ? "MARK REST DAY DONE" : "MARK WORKOUT COMPLETE"}
                </button>
              </div>
              {streak > 0 && (
                <div style={{ background: "var(--surface)", borderRadius: 16, padding: 20, border: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 26, background: "#C8FF0018", border: "2px solid var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon name="flame" size={24} color="var(--accent)" />
                  </div>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 700 }}>{streak} day streak</div>
                    <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 2 }}>{streakLabel} — keep it going</div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SCHEDULE */}
          {tab === "schedule" && (
            <div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 2, color: "var(--muted)", marginBottom: 16 }}>THIS WEEK</div>
              {DAYS.map((d, i) => {
                const today = new Date(), currIdx = dayIdxToSchedule(today.getDay());
                const dd = new Date(today); dd.setDate(today.getDate() + (i - currIdx));
                const done = completedDays[dd.toISOString().slice(0, 10)];
                const isToday = i === todaySchedIdx;
                const acc = ACCENTS[d.accentIdx];
                return (
                  <div key={d.day} style={{ background: "var(--surface)", borderRadius: 14, marginBottom: 8, overflow: "hidden", border: isToday ? `1px solid ${acc}` : "1px solid var(--border)" }}>
                    <div onClick={() => d.type !== "rest" && setExpandedDay(expandedDay === i ? null : i)}
                      style={{ display: "flex", alignItems: "center", padding: "14px 16px", gap: 14, cursor: d.type !== "rest" ? "pointer" : "default" }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, flexShrink: 0, background: done ? acc : d.type === "rest" ? "var(--surface2)" : acc + "18", border: `1px solid ${done ? acc : d.type === "rest" ? "var(--border)" : acc + "40"}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {done ? <Icon name="check" size={18} color="#000" strokeWidth={2.5} /> : <span style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: 1, color: d.type === "rest" ? "var(--muted)" : acc, fontWeight: 600 }}>{d.short}</span>}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: 15, display: "flex", alignItems: "center", gap: 8 }}>
                          {d.label}
                          {isToday && <span style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: 1, color: acc, background: acc + "18", padding: "2px 6px", borderRadius: 4 }}>TODAY</span>}
                        </div>
                        <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{d.time}</div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: 1.5, color: d.type === "rest" ? "var(--muted)" : acc }}>{d.tag}</span>
                        {d.type !== "rest" && <Icon name={expandedDay === i ? "chevronUp" : "chevronDown"} size={16} color="var(--muted)" />}
                      </div>
                    </div>
                    {expandedDay === i && d.exercises && (
                      <div style={{ padding: "0 16px 16px", borderTop: "1px solid var(--border)" }}>
                        <div style={{ fontSize: 12, color: "var(--muted)", padding: "10px 0 10px 10px", borderLeft: `2px solid ${acc}`, marginBottom: 4 }}>Warmup — {d.warmup}</div>
                        {d.exercises.map((ex, j) => (
                          <div key={j} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: j < d.exercises.length - 1 ? "1px solid var(--border)" : "none" }}>
                            <div>
                              <div style={{ fontWeight: 600, fontSize: 14 }}>{ex.name}</div>
                              {ex.note && <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 1 }}>{ex.note}</div>}
                            </div>
                            <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: acc, background: acc + "15", padding: "4px 10px", borderRadius: 6, whiteSpace: "nowrap", marginLeft: 12 }}>{ex.sets}</div>
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
              <div style={{ background: "var(--surface)", borderRadius: 14, padding: 16, marginBottom: 16, border: "1px solid var(--border)" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  {[
                    { label: "Daily Target", val: `~${plan.targetCal} kcal` },
                    { label: "Protein Goal", val: `~${plan.proteinG}g` },
                    { label: "Deficit/day", val: `~${plan.dailyDeficit} kcal` },
                  ].map(s => (
                    <div key={s.label}>
                      <div style={{ fontSize: 15, fontWeight: 700, color: "var(--accent)" }}>{s.val}</div>
                      <div style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: 1, color: "var(--muted)", marginTop: 2 }}>{s.label.toUpperCase()}</div>
                    </div>
                  ))}
                </div>
              </div>
              {MEALS.map((m, i) => {
                const mCal = Math.round(mealCal * m.pct);
                return (
                  <div key={m.meal} style={{ background: "var(--surface)", borderRadius: 14, marginBottom: 8, overflow: "hidden", border: "1px solid var(--border)" }}>
                    <div onClick={() => setExpandedMeal(expandedMeal === i ? null : i)}
                      style={{ display: "flex", alignItems: "center", padding: "14px 16px", gap: 14, cursor: "pointer" }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: "#C8FF0015", border: "1px solid #C8FF0030", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Icon name="meals" size={18} color="var(--accent)" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: 15 }}>{m.meal}</div>
                        <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 1 }}>{m.time} · {m.goal}</div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--accent)" }}>~{mCal}</span>
                        <Icon name={expandedMeal === i ? "chevronUp" : "chevronDown"} size={16} color="var(--muted)" />
                      </div>
                    </div>
                    {expandedMeal === i && (
                      <div style={{ padding: "0 16px 16px", borderTop: "1px solid var(--border)" }}>
                        <div style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: 2, color: "var(--muted)", margin: "12px 0 8px" }}>GOOD OPTIONS</div>
                        {m.ideas.map((idea, j) => (
                          <div key={j} style={{ padding: "8px 12px", background: "var(--surface2)", borderRadius: 8, fontSize: 13, marginBottom: 4 }}>{idea}</div>
                        ))}
                        <div style={{ marginTop: 10, padding: "8px 12px", background: "#FF3B6B10", borderRadius: 8, fontSize: 12, color: "#FF6B6B", borderLeft: "3px solid #FF3B6B" }}>
                          Avoid — {m.avoid}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* PROGRESS */}
          {tab === "progress" && (
            <div>
              <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                {[
                  { label: "START", val: `${profile.startWeight}kg` },
                  { label: "NOW", val: `${latestWeight}kg`, hi: true },
                  { label: "LOST", val: `${lost.toFixed(1)}kg` },
                  { label: "GOAL", val: `${profile.goalWeight}kg` },
                ].map(s => (
                  <div key={s.label} style={{ flex: 1, background: s.hi ? "#C8FF0015" : "var(--surface)", borderRadius: 12, padding: "12px 8px", textAlign: "center", border: s.hi ? "1px solid #C8FF0040" : "1px solid var(--border)" }}>
                    <div style={{ fontSize: 18, fontWeight: 700, color: s.hi ? "var(--accent)" : "var(--text)" }}>{s.val}</div>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: 1.5, color: "var(--muted)", marginTop: 2 }}>{s.label}</div>
                  </div>
                ))}
              </div>

              <div style={{ background: "var(--surface)", borderRadius: 14, padding: 16, marginBottom: 12, border: "1px solid var(--border)" }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 2, color: "var(--muted)", marginBottom: 12 }}>LOG WEIGHT</div>
                <div style={{ display: "flex", gap: 8 }}>
                  <input type="number" value={weightInput} onChange={e => setWeightInput(e.target.value)}
                    placeholder={`e.g. ${latestWeight}`} step="0.1"
                    style={{ flex: 1, padding: "12px 14px", borderRadius: 10, border: "1px solid var(--border)", background: "var(--surface2)", color: "var(--text)", fontSize: 16, outline: "none", fontFamily: "var(--font)" }}
                  />
                  <button onClick={addWeight} style={{ padding: "12px 18px", borderRadius: 10, border: "none", background: "var(--accent)", color: "#000", cursor: "pointer", fontFamily: "var(--mono)", fontSize: 12, fontWeight: 600, letterSpacing: 1, display: "flex", alignItems: "center", gap: 6 }}>
                    <Icon name="plus" size={16} color="#000" strokeWidth={2.5} /> LOG
                  </button>
                </div>
              </div>

              {weights.length > 1 && (
                <div style={{ background: "var(--surface)", borderRadius: 14, padding: 16, marginBottom: 12, border: "1px solid var(--border)" }}>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 2, color: "var(--muted)", marginBottom: 14 }}>WEIGHT HISTORY</div>
                  {weights.slice(-8).map((w, i, arr) => {
                    const max = Math.max(...arr.map(x => x.kg));
                    const min = Math.min(...arr.map(x => x.kg));
                    const barW = 15 + ((w.kg - min) / (max - min || 1)) * 75;
                    const isLatest = i === arr.length - 1;
                    return (
                      <div key={w.date} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                        <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--muted)", width: 48, flexShrink: 0 }}>{w.date.slice(5)}</div>
                        <div style={{ flex: 1, height: 24, background: "var(--surface2)", borderRadius: 4, overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${barW}%`, background: isLatest ? "var(--accent)" : "#C8FF0050", borderRadius: 4 }} />
                        </div>
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
                    const acc = ACCENTS[d.accentIdx];
                    return (
                      <div key={d.day} style={{ flex: 1, textAlign: "center" }}>
                        <div style={{ height: 36, borderRadius: 8, background: done ? acc : d.type === "rest" ? "var(--surface2)" : "var(--border)", border: isToday ? `2px solid ${acc}` : "2px solid transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {done && <Icon name="check" size={14} color="#000" strokeWidth={2.5} />}
                        </div>
                        <div style={{ fontFamily: "var(--mono)", fontSize: 8, color: isToday ? acc : "var(--muted)", marginTop: 4 }}>{d.short}</div>
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
                  const wk = Math.round(plan.weeks * frac);
                  return (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "10px 0", borderBottom: i < 3 ? "1px solid var(--border)" : "none" }}>
                      <div style={{ width: 36, height: 36, borderRadius: 18, flexShrink: 0, background: reached ? "var(--accent)" : "var(--surface2)", border: `1px solid ${reached ? "var(--accent)" : "var(--border)"}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {reached ? <Icon name="check" size={16} color="#000" strokeWidth={2.5} /> : <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--muted)" }}>W{wk}</span>}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: 14, color: reached ? "var(--accent)" : "var(--text)" }}>−{target.toFixed(1)}kg</div>
                        <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 1 }}>
                          {frac === 0.25 ? "Body adjusting, energy improving" : frac === 0.5 ? "Clothes feeling looser" : frac === 0.75 ? "Noticeably different in photos" : "Goal achieved!"}
                        </div>
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
              {/* Profile summary */}
              <div style={{ background: "var(--surface)", borderRadius: 14, padding: 16, marginBottom: 12, border: "1px solid var(--border)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Icon name="user" size={18} color="var(--accent)" />
                    <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 2, color: "var(--muted)" }}>YOUR PROFILE</div>
                  </div>
                  <button onClick={() => setEditingProfile(true)} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "1px solid var(--border)", borderRadius: 8, padding: "6px 12px", color: "var(--muted)", cursor: "pointer", fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 1 }}>
                    <Icon name="edit" size={13} color="var(--muted)" /> EDIT
                  </button>
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {[
                    { label: "Name", val: profile.name },
                    { label: "Start", val: `${profile.startWeight}kg` },
                    { label: "Goal", val: `${profile.goalWeight}kg` },
                    { label: "Rate", val: `${profile.weeklyGoal}kg/wk` },
                    { label: "Timeline", val: `~${plan.weeks} wks` },
                    { label: "Calories", val: `~${plan.targetCal}` },
                  ].map(s => (
                    <div key={s.label} style={{ background: "var(--surface2)", borderRadius: 8, padding: "8px 12px", minWidth: "calc(33% - 6px)" }}>
                      <div style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: 1, color: "var(--muted)" }}>{s.label.toUpperCase()}</div>
                      <div style={{ fontWeight: 600, fontSize: 14, marginTop: 2, color: "var(--accent)" }}>{s.val}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: "var(--surface)", borderRadius: 14, padding: 16, marginBottom: 12, border: "1px solid var(--border)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <Icon name="bell" size={18} color="var(--accent)" />
                  <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 2, color: "var(--muted)" }}>WORKOUT REMINDERS</div>
                </div>
                {notifPerm === "denied" ? (
                  <div style={{ padding: "10px 14px", background: "#FF3B6B10", borderRadius: 10, fontSize: 13, color: "#FF6B6B", borderLeft: "3px solid #FF3B6B" }}>
                    Notifications blocked. Enable in your phone settings.
                  </div>
                ) : (
                  <>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 14 }}>Reminder time</div>
                        <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>Set 5 min before you want to start</div>
                      </div>
                      <input type="time" value={notifTime} onChange={e => { setNotifTime(e.target.value); store.set("notifTime", e.target.value); }}
                        style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid var(--border)", background: "var(--surface2)", color: "var(--text)", fontSize: 14, outline: "none", fontFamily: "var(--mono)" }} />
                    </div>
                    <button onClick={notifEnabled ? () => { setNotifEnabled(false); store.set("notifEnabled", false); } : enableNotifs}
                      style={{ width: "100%", padding: "13px", borderRadius: 12, border: notifEnabled ? "1px solid var(--border)" : "none", background: notifEnabled ? "var(--surface2)" : "var(--accent)", color: notifEnabled ? "var(--muted)" : "#000", cursor: "pointer", fontFamily: "var(--mono)", fontSize: 12, fontWeight: 600, letterSpacing: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                      <Icon name="bell" size={15} color={notifEnabled ? "var(--muted)" : "#000"} />
                      {notifEnabled ? `ON · ${notifTime} — TAP TO DISABLE` : "ENABLE REMINDERS"}
                    </button>
                  </>
                )}
              </div>

              <div style={{ background: "var(--surface)", borderRadius: 14, padding: 16, marginBottom: 12, border: "1px solid var(--border)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <Icon name="phone" size={18} color="var(--accent)" />
                  <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 2, color: "var(--muted)" }}>INSTALL AS APP</div>
                </div>
                {[
                  { label: "iPhone", detail: "Safari → Share → Add to Home Screen" },
                  { label: "Android", detail: "Chrome menu (⋮) → Add to Home Screen" },
                ].map(p => (
                  <div key={p.label} style={{ padding: "10px 14px", background: "var(--surface2)", borderRadius: 10, marginBottom: 8 }}>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{p.label}</div>
                    <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{p.detail}</div>
                  </div>
                ))}
              </div>

              <div style={{ background: "var(--surface)", borderRadius: 14, padding: 16, border: "1px solid var(--border)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <Icon name="refresh" size={18} color="#FF3B6B" />
                  <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 2, color: "var(--muted)" }}>RESET</div>
                </div>
                <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 12 }}>Clear all progress and start fresh.</p>
                <button onClick={() => {
                  if (window.confirm("Reset everything? This can't be undone.")) {
                    ["completedDays", "weights", "profile", "notifEnabled"].forEach(k => localStorage.removeItem(k));
                    setCompletedDays({}); setWeights([]); setProfile(null); setStreak(0); setTotalWorkouts(0);
                  }
                }} style={{ width: "100%", padding: "13px", borderRadius: 12, border: "1px solid #FF3B6B40", background: "#FF3B6B10", color: "#FF6B6B", cursor: "pointer", fontFamily: "var(--mono)", fontSize: 12, fontWeight: 600, letterSpacing: 1 }}>
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
