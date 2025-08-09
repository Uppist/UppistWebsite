/** @format */
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * Robust ScrollToTop:
 * - targets #app-scroll (if present) OR document.scrollingElement / html / body
 * - waits for next paint and retries multiple times (for images / async content)
 * - listens for window 'load' to attempt again when images finish
 */
export default function ScrollToTop({ top = 0, behavior = "smooth", maxAttempts = 6 } = {}) {
  const { pathname, key } = useLocation();
  const attemptsRef = useRef(0);
  const timersRef = useRef([]);

  useEffect(() => {
    attemptsRef.current = 0;
    timersRef.current = [];

    const getScrollTarget = () =>
      document.getElementById("app-scroll") ||
      document.scrollingElement ||
      document.documentElement ||
      document.body;

    const doScroll = () => {
      const target = getScrollTarget();
      if (!target) return;
      try {
        if (typeof target.scrollTo === "function") {
          target.scrollTo({ top, behavior });
        } else {
          target.scrollTop = top;
        }
        // best-effort fallback
        if (document.body) document.body.scrollTop = top;
        if (document.documentElement) document.documentElement.scrollTop = top;
        // window fallback
        typeof window.scrollTo === "function" && window.scrollTo({ top, behavior });
      } catch (err) {
        if (target) target.scrollTop = top;
      }
    };

    const tryScroll = () => {
      doScroll();

      // if still not at top and we haven't exhausted attempts, retry with backoff
      const target = getScrollTarget();
      const currentTop = target ? (target.scrollTop ?? (document.documentElement.scrollTop || document.body.scrollTop || 0)) : 0;

      if (currentTop > top && attemptsRef.current < maxAttempts) {
        attemptsRef.current += 1;
        const backoffs = [40, 120, 250, 500, 800, 1200];
        const delay = backoffs[attemptsRef.current - 1] ?? 300;
        const id = setTimeout(() => requestAnimationFrame(tryScroll), delay);
        timersRef.current.push(id);
      }
    };

    // start after next paint and a short timeout
    const rafId = requestAnimationFrame(() => {
      const id = setTimeout(tryScroll, 20);
      timersRef.current.push(id);
    });

    // also try again when window finishes loading images
    const onLoad = () => tryScroll();
    window.addEventListener("load", onLoad);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("load", onLoad);
      timersRef.current.forEach(clearTimeout);
    };
    // run on route change (pathname or router key)
  }, [pathname, key, top, behavior, maxAttempts]);

  return null;
}
