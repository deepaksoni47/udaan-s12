/* ===================================
   UDAAN SEASON 12 - JAVASCRIPT
   Interactive Features & Animations
   =================================== */

// ===================================
// INITIALIZATION
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    initParticles();
    initAOS();
    initTyped();
    initTilt();
    initFormLogic();
    initSoundToggle();
    initProgressTracking();
});

// ===================================
// PARTICLES.JS CONFIGURATION
// ===================================
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ['#c68642', '#4a7c2c', '#8f9779']
                },
                shape: {
                    type: ['circle', 'triangle'],
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#c68642',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: true,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
}

// ===================================
// AOS (ANIMATE ON SCROLL) INITIALIZATION
// ===================================
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100,
            delay: 100
        });
    }
}

// ===================================
// TYPED.JS - ANIMATED TITLE
// ===================================
function initTyped() {
    if (typeof Typed !== 'undefined') {
        new Typed('.typed-text', {
            strings: ['UDAAN', 'उड़ान', 'UDAAN'],
            typeSpeed: 100,
            backSpeed: 80,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|',
            autoInsertCss: true
        });
    }
}

// ===================================
// VANILLA TILT - CARD EFFECTS
// ===================================
function initTilt() {
    if (typeof VanillaTilt !== 'undefined') {
        // Tilt effect on theme cards
        VanillaTilt.init(document.querySelectorAll('.theme-card'), {
            max: 10,
            speed: 400,
            glare: true,
            'max-glare': 0.3,
            perspective: 1000
        });

        // Tilt effect on board cards
        VanillaTilt.init(document.querySelectorAll('.board-card'), {
            max: 8,
            speed: 300,
            glare: true,
            'max-glare': 0.2,
            perspective: 800
        });
    }
}

// ===================================
// SOUND TOGGLE FUNCTIONALITY
// ===================================
function initSoundToggle() {
    const soundToggle = document.getElementById('soundToggle');
    let isMuted = true;
    
    // Create ambient forest sound (optional - using Web Audio API)
    let audioContext;
    let oscillator;
    let gainNode;
    
    soundToggle.addEventListener('click', function() {
        isMuted = !isMuted;
        
        if (isMuted) {
            soundToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
            soundToggle.classList.add('muted');
            stopAmbientSound();
        } else {
            soundToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
            soundToggle.classList.remove('muted');
            playAmbientSound();
        }
        
        // Add pulse animation
        soundToggle.style.animation = 'none';
        setTimeout(() => {
            soundToggle.style.animation = '';
        }, 10);
    });
    
    function playAmbientSound() {
        // Create subtle ambient sound using Web Audio API
        try {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Create oscillator for subtle forest ambience
            oscillator = audioContext.createOscillator();
            gainNode = audioContext.createGain();
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(100, audioContext.currentTime);
            
            gainNode.gain.setValueAtTime(0.02, audioContext.currentTime);
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.start();
            
            // Add subtle frequency modulation
            setInterval(() => {
                if (!isMuted && oscillator) {
                    const freq = 80 + Math.random() * 40;
                    oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
                }
            }, 3000);
        } catch (e) {
            console.log('Web Audio API not supported');
        }
    }
    
    function stopAmbientSound() {
        if (oscillator) {
            oscillator.stop();
            oscillator = null;
        }
        if (audioContext) {
            audioContext.close();
            audioContext = null;
        }
    }
}

// ===================================
// FORM LOGIC - MULTI-STEP FORM
// ===================================
function initFormLogic() {
    const form = document.getElementById('registrationForm');
    const sections = document.querySelectorAll('.form-section');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    const progressSteps = document.querySelectorAll('.progress-step');
    
    let currentSection = 0;
    
    // Show first section
    showSection(currentSection);
    
    // Previous button
    prevBtn.addEventListener('click', function() {
        if (currentSection > 0) {
            currentSection--;
            showSection(currentSection);
            animateTransition('prev');
        }
    });
    
    // Next button
    nextBtn.addEventListener('click', function() {
        if (validateSection(currentSection)) {
            if (currentSection < sections.length - 1) {
                currentSection++;
                showSection(currentSection);
                animateTransition('next');
            }
        }
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm();
        }
    });
    
    function showSection(index) {
        // Hide all sections
        sections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Show current section
        sections[index].classList.add('active');
        
        // Update progress steps
        updateProgressSteps(index);
        
        // Update button visibility
        updateButtons(index);
        
        // Scroll to top of form
        document.querySelector('.form-container').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }
    
    function updateProgressSteps(index) {
        progressSteps.forEach((step, i) => {
            if (i < index) {
                step.classList.add('completed');
                step.classList.remove('active');
            } else if (i === index) {
                step.classList.add('active');
                step.classList.remove('completed');
            } else {
                step.classList.remove('active', 'completed');
            }
        });
    }
    
    function updateButtons(index) {
        // Previous button
        if (index === 0) {
            prevBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'flex';
        }
        
        // Next/Submit button
        if (index === sections.length - 1) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'flex';
        } else {
            nextBtn.style.display = 'flex';
            submitBtn.style.display = 'none';
        }
    }
    
    function validateSection(index) {
        const section = sections[index];
        const inputs = section.querySelectorAll('input[required], select[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                highlightError(input);
            } else {
                removeError(input);
            }
            
            // Validate email
            if (input.type === 'email' && input.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    isValid = false;
                    highlightError(input);
                }
            }
            
            // Validate phone numbers
            if (input.type === 'tel' && input.value) {
                const phoneRegex = /^[0-9]{10}$/;
                if (!phoneRegex.test(input.value)) {
                    isValid = false;
                    highlightError(input);
                }
            }
        });
        
        // For board selection section, check if at least one board is selected
        if (index === 3) {
            const checkboxes = section.querySelectorAll('input[type="checkbox"]');
            const isAnyChecked = Array.from(checkboxes).some(cb => cb.checked);
            
            if (!isAnyChecked) {
                isValid = false;
                showError('Please select at least one board');
            }
        }
        
        return isValid;
    }
    
    function validateForm() {
        // Validate all sections
        for (let i = 0; i < sections.length; i++) {
            if (!validateSection(i)) {
                currentSection = i;
                showSection(i);
                return false;
            }
        }
        return true;
    }
    
    function highlightError(input) {
        input.style.borderBottom = '2px solid #cc5500';
        input.style.animation = 'shake 0.5s';
        
        setTimeout(() => {
            input.style.animation = '';
        }, 500);
    }
    
    function removeError(input) {
        input.style.borderBottom = '';
    }
    
    function showError(message) {
        // Create temporary error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #cc5500, #8b2e1f);
            color: #f4f1de;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            animation: slideInRight 0.5s ease-out;
            font-family: var(--font-philosopher);
        `;
        errorDiv.textContent = message;
        
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.style.animation = 'slideOutRight 0.5s ease-out';
            setTimeout(() => {
                errorDiv.remove();
            }, 500);
        }, 3000);
    }
    
    function animateTransition(direction) {
        const activeSection = document.querySelector('.form-section.active');
        
        if (direction === 'next') {
            activeSection.style.animation = 'slideInRight 0.5s ease-out';
        } else {
            activeSection.style.animation = 'slideInLeft 0.5s ease-out';
        }
        
        setTimeout(() => {
            activeSection.style.animation = '';
        }, 500);
    }
    
    function submitForm() {
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="btn-text">Submitting...</span> <span class="btn-icon"><i class="fas fa-spinner fa-spin"></i></span>';
        
        // Simulate form submission (in production, this would be actual PHP processing)
        setTimeout(() => {
            // Hide form
            form.style.display = 'none';
            
            // Show success message
            const successMessage = document.getElementById('successMessage');
            successMessage.classList.add('show');
            
            // Trigger confetti effect
            createConfetti();
            
            // Reset button
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span class="btn-text">Submit Application</span> <span class="btn-icon"><i class="fas fa-paper-plane"></i></span>';
            
            // In production, uncomment the line below to actually submit the form
            // form.submit();
        }, 2000);
    }
    
    function createConfetti() {
        // Simple confetti effect using particles
        const colors = ['#c68642', '#4a7c2c', '#8f9779', '#cc5500', '#d4a574'];
        const confettiCount = 50;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                top: -10px;
                left: ${Math.random() * 100}%;
                opacity: 1;
                transform: rotate(${Math.random() * 360}deg);
                z-index: 10000;
                pointer-events: none;
            `;
            
            document.body.appendChild(confetti);
            
            // Animate confetti
            const duration = 2000 + Math.random() * 1000;
            const targetY = window.innerHeight + 50;
            const targetX = confetti.offsetLeft + (Math.random() - 0.5) * 200;
            
            confetti.animate([
                { 
                    transform: `translate(0, 0) rotate(0deg)`,
                    opacity: 1 
                },
                { 
                    transform: `translate(${targetX - confetti.offsetLeft}px, ${targetY}px) rotate(${Math.random() * 720}deg)`,
                    opacity: 0 
                }
            ], {
                duration: duration,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).onfinish = () => {
                confetti.remove();
            };
        }
    }
}

// ===================================
// PROGRESS BAR TRACKING
// ===================================
function initProgressTracking() {
    const form = document.getElementById('registrationForm');
    const progressFill = document.getElementById('progressFill');
    
    // Update progress based on form completion
    form.addEventListener('input', updateProgress);
    
    function updateProgress() {
        const inputs = form.querySelectorAll('input[required], select[required]');
        const checkboxes = form.querySelectorAll('input[type="checkbox"]');
        
        let totalFields = inputs.length;
        let filledFields = 0;
        
        // Count filled required fields
        inputs.forEach(input => {
            if (input.value.trim()) {
                filledFields++;
            }
        });
        
        // Check if at least one checkbox is selected
        const isAnyChecked = Array.from(checkboxes).some(cb => cb.checked);
        if (isAnyChecked) {
            filledFields++;
            totalFields++;
        } else if (checkboxes.length > 0) {
            totalFields++;
        }
        
        const progress = (filledFields / totalFields) * 100;
        progressFill.style.width = progress + '%';
    }
}

// ===================================
// GSAP ANIMATIONS
// ===================================
if (typeof gsap !== 'undefined') {
    // Animate tribal patterns
    gsap.to('.tribal-pattern', {
        rotation: 360,
        duration: 30,
        repeat: -1,
        ease: 'none'
    });
    
    // Animate section icons on scroll
    const sectionIcons = document.querySelectorAll('.section-icon');
    sectionIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            gsap.to(icon, {
                scale: 1.2,
                rotation: 15,
                duration: 0.3,
                ease: 'back.out(1.7)'
            });
        });
        
        icon.addEventListener('mouseleave', () => {
            gsap.to(icon, {
                scale: 1,
                rotation: 0,
                duration: 0.3,
                ease: 'back.out(1.7)'
            });
        });
    });
    
    // Animate form inputs on focus
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            const wrapper = input.closest('.input-wrapper, .select-wrapper');
            if (wrapper) {
                gsap.to(wrapper, {
                    scale: 1.02,
                    duration: 0.2,
                    ease: 'power2.out'
                });
            }
        });
        
        input.addEventListener('blur', () => {
            const wrapper = input.closest('.input-wrapper, .select-wrapper');
            if (wrapper) {
                gsap.to(wrapper, {
                    scale: 1,
                    duration: 0.2,
                    ease: 'power2.out'
                });
            }
        });
    });
}

// ===================================
// SMOOTH SCROLL FOR NAVIGATION
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================================
// CUSTOM CURSOR EFFECT (OPTIONAL)
// ===================================
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border: 2px solid #c68642;
    border-radius: 50%;
    pointer-events: none;
    z-index: 10000;
    transition: transform 0.2s ease;
    display: none;
`;

document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
    cursor.style.display = 'block';
});

// Enlarge cursor on interactive elements
document.querySelectorAll('a, button, input, select, .board-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursor.style.borderColor = '#d4a574';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.borderColor = '#c68642';
    });
});

// ===================================
// ADD CSS ANIMATIONS DYNAMICALLY
// ===================================
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes slideInLeft {
        from {
            transform: translateX(-50px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// ===================================
// CONSOLE EASTER EGG
// ===================================
console.log('%c🌿 UDAAN Season 12 🌿', 'font-size: 20px; color: #c68642; font-weight: bold;');
console.log('%cTheme: The Significance of Tribes in Wildlife and Forest Conservation', 'font-size: 14px; color: #4a7c2c; font-style: italic;');
console.log('%cJoin our tribe and make a difference! 🍃', 'font-size: 12px; color: #8f9779;');
