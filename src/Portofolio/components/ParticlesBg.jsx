import { useMemo } from "react";
import Particles from "@tsparticles/react";

const ParticlesBg = () => {
    const options = useMemo(
        () => ({
            fullScreen: { enable: false },
            background: { color: { value: "#0d1117" } },            
            fpsLimit: 60,
            interactivity: {
                events: {
                    onHover: { enable: true, mode: "grab" },
                    onClick: { enable: true, mode: "push" },
                },
                modes: {
                    grab: { distance: 140, links: { opacity: 0.6 } },
                    push: { quantity: 3 },
                },
            },
            particles: {
                color: { value: "#ffffff" },
                links: {
                    color: "rgb(253, 254, 252)",
                    distance: 150,
                    enable: true,
                    opacity: 0.3,
                    width: 1,
                },
                move: {
                    enable: true,
                    speed: 1.2,
                    outModes: { default: "out" },
                },
                number: { density: { enable: true }, value: 80 },
                opacity: { value: 0.5 },
                shape: { type: "circle" },
                size: { value: { min: 1, max: 3 } },
            },
            detectRetina: true,
        }),
        []
    );

    return <Particles id="tsparticles" options={options} />;
};

export default ParticlesBg;