import { useState, useEffect } from "react";
import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import { Box, Typography, IconButton, Dialog } from "@mui/material";
import { useInView } from "react-intersection-observer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import GitHubIcon from "@mui/icons-material/GitHub";
import LaunchIcon from "@mui/icons-material/Launch";
import CloseIcon from "@mui/icons-material/Close";
import { Navbar, Footer } from "../components";
import projectsData from "../data/projects.json";

const ACCENT = "#73513F";
const FONT = "var(--font-family-primary)";
const HAIRLINE = "rgba(115, 81, 63, 0.22)";
const RISE = "cubic-bezier(0.22, 1, 0.36, 1)"; // matches About/Projects reveals
const DRAW = "cubic-bezier(0.65, 0, 0.35, 1)"; // matches the divider "draw" easing

/* Scroll-triggered rise + fade, staggered by `delay`.
   Mirrors the translateY(→0) + Fade pattern used across About.jsx. */
function Reveal({ children, delay = 0, threshold = 0.2, y = 14, sx, ...rest }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold });
  return (
    <Box
      ref={ref}
      sx={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity 0.6s ease, transform 0.6s ${RISE}`,
        transitionDelay: inView ? `${delay}ms` : "0ms",
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
}

/* Numbered section header — "01 / Title" — whose hairline rule
   draws left-to-right on scroll, like the Project Archive divider. */
function SectionHeader({ number, title }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 });
  return (
    <Box ref={ref} sx={{ mb: 3 }}>
      <Box sx={{ display: "flex", alignItems: "baseline", gap: 2, mb: 2 }}>
        <Typography
          component="span"
          sx={{
            fontFamily: FONT,
            fontWeight: 700,
            fontSize: { xs: "0.85rem", sm: "0.9rem" },
            color: ACCENT,
            letterSpacing: "0.1em",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(10px)",
            transition: `opacity 0.5s ease, transform 0.5s ${RISE}`,
          }}
        >
          {number}
        </Typography>
        <Typography
          component="h2"
          sx={{
            fontFamily: FONT,
            fontWeight: 700,
            fontSize: { xs: "1.35rem", sm: "1.6rem", md: "1.85rem" },
            color: "var(--color-text)",
            letterSpacing: "0.01em",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(10px)",
            transition: `opacity 0.5s ease, transform 0.5s ${RISE}`,
            transitionDelay: inView ? "80ms" : "0ms",
          }}
        >
          {title}
        </Typography>
      </Box>
      <Box
        sx={{
          height: "1px",
          backgroundColor: HAIRLINE,
          transformOrigin: "left",
          transform: inView ? "scaleX(1)" : "scaleX(0)",
          transition: `transform 0.9s ${DRAW}`,
          transitionDelay: inView ? "150ms" : "0ms",
        }}
      />
    </Box>
  );
}

function Prose({ children, sx }) {
  return (
    <Typography
      sx={{
        fontFamily: FONT,
        fontWeight: 400,
        fontSize: { xs: "1rem", sm: "1.08rem" },
        lineHeight: 1.85,
        color: "var(--color-text)",
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
}

function MetaItem({ label, value }) {
  return (
    <Box>
      <Typography
        sx={{
          fontFamily: FONT,
          fontSize: "0.7rem",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: ACCENT,
          mb: 0.75,
        }}
      >
        {label}
      </Typography>
      <Typography
        sx={{
          fontFamily: FONT,
          fontSize: "0.95rem",
          lineHeight: 1.5,
          color: "var(--color-text)",
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}

/* A framed, overflow-clipped image mat: settles from a slight zoom while a
   fade lifts it in, hover-zooms, and opens the lightbox on click. Shared by
   both the side-by-side Figure and the iteration timeline. */
function ImageMat({ src, alt, active, delay = 0, onOpen }) {
  return (
    <Box
      onClick={() => onOpen(src)}
      sx={{
        position: "relative",
        p: { xs: 1, sm: 1.5 },
        backgroundColor: "rgba(115, 81, 63, 0.04)",
        border: `1px solid ${HAIRLINE}`,
        borderRadius: 1,
        cursor: "zoom-in",
        overflow: "hidden",
        opacity: active ? 1 : 0,
        transition: "opacity 0.7s ease",
        transitionDelay: active ? `${delay}ms` : "0ms",
        "&:hover .cs-figure": { transform: "scale(1.03)" },
        "&:hover .cs-zoom": { opacity: 1 },
      }}
    >
      <Box
        component="img"
        className="cs-figure"
        src={src}
        alt={alt}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.style.opacity = "0.25";
        }}
        sx={{
          width: "100%",
          height: "auto",
          display: "block",
          borderRadius: 0.5,
          transform: active ? "scale(1)" : "scale(1.08)",
          transition: `transform 1s ${RISE}`,
          transitionDelay: active ? `${delay + 80}ms` : "0ms",
        }}
      />
      <Box
        className="cs-zoom"
        sx={{
          position: "absolute",
          bottom: 12,
          right: 12,
          px: 1.25,
          py: 0.5,
          borderRadius: "999px",
          backgroundColor: "rgba(0,0,0,0.6)",
          color: "#fff",
          fontFamily: FONT,
          fontSize: "0.68rem",
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          opacity: 0,
          transition: "opacity 0.3s ease",
          pointerEvents: "none",
        }}
      >
        Click to enlarge
      </Box>
    </Box>
  );
}

/* Side-by-side figure (image + caption rail) — used for the wireframe artifacts. */
function Figure({ item, index, label, onOpen }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0,
    rootMargin: "0px 0px -10% 0px",
  });

  const srcs = Array.isArray(item.images) ? item.images : [item.src];

  return (
    <Box
      ref={ref}
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) 300px" },
        gap: { xs: 2.5, md: 5 },
        alignItems: "start",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: { xs: 1.5, md: 2 },
        }}
      >
        {srcs.map((src, imgIdx) => (
          <ImageMat
            key={src}
            src={src}
            alt={item.caption || `design ${index + 1}`}
            active={inView}
            delay={imgIdx * 120}
            onOpen={onOpen}
          />
        ))}
      </Box>

      <Box
        sx={{
          pt: { md: 1 },
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(12px)",
          transition: `opacity 0.6s ease, transform 0.6s ${RISE}`,
          transitionDelay: inView ? "220ms" : "0ms",
        }}
      >
        {item.label && (
          <Typography
            sx={{
              fontFamily: FONT,
              fontWeight: 700,
              fontSize: "0.72rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: ACCENT,
              mb: 1.25,
            }}
          >
            {label}
          </Typography>
        )}
        {item.caption && (
          <Typography
            sx={{
              fontFamily: FONT,
              fontSize: { xs: "0.9rem", sm: "0.92rem" },
              lineHeight: 1.7,
              color: "var(--color-text)",
              opacity: 0.82,
            }}
          >
            {item.caption}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

/* One node in the iteration timeline: a numbered dot on a drawn spine, with the
   "what changed & why" caption above the image(s). Mirrors About.jsx's timeline
   animation vocabulary (dot springs in, spine draws down, content rises). */
function TimelineStep({ item, isLast, onOpen }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0,
    rootMargin: "0px 0px -12% 0px",
  });

  const srcs = Array.isArray(item.images) ? item.images : [item.src];

  return (
    <Box ref={ref} sx={{ display: "flex", gap: { xs: 2, sm: 3 } }}>
      {/* Spine + node */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minWidth: { xs: 40, sm: 48 },
        }}
      >
        <Box
          sx={{
            width: { xs: 40, sm: 48 },
            height: { xs: 40, sm: 48 },
            borderRadius: "50%",
            backgroundColor: ACCENT,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            opacity: inView ? 1 : 0,
            transform: inView
              ? "scale(1) rotate(0deg)"
              : "scale(0.4) rotate(-25deg)",
            transition:
              "transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.45s ease",
            transitionDelay: inView ? "250ms" : "0ms",
          }}
        >
          <Typography
            sx={{
              fontFamily: FONT,
              fontWeight: 700,
              fontSize: { xs: "0.85rem", sm: "0.95rem" },
              color: "#fff",
              letterSpacing: "0.02em",
            }}
          >
            {item.step}
          </Typography>
        </Box>
        {!isLast && (
          <Box
            sx={{
              width: "2px",
              flex: 1,
              backgroundColor: ACCENT,
              opacity: 0.28,
              mt: 1,
              transformOrigin: "top",
              transform: inView ? "scaleY(1)" : "scaleY(0)",
              transition: `transform 0.9s ${DRAW}`,
              transitionDelay: inView ? "80ms" : "0ms",
            }}
          />
        )}
      </Box>

      {/* Content: version label, "why" caption, then the frame(s) */}
      <Box sx={{ flex: 1, minWidth: 0, pb: isLast ? 0 : { xs: 6, md: 8 } }}>
        <Typography
          sx={{
            fontFamily: FONT,
            fontWeight: 600,
            fontSize: "0.72rem",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: ACCENT,
            mb: 1,
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(10px)",
            transition: `opacity 0.5s ease, transform 0.5s ${RISE}`,
            transitionDelay: inView ? "300ms" : "0ms",
          }}
        >
          {`Version ${item.step}`}
        </Typography>
        <Typography
          sx={{
            fontFamily: FONT,
            fontWeight: 700,
            fontSize: { xs: "1.15rem", sm: "1.3rem", md: "1.4rem" },
            color: "var(--color-text)",
            mb: 1.5,
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(10px)",
            transition: `opacity 0.5s ease, transform 0.5s ${RISE}`,
            transitionDelay: inView ? "360ms" : "0ms",
          }}
        >
          {item.label}
        </Typography>
        {item.caption && (
          <Typography
            sx={{
              fontFamily: FONT,
              fontSize: { xs: "0.95rem", sm: "1rem" },
              lineHeight: 1.75,
              color: "var(--color-text)",
              opacity: inView ? 0.85 : 0,
              transform: inView ? "translateY(0)" : "translateY(10px)",
              transition: `opacity 0.5s ease, transform 0.5s ${RISE}`,
              transitionDelay: inView ? "440ms" : "0ms",
              mb: 3,
              maxWidth: 640,
            }}
          >
            {item.caption}
          </Typography>
        )}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: { xs: 1.5, md: 2 },
          }}
        >
          {srcs.map((src, imgIdx) => (
            <ImageMat
              key={src}
              src={src}
              alt={item.caption || item.label}
              active={inView}
              delay={520 + imgIdx * 140}
              onOpen={onOpen}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

function CaseStudy() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = projectsData.projects.find((p) => p.slug === slug);
  const [lightbox, setLightbox] = useState(null);

  // Return to the portfolio and land on the Crafted Works (Projects) section.
  // SPA navigation keeps the music playing; Home reads the hash and scrolls.
  const backToProjects = (e) => {
    e.preventDefault();
    navigate("/#projects");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project || !project.caseStudy) {
    return <Navigate to="/" replace />;
  }

  const cs = project.caseStudy;
  const hasGithub = project.githubUrl && project.githubUrl.length > 0;
  const hasSite = project.siteUrl && project.siteUrl.length > 0;

  const sections = [];
  if (cs.problem) sections.push({ title: "The Problem", body: cs.problem });
  if (cs.approach) sections.push({ title: "My Approach", body: cs.approach });

  const pad = (n) => String(n).padStart(2, "0");
  let sectionNo = 0;
  const nextNo = () => pad(++sectionNo);

  // Split design entries: standalone artifacts (wireframes) render as figures;
  // tagged "iteration" entries render as a connected timeline story.
  const design = Array.isArray(cs.design) ? cs.design : [];
  const wireframes = design.filter((d) => d.phase !== "iteration");
  const iterations = design.filter((d) => d.phase === "iteration");

  return (
    <Box
      sx={{ backgroundColor: "var(--color-background)", minHeight: "100vh" }}
    >
      <Navbar />

      <Box
        component="main"
        sx={{
          px: { xs: 3, sm: 8, md: 12, lg: 20 },
          py: { xs: 5, sm: 7, md: 9 },
        }}
      >
        {/* Back to portfolio */}
        <Reveal delay={0} threshold={0}>
          <Box
            component={Link}
            to="/#projects"
            onClick={backToProjects}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.75,
              textDecoration: "none",
              color: "var(--color-text)",
              opacity: 0.7,
              mb: { xs: 5, md: 7 },
              transition: "opacity 0.2s ease, gap 0.2s ease",
              "&:hover": { opacity: 1, gap: "10px" },
            }}
          >
            <ArrowBackIcon sx={{ fontSize: 18 }} />
            <Typography
              sx={{
                fontFamily: FONT,
                fontWeight: 600,
                fontSize: "0.8rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Crafted Works
            </Typography>
          </Box>
        </Reveal>

        {/* ── Editorial header — staggered reveal ──────────────────── */}
        {project.type === "professional" && (
          <Reveal delay={60} threshold={0}>
            <Typography
              sx={{
                fontFamily: FONT,
                fontWeight: 600,
                fontSize: { xs: "0.72rem", sm: "0.78rem" },
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: ACCENT,
                mb: 2,
              }}
            >
              Professional Work — Case Study
            </Typography>
          </Reveal>
        )}

        <Reveal delay={140} threshold={0}>
          <Typography
            component="h1"
            sx={{
              fontFamily: FONT,
              fontWeight: 800,
              fontSize: { xs: "2.75rem", sm: "4rem", md: "5.25rem" },
              lineHeight: 1.02,
              letterSpacing: "-0.01em",
              color: "var(--color-text)",
              mb: { xs: 3, md: 4 },
            }}
          >
            {project.name}
          </Typography>
        </Reveal>

        {/* Two-column: lead paragraph + meta rail */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 260px" },
            gap: { xs: 4, md: 8 },
            alignItems: "start",
            pb: { xs: 5, md: 7 },
            borderBottom: `1px solid ${HAIRLINE}`,
          }}
        >
          <Reveal delay={220} threshold={0}>
            <Prose
              sx={{
                fontSize: { xs: "1.15rem", md: "1.3rem" },
                lineHeight: 1.7,
              }}
            >
              {cs.summary}
            </Prose>
          </Reveal>

          <Reveal
            delay={320}
            threshold={0}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              pl: { md: 4 },
              borderLeft: { md: `1px solid ${HAIRLINE}` },
            }}
          >
            {cs.role && <MetaItem label="Role" value={cs.role} />}
            {cs.timeline && <MetaItem label="Timeline" value={cs.timeline} />}
            <MetaItem label="Stack" value={project.tools.join(" · ")} />
            {(hasSite || hasGithub) && (
              <Box>
                <Typography
                  sx={{
                    fontFamily: FONT,
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: ACCENT,
                    mb: 0.75,
                  }}
                >
                  Links
                </Typography>
                <Box sx={{ display: "flex", gap: 0.5, ml: -1 }}>
                  {hasSite && (
                    <IconButton
                      component="a"
                      href={project.siteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Live site"
                      sx={{
                        color: "var(--color-text)",
                        "&:hover": { opacity: 0.7 },
                      }}
                    >
                      <LaunchIcon sx={{ fontSize: 22 }} />
                    </IconButton>
                  )}
                  {hasGithub && (
                    <IconButton
                      component="a"
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      sx={{
                        color: "var(--color-text)",
                        "&:hover": { opacity: 0.7 },
                      }}
                    >
                      <GitHubIcon sx={{ fontSize: 22 }} />
                    </IconButton>
                  )}
                </Box>
              </Box>
            )}
          </Reveal>
        </Box>

        {/* ── Numbered narrative sections ──────────────────────────── */}
        <Box
          sx={{
            maxWidth: 780,
            mt: { xs: 6, md: 9 },
            display: "flex",
            flexDirection: "column",
            gap: { xs: 6, md: 8 },
          }}
        >
          {sections.map((s) => (
            <Box key={s.title}>
              <SectionHeader number={nextNo()} title={s.title} />
              <Reveal delay={120}>
                <Prose>{s.body}</Prose>
              </Reveal>
            </Box>
          ))}

          {Array.isArray(cs.decisions) && cs.decisions.length > 0 && (
            <Box>
              <SectionHeader number={nextNo()} title="Key Decisions" />
              <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {cs.decisions.map((d, i) => (
                  <Reveal key={i} delay={i * 120} threshold={0.25}>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1.5,
                        alignItems: "baseline",
                        mb: 1,
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: FONT,
                          fontWeight: 700,
                          fontSize: "0.85rem",
                          color: ACCENT,
                        }}
                      >
                        →
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: FONT,
                          fontWeight: 700,
                          fontSize: { xs: "1.05rem", sm: "1.15rem" },
                          color: "var(--color-text)",
                        }}
                      >
                        {d.title}
                      </Typography>
                    </Box>
                    <Prose sx={{ pl: { xs: 2.5, sm: 3 } }}>{d.reason}</Prose>
                  </Reveal>
                ))}
              </Box>
            </Box>
          )}
        </Box>

        {/* ── Design process — wireframe artifacts ─────────────────── */}
        {wireframes.length > 0 && (
          <Box sx={{ mt: { xs: 8, md: 11 } }}>
            <Box sx={{ maxWidth: 780 }}>
              <SectionHeader number={nextNo()} title="Design Process" />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: { xs: 7, md: 10 },
                mt: 4,
              }}
            >
              {wireframes.map((item, i) => (
                <Figure
                  key={item.src || i}
                  item={item}
                  index={i}
                  label={`Fig. ${pad(i + 1)} — ${item.label}`}
                  onOpen={setLightbox}
                />
              ))}
            </Box>
          </Box>
        )}

        {/* ── Feature iteration — connected timeline story ─────────── */}
        {iterations.length > 0 && (
          <Box sx={{ mt: { xs: 8, md: 11 } }}>
            <Box sx={{ maxWidth: 780 }}>
              <SectionHeader
                number={nextNo()}
                title="Product Evolution & Iteration"
              />
              <Reveal delay={120} sx={{ mb: { xs: 4, md: 6 } }}>
                <Prose sx={{ maxWidth: 700 }}>
                  As DEFTECHLINK's product direction evolved, I continuously
                  refined the landing page experience to better align with
                  changing business goals and user needs. Across three
                  iterations, the feature section shifted from presenting all
                  capabilities equally to establishing a clearer hierarchy
                  around the platform's core value, helping users better
                  understand the product and discover the workflows most
                  relevant to them.
                </Prose>
              </Reveal>
            </Box>

            <Box>
              {iterations.map((item, i) => (
                <TimelineStep
                  key={item.step || i}
                  item={item}
                  isLast={i === iterations.length - 1}
                  onOpen={setLightbox}
                />
              ))}
            </Box>
          </Box>
        )}

        {/* ── Outcome ──────────────────────────────────────────────── */}
        {cs.outcome && (
          <Box sx={{ maxWidth: 780, mt: { xs: 8, md: 11 } }}>
            <SectionHeader number={nextNo()} title="Outcome" />
            <Reveal delay={120}>
              <Prose>{cs.outcome}</Prose>
            </Reveal>
          </Box>
        )}

        {/* Bottom back link */}
        <Reveal
          threshold={0.3}
          sx={{
            mt: { xs: 8, md: 12 },
            pt: { xs: 4, md: 5 },
            borderTop: `1px solid ${HAIRLINE}`,
          }}
        >
          <Box
            component={Link}
            to="/#projects"
            onClick={backToProjects}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.75,
              textDecoration: "none",
              color: ACCENT,
              fontFamily: FONT,
              fontWeight: 700,
              fontSize: "0.85rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              transition: "gap 0.2s ease",
              "&:hover": { gap: "12px" },
            }}
          >
            <ArrowBackIcon sx={{ fontSize: 18 }} />
            Back to all work
          </Box>
        </Reveal>
      </Box>

      <Footer />

      {/* Lightbox */}
      <Dialog
        open={Boolean(lightbox)}
        onClose={() => setLightbox(null)}
        maxWidth={false}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: "transparent",
              boxShadow: "none",
              maxWidth: "95vw",
              maxHeight: "95vh",
            },
          },
          backdrop: { sx: { backgroundColor: "rgba(0, 0, 0, 0.92)" } },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={() => setLightbox(null)}
            aria-label="Close"
            sx={{ alignSelf: "flex-end", mb: 1, color: "#fff" }}
          >
            <CloseIcon />
          </IconButton>
          <Box
            component="img"
            src={lightbox}
            alt="Expanded design"
            sx={{
              maxWidth: "92vw",
              maxHeight: "82vh",
              objectFit: "contain",
              borderRadius: 1,
            }}
          />
        </Box>
      </Dialog>
    </Box>
  );
}

export default CaseStudy;
