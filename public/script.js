document.addEventListener('DOMContentLoaded', () => {
    const categoryLinks = document.querySelectorAll('.category-link');

    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.getAttribute('data-category');
            loadProducts(category);
        });
    });

    function loadProducts(category) {
        fetch(`/products/${category}`)
            .then(response => response.json())
            .then(products => {
                const productContainer = document.getElementById('product-list');
                productContainer.innerHTML = '';  // Clear previous products
                products.forEach(product => {
                    productContainer.innerHTML += `
                        <div class="product">
                            <img src="${product.image}" alt="${product.name}">
                            <h3>${product.name}</h3>
                            <p>Price: $${product.price}</p>
                            <button onclick="addToCart('${product._id}', '${product.name}', ${product.price})">Add to Cart</button>
                        </div>
                    `;
                });
            })
            .catch(err => console.error("Error loading products:", err));
    }
});

// Function to add a product to the cart
async function addToCart(productId, productName, productPrice) {
    try {
        const response = await fetch('/add-to-cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId, productName, productPrice }), // Send product details in request body
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json(); // Assuming your server responds with JSON
        alert(data.message); // Show a message from the server
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}
