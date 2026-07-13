import { Box, Typography, Fade } from "@mui/material";
import { useInView } from "react-intersection-observer";
import SchoolIcon from "@mui/icons-material/School";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import aboutImage1 from "../../assets/about/about-1.webp";
import aboutImage2 from "../../assets/about/about-2.webp";
import { usePageReady } from "../../context/PageReadyContext";

const timelineData = [
  {
    type: "work",
    title: "Lead Full Stack Developer & UI/UX Designer",
    organization: "DefTechLink",
    startDate: "May 2025",
    endDate: "July 2026",
    description:
      "Leading full stack development and UI/UX design using React and Material UI. Building scalable component systems, integrating Flask APIs, and implementing dynamic, data-driven features. Collaborating in Agile sprints to deliver user-focused solutions.",
  },
  {
    type: "work",
    title: "Software & Data Engineer Intern",
    organization: "SMX",
    startDate: "June 2024",
    endDate: "Aug 2024",
    description:
      "Built NLP sentiment analysis pipelines using spaCy and Hugging Face models in AWS. Presented data-driven insights to senior executives including the CEO.",
  },
  {
    type: "education",
    title: "B.S. in Computer Science",
    organization: "University of South Florida",
    startDate: "Aug 2021",
    endDate: "May 2025",
    description:
      "Focused on software engineering, data structures, database design, and UI/UX design.",
  },
];

function TimelineItem({ item, isLast, index }) {
  const pageReady = usePageReady();
  const isWork = item.type === "work";
  const Icon = isWork ? WorkOutlineIcon : SchoolIcon;
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <Fade
      in={pageReady && inView}
      timeout={600}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <Box
        ref={ref}
        sx={{
          display: "flex",
          gap: { xs: 2, sm: 3 },
        }}
      >
        {/* Timeline line and dot */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minWidth: { xs: 32, sm: 40 },
          }}
        >
          {/* Icon circle */}
          <Box
            sx={{
              width: { xs: 32, sm: 40 },
              height: { xs: 32, sm: 40 },
              borderRadius: "50%",
              backgroundColor: "var(--color-text)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Icon
              sx={{
                fontSize: { xs: 16, sm: 20 },
                color: "var(--color-background)",
              }}
            />
          </Box>
          {/* Connecting line */}
          {!isLast && (
            <Box
              sx={{
                width: "2px",
                flex: 1,
                backgroundColor: "var(--color-text)",
                opacity: 0.3,
                mt: 1,
              }}
            />
          )}
        </Box>

        {/* Content */}
        <Box
          sx={{
            flex: 1,
            pb: isLast ? 0 : { xs: 4, sm: 5 },
          }}
        >
          {/* Date */}
          <Typography
            sx={{
              fontFamily: "var(--font-family-primary)",
              fontWeight: 600,
              fontSize: { xs: "0.75rem", sm: "0.8rem" },
              color: "#73513F",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              mb: 0.5,
            }}
          >
            {item.startDate} — {item.endDate}
          </Typography>

          {/* Title */}
          <Typography
            sx={{
              fontFamily: "var(--font-family-primary)",
              fontWeight: 700,
              fontSize: { xs: "1rem", sm: "1.1rem", md: "1.15rem" },
              color: "var(--color-text)",
              mb: 0.25,
            }}
          >
            {item.title}
          </Typography>

          {/* Organization */}
          <Typography
            sx={{
              fontFamily: "var(--font-family-primary)",
              fontWeight: 500,
              fontSize: { xs: "0.9rem", sm: "0.95rem" },
              color: "var(--color-text)",
              opacity: 0.8,
              mb: 1,
            }}
          >
            {item.organization}
          </Typography>

          {/* Description */}
          <Typography
            sx={{
              fontFamily: "var(--font-family-primary)",
              fontWeight: 400,
              fontSize: { xs: "0.85rem", sm: "0.9rem" },
              lineHeight: 1.6,
              color: "var(--color-text)",
              opacity: 0.75,
            }}
          >
            {item.description}
          </Typography>
        </Box>
      </Box>
    </Fade>
  );
}

function About() {
  const pageReady = usePageReady();
  const { ref: titleRef, inView: titleInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const { ref: row1Ref, inView: row1InView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const { ref: row2Ref, inView: row2InView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const { ref: timelineTitleRef, inView: timelineTitleInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

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
            mb: { xs: 6, sm: 7, md: 8 },
          }}
        >
          ABOUT ME.
        </Typography>
      </Fade>

      {/* First Row - Image left, Text right */}
      <Fade in={pageReady && row1InView} timeout={600}>
        <Box
          ref={row1Ref}
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
              width="724"
              height="358"
              loading="lazy"
              decoding="async"
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
                fontSize: {
                  xs: "0.95rem",
                  sm: "1rem",
                  md: "0.95rem",
                  lg: "1.1rem",
                },
                lineHeight: 1.8,
                color: "var(--color-text)",
              }}
            >
              Hi, I'm Kelly Ton. I'm a software engineer with a background in
              full-stack development and UI/UX design. I graduated from the
              University of South Florida with a Bachelor of Science in Computer
              Science in May 2025. I enjoy taking ideas from concept to reality,
              designing intuitive interfaces, building scalable features, and
              creating seamless experiences across the frontend and backend. My
              experience includes developing with React, Flask, PostgreSQL, and
              Figma, where I combine technical problem-solving with thoughtful
              design to build products that are both functional and enjoyable to
              use.
            </Typography>
          </Box>
        </Box>
      </Fade>

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
      <Fade in={pageReady && row2InView} timeout={600}>
        <Box
          ref={row2Ref}
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
                fontSize: {
                  xs: "0.95rem",
                  sm: "1rem",
                  md: "0.95rem",
                  lg: "1.1rem",
                },
                lineHeight: 1.8,
                color: "var(--color-text)",
              }}
            >
              I'm passionate about creating software that feels polished,
              intuitive, and impactful. I thrive in collaborative environments,
              enjoy brainstorming solutions with teammates, and am always
              looking for opportunities to learn, grow, and contribute to
              meaningful products. Outside of coding, you'll usually find me
              traveling, trying new foods, hiking, opening Pokémon packs, or
              playing music on my kalimba.
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
              width="1050"
              height="358"
              loading="lazy"
              decoding="async"
              sx={{
                width: "100%",
                height: { xs: "280px", sm: "320px", md: "200px", lg: "240px" },
                objectFit: "cover",
              }}
            />
          </Box>
        </Box>
      </Fade>

      {/* Timeline Section */}
      <Box
        sx={{
          mt: { xs: 8, sm: 10, md: 12 },
        }}
      >
        <Fade in={pageReady && timelineTitleInView} timeout={600}>
          <Typography
            ref={timelineTitleRef}
            variant="h3"
            sx={{
              fontFamily: "var(--font-family-primary)",
              fontWeight: 700,
              fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
              color: "var(--color-text)",
              mb: { xs: 4, sm: 5, md: 6 },
            }}
          >
            Experience & Education
          </Typography>
        </Fade>

        <Box>
          {timelineData.map((item, index) => (
            <TimelineItem
              key={`${item.type}-${item.organization}`}
              item={item}
              index={index}
              isLast={index === timelineData.length - 1}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default About;
