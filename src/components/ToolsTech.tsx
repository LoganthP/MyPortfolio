import { motion } from "framer-motion";
import TechCard from "./TechCard";
import { 
  FaPython, FaJava, FaReact, FaHtml5, FaCss3Alt, FaNodeJs, FaDocker, FaAws, FaAndroid
} from "react-icons/fa";
import { 
  SiC, SiCplusplus, SiTypescript, SiMysql, SiMongodb, SiKubernetes, SiGooglecloud, SiOctave
} from "react-icons/si";
import { IoLogoJavascript } from "react-icons/io5";

const tools = [
  // Programming
  { icon: SiC, label: "C" },
  { icon: SiCplusplus, label: "C++" },
  { icon: FaPython, label: "Python" },
  { icon: FaJava, label: "Java" },
  { icon: SiOctave, label: "MATLAB" },
  
  // Web Technologies
  { icon: FaHtml5, label: "HTML5" },
  { icon: FaCss3Alt, label: "CSS3" },
  { icon: IoLogoJavascript, label: "JavaScript" },
  { icon: SiTypescript, label: "TypeScript" },
  { icon: FaReact, label: "React" },
  
  // Backend & Runtime
  { icon: FaNodeJs, label: "Node.js" },
  
  // Databases
  { icon: SiMysql, label: "MySQL" },
  { icon: SiMongodb, label: "MongoDB" },
  
  // Cloud / DevOps
  { icon: FaDocker, label: "Docker" },
  { icon: SiKubernetes, label: "Kubernetes" },
  { icon: FaAws, label: "AWS" },
  { icon: SiGooglecloud, label: "Google Cloud" },
  // Tools / Frameworks / Platforms
  { icon: FaAndroid, label: "Android" },
];

const ToolsTech = () => {
  return (
    <section className="relative w-[var(--cWidth)] max-w-[var(--cMaxWidth)] mx-auto py-20 overflow-hidden tech-stack-section">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="flex flex-col items-start mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter">
          Tools <span className="text-accent">&</span> <br /> Technologies
        </h2>
        <div className="w-20 h-1 bg-accent rounded-full" />
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {tools.map((tool, index) => (
          <TechCard
            key={index}
            index={index}
            icon={tool.icon}
            label={tool.label}
          />
        ))}
      </div>
    </section>
  );
};

export default ToolsTech;
