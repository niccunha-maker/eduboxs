import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(true);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Route changed — hide, scroll, then fade in
    setVisible(false);
    window.scrollTo(0, 0);

    const timer = setTimeout(() => setVisible(true), 20);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: visible ? "opacity 400ms ease-out, transform 400ms ease-out" : "none",
      }}
    >
      {children}
    </div>
  );
};
