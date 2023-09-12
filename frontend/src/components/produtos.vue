<template>
  <div class="secao">
    <div class="tituloprod">Lorem ipsum dolor sit amet consectetur adipis.</div>
    <div class="produtos-container">
      <div class="produtos"><img class="moldura" src="../components/imagens/pc gamer.png" alt="Descrição da imagem" width="200" height="200"></div>
      <div class="produtos"><img class="moldura" src="../components/imagens/other-product.png" alt="Descrição da imagem" width="200" height="200"></div>
      <div class="produtos"><img class="moldura" src="../components/imagenspc gamer.png" alt="Descrição da imagem" width="200" height="200"></div>
      <div class="produtos"><img class="moldura" src="../components/imagensother-product.png" alt="Descrição da imagem" width="200" height="200"></div>
      <!-- Add more "produtos" elements as needed -->
    </div>
  </div>
  <div class="featured">
    <div class="tituloprod">Featured itens</div>
    <div class="bannercontainer">
      <div class="produtosbannerred"><img class="moldurabanner" src="../components/imagens/pc gamer.png" alt="Descrição da imagem" width="400" height="400">Pc Gamer Pichau</div>
      <div class="produtosbannergreen"><img class="moldurabanner" src="../components/imagens/karambit.png" alt="Descrição da imagem" width="400" height="400">Fake Natty Plus</div>
    </div>
  </div>
</template>

<style scoped>
*{
    margin: 0px 30px;
    padding: 0;
    font-family: 'ZZYZX', sans-serif;
    box-sizing: border-box;

}
@font-face {
    font-family: ZZYZX;
    src: url(../components/fonts/ZZYZX.TTF);
}
  .tituloprod {
    margin-top: 30px;
    background-color: transparent;
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    text-align: center;
    justify-content: center;
    font-size: 40px;
    font-weight: 600;
    margin-bottom: 45px;
  }

  .produtos-container {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap; /* Allow products to wrap to the next line */
  }

  .produtos {
    background-color: transparent;
    text-align: center;
    font-size: 40px;
    font-weight: 600;
    margin: 0 10px; /* Add some spacing between "produtos" elements */
  }
  .produtosbannerred{
      background-color: transparent;
      width: 450px;
      text-align: center;
      font-size: 40px;
      font-weight: 600;
      margin: 0 10px; /* Add some spacing between "produtos" elements */
      border-radius: 10px;
      border: 5px solid #fff; /* Add a white border */
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.3); /* Add a shadow effect */
      transition: transform 0.3s ease-in-out; /* Add a smooth transition */
  }
  .produtosbannergreen{
      background-color: transparent;
      width: 450px;
      text-align: center;
      font-size: 40px;
      font-weight: 600;
      margin: 0 10px; /* Add some spacing between "produtos" elements */
      border-radius: 10px;
      border: 5px solid #fff; /* Add a white border */
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.3); /* Add a shadow effect */
      transition: transform 0.3s ease-in-out; /* Add a smooth transition */
  }
  .moldura {
    border-radius: 10px;
    border: 5px solid #fff; /* Add a white border */
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3); /* Add a shadow effect */
    transition: transform 0.3s ease-in-out; /* Add a smooth transition */
  }
  
  .featured {
    display: flex;
    flex-direction: column; /* Change to a column layout */
    text-align: center;
    justify-content: center;
    background-color: transparent;
    font-size: 40px;
    font-weight: 600;
    margin: 30px 10px; /* Add some spacing between "produtos" elements */
    height: 100%;
    width: 100%;
  }

  .bannercontainer {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap; /* Allow products to wrap to the next line */
    transition: transform 0.5s ease-in-out; /* Add a smooth transition */
  }
  .bannercontainer:hover {
    transform: scale(1.05); /* Scale up the image on hover for a cool effect */
  }
</style>
