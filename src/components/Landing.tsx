import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              <div className="landing-name">LOGANTH</div>
              <span>&nbsp;</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>I am a</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Full-Stack Developer</div>
              <div className="landing-h2-2">Cybersecurity Enthusiast</div>
            </h2>
            <h2 className="landing-info-h2 second-tagline">
              <div className="landing-h2-info">AI Enthusiast</div>
              <div className="landing-h2-info-1">Network Technician</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
