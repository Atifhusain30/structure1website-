export const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6 }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 }
  }
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

export const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

export const wordReveal = {
  hidden: { opacity: 0, y: 50, rotateX: -40 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

export const cardHover = {
  rest: { scale: 1 },
  hover: { scale: 1.02, transition: { duration: 0.3 } }
};

export const imageHover = {
  rest: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.6 } }
};

export const overlayReveal = {
  rest: { opacity: 0 },
  hover: { opacity: 1, transition: { duration: 0.3 } }
};

export const textSlideUp = {
  rest: { opacity: 0, y: 20 },
  hover: { opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.1 } }
};


