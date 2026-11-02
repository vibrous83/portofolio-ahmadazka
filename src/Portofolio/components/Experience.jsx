import { Component } from "react";
import { FaBriefcase, FaUsers } from "react-icons/fa";
import Reveal from "./Reveal";

import logo1 from "../assets/bukadigital.jpg";
import logo2 from "../assets/iconnet.png";
import logo3 from "../assets/gdgoc.jpg";
import logo4 from "../assets/afl.jpg";
import logo5 from "../assets/hmif.png";


const logos = { "Bukadigital.id": logo1, "PT Indonesia Comnets Plus Palembang": logo2,
    "Google Developer Groups on Campus Universitas Sriwijaya": logo3, 
    "AIESEC in UNSRI": logo4, "HMIF (Himpunan Mahasiswa Informatika) UNSRI": logo5
};

class Experience extends Component {
    constructor(props) {
        super(props);
        this.state = { tab: "work" };
    }

    render() {
        if (!this.props.data) return null;

        const { work, organization } = this.props.data;
        const { tab } = this.state;
        const items = tab === "work" ? work : organization;
        const Placeholder = tab === "work" ? FaBriefcase : FaUsers;

        return (
            <section id="experience">
                <div className="exp-container">
                    <Reveal><h2 className="section-title">Experiences</h2></Reveal>

                    <Reveal>
                    <div className="exp-tabs">
                        <button
                            className={`exp-tab ${tab === "work" ? "active" : ""}`}
                            onClick={() => this.setState({ tab: "work" })}
                        >
                            Work Experience
                        </button>
                        <button
                            className={`exp-tab ${tab === "organization" ? "active" : ""}`}
                            onClick={() => this.setState({ tab: "organization" })}
                        >
                            Organizational Experience
                        </button>
                    </div>
                    </Reveal>

                    <div className="exp-timeline" key={tab}>
                        {items.map((item) => {
                            const logo = logos[item.company];
                            return (
                                <div className="exp-card" key={item.company + item.period}>
                                    <div className="exp-logo">
                                        {logo ? (
                                            <img src={logo} alt={item.company} />
                                        ) : (
                                            <Placeholder />
                                        )}
                                    </div>

                                    <div className="exp-info">
                                        <div className="exp-top">
                                            <h3>{item.company}</h3>
                                            <span className="exp-period">{item.period}</span>
                                        </div>
                                        <div className="exp-sub">
                                            <span className="exp-role">{item.role}</span>
                                            <span className="exp-location">{item.location}</span>
                                        </div>
                                        <ul className="exp-points">
                                            {item.points.map((point) => (
                                                <li key={point}>{point}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        );
    }
}

export default Experience;