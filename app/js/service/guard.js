auth.onAuthStateChanged(user =>{
  if(user){  
  }
  else{
   // window.location.href = "ingresar.html";
  }
  });

  function CerrarSesion(){

    auth.signOut().then(() => {
        console.log("Sesión cerrada");
        localStorage.removeItem("2e37e564c6bb5eef21eaf97c5ea876f0c3ca26498c864d40efaa8db640d088c3");
        localStorage.removeItem("b84eea7076a27fccba11fb66c9bb611a7872ed66eb593c9492afdc47e10d13af");
        window.location.href = "ingresar.html";
    });
}
