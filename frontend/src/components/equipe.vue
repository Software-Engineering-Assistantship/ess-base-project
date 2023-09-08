<script setup>
</script>

<template>
    <div class="containerequipe">
        <div class="integrante">
            <img src="../components/minha foto.jpg" alt="">
        </div>




    </div>











</template>
  
<style>
*{
    margin: 0;
    padding: 0;
    font-family: 'ZZYZX', sans-serif;
    box-sizing: border-box;
}
@font-face {
    font-family: ZZYZX;
    src: url(../components/fonts/ZZYZX.TTF);
}
.integrante{
    position: absolute;
    inset: 30px;
    border: 6px solid #162052;
}
.containerequipe{
    position: relative;
    width: 200px;
    height: 200px;
    background-color: #000000;
    border-radius: 50%;
    overflow: hidden;
}
.containerequipe::before{
    content: '';
    position: absolute;
    inset: -5px 70px;
    background: linear-gradient(315deg, #00ccff, #d400d4);
    transition: 0.5s ease all;
    animation: animate 4s linear infinite;
}
.containerequipe:hover::before{
    inset: -20px 0px;
}
@keyframes animate{
    0%{
        transform: rotate(0deg);
    }
    100%{
        transform: rotate(360deg);
    }
}
.containerequipe::after{
    content: '';
    position: absolute;
    inset: 6px;
    background: #162052;
    border-radius: 50%;
    z-index: 1;
}
    


</style>
  
