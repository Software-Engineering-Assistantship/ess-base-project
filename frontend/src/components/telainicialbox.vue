<script setup>
</script>

<template>
    <div class="boxtelainicial">
        <div >
            <div class="textbox">O gerente</div>
            <div class="smalltextbox">ficou completamente maluco!</div>
            <div>
                <div class="evensmallertext">agradeçam à lenda Ian Gabriel Braga Trinta</div>
                <div class="evensmallertext2">e ao seu fiel ajudante Luiz Mamals</div>
                <div class="botao">Compre agora</div>
            </div>
            

    </div>
        <div class="produto">
        <!-- First line of products -->
        <div class="product-row">
          <img class="moldura" src="../components/imagens/lmao.png" alt="Descrição da imagem" width="200" height="200">
          <img class="moldura" src="../components/imagens/whey.png" alt="Descrição da imagem" width="200" height="200">
          
        </div>

        <!-- Second line of products -->
        <div class="product-row">
          <img class="moldura" src="../components/imagens/pc gamer.png" alt="Descrição da imagem" width="200" height="200">
          <img class="moldura" src="../components/imagens/one piece.png" alt="Descrição da imagem" width="200" height="200">
          <span>
            <img class="moldura" src="../components/imagens/pc.png" alt="Descrição da imagem" width="200" height="200">
          </span>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  
    @font-face {
        font-family: ZZYZX;
        src: url(../components/fonts/ZZYZX.TTF);
    }

  * {
    margin: 0;
    padding: 0;
    font-family: 'ZZYZX', sans-serif;
  }
  .moldura {
      border-radius: 10px;
      border: 5px solid #fff; /* Add a white border */
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.3); /* Add a shadow effect */
      transition: transform 0.3s ease-in-out; /* Add a smooth transition */
  }

  .moldura:hover {
      transform: scale(1.05); /* Scale up the image on hover for a cool effect */
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
        z-index: 999;
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
        z-index: 1000;
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
    height: 700px;
    background-color: #dcdcdc;
    color: #aa9a9a;
    position: relative;
    left: 50%;
    transform: translateX(-50%); /* Use transform to center horizontally */
    z-index: 100;
    display: flex;
    align-items: center;
    padding: 0 50px;
    
    border-radius: 10px;
  }
  .botao{
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
  .botao:hover{
    background: linear-gradient(315deg, #00ccff, #d400d4);
    transform: scale(1.05);
    transition: 0.5s;
  }
  .integrante a{
    
    display: inline-block;
    padding: 8px 20px;
    background: linear-gradient(315deg, #00ccff, #d400d4);
    border-radius: 20px;
    margin-top: 10px;
    text-decoration: none;
    color: #fff;
    font-weight: 500;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    transition: 0.5s;
}
  </style>
  
