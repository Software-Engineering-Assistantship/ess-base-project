<script>
import axios from 'axios';

export default {
  data () {
    return{
      posts: []
    }
  },
  mounted(){
    axios.get('https://jsonplaceholder.typicode.com/posts/1')
    .then(response => {
      this.posts = response.data
    })
  }
}
</script>






<template>
  <h2>{{ posts.id }}{{ posts.title }}</h2>
  <p>{{ posts.body }}</p>
</template>
  
  <style scoped>
  *{
    background-color: red;
    height: 1920px;
  }
  </style>
  

