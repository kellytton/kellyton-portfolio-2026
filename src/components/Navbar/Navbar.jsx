import { AppBar, Toolbar, Box, Button } from "@mui/material";

const navItems = [
  { label: "ABOUT", href: "#about" },
  { label: "SKILLS", href: "#skills" },
  { label: "PROJECTS", href: "#projects" },
];

function Navbar() {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "transparent",
        color: "var(--color-text)",
      }}
    >
      <Toolbar sx={{ justifyContent: "flex-end", py: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
          {navItems.map((item) => (
            <Button
              key={item.label}
              href={item.href}
              sx={{
                color: "var(--color-text)",
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 600,
                fontSize: "0.875rem",
                letterSpacing: "0.05em",
                "&:hover": {
                  backgroundColor: "transparent",
                  opacity: 0.7,
                },
              }}
            >
              {item.label}
            </Button>
          ))}
          <Button
            variant="outlined"
            href="/resume.pdf"
            target="_blank"
            sx={{
              color: "var(--color-text)",
              borderColor: "var(--color-text)",
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 600,
              fontSize: "0.875rem",
              letterSpacing: "0.05em",
              borderRadius: 0,
              px: 3,
              py: 1,
              "&:hover": {
                borderColor: "var(--color-text)",
                backgroundColor: "rgba(51, 51, 51, 0.05)",
              },
            }}
          >
            RESUME
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
