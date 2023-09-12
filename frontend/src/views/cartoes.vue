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
            name="cardNumber"
            v-model="formData.cardNumber" 
            placeholder="Enter card number"
            required
          />
        </div>
        <div class="form-group">
          <label for="expiry-date">Expiry Date:</label>
          <input
            type="text"
            id="expiry-date"
            name="expiryDate" 
            v-model="formData.expiryDate" 
            placeholder="MM/YY"
            required
          />
        </div>
        <div class="form-group">
          <label for="cvv">CVV:</label>
          <input
            type="text"
            id="cvv"
            name="cvv" 
            v-model="formData.cvv"
            placeholder="Enter CVV"
            required
          />
        </div>
        <button type="submit" @click.prevent="teste" class="submit-button">Add Card</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const formData = ref({
  cardNumber: '',
  expiryDate: '',
  cvv: '',
});

const router = useRouter();

const addCreditCard = async () => {
  // Perform credit card addition logic here
  // You can access form data via formData object
  const cardData = {
    cardNumber: formData.cardNumber,
    expiryDate: formData.expiryDate,
    cvv: formData.cvv,
  };

  const response = await fetch('https://localhost:8000/cartoes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nome:"teste",
      numero_cartao: cardData.cardNumber,
      cvv: cardData.cvv,
      validade: cardData.expiryDate,
    }),
  })
  
  if (!response.ok) {
    alert("error");
  }
  else {
    alert("coloca a página que tu quer ir")
  }

  // Send cardData to the server for processing
  // For example, make an API POST request
  // After successful addition, you can navigate to another route
  // router.push('/success'); // Replace '/success' with your desired success route
};

const teste = async () => {
  
}

// Update the model value manually
formData.cardNumber = '1234567890123456';
formData.expiryDate = '12/24';
formData.cvv = '123';
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
   font-size :24px; 
   text-align :center; 
   margin-bottom :20px; 
   color :#333; 
}

.form-group {
   margin-bottom :15px; 
}

label {
   font-size :16px; 
   display :block; 
   margin-bottom :5px; 
   color :#555; 
}

input[type='text'] {
   width :100%; 
   padding :10px; 
   font-size :16px; 
   border-radius :5px; 
   outline :none; 
   border :1px solid #ddd; 
}

.submit-button {
   background-color:#007bff; 
   color:#fff; 
   border:none; 
   border-radius :5px; 
   padding :10px; 
   font-size :18px; 
   cursor:pointer; 
   width :100%; 
   transition :background-color .3s ease; 
}

.submit-button:hover {
   background-color:#0056b3; 
}
</style>
