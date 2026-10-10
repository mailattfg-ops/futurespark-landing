"use client";

import { useEffect, useState } from "react";
import { nextWebinar, webinarDay } from "@/lib/site";

/**
 * The next webinar's day, e.g. "Thursday, 15 Oct". Worked out again in the
 * visitor's browser, so a page built days ago still shows the right session.
 */
export function NextWebinarDate() {
  const [label, setLabel] = useState(() => webinarDay(nextWebinar()));
  // Deliberate: the page may have been built before the last session; the browser's clock decides.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setLabel(webinarDay(nextWebinar())), []);
  return <span suppressHydrationWarning>{label}</span>;
}
