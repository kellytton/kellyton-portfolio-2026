import { Box, Typography, IconButton, Fade } from "@mui/material";
import { useInView } from "react-intersection-observer";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";

const socialLinks = [
  {
    icon: LinkedInIcon,
    href: "https://www.linkedin.com/in/kellytton/",
    label: "LinkedIn",
  },
  {
    icon: GitHubIcon,
    href: "https://github.com/kellytton",
    label: "GitHub",
  },
  {
    icon: EmailIcon,
    href: "mailto:kthton@gmail.com",
    label: "Email",
  },
];

function Footer() {
  const currentYear = new Date().getFullYear();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <Box
      component="footer"
      sx={{
        py: { xs: 6, md: 8 },
        px: { xs: 3, sm: 10, md: 10, lg: 20 },
        borderTop: "2px solid",
        borderColor: "var(--color-text)",
        borderTopColor: "rgba(51, 51, 51, 0.3)",
      }}
    >
      <Fade in={inView} timeout={600}>
        <Box
          ref={ref}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 3,
          }}
        >
        {/* Left side - Name/Brand */}
        <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
          <Typography
            sx={{
              fontFamily: "var(--font-family-primary)",
              fontWeight: 700,
              fontSize: { xs: "1.25rem", md: "1.5rem" },
              color: "var(--color-text)",
              letterSpacing: "0.02em",
            }}
          >
            KELLY TON
          </Typography>
          <Typography
            sx={{
              fontFamily: "var(--font-family-primary)",
              fontWeight: 400,
              fontSize: { xs: "0.85rem", md: "0.9rem" },
              color: "var(--color-text)",
              opacity: 0.7,
              mt: 0.5,
            }}
          >
            Software Engineer
          </Typography>
        </Box>

        {/* Center - Social Links */}
        <Box
          sx={{
            display: "flex",
            gap: 1,
          }}
        >
          {socialLinks.map((social) => (
            <IconButton
              key={social.label}
              component="a"
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              sx={{
                color: "var(--color-text)",
                "&:hover": {
                  backgroundColor: "transparent",
                  opacity: 0.7,
                },
              }}
            >
              <social.icon sx={{ fontSize: 24 }} />
            </IconButton>
          ))}
        </Box>

        {/* Right side - Copyright */}
        <Typography
          sx={{
            fontFamily: "var(--font-family-primary)",
            fontWeight: 400,
            fontSize: { xs: "0.8rem", md: "0.85rem" },
            color: "var(--color-text)",
            opacity: 0.6,
            textAlign: { xs: "center", sm: "right" },
          }}
        >
          © {currentYear} Kelly Ton
        </Typography>
        </Box>
      </Fade>
    </Box>
  );
}

export default Footer;
