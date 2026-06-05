import { useState, useEffect, useCallback } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const DAYS = [
  {
    day: "Monday", short: "MON", type: "workout", label: "Upper Body",
    time: "6:00–6:25am", tag: "STRENGTH", color: "#e8f5e9", accent: "#2e7d32",
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
  {
    day: "Tuesday", short: "TUE", type: "rest", label: "Rest / Walk",
    time: "Lunchtime if possible", tag: "ACTIVE REST", color: "#fafafa", accent: "#9e9e9e",
    note: "10–15 min walk at lunch. Drink extra water. No pressure.",
  },
  {
    day: "Wednesday", short: "WED", type: "workout", label: "Lower Body",
    time: "6:00–6:25am", tag: "STRENGTH", color: "#e3f2fd", accent: "#1565c0",
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
  {
    day: "Thursday", short: "THU", type: "rest", label: "Rest Day",
    time: "Full recovery", tag: "REST", color: "#fafafa", accent: "#9e9e9e",
    note: "Your muscles grow on rest days. Prioritise sleep if the kids allow it!",
  },
  {
    day: "Friday", short: "FRI", type: "workout", label: "Full Body Circuit",
    time: "6:00–6:25am", tag: "CIRCUIT", color: "#fce4ec", accent: "#b71c1c",
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
  {
    day: "Saturday", short: "SAT", type: "workout", label: "Family Walk + Core",
    time: "Morning with the boys", tag: "CARDIO", color: "#fff8e1", accent: "#e65100",
    warmup: "The walk IS the warmup",
    cooldown: "2 min — lower back stretch, seated twist",
    exercises: [
      { name: "Family Walk / Park Run", sets: "30–45 min", note: "Push the pram — extra resistance!" },
      { name: "Plank Hold", sets: "3 × 30 sec", note: "Build to 60 sec over weeks" },
      { name: "Dead Bug", sets: "3 × 10 each side", note: "Great for lower back" },
      { name: "Russian Twists", sets: "3 × 15", note: "Light weight, focus on rotation" },
    ],
  },
  {
    day: "Sunday", short: "SUN", type: "rest", label: "Full Rest",
    time: "Family day", tag: "REST", color: "#fafafa", accent: "#9e9e9e",
    note: "Recharge. Church, family time, a good meal. You earned it.",
  },
];

const MEALS = [
  {
    meal: "Breakfast", icon: "🌅", calories: "~400–500 kcal",
    goal: "High protein, quick to make",
    ideas: ["3 scrambled eggs + 1 slice wholegrain toast", "Greek yoghurt + banana + handful of nuts", "Oats with protein powder + berries"],
    avoid: "Cereal, muesli bars, toast with jam only",
  },
  {
    meal: "Morning Tea", icon: "☕", calories: "~150–200 kcal",
    goal: "Keep hunger at bay",
    ideas: ["Apple + small handful of almonds", "Boiled egg + rice crackers", "Black coffee or tea (no sugar)"],
    avoid: "Biscuits, chips, sugary drinks",
  },
  {
    meal: "Lunch", icon: "🥗", calories: "~500–600 kcal",
    goal: "Big, filling, protein-forward",
    ideas: ["Chicken + brown rice + salad (batch cook Sunday)", "Tuna wrap with spinach, tomato, no mayo", "Leftovers from last night's dinner"],
    avoid: "Meal deals with chips, white bread sandwiches",
  },
  {
    meal: "Afternoon Tea", icon: "🍎", calories: "~150–200 kcal",
    goal: "Bridge to dinner without overdoing it",
    ideas: ["Piece of fruit", "Hummus + veggie sticks", "Small protein shake if you trained that morning"],
    avoid: "Don't skip — you'll overeat at dinner",
  },
  {
    meal: "Dinner", icon: "🍽️", calories: "~600–700 kcal",
    goal: "Family meal — just watch portions",
    ideas: ["Protein + lots of veggies + small serve of carbs", "Stir-fry with lean meat over brown rice", "Bolognese with lentils mixed in — less mince, more veg"],
    avoid: "Seconds, eating the kids' leftovers, large desserts daily",
  },
];

const TIPS = [
  { icon: "💧", text: "Drink 2–3L of water daily. Thirst often masks as hunger." },
  { icon: "😴", text: "Sleep is your secret weapon. Poor sleep spikes hunger hormones." },
  { icon: "📦", text: "Batch cook on Sunday — chicken breasts, rice, boiled eggs." },
  { icon: "🚫", text: "Cut sugary drinks entirely — Coke, juice, cordial, energy drinks." },
  { icon: "⚖️", text: "Weigh yourself once a week, same morning, same conditions." },
  { icon: "🏃", text: "If the kids wake early, even 15 min is better than nothing." },
];

// ─── STORAGE HELPERS ────────────────────────────────────────────────────────

const storage = {
  get: (key, fallback = null) => {
    try { const v = localStorage.getItem(key); return v !== null ? JSON.parse(v) : fallback; }
    catch { return fallback; }
  },
  set: (key, val) => { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} },
};

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function getTodayDayIndex() {
  return new Date().getDay(); // 0=Sun,1=Mon,...
}

function dayIndexToScheduleIndex(jsDay) {
  // Mon=0...Sun=6 in our DAYS array
  return jsDay === 0 ? 6 : jsDay - 1;
}

// ─── NOTIFICATION HELPER ────────────────────────────────────────────────────

async function requestNotificationPermission() {
  if (!("Notification" in window)) return "unsupported";
  if (Notification.permission === "granted") return "granted";
  const perm = await Notification.requestPermission();
  return perm;
}

function scheduleLocalNotification(title, body, delayMs) {
  // Uses setTimeout + Notification API (works without push server)
  if (Notification.permission !== "granted") return;
  setTimeout(() => {
    try {
      if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.ready.then(reg => {
          reg.showNotification(title, {
            body,
            icon: "/icon-192.png",
            badge: "/icon-192.png",
            vibrate: [200, 100, 200],
            tag: "dadfit-workout",
            renotify: true,
          });
        });
      } else {
        new Notification(title, { body, icon: "/icon-192.png" });
      }
    } catch {}
  }, delayMs);
}

function msUntilTime(hour, minute) {
  const now = new Date();
  const target = new Date();
  target.setHours(hour, minute, 0, 0);
  if (target <= now) target.setDate(target.getDate() + 1);
  return target - now;
}

// ─── MAIN APP ───────────────────────────────────────────────────────────────

export default function App() {
  const [tab, setTab] = useState("today");
  const [expandedDay, setExpandedDay] = useState(null);
  const [expandedMeal, setExpandedMeal] = useState(null);

  // Streak & completion state
  const [completedDays, setCompletedDays] = useState(() => storage.get("completedDays", {}));
  const [streak, setStreak] = useState(0);
  const [totalWorkouts, setTotalWorkouts] = useState(0);

  // Notifications
  const [notifPerm, setNotifPerm] = useState(Notification?.permission || "default");
  const [notifTime, setNotifTime] = useState(() => storage.get("notifTime", "05:55"));
  const [notifEnabled, setNotifEnabled] = useState(() => storage.get("notifEnabled", false));
  const [notifScheduled, setNotifScheduled] = useState(false);

  // Weight tracking
  const [weights, setWeights] = useState(() => storage.get("weights", []));
  const [weightInput, setWeightInput] = useState("");

  const todayScheduleIdx = dayIndexToScheduleIndex(getTodayDayIndex());
  const todayData = DAYS[todayScheduleIdx];
  const todayKey_ = todayKey();
  const isTodayDone = completedDays[todayKey_];

  // ── Compute streak ──────────────────────────────────────────────────────
  useEffect(() => {
    // Count streak: consecutive days with a workout type that were completed
    let s = 0;
    const today = new Date();
    for (let i = 0; i < 60; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      const schedIdx = dayIndexToScheduleIndex(d.getDay());
      const dayData = DAYS[schedIdx];
      if (dayData.type === "rest") continue; // rest days don't break streak
      if (completedDays[key]) { s++; }
      else if (i > 0) break; // missed a workout day — streak ends
    }
    setStreak(s);
    setTotalWorkouts(Object.values(completedDays).filter(Boolean).length);
  }, [completedDays]);

  // ── Mark today done ─────────────────────────────────────────────────────
  const markDone = useCallback(() => {
    const updated = { ...completedDays, [todayKey_]: true };
    setCompletedDays(updated);
    storage.set("completedDays", updated);
  }, [completedDays, todayKey_]);

  const unmarkDone = useCallback(() => {
    const updated = { ...completedDays };
    delete updated[todayKey_];
    setCompletedDays(updated);
    storage.set("completedDays", updated);
  }, [completedDays, todayKey_]);

  // ── Notifications ────────────────────────────────────────────────────────
  const enableNotifications = async () => {
    const perm = await requestNotificationPermission();
    setNotifPerm(perm);
    if (perm === "granted") {
      setNotifEnabled(true);
      storage.set("notifEnabled", true);
      scheduleNextNotification(notifTime);
    }
  };

  const scheduleNextNotification = (timeStr) => {
    const [h, m] = timeStr.split(":").map(Number);
    const delay = msUntilTime(h, m);
    const schedIdx = dayIndexToScheduleIndex(new Date().getDay());
    const dayD = DAYS[schedIdx];
    const isWorkout = dayD.type === "workout";
    const title = isWorkout ? `💪 Time to train, Dad!` : `👟 Active rest day`;
    const body = isWorkout ? `${dayD.label} — 25 mins. Get it done before the boys wake up!` : `A short walk today keeps the momentum going.`;
    scheduleLocalNotification(title, body, delay);
    setNotifScheduled(true);
    // Re-schedule daily
    setTimeout(() => scheduleNextNotification(timeStr), delay + 1000);
  };

  const handleTimeChange = (e) => {
    const t = e.target.value;
    setNotifTime(t);
    storage.set("notifTime", t);
    if (notifEnabled && notifPerm === "granted") {
      scheduleNextNotification(t);
    }
  };

  const disableNotifications = () => {
    setNotifEnabled(false);
    setNotifScheduled(false);
    storage.set("notifEnabled", false);
  };

  // Auto-schedule on mount if was enabled
  useEffect(() => {
    if (notifEnabled && notifPerm === "granted") {
      scheduleNextNotification(notifTime);
    }
    // eslint-disable-next-line
  }, []);

  // ── Weight log ────────────────────────────────────────────────────────────
  const addWeight = () => {
    const w = parseFloat(weightInput);
    if (isNaN(w) || w < 40 || w > 200) return;
    const entry = { date: todayKey_, kg: w };
    const updated = [...weights.filter(x => x.date !== todayKey_), entry]
      .sort((a, b) => a.date.localeCompare(b.date));
    setWeights(updated);
    storage.set("weights", updated);
    setWeightInput("");
  };

  const latestWeight = weights.length > 0 ? weights[weights.length - 1].kg : 98;
  const startWeight = weights.length > 0 ? weights[0].kg : 98;
  const lostSoFar = Math.max(0, startWeight - latestWeight).toFixed(1);
  const progressPct = Math.min(100, (lostSoFar / 10) * 100);

  // ── Streak milestones ─────────────────────────────────────────────────────
  const streakEmoji = streak === 0 ? "🌱" : streak < 4 ? "🔥" : streak < 8 ? "⚡" : streak < 12 ? "💪" : "🏆";

  // ─── RENDER ───────────────────────────────────────────────────────────────

  const S = styles;

  return (
    <div style={S.app}>
      {/* ── HEADER ── */}
      <div style={S.header}>
        <div style={S.headerLabel}>DAD FITNESS PLAN</div>
        <div style={S.headerStats}>
          <div style={S.stat}>
            <span style={S.statVal}>{streakEmoji} {streak}</span>
            <span style={S.statLbl}>STREAK</span>
          </div>
          <div style={S.statDivider} />
          <div style={S.stat}>
            <span style={S.statVal}>{totalWorkouts}</span>
            <span style={S.statLbl}>TOTAL</span>
          </div>
          <div style={S.statDivider} />
          <div style={S.stat}>
            <span style={S.statVal}>{lostSoFar}kg</span>
            <span style={S.statLbl}>LOST</span>
          </div>
          <div style={S.statDivider} />
          <div style={S.stat}>
            <span style={S.statVal}>{(10 - parseFloat(lostSoFar)).toFixed(1)}kg</span>
            <span style={S.statLbl}>TO GO</span>
          </div>
        </div>
        {/* Progress bar */}
        <div style={S.progressWrap}>
          <div style={{ ...S.progressBar, width: `${progressPct}%` }} />
        </div>
        <div style={S.progressLabel}>{progressPct.toFixed(0)}% of 10kg goal</div>
      </div>

      {/* ── TABS ── */}
      <div style={S.tabs}>
        {[
          { id: "today", icon: "📍", label: "Today" },
          { id: "schedule", icon: "📅", label: "Schedule" },
          { id: "meals", icon: "🍽️", label: "Meals" },
          { id: "progress", icon: "📊", label: "Progress" },
          { id: "settings", icon: "⚙️", label: "Settings" },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            ...S.tab, ...(tab === t.id ? S.tabActive : {})
          }}>
            <span style={{ fontSize: 16 }}>{t.icon}</span>
            <span style={{ fontSize: 10 }}>{t.label}</span>
          </button>
        ))}
      </div>

      {/* ── CONTENT ── */}
      <div style={S.content}>

        {/* TODAY TAB */}
        {tab === "today" && (
          <div>
            <div style={{ ...S.card, background: todayData.color, border: `2px solid ${todayData.accent}30` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontSize: 11, letterSpacing: 2, color: todayData.accent, fontFamily: "monospace", fontWeight: 700 }}>
                    {todayData.tag} · {todayData.day.toUpperCase()}
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: "#1a1a2e", marginTop: 4 }}>{todayData.label}</div>
                  <div style={{ fontSize: 13, color: "#666", marginTop: 2 }}>⏰ {todayData.time}</div>
                </div>
                {isTodayDone && (
                  <div style={{
                    width: 48, height: 48, borderRadius: 24,
                    background: todayData.accent, color: "white",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 24, boxShadow: `0 4px 12px ${todayData.accent}40`
                  }}>✓</div>
                )}
              </div>

              {todayData.type === "workout" && todayData.exercises && (
                <div style={{ marginTop: 16 }}>
                  <div style={S.sectionLabel}>WARMUP</div>
                  <div style={{ ...S.infoBox, background: todayData.accent + "15", color: todayData.accent }}>
                    🔥 {todayData.warmup}
                  </div>
                  <div style={S.sectionLabel}>EXERCISES</div>
                  {todayData.exercises.map((ex, i) => (
                    <div key={i} style={S.exerciseRow}>
                      <div>
                        <div style={S.exerciseName}>{ex.name}</div>
                        {ex.note && <div style={S.exerciseNote}>{ex.note}</div>}
                      </div>
                      <div style={{ ...S.badge, background: todayData.accent + "20", color: todayData.accent }}>{ex.sets}</div>
                    </div>
                  ))}
                  <div style={{ ...S.infoBox, background: "#f5f5f5", color: "#666", marginTop: 8 }}>
                    🧘 {todayData.cooldown}
                  </div>
                </div>
              )}

              {todayData.type === "rest" && (
                <div style={{ ...S.infoBox, background: "#f5f5f5", color: "#666", marginTop: 12 }}>
                  {todayData.note}
                </div>
              )}

              <button
                onClick={isTodayDone ? unmarkDone : markDone}
                style={{
                  ...S.btn,
                  background: isTodayDone ? "#e0e0e0" : todayData.accent,
                  color: isTodayDone ? "#666" : "white",
                  marginTop: 20,
                }}
              >
                {isTodayDone ? "✓ Done — tap to undo" : todayData.type === "rest" ? "✓ Mark rest day done" : "✓ Mark workout complete"}
              </button>
            </div>

            {streak > 0 && (
              <div style={{ ...S.card, background: "#1a1a2e", color: "white", textAlign: "center" }}>
                <div style={{ fontSize: 36 }}>{streakEmoji}</div>
                <div style={{ fontSize: 20, fontWeight: 800, marginTop: 8 }}>{streak} day streak!</div>
                <div style={{ fontSize: 13, color: "#a0a0c0", marginTop: 4 }}>
                  {streak < 4 ? "Great start — keep it going!" : streak < 8 ? "You're building a habit 🔥" : streak < 12 ? "You're on fire, Dad! ⚡" : "Absolute legend 🏆"}
                </div>
              </div>
            )}
          </div>
        )}

        {/* SCHEDULE TAB */}
        {tab === "schedule" && (
          <div>
            <p style={S.hint}>Tap any workout day to see exercises.</p>
            {DAYS.map((d, i) => {
              // Find the date for this day in the current week
              const today = new Date();
              const currDay = today.getDay();
              const currIdx = dayIndexToScheduleIndex(currDay);
              const diff = i - currIdx;
              const dayDate = new Date(today);
              dayDate.setDate(today.getDate() + diff);
              const dateKey = dayDate.toISOString().slice(0, 10);
              const done = completedDays[dateKey];

              return (
                <div key={d.day} style={{
                  ...S.card, background: d.color, padding: 0, overflow: "hidden",
                  border: `1px solid ${d.type === "rest" ? "#e8e8e8" : d.accent + "40"}`,
                  outline: i === todayScheduleIdx ? `2px solid ${d.accent}` : "none",
                }}>
                  <div onClick={() => d.type !== "rest" && setExpandedDay(expandedDay === i ? null : i)}
                    style={{ display: "flex", alignItems: "center", padding: "14px 16px", gap: 12, cursor: d.type !== "rest" ? "pointer" : "default" }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 10,
                      background: d.type === "rest" ? "#e0e0e0" : d.accent,
                      color: d.type === "rest" ? "#999" : "white",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 10, fontWeight: 700, letterSpacing: 0.5, fontFamily: "monospace", flexShrink: 0,
                      position: "relative"
                    }}>
                      {done ? "✓" : d.short}
                      {i === todayScheduleIdx && !done && (
                        <div style={{
                          position: "absolute", top: -4, right: -4, width: 10, height: 10,
                          borderRadius: 5, background: "#ff5722", border: "2px solid white"
                        }} />
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 15, color: "#1a1a2e" }}>
                        {d.label} {i === todayScheduleIdx && <span style={{ fontSize: 10, color: d.accent, fontFamily: "monospace" }}> ← TODAY</span>}
                      </div>
                      <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{d.time}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 10, letterSpacing: 1.5, fontFamily: "monospace", color: d.type === "rest" ? "#bbb" : d.accent, fontWeight: 700 }}>{d.tag}</div>
                      {d.type !== "rest" && <div style={{ fontSize: 16, color: "#ccc", marginTop: 2 }}>{expandedDay === i ? "▲" : "▼"}</div>}
                    </div>
                  </div>
                  {expandedDay === i && d.exercises && (
                    <div style={{ padding: "0 16px 16px", borderTop: `1px solid ${d.accent}20` }}>
                      <div style={{ ...S.infoBox, background: d.accent + "15", color: d.accent, marginBottom: 8 }}>🔥 {d.warmup}</div>
                      {d.exercises.map((ex, j) => (
                        <div key={j} style={{ ...S.exerciseRow, borderBottom: j < d.exercises.length - 1 ? "1px solid #f0f0f0" : "none" }}>
                          <div>
                            <div style={S.exerciseName}>{ex.name}</div>
                            {ex.note && <div style={S.exerciseNote}>{ex.note}</div>}
                          </div>
                          <div style={{ ...S.badge, background: d.accent + "15", color: d.accent }}>{ex.sets}</div>
                        </div>
                      ))}
                      <div style={{ ...S.infoBox, background: "#f5f5f5", color: "#666", marginTop: 8 }}>🧘 {d.cooldown}</div>
                    </div>
                  )}
                  {d.type === "rest" && d.note && (
                    <div style={{ padding: "0 16px 14px", fontSize: 12, color: "#888", fontStyle: "italic" }}>{d.note}</div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* MEALS TAB */}
        {tab === "meals" && (
          <div>
            <div style={{ ...S.card, background: "#1a1a2e", color: "white" }}>
              <div style={{ fontSize: 13, lineHeight: 1.8 }}>
                <strong>Daily target:</strong> ~1,800–2,000 kcal<br />
                <strong>Protein goal:</strong> 140–160g/day<br />
                <span style={{ color: "#a0a0c0" }}>Eat cleaner versions of normal food — no extreme dieting.</span>
              </div>
            </div>
            {MEALS.map((m, i) => (
              <div key={m.meal} style={{ ...S.card, padding: 0, overflow: "hidden" }}>
                <div onClick={() => setExpandedMeal(expandedMeal === i ? null : i)}
                  style={{ display: "flex", alignItems: "center", padding: "14px 16px", gap: 12, cursor: "pointer" }}>
                  <div style={{ fontSize: 28 }}>{m.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{m.meal}</div>
                    <div style={{ fontSize: 12, color: "#888" }}>{m.goal}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 11, fontFamily: "monospace", color: "#2e7d32", fontWeight: 700 }}>{m.calories}</div>
                    <div style={{ fontSize: 16, color: "#ccc", marginTop: 2 }}>{expandedMeal === i ? "▲" : "▼"}</div>
                  </div>
                </div>
                {expandedMeal === i && (
                  <div style={{ padding: "0 16px 16px", borderTop: "1px solid #f0f0f0" }}>
                    <div style={S.sectionLabel}>GOOD OPTIONS</div>
                    {m.ideas.map((idea, j) => (
                      <div key={j} style={{ padding: "7px 10px", background: "#f9f9f9", borderRadius: 6, fontSize: 13, marginBottom: 4 }}>{idea}</div>
                    ))}
                    <div style={{ ...S.infoBox, background: "#fff3f3", color: "#c62828", marginTop: 8 }}>
                      ⚠️ <strong>Avoid:</strong> {m.avoid}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div style={S.card}>
              <div style={S.sectionLabel}>DAILY TIPS</div>
              {TIPS.map((t, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 20 }}>{t.icon}</span>
                  <span style={{ fontSize: 13, color: "#333", lineHeight: 1.5 }}>{t.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROGRESS TAB */}
        {tab === "progress" && (
          <div>
            {/* Weight entry */}
            <div style={S.card}>
              <div style={S.sectionLabel}>LOG TODAY'S WEIGHT</div>
              <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                <input
                  type="number"
                  value={weightInput}
                  onChange={e => setWeightInput(e.target.value)}
                  placeholder="e.g. 97.5"
                  style={{
                    flex: 1, padding: "12px 14px", borderRadius: 10,
                    border: "1.5px solid #e0e0e0", fontSize: 16,
                    background: "#fafafa", outline: "none",
                  }}
                  step="0.1"
                />
                <button onClick={addWeight} style={{ ...S.btn, padding: "12px 20px", margin: 0, width: "auto" }}>
                  Save
                </button>
              </div>
              <div style={{ fontSize: 11, color: "#aaa", marginTop: 6 }}>Weigh in once per week, same morning conditions</div>
            </div>

            {/* Weight chart */}
            {weights.length > 0 && (
              <div style={S.card}>
                <div style={S.sectionLabel}>WEIGHT HISTORY</div>
                <div style={{ marginTop: 12 }}>
                  {weights.slice(-8).map((w, i, arr) => {
                    const max = Math.max(...arr.map(x => x.kg));
                    const min = Math.min(...arr.map(x => x.kg));
                    const range = max - min || 1;
                    const pct = ((w.kg - min) / range) * 100;
                    const barW = 20 + (pct * 0.8);
                    return (
                      <div key={w.date} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                        <div style={{ fontSize: 11, color: "#888", fontFamily: "monospace", width: 72, flexShrink: 0 }}>
                          {w.date.slice(5)}
                        </div>
                        <div style={{ flex: 1, background: "#f0f0f0", borderRadius: 4, height: 22, overflow: "hidden" }}>
                          <div style={{
                            height: "100%", width: `${barW}%`,
                            background: w.kg < (arr[0]?.kg || 98) ? "#2e7d32" : "#1565c0",
                            borderRadius: 4, transition: "width 0.3s",
                          }} />
                        </div>
                        <div style={{ fontSize: 13, fontWeight: 700, fontFamily: "monospace", width: 48, flexShrink: 0, textAlign: "right" }}>
                          {w.kg}kg
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div style={{ display: "flex", gap: 12, marginTop: 16, flexWrap: "wrap" }}>
                  {[
                    { label: "Start", val: `${weights[0]?.kg ?? 98}kg` },
                    { label: "Current", val: `${latestWeight}kg` },
                    { label: "Lost", val: `${lostSoFar}kg` },
                    { label: "To Goal", val: `${Math.max(0, latestWeight - 88).toFixed(1)}kg` },
                  ].map(s => (
                    <div key={s.label} style={{ flex: 1, minWidth: 60, textAlign: "center", background: "#f5f5f5", borderRadius: 10, padding: "10px 6px" }}>
                      <div style={{ fontSize: 16, fontWeight: 800, color: "#1a1a2e" }}>{s.val}</div>
                      <div style={{ fontSize: 10, color: "#888", letterSpacing: 1 }}>{s.label.toUpperCase()}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Weekly completion */}
            <div style={S.card}>
              <div style={S.sectionLabel}>THIS WEEK'S WORKOUTS</div>
              <div style={{ display: "flex", gap: 8, marginTop: 10, justifyContent: "space-between" }}>
                {DAYS.map((d, i) => {
                  const today = new Date();
                  const currIdx = dayIndexToScheduleIndex(today.getDay());
                  const diff = i - currIdx;
                  const dayDate = new Date(today);
                  dayDate.setDate(today.getDate() + diff);
                  const dateKey = dayDate.toISOString().slice(0, 10);
                  const done = completedDays[dateKey];
                  const isToday = i === todayScheduleIdx;
                  return (
                    <div key={d.day} style={{ textAlign: "center", flex: 1 }}>
                      <div style={{
                        width: "100%", aspectRatio: "1", borderRadius: 8, maxWidth: 40,
                        background: done ? d.accent : d.type === "rest" ? "#f0f0f0" : "#e0e0e0",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        margin: "0 auto", color: done ? "white" : "#999",
                        fontSize: 14, fontWeight: 700, border: isToday ? `2px solid ${d.accent}` : "2px solid transparent",
                      }}>
                        {done ? "✓" : d.type === "rest" ? "—" : "·"}
                      </div>
                      <div style={{ fontSize: 9, color: "#aaa", marginTop: 4, fontFamily: "monospace" }}>{d.short}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Milestones */}
            <div style={S.card}>
              <div style={S.sectionLabel}>MILESTONES</div>
              {[
                { week: "Week 4", kg: "−1.5 to −2kg", note: "Body adjusting, energy improving", wks: 4 },
                { week: "Week 8", kg: "−3 to −4kg", note: "Clothes feeling looser", wks: 8 },
                { week: "Week 12", kg: "−5 to −7kg", note: "Noticeably different in photos", wks: 12 },
                { week: "Week 16", kg: "−8 to −10kg", note: "Goal achieved! 🎉", wks: 16 },
              ].map((m, i) => {
                const reached = parseFloat(lostSoFar) >= parseFloat(m.kg.split("−")[1]);
                return (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "center", padding: "10px 0", borderBottom: i < 3 ? "1px solid #f0f0f0" : "none" }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 18, flexShrink: 0,
                      background: reached ? "#2e7d32" : "#e0e0e0",
                      color: reached ? "white" : "#999",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: reached ? 18 : 11, fontWeight: 700, fontFamily: "monospace",
                    }}>
                      {reached ? "✓" : `W${m.wks}`}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 14, color: reached ? "#2e7d32" : "#1a1a2e" }}>{m.kg}</div>
                      <div style={{ fontSize: 12, color: "#888" }}>{m.note}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {tab === "settings" && (
          <div>
            <div style={S.card}>
              <div style={S.sectionLabel}>🔔 WORKOUT REMINDERS</div>
              <p style={{ fontSize: 13, color: "#666", marginTop: 8, lineHeight: 1.6 }}>
                Get a notification before your alarm goes off to mentally prepare for the workout.
              </p>

              {notifPerm === "denied" && (
                <div style={{ ...S.infoBox, background: "#fff3f3", color: "#c62828", marginTop: 10 }}>
                  ⚠️ Notifications are blocked. Enable them in your browser/phone settings for this site.
                </div>
              )}

              {notifPerm !== "denied" && (
                <>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 14 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>Reminder time</div>
                      <div style={{ fontSize: 12, color: "#888" }}>Set to 5 min before you want to start</div>
                    </div>
                    <input
                      type="time"
                      value={notifTime}
                      onChange={handleTimeChange}
                      style={{
                        padding: "10px 12px", borderRadius: 10,
                        border: "1.5px solid #e0e0e0", fontSize: 15,
                        background: "#fafafa", outline: "none", fontFamily: "monospace",
                      }}
                    />
                  </div>

                  <button
                    onClick={notifEnabled ? disableNotifications : enableNotifications}
                    style={{
                      ...S.btn, marginTop: 16,
                      background: notifEnabled ? "#e0e0e0" : "#1a1a2e",
                      color: notifEnabled ? "#666" : "white",
                    }}
                  >
                    {notifEnabled
                      ? `🔕 Reminders on at ${notifTime} — tap to disable`
                      : "🔔 Enable workout reminders"}
                  </button>

                  {notifEnabled && notifScheduled && (
                    <div style={{ ...S.infoBox, background: "#e8f5e9", color: "#2e7d32", marginTop: 8 }}>
                      ✓ Next reminder scheduled for {notifTime}
                    </div>
                  )}
                </>
              )}
            </div>

            <div style={S.card}>
              <div style={S.sectionLabel}>📱 INSTALL AS APP</div>
              <p style={{ fontSize: 13, color: "#666", marginTop: 8, lineHeight: 1.6 }}>
                Add DadFit to your home screen for instant access — no app store needed.
              </p>
              <div style={{ ...S.infoBox, background: "#f0f4ff", color: "#1565c0", marginTop: 10 }}>
                <strong>iPhone/iPad:</strong> Tap the Share button → "Add to Home Screen"
              </div>
              <div style={{ ...S.infoBox, background: "#f0f4ff", color: "#1565c0", marginTop: 8 }}>
                <strong>Android:</strong> Tap the menu (⋮) → "Add to Home Screen" or "Install App"
              </div>
            </div>

            <div style={S.card}>
              <div style={S.sectionLabel}>⚠️ RESET DATA</div>
              <p style={{ fontSize: 13, color: "#666", marginTop: 8 }}>Clear all workout history and weight logs.</p>
              <button
                onClick={() => {
                  if (window.confirm("Are you sure? This will clear all your progress.")) {
                    storage.set("completedDays", {});
                    storage.set("weights", []);
                    setCompletedDays({});
                    setWeights([]);
                    setStreak(0);
                    setTotalWorkouts(0);
                  }
                }}
                style={{ ...S.btn, background: "#fff3f3", color: "#c62828", border: "1px solid #ffcdd2", marginTop: 12 }}
              >
                Reset all data
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Bottom safe area */}
      <div style={{ height: 20 }} />
    </div>
  );
}

// ─── STYLES ──────────────────────────────────────────────────────────────────

const styles = {
  app: {
    fontFamily: "'Georgia', serif",
    background: "#f9f6f1",
    minHeight: "100dvh",
    maxWidth: 480,
    margin: "0 auto",
  },
  header: {
    background: "#1a1a2e",
    color: "white",
    padding: "env(safe-area-inset-top, 16px) 20px 20px",
    paddingTop: "max(env(safe-area-inset-top), 16px)",
  },
  headerLabel: {
    fontSize: 10, letterSpacing: 4, color: "#a0a0c0",
    fontFamily: "monospace", marginBottom: 12,
  },
  headerStats: {
    display: "flex", justifyContent: "space-between",
    alignItems: "center",
  },
  stat: { display: "flex", flexDirection: "column", alignItems: "center", flex: 1 },
  statVal: { fontSize: 18, fontWeight: 800, color: "#7dd3c0" },
  statLbl: { fontSize: 8, letterSpacing: 1.5, color: "#6060a0", marginTop: 2, fontFamily: "monospace" },
  statDivider: { width: 1, height: 32, background: "#2a2a4e" },
  progressWrap: {
    marginTop: 16, height: 5, background: "#2a2a4e",
    borderRadius: 3, overflow: "hidden",
  },
  progressBar: {
    height: "100%", background: "linear-gradient(90deg, #7dd3c0, #2e7d32)",
    borderRadius: 3, transition: "width 0.5s ease",
  },
  progressLabel: { fontSize: 10, color: "#6060a0", marginTop: 4, fontFamily: "monospace" },
  tabs: {
    display: "flex", background: "white",
    borderBottom: "1px solid #ede9e0",
    position: "sticky", top: 0, zIndex: 10,
  },
  tab: {
    flex: 1, border: "none", background: "transparent",
    cursor: "pointer", padding: "10px 4px",
    display: "flex", flexDirection: "column",
    alignItems: "center", gap: 2,
    color: "#aaa", fontFamily: "monospace",
    letterSpacing: 0.3, borderBottom: "3px solid transparent",
    transition: "all 0.2s",
  },
  tabActive: {
    color: "#1a1a2e", borderBottom: "3px solid #1a1a2e", fontWeight: 700,
  },
  content: { padding: "16px 14px" },
  card: {
    background: "white", borderRadius: 14,
    padding: "16px", marginBottom: 12,
    border: "1px solid #ede9e0",
    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
  },
  sectionLabel: {
    fontSize: 10, letterSpacing: 2, color: "#aaa",
    fontFamily: "monospace", fontWeight: 700, marginBottom: 4,
  },
  infoBox: {
    borderRadius: 8, padding: "9px 12px", fontSize: 12, lineHeight: 1.5,
  },
  exerciseRow: {
    display: "flex", justifyContent: "space-between",
    alignItems: "flex-start", padding: "8px 0",
  },
  exerciseName: { fontWeight: 600, fontSize: 14, color: "#1a1a2e" },
  exerciseNote: { fontSize: 11, color: "#888", marginTop: 2 },
  badge: {
    fontSize: 11, fontFamily: "monospace", fontWeight: 700,
    padding: "3px 8px", borderRadius: 6, whiteSpace: "nowrap", marginLeft: 10,
  },
  btn: {
    width: "100%", padding: "14px",
    borderRadius: 12, border: "none",
    cursor: "pointer", fontSize: 14,
    fontWeight: 700, letterSpacing: 0.5,
    fontFamily: "monospace", transition: "all 0.2s",
    display: "block",
  },
  hint: { color: "#888", fontSize: 13, marginBottom: 12 },
};
