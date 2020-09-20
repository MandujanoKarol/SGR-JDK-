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
///Telefono
var input = document.querySelector("#phone");
  window.intlTelInput(input, {
    // any initialisation options go here
    // initial country
    initialCountry:"mx",
    //preferredCountries: ["mx","us" ],
    onlyCountries: ["mx"]
  }); 

 
////DOM form  LogIn
const formLogIn =   document.forms['loginForm'];
////DOM form  LogIn event  submit on button LogIn
formLogIn.addEventListener('submit',(e)=>{
    e.preventDefault();
    ///print test
    console.log(formLogIn['email'].value+"  "+formLogIn['password'].value ); 
    ////Data
    let email = formLogIn['email'].value;
    let password = formLogIn['password'].value;  
    ///signIn With Email And Password
        auth.signInWithEmailAndPassword(email,password).then( cred =>{   
        ///SAVE key current user on localStorage
        localStorage.removeItem("uid");
        localStorage.setItem("uid", cred.user.uid);  
                ///update user data on database firebase
                return db.collection('cuentasusuarios').doc(cred.user.uid).update({ 
                    "estado":parseInt(1)
                }).then(function(result) { 
                    db.collection('cuentasusuarios').doc(cred.user.uid).get().then( doc =>{
                    
                    if(doc.data().tipo===0){
                        window.location.href = "solicitante.html"; 
                    }else if(doc.data().tipo === 1){
                        window.location.href = "trabajador.html"; 
                    }
                    }); 
                }).catch(function(error) {
                    floatingMessage(error.code,"","firebase");
                });
        }).catch( err => { 
            floatingMessage(err.code,"","firebase");
        }); 
    
});
 