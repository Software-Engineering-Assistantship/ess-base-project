<script setup>
</script>

<template>
    <div class="boxtelainicial">
        <div class="subboxtelainicial">
            <div class="textbox">O gerente</div>
            <div class="smalltextbox">ficou completamente maluco!</div>
            <div>
                <div class="evensmallertext">agradeçam à lenda Ian Gabriel Braga Trinta</div>
                <div class="evensmallertext2">e ao seu fiel ajudante Luiz Mamals</div>
            </div>
            <div class="botao">AAAAAAAAAAA</div>

    </div>
        <div class="produto">
            <img  class= "imagem" src="../components/lmao.png" alt="Descrição da imagem">
        </div>
    </div>
  </template>
  
  <style>
  
    @font-face {
        font-family: ZZYZX;
        src: url(../components/fonts/ZZYZX.TTF);
    }





  * {
    margin: 0;
    padding: 0;
    font-family: 'ZZYZX', sans-serif;
  }
  .botao{
    width: 50px;
    background-color: #000000;
    color: #ffffff;
    position: fixed;
    

    z-index: 999;
    display: flex;
    
    padding: 0 50px;
    border-radius: 10px;
  }
  .produto{
    flex: 1; /* A imagem ocupa o espaço restante na caixa */
    display: flex;
    justify-content: flex-end; /* Alinha a imagem à direita */
    align-items: center; /* Centraliza verticalmente a imagem */
    padding-right: 20px; /* Espaçamento à direita da imagem */
    width: 80%;
  }
  
    .subboxtelainicial{
        padding-left: 3%;
    }
    .textbox {
        font-size: 34px;
        color: #000000;
        font-size: 65px;
        font-weight: 600;
        text-decoration: none;
        text-transform: uppercase;
        letter-spacing: 2px;
        font-weight: bold;
        margin-bottom: 0;
        transition: all 0.6s ease-in-out;
    }
    .textbox:hover{
      font-size: 75px;
    }
    .smalltextbox {
        font-size: 28px;
        color: #000000;
        margin-top: 0;
        font-size: 45px;
        font-weight: 600;
        text-decoration: none;
        text-transform: uppercase;
        letter-spacing: 2px;
        font-weight: bold;
    }
    .smalltextbox:hover{
      font-size: 50px;
      transition: all 0.6s ease-in-out;
    }
    .evensmallertext {
        font-size: 20px;
        color: #888888;
        font-size: 16px;
        font-weight: 600;
        text-decoration: none;
        text-transform: uppercase;
        letter-spacing: 2px;
        font-weight: bold;
        margin-top: 3%;
    }
    .evensmallertext:hover{
      font-size: 20px;
      transition: all 0.6s ease-in-out;
    }
    .evensmallertext2:hover{
      font-size: 20px;
      transition: all 0.6s ease-in-out;
    }
    .evensmallertext2 {
        font-size: 1px;
        color: #888888;
        font-size: 16px;
        font-weight: 600;
        text-decoration: none;
        text-transform: uppercase;
        letter-spacing: 2px;
        font-weight: bold;
    }
    
  
  .boxtelainicial {
    width: 95%;
    height: 70%;
    background-color: transparent;
    color: #aa9a9a;
    position: fixed;
    top: 8vh;
    left: 50%;
    transform: translateX(-50%); /* Use transform to center horizontally */
    z-index: 999;
    display: flex;
    align-items: center;
    padding: 0 50px;
    
    border-radius: 10px;
  }
  </style>
  
