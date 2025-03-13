document.addEventListener('DOMContentLoaded', () => {
    // Logo animation
    anime({
        targets: '.heart-icon',
        scale: [0, 1],
        opacity: [0, 1],
        rotate: [45, 0],
        duration: 1000,
        easing: 'spring(1, 80, 10, 0)'
    });

    // Navigation links animation
    anime({
        targets: ['.nav-links a', '.nav-links button'],
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 800,
        delay: anime.stagger(100, {start: 300}),
        easing: 'easeOutExpo'
    });

    // Subtitle fade in
    anime({
        targets: '.subtitle',
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeInOutQuad',
        delay: 1000
    });

    // Background shapes animation
    const floatingShapes = document.querySelector('.floating-shapes');
    
    // Clear existing shapes
    floatingShapes.innerHTML = '';
    
    // Add more shapes
    const shapeTypes = ['square', 'circle', 'triangle'];
    const numShapes = 15; // Increased number of shapes
    
    for (let i = 0; i < numShapes; i++) {
        const shape = document.createElement('div');
        shape.className = `shape ${shapeTypes[i % shapeTypes.length]}`;
        shape.style.left = `${anime.random(0, 100)}%`;
        shape.style.top = `${anime.random(0, 100)}%`;
        floatingShapes.appendChild(shape);
    }

    // Animate shapes with subtle movements
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, i) => {
        const randomDelay = anime.random(0, 4000);
        const randomDuration = anime.random(4000, 6000);
        
        anime({
            targets: shape,
            translateX: () => anime.random(-20, 20),
            translateY: () => anime.random(-20, 20),
            rotate: () => anime.random(-15, 15),
            opacity: [0.2, 0.4],
            duration: randomDuration,
            delay: randomDelay,
            loop: true,
            direction: 'alternate',
            easing: 'easeInOutQuad'
        });
    });

    // Interactive Animation Showcase
    const shapesGroup = document.querySelector('.shapes-group');
    const thoughtBubble = document.querySelector('.thought-bubble');
    const typingText = document.querySelector('.typing-text');
    const cursor = document.querySelector('.cursor');

    // Clear previous animations but maintain elements
    const clearAnimations = () => {
        anime.remove(shapesGroup.children);
    };

    const createSVGElement = (type, attributes) => {
        const el = document.createElementNS('http://www.w3.org/2000/svg', type);
        for (const [key, value] of Object.entries(attributes)) {
            el.setAttribute(key, value);
        }
        return el;
    };

    // Updated animation sequences
    const sequences = [
        {
            thought: "Let's start with a simple shape...",
            create: () => {
                clearAnimations();
                while (shapesGroup.firstChild) {
                    shapesGroup.removeChild(shapesGroup.firstChild);
                }
                const circle = createSVGElement('circle', {
                    cx: '400',
                    cy: '200',
                    r: '40',
                    fill: '#4ECDC4',
                    opacity: '0'
                });
                shapesGroup.appendChild(circle);
                return [circle];
            },
            animate: (elements) => {
                anime({
                    targets: elements[0],
                    scale: [0, 1],
                    opacity: [0, 1],
                    duration: 1000,
                    easing: 'easeOutElastic(1, .5)'
                });
            }
        },
        {
            thought: "Now, let's make it dynamic...",
            animate: (elements) => {
                anime({
                    targets: elements[0],
                    scale: 1.5,
                    translateX: 100,
                    duration: 1000,
                    easing: 'easeInOutQuad',
                    complete: () => {
                        anime({
                            targets: elements[0],
                            scale: 1,
                            translateX: 0,
                            duration: 1000,
                            easing: 'easeInOutQuad'
                        });
                    }
                });
            }
        },
        {
            thought: "Let's transform it into something more complex...",
            animate: (elements) => {
                const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D'];
                while (shapesGroup.children.length > 1) {
                    shapesGroup.removeChild(shapesGroup.lastChild);
                }
                elements = [elements[0]];
                
                for (let i = 0; i < 3; i++) {
                    const clone = elements[0].cloneNode();
                    clone.setAttribute('fill', colors[i]);
                    shapesGroup.appendChild(clone);
                    elements.push(clone);
                }

                anime({
                    targets: elements,
                    translateX: (el, i) => i * 80 - 120,
                    translateY: (el, i) => Math.sin(i) * 50,
                    scale: (el, i) => 1 - i * 0.1,
                    opacity: 1,
                    duration: 1000,
                    delay: anime.stagger(100),
                    easing: 'easeOutExpo'
                });
                return elements;
            }
        },
        {
            thought: "Adding some magical effects...",
            animate: (elements) => {
                anime({
                    targets: elements,
                    translateX: (el, i) => {
                        const radius = 100;
                        return radius * Math.cos(i * Math.PI / 2);
                    },
                    translateY: (el, i) => {
                        const radius = 100;
                        return radius * Math.sin(i * Math.PI / 2);
                    },
                    scale: {
                        value: '*=1.2',
                        duration: 1000,
                        easing: 'easeInOutQuad'
                    },
                    rotate: {
                        value: 360,
                        duration: 1500,
                        easing: 'linear'
                    },
                    delay: anime.stagger(150),
                    duration: 1500,
                    easing: 'easeInOutQuad'
                });
            }
        },
        {
            thought: "Let's make it simple again...",
            animate: (elements) => {
                const mainCircle = elements[0];
                mainCircle.setAttribute('fill', '#4ECDC4');
                
                anime.timeline({
                    easing: 'easeInOutQuad',
                    duration: 1000
                })
                .add({
                    targets: elements.slice(1),
                    translateX: () => mainCircle.getAttribute('cx'),
                    translateY: () => mainCircle.getAttribute('cy'),
                    scale: 0,
                    opacity: 0
                })
                .add({
                    targets: mainCircle,
                    translateX: 0,
                    translateY: 0,
                    scale: 1,
                    complete: () => {
                        while (shapesGroup.children.length > 1) {
                            shapesGroup.removeChild(shapesGroup.lastChild);
                        }
                        sequenceIndex = 1; // Skip to second sequence next time
                    }
                });
            }
        }
    ];

    // Improved typing animation
    const typeText = (text, callback) => {
        anime({
            targets: thoughtBubble,
            opacity: [0, 1],
            translateY: [-20, 0],
            duration: 400,
            easing: 'easeOutQuad'
        });
        
        let i = 0;
        typingText.textContent = '';
        
        const type = () => {
            if (i < text.length) {
                typingText.textContent += text.charAt(i);
                i++;
                setTimeout(type, 30);
            } else {
                if (callback) setTimeout(callback, 500);
            }
        };
        
        type();
    };

    // Improved sequence runner
    let currentElements = null;
    let sequenceIndex = 0;

    const runSequence = () => {
        if (sequenceIndex >= sequences.length) {
            sequenceIndex = 0;
        }

        const sequence = sequences[sequenceIndex];
        
        typeText(sequence.thought, () => {
            if (sequence.create) {
                currentElements = sequence.create();
            }
            const result = sequence.animate(currentElements);
            if (result) {
                currentElements = result;
            }
            sequenceIndex++;
            setTimeout(runSequence, 2500);
        });
    };

    // Start the showcase after initial animations
    setTimeout(runSequence, 2500);

    // Prompt box animation
    anime({
        targets: '.prompt-box',
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 800,
        delay: 1200,
        easing: 'easeOutExpo'
    });

    // Tags staggered animation
    anime({
        targets: '.tag',
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 600,
        delay: anime.stagger(100, {start: 1500}),
        easing: 'easeOutExpo'
    });

    // Social proof section animation
    anime({
        targets: '.social-proof',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        delay: 2000,
        easing: 'easeOutExpo'
    });

    // Counter animation
    const counterEl = document.querySelector('.counter');
    const finalValue = parseInt(counterEl.textContent);
    
    anime({
        targets: counterEl,
        innerHTML: [0, finalValue],
        round: 1,
        duration: 2000,
        delay: 2200,
        easing: 'easeInOutExpo',
        update: function(anim) {
            counterEl.innerHTML = Math.round(anim.animations[0].currentValue) + '+';
        }
    });

    // Rating circle pulse animation
    anime({
        targets: '.rating-circle',
        scale: [0.9, 1],
        duration: 1000,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutQuad'
    });

    // Create transform animation
    const transformContainer = document.querySelector('.transform-grid');
    
    // Clear previous content
    transformContainer.innerHTML = '';
    
    // Create multiple elements
    const numberOfElements = 200; // Aumentamos el número de elementos para el efecto de explosión
    const elements = [];
    
    for (let i = 0; i < numberOfElements; i++) {
        const el = document.createElement('div');
        el.className = 'grid-item';
        transformContainer.appendChild(el);
        elements.push(el);
    }

    // Initial state
    anime.set(elements, {
        scale: 0,
        backgroundColor: '#FF4B4B', // Color rojo sólido
        width: '10px',
        height: '10px',
        borderRadius: '0%',
        opacity: 1
    });

    // Create the animation
    anime({
        targets: elements,
        translateX: () => anime.random(-500, 500),
        translateY: () => anime.random(-500, 500),
        scale: [
            {value: 0, duration: 0},
            {value: 1, duration: 1000, easing: 'easeOutExpo'}
        ],
        delay: anime.stagger(10, {from: 'center'}),
        duration: 3000,
        loop: true,
        direction: 'alternate',
        easing: 'easeOutElastic(1, .6)'
    });

    // Update styles for the transform element
    const style = document.createElement('style');
    style.textContent = `
        .transform-grid {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            perspective: 1000px;
            overflow: visible;
        }
        .grid-item {
            position: absolute;
            will-change: transform;
            background: #FF4B4B;
        }
    `;
    document.head.appendChild(style);

    // Testimonials section animation
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    const testimonialObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                anime({
                    targets: entry.target,
                    translateY: [20, 0],
                    opacity: [0, 1],
                    duration: 800,
                    easing: 'easeOutExpo'
                });
                testimonialObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    testimonialCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        testimonialObserver.observe(card);
    });

    // Section dividers animation
    const dividers = document.querySelectorAll('.section-divider');
    
    const dividerObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                anime({
                    targets: entry.target,
                    scaleY: [0, 1],
                    opacity: [0, 1],
                    duration: 1000,
                    easing: 'easeInOutQuart'
                });
                dividerObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    dividers.forEach(divider => {
        divider.style.opacity = '0';
        divider.style.transformOrigin = 'center';
        dividerObserver.observe(divider);
    });
}); 