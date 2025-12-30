import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Navbar, Hero, SocialSidebar, About } from "./components";

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
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh" }}>
        <Navbar />
        <SocialSidebar />
        <Hero />
        <About />
      </Box>
    </ThemeProvider>
  );
}

export default App;
