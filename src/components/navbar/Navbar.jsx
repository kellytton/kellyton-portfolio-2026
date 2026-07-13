import { useState, useEffect } from "react";
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
import resumePdf from "../../assets/Kelly Ton Resume 2026.pdf";

const navItems = [
  { label: "ABOUT", href: "/#about" },
  { label: "SKILLS", href: "/#skills" },
  { label: "PROJECTS", href: "/#projects" },
];

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Scroll-aware navbar: hairline border + shadow fade in past 20px
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          top: 0,
          zIndex: 1100,
          backgroundColor: "var(--color-background)",
          color: "var(--color-text)",
          borderBottom: "1px solid",
          borderColor: scrolled ? "rgba(51, 51, 51, 0.15)" : "transparent",
          boxShadow: scrolled ? "0 4px 16px rgba(0, 0, 0, 0.04)" : "none",
          transition: "border-color 0.4s ease, box-shadow 0.4s ease",
        }}
      >
        <Toolbar sx={{ justifyContent: "flex-end", py: 2 }}>
          {/* Mobile hamburger — morphs into an X on toggle */}
          <IconButton
            aria-label={mobileOpen ? "close menu" : "open menu"}
            onClick={handleDrawerToggle}
            sx={{
              display: { xs: "flex", sm: "none" },
              color: "var(--color-text)",
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: 22,
                height: 16,
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  left: 0,
                  width: "100%",
                  height: "2px",
                  backgroundColor: "currentColor",
                  transformOrigin: "center",
                  transition:
                    "transform 0.35s cubic-bezier(0.65, 0, 0.35, 1), top 0.35s cubic-bezier(0.65, 0, 0.35, 1)",
                  top: mobileOpen ? "7px" : "0px",
                  transform: mobileOpen ? "rotate(45deg)" : "rotate(0deg)",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  left: 0,
                  width: "100%",
                  height: "2px",
                  backgroundColor: "currentColor",
                  transformOrigin: "center",
                  transition:
                    "transform 0.35s cubic-bezier(0.65, 0, 0.35, 1), bottom 0.35s cubic-bezier(0.65, 0, 0.35, 1)",
                  bottom: mobileOpen ? "7px" : "0px",
                  transform: mobileOpen ? "rotate(-45deg)" : "rotate(0deg)",
                }}
              />
            </Box>
          </IconButton>

          {/* Desktop navigation */}
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              gap: 4,
            }}
          >
            {navItems.map((item) => (
              <Box
                key={item.label}
                sx={{
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 4,
                    left: "50%",
                    height: "1px",
                    width: 0,
                    backgroundColor: "#73513F",
                    transition:
                      "width 0.35s cubic-bezier(0.4, 0, 0.2, 1), left 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                  },
                  "&:hover::after": {
                    width: "100%",
                    left: 0,
                  },
                }}
              >
                <Button
                  href={item.href}
                  sx={{
                    color: "var(--color-text)",
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    letterSpacing: "0.05em",
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  {item.label}
                </Button>
              </Box>
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
                transition:
                  "border-color 0.3s ease, background-color 0.3s ease",
                "&:hover": {
                  borderColor: "#73513F",
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
            <IconButton
              onClick={handleDrawerToggle}
              aria-label="close menu"
              sx={{ color: "var(--color-text)" }}
            >
              <Box sx={{ position: "relative", width: 20, height: 20 }}>
                <Box
                  sx={{
                    position: "absolute",
                    left: 0,
                    top: "9px",
                    width: "100%",
                    height: "2px",
                    backgroundColor: "currentColor",
                    transform: "rotate(45deg)",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    left: 0,
                    top: "9px",
                    width: "100%",
                    height: "2px",
                    backgroundColor: "currentColor",
                    transform: "rotate(-45deg)",
                  }}
                />
              </Box>
            </IconButton>
          </Box>

          {/* Drawer nav items — fade + rise in, staggered after the drawer slides in */}
          <List sx={{ mt: 4 }}>
            {navItems.map((item, index) => (
              <ListItem
                key={item.label}
                disablePadding
                sx={{
                  opacity: mobileOpen ? 1 : 0,
                  transform: mobileOpen ? "translateY(0)" : "translateY(12px)",
                  transition:
                    "opacity 0.4s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                  transitionDelay: mobileOpen ? `${225 + index * 70}ms` : "0ms",
                }}
              >
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

            <ListItem
              disablePadding
              sx={{
                mt: 2,
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? "translateY(0)" : "translateY(12px)",
                transition:
                  "opacity 0.4s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                transitionDelay: mobileOpen
                  ? `${225 + navItems.length * 70}ms`
                  : "0ms",
              }}
            >
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
                  transition:
                    "border-color 0.3s ease, background-color 0.3s ease",
                  "&:hover": {
                    borderColor: "#73513F",
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
