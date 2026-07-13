import { Box } from "@mui/material";

// Shared vinyl record SVG used by the music player and the intro preloader.
const Vinyl = ({ playing, size = 52 }) => (
  <Box
    sx={{
      width: size,
      height: size,
      flexShrink: 0,
      animation: playing ? "spin 4s linear infinite" : "none",
      "@keyframes spin": {
        from: { transform: "rotate(0deg)" },
        to: { transform: "rotate(360deg)" },
      },
    }}
  >
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <circle cx="50" cy="50" r="49" fill="var(--color-text)" />
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke="var(--color-background)"
        strokeWidth="0.75"
        opacity="0.35"
      />
      <circle
        cx="50"
        cy="50"
        r="32"
        fill="none"
        stroke="var(--color-background)"
        strokeWidth="0.75"
        opacity="0.35"
      />
      <circle
        cx="50"
        cy="50"
        r="24"
        fill="none"
        stroke="var(--color-background)"
        strokeWidth="0.75"
        opacity="0.35"
      />
      <circle cx="50" cy="50" r="15" fill="var(--color-background)" />
      <circle cx="50" cy="50" r="3" fill="#73513F" />
    </svg>
  </Box>
);

export default Vinyl;
