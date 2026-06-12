"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import {
  Home,
  Users,
  Clock,
  MapPin,
  BookOpen,
  Image,
  Mail,
  Gift,
  Heart,
  HelpCircle,
} from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

// Urutan sesuai layout halaman
const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: <Home className="w-4 h-4" /> },
  { id: "couple", label: "Couple", icon: <Users className="w-4 h-4" /> },
  { id: "countdown", label: "Waktu", icon: <Clock className="w-4 h-4" /> },
  { id: "event", label: "Acara", icon: <MapPin className="w-4 h-4" /> },
  { id: "story", label: "Cerita", icon: <BookOpen className="w-4 h-4" /> },
  { id: "gallery", label: "Galeri", icon: <Image className="w-4 h-4" /> },
  { id: "rsvp", label: "RSVP", icon: <Mail className="w-4 h-4" /> },
  { id: "gift", label: "Hadiah", icon: <Gift className="w-4 h-4" /> },
  { id: "wishes", label: "Ucapan", icon: <Heart className="w-4 h-4" /> },
  { id: "faq", label: "Tanya Jawab", icon: <HelpCircle className="w-4 h-4" /> },
];

export const FloatingDock = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isScrollingTo = useRef(false);
  const scrollingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (isScrollingTo.current) return;

    const currentScrollY = window.scrollY;
    const delta = currentScrollY - lastScrollY.current;

    if (Math.abs(delta) < 10) return;

    if (delta > 0 && currentScrollY > 100) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }

    lastScrollY.current = currentScrollY;

    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => setIsVisible(true), 1200);
  }, []);

  // Active section tracking
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !isScrollingTo.current) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Center the active element inside the horizontal scrollable menu
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Small delay to let Framer Motion start/finish animating widths
    const timer = setTimeout(() => {
      const activeEl = container.querySelector('[data-active="true"]') as HTMLElement;
      if (!activeEl) return;

      const containerWidth = container.offsetWidth;
      const activeWidth = activeEl.offsetWidth;
      const activeLeft = activeEl.offsetLeft;

      const targetScrollLeft = activeLeft - containerWidth / 2 + activeWidth / 2;
      container.scrollTo({
        left: targetScrollLeft,
        behavior: "smooth",
      });
    }, 120);

    return () => clearTimeout(timer);
  }, [activeSection]);

  const handleClick = (id: string) => {
    setActiveSection(id);
    setIsVisible(true);

    isScrollingTo.current = true;
    if (scrollingTimer.current) clearTimeout(scrollingTimer.current);
    scrollingTimer.current = setTimeout(() => {
      isScrollingTo.current = false;
      lastScrollY.current = window.scrollY;
    }, 2000);

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    // Elemen belum ada di DOM (lazy-loaded), scroll ke bawah dulu
    // agar LazySection ter-trigger, lalu scroll ke target
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });

    let attempts = 0;
    const maxAttempts = 30; // ~1.5 detik
    const waitForEl = () => {
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      attempts++;
      if (attempts < maxAttempts) {
        requestAnimationFrame(waitForEl);
      }
    };
    requestAnimationFrame(waitForEl);
  };

  return (
    <motion.nav
      initial={{ y: 80, opacity: 0 }}
      animate={{
        y: isVisible ? 0 : 80,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
      className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 w-[92vw] max-w-[460px]"
      style={{ pointerEvents: isVisible ? "auto" : "none" }}
      aria-label="Main navigation"
    >
      <div
        className="relative w-full rounded-full"
        style={{
          background: "rgba(28, 28, 28, 0.7)",
          backdropFilter: "blur(20px) saturate(1.6)",
          WebkitBackdropFilter: "blur(20px) saturate(1.6)",
          border: "1px solid rgba(212, 175, 55, 0.15)",
          boxShadow:
            "0 8px 32px rgba(0,0,0,0.25), 0 0 0 0.5px rgba(212,175,55,0.08) inset",
        }}
      >
        <div
          ref={containerRef}
          className="no-scrollbar flex items-center gap-1.5 px-3 py-1.5 overflow-x-auto scroll-smooth w-full rounded-full"
          style={{
            WebkitOverflowScrolling: "touch",
            maskImage:
              "linear-gradient(to right, transparent, white 24px, white calc(100% - 24px), transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, white 24px, white calc(100% - 24px), transparent)",
          }}
        >
          {/* Scroll spacers to allow better centering of edge items */}
          <div className="w-5 shrink-0 pointer-events-none" />

          {navItems.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <motion.button
                key={item.id}
                layout
                data-active={isActive ? "true" : undefined}
                onClick={() => handleClick(item.id)}
                aria-label={`Navigate to ${item.label}`}
                aria-current={isActive ? "true" : undefined}
                className="relative flex items-center justify-center gap-2 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-gold/50 transition-colors cursor-pointer shrink-0 select-none"
                style={{
                  height: 36,
                  minWidth: isActive ? "auto" : 36,
                  paddingLeft: isActive ? 12 : 0,
                  paddingRight: isActive ? 12 : 0,
                }}
              >
                {/* Active pill */}
                {isActive && (
                  <motion.div
                    layoutId="dock-active-pill"
                    className="absolute inset-0.5 rounded-full"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(212,175,55,0.25), rgba(241,229,172,0.15))",
                      boxShadow: "0 0 12px rgba(212,175,55,0.12)",
                      border: "1px solid rgba(212, 175, 55, 0.2)",
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                )}

                {/* Icon */}
                <motion.div
                  className="relative z-10 flex items-center justify-center shrink-0"
                  animate={{
                    scale: isActive ? 1.05 : 1,
                    color: isActive
                      ? "rgba(212,175,55,1)"
                      : "rgba(248,245,242,0.55)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                >
                  {item.icon}
                </motion.div>

                {/* Label */}
                {isActive && (
                  <motion.span
                    initial={{ opacity: 0, width: 0, x: -4 }}
                    animate={{ opacity: 1, width: "auto", x: 0 }}
                    exit={{ opacity: 0, width: 0, x: -4 }}
                    transition={{ duration: 0.25 }}
                    className="relative z-10 text-[11px] font-sans font-medium text-gold whitespace-nowrap overflow-hidden"
                  >
                    {item.label}
                  </motion.span>
                )}
              </motion.button>
            );
          })}

          <div className="w-5 shrink-0 pointer-events-none" />
        </div>
      </div>
    </motion.nav>
  );
};
