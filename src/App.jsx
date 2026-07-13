import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Home from "./pages/Home";
import CaseStudy from "./pages/CaseStudy";
import { MusicPlayer } from "./components";

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "var(--color-background)",
        },
      },
    },
  },
});

function App() {
  const [pageReady, setPageReady] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Routes>
        <Route
          path="/"
          element={<Home pageReady={pageReady} setPageReady={setPageReady} />}
        />
        <Route path="/work/:slug" element={<CaseStudy />} />

        {/* Catch-all: any unknown URL (e.g. /dogs) redirects to the home page. */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Rendered once, outside <Routes>, so playback persists across
          navigation between the portfolio and case study pages. */}
      <MusicPlayer />
    </ThemeProvider>
  );
}

export default App;
