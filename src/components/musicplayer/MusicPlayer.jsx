import { useEffect, useRef, useState } from "react";
import { Box, IconButton, Slider, Typography, Fade } from "@mui/material";
import {
  PlayArrow,
  Pause,
  VolumeUp,
  VolumeOff,
  Close,
} from "@mui/icons-material";

import track from "../../assets/music/lofi-track.mp3";

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

const MusicPlayer = () => {
  const audioRef = useRef(null);
  const containerRef = useRef(null);
  const previousVolumeRef = useRef(0.35);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [volume, setVolume] = useState(
    Number(localStorage.getItem("musicVolume")) || 0.35,
  );

  if (!audioRef.current) {
    const audio = new Audio(track);
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;
  }

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("Audio playback failed:", error);
          setIsPlaying(false);
        });
      }
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      localStorage.setItem("musicVolume", volume);
    }
  }, [volume]);

  // Keep track of the last non-zero volume, no matter how we got to 0
  // (mute button, or dragging the slider all the way down)
  useEffect(() => {
    if (volume > 0) {
      previousVolumeRef.current = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (!isExpanded) return;

    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isExpanded]);

  const togglePlay = (e) => {
    e.stopPropagation();
    setIsPlaying((prev) => !prev);
  };

  const handleVolumeChange = (_, value) => setVolume(value);

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(previousVolumeRef.current || 0.35);
    } else {
      setVolume(0);
    }
  };

  return (
    <Box
      ref={containerRef}
      sx={{
        position: "fixed",
        bottom: { xs: 16, sm: 24 },
        right: { xs: 16, sm: 24 },
        zIndex: 2000,
        width: 62,
        height: 62,
        isolation: "isolate",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          right: 0,
          transformOrigin: "bottom right",
          opacity: isExpanded ? 1 : 0,
          transform: isExpanded ? "scale(1)" : "scale(0.92)",
          visibility: isExpanded ? "visible" : "hidden",
          pointerEvents: isExpanded ? "auto" : "none",
          willChange: "opacity, transform",
          transition:
            "opacity 0.25s ease, transform 0.25s ease, visibility 0s linear " +
            (isExpanded ? "0s" : "0.25s"),
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            p: { xs: 2.25, sm: 2.5 },
            width: { xs: "calc(100vw - 32px)", sm: 340 },
            maxWidth: 360,
            backgroundColor: "var(--color-background)",
            border: "1px solid",
            borderColor: "rgba(51, 51, 51, 0.3)",
            borderRadius: 1,
            boxShadow: "0 4px 24px rgba(0, 0, 0, 0.12)",
          }}
        >
          <Vinyl playing={isPlaying} />

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              sx={{
                fontFamily: "var(--font-family-primary)",
                fontWeight: 600,
                fontSize: "0.7rem",
                color: "#73513F",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                mb: 0.5,
              }}
            >
              Now Playing
            </Typography>

            <Typography
              noWrap
              sx={{
                fontFamily: "var(--font-family-primary)",
                fontWeight: 700,
                fontSize: "1rem",
                color: "var(--color-text)",
                mb: 1,
              }}
            >
              Lofi Dreams
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMute();
                }}
                size="small"
                aria-label={volume === 0 ? "Unmute" : "Mute"}
                sx={{
                  position: "relative",
                  zIndex: 1,
                  color: "var(--color-text)",
                  p: 0.5,
                  opacity: 0.7,
                  "&:hover": { opacity: 1, backgroundColor: "transparent" },
                }}
              >
                {volume === 0 ? (
                  <VolumeOff sx={{ fontSize: 18 }} />
                ) : (
                  <VolumeUp sx={{ fontSize: 18 }} />
                )}
              </IconButton>
              <Slider
                size="small"
                value={volume}
                min={0}
                max={1}
                step={0.01}
                onChange={handleVolumeChange}
                onMouseDown={(e) => e.stopPropagation()}
                aria-label="Volume"
                sx={{
                  color: "var(--color-text)",
                  "& .MuiSlider-thumb": {
                    width: 12,
                    height: 12,
                    backgroundColor: "#73513F",
                    "&:hover, &.Mui-focusVisible": {
                      boxShadow: "0 0 0 6px rgba(115, 81, 63, 0.16)",
                    },
                  },
                  "& .MuiSlider-track": {
                    backgroundColor: "#73513F",
                    border: "none",
                  },
                  "& .MuiSlider-rail": {
                    opacity: 0.25,
                  },
                }}
              />
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 0.5,
              flexShrink: 0,
              alignSelf: "flex-start",
            }}
          >
            <IconButton
              onClick={togglePlay}
              size="small"
              aria-label={isPlaying ? "Pause" : "Play"}
              sx={{
                color: "var(--color-text)",
                "&:hover": { opacity: 0.7, backgroundColor: "transparent" },
              }}
            >
              {isPlaying ? (
                <Pause fontSize="small" />
              ) : (
                <PlayArrow fontSize="small" />
              )}
            </IconButton>

            <IconButton
              size="small"
              aria-label="Close player"
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(false);
              }}
              sx={{
                color: "var(--color-text)",
                opacity: 0.5,
                "&:hover": { opacity: 0.8, backgroundColor: "transparent" },
              }}
            >
              <Close fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: 62,
          height: 62,
          opacity: isExpanded ? 0 : 1,
          transform: isExpanded ? "scale(0.7)" : "scale(1)",
          visibility: isExpanded ? "hidden" : "visible",
          pointerEvents: isExpanded ? "none" : "auto",
          willChange: "opacity, transform",
          transition:
            "opacity 0.2s ease, transform 0.2s ease, visibility 0s linear " +
            (isExpanded ? "0.2s" : "0s"),
        }}
      >
        <IconButton
          onClick={() => setIsExpanded(true)}
          aria-label="Open music player"
          sx={{
            width: "100%",
            height: "100%",
            backgroundColor: "var(--color-text)",
            border: "1px solid",
            borderColor: "rgba(51, 51, 51, 0.3)",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.18)",
            transition: "transform 0.25s ease",
            "&:hover": {
              transform: "scale(1.06)",
              backgroundColor: "var(--color-text)",
            },
          }}
        >
          <Vinyl playing={isPlaying} size={38} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default MusicPlayer;
