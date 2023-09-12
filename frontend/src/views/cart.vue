<script setup>



</script>




<template>
  <div class="checkout-page">
    <div class="payment-container">
      <h1 class="checkout-header">Checkout</h1>
      <div class="cart-items">
        <!-- Product 1 -->
        <div class="cart-item">
          <img src="product-image.jpg" alt="Product Image" class="product-image">
          <div class="product-details">
            <h2 class="product-name">Camisinha Hulk</h2>
            <p class="product-price">$19.99</p>
            <p class="product-quantity">Quantity: 2</p>
          </div>
          <button class="remove-button">Remove</button>
        </div>

        <!-- Product 2 -->
        <div class="cart-item">
          <img src="product2-image.jpg" alt="Product Image" class="product-image">
          <div class="product-details">
            <h2 class="product-name">Product 2</h2>
            <p class="product-price">$29.99</p>
            <p class="product-quantity">Quantity: 1</p>
          </div>
          <button class="remove-button">Remove</button>
        </div>

        <!-- Product 3 -->
        <div class="cart-item">
          <img src="product3-image.jpg" alt="Product Image" class="product-image">
          <div class="product-details">
            <h2 class="product-name">Product 3</h2>
            <p class="product-price">$14.99</p>
            <p class="product-quantity">Quantity: 3</p>
          </div>
          <button class="remove-button">Remove</button>
        </div>
        <!-- Repeat for additional products -->
      </div>
      <div class="cart-total">
        <p class="total-text">Cart Total:</p>
        <p class="total-amount">$114.94</p>
      </div>
      <button class="checkout-button" @click="checkout">Proceed to Checkout</button>
    </div>
  </div>
</template>


<style scoped>
.checkout-page {
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(135deg, #f06, #ffc);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.payment-container {
  background-color: white;
  padding: 20px;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.checkout-header {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.product-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 10px;
}

.product-details {
  flex-grow: 1;
}

.product-name {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.product-price {
  font-size: 16px;
  color: #777;
}

.product-quantity {
  font-size: 14px;
  color: #888;
}

.remove-button {
  background-color: #ff3c3c;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  font-weight: 600;
}

.cart-total {
  margin-top: 20px;
  font-size: 18px;
}

.total-text {
  color: #333;
}

.total-amount {
  color: #ff5722;
  font-weight: 600;
  font-size: 20px;
  margin-top: 5px;
}

.checkout-button {
  background: linear-gradient(315deg, #00ccff, #d400d4);
  border: none;
  border-radius: 20px;
  color: #fff;
  font-weight: 600;
  font-size: 18px;
  padding: 10px 20px;
  margin-top: 30px;
  cursor: pointer;
}

.checkout-button:hover {
  background: linear-gradient(315deg, #00ccff, #d400d4);
  transform: scale(1.05);
}
</style>
