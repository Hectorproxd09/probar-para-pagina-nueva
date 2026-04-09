/**
 * script.js - Controlador de UI Complementario y Bonito
 * Maneja el cursor, parallax 3D, cambio de idiomas y responsividad táctil.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. SELECCIÓN DE ELEMENTOS CLAVE
    const cursor = document.getElementById('custom-cursor');
    const glow = document.getElementById('ambient-glow');
    const container = document.getElementById('parallax-container');
    const mainPanel = document.getElementById('main-panel');
    const textTarget = document.getElementById('text-target');

    // Detectamos si es un dispositivo táctil (Móvil) o PC (fine pointer)
    const isPC = window.matchMedia("(pointer: fine)").matches;

    // 2. LÓGICA EXCLUSIVA PARA PC (Cursor y Efectos 3D)
    if (isPC) {
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            // A. Mover el círculo del cursor (Sigue la punta de la flecha real)
            // Usamos requestAnimationFrame implícitamente vía transform para suavidad
            cursor.style.left = `${mouseX}px`;
            cursor.style.top = `${mouseY}px`;

            // B. Parallax Dinámico en el Resplandor de Fondo
            // El brillo carmesí se mueve ligeramente en dirección OPUESTA al mouse
            const moveX = (window.innerWidth / 2 - mouseX) * 0.08;
            const moveY = (window.innerHeight / 2 - mouseY) * 0.08;
            glow.style.transform = `translate(${moveX}px, ${moveY}px)`;

            // C. Rotación 3D Suave del Panel Principal (Efecto Tarjeta)
            // Calculamos la rotación basada en la posición del mouse respecto al centro
            const rotX = (window.innerHeight / 2 - mouseY) / 80; // Sensibilidad X
            const rotY = (window.innerWidth / 2 - mouseX) / -80; // Sensibilidad Y
            mainPanel.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
        });

        // D. Efecto de agrandado del cursor al pasar sobre botones
        const interactiveElements = document.querySelectorAll('a, button, .btn');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.6)';
                cursor.style.background = 'rgba(255, 255, 255, 0.1)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.background = 'transparent';
            });
        });
    }

    // 3. SISTEMA DE CAMBIO DE IDIOMAS (Con animación fluida)
    const translations = {
        es: `🤖 PASOS CLAVE (ES):\n\n1. Pide a una IA el código HTML.\n2. Crea un repo en GitHub llamado "index.html".\n3. Conecta el repo a Vercel y despliega.\n¡Listo!`,
        en: `🤖 KEY STEPS (EN):\n\n1. Ask an AI for the HTML code.\n2. Create a GitHub repo named "index.html".\n3. Connect repo to Vercel and deploy.\nDone!`
    };

    const langButtons = document.querySelectorAll('.btn-lang');

    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');

            // Pequeña animación de fade-out antes de cambiar el texto
            textTarget.style.opacity = '0';
            
            // Esperamos a que la opacidad baje (0.3s definido en CSS)
            setTimeout(() => {
                textTarget.innerText = translations[lang];
                // Fade-in con el nuevo texto
                textTarget.style.opacity = '1';
                
                // Actualizar estado activo de los botones
                langButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            }, 300);
        });
    });

    // 4. CORRECCIÓN PARA MÓVILES (Menús Dropdown por "Tap")
    // En pantallas táctiles, el "hover" CSS es inestable. Usamos JS y clicks.
    if (!isPC) {
        const triggers = document.querySelectorAll('.dropdown-trigger');
        
        triggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                // Evitamos que el click navegue si el trigger es un enlace '#'
                e.preventDefault(); 
                
                const parentDropdown = trigger.parentElement;
                
                // Cerramos otros dropdowns abiertos para que no se superpongan
                document.querySelectorAll('.dropdown').forEach(dd => {
                    if (dd !== parentDropdown) dd.classList.remove('active');
                });

                // Abrimos/cerramos el actual (la clase 'active' cambia el CSS en el HTML)
                parentDropdown.classList.toggle('active');
            });
        });

        // Cerrar dropdown si tocas fuera del panel de cristal
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.glass-panel')) {
                document.querySelectorAll('.dropdown').forEach(dd => dd.classList.remove('active'));
            }
        });
    }
});
