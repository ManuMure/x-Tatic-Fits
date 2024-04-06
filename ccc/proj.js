document.addEventListener("DOMContentLoaded", function () {
    const cartIcon = document.getElementById("cart-icon");
    const closeCartIcon = document.getElementById("close-cart");
    const cart = document.querySelector(".cart");
    const addToCartButtons = document.querySelectorAll('.row-left a');
    const totalElement = document.querySelector('.total-price');
    const buyButton = document.querySelector('.btn-buy');
    const cartContent = document.querySelector('.cart-content');

    let total = 0; 

    
    cartIcon.addEventListener("click", function () {
        cart.classList.add("active");
    });

    closeCartIcon.addEventListener("click", function () {
        cart.classList.remove("active");
    });

    
    addToCartButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault(); 

            const productContainer = event.target.closest('.row');
            const productTitle = productContainer.querySelector('h3').innerText;
            const productPrice = parseFloat(productContainer.querySelector('.row-right h6').innerText.replace(/[^\d.]/g, ''));
            const productImageSrc = productContainer.querySelector('.row-img img').src;

            addToCart(productTitle, productPrice, productImageSrc);
        });
    });

    
    function addToCart(title, price, imageSrc) {
        
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-box');

        cartItem.innerHTML = `
            <div class="cart-product-image">
                <img src="${imageSrc}" alt="${title}" style="max-width: 100px;">
            </div>
            <div class="cart-product-info">
                <div class="cart-product-title">${title}</div>
                <div class="cart-price">Kes ${price}</div>
                <div class="cart-quantity">1</div>
                <div class="cart-actions">
                    <button class="increase-btn">+</button>
                    <button class="decrease-btn">-</button>
                    <button class="remove-btn">Remove</button>
                </div>
            </div>
        `;

        cartContent.appendChild(cartItem);

        
        total += price;
        totalElement.textContent = `Kes ${Math.max(total, 0).toFixed(2)}`;
    }

    
    document.addEventListener('click', function (event) {
        if (event.target && event.target.classList.contains('increase-btn')) {
            const quantityElement = event.target.closest('.cart-box').querySelector('.cart-quantity');
            const currentQuantity = parseInt(quantityElement.textContent);
            const newQuantity = currentQuantity + 1;
            quantityElement.textContent = newQuantity;
            updateTotal();
        }
    });

    
    document.addEventListener('click', function (event) {
        if (event.target && event.target.classList.contains('decrease-btn')) {
            const quantityElement = event.target.closest('.cart-box').querySelector('.cart-quantity');
            const currentQuantity = parseInt(quantityElement.textContent);
            if (currentQuantity > 1) {
                const newQuantity = currentQuantity - 1;
                quantityElement.textContent = newQuantity;
                updateTotal();
            }
        }
    });

    
    document.addEventListener('click', function (event) {
        if (event.target && event.target.classList.contains('remove-btn')) {
            const cartItem = event.target.closest('.cart-box');
            const price = parseFloat(cartItem.querySelector('.cart-price').textContent.replace(/[^\d.]/g, ''));
            const quantity = parseInt(cartItem.querySelector('.cart-quantity').textContent);
            const subtotal = price * quantity;
            total -= subtotal;

            
            cartItem.remove();

        
            updateTotal();
        }
    });

    
    function updateTotal() {
        let newTotal = 0;
        const cartItems = document.querySelectorAll('.cart-box');
        cartItems.forEach(item => {
            const price = parseFloat(item.querySelector('.cart-price').textContent.replace(/[^\d.]/g, ''));
            const quantity = parseInt(item.querySelector('.cart-quantity').textContent);
            newTotal += price * quantity;
        });
        total = Math.max(newTotal, 0); 
        totalElement.textContent = `Kes ${total.toFixed(2)}`;
    }

    
    buyButton.addEventListener('click', function () {
        if (cartContent.children.length === 0) {
            alert('You have to add an item in the cart first');
        } else {
            alert('Your Order has been placed');
            cartContent.innerHTML = ''; 
            total = 0; 
            totalElement.textContent = `Kes ${total.toFixed(2)}`; 
        }
    });
});
