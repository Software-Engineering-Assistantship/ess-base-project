<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const toSubmitReview = () => {
    router.push('/submit_review');
  };
  
</script>

<template>
  <div>
    <h1 class="page-title">Reviews</h1>

    <div class="add">
      <button class="botao" @click="toSubmitReview">Adicionar uma review</button>
    </div>

    <form @submit.prevent="get_reviews">
      <div class="form-group">
        <label for="get_reviews">Search Reviews:</label>
        <input
          type="text"
          id="get_reviews"
          name="get_reviews"
          v-model="formData.get_reviews"
          placeholder="Enter company name"
          required
        />
      </div>
      <button type="submit" class="submit-button">Search</button>
    </form>

    <ul>
      <li v-for="(review, index) in Reviews" :key="index">
        <div class="review-item">
          <div class="review-info">
            <span class="review-user">User: {{ review.user }}</span>
            <!-- <span class="review-id">ID: {{ review.id }}</span>--> 
            <span class="review-company">Company: {{ review.company }}</span>
            <span class="review-stars">Stars: {{ review.stars }}</span>
            <p class="review-comment">Comment: {{ review.comment }}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  
  data() {
    return {
      Reviews: [],
      formData: {
        get_reviews: '',
      },
    };
  },
  methods: {
    async get_reviews() {
      if (this.formData.get_reviews.trim() !== '') {
        try {
          const url = `http://localhost:8000/get_reviews/${this.formData.get_reviews}`;
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (response.ok) {
            const data = await response.json();
            this.Reviews = data;
          } else {
            console.error('Failed to fetch reviews.');
          }
        } catch (error) {
          console.error('Error while fetching reviews:', error);
        }
      }
    },
  },
};
</script>

<style scoped>
.add {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.botao {
  display: flex;
  justify-content: center;
  padding: 8px 20px;
  background: linear-gradient(315deg, #00ccff, #d400d4);
  border-radius: 20px;
  text-decoration: none;
  color: #fff;
  width: 200px;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  transition: 0.5s;
}

.botao:hover {
  background: linear-gradient(315deg, #00ccff, #d400d4);
  transform: scale(1.05);
  transition: 0.5s;
}

.page-title {
  display: flex;
  text-align: center;
  justify-content: center;
  width: 200px;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.form-group {
  margin-top: 20px;
}

.form-group label {
  display: block;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.submit-button {
  display: block;
  margin-top: 20px;
  padding: 10px 20px;
  background: linear-gradient(315deg, #00ccff, #d400d4);
  border: none;
  border-radius: 20px;
  color: #fff;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
}

.submit-button:hover {
  background: linear-gradient(315deg, #00ccff, #d400d4);
}

.review-item {
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  padding: 10px;
  margin-top: 20px;
  border-radius: 5px;
  transition: background-color 0.2s;
}

.review-item:hover {
  background-color: #e0e0e0;
}

.review-info {
  display: flex;
  flex-direction: column;
}

.review-user {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
}

.review-company {
  font-size: 14px;
  color: #777;
}

.review-stars {
  font-size: 14px;
  color: #777;
}

.review-comment {
  font-size: 14px;
  margin-top: 5px;
}

</style>
