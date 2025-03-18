// Star Burst Animation
function createFireworks() {
    const container = document.getElementById('fireworks-container');

    // Clear any existing animations
    container.innerHTML = '';

    // Create multiple star bursts
    // One in the center
    createStarBurst(container, 50, 50);

    // Create several star bursts at different positions with slight delays
    setTimeout(() => createStarBurst(container, 25, 30, 0.8), 100); // Top left
    setTimeout(() => createStarBurst(container, 75, 30, 0.8), 150); // Top right
    setTimeout(() => createStarBurst(container, 25, 70, 0.8), 200); // Bottom left
    setTimeout(() => createStarBurst(container, 75, 70, 0.8), 250); // Bottom right

    // Create a few smaller ones
    setTimeout(() => createStarBurst(container, 40, 40, 0.6), 300); // Small one
    setTimeout(() => createStarBurst(container, 60, 60, 0.6), 350); // Small one
    setTimeout(() => createStarBurst(container, 50, 25, 0.6), 400); // Small one at top

    // Remove all elements after animation completes
    setTimeout(() => {
        container.innerHTML = '';
    }, 1100); // Slightly longer than 1s to ensure cleanup
}

function createStarBurst(container, xPercent, yPercent, scale = 1) {
    // Create the star burst container
    const starBurst = document.createElement('div');
    starBurst.className = 'star-burst';

    // Position based on percentage of screen
    starBurst.style.left = `${xPercent}%`;
    starBurst.style.top = `${yPercent}%`;

    // Apply scale if provided
    if (scale !== 1) {
        starBurst.style.transform = `translate(-50%, -50%) scale(${scale})`;
    }

    // Add to container
    container.appendChild(starBurst);

    // Create star rays
    createStarRays(starBurst);

    // Create star particles
    createStarParticles(starBurst);

    // Create central glow
    createCentralGlow(starBurst);

    // Remove star burst after animation
    setTimeout(() => {
        starBurst.remove();
    }, 1000);
}

function createStarRays(starBurst) {
    // Randomly vary the number of rays for each star burst
    const rayCount = 8 + Math.floor(Math.random() * 8); // 8-15 rays

    // Create main rays of the star
    for (let i = 0; i < rayCount; i++) {
        const ray = document.createElement('div');
        ray.className = 'star-ray';

        // Calculate angle for this ray
        const angle = (i * (360 / rayCount));

        // Set rotation
        ray.style.transform = `rotate(${angle}deg)`;

        // Random length for variety
        const length = 80 + Math.random() * 40; // 80-120px
        ray.style.height = `${length}px`;

        // Random width for variety
        const width = 3 + Math.random() * 3; // 3-6px
        ray.style.width = `${width}px`;
        ray.style.left = `-${width/2}px`; // Center the ray

        // Random color from star palette
        ray.style.backgroundColor = getStarColor();

        // Add to star burst
        starBurst.appendChild(ray);
    }

    // Create secondary rays (thinner)
    // Randomly decide if this star has secondary rays
    if (Math.random() > 0.3) { // 70% chance to have secondary rays
        for (let i = 0; i < rayCount; i++) {
            const ray = document.createElement('div');
            ray.className = 'star-ray secondary';

            // Calculate angle for this ray (offset from main rays)
            const angle = (i * (360 / rayCount)) + (360 / (rayCount * 2));

            // Set rotation
            ray.style.transform = `rotate(${angle}deg)`;

            // Random length for variety (shorter than main rays)
            const length = 60 + Math.random() * 30; // 60-90px
            ray.style.height = `${length}px`;

            // Random color from star palette
            ray.style.backgroundColor = getStarColor(true); // Brighter

            // Add to star burst
            starBurst.appendChild(ray);
        }
    }
}

function createStarParticles(starBurst) {
    // Create particles around the star
    const particleCount = 40;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'star-particle';

        // Random angle and distance
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 100 + 20; // 20-120px

        // Calculate position
        const particleX = Math.cos(angle) * distance;
        const particleY = Math.sin(angle) * distance;

        // Random size for variety
        const size = 2 + Math.random() * 4; // 2-6px

        // Set styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = getStarColor(Math.random() > 0.5);
        particle.style.boxShadow = `0 0 ${Math.random() * 3 + 2}px ${getStarColor(true)}`; // Glow effect
        particle.style.transform = `translate(${particleX}px, ${particleY}px)`;

        // Add to star burst
        starBurst.appendChild(particle);
    }
}

function createCentralGlow(starBurst) {
    // Create central glow
    const glow = document.createElement('div');
    glow.className = 'star-center';
    starBurst.appendChild(glow);

    // Create inner glow
    const innerGlow = document.createElement('div');
    innerGlow.className = 'star-inner';
    starBurst.appendChild(innerGlow);
}

// Helper function to get star colors (yellow, gold, orange, red)
function getStarColor(brighter = false) {
    const colors = brighter ? [
        '#FFD700', // Gold
        '#FFCC00', // Bright yellow
        '#FFA500', // Orange
        '#FFAA33', // Bright orange
        '#FF8C00'  // Dark orange
    ] : [
        '#FFB700', // Gold
        '#FF9500', // Orange
        '#FF7800', // Dark orange
        '#FF5500', // Red-orange
        '#FF4500'  // Red-orange
    ];

    return colors[Math.floor(Math.random() * colors.length)];
}

// Add CSS for star burst
const style = document.createElement('style');
style.textContent = `
    .star-burst {
        position: absolute;
        width: 0;
        height: 0;
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 1000;
        will-change: transform;
    }

    .star-ray {
        position: absolute;
        width: 4px;
        height: 100px;
        background-color: #FFD700;
        transform-origin: bottom center;
        left: -2px;
        bottom: 0;
        border-radius: 2px;
        opacity: 0;
        animation: ray-animate 1s ease-out forwards;
    }

    .star-ray.secondary {
        width: 2px;
        left: -1px;
        opacity: 0;
        animation: ray-animate-secondary 1s ease-out forwards;
    }

    .star-particle {
        position: absolute;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background-color: #FFD700;
        transform: translate(0, 0);
        opacity: 0;
        animation: particle-animate 1s ease-out forwards;
    }

    .star-center {
        position: absolute;
        width: 30px;
        height: 30px;
        background-color: #FFFFFF;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        opacity: 0;
        animation: center-animate 1s ease-out forwards;
        box-shadow: 0 0 20px 10px rgba(255, 215, 0, 0.8);
    }

    .star-inner {
        position: absolute;
        width: 15px;
        height: 15px;
        background-color: #FFCC00;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        opacity: 0;
        animation: inner-animate 1s ease-out forwards;
        box-shadow: 0 0 10px 5px rgba(255, 215, 0, 0.9);
    }

    @keyframes ray-animate {
        0% { opacity: 0; height: 0; }
        15% { opacity: 1; }
        90% { opacity: 0.3; }
        100% { opacity: 0; height: 100%; }
    }

    @keyframes ray-animate-secondary {
        0% { opacity: 0; height: 0; }
        20% { opacity: 0.8; }
        90% { opacity: 0.2; }
        100% { opacity: 0; height: 100%; }
    }

    @keyframes particle-animate {
        0% { opacity: 0; transform: translate(0, 0); }
        15% { opacity: 1; }
        90% { opacity: 0.2; }
        100% { opacity: 0; transform: translate(var(--x, 0), var(--y, 0)); }
    }

    @keyframes center-animate {
        0% { opacity: 0; width: 0; height: 0; }
        15% { opacity: 1; width: 40px; height: 40px; }
        90% { opacity: 0.3; width: 25px; height: 25px; }
        100% { opacity: 0; width: 20px; height: 20px; }
    }

    @keyframes inner-animate {
        0% { opacity: 0; width: 0; height: 0; }
        15% { opacity: 1; width: 20px; height: 20px; }
        90% { opacity: 0.3; width: 12px; height: 12px; }
        100% { opacity: 0; width: 10px; height: 10px; }
    }
`;
document.head.appendChild(style);
document.head.appendChild(style);