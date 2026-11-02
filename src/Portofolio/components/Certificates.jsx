import { Component } from "react";
import {FaCertificate, FaExternalLinkAlt, FaChevronDown, FaChevronUp} from "react-icons/fa";
import Reveal from "./Reveal";

const STEP = 4;

class Certificates extends Component {
    constructor(props) {
        super(props);
        this.state = { visible: STEP };
    }

    showMore() {
        this.setState((s) => ({ visible: s.visible + STEP }));
    }

    showLess() {
        this.setState({ visible: STEP });
        const section = document.getElementById("certificates");
        if (section) section.scrollIntoView({ behavior: "smooth" });
    }

    render() {
        if (!this.props.data) return null;

        const certs = this.props.data;
        const { visible } = this.state;
        const shown = certs.slice(0, visible);
        const hasMore = visible < certs.length;
        const canCollapse = !hasMore && certs.length > STEP;

        return (
            <section id="certificates">
                <div className="proj-container">
                    <Reveal><h2 className="section-title">Certificates</h2></Reveal>

                    <div className="proj-grid">
                        {shown.map((cert, i) => (
                            <Reveal key={cert.title + cert.date} delay={(i % 2) * 120}>
                                <article className="proj-card cert-card">
                                    <div className="proj-image">
                                    {cert.image ? (
                                        <img src={cert.image} alt={cert.title} />
                                    ) : (
                                        <FaCertificate />
                                    )}
                                </div>

                                <div className="proj-body">
                                    <span className="cert-issuer">{cert.issuer}</span>
                                    <h3 className="proj-title">{cert.title}</h3>
                                    <span className="cert-date">{cert.date}</span>

                                    <div className="proj-actions">
                                        {cert.link ? (
                                            <a
                                                className="btn btn-primary"
                                                href={cert.link}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                <FaExternalLinkAlt /> View Certificate
                                            </a>
                                        ) : (
                                            <span className="btn btn-primary btn-disabled">
                                                <FaExternalLinkAlt /> View Certificate
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </article>
                            </Reveal>
                        ))}
                    </div>

                    {(hasMore || canCollapse) && (
                        <div className="cert-more">
                            {hasMore ? (
                                <button
                                    className="btn btn-outline cert-more-btn"
                                    onClick={() => this.showMore()}
                                >
                                    Load More <FaChevronDown />
                                </button>
                            ) : (
                                <button
                                    className="btn btn-outline cert-more-btn"
                                    onClick={() => this.showLess()}
                                >
                                    Show Less <FaChevronUp />
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </section>
        );
    }
}

export default Certificates;