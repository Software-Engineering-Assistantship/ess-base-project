<template>
  <div class="credit-card-page">
    <div class="credit-card-form">
      <h1 class="page-title">Add Credit Card</h1>
      <form @submit.prevent="addCreditCard">
        <div class="form-group">
          <label for="card-number">Card Number:</label>
          <input
            type="text"
            id="card-number"
            v-model="cardNumber"
            placeholder="Enter card number"
            required
          />
        </div>
        <div class="form-group">
          <label for="expiry-date">Expiry Date:</label>
          <input
            type="text"
            id="expiry-date"
            v-model="expiryDate"
            placeholder="MM/YY"
            required
          />
        </div>
        <div class="form-group">
          <label for="cvv">CVV:</label>
          <input
            type="text"
            id="cvv"
            v-model="cvv"
            placeholder="Enter CVV"
            required
          />
        </div>
        <button type="submit" class="submit-button">Add Card</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const cardNumber = ref('');
const expiryDate = ref('');
const cvv = ref('');

const addCreditCard = () => {
  // Perform credit card addition logic here
  // For example, send data to a server, validate, etc.

  // After successful addition, you can navigate to another route
  router.push('/success'); // Replace '/success' with your desired success route
};
</script>

<style scoped>
.credit-card-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.credit-card-form {
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 10px;
  width: 300px;
}

.page-title {
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-size: 16px;
  display: block;
  margin-bottom: 5px;
  color: #555;
}

input[type="text"] {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
}

.submit-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>
