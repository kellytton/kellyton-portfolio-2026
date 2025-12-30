import { Box, Typography } from "@mui/material";
import heroImage1 from "../../assets/hero/hero-1.jpg";
import heroImage2 from "../../assets/hero/hero-2.jpg";

function Hero() {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        minHeight: "calc(100vh - 100px)",
        pl: { xs: 12, md: 16, lg: 20 },
        pr: 0,
        overflow: "hidden",
      }}
    >
      {/* Left side - Text content */}
      <Box
        sx={{
          position: "absolute",
          top: { xs: "15%", md: "12%", lg: "10%" },
          left: { xs: 100, md: 140, lg: 180 },
          maxWidth: { xs: "400px", md: "500px", lg: "600px" },
          zIndex: 2,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontFamily: "var(--font-family-primary)",
            fontWeight: 800,
            fontSize: {
              xs: "var(--font-size-hero-xs)",
              sm: "var(--font-size-hero-sm)",
              md: "var(--font-size-hero-md)",
              lg: "var(--font-size-hero-lg)",
            },
            lineHeight: 0.95,
            color: "var(--color-text)",
            mb: 3,
          }}
        >
          KELLY
          <br />
          TON.
        </Typography>
        <Typography
          sx={{
            fontFamily: "var(--font-family-primary)",
            fontWeight: 600,
            fontSize: {
              xs: "var(--font-size-subtitle-xs)",
              sm: "var(--font-size-subtitle-sm)",
              md: "var(--font-size-subtitle-md)",
              lg: "var(--font-size-subtitle-lg)",
            },
            color: "var(--color-text)",
          }}
        >
          Fullstack Engineer • UI/UX
          <br />
          Designer • Web Developer
        </Typography>
      </Box>

      {/* Right side - Images */}
      <Box
        sx={{
          position: "absolute",
          right: 0,
          top: { xs: "30%", md: "28%", lg: "25%" },
          display: "flex",
          gap: { xs: 1.5, md: 2, lg: 2.5 },
        }}
      >
        <Box
          component="img"
          src={heroImage1}
          alt="Kelly in library"
          sx={{
            width: {
              xs: "200px",
              sm: "260px",
              md: "320px",
              lg: "400px",
            },
            height: {
              xs: "280px",
              sm: "360px",
              md: "450px",
              lg: "560px",
            },
            objectFit: "cover",
          }}
        />
        <Box
          component="img"
          src={heroImage2}
          alt="Food photography"
          sx={{
            width: {
              xs: "200px",
              sm: "260px",
              md: "320px",
              lg: "400px",
            },
            height: {
              xs: "280px",
              sm: "360px",
              md: "450px",
              lg: "560px",
            },
            objectFit: "cover",
          }}
        />
      </Box>
    </Box>
  );
}

export default Hero;
