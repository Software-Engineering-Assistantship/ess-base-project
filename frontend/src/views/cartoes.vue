<template>
  <div class="credit-card-page">
    <div class="credit-card-form">
      <h1 class="page-title">Add Credit Card</h1>
      <form @submit.prevent="addCreditCard">
        <div class="form-group">
          <label for="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome" 
            v-model="formData.nome" 
            placeholder="Enter your name"
            required
          />
        </div>
        <div class="form-group">
          <label for="card-number">Card Number:</label>
          <input
            type="text"
            id="card-number"
            name="numero_cartao" 
            v-model="formData.numero_cartao" 
            placeholder="Enter card number"
            required
          />
        </div>
        <div class="form-group">
          <label for="expiry-date">Expiry Date:</label>
          <input
            type="text"
            id="expiry-date"
            name="validade"
            v-model="formData.validade" 
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
        <button type="submit" class="submit-button">Add Card</button>
      </form>
    </div>
  </div>
</template>

<script setup>

import { ref } from 'vue';
import { useRouter } from 'vue-router';

const formData = ref({
  nome: '',
  numero_cartao: '',
  cvv: '',
  validade: '',
});

const router = useRouter();

const toCards = () => {
  router.push('/meuscartoes');
};

const addCreditCard = async () => {
  const response = await fetch('http://localhost:8000/cartoes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData.value),
  })
  
  if (!response.ok) {
    alert("Error");
  }
  else {
    alert(JSON.stringify(formData.value));
    router.push('/meuscartoes');
  }
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
