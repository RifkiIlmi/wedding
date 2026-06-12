"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Home, Image, Mail, Heart, MapPin } from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

// Urutan sesuai layout halaman
const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: <Home className="w-4 h-4" /> },
  { id: "event", label: "Event", icon: <MapPin className="w-4 h-4" /> },
  { id: "gallery", label: "Gallery", icon: <Image className="w-4 h-4" /> },
  { id: "rsvp", label: "RSVP", icon: <Mail className="w-4 h-4" /> },
  { id: "wishes", label: "Wishes", icon: <Heart className="w-4 h-4" /> },
];

export const FloatingDock = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isScrollingTo = useRef(false);
  const scrollingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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
      className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2"
      style={{ pointerEvents: isVisible ? "auto" : "none" }}
      aria-label="Main navigation"
    >
      <div
        className="flex items-center gap-0.5 px-2 py-1.5 rounded-full"
        style={{
          background: "rgba(28, 28, 28, 0.7)",
          backdropFilter: "blur(20px) saturate(1.6)",
          WebkitBackdropFilter: "blur(20px) saturate(1.6)",
          border: "1px solid rgba(212, 175, 55, 0.15)",
          boxShadow:
            "0 8px 32px rgba(0,0,0,0.25), 0 0 0 0.5px rgba(212,175,55,0.08) inset",
        }}
      >
        {navItems.map((item) => {
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              aria-label={`Navigate to ${item.label}`}
              aria-current={isActive ? "true" : undefined}
              className="relative flex flex-col items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-gold/50 rounded-full transition-colors cursor-pointer"
              style={{ width: 36, height: 36 }}
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
                className="relative z-10"
                animate={{
                  scale: isActive ? 1.1 : 1,
                  color: isActive
                    ? "rgba(212,175,55,1)"
                    : "rgba(248,245,242,0.55)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
              >
                {item.icon}
              </motion.div>
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
};
