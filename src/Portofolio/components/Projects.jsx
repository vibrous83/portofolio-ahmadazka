import { Component } from "react";
import { FaGithub, FaTimes, FaImage } from "react-icons/fa";
import Reveal from "./Reveal";

class Projects extends Component {
    constructor(props) {
        super(props);
        this.state = { selected: null };
        this.handleKey = this.handleKey.bind(this);
    }

    componentDidMount() {
        window.addEventListener("keydown", this.handleKey);
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this.handleKey);
        document.body.style.overflow = "";
    }

    handleKey(e) {
        if (e.key === "Escape") this.close();
    }

    open(project) {
        this.setState({ selected: project });
        document.body.style.overflow = "hidden";
    }

    close() {
        this.setState({ selected: null });
        document.body.style.overflow = "";
    }

    renderImage(project, className) {
        return (
            <div className={className}>
                {project.image ? (
                    <img src={project.image} alt={project.title} />
                ) : (
                    <FaImage />
                )}
            </div>
        );
    }

    render() {
        if (!this.props.data) return null;

        const projects = this.props.data;
        const { selected } = this.state;

        return (
            <section id="projects">
                <div className="proj-container">
                    <Reveal><h2 className="section-title">Projects</h2></Reveal>

                    <div className="proj-grid">
                        {projects.map((project, i) => (
                            <Reveal key={project.title} delay={(i % 2) * 120}>
                                <article className="proj-card">
                                    {this.renderImage(project, "proj-image")}

                                <div className="proj-body">
                                    <h3 className="proj-title">{project.title}</h3>
                                    <p className="proj-desc">{project.description}</p>

                                    <div className="chip-list proj-tech">
                                        {project.tech.map((t) => (
                                            <span className="chip" key={t}>{t}</span>
                                        ))}
                                    </div>

                                    <div className="proj-actions">
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => this.open(project)}
                                        >
                                            View Details
                                        </button>
                                        <a
                                            className="btn btn-outline"
                                            href={project.github}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <FaGithub /> GitHub
                                        </a>
                                    </div>
                                </div>
                                </article>
                            </Reveal>
                        ))}
                    </div>
                </div>

                {selected && (
                    <div className="modal-overlay" onClick={() => this.close()}>
                        <div
                            className="modal"
                            role="dialog"
                            aria-modal="true"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="modal-close"
                                aria-label="Close"
                                onClick={() => this.close()}
                            >
                                <FaTimes />
                            </button>

                            {this.renderImage(selected, "modal-image")}

                            <div className="modal-body">
                                <h3 className="modal-title">{selected.title}</h3>

                                <div className="chip-list">
                                    {selected.tech.map((t) => (
                                        <span className="chip" key={t}>{t}</span>
                                    ))}
                                </div>

                                <p className="modal-desc">{selected.description}</p>

                                {selected.insights && selected.insights.length > 0 && (
                                    <>
                                        <h4 className="modal-label">Insight</h4>
                                        <ul className="modal-list">
                                            {selected.insights.map((item) => (
                                                <li key={item}>{item}</li>
                                            ))}
                                        </ul>
                                    </>
                                )}

                                {selected.outcome && (
                                    <>
                                        <h4 className="modal-label">Outcome</h4>
                                        <p className="modal-outcome">{selected.outcome}</p>
                                    </>
                                )}

                                <a
                                    className="btn btn-primary modal-github"
                                    href={selected.github}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <FaGithub /> View on GitHub
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        );
    }
}

export default Projects;