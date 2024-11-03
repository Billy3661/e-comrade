// Function to toggle the menu
function toggleMenu() {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('active');
}

// Initialize the cart in localStorage if it doesn't exist
if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
}

// Function to add items to the cart and update the total price
function addToCart(product, price, image) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    // Check if the product already exists in the cart
    const existingProductIndex = cart.findIndex(item => item.product === product);
    if (existingProductIndex > -1) {
        // Update the existing product's quantity
        cart[existingProductIndex].quantity += 1; // Increase quantity if already in cart
    } else {
        // Add new product with a quantity of 1
        cart.push({ product, price, image, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart(); // Load cart to update display
}

// Function to remove an item from the cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

// Function to update the displayed total price
function updateTotalPrice() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalPriceElement = document.getElementById('total-price');
    if (totalPriceElement) {
        totalPriceElement.textContent = `Total: KSh ${totalPrice}`;
    }
}

// Function to load the cart items and display them
function loadCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    cart.forEach((item, index) => {
        const cartItem = document.createElement('article');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.product}" style="width: 100px; height: auto;">
            <p>${item.product}</p>
            <p>Price: KSh ${item.price} x ${item.quantity} = KSh ${item.price * item.quantity}</p>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItems.appendChild(cartItem);
    });

    updateTotalPrice();
}

// Add event listeners to product items
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', () => {
        const product = button.getAttribute('data-product');
        const price = parseFloat(button.getAttribute('data-price'));
        const image = button.getAttribute('data-image');
        addToCart(product, price, image);
    });
});

// Update cart on page load
document.addEventListener('DOMContentLoaded', loadCart);
