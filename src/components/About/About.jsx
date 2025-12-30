import { Box, Typography } from "@mui/material";
import aboutImage1 from "../../assets/about/about-1.png";
import aboutImage2 from "../../assets/about/about-2.png";

function About() {
  return (
    <Box
      id="about"
      component="section"
      sx={{
        py: { xs: 8, sm: 10, md: 12, lg: 16 },
        px: { xs: 3, sm: 10, md: 10, lg: 20 },
      }}
    >
      {/* Section Title */}
      <Typography
        variant="h2"
        sx={{
          fontFamily: "var(--font-family-primary)",
          fontWeight: 800,
          fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem", lg: "5.5rem" },
          lineHeight: 1,
          color: "var(--color-text)",
          mb: { xs: 6, sm: 7, md: 8 },
        }}
      >
        ABOUT ME.
      </Typography>

      {/* First Row - Image left, Text right */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "stretch", md: "stretch" },
          mb: { xs: 6, sm: 6, md: 0 },
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "40%" },
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            pr: { md: 4, lg: 5 },
            py: { md: 4, lg: 5 },
          }}
        >
          <Box
            component="img"
            src={aboutImage1}
            alt="Kelly at graduation"
            sx={{
              width: "100%",
              height: { xs: "280px", sm: "320px", md: "200px", lg: "240px" },
              objectFit: "cover",
            }}
          />
        </Box>
        {/* Vertical divider */}
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            width: "2px",
            backgroundColor: "var(--color-text)",
            opacity: 0.3,
          }}
        />
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            pl: { xs: 0, md: 4, lg: 5 },
            py: { xs: 3, md: 4 },
          }}
        >
          <Typography
            sx={{
              fontFamily: "var(--font-family-primary)",
              fontWeight: 600,
              fontSize: { xs: "0.95rem", sm: "1rem", md: "0.95rem", lg: "1.1rem" },
              lineHeight: 1.8,
              color: "var(--color-text)",
            }}
          >
            Hi, I'm Kelly Ton. I'm currently working as the Lead Web Developer &
            UI/UX at DefTechLink, and I recently graduated from the University
            of South Florida with a Bachelor of Science in Computer Science. I
            love taking ideas from concept to reality—designing intuitive
            interfaces, building features that just work, and making sure users
            have a seamless experience from start to finish.
          </Typography>
        </Box>
      </Box>

      {/* Horizontal divider between rows - hidden on mobile */}
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          height: "2px",
          backgroundColor: "var(--color-text)",
          opacity: 0.3,
        }}
      />

      {/* Second Row - Text left, Image right */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", md: "row" },
          alignItems: { xs: "stretch", md: "stretch" },
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            pr: { xs: 0, md: 4, lg: 5 },
            py: { xs: 3, md: 4 },
          }}
        >
          <Typography
            sx={{
              fontFamily: "var(--font-family-primary)",
              fontWeight: 600,
              fontSize: { xs: "0.95rem", sm: "1rem", md: "0.95rem", lg: "1.1rem" },
              lineHeight: 1.8,
              color: "var(--color-text)",
            }}
          >
            I'm passionate about crafting products that feel thoughtful,
            polished, and fun to use. I thrive in collaborative environments,
            enjoy brainstorming solutions with teammates, and constantly look
            for ways to learn and improve. When I'm not coding, I'm usually
            traveling, trying new foods, hiking, or playing music on my kalimba.
          </Typography>
        </Box>
        {/* Vertical divider */}
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            width: "2px",
            backgroundColor: "var(--color-text)",
            opacity: 0.3,
          }}
        />
        <Box
          sx={{
            width: { xs: "100%", md: "40%" },
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            pl: { md: 4, lg: 5 },
            py: { md: 4, lg: 5 },
          }}
        >
          <Box
            component="img"
            src={aboutImage2}
            alt="Orchids in garden"
            sx={{
              width: "100%",
              height: { xs: "280px", sm: "320px", md: "200px", lg: "240px" },
              objectFit: "cover",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default About;
