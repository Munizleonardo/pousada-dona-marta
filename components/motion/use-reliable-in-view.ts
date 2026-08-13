"use client";

import { useEffect, useRef, useState } from "react";

// Framer Motion's whileInView can get stuck hidden after client-side route changes, so we check visibility on mount ourselves as a fallback.
export function useReliableInView<T extends Element>({
  once = true,
  amount = 0.3,
}: { once?: boolean; amount?: number } = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function isCurrentlyVisible() {
      const rect = el!.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      return rect.top <= viewportHeight * (1 - amount) && rect.bottom >= 0;
    }

    if (isCurrentlyVisible()) {
      setInView(true);
      if (once) return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold: amount }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once, amount]);

  return { ref, inView };
}
