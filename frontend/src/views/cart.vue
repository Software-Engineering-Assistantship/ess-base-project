<template>
    <div class="tela">
      <div class="pagamentogrid">
        <!-- Your content goes here -->
        <div class="payment-container">
          <h1>Cart</h1>
          <p>Cart Items: {{ cartItems }}</p>
          <p>Cart Total: {{ cartTotal }}</p>
          <button class="botao" @click="checkout">Checkout</button>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </template>
  
  <style scoped>
  *{
    background: url('../components/imagens/cool-background.png');
  }
  .tela {
    width: 100%;
    height: 100vh;
    background-color: aqua;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  
  .pagamentogrid {
    width: 400px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .payment-container {
    background-color: white;
    padding: 20px;
    text-align: center;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .botao {
    display: flex;
    text-align: center;
    justify-content: center;
    padding: 8px 20px;
    background: linear-gradient(315deg, #00ccff, #d400d4);
    border-radius: 20px;
    margin-top: 30px;
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
  </style>
  