import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import resumePdf from "../../assets/Kelly Ton Resume 2026.pdf";

const navItems = [
  { label: "ABOUT", href: "#about" },
  { label: "SKILLS", href: "#skills" },
  { label: "PROJECTS", href: "#projects" },
];

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: "transparent",
          color: "var(--color-text)",
        }}
      >
        <Toolbar sx={{ justifyContent: "flex-end", py: 2 }}>
          {/* Mobile hamburger menu */}
          <IconButton
            aria-label="open menu"
            onClick={handleDrawerToggle}
            sx={{
              display: { xs: "flex", sm: "none" },
              color: "var(--color-text)",
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* Desktop navigation */}
          <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center", gap: 4 }}>
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
              component="a"
              href={resumePdf}
              download="Kelly Ton Resume.pdf"
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

      {/* Mobile drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            width: "100%",
            backgroundColor: "var(--color-background)",
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton onClick={handleDrawerToggle} sx={{ color: "var(--color-text)" }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List sx={{ mt: 4 }}>
            {navItems.map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton
                  href={item.href}
                  onClick={handleDrawerToggle}
                  sx={{ py: 2 }}
                >
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: 600,
                      fontSize: "1.25rem",
                      letterSpacing: "0.05em",
                      color: "var(--color-text)",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem disablePadding sx={{ mt: 2 }}>
              <Button
                variant="outlined"
                component="a"
                href={resumePdf}
                download="Kelly Ton Resume.pdf"
                fullWidth
                sx={{
                  color: "var(--color-text)",
                  borderColor: "var(--color-text)",
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 600,
                  fontSize: "1.25rem",
                  letterSpacing: "0.05em",
                  borderRadius: 0,
                  py: 1.5,
                  "&:hover": {
                    borderColor: "var(--color-text)",
                    backgroundColor: "rgba(51, 51, 51, 0.05)",
                  },
                }}
              >
                RESUME
              </Button>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default Navbar;
