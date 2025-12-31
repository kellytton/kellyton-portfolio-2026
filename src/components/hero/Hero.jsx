import { Box, Typography, IconButton, Fade, Slide } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import heroImage1 from "../../assets/hero/hero-1.jpg";
import heroImage2 from "../../assets/hero/hero-2.jpg";

const socialLinks = [
  { icon: LinkedInIcon, href: "https://www.linkedin.com/in/kellytton/", label: "LinkedIn" },
  { icon: GitHubIcon, href: "https://github.com/kellytton", label: "GitHub" },
  { icon: EmailIcon, href: "mailto:kthton@gmail.com", label: "Email" },
];

function Hero() {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        minHeight: { xs: "auto", lg: "calc(100vh - 100px)" },
        pl: { xs: 2, sm: 4, md: 6, lg: 20 },
        pr: { xs: 0 },
        pt: { xs: 3, sm: 4, md: 6, lg: 0 },
        pb: { xs: 0, sm: 4, md: 6, lg: 0 },
        overflow: "hidden",
      }}
    >
      {/* Main content wrapper - flexbox for sm/md, absolute positioning for lg+ */}
      <Box
        sx={{
          display: { xs: "flex", lg: "block" },
          flexDirection: "column",
          gap: { xs: 4, sm: 5, md: 6 },
        }}
      >
        {/* Text content */}
        <Fade in timeout={800}>
          <Box
            sx={{
              position: { xs: "relative", lg: "absolute" },
              top: { lg: "10%" },
              left: { lg: 180 },
              maxWidth: { xs: "100%", sm: "100%", md: "100%", lg: "45%" },
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
        </Fade>

        {/* Images */}
        <Slide direction="left" in timeout={800}>
          <Box
            sx={{
              position: { xs: "relative", lg: "absolute" },
              right: { lg: 0 },
              top: { lg: "28%" },
              display: "flex",
              gap: { xs: 0.5, sm: 1.5, md: 2, lg: 2.5 },
              justifyContent: { xs: "flex-start", sm: "flex-end" },
              ml: { xs: -2, sm: 0 },
              width: { xs: "100vw", sm: "auto" },
            }}
          >
            <Box
              component="img"
              src={heroImage1}
              alt="Kelly in library"
              sx={{
                width: {
                  xs: "50vw",
                  sm: "38vw",
                  md: "35vw",
                  lg: "24vw",
                  xl: "22vw",
                },
                maxWidth: { lg: "420px" },
                height: {
                  xs: "60vw",
                  sm: "50vw",
                  md: "46vw",
                  lg: "32vw",
                  xl: "30vw",
                },
                maxHeight: { lg: "600px" },
                objectFit: "cover",
              }}
            />
            <Box
              component="img"
              src={heroImage2}
              alt="Food photography"
              sx={{
                width: {
                  xs: "50vw",
                  sm: "38vw",
                  md: "35vw",
                  lg: "24vw",
                  xl: "22vw",
                },
                maxWidth: { lg: "420px" },
                height: {
                  xs: "60vw",
                  sm: "50vw",
                  md: "46vw",
                  lg: "32vw",
                  xl: "30vw",
                },
                maxHeight: { lg: "600px" },
                objectFit: "cover",
              }}
            />
          </Box>
        </Slide>
      </Box>

      {/* Mobile social icons - only visible on xs */}
      <Box
        sx={{
          display: { xs: "flex", sm: "none" },
          justifyContent: "flex-start",
          gap: 2,
          mt: 4,
          pb: 4,
        }}
      >
        {socialLinks.map((social) => (
          <IconButton
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            sx={{
              color: "var(--color-text)",
              p: 1,
              "&:hover": {
                backgroundColor: "transparent",
                opacity: 0.7,
              },
            }}
          >
            <social.icon sx={{ fontSize: 28 }} />
          </IconButton>
        ))}
      </Box>
    </Box>
  );
}

export default Hero;
