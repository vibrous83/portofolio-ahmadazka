import { Component } from "react";
import ParticlesBg from "./ParticlesBg";
import "../../index.css";
import FotoFormal from "../assets/FotoFormal.jpg";

const SECTIONS = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experiences" },
    { id: "projects", label: "Projects" },
    { id: "certificates", label: "Certificates" },
    { id: "contacts", label: "Contacts" },
];

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { active: "home" };
        this.observer = null;
    }

    componentDidMount() {
        if (this.props.data) this.startSpy();
    }

    // data datang setelah fetch, saat semua section sudah ada di halaman
    componentDidUpdate(prevProps) {
        if (!prevProps.data && this.props.data) this.startSpy();
    }

    componentWillUnmount() {
        if (this.observer) this.observer.disconnect();
    }

    startSpy() {
        if (this.observer || !("IntersectionObserver" in window)) return;

        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        this.setState({ active: entry.target.id });
                    }
                });
            },
            { rootMargin: "-45% 0px -50% 0px" }
        );

        SECTIONS.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) this.observer.observe(el);
        });
    }

    render() {
        if (!this.props.data) return null;

        const { name, summary } = this.props.data;
        const { active } = this.state;

        return (
            <header id="home">
                <ParticlesBg />

                <nav className="nav-wrap">
                    <ul>
                        {SECTIONS.map(({ id, label }) => (
                            <li key={id}>
                                <a
                                    href={`#${id}`}
                                    className={active === id ? "active" : ""}
                                >
                                    {label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="header-content">
                    <div className="profile">
                        <div className="information">
                            <span className="greeting">Hi, I'm</span>
                            <h1>{name}</h1>
                            <p>{summary}</p>
                            <div className="cta">
                                <a className="btn btn-primary" href="/CV Ahmad Azka Al Husaini_IT.pdf" download>
                                    Download CV
                                </a>
                            </div>
                        </div>
                        <div className="photo">
                            <img src={FotoFormal} alt={name} />
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;