var showPass = 0;
$('.btn-show-pass').on('click', function(){
if(showPass == 0) {
$(this).next('input').attr('type','text');
$(this).find('i').removeClass('mdi-eye');
$(this).find('i').addClass('mdi-eye-off');
showPass = 1;
}
else {
$(this).next('input').attr('type','password');
$(this).find('i').addClass('mdi-eye');
$(this).find('i').removeClass('mdi-eye-off');
showPass = 0;
}

});

////DOM form  LogIn
const formLogIn =  document.getElementById('formLogIn'); 
////DOM form  LogIn event  submit on button LogIn
formLogIn.addEventListener('submit',(e)=>{
    e.preventDefault();
    ///print test
    console.log(formLogIn['email'].value+"  "+formLogIn['password'].value ); 
    ////Data
    let email = formLogIn['email'].value;
    let password = formLogIn['password'].value; 
    ////if the navigator containe geolocation
    if (navigator.geolocation) {  
        ///signIn With Email And Password
        auth.signInWithEmailAndPassword(email,password).then( cred =>{   
        ///SAVE key current user on localStorage
        localStorage.removeItem("uid");
        localStorage.setItem("uid", cred.user.uid);
            ///get Current Position
            navigator.geolocation.getCurrentPosition(function(position) { 
                ///coords
                var coords = {
                    Latitud: position.coords.latitude, 
                    Longitud: position.coords.longitude
                } 
                ///update user data on database firebase
                return db.collection('cuentasusuarios').doc(cred.user.uid).update({
                    "coordenadas":coords,
                    "estado":parseInt(1)
                }).then(function(result) { 
                    db.collection('cuentasusuarios').doc(cred.user.uid).get().then( doc =>{
                      
                       if(doc.data().tipo==="usuario"){
                        window.location.href = "homeUsuario.html"; 
                       }else if(doc.data().tipo === "restaurante"){
                        window.location.href = "homeRestaurante.html"; 
                       }else if(doc.data().tipo === "repartidor"){
                        window.location.href = "homeRepartidor.html"; 
                        }
                    }); 
                }).catch(function(error) {
                    floatingMessage(error.code,"","firebase");
                }); 
            }, function(error) { 
                floatingMessage(error.title,error.message,"error");
            }); 
        }).catch( err => { 
            floatingMessage(err.code,"","firebase");
        });
    } else {
         ///error print console
        console.log("Ubication error");
    }
    
});