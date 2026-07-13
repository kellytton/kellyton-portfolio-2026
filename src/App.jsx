import { useState } from "react";
import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import {
  Preloader,
  Navbar,
  Hero,
  SocialSidebar,
  About,
  Skills,
  Projects,
  Footer,
  MusicPlayer,
} from "./components";
import { PageReadyProvider } from "./context/PageReadyContext";

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

      <PageReadyProvider value={pageReady}>
        <Preloader onComplete={() => setPageReady(true)} />

        <Box sx={{ minHeight: "100vh" }}>
          <Navbar />
          <SocialSidebar />
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Footer />
          <MusicPlayer />
        </Box>
      </PageReadyProvider>
    </ThemeProvider>
  );
}

export default App;
