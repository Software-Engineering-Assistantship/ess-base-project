<template>
  <div class="submit-review-page">
    <div class="credit-card-form">
      <h1 class="page-title">Add Review</h1>
      <form @submit.prevent="submit_review">
        <div class="form-group">
          <label for="user">User:</label>
          <input
            type="text"
            id="user"
            name="user" 
            v-model="formData.user" 
            placeholder="Enter user"
            required
          />
        </div>
        <div class="form-group">
          <label for="company">Company:</label>
          <input
            type="text"
            id="company"
            name="company" 
            v-model="formData.company" 
            placeholder="Enter company name"
            required
          />
        </div>
        <div class="form-group">
          <label for="stars">Stars:</label>
          <input
            type="text"
            id="stars"
            name="stars"
            v-model="formData.stars" 
            placeholder="Enter stars"
            required
          />
        </div>
        <div class="form-group">
          <label for="comment">Comment:</label>
          <input
            type="text"
            id="comment"
            name="comment"
            v-model="formData.comment" 
            placeholder="Enter comment"
            required
          />
        </div>
        <button type="submit" class="submit-button">Submit Review</button>
      </form>
    </div>
  </div>
</template>

<script setup>

import { ref } from 'vue';
import { useRouter } from 'vue-router';

const formData = ref({
  user: '',
  company: '',
  stars: '',
  comment: '',
});

const router = useRouter();

const toReview = () => {
  router.push('/review');
};

const submit_review = async () => {
  const response = await fetch('http://localhost:8000/submit_review', {
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
    router.push('/review');
  }
};
</script>

<style scoped>
.submit-review-page {
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
