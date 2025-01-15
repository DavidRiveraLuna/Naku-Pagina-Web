document.addEventListener('DOMContentLoaded', function() {
    // Verificar el estado del modo oscuro en localStorage
    if (localStorage.getItem('dark-mode') === 'enabled') {
        document.body.classList.add('dark-mode');
        document.getElementById('dark-mode-toggle').textContent = 'Modo Claro';
    }

    // Añadir evento al botón de modo oscuro
    document.getElementById('dark-mode-toggle').addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('dark-mode', 'enabled');
            this.textContent = 'Modo Claro';
        } else {
            localStorage.setItem('dark-mode', 'disabled');
            this.textContent = 'Modo Oscuro';
        }
    });
});
