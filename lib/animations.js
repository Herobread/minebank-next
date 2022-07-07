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
        opacity: 0
    },
    transition: {
        type: "easeInOut",
    }
}

export const opacityAnimation = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1
    },
    exit: {
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

export const scrollAnimation = {
    initial: {
        y: -100,
        opacity: 0,
    },
    animate: {
        y: 0,
        opacity: 1
    },
    exit: {
        y: 100,
        opacity: 0
    },
    transition: {
        type: "easeInOut",
    }
}

export const fadeAnimationHeight = {
    initial: {
        x: 10,
        height: 0,
        opacity: 0
    },
    animate: {
        x: 0,
        height: 'auto',
        opacity: 1
    },
    exit: {
        x: 10,
        height: 0,
        opacity: 0
    },
    transition: {
        type: "easeInOut",
    }
}