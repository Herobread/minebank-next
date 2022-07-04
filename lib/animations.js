export const fadeAnimations = {
    initial: {
        x: 30,
        opacity: 0
    },
    animate: {
        x: 0,
        opacity: 1
    },
    exit: {
        x: -100,
        opacity: 0
    },
    transition: {
        type: "easeInOut",
    }
}

export const fadeAnimationVertical = {
    initial: {
        y: 30,
        opacity: 0,
    },
    animate: {
        y: 0,
        opacity: 1
    },
    exit: {
        y: -30,
        opacity: 0
    },
    transition: {
        type: "easeInOut",
    }
}