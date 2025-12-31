import { useState } from "react";
import { Box, Typography, IconButton, Dialog } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import LaunchIcon from "@mui/icons-material/Launch";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import projectsData from "../../data/projects.json";

const featuredProjects = projectsData.projects.filter((p) => p.featured);
const additionalProjects = projectsData.projects.filter((p) => !p.featured);

function ImageCarousel({ images, captions = [], alt }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const hasMultiple = images.length > 1;

  const goToPrevious = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleImageClick = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const currentCaption = captions[currentIndex] || "";

  return (
    <>
      <Box
        sx={{
          position: "relative",
        }}
      >
        <Box
          component="img"
          src={images[currentIndex]}
          alt={`${alt} - Image ${currentIndex + 1}`}
          onClick={handleImageClick}
          sx={{
            width: "auto",
            maxWidth: "100%",
            height: "auto",
            maxHeight: "400px",
            objectFit: "contain",
            borderRadius: 1,
            display: "block",
            transition: "all 0.3s ease",
            cursor: "pointer",
            "&:hover": {
              opacity: 0.9,
            },
          }}
        />
        {hasMultiple && (
          <>
            <IconButton
              onClick={goToPrevious}
              aria-label="Previous image"
              sx={{
                position: "absolute",
                left: 8,
                top: "50%",
                transform: "translateY(-50%)",
                color: "#fff",
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                },
              }}
            >
              <ChevronLeftIcon />
            </IconButton>
            <IconButton
              onClick={goToNext}
              aria-label="Next image"
              sx={{
                position: "absolute",
                right: 8,
                top: "50%",
                transform: "translateY(-50%)",
                color: "#fff",
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                },
              }}
            >
              <ChevronRightIcon />
            </IconButton>
          </>
        )}
      </Box>

      {/* Expanded Image Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth={false}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: "transparent",
              boxShadow: "none",
              maxWidth: "90vw",
              maxHeight: "90vh",
            },
          },
          backdrop: {
            sx: {
              backgroundColor: "rgba(0, 0, 0, 0.9)",
            },
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Close button */}
          <IconButton
            onClick={handleCloseDialog}
            aria-label="Close dialog"
            sx={{
              alignSelf: "flex-end",
              mb: 1,
              color: "#fff",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Image container with arrows */}
          <Box
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Dialog Image */}
            <Box
              component="img"
              src={images[currentIndex]}
              alt={`${alt} - Image ${currentIndex + 1}`}
              sx={{
                maxWidth: "85vw",
                maxHeight: "70vh",
                objectFit: "contain",
                borderRadius: 1,
              }}
            />

            {/* Navigation arrows in dialog */}
            {hasMultiple && (
              <>
                <IconButton
                  onClick={goToPrevious}
                  aria-label="Previous image"
                  sx={{
                    position: "absolute",
                    left: { xs: 8, sm: 16 },
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#fff",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.7)",
                    },
                  }}
                >
                  <ChevronLeftIcon sx={{ fontSize: 32 }} />
                </IconButton>
                <IconButton
                  onClick={goToNext}
                  aria-label="Next image"
                  sx={{
                    position: "absolute",
                    right: { xs: 8, sm: 16 },
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#fff",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.7)",
                    },
                  }}
                >
                  <ChevronRightIcon sx={{ fontSize: 32 }} />
                </IconButton>
              </>
            )}
          </Box>

          {/* Caption */}
          {currentCaption && (
            <Typography
              sx={{
                fontFamily: "var(--font-family-primary)",
                fontWeight: 400,
                fontSize: { xs: "0.9rem", sm: "1rem" },
                color: "#fff",
                textAlign: "center",
                mt: 2,
                px: 2,
              }}
            >
              {currentCaption}
            </Typography>
          )}

          {/* Image counter */}
          {hasMultiple && (
            <Typography
              sx={{
                fontFamily: "var(--font-family-primary)",
                fontWeight: 500,
                fontSize: "0.85rem",
                color: "rgba(255, 255, 255, 0.7)",
                mt: 1,
              }}
            >
              {currentIndex + 1} / {images.length}
            </Typography>
          )}
        </Box>
      </Dialog>
    </>
  );
}

function FeaturedProject({ project, isFirst }) {
  const hasGithub = project.githubUrl && project.githubUrl.length > 0;
  const hasSite = project.siteUrl && project.siteUrl.length > 0;

  // isFirst: image on left, text on right
  // !isFirst: text on left, image on right
  const imageOnLeft = isFirst;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", lg: "row" },
        gap: { xs: 3, lg: 4 },
        mb: { xs: 8, md: 10, lg: 12 },
        alignItems: { xs: "stretch", lg: "center" },
      }}
    >
      {/* Text Content */}
      <Box
        sx={{
          flex: { xs: "none", lg: 1 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: { xs: "center", lg: "flex-start" },
          textAlign: { xs: "center", lg: "left" },
          order: { xs: 1, lg: imageOnLeft ? 1 : 0 },
        }}
      >
        {project.type === "professional" && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.75,
              mb: 1,
            }}
          >
            <WorkOutlineIcon
              sx={{
                fontSize: { xs: 14, sm: 16 },
                color: "#73513F",
              }}
            />
            <Typography
              sx={{
                fontFamily: "var(--font-family-primary)",
                fontWeight: 600,
                fontSize: { xs: "0.7rem", sm: "0.75rem" },
                color: "#73513F",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Professional Work
            </Typography>
          </Box>
        )}
        <Typography
          variant="h3"
          sx={{
            fontFamily: "var(--font-family-primary)",
            fontWeight: 700,
            fontSize: { xs: "1.5rem", sm: "1.75rem", md: "1.875rem", lg: "2rem" },
            color: "var(--color-text)",
            mb: { xs: 2, md: 2.5 },
            letterSpacing: "0.01em",
          }}
        >
          {project.name}
        </Typography>
        <Typography
          sx={{
            fontFamily: "var(--font-family-primary)",
            fontWeight: 400,
            fontSize: { xs: "0.9rem", sm: "0.95rem", md: "1rem" },
            lineHeight: 1.75,
            color: "var(--color-text)",
            mb: { xs: 2.5, md: 3 },
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
            letterSpacing: "0.01em",
          }}
        >
          {project.tools.join(" • ")}
        </Typography>
        {(hasGithub || hasSite) && (
          <Box sx={{ display: "flex", gap: 1, mt: 2.5, ml: -1 }}>
            {hasGithub && (
              <IconButton
                component="a"
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View on GitHub"
                sx={{
                  color: "var(--color-text)",
                  "&:hover": {
                    backgroundColor: "transparent",
                    opacity: 0.7,
                  },
                }}
              >
                <GitHubIcon sx={{ fontSize: 24 }} />
              </IconButton>
            )}
            {hasSite && (
              <IconButton
                component="a"
                href={project.siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View live site"
                sx={{
                  color: "var(--color-text)",
                  "&:hover": {
                    backgroundColor: "transparent",
                    opacity: 0.7,
                  },
                }}
              >
                <LaunchIcon sx={{ fontSize: 24 }} />
              </IconButton>
            )}
          </Box>
        )}
      </Box>

      {/* Project Image(s) */}
      <Box
        sx={{
          flex: { xs: "none", lg: "0 0 auto" },
          minWidth: 0,
          display: "flex",
          justifyContent: {
            xs: "center",
            lg: imageOnLeft ? "flex-start" : "flex-end"
          },
          alignItems: "center",
          order: { xs: 0, lg: imageOnLeft ? 0 : 1 },
          transition: "all 0.3s ease",
        }}
      >
        {project.images && project.images.length > 0 ? (
          <ImageCarousel
            images={project.images}
            captions={project.captions}
            alt={project.name}
          />
        ) : (
          <Box
            component="img"
            src={project.imageUrl}
            alt={project.name}
            sx={{
              width: "auto",
              maxWidth: "100%",
              height: "auto",
              maxHeight: "400px",
              objectFit: "contain",
              borderRadius: 1,
              transition: "all 0.3s ease",
            }}
          />
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
      <Box sx={{ mb: { xs: 10, md: 16 } }}>
        {featuredProjects.map((project, index) => (
          <FeaturedProject
            key={project.name}
            project={project}
            isFirst={index % 2 === 0}
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
