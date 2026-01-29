// Variables globales
let totalPoints = 0;
const maxPoints = 100;

// Elementos del DOM
const checkboxes = document.querySelectorAll('.checkbox');
const progressBar = document.getElementById('progressBar');
const totalScoreElement = document.getElementById('totalScore');
const resetBtn = document.getElementById('resetBtn');

// Inicializar la aplicación
function init() {
    loadProgress();
    attachEventListeners();
    updateScore();
}

// Agregar event listeners
function attachEventListeners() {
    // Event listener para cada checkbox
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', handleCheckboxChange);
    });
    
    // Event listener para el botón de reset
    resetBtn.addEventListener('click', resetChecklist);
}

// Manejar el cambio de estado de un checkbox
function handleCheckboxChange(event) {
    const checkbox = event.target;
    const testItem = checkbox.closest('.test-item');
    
    // Agregar o quitar la clase 'checked'
    if (checkbox.checked) {
        testItem.classList.add('checked');
    } else {
        testItem.classList.remove('checked');
    }
    
    // Actualizar puntuación y guardar progreso
    updateScore();
    saveProgress();
    
    // Animación suave
    testItem.style.transform = 'scale(0.98)';
    setTimeout(() => {
        testItem.style.transform = '';
    }, 200);
}

// Calcular y actualizar la puntuación
function updateScore() {
    totalPoints = 0;
    
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const testItem = checkbox.closest('.test-item');
            const points = parseInt(testItem.getAttribute('data-points'));
            totalPoints += points;
        }
    });
    
    // Asegurar que la puntuación no sea negativa
    if (totalPoints < 0) {
        totalPoints = 0;
    }
    
    // Actualizar la UI
    updateProgressBar();
    updateTotalScore();
}

// Actualizar la barra de progreso
function updateProgressBar() {
    const percentage = Math.max(0, (totalPoints / maxPoints) * 100);
    progressBar.style.width = percentage + '%';
    progressBar.textContent = Math.round(percentage) + '%';
    
    // Cambiar color según el porcentaje
    if (percentage >= 80) {
        progressBar.style.background = 'linear-gradient(90deg, #4ecca3 0%, #3eb489 50%, #2e9c77 100%)';
    } else if (percentage >= 50) {
        progressBar.style.background = 'linear-gradient(90deg, #f39c12 0%, #e67e22 100%)';
    } else {
        progressBar.style.background = 'linear-gradient(90deg, #e74c3c 0%, #c0392b 100%)';
    }
}

// Actualizar puntuación total
function updateTotalScore() {
    totalScoreElement.textContent = `${totalPoints} / ${maxPoints}`;
    
    // Animación de cambio de puntuación
    totalScoreElement.style.transform = 'scale(1.1)';
    setTimeout(() => {
        totalScoreElement.style.transform = 'scale(1)';
    }, 200);
}

// Guardar progreso en localStorage
function saveProgress() {
    const progress = {};
    
    checkboxes.forEach((checkbox, index) => {
        progress[`checkbox_${index}`] = checkbox.checked;
    });
    
    localStorage.setItem('testChecklistProgress', JSON.stringify(progress));
}

// Cargar progreso desde localStorage
function loadProgress() {
    const savedProgress = localStorage.getItem('testChecklistProgress');
    
    if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        
        checkboxes.forEach((checkbox, index) => {
            const isChecked = progress[`checkbox_${index}`];
            if (isChecked) {
                checkbox.checked = true;
                checkbox.closest('.test-item').classList.add('checked');
            }
        });
    }
}

// Reiniciar checklist
function resetChecklist() {
    // Confirmar antes de reiniciar
    const confirmed = confirm('¿Estás seguro de que quieres reiniciar el checklist? Se perderá todo el progreso.');
    
    if (confirmed) {
        // Desmarcar todos los checkboxes
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
            checkbox.closest('.test-item').classList.remove('checked');
        });
        
        // Limpiar localStorage
        localStorage.removeItem('testChecklistProgress');
        
        // Actualizar puntuación
        updateScore();
        
        // Feedback visual
        showResetFeedback();
    }
}

// Mostrar feedback de reinicio
function showResetFeedback() {
    const container = document.querySelector('.container');
    const feedback = document.createElement('div');
    feedback.textContent = '✓ Checklist reiniciado';
    feedback.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #4ecca3 0%, #3eb489 100%);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        font-weight: bold;
        box-shadow: 0 4px 15px rgba(78, 204, 163, 0.5);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(feedback);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        feedback.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            feedback.remove();
        }, 300);
    }, 3000);
}

// Agregar animaciones CSS dinámicamente
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

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Exportar funciones para testing (opcional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        updateScore,
        saveProgress,
        loadProgress,
        resetChecklist
    };
}
