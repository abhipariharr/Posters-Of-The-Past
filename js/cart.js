const cartData = JSON.parse(localStorage.getItem("sydney_cart")) || { quantity: 0, product: null };
const cartContent = document.getElementById("cartContent");
const checkoutSection = document.getElementById("checkoutSection");

function renderCart() {
  if (!cartContent) return;
  if (cartData.quantity > 0 && cartData.product) {
    cartContent.innerHTML = `
      <div class="card mx-auto" style="max-width:540px;">
        <div class="row g-0 align-items-center">
          <div class="col-md-4">
            <img src="${cartData.product.img}" class="img-fluid rounded-start p-2" alt="${cartData.product.title}">
          </div>
          <div class="col-md-8">
            <div class="card-body text-start">
              <h5 class="card-title">${cartData.product.title}</h5>
              <p class="card-text mb-1">Price: ₹${cartData.product.price}</p>
              <p class="card-text">Quantity: <strong id="cartQty">${cartData.quantity}</strong></p>
              <p class="card-text"><small class="text-muted">Total: ₹${cartData.quantity * cartData.product.price}</small></p>
              <div class="d-flex gap-2 mt-2">
                <button id="decreaseBtn" class="btn btn-sm btn-outline-danger">−</button>
                <button id="increaseBtn" class="btn btn-sm btn-outline-primary">+</button>
                <button id="clearBtn" class="btn btn-sm btn-outline-secondary">Remove</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    if (checkoutSection) checkoutSection.style.display = "block";
    // Attach handlers
    const inc = document.getElementById("increaseBtn");
    const dec = document.getElementById("decreaseBtn");
    const clr = document.getElementById("clearBtn");
    if (inc) inc.addEventListener("click", () => {
      cartData.quantity += 1;
      saveAndRerender();
    });
    if (dec) dec.addEventListener("click", () => {
      if (cartData.quantity > 1) {
        cartData.quantity -= 1;
      } else {
        cartData.quantity = 0;
        cartData.product = null;
      }
      saveAndRerender();
    });
    if (clr) clr.addEventListener("click", () => {
      cartData.quantity = 0;
      cartData.product = null;
      saveAndRerender();
    });
  } else {
    cartContent.innerHTML = "<p>Your cart is empty. Add some T-shirts!</p>";
    if (checkoutSection) checkoutSection.style.display = "none";
  }
  // Update badge if present
  const badge = document.getElementById("cartBadge");
  if (badge) badge.textContent = cartData.quantity || 0;
}

function saveAndRerender() {
  localStorage.setItem("sydney_cart", JSON.stringify(cartData));
  const qtyElem = document.getElementById("cartQty");
  if (qtyElem) qtyElem.textContent = cartData.quantity;
  const badge = document.getElementById("cartBadge");
  if (badge) badge.textContent = cartData.quantity || 0;
  renderCart();
}

document.addEventListener("DOMContentLoaded", () => {
  // If the page has cartContent, render cart
  if (cartContent) renderCart();
  const badge = document.getElementById("cartBadge");
  if (badge) {
    const stored = JSON.parse(localStorage.getItem("sydney_cart")) || { quantity: 0 };
    badge.textContent = stored.quantity || 0;
  }
});