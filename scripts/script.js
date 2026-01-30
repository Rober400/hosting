// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // 1. INTERCAMBIO DE IMÁGENES AL HACER CLIC
    // ============================================
    
    const images = document.querySelectorAll('.clickable-image');
    
    images.forEach(image => {
        // Guardar la URL original en un atributo data personalizado
        image.dataset.originalSrc = image.src;
        
        image.addEventListener('click', function() {
            // Obtener las URLs
            const currentSrc = this.src;
            const altSrc = this.dataset.altSrc;
            const originalSrc = this.dataset.originalSrc;
            
            // Efecto visual de transición
            this.style.opacity = '0';
            
            setTimeout(() => {
                // Intercambiar entre la imagen original y la alternativa
                if (currentSrc === originalSrc) {
                    this.src = altSrc;
                } else {
                    this.src = originalSrc;
                }
                
                this.style.opacity = '1';
            }, 200);
        });
        
        // Efecto adicional: mostrar cursor pointer más visible
        image.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        image.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    
    // ============================================
    // 2. CAMPO DE TEXTO QUE CAMBIA EL TÍTULO
    // ============================================
    
    const userInput = document.getElementById('userInput');
    const changeTextBtn = document.getElementById('changeTextBtn');
    const mainTitle = document.getElementById('main-title');
    
    // Guardar el título original
    const originalTitle = mainTitle.textContent;
    
    // Función para cambiar el título
    function changeTitle() {
        const newText = userInput.value.trim();
        
        if (newText === '') {
            // Si el campo está vacío, restaurar el título original
            mainTitle.textContent = originalTitle;
            showFeedback('Título restaurado');
        } else {
            // Cambiar al nuevo texto
            mainTitle.textContent = newText;
            showFeedback('¡Título actualizado!');
        }
        
        // Efecto visual
        mainTitle.style.transform = 'scale(1.1)';
        setTimeout(() => {
            mainTitle.style.transform = 'scale(1)';
        }, 300);
    }
    
    // Evento del botón
    changeTextBtn.addEventListener('click', changeTitle);
    
    // También permitir cambiar con Enter
    userInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            changeTitle();
        }
    });
    
    // Función de feedback visual
    function showFeedback(message) {
        // Crear elemento de feedback
        const feedback = document.createElement('div');
        feedback.textContent = message;
        feedback.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(212, 175, 55, 0.9);
            color: #1a1a2e;
            padding: 15px 25px;
            border-radius: 10px;
            font-weight: 600;
            z-index: 1000;
            animation: slideIn 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        `;
        
        document.body.appendChild(feedback);
        
        // Eliminar después de 2 segundos
        setTimeout(() => {
            feedback.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(feedback);
            }, 300);
        }, 2000);
    }
    
    // Añadir animaciones de feedback
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    
    // ============================================
    // 3. OBJETO EN MOVIMIENTO ADICIONAL (INTERACTIVO)
    // ============================================
    
    // El orb flotante ya está animado con CSS, pero añadimos interactividad
    const floatingOrb = document.querySelector('.floating-orb');
    
    // Hacer que el orb siga el cursor sutilmente
    document.addEventListener('mousemove', function(e) {
        const x = e.clientX;
        const y = e.clientY;
        
        // Movimiento suave hacia el cursor (con retraso)
        const orbX = parseFloat(floatingOrb.style.left || 0);
        const orbY = parseFloat(floatingOrb.style.top || 0);
        
        const targetX = x / window.innerWidth * 100;
        const targetY = y / window.innerHeight * 100;
        
        // Aplicar movimiento suave (interpolación)
        floatingOrb.style.left = `${targetX}%`;
        floatingOrb.style.top = `${targetY}%`;
        floatingOrb.style.transition = 'left 2s ease, top 2s ease';
    });
    
    
    // ============================================
    // 4. EFECTOS ADICIONALES DE MEJORA
    // ============================================
    
    // Efecto parallax suave en el scroll
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('header');
        
        if (header) {
            header.style.transform = `translateY(${scrolled * 0.5}px)`;
            header.style.opacity = 1 - (scrolled / 500);
        }
    });
    
    // Animación de entrada para elementos de la galería
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    galleryItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        item.style.transition = 'all 0.6s ease';
        observer.observe(item);
    });
    
    // Log de bienvenida
    console.log('🎨 Galería Interactiva cargada correctamente');
    console.log('✨ Haz clic en las imágenes para cambiarlas');
    console.log('📝 Personaliza el título con el campo de texto');
    console.log('🌟 Disfruta de las animaciones');
});
