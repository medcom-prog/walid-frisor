"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Avslører innhold når det scrolles inn i bildet.
 *
 * Innholdet starter usynlig i CSS for å unngå glimt, så her må hvert
 * fallback dekkes eksplisitt – ellers blir innholdet stående usynlig:
 *   1. redusert bevegelse eller manglende IntersectionObserver → vis straks
 *   2. observatøren fyrer aldri (skjult fane, uvanlig layout) → vis etter 1,8 s
 *   3. JavaScript av → <noscript>-regelen i layouten viser alt
 */
export default function Avslor({
  children,
  as: Tag = "div",
  forsinkelse = 0,
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  forsinkelse?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const vis = () => el.setAttribute("data-synlig", "");

    const redusert = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (redusert || !("IntersectionObserver" in window)) {
      vis();
      return;
    }

    const io = new IntersectionObserver(
      ([oppf]) => {
        if (!oppf.isIntersecting) return;
        el.style.transitionDelay = `${forsinkelse}ms`;
        vis();
        io.disconnect();
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 },
    );
    io.observe(el);

    // Sikkerhetsnett: ingenting skal bli stående usynlig
    const nett = setTimeout(() => {
      vis();
      io.disconnect();
    }, 1800);

    return () => {
      clearTimeout(nett);
      io.disconnect();
    };
  }, [forsinkelse]);

  return (
    <Tag ref={ref} className={`avslor ${className}`}>
      {children}
    </Tag>
  );
}
