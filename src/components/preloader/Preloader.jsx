import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import coffeeAnimation from "../../assets/coffee.lottie";

// Branded intro overlay: a coffee animation plays over the background, then the
// whole screen dissolves away to reveal the site. Shown once per session, tied
// to the window load event (with a max timeout so a slow asset never blocks
// it), and skipped entirely for users who prefer reduced motion.
const SESSION_KEY = "introPlayed";
const MIN_DISPLAY_MS = 2200; // let the coffee animation play + name settle in
const MAX_DISPLAY_MS = 3500; // never trap the user behind a stuck asset

// TEMP: while we're perfecting the intro, force it to play on every load
// (ignores the once-per-session gate and reduced-motion skip). Set back to
// false before shipping.
const DEV_ALWAYS_PLAY = false;

const Preloader = ({ onComplete }) => {
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const alreadyPlayed =
    typeof window !== "undefined" &&
    window.sessionStorage?.getItem(SESSION_KEY) === "1";

  // Never mount the overlay if we've played it this session or motion is reduced
  // (unless we're forcing it on for development).
  const [visible, setVisible] = useState(
    DEV_ALWAYS_PLAY || (!alreadyPlayed && !prefersReducedMotion),
  );
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (!visible) return;

    // Lock scroll while the intro is on screen.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const start = performance.now();
    let dismissTimer;

    const dismiss = () => {
      const elapsed = performance.now() - start;
      const wait = Math.max(0, MIN_DISPLAY_MS - elapsed);

      dismissTimer = window.setTimeout(() => {
        // Start fading out
        setLeaving(true);

        // Let the rest of the site begin animating immediately
        onComplete?.();

        // Remove the overlay after the fade finishes
        window.setTimeout(() => {
          setVisible(false);
          window.sessionStorage?.setItem(SESSION_KEY, "1");
        }, 700);
      }, wait);
    };

    // Dismiss when the page finishes loading, or force it after the max timeout.
    if (document.readyState === "complete") {
      dismiss();
    } else {
      window.addEventListener("load", dismiss, { once: true });
    }
    const maxTimer = window.setTimeout(dismiss, MAX_DISPLAY_MS);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("load", dismiss);
      window.clearTimeout(dismissTimer);
      window.clearTimeout(maxTimer);
    };
  }, [visible]);

  useEffect(() => {
    if (!visible) {
      onComplete?.();
    }
  }, [visible, onComplete]);

  if (!visible) return null;

  return (
    <Box
      aria-hidden="true"
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 3000,
        backgroundColor: "var(--color-background)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
        // Editorial exit: the intro simply dissolves in place, like a page
        // fading to the next — no directional movement.
        transition: "opacity 0.7s ease",
        opacity: leaving ? 0 : 1,
      }}
    >
      <Box sx={{ width: 160, height: 160 }}>
        <DotLottieReact src={coffeeAnimation} loop autoplay />
      </Box>

      <Box
        sx={{
          textAlign: "center",
          // Let the name settle in shortly after the animation begins.
          animation: "nameFade 0.8s ease 0.6s both",
          "@keyframes nameFade": {
            from: { opacity: 0, transform: "translateY(6px)" },
            to: { opacity: 1, transform: "translateY(0)" },
          },
        }}
      >
        <Typography
          sx={{
            fontFamily: "var(--font-family-primary)",
            fontWeight: 600,
            fontSize: "0.7rem",
            color: "#73513F",
            textTransform: "uppercase",
            letterSpacing: "0.25em",
            mb: 0.75,
          }}
        >
          Brewing
        </Typography>
        <Typography
          sx={{
            fontFamily: "var(--font-family-primary)",
            fontWeight: 800,
            fontSize: "1.5rem",
            color: "var(--color-text)",
            letterSpacing: "0.02em",
          }}
        >
          Kelly Ton.
        </Typography>
      </Box>
    </Box>
  );
};

export default Preloader;
