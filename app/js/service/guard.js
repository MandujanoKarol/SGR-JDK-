auth.onAuthStateChanged(user =>{
    if(user){
      ObtenerTrabajos()
  }
  else{
    window.location.href = "ingresar.html";
  }
  });

  function CerrarSesion(){

    auth.signOut().then(() => {
        console.log("Sesión cerrada")
        window.location.href = "ingresar.html";
    });
}
