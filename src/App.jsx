import { Box, CssBaseline } from "@mui/material";
import { Navbar, Hero, SocialSidebar } from "./components";

function App() {
  return (
    <>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh" }}>
        <Navbar />
        <SocialSidebar />
        <Hero />
      </Box>
    </>
  );
}

export default App;
