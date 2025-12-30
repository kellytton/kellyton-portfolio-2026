import { Box, Typography, IconButton } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import projectsData from "../../data/projects.json";

const featuredProjects = projectsData.projects.filter((p) => p.featured);
const additionalProjects = projectsData.projects.filter((p) => !p.featured);

function FeaturedProject({ project, imageOnLeft }) {
  const hasGithub = project.githubUrl && project.githubUrl.length > 0;
  const hasSite = project.siteUrl && project.siteUrl.length > 0;
  const isWide = project.isWideImage;

  // Image takes 4/12 if not wide, 8/12 if wide
  // Text takes the remaining space
  const imageWidth = isWide ? "66.666%" : "33.333%";
  const textWidth = isWide ? "33.333%" : "66.666%";

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: imageOnLeft
            ? `${imageWidth} ${textWidth}`
            : `${textWidth} ${imageWidth}`,
        },
        gap: { xs: 3, md: 4, lg: 5 },
        mb: { xs: 6, md: 8, lg: 10 },
        alignItems: "center",
      }}
    >
      {/* Project Image */}
      <Box
        sx={{
          order: { xs: 0, md: imageOnLeft ? 0 : 1 },
        }}
      >
        <Box
          component="img"
          src={project.imageUrl}
          alt={project.name}
          sx={{
            width: "100%",
            height: "auto",
            maxHeight: { xs: "300px", sm: "350px", md: "400px" },
            objectFit: "contain",
            borderRadius: 1,
          }}
        />
      </Box>

      {/* Project Info */}
      <Box
        sx={{
          order: { xs: 1, md: imageOnLeft ? 1 : 0 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontFamily: "var(--font-family-primary)",
            fontWeight: 700,
            fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem", lg: "2.25rem" },
            color: "var(--color-text)",
            mb: 2,
          }}
        >
          {project.name}
        </Typography>
        <Typography
          sx={{
            fontFamily: "var(--font-family-primary)",
            fontWeight: 400,
            fontSize: { xs: "0.9rem", sm: "0.95rem", md: "1rem", lg: "1.05rem" },
            lineHeight: 1.7,
            color: "var(--color-text)",
            mb: 3,
          }}
        >
          {project.description}
        </Typography>
        <Typography
          sx={{
            fontFamily: "var(--font-family-primary)",
            fontWeight: 600,
            fontSize: { xs: "0.85rem", sm: "0.9rem", md: "0.95rem" },
            color: "#73513F",
          }}
        >
          {project.tools.join(" • ")}
        </Typography>
        {(hasGithub || hasSite) && (
          <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
            {hasGithub && (
              <IconButton
                component="a"
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "var(--color-text)" }}
              >
                <GitHubIcon />
              </IconButton>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}

function AdditionalProject({ project }) {
  const hasGithub = project.githubUrl && project.githubUrl.length > 0;

  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "rgba(51, 51, 51, 0.3)",
        borderRadius: 1,
        p: { xs: 2.5, sm: 3 },
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "var(--color-background)",
      }}
    >
      {/* Header with folder icon and github */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 2,
        }}
      >
        <FolderOpenIcon
          sx={{
            fontSize: { xs: 36, md: 40 },
            color: "var(--color-text)",
          }}
        />
        {hasGithub && (
          <IconButton
            component="a"
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: "var(--color-text)",
              p: 0.5,
              "&:hover": { opacity: 0.7 },
            }}
          >
            <GitHubIcon sx={{ fontSize: 22 }} />
          </IconButton>
        )}
      </Box>

      {/* Project Name */}
      <Typography
        variant="h4"
        sx={{
          fontFamily: "var(--font-family-primary)",
          fontWeight: 700,
          fontSize: { xs: "1.1rem", sm: "1.2rem", md: "1.25rem" },
          color: "var(--color-text)",
          mb: 1.5,
        }}
      >
        {project.name}
      </Typography>

      {/* Description */}
      <Typography
        sx={{
          fontFamily: "var(--font-family-primary)",
          fontWeight: 400,
          fontSize: { xs: "0.85rem", sm: "0.9rem" },
          lineHeight: 1.6,
          color: "var(--color-text)",
          opacity: 0.85,
          flex: 1,
          mb: 2,
        }}
      >
        {project.description}
      </Typography>

      {/* Tools */}
      <Typography
        sx={{
          fontFamily: "var(--font-family-primary)",
          fontWeight: 600,
          fontSize: { xs: "0.8rem", sm: "0.85rem" },
          color: "#73513F",
          mt: "auto",
        }}
      >
        {project.tools.join(" • ")}
      </Typography>
    </Box>
  );
}

function Projects() {
  return (
    <Box
      id="projects"
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
        CRAFTED WORKS.
      </Typography>

      {/* Featured Projects */}
      <Box sx={{ mb: { xs: 8, md: 12 } }}>
        {featuredProjects.map((project, index) => (
          <FeaturedProject
            key={project.name}
            project={project}
            imageOnLeft={index % 2 === 0}
          />
        ))}
      </Box>

      {/* More Projects Section */}
      <Typography
        variant="h3"
        sx={{
          fontFamily: "var(--font-family-primary)",
          fontWeight: 700,
          fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
          color: "var(--color-text)",
          textAlign: "center",
          mb: { xs: 4, sm: 5, md: 6 },
        }}
      >
        MORE PROJECTS
      </Typography>

      {/* Additional Projects Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          },
          gap: { xs: 3, sm: 3, md: 4 },
        }}
      >
        {additionalProjects.map((project) => (
          <AdditionalProject key={project.name} project={project} />
        ))}
      </Box>
    </Box>
  );
}

export default Projects;
