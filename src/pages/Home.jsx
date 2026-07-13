import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import {
  Preloader,
  Navbar,
  Hero,
  SocialSidebar,
  About,
  Skills,
  Projects,
  Footer,
} from "../components";
import { PageReadyProvider } from "../context/PageReadyContext";

// The scrollable section anchors reachable via "/#<id>" (matches the navbar).
const SECTION_IDS = ["about", "skills", "projects"];

function Home({ pageReady, setPageReady }) {
  const location = useLocation();
  const navigate = useNavigate();

  // When arriving with a hash (e.g. "Back to Crafted Works" from a case study),
  // scroll that section into view. Runs whenever the hash changes so repeat
  // clicks re-scroll even without a full remount. A hash that isn't one of the
  // real section anchors (e.g. "#projects/dogs") is junk — strip it back to "/".
  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);

    if (!SECTION_IDS.includes(id)) {
      navigate("/", { replace: true });
      return;
    }

    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [location.hash, location.key, navigate]);

  return (
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
      </Box>
    </PageReadyProvider>
  );
}

export default Home;
