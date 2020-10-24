$(document).ready(function() {   
    var uid = localStorage.getItem("b84eea7076a27fccba11fb66c9bb611a7872ed66eb593c9492afdc47e10d13af");   
    db.collection('cuentasusuarios').doc(uid).get().then( usuarioinfo => {   
        console.log(usuarioinfo.data());
        document.getElementById('nombreperfil').value = usuarioinfo.data().nombre;
    });
 
});  