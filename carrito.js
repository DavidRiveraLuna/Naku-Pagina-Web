let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addProductToCart(product) {
    const existingProductIndex = cart.findIndex(item => item.name === product.name && (!item.fragrances || item.fragrances === product.fragrances));
    if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity += product.quantity;
    } else {
        cart.push(product);
    }
    updateCartCount();
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} ha sido añadido al carrito. Cantidad: ${product.quantity}`);
    console.log(cart); // Para verificar que el producto se añadió correctamente
}

function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = cartCount;
}

function removeProductFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    renderCart();
    localStorage.setItem('cart', JSON.stringify(cart));
}

function renderCart() {
    const cartList = document.querySelector('.cart-list');
    cartList.innerHTML = '';
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <p>${item.name} ${item.fragrances ? '- ' + item.fragrances : ''}</p>
            <p>$${item.price}.00 x ${item.quantity}</p>
            <button onclick="removeProductFromCart(${index})">Eliminar</button>
        `;
        cartList.appendChild(cartItem);
    });

    const cartTotal = document.querySelector('.cart-total');
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `Total: $${total}.00`;
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    if (document.querySelector('.cart-list')) {
        renderCart();
    }
});

function checkout() {
    // Aquí puedes añadir la lógica para el proceso de pago
    alert('Implementar el proceso de pago');
}
