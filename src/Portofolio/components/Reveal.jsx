import { cloneElement, useEffect, useRef, useState } from "react";

export default function Reveal({ children, delay = 0, variant = "up" }) {
    const ref = useRef(null);
    const [shown, setShown] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        if (!("IntersectionObserver" in window)) {
            setShown(true);
            return;
        }

        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShown(true);
                    io.disconnect();
                }
            },
            { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
        );

        io.observe(el);
        return () => io.disconnect();
    }, []);

    return cloneElement(children, {
        ref,
        className: `${children.props.className || ""} reveal reveal-${variant}${
            shown ? " in-view" : ""
        }`.trim(),
        style: { ...children.props.style, "--d": `${delay}ms` },
    });
}