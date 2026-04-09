document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.getElementById('custom-cursor');
    const glassPanel = document.querySelector('.glass-panel');
    const instructPanel = document.querySelector('.instruction-panel');
    const textTarget = document.getElementById('text-target');

    // 1. Lógica del Cursor
    document.addEventListener('mousemove', (e) => {
        // Usar requestAnimationFrame para mejor rendimiento
        requestAnimationFrame(() => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });
    });

    const interactiveElements = document.querySelectorAll('a, button, .btn');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
            cursor.style.background = 'rgba(255, 255, 255, 0.2)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.background = 'white';
        });
    });

    // 2. Efecto Parallax Suave
    document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.pageX) / 50;
        const y = (window.innerHeight / 2 - e.pageY) / 50;

        if (glassPanel) glassPanel.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
        if (instructPanel) instructPanel.style.transform = `rotateY(${x * 0.8}deg) rotateX(${y * 0.8}deg)`;
    });

    // 3. Sistema de Idiomas
    const content = {
        es: `INSTRUCCIONES:\n1. Solicita a una IA el código HTML.\n2. Crea un repo en GitHub.\n3. Añade "index.html" y pega el código.\n4. Conecta tu GitHub a Vercel.\n5. Importa el repo y haz el "Deploy".`,
        en: `INSTRUCTIONS:\n1. Ask an AI for the HTML code.\n2. Create a GitHub repository.\n3. Add "index.html" and paste the code.\n4. Connect GitHub to Vercel.\n5. Import the repo and click "Deploy".`
    };

    // Función global para que el onclick del HTML funcione
    window.setLang = (lang) => {
        if (!textTarget) return;
        
        // Efecto de fade out/in simple
        textTarget.style.opacity = 0;
        setTimeout(() => {
            textTarget.innerText = content[lang];
            textTarget.style.opacity = 1;
        }, 200);
    };
});
