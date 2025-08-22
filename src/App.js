
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');
hamburger.addEventListener('click', () => {
  nav.classList.toggle('active');
});


const productGrid = document.getElementById('product-grid');
const API_URL = "https://fakestoreapi.com/products?limit=8";


function createProductCard(product) {
  const card = document.createElement('div');
  card.classList.add('product-card');

  card.innerHTML = `
    <img src="${product.image}" alt="${product.title}" loading="lazy">
    <h3>${product.title.substring(0, 25)}...</h3>
    <p>$${product.price.toFixed(2)}</p>
    <button>Add to Cart</button>
  `;

  return card;
}


async function loadProducts() {

  productGrid.innerHTML = `<div class="loading-spinner"></div>`;

  try {
    
    const cachedData = localStorage.getItem("products");
    if (cachedData) {
      displayProducts(JSON.parse(cachedData));
      return;
    }

   
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Network error");

    const products = await response.json();

  
    localStorage.setItem("products", JSON.stringify(products));

    displayProducts(products);
  } catch (error) {
    console.error("Error loading products:", error);
    productGrid.innerHTML = `<p class="error-message">⚠️ Failed to load products. Please try again later.</p>`;
  }
}


function displayProducts(products) {
  productGrid.innerHTML = ""; 
  products.forEach(product => {
    const card = createProductCard(product);
    productGrid.appendChild(card);
  });
}


loadProducts();
