"use client";

import { useEffect, useState } from "react";

export default function Streak() {
  const [streak, setStreak] = useState(0);

  // TODO: replace with real fetch from your DB/session
  useEffect(() => setStreak(3), []);

  return (
    <div className="inline-flex items-center gap-2 rounded px-3 py-1 text-sm bg-yellow-100">
      <span>🔥</span>
      <span>{streak} day streak</span>
    </div>
  );
}
