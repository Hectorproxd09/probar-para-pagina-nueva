/**
 * UI Controller - Mejoras de interactividad y responsividad
 */

document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.getElementById('custom-cursor');
    const mainCard = document.getElementById('main-card');
    const glow = document.getElementById('ambient-glow');
    const textTarget = document.getElementById('text-target');

    // 1. GESTIÓN DEL CURSOR PERSONALIZADO
    const isMobile = !window.matchMedia("(pointer: fine)").matches;

    if (!isMobile) {
        document.addEventListener('mousemove', (e) => {
            // Movimiento suave del círculo
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;

            // Efecto Parallax en el fondo (el brillo sigue al mouse)
            const moveX = (e.clientX - window.innerWidth / 2) * 0.05;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.05;
            glow.style.transform = `translate(${moveX}px, ${moveY}px)`;

            // Rotación 3D sutil en el panel principal
            const rotateY = (e.clientX - window.innerWidth / 2) / 50;
            const rotateX = (e.clientY - window.innerHeight / 2) / -50;
            mainCard.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
        });
    }

    // 2. EFECTOS HOVER (Solo para PC)
    const interactiveElements = document.querySelectorAll('a, button, .btn');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (!isMobile) cursor.style.transform = 'translate(-50%, -50%) scale(1.8)';
        });
        el.addEventListener('mouseleave', () => {
            if (!isMobile) cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });

    // 3. SISTEMA DE IDIOMAS
    const translations = {
        es: `🚀 INSTRUCCIONES RÁPIDAS:
        1. Genera tu código usando los links de IA arriba.
        2. Crea un repositorio en GitHub con el nombre "index.html".
        3. Importa ese repositorio en Vercel para subirlo a la nube.
        ¡Listo para compartir!`,
        en: `🚀 QUICK INSTRUCTIONS:
        1. Generate your code using the AI links above.
        2. Create a GitHub repo and name your file "index.html".
        3. Import that repo into Vercel to go live.
        Ready to share!`
    };

    document.querySelectorAll('.btn-lang').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            textTarget.style.opacity = '0';
            
            setTimeout(() => {
                textTarget.innerText = translations[lang];
                textTarget.style.opacity = '1';
            }, 200);
        });
    });

    // 4. FIX PARA MÓVILES (Dropdowns por Click)
    if (isMobile) {
        document.querySelectorAll('.dropdown-trigger').forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                const parent = trigger.parentElement;
                parent.classList.toggle('active');
            });
        });
    }
});
