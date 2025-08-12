function addToCart() {
  const quantityInput = document.getElementById("quantity");
  let quantity = 1;
  if (quantityInput) {
    quantity = parseInt(quantityInput.value) || 1;
  }
  // Retrieve existing cart or initialize
  const cartData = JSON.parse(localStorage.getItem("sydney_cart")) || { quantity: 0, product: null };
  // If product already stored, just increase quantity; otherwise set product info and set quantity
  const productInfo = {
    id: "sydney-shirt",
    title: "Sydney's Used T-Shirt",
    price: 999,
    img: "images/1.jpg"
  };
  cartData.product = cartData.product || productInfo;
  cartData.quantity = (cartData.quantity || 0) + quantity;
  localStorage.setItem("sydney_cart", JSON.stringify(cartData));

  // Update badge immediately
  const badge = document.getElementById("cartBadge");
  if (badge) badge.textContent = cartData.quantity;

  alert("🛒 " + quantity + " t-shirt(s) added to your cart!");
}

function showScent() {
  const modal = new bootstrap.Modal(document.getElementById('scentModal'));
  modal.show();
}