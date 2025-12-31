import { useState } from "react";
import { Box, Typography, Collapse, IconButton, Fade } from "@mui/material";
import { useInView } from "react-intersection-observer";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const skillsData = [
  {
    category: "FRONTEND DEVELOPMENT",
    skills: ["React.js", "HTML", "CSS", "JavaScript", "Bootstrap", "Material UI", "TipTap", "Electron.js"],
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
    skills: ["Git", "GitHub", "GitLab", "Figma", "AWS WorkSpaces", "Linux", "macOS"],
  },
  {
    category: "METHODOLOGIES",
    skills: ["Agile", "Scrum", "UML"],
  },
];

function SkillCategory({ category, skills, isOpen, onToggle, isLast }) {
  return (
    <Box
      sx={{
        borderBottom: isLast ? "none" : "1px solid",
        borderColor: "rgba(51, 51, 51, 0.3)",
      }}
    >
      <Box
        onClick={onToggle}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: { xs: 2.5, sm: 3, md: 3.5 },
          cursor: "pointer",
          "&:hover": {
            opacity: 0.8,
          },
        }}
      >
        <Typography
          sx={{
            fontFamily: "var(--font-family-primary)",
            fontWeight: 700,
            fontSize: { xs: "1rem", sm: "1.15rem", md: "1.25rem", lg: "1.4rem" },
            color: "var(--color-text)",
            letterSpacing: "0.02em",
          }}
        >
          {category}
        </Typography>
        <IconButton
          sx={{
            color: "var(--color-text)",
            p: 0,
          }}
        >
          {isOpen ? (
            <RemoveIcon sx={{ fontSize: { xs: 24, md: 28 } }} />
          ) : (
            <AddIcon sx={{ fontSize: { xs: 24, md: 28 } }} />
          )}
        </IconButton>
      </Box>
      <Collapse in={isOpen}>
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
          {skills.map((skill) => (
            <Box
              key={skill}
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
                  fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                  color: "var(--color-text)",
                }}
              >
                {skill}
              </Typography>
            </Box>
          ))}
        </Box>
      </Collapse>
    </Box>
  );
}

function Skills() {
  const [openIndexes, setOpenIndexes] = useState([0]);
  const { ref: titleRef, inView: titleInView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: accordionRef, inView: accordionInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleToggle = (index) => {
    setOpenIndexes((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
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
      <Fade in={titleInView} timeout={600}>
        <Typography
          ref={titleRef}
          variant="h2"
          sx={{
            fontFamily: "var(--font-family-primary)",
            fontWeight: 800,
            fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem", lg: "5.5rem" },
            lineHeight: 1,
            color: "var(--color-text)",
            mb: { xs: 4, sm: 5, md: 6 },
          }}
        >
          MY SKILLS.
        </Typography>
      </Fade>

      {/* Skills Accordion */}
      <Fade in={accordionInView} timeout={600}>
        <Box ref={accordionRef}>
          {skillsData.map((item, index) => (
            <SkillCategory
              key={item.category}
              category={item.category}
              skills={item.skills}
              isOpen={openIndexes.includes(index)}
              onToggle={() => handleToggle(index)}
              isLast={index === skillsData.length - 1}
            />
          ))}
        </Box>
      </Fade>
    </Box>
  );
}

export default Skills;
