import { Component } from "react";
import Reveal from "./Reveal";

//logo
import {FaPhp, FaReact, FaNodeJs, FaLaravel, FaPython, FaJava, FaJs, FaBootstrap, FaHtml5, FaCss3Alt} from "react-icons/fa";
import {SiTailwindcss, SiMysql, SiFlutter} from "react-icons/si";
import { TbApi } from "react-icons/tb";
import logoUnsri from "../assets/unsri.png";

const skillIcons = {
    "PHP": { icon: <FaPhp />, color: "#777BB4" },
    "React": { icon: <FaReact />, color: "#61DAFB" },
    "Node JS": { icon: <FaNodeJs />, color: "#68A063" },
    "Laravel": { icon: <FaLaravel />, color: "#FF2D20" },
    "Python": { icon: <FaPython />, color: "#4B8BBE" },
    "Java": { icon: <FaJava />, color: "#F89820" },
    "Flutter": {icon: <SiFlutter/>, color: "#2D8DE0" },
    "JavaScript": { icon: <FaJs />, color: "#F7DF1E" },
    "Bootstrap": { icon: <FaBootstrap />, color: "#9B6DFF" },
    "Tailwind": { icon: <SiTailwindcss />, color: "#06B6D4" },
    "MySQL": { icon: <SiMysql />, color: "#5D9CC7" },
    "REST API": { icon: <TbApi />, color: "#10B981" },
    "HTML": { icon: <FaHtml5 />, color: "#E34F26" },
    "CSS": { icon: <FaCss3Alt />, color: "#2D8DE0" },
};

const IconCard = ({ name, map }) => {
    const item = map[name];
    return (
        <div className="tech-item">
            <span className="tech-icon" style={{ color: item?.color }}>
                {item?.icon}
            </span>
            <span>{name}</span>
        </div>
    );
};

class About extends Component {
    render() {
        if (!this.props.data) return null;

        const { introduction, education, technicalSkills, softSkills, tools } =this.props.data;

        return (
            <section id="about">
                <div className="about-container">
                    <Reveal><h2 className="section-title">About Me</h2></Reveal>
                    {/* Introduction */}
                    <Reveal>
                        <div className="about-block">
                        <h3 className="block-title">Introduction</h3>
                        <p className="about-intro">{introduction}</p>
                        </div>
                    </Reveal>

                    {/* Education */}
                    <Reveal>
                    <div className="about-block">
                        <h3 className="block-title">Education</h3>
                        {education.map((edu) => (
                            <div className="edu-card" key={edu.school}>
                                <div className="edu-logo">
                                    <img src={logoUnsri} alt={edu.school}/>
                                </div>

                                <div className="edu-info">
                                    <div className="edu-top">
                                        <h4>{edu.school}</h4>
                                        <span className="edu-period">{edu.period}</span>
                                    </div>
                                    <p className="edu-degree">{edu.degree}</p>
                                    <p className="edu-meta">
                                        GPA: {edu.gpa} &nbsp;•&nbsp; {edu.location}
                                    </p>

                                    <p className="edu-courses-label">Relevant Courses</p>
                                    <div className="chip-list">
                                        {edu.courses.map((course) => (
                                            <span className="chip" key={course}>
                                                {course}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    </Reveal>

                    {/* Skills */}
                    <Reveal>
                    <div className="about-block">
                        <h3 className="block-title">Skills</h3>

                        <p className="skill-label">Technical Skills</p>
                        <div className="tech-grid">
                            {technicalSkills.map((skill) => (
                            <IconCard key={skill} name={skill} map={skillIcons} />
                            ))}
                        </div>

                        <p className="skill-label">Soft Skills</p>
                        <div className="chip-list">
                            {softSkills.map((skill) => (
                                <span className="chip" key={skill}>{skill}</span>
                            ))}
                        </div>

                        <p className="skill-label">Tools</p>
                        <div className="chip-list">
                            {tools.map((skill) => (
                                <span className="chip" key={skill}>{skill}</span>
                            ))}
                        </div>
                    </div>
                    </Reveal>
                    
                </div>
            </section>
        );
    }
}

export default About;