import { useState, useEffect, useCallback } from "react";

// ── Google Fonts ──────────────────────────────────────────────────────────────
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
    weight: <><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></>,
    bell: <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></>,
    zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>,
    trophy: <><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></>,
    plus: <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    trash: <><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></>,
    phone: <><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></>,
    refresh: <><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
};

// ── Data ──────────────────────────────────────────────────────────────────────
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
    note: "10–15 min walk at lunch. Drink extra water.",
  },
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
    note: "Muscles grow on rest days. Prioritise sleep.",
  },
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
    note: "Recharge. Church, family time, a good meal.",
  },
];

const MEALS = [
  { meal: "Breakfast", time: "7:00am", cal: "400–500 kcal", goal: "High protein, quick prep",
    ideas: ["3 scrambled eggs + wholegrain toast", "Greek yoghurt + banana + almonds", "Oats with protein powder + berries"],
    avoid: "Cereal, muesli bars, toast with jam only" },
  { meal: "Morning Tea", time: "10:00am", cal: "150–200 kcal", goal: "Keep hunger at bay",
    ideas: ["Apple + small handful of almonds", "Boiled egg + rice crackers", "Black coffee or tea"],
    avoid: "Biscuits, chips, sugary drinks" },
  { meal: "Lunch", time: "12:30pm", cal: "500–600 kcal", goal: "Big, filling, protein-forward",
    ideas: ["Chicken + brown rice + salad", "Tuna wrap with spinach + tomato", "Last night's leftovers"],
    avoid: "Meal deals with chips, white bread" },
  { meal: "Afternoon Tea", time: "3:30pm", cal: "150–200 kcal", goal: "Bridge to dinner",
    ideas: ["Piece of fruit", "Hummus + veggie sticks", "Protein shake if you trained"],
    avoid: "Don't skip — you'll overeat at dinner" },
  { meal: "Dinner", time: "6:00pm", cal: "600–700 kcal", goal: "Family meal, watch portions",
    ideas: ["Protein + lots of veggies + small carbs", "Stir-fry with lean meat over brown rice", "Bolognese with lentils — less mince, more veg"],
    avoid: "Seconds, kids' leftovers, large desserts" },
];

const TIPS = [
  { icon: "weight", text: "Drink 2–3L of water daily. Thirst often masks as hunger." },
  { icon: "zap", text: "Sleep is your secret weapon. Poor sleep spikes hunger hormones." },
  { icon: "schedule", text: "Batch cook Sunday — chicken, rice, boiled eggs for the week." },
  { icon: "trash", text: "Cut sugary drinks entirely — Coke, juice, cordial, energy drinks." },
  { icon: "weight", text: "Weigh yourself once a week, same morning, same conditions." },
  { icon: "flame", text: "If kids wake early, even 15 min is better than nothing." },
];

// ── Accent palette (no emojis) ────────────────────────────────────────────────
const ACCENTS = ["#C8FF00", "#FF6B35", "#00D4FF", "#FF3B6B"];
const ACCENT = "#C8FF00"; // primary lime

// ── Storage ───────────────────────────────────────────────────────────────────
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

async function requestNotifPerm() {
  if (!("Notification" in window)) return "unsupported";
  if (Notification.permission === "granted") return "granted";
  return await Notification.requestPermission();
}

function fireNotif(title, body) {
  if (Notification.permission !== "granted") return;
  navigator.serviceWorker?.ready.then(reg => {
    reg.showNotification(title, { body, icon: "/icon-192.png", vibrate: [200, 100, 200], tag: "dadfit" });
  }).catch(() => new Notification(title, { body }));
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
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

  const todaySchedIdx = dayIdxToSchedule(new Date().getDay());
  const todayData = DAYS[todaySchedIdx];
  const todayK = todayKey();
  const isTodayDone = !!completedDays[todayK];

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
    fireNotif(isW ? "Time to train, Dad" : "Active rest day", isW ? `${sd.label} — 25 mins. Get it done.` : "A short walk keeps the momentum going.");
    setTimeout(() => scheduleNotif(timeStr), delay + 1000);
  }, []);

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

  const latestWeight = weights.length ? weights[weights.length - 1].kg : 98;
  const startWeight = weights.length ? weights[0].kg : 98;
  const lost = Math.max(0, startWeight - latestWeight);
  const pct = Math.min(100, (lost / 10) * 100);

  const streakLabel = streak === 0 ? "Start today" : streak < 4 ? "Building momentum" : streak < 8 ? "On a roll" : streak < 12 ? "Unstoppable" : "Legend status";

  // ── CSS vars injected once ──
  const cssVars = `
    :root {
      --bg: #0f0f0f;
      --surface: #1a1a1a;
      --surface2: #222;
      --border: #2a2a2a;
      --text: #f0f0f0;
      --muted: #666;
      --accent: #C8FF00;
      --accent2: #FF6B35;
      --accent3: #00D4FF;
      --font: 'DM Sans', sans-serif;
      --mono: 'DM Mono', monospace;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
    body { background: var(--bg); color: var(--text); font-family: var(--font); }
    input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; }
    input[type=time] { color-scheme: dark; }
  `;

  return (
    <>
      <style>{cssVars}</style>
      <div style={{ fontFamily: "var(--font)", background: "var(--bg)", minHeight: "100dvh", maxWidth: 480, margin: "0 auto", paddingBottom: 80 }}>

        {/* ── HEADER ── */}
        <div style={{ background: "var(--bg)", padding: "max(env(safe-area-inset-top), 20px) 20px 0", borderBottom: "1px solid var(--border)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", paddingBottom: 20 }}>
            <div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 3, color: "var(--muted)", marginBottom: 4 }}>DADFIT</div>
              <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.5, lineHeight: 1 }}>
                {lost > 0 ? <><span style={{ color: "var(--accent)" }}>{lost.toFixed(1)}kg</span> down</> : "Let's go, Dad"}
              </div>
              <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>{(10 - lost).toFixed(1)}kg to goal · Week {Math.ceil((totalWorkouts || 1) / 4)}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 36, fontWeight: 700, color: streak > 0 ? "var(--accent)" : "var(--muted)", letterSpacing: -2, lineHeight: 1 }}>{streak}</div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: 2, color: "var(--muted)" }}>DAY STREAK</div>
              {streak > 0 && <div style={{ fontSize: 11, color: "var(--accent)", marginTop: 2 }}>{streakLabel}</div>}
            </div>
          </div>
          {/* Progress bar */}
          <div style={{ height: 3, background: "var(--border)", marginBottom: 0, position: "relative" }}>
            <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${pct}%`, background: "var(--accent)", borderRadius: 2, transition: "width 0.6s ease" }} />
          </div>
          {/* Tabs */}
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
              {/* Today card */}
              <div style={{ background: "var(--surface)", borderRadius: 16, padding: 20, marginBottom: 12, border: "1px solid var(--border)", position: "relative", overflow: "hidden" }}>
                {/* Accent stripe */}
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

                {todayData.type === "rest" && (
                  <div style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.6 }}>{todayData.note}</div>
                )}

                <button onClick={isTodayDone ? unmarkDone : markDone} style={{
                  width: "100%", marginTop: 20, padding: "14px", borderRadius: 12, border: "none", cursor: "pointer",
                  background: isTodayDone ? "var(--surface2)" : "var(--accent)",
                  color: isTodayDone ? "var(--muted)" : "#000",
                  fontFamily: "var(--mono)", fontSize: 13, fontWeight: 600, letterSpacing: 1,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  transition: "all 0.15s",
                }}>
                  <Icon name="check" size={16} color={isTodayDone ? "var(--muted)" : "#000"} strokeWidth={2.5} />
                  {isTodayDone ? "MARKED DONE — UNDO" : todayData.type === "rest" ? "MARK REST DAY DONE" : "MARK WORKOUT COMPLETE"}
                </button>
              </div>

              {/* Streak card */}
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
                const diff = i - currIdx;
                const dd = new Date(today); dd.setDate(today.getDate() + diff);
                const dk = dd.toISOString().slice(0, 10);
                const done = completedDays[dk];
                const isToday = i === todaySchedIdx;
                const acc = ACCENTS[d.accentIdx];
                return (
                  <div key={d.day} style={{ background: "var(--surface)", borderRadius: 14, marginBottom: 8, overflow: "hidden", border: isToday ? `1px solid ${acc}` : "1px solid var(--border)" }}>
                    <div onClick={() => d.type !== "rest" && setExpandedDay(expandedDay === i ? null : i)}
                      style={{ display: "flex", alignItems: "center", padding: "14px 16px", gap: 14, cursor: d.type !== "rest" ? "pointer" : "default" }}>
                      <div style={{
                        width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                        background: done ? acc : d.type === "rest" ? "var(--surface2)" : acc + "18",
                        border: `1px solid ${done ? acc : d.type === "rest" ? "var(--border)" : acc + "40"}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        {done
                          ? <Icon name="check" size={18} color="#000" strokeWidth={2.5} />
                          : <span style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: 1, color: d.type === "rest" ? "var(--muted)" : acc, fontWeight: 600 }}>{d.short}</span>
                        }
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
                        <div style={{ fontSize: 12, color: "var(--muted)", padding: "10px 0", borderLeft: `2px solid ${acc}`, paddingLeft: 10, marginBottom: 4 }}>
                          Warmup — {d.warmup}
                        </div>
                        {d.exercises.map((ex, j) => (
                          <div key={j} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: j < d.exercises.length - 1 ? "1px solid var(--border)" : "none" }}>
                            <div>
                              <div style={{ fontWeight: 600, fontSize: 14 }}>{ex.name}</div>
                              {ex.note && <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 1 }}>{ex.note}</div>}
                            </div>
                            <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: acc, background: acc + "15", padding: "4px 10px", borderRadius: 6, whiteSpace: "nowrap", marginLeft: 12 }}>{ex.sets}</div>
                          </div>
                        ))}
                        <div style={{ fontSize: 12, color: "var(--muted)", paddingTop: 10, paddingLeft: 10, borderLeft: "2px solid var(--border)" }}>
                          Cooldown — {d.cooldown}
                        </div>
                      </div>
                    )}
                    {d.type === "rest" && d.note && expandedDay !== i && (
                      <div style={{ padding: "0 16px 14px", fontSize: 12, color: "var(--muted)" }}>{d.note}</div>
                    )}
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
                    { label: "Daily Target", val: "~1,900 kcal" },
                    { label: "Protein Goal", val: "150g+" },
                  ].map(s => (
                    <div key={s.label}>
                      <div style={{ fontSize: 18, fontWeight: 700, color: "var(--accent)" }}>{s.val}</div>
                      <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 1, color: "var(--muted)", marginTop: 2 }}>{s.label.toUpperCase()}</div>
                    </div>
                  ))}
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: "var(--accent)" }}>5</div>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 1, color: "var(--muted)", marginTop: 2 }}>MEALS/DAY</div>
                  </div>
                </div>
              </div>
              {MEALS.map((m, i) => (
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
                    <div style={{ textAlign: "right", display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--accent)" }}>{m.cal}</span>
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
              ))}
              <div style={{ background: "var(--surface)", borderRadius: 14, padding: 16, border: "1px solid var(--border)", marginTop: 8 }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 2, color: "var(--muted)", marginBottom: 14 }}>DAILY TIPS</div>
                {TIPS.map((t, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: i < TIPS.length - 1 ? 12 : 0 }}>
                    <Icon name={t.icon} size={16} color="var(--accent)" />
                    <span style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.5 }}>{t.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PROGRESS */}
          {tab === "progress" && (
            <div>
              {/* Stats row */}
              <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                {[
                  { label: "START", val: `${startWeight}kg` },
                  { label: "NOW", val: `${latestWeight}kg`, highlight: true },
                  { label: "LOST", val: `${lost.toFixed(1)}kg` },
                  { label: "TO GO", val: `${Math.max(0, latestWeight - 88).toFixed(1)}kg` },
                ].map(s => (
                  <div key={s.label} style={{ flex: 1, background: s.highlight ? "#C8FF0015" : "var(--surface)", borderRadius: 12, padding: "12px 8px", textAlign: "center", border: s.highlight ? "1px solid #C8FF0040" : "1px solid var(--border)" }}>
                    <div style={{ fontSize: 18, fontWeight: 700, color: s.highlight ? "var(--accent)" : "var(--text)" }}>{s.val}</div>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: 1.5, color: "var(--muted)", marginTop: 2 }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Weight log */}
              <div style={{ background: "var(--surface)", borderRadius: 14, padding: 16, marginBottom: 12, border: "1px solid var(--border)" }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 2, color: "var(--muted)", marginBottom: 12 }}>LOG WEIGHT</div>
                <div style={{ display: "flex", gap: 8 }}>
                  <input type="number" value={weightInput} onChange={e => setWeightInput(e.target.value)}
                    placeholder="e.g. 97.5" step="0.1"
                    style={{ flex: 1, padding: "12px 14px", borderRadius: 10, border: "1px solid var(--border)", background: "var(--surface2)", color: "var(--text)", fontSize: 16, outline: "none", fontFamily: "var(--font)" }}
                  />
                  <button onClick={addWeight} style={{ padding: "12px 18px", borderRadius: 10, border: "none", background: "var(--accent)", color: "#000", cursor: "pointer", fontFamily: "var(--mono)", fontSize: 12, fontWeight: 600, letterSpacing: 1, display: "flex", alignItems: "center", gap: 6 }}>
                    <Icon name="plus" size={16} color="#000" strokeWidth={2.5} />
                    LOG
                  </button>
                </div>
              </div>

              {/* Weight chart */}
              {weights.length > 1 && (
                <div style={{ background: "var(--surface)", borderRadius: 14, padding: 16, marginBottom: 12, border: "1px solid var(--border)" }}>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 2, color: "var(--muted)", marginBottom: 14 }}>WEIGHT HISTORY</div>
                  {weights.slice(-8).map((w, i, arr) => {
                    const max = Math.max(...arr.map(x => x.kg));
                    const min = Math.min(...arr.map(x => x.kg));
                    const range = max - min || 1;
                    const barW = 15 + ((w.kg - min) / range) * 75;
                    const isLatest = i === arr.length - 1;
                    return (
                      <div key={w.date} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                        <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--muted)", width: 48, flexShrink: 0 }}>{w.date.slice(5)}</div>
                        <div style={{ flex: 1, height: 24, background: "var(--surface2)", borderRadius: 4, overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${barW}%`, background: isLatest ? "var(--accent)" : "#C8FF0050", borderRadius: 4, transition: "width 0.4s" }} />
                        </div>
                        <div style={{ fontFamily: "var(--mono)", fontSize: 12, fontWeight: 600, color: isLatest ? "var(--accent)" : "var(--text)", width: 48, textAlign: "right", flexShrink: 0 }}>{w.kg}kg</div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Weekly grid */}
              <div style={{ background: "var(--surface)", borderRadius: 14, padding: 16, marginBottom: 12, border: "1px solid var(--border)" }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 2, color: "var(--muted)", marginBottom: 14 }}>THIS WEEK</div>
                <div style={{ display: "flex", gap: 6, justifyContent: "space-between" }}>
                  {DAYS.map((d, i) => {
                    const today = new Date(), currIdx = dayIdxToSchedule(today.getDay());
                    const diff = i - currIdx;
                    const dd = new Date(today); dd.setDate(today.getDate() + diff);
                    const done = completedDays[dd.toISOString().slice(0, 10)];
                    const isToday = i === todaySchedIdx;
                    const acc = ACCENTS[d.accentIdx];
                    return (
                      <div key={d.day} style={{ flex: 1, textAlign: "center" }}>
                        <div style={{
                          height: 36, borderRadius: 8, margin: "0 auto",
                          background: done ? acc : d.type === "rest" ? "var(--surface2)" : "var(--border)",
                          border: isToday ? `2px solid ${acc}` : "2px solid transparent",
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                          {done && <Icon name="check" size={14} color="#000" strokeWidth={2.5} />}
                        </div>
                        <div style={{ fontFamily: "var(--mono)", fontSize: 8, color: isToday ? acc : "var(--muted)", marginTop: 4, letterSpacing: 0.5 }}>{d.short}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Milestones */}
              <div style={{ background: "var(--surface)", borderRadius: 14, padding: 16, border: "1px solid var(--border)" }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 2, color: "var(--muted)", marginBottom: 14 }}>MILESTONES</div>
                {[
                  { week: 4, target: 2, note: "Body adjusting, energy improving" },
                  { week: 8, target: 4, note: "Clothes feeling looser" },
                  { week: 12, target: 7, note: "Noticeably different in photos" },
                  { week: 16, target: 10, note: "Goal achieved" },
                ].map((m, i) => {
                  const reached = lost >= m.target;
                  return (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "10px 0", borderBottom: i < 3 ? "1px solid var(--border)" : "none" }}>
                      <div style={{ width: 36, height: 36, borderRadius: 18, flexShrink: 0, background: reached ? "var(--accent)" : "var(--surface2)", border: `1px solid ${reached ? "var(--accent)" : "var(--border)"}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {reached ? <Icon name="check" size={16} color="#000" strokeWidth={2.5} /> : <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--muted)" }}>W{m.week}</span>}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: 14, color: reached ? "var(--accent)" : "var(--text)" }}>−{m.target}kg</div>
                        <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 1 }}>{m.note}</div>
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
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <Icon name="bell" size={18} color="var(--accent)" />
                  <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: 2, color: "var(--muted)" }}>WORKOUT REMINDERS</div>
                </div>
                <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6, marginBottom: 14 }}>
                  Get a notification before your alarm — mentally prepare before the house wakes up.
                </p>
                {notifPerm === "denied" ? (
                  <div style={{ padding: "10px 14px", background: "#FF3B6B10", borderRadius: 10, fontSize: 13, color: "#FF6B6B", borderLeft: "3px solid #FF3B6B" }}>
                    Notifications blocked. Enable them in your phone settings for this site.
                  </div>
                ) : (
                  <>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 14 }}>Reminder time</div>
                        <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>Set 5 min before you want to start</div>
                      </div>
                      <input type="time" value={notifTime} onChange={e => { setNotifTime(e.target.value); store.set("notifTime", e.target.value); }}
                        style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid var(--border)", background: "var(--surface2)", color: "var(--text)", fontSize: 14, outline: "none", fontFamily: "var(--mono)" }}
                      />
                    </div>
                    <button onClick={notifEnabled ? () => { setNotifEnabled(false); store.set("notifEnabled", false); } : enableNotifs}
                      style={{ width: "100%", padding: "13px", borderRadius: 12, border: notifEnabled ? "1px solid var(--border)" : "none", background: notifEnabled ? "var(--surface2)" : "var(--accent)", color: notifEnabled ? "var(--muted)" : "#000", cursor: "pointer", fontFamily: "var(--mono)", fontSize: 12, fontWeight: 600, letterSpacing: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                      <Icon name="bell" size={15} color={notifEnabled ? "var(--muted)" : "#000"} />
                      {notifEnabled ? `REMINDERS ON — ${notifTime} — TAP TO DISABLE` : "ENABLE REMINDERS"}
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
                <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 12 }}>Clear all workout history and weight logs.</p>
                <button onClick={() => {
                  if (window.confirm("Reset all data? This can't be undone.")) {
                    store.set("completedDays", {}); store.set("weights", []);
                    setCompletedDays({}); setWeights({}); setStreak(0); setTotalWorkouts(0);
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
