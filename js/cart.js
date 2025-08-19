// js/cart.js

let cartData = JSON.parse(localStorage.getItem("sydney_cart")) || [];

// Render cart items
function renderCart() {
  if (!cartContent) return;

  if (cartData.length > 0) {
    cartContent.innerHTML = cartData.map((item, index) => `
      <div class="card mx-auto mb-3" style="max-width:540px;">
        <div class="row g-0 align-items-center">
          <div class="col-md-4">
            <img src="${item.img}" class="img-fluid rounded-start p-2" alt="${item.title}">
          </div>
          <div class="col-md-8">
            <div class="card-body text-start">
              <h5 class="card-title">${item.title}</h5>
              <p class="card-text mb-1">Price: ₹${item.price}</p>
              <p class="card-text">Quantity: <strong id="cartQty-${index}">${item.qty}</strong></p>
              <p class="card-text"><small class="text-muted">Total: ₹${item.qty * item.price}</small></p>
              <div class="d-flex gap-2 mt-2">
                <button onclick="updateQty(${index}, -1)" class="btn btn-sm btn-outline-danger">−</button>
                <button onclick="updateQty(${index}, 1)" class="btn btn-sm btn-outline-primary">+</button>
                <button onclick="removeItem(${index})" class="btn btn-sm btn-outline-secondary">Remove</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `).join("");

    if (checkoutSection) checkoutSection.style.display = "block";

  } else {
    cartContent.innerHTML = "<p>Your cart is empty. Add some T-shirts!</p>";
    if (checkoutSection) checkoutSection.style.display = "none";
  }

  updateCartBadge();
}

// Save + update badge
function saveCart() {
  localStorage.setItem("sydney_cart", JSON.stringify(cartData));
  renderCart();
}

// Increase/decrease quantity
function updateQty(index, change) {
  cartData[index].qty += change;
  if (cartData[index].qty <= 0) {
    cartData.splice(index, 1);
  }
  saveCart();
}

// Remove item completely
function removeItem(index) {
  cartData.splice(index, 1);
  saveCart();
}

// Update badge count
function updateCartBadge() {
  const badge = document.getElementById("cartBadge");
  if (badge) {
    const totalQty = cartData.reduce((sum, item) => sum + item.qty, 0);
    badge.textContent = totalQty;
  }
}

// On page load
document.addEventListener("DOMContentLoaded", () => {
  if (cartContent) renderCart();
  updateCartBadge();
});

// Expose globally (needed for inline onclick)
window.updateQty = updateQty;
window.removeItem = removeItem;
