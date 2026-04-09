// Variables globales
const cursor = document.getElementById('custom-cursor');
const panels = document.querySelectorAll('[data-tilt]');
const dropdowns = document.querySelectorAll('[data-dropdown]');
let mouseX = 0, mouseY = 0;
let particles = [];

// Cursor personalizado
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

// Efectos hover cursor
function updateCursorOnHover(target, scale = 2, isLink = true) {
    const ring = cursor.querySelector('.cursor-ring');
    const dot = cursor.querySelector('.cursor-dot');
    
    target.addEventListener('mouseenter', () => {
        cursor.style.transform = `translate(-50%, -50%) scale(${scale})`;
        ring.style.opacity = '0.8';
        ring.style.transform = 'translate(-50%, -50%) scale(1.2)';
        if (isLink) dot.style.boxShadow = '0 0 20px rgba(255, 107, 107, 0.8)';
    });
    
    target.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        ring.style.opacity = '0.4';
        ring.style.transform = 'translate(-50%, -50%) scale(0.8)';
        dot.style.boxShadow = '0 0 15px rgba(255, 107, 107, 0.6)';
    });
}

// Inicializar cursores
document.addEventListener('DOMContentLoaded', () => {
    const interactables = document.querySelectorAll('a, button, [data-dropdown]');
    interactables.forEach(el => updateCursorOnHover(el));
    
    initParallax();
    initParticles();
    initLanguage();
    initSmoothScroll();
});

// Parallax 3D mejorado
function initParallax() {
    document.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.clientX) / 50;
        const yAxis = (window.innerHeight / 2 - e.clientY) / 50;
        
        panels.forEach((panel, index) => {
            const intensity = 1 + (index * 0.2);
            panel.style.transform = `rotateY(${xAxis * intensity}deg) rotateX(${yAxis * intensity}deg) translateZ(0)`;
        });
    });
}

// Sistema de partículas
function initParticles() {
    const container = document.querySelector('.particles-container');
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: fixed;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: rgba(255, 107, 107, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}vw;
            top: ${Math.random() * 100}vh;
            pointer-events: none;
            z-index: -1;
            animation: float ${15 + Math.random() * 10}s infinite linear;
            animation-delay: ${Math.random() * 10}s;
        `;
        container.appendChild(particle);
        particles.push(particle);
    }
}

// Lenguaje
function initLanguage() {
    const langButtons = document.querySelectorAll('.btn-lang');
    const textTarget = document.getElementById('text-target');
    
    const content = {
        es: `🚀 INSTRUCCIONES COMPLETAS:

1️⃣ **IA**: Solicita a una IA generar tu página HTML con un prompt específico
2️⃣ **GitHub**: Crea repositorio → "Add file" → index.html → pega código → Commit
3️⃣ **Vercel**: Login con GitHub → "Add New Project" → selecciona repositorio → Deploy
4️⃣ **¡Listo!** Copia la URL pública generada

💡 Consejo: Usa nombres de repositorios descriptivos pero discretos`,
        
        en: `🚀 COMPLETE INSTRUCTIONS:

1️⃣ **AI**: Ask an AI to generate your HTML page with a specific prompt
2️⃣ **GitHub**: Create repo → "Add file" → index.html → paste code → Commit
3️⃣ **Vercel**: GitHub login → "Add New Project" → select repo → Deploy
4️⃣ **Done!** Copy the generated public URL

💡 Tip: Use descriptive but discreet repository names`
    };
    
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            
            // Update active state
            langButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update content
            textTarget.innerHTML = content[lang];
            textTarget.classList.remove('placeholder-text');
        });
    });
}

// Scroll suave y otros efectos
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Actualizar cursores dinámicos
const observer = new MutationObserver(() => {
    const newInteractables = document.querySelectorAll('a, button:not([data-observed])');
    newInteractables.forEach(el => {
        if (!el.dataset.observed) {
            updateCursorOnHover(el);
            el.dataset.observed = 'true';
        }
    });
});

observer.observe(document.body, { childList: true, subtree: true });

// Responsive cursor
window.addEventListener('resize', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
});
