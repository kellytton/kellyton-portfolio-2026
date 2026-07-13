import { useState } from "react";
import { Box, Typography, Collapse, IconButton, Fade } from "@mui/material";
import { useInView } from "react-intersection-observer";
import AddIcon from "@mui/icons-material/Add";
import { usePageReady } from "../../context/PageReadyContext";

const skillsData = [
  {
    category: "FRONTEND DEVELOPMENT",
    skills: [
      "React.js",
      "HTML",
      "CSS",
      "JavaScript",
      "Bootstrap",
      "Material UI",
      "TipTap",
      "Electron.js",
      "TanStack Query",
    ],
  },
  {
    category: "BACKEND DEVELOPMENT",
    skills: ["Flask", "SQLAlchemy", "REST APIs"],
  },
  {
    category: "DATABASES & DATA",
    skills: ["PostgreSQL", "SQLite", "Hadoop", "SQL"],
  },
  {
    category: "PROGRAMMING LANGUAGES",
    skills: ["Python", "JavaScript", "C", "C++", "Java"],
  },
  {
    category: "TOOLS & PLATFORMS",
    skills: [
      "Git",
      "GitHub",
      "GitLab",
      "Figma",
      "AWS WorkSpaces",
      "Linux",
      "macOS",
    ],
  },
  {
    category: "METHODOLOGIES",
    skills: ["Agile", "Scrum", "UML"],
  },
];

function SkillCategory({ category, skills, isOpen, onToggle, index }) {
  const pageReady = usePageReady();
  const [isHovered, setIsHovered] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  const active = pageReady && inView;
  const delay = index * 90;

  return (
    <Box
      ref={ref}
      sx={{
        position: "relative",
        opacity: active ? 1 : 0,
        transform: active ? "translateY(0)" : "translateY(14px)",
        transition:
          "opacity 0.55s ease, transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: active ? `${delay}ms` : "0ms",

        "&::before": {
          content: '""',
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "1px",
          width: "100%",
          backgroundColor: "rgba(51, 51, 51, 0.3)",
        },

        "&::after": {
          content: '""',
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "1px",
          width: "0%",
          backgroundColor: "#73513F",
          transition: "width 0.65s cubic-bezier(0.4, 0, 0.2, 1)",
        },

        "&:hover::after": {
          width: "100%",
        },
      }}
    >
      <Box
        onClick={onToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: { xs: 2.5, sm: 3, md: 3.5 },
          cursor: "pointer",
        }}
      >
        <Box
          sx={{
            transition: "transform 0.3s ease",
            transform: isHovered ? "translateX(3px)" : "translateX(0)",
          }}
        >
          <Typography
            sx={{
              fontFamily: "var(--font-family-primary)",
              fontWeight: 700,
              fontSize: {
                xs: "1rem",
                sm: "1.15rem",
                md: "1.25rem",
                lg: "1.4rem",
              },
              color: "var(--color-text)",
              letterSpacing: "0.02em",
              opacity: isOpen ? 1 : 0.6,
              transition: "opacity 0.35s ease",
            }}
          >
            {category}
          </Typography>
        </Box>

        <IconButton
          sx={{
            color: "var(--color-text)",
            p: 0,
            transition: "opacity 0.3s ease",
            opacity: isHovered ? 0.6 : 1,
          }}
        >
          <AddIcon
            sx={{
              fontSize: { xs: 24, md: 28 },
              transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
              transition: "transform 0.4s cubic-bezier(0.65, 0, 0.35, 1)",
            }}
          />
        </IconButton>
      </Box>

      <Collapse
        in={isOpen}
        timeout={450}
        easing={{
          enter: "cubic-bezier(0.22, 1, 0.36, 1)",
          exit: "cubic-bezier(0.65, 0, 0.35, 1)",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              sm: "repeat(3, 1fr)",
              md: "repeat(4, 1fr)",
            },
            gap: { xs: 1, sm: 1.5, md: 2 },
            pb: { xs: 3, md: 4 },
          }}
        >
          {skills.map((skill, skillIndex) => (
            <Fade
              key={skill}
              in={isOpen}
              timeout={350}
              style={{
                transitionDelay: `${skillIndex * 40}ms`,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                }}
              >
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    backgroundColor: "var(--color-text)",
                    flexShrink: 0,
                  }}
                />

                <Typography
                  sx={{
                    fontFamily: "var(--font-family-primary)",
                    fontWeight: 500,
                    fontSize: {
                      xs: "0.9rem",
                      sm: "1rem",
                      md: "1.1rem",
                    },
                    color: "var(--color-text)",
                  }}
                >
                  {skill}
                </Typography>
              </Box>
            </Fade>
          ))}
        </Box>
      </Collapse>
    </Box>
  );
}

function Skills() {
  const pageReady = usePageReady();
  const [openIndexes, setOpenIndexes] = useState([0]);

  const { ref: titleRef, inView: titleInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const handleToggle = (index) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  return (
    <Box
      id="skills"
      component="section"
      sx={{
        py: { xs: 8, sm: 10, md: 12, lg: 16 },
        px: { xs: 3, sm: 10, md: 10, lg: 20 },
      }}
    >
      {/* Section Title */}
      <Fade in={pageReady && titleInView} timeout={600}>
        <Typography
          ref={titleRef}
          variant="h2"
          sx={{
            fontFamily: "var(--font-family-primary)",
            fontWeight: 800,
            fontSize: {
              xs: "2.5rem",
              sm: "3.5rem",
              md: "4.5rem",
              lg: "5.5rem",
            },
            lineHeight: 1,
            color: "var(--color-text)",
            mb: { xs: 4, sm: 5, md: 6 },
          }}
        >
          MY SKILLS.
        </Typography>
      </Fade>

      {/* Skills Accordion — each category animates in individually */}
      <Box>
        {skillsData.map((item, index) => (
          <SkillCategory
            key={item.category}
            category={item.category}
            skills={item.skills}
            isOpen={openIndexes.includes(index)}
            onToggle={() => handleToggle(index)}
            index={index}
          />
        ))}
      </Box>
    </Box>
  );
}

export default Skills;
