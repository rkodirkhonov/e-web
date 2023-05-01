// DOM elements
// The script is not fully connected and completed

const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu");
const menuNav = document.querySelector(".menu-nav");
const menuBranding = document.querySelector(".menu-branding");
const navItems = document.querySelectorAll(".nav-item");

// Initial state of the menu
let showMenu = false;

// Toggle the menu
const toggleMenu = () => {
  if (!showMenu) {
    menuBtn.classList.add("close");
    menu.classList.add("show");
    menuNav.classList.add("show");
    menuBranding.classList.add("show");
    navItems.forEach((item) => item.classList.add("show"));

    // Set menu state
    showMenu = true;
  } else {
    menuBtn.classList.remove("close");
    menu.classList.remove("show");
    menuNav.classList.remove("show");
    menuBranding.classList.remove("show");
    navItems.forEach((item) => item.classList.remove("show"));

    // Set menu state
    showMenu = false;
  }
};

// Event listeners
menuBtn.addEventListener("click", toggleMenu);

// Products page filter
const filterBtns = document.querySelectorAll(".filter-btn");
const products = document.querySelectorAll(".product");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Get the category
    const category = btn.dataset.filter;

    // Filter the products
    products.forEach((product) => {
      if (product.dataset.category === category || category === "all") {
        product.classList.remove("hide");
      } else {
        product.classList.add("hide");
      }
    });

    // Add the active class to the clicked button
    filterBtns.forEach((btn) => btn.classList.remove("active"));
    btn.classList.add("active");
  });
});

// Cart page functionality
const cartItems = document.querySelector(".cart-items");
const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");
const cartBadge = document.querySelector(".cart-badge");
const cartItemsContainer = document.querySelector(".cart-items-container");
const totalPrice = document.querySelector(".total-price");

let cart = [];

// Check if a product is already in the cart
const isInCart = (productID) => {
  let result = false;
  cart.forEach((item) => {
    if (item.id === productID) {
      result = true;
    }
  });
  return result;
};

// Add a product to the cart
const addToCart = (product) => {
  // Check if the product is already in the cart
  if (!isInCart(product.id)) {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
    });
  } else {
    // If the product is already in the cart, increase its quantity
    cart.forEach((item) => {
      if (item.id === product.id) {
        item.quantity += 1;
      }
    });
  }

  // Update the cart badge and cart items
  cartBadge.innerHTML = cart.length;
  updateCartItems();
  updateTotalPrice();
};

// Update the cart items
const updateCartItems = () => {
    cartItems.innerHTML = "";
    cart.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
        <div class="cart-item-title">${item.title}</div>
        <div class="cart-item-price">${item.price} €</div>
        <div class="cart-item-quantity">${item.quantity}</div>
        <div class="cart-item-remove-btn" data-id="${item.id}">
          <button class="remove-btn">Remove</button>
        </div>
      `;
      cartItems.appendChild(cartItem);
    });
    updateCartTotal();
  }; 