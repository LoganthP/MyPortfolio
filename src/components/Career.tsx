import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Intern (Radar Signal Processing)</h4>
                <h5>LRDE – DRDO, Bengaluru</h5>
              </div>
              <h3>July 2025</h3>
            </div>
            <p>
              Worked on radar signal processing and exposure to defense-grade data
              processing algorithms. Analyzed radar systems and signal processing
              pipelines for national defense research.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>BE in Computer Science</h4>
                <h5>Vidyavardhaka College of Engineering, Mysuru</h5>
              </div>
              <h3>2023-27</h3>
            </div>
            <p>
              Specializing in Cybersecurity, AI systems, and Software Engineering.
              I am practicing and improving my skills in programming languages and
              dedicatedly mastering Data Structures and Algorithms (DSA).
              Maintaining a CGPA of 7.81 while being an active member of GDSC
              and IEEE clubs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
