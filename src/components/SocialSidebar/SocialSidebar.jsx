import { Box, IconButton } from "@mui/material";
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

function SocialSidebar() {
  return (
    <Box
      sx={{
        position: "fixed",
        left: { xs: 16, md: 32, lg: 48 },
        top: "50%",
        bottom: 0,
        display: { xs: "none", sm: "flex" },
        flexDirection: "column",
        alignItems: "center",
        zIndex: 10,
      }}
    >
      {/* Icons container */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
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

      {/* Vertical line extending to bottom */}
      <Box
        sx={{
          width: "2px",
          flex: 1,
          backgroundColor: "var(--color-text)",
          mt: 2,
          opacity: 0.3,
        }}
      />
    </Box>
  );
}

export default SocialSidebar;
