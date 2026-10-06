gsap.registerPlugin(ScrollTrigger, SplitText);
gsap.defaults({ lazy: false });

const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

const split = SplitText.create(".sentence", { type: "words" });

gsap.from(split.words, {
    opacity: 0,
    duration: 0.6,
    stagger: 0.06,
});

gsap.from(split.words, {
    color: "transparent",
    textShadow: (index) => `0 0 8px hsl(${180 + index * 15}, 100%, 60%)`,
    duration: 1.4,
    ease: "power2.in",
    stagger: 0.06,
});

gsap.from(".cell", {
    opacity: 0,
    duration: 0.6,
    stagger: 0.15,
});

const slots = document.querySelectorAll(".slot");
const cells = document.querySelectorAll(".cell");

const flight = gsap.timeline({
    scrollTrigger: {
        trigger: ".editor",
        start: "top bottom",
        end: "bottom bottom",
        scrub: 1,
        invalidateOnRefresh: true,
    },
});

cells.forEach((cell, index) => {
    const slot = slots[index];
    const media = cell.firstElementChild;
    const tilt = index % 2 === 0 ? 12 : -12;

    flight.from(
        media,
        {
            x: () =>
                slot.getBoundingClientRect().left -
                cell.getBoundingClientRect().left,
            y: () =>
                slot.getBoundingClientRect().top -
                cell.getBoundingClientRect().top,
            scale: () => slot.offsetWidth / cell.offsetWidth,
            duration: 1,
            ease: "power2.inOut",
        },
        index * 0.1,
    );

    flight.to(
        media,
        {
            rotation: tilt,
            duration: 0.5,
            yoyo: true,
            repeat: 1,
            ease: "sine.inOut",
        },
        index * 0.1,
    );
});
