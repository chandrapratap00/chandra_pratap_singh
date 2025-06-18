const productList = document.getElementById('productList');
const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const sortOptions = document.getElementById('sortOptions');

let currentProducts = [];

// Fetch all products on load
window.addEventListener('load', () => {
    fetchProducts('https://dummyjson.com/products');
});

// Search button click
searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query === '') {
        alert('Please enter a search term!');
        return;
    }
    const searchURL = https://dummyjson.com/products/search?q=${encodeURIComponent(query)};
    fetchProducts(searchURL);
});

// Sort option change
sortOptions.addEventListener('change', () => {
    sortAndDisplayProducts();
});

// Fetch and display products
function fetchProducts(apiURL) {
    fetch(apiURL)
        .then(res => res.json())
        .then(data => {
            currentProducts = data.products || [];
            sortAndDisplayProducts();
        })
        .catch(err => {
            console.error('Error fetching products:', err);
            productList.innerHTML = '<p>Error loading products.</p>';
        });
}

// Sort and display products
function sortAndDisplayProducts() {
    let sortedProducts = [...currentProducts];
    const sortValue = sortOptions.value;

    if (sortValue === 'price-asc') {
        sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortValue === 'price-desc') {
        sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortValue === 'rating-asc') {
        sortedProducts.sort((a, b) => a.rating - b.rating);
    } else if (sortValue === 'rating-desc') {
        sortedProducts.sort((a, b) => b.rating - a.rating);
    }

    displayProducts(sortedProducts);
}

// Display products
function displayProducts(products) {
    productList.innerHTML = '';

    if (products.length === 0) {
        productList.innerHTML = '<p>No products found.</p>';
        return;
    }

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product';
        productCard.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p><strong>Price:</strong> $${product.price}</p>
            <p><strong>Rating:</strong> ${product.rating}</p>
        `;
        productList.appendChild(productCard);
    });
}
