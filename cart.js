document.addEventListener("DOMContentLoaded", function () {
    const addToCartButton = document.getElementById("add-to-cart");

    addToCartButton.addEventListener("click", function () {
        const product = {
            id: new URLSearchParams(window.location.search).get("id"), // ID otetaan URL:stä
            name: document.getElementById("product-title").textContent,
            description: document.getElementById("product-description").textContent,
            price: document.getElementById("product-price").textContent,
            image: document.getElementById("product-image").src
        };

        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));

        updateCartCount();
        alert(`${product.name} lisätty ostoskoriin!`);
    });

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        document.getElementById("cart-count").textContent = cart.length;
    }

    updateCartCount();
});