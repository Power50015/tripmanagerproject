<template>
<div class="load">
    <div class='loding'>
  <span></span>
  <span></span>
</div>
</div>

</template>

<script>
</script>

<style scoped>
.load{
        position: absolute;
    right: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #212529;
}
.loding{
  posistion:relative;
  width:500px;
  height:500px;
  margin:50px auto;
}
.loding > span {
  position:absolute;
  border-radius:50%;
  margin:150px 150px auto;
  
  
}
.loding span:nth-of-type(1){
  border:3px solid aqua;
  border-top:3px solid transparent;
  width:200px;
  height:200px;
  border-bottom:3px solid transparent;
  animation:circle 1s ease-in-out infinite ; 

}
.loding span:nth-of-type(2){
  border:3px solid aqua;
  border-top:3px solid transparent;
  border-bottom:3px solid transparent;
  width:100px;
  height:100px;
  left:0;
  top:0;
  bottom:0;
  right:0;
  margin: 250px  auto;
   animation:circle-black 2s ease-in-out infinite ;
  animation-direcation:reverse;

}
@keyframes circle{
  0%{
    transform:rotate(0deg)
    
  }
  100%{
       opacity:.3;
        transform:rotate(360deg)

    
  }
}

@keyframes circle-black{
  0%{
    transform:rotate(0deg)
    
  }
  100%{
       opacity:.3;
        transform:rotate(360deg);
    border:3px solid aqua;


    
  }
}
.head h1{
  color:whitesmoke; 
  text-align:center;
  font-size:25px;
  font-family:Thamos 
    
}
.head h1:hover{
  background:black;
  color:whitesmoke  ; 
  border-radius:10px; 
  opacity:.8; 
  
}
</style>