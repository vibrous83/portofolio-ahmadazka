import { Component } from "react";
import emailjs from "@emailjs/browser";
import {FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaGithub, FaPaperPlane} from "react-icons/fa";
import Reveal from "./Reveal";

class Contacts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            message: "",
            status: "idle", // idle | sending | success | error
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value, status: "idle" });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { name, email, message } = this.state;
        this.setState({ status: "sending" });

        emailjs
            .send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                { from_name: name, from_email: email, message },
                { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
            )
            .then(() => {
                this.setState({ name: "", email: "", message: "", status: "success" });
            })
            .catch((err) => {
                console.error("EmailJS error:", err);
                this.setState({ status: "error" });
            });
    }

    render() {
        if (!this.props.data) return null;

        const { heading, text, email, location, linkedin, github } = this.props.data;
        const { name, email: senderEmail, message, status } = this.state;

        const items = [
            {
                icon: <FaEnvelope />,
                label: "Email",
                value: email,
                href: `mailto:${email}`,
            },
            {
                icon: <FaMapMarkerAlt />,
                label: "Location",
                value: location,
            },
            {
                icon: <FaLinkedin />,
                label: "LinkedIn",
                value: linkedin.replace(/^https?:\/\/(www\.)?/, ""),
                href: linkedin,
            },
            {
                icon: <FaGithub />,
                label: "GitHub",
                value: github.replace(/^https?:\/\/(www\.)?/, ""),
                href: github,
            },
        ];

        return (
            <section id="contacts">
                <div className="contact-container">
                    <Reveal><h2 className="section-title">{heading}</h2></Reveal>

                    <div className="contact-grid">
                        <Reveal variant="left">
                        <div className="contact-info">
                            <p className="contact-text">{text}</p>

                            <ul className="contact-list">
                                {items.map((item) => (
                                    <li className="contact-item" key={item.label}>
                                        <span className="contact-icon">{item.icon}</span>
                                        <div>
                                            <span className="contact-label">{item.label}</span>
                                            {item.href ? (
                                                <a
                                                    href={item.href}
                                                    target={item.href.startsWith("mailto") ? undefined : "_blank"}
                                                    rel="noreferrer"
                                                >
                                                    {item.value}
                                                </a>
                                            ) : (
                                                <span className="contact-value">{item.value}</span>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        </Reveal>

                        <Reveal variant="right" delay={150}>
                            <form className="contact-form" onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Your name"
                                    value={name}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="your@email.com"
                                    value={senderEmail}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="6"
                                    placeholder="Write your message here..."
                                    value={message}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary form-submit"
                                disabled={status === "sending"}
                            >
                                <FaPaperPlane />
                                {status === "sending" ? "Sending..." : "Send Message"}
                            </button>

                            {status === "success" && (
                                <p className="form-status success">
                                    Message sent successfully. Thank you!
                                </p>
                            )}
                            {status === "error" && (
                                <p className="form-status error">
                                    Failed to send the message. Please try again or email me directly.
                                </p>
                            )}
                        </form>
                        </Reveal>
                        
                    </div>
                </div>
            </section>
        );
    }
}

export default Contacts;