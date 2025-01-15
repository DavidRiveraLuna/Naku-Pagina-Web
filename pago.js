document.addEventListener('DOMContentLoaded', function() {
    // Obtener los elementos del carrito desde localStorage
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Calcular el total del carrito
    const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    // Renderizar los productos del carrito en el resumen
    const cartItemsSummary = document.getElementById('cart-items-summary');
    cartItems.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('cart-item-summary');
        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image-summary">
            <p>${item.name} x ${item.quantity}</p>
            <p>$${(item.price * item.quantity).toFixed(2)}</p>
        `;
        cartItemsSummary.appendChild(div);
    });

    // Mostrar el total del carrito
    document.getElementById('cart-total-summary').textContent = `$${cartTotal.toFixed(2)}`;

    // Función de simulación de pago con validación
    document.getElementById('payment-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const cardholderName = document.getElementById('cardholder-name').value;
        const cardNumber = document.getElementById('card-number').value;
        const expiryDate = document.getElementById('expiry-date').value;
        const cvc = document.getElementById('cvc').value;

        // Expresión regular para validar MM/AA
        const expiryDatePattern = /^\d{2}\/\d{2}$/;

        if (!cardholderName || !cardNumber || !expiryDate || !cvc) {
            document.getElementById('error-message').textContent = 'Por favor, completa todos los campos.';
        } else if (!expiryDatePattern.test(expiryDate)) {
            document.getElementById('error-message').textContent = 'Formato de fecha de expiración inválido. Utiliza MM/AA.';
        } else {
            // Aquí puedes agregar la lógica para procesar el pago
            document.getElementById('error-message').textContent = '';
            alert('Pago registrado con éxito.');
        }
    });

    // Actualizar el conteo del carrito
    function updateCartCount() {
        const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
        document.querySelector('.cart-link span').textContent = cartCount;
    }

    // Llamar a la función para actualizar el conteo del carrito
    updateCartCount();
});
