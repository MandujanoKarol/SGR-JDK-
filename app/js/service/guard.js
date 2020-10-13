$(document).ready(function () {
    var user = auth.currentUser; 
    if (user != null) { 
        console.log(user.uid);
        db.collection('cuentasusuarios').doc(user.uid).get().then(doc => {
            if (doc.data().tipo === 0) {
                window.location.href = "solicitante.html";
            } else if (doc.data().tipo === 1) {
                window.location.href = "trabajador.html";
            }
        }).catch(function (error) {
            floatingMessage(error.code, "", "firebase");
        });
    }else{
        window.location.href = "ingresar.html";
    }   
});