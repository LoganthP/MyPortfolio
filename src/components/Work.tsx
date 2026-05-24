import { useState, useCallback } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const projects = [
  {
    title: "Terralens",
    category: "AI Geospatial Platform",
    tools: "Python • Deep Learning • Satellite Imaging • GIS Data Processing",
    image: "/images/terralens.png",
    description: [
      "Built an AI-powered platform for terrain mapping and land-use monitoring",
      "Analyzes satellite imagery for industrial and environmental insights",
      "Designed for scalable geospatial intelligence applications",
    ],
  },
  {
    title: "EarVan",
    category: "Assistive Technology",
    tools: "AI Audio Processing • Mobile Accessibility • Real-time Notifications",
    image: "/images/earvan.png",
    description: [
      "Developed a real-time audio awareness system for hearing-impaired users",
      "Detects environmental sounds and provides instant alerts via mobile devices",
      "Published a research paper based on this system",
    ],
  },
  {
    title: "NetAlert-AI",
    category: "Network Intelligence Platform",
    tools: "Network Packet Monitoring • AI Anomaly Detection • Security Alerts",
    image: "/images/netalert.png",
    description: [
      "Built an AI-driven SOC dashboard for real-time network monitoring",
      "Detects anomalies and visualizes threats in network traffic",
      "Designed for cybersecurity analysis and incident response",
    ],
  },
  {
    title: "AI CyberLog Analyzer",
    category: "AI Log Intelligence System",
    tools: "Python • Log Analysis • Machine Learning • Anomaly Detection",
    image: "/images/cyberlog_analyzer.png",
    description: [
      "Developed an AI-based system for analyzing system and security logs",
      "Detects anomalies and suspicious patterns in large-scale log data",
      "Designed to improve automated threat detection and system monitoring",
    ],
  },
  {
    title: "CipherSentinel",
    category: "Secret Key Detection Tool",
    tools: "Python • Security Scanning • Regex Detection • Static Analysis",
    image: "/images/ciphersentinel.png",
    description: [
      "Built a tool to detect exposed API keys and sensitive credentials in codebases",
      "Helps prevent accidental leaks of secrets in repositories",
      "Designed for improving secure coding practices and DevSecOps workflows",
    ],
  },
  {
    title: "NexusAI",
    category: "AI Integration Platform",
    tools: "AI Systems • API Integration • Automation • Backend Development",
    image: "/images/nexusai.png",
    description: [
      "Developed a platform integrating AI capabilities into applications",
      "Focused on automation, intelligent workflows, and scalable architecture",
      "Designed to bridge AI models with real-world applications",
    ],
  },
  {
    title: "CyberScanX",
    category: "Network Scanning Tool",
    tools: "Python • Networking • Port Scanning • Security Analysis",
    image: "/images/cyberscanx.png",
    description: [
      "Built a network scanning tool to identify open ports and vulnerabilities",
      "Helps in security auditing and penetration testing",
      "Designed for basic reconnaissance in cybersecurity workflows",
    ],
  },
  {
    title: "Additional Projects Coming Soon....",
    category: "Open Source & Experimental Work",
    tools: "",
    image: "/images/github_projects.png",
    description: [
      "Built multiple projects across AI, Web Development, and Cloud technologies",
      "Worked with APIs, backend systems, and scalable architectures",
    ],
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        <div className="carousel-wrapper">
          {/* Navigation Arrows */}
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          {/* Slides */}
          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {projects.map((project, index) => (
                <div className="carousel-slide" key={index}>
                  <div className="carousel-content">
                    <div className="carousel-info">
                      <div className="carousel-number">
                        <h3>0{index + 1}</h3>
                      </div>
                      <div className="carousel-details">
                        <h4>{project.title}</h4>
                        <p className="carousel-category">{project.category}</p>
                        {project.tools && (
                          <div className="carousel-tools">
                            <span className="tools-label">
                              Tools & Features
                            </span>
                            <p>{project.tools}</p>
                          </div>
                        )}
                        <ul className="carousel-description">
                          {project.description.map((bullet, idx) => (
                            <li key={idx}>{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="carousel-image-wrapper">
                      <WorkImage image={project.image} alt={project.title} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="carousel-dots">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentIndex ? "carousel-dot-active" : ""
                  }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
