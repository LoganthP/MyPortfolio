import { motion } from "framer-motion";
import { IconType } from "react-icons";

interface TechCardProps {
  icon: IconType;
  label: string;
  index: number;
}

const TechCard = ({ icon: Icon, label, index }: TechCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true }}
      whileHover={{ 
        scale: 1.08,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
      }}
      className="group relative flex flex-col items-center justify-center p-6 rounded-[14px] bg-white/5 border border-white/10 glassmorphism transition-all duration-300 hover:shadow-[0_0_20px_rgba(94,234,212,0.3)] cursor-pointer"
    >
      <div className="text-4xl mb-3 text-[#E6E6E6] group-hover:text-accent transition-colors duration-300">
        <Icon size={48} />
      </div>
      <span className="text-sm font-medium text-[#B0B0B0] group-hover:text-white transition-colors duration-300 uppercase tracking-wider">
        {label}
      </span>
      
      {/* Glow highlight on hover */}
      <div className="absolute inset-0 rounded-[14px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-accent/10 to-transparent pointer-events-none" />
    </motion.div>
  );
};

export default TechCard;
