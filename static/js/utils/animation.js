export const animate = {
    fadeIn(element, duration = 300, delay = 0) {
        if (!element) return;
        
        element.style.opacity = '0';
        element.style.transition = `opacity ${duration}ms ease`;
        element.style.transform = 'translateY(20px)';
        element.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;

        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, delay);
    },

    fadeOut(element, duration = 300) {
        if (!element) return;

        element.style.opacity = '1';
        element.style.transition = `opacity ${duration}ms ease`;
        element.style.opacity = '0';
    },

    slideIn(element, duration = 300, delay = 0) {
        if (!element) return;

        element.style.transform = 'translateX(-20px)';
        element.style.opacity = '0';
        element.style.transition = `transform ${duration}ms ease, opacity ${duration}ms ease`;

        setTimeout(() => {
            element.style.transform = 'translateX(0)';
            element.style.opacity = '1';
        }, delay);
    },

    staggerChildren(parent, childSelector, duration = 300, staggerDelay = 100) {
        if (!parent) return;
        
        const children = parent.querySelectorAll(childSelector);
        if (!children.length) return;

        children.forEach((child, index) => {
            this.fadeIn(child, duration, index * staggerDelay);
        });
    }
};