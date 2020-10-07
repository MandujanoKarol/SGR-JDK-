$(document).ready(function () {
    $.getJSON('https://geolocation-db.com/json/')
        .done(function (location) {
            console.log(location);
            /**$('#country').html(location.country_name);
            $('#state').html(location.state);
            $('#city').html(location.city);
            $('#latitude').html(location.latitude);
            $('#longitude').html(location.longitude);
            $('#ip').html(location.IPv4);**/
        });

    ///select genero 
    fetch('https://mandujanokarol.github.io/SGR-JDK-/app/js/service/gender.json').then(function (respuesta) {
        if (respuesta.ok) {
            respuesta.json().then(dato => {
                dato.forEach(function (entrada) {
                    var option = document.createElement("option");
                    option.value = entrada.Genero;
                    option.text = entrada.Genero;
                    document.getElementById("gender").add(option);
                });
            }).catch(function (error) {
                console.log(error.message);
            });
        } else {
            console.log(respuesta);
        }
    }).catch(function (error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
    });
    fetch('https://mandujanokarol.github.io/SGR-JDK-/app/js/service/oficios.json').then(function (respuesta) {
        if (respuesta.ok) {
            respuesta.json().then(dato => {
                dato.forEach(function (entrada) {
                    var option = document.createElement("option");
                    option.value = entrada.Oficio;
                    option.text = entrada.Oficio;
                    document.getElementById("oficio").add(option);
                });
            }).catch(function (error) {
                console.log(error.message);
            });
        } else {
            console.log(respuesta);
        }
    }).catch(function (error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
    });

    $('input[type=radio]').click(function () {
        document.getElementById("rd1").style = " ";
        document.getElementById("rd2").style = " ";
    });
});
$(function () {
    ///date input 18 years
    var dtToday = new Date();
    var month = dtToday.getMonth() + 1;// jan=0; feb=1 .......
    var day = dtToday.getDate();
    var year = dtToday.getFullYear() - 18;
    if (month < 10)
        month = '0' + month.toString();
    if (day < 10)
        day = '0' + day.toString();
    var minDate = year + '-' + month + '-' + day;
    var maxDate = year + '-' + month + '-' + day;
    $('#dob').attr('max', maxDate);
});


var showPass = 0;
$('.btn-show-pass').on('click', function () {
    if (showPass == 0) {
        $(this).next('input').attr('type', 'text');
        $(this).find('i').removeClass('mdi-eye');
        $(this).find('i').addClass('mdi-eye-off');
        showPass = 1;
    }
    else {
        $(this).next('input').attr('type', 'password');
        $(this).find('i').addClass('mdi-eye');
        $(this).find('i').removeClass('mdi-eye-off');
        showPass = 0;
    }

});
///INPUT Telefono
var input = document.querySelector("#phone");
var iti = window.intlTelInput(input, {
    // any initialisation options go here
    // initial country 
    initialCountry: "mx",
    //preferredCountries: ["mx","us" ],
    onlyCountries: ["mx"]
});






////DOM form  LogIn
const formLogIn = document.forms['loginForm'];
////DOM form  LogIn event  submit on button LogIn
formLogIn.addEventListener('submit', (e) => {
    e.preventDefault();
    ///print test
    console.log(formLogIn['txtemaillogin'].value + "  " + formLogIn['txtpasswordlogin'].value);
    ////Data
    let email = formLogIn['txtemaillogin'].value;
    let password = formLogIn['txtpasswordlogin'].value;
    ///signIn With Email And Password
    auth.signInWithEmailAndPassword(email, password).then(cred => {
        ///SAVE key current user on localStorage
        localStorage.removeItem("b84eea7076a27fccba11fb66c9bb611a7872ed66eb593c9492afdc47e10d13af");
        localStorage.setItem("b84eea7076a27fccba11fb66c9bb611a7872ed66eb593c9492afdc47e10d13af", cred.user.uid);
        ///update user data on database firebase
        return db.collection('cuentasusuarios').doc(cred.user.uid).update({
            "estado": parseInt(1)
        }).then(function (result) {
            db.collection('cuentasusuarios').doc(cred.user.uid).get().then(doc => {
                if (doc.data().tipo === 0) {
                    window.location.href = "solicitante.html";
                } else if (doc.data().tipo === 1) {
                    window.location.href = "trabajador.html";
                }
            });
        }).catch(function (error) {
            floatingMessage(error.code, "", "firebase");
        });
    }).catch(err => {
        floatingMessage(err.code, "", "firebase");
    });

});

////onblurs
function onblurnombre() {
    if (document.registerForm.txtnombreregister.value == "") {
        document.forms['registerForm'].elements["txtnombreregister"].style = "box-shadow: inset 0 0 0 4px #e60346;";
        return 1;
    }
    else if (!/^[a-zA-Z ]{3,30}$/.test(document.registerForm.txtnombreregister.value)) {
        document.forms['registerForm'].elements["txtnombreregister"].style = "box-shadow: inset 0 0 0 4px #e60346;";
        console.log(document.registerForm.txtnombreregister.value);
        return 1;
    }
    else {
        document.forms['registerForm'].elements["txtnombreregister"].style = " ";
        return 0;
    }
}
function onblurapellido() {
    ///Apellido
    if (document.forms["registerForm"]["txtapellidoregister"].value == "") {
        document.forms['registerForm'].elements["txtapellidoregister"].style = "box-shadow: inset 0 0 0 4px #e60346;";
        return 1;
    }
    else if (!/^[a-zA-Z ]{2,30}$/.test(document.registerForm.txtapellidoregister.value)) {
        document.forms['registerForm'].elements["txtapellidoregister"].style = "box-shadow: inset 0 0 0 4px #e60346;";
        return 1;
    }
    else {
        document.forms['registerForm'].elements["txtapellidoregister"].style = "";
        return 0;
    }
}
function onbluremail() {
    ///Correo electronico
    const testcorreo = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (document.forms["registerForm"]["txtemailregister"].value == "") {
        document.forms['registerForm'].elements["txtemailregister"].style = "box-shadow: inset 0 0 0 4px #e60346;";
        return 1;
    } else if (testcorreo.test(document.registerForm.txtemailregister.value.toLowerCase())) {
        document.forms['registerForm'].elements["txtemailregister"].style = " ";
        return 0;
    }
    else {
        document.forms['registerForm'].elements["txtemailregister"].style = "box-shadow: inset 0 0 0 4px #e60346;";
        return 1;
    }
}
function onblurpassword() {
    ///contrasena
    const testcontrasena = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (document.forms["registerForm"]["txtpasswordregister"].value == "") {
        document.forms['registerForm'].elements["txtpasswordregister"].style = "box-shadow: inset 0 0 0 4px #e60346;";
        return 1;
    }
    else if (testcontrasena.test(document.registerForm.txtpasswordregister.value)) {
        document.forms['registerForm'].elements["txtpasswordregister"].style = " ";
        return 0;
    }
    else {
        document.forms['registerForm'].elements["txtpasswordregister"].style = "box-shadow: inset 0 0 0 4px #e60346;";
        return 1;
    }
}
function onkeyuptelefono(){ 
    var tel=document.forms["registerForm"]["txttelefonoregister"].value;
    tel=tel.replace("-","").replace("(","").replace(")","").replace(" ","");
    var arraytel=Array.from(tel) 
    var length=arraytel.length; 
    if(length>10){   
        arraytel.pop();   
        var phoneNumberString = arraytel.join('');
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
        var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/) 
        if (match) {
            document.forms["registerForm"]["txttelefonoregister"].value = '(' + match[1] + ') ' + match[2] + '-' + match[3];
            document.forms['registerForm'].elements["txttelefonoregister"].style = " ";
            return 0;
        } 
    }
    if(length==10){
        var phoneNumberString = tel;
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
        var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/) 
        if (match) {
            document.forms["registerForm"]["txttelefonoregister"].value = '(' + match[1] + ') ' + match[2] + '-' + match[3];
            document.forms['registerForm'].elements["txttelefonoregister"].style = " ";
            return 0;
        }  
    }
}
function onblurtelefono() {
    if (document.forms["registerForm"]["txttelefonoregister"].value != "") {
        var tel=document.forms["registerForm"]["txttelefonoregister"].value.replace("-","").replace("(","").replace(")","").replace(" ","");
        if (tel.length == 10) {
            document.forms['registerForm'].elements["txttelefonoregister"].style = " ";
            return 0;
        } else {
            document.forms['registerForm'].elements["txttelefonoregister"].style = "box-shadow: inset 0 0 0 4px #e60346;";
            return 1;
        }
    } else {
        document.forms['registerForm'].elements["txttelefonoregister"].style = "box-shadow: inset 0 0 0 4px #e60346;";
        return 1;
    }
}
function onblurdireccion() {
    ///Direccion
    if (document.forms["registerForm"]["txtdireccionregister"].value == "") {
        document.forms['registerForm'].elements["txtdireccionregister"].style = "box-shadow: inset 0 0 0 4px #e60346;";
        return 1;

    }
    else if (!/^[a-zA-Z ]{3,30}$/.test(document.registerForm.txtdireccionregister.value)) {
        document.forms['registerForm'].elements["txtdireccionregister"].style = "box-shadow: inset 0 0 0 4px #e60346;";
        return 1;
    }
    else {
        document.forms['registerForm'].elements["txtdireccionregister"].style = " ";
        return 0;
    }
}
function onchangeselectoficio() {
    if ($("#oficio option:selected").text() != "Oficio") {
        document.forms['registerForm'].elements["seloficioregister"].style = " ";
        return 0;
    } else {
        document.forms['registerForm'].elements["seloficioregister"].style = "box-shadow: inset 0 0 0 4px #e60346;";
        return 1;
    }
}
function onchangeselectgener() {
    if ($("#gender option:selected").text() != "Genero") {
        document.forms['registerForm'].elements["selgeneroregister"].style = " ";
        return 0;
    } else {
        document.forms['registerForm'].elements["selgeneroregister"].style = "box-shadow: inset 0 0 0 4px #e60346;";
        return 1;
    }
}
function onchangeselectdate() {
    if (document.forms["registerForm"]["dateregister"].value != "") {
        document.forms['registerForm'].elements["dateregister"].style = " ";
        return 0;
    } else {
        document.forms['registerForm'].elements["dateregister"].style = "box-shadow: inset 0 0 0 4px #e60346;";
        return 1;
    }
}
function radioinputs() {
    if (document.getElementById('trabajador').checked != false || document.getElementById('solicitante').checked != false) {
        document.getElementById("rd1").style = " ";
        document.getElementById("rd2").style = " ";
        return 0;
    } else {
        document.getElementById("rd1").style = "box-shadow: inset 0 0 0 4px #e60346;";
        document.getElementById("rd2").style = "box-shadow: inset 0 0 0 4px #e60346;";
        return 1;
    }
}

////Funcion validar campos forms
function validarForms() {
    var errores = 0;

    errores += radioinputs();
    errores += onchangeselectdate();
    errores += onchangeselectgener();
    errores += onchangeselectoficio();
    errores += onblurnombre();
    errores += onblurapellido();
    errores += onbluremail();
    errores += onblurpassword();
    errores += onblurtelefono();
    errores += onblurdireccion();


    if (errores == 0) {
        return true;
    } else {
        return false;
    }
};
////funcion click button
function validator() {
    if (validarForms().toString() == "true") {
        // register();
        var txtnombreregister=document.registerForm.txtnombreregister.value;
        console.log(txtnombreregister);
        var txtapellidoregister=document.registerForm.txtapellidoregister.value;
        console.log(txtapellidoregister);
        var txtemailregister=document.registerForm.txtemailregister.value;
        console.log(txtemailregister);
        var txtpasswordregister=document.registerForm.txtpasswordregister.value;
        console.log(txtpasswordregister);
        var dialCode=iti.getNumber();
        var txttelefonoregister=document.registerForm.txttelefonoregister.value;
        console.log(dialCode+" "+txttelefonoregister);
        var txtdireccionregister=document.registerForm.txtdireccionregister.value;
        console.log(txtdireccionregister);
        var oficio=$("#oficio option:selected").text();
        console.log(oficio);
        var rd1=document.getElementById('trabajador').checked ;
        console.log(rd1);
        var rd2=document.getElementById('solicitante').checked;
        console.log(rd2);
        var genero=$("#gender option:selected").text(); 
        console.log(genero);
        var fechanacimiento=document.forms["registerForm"]["dateregister"].value;
        console.log(fechanacimiento);

    } else {
        floatingMessage("Formulario", "Ingrese cada uno de los paramentros requeridos!", "error");
    }
}

////Funcion register
function register() {
    //data
    const email = document.forms["formRegisterUser"]['correo'].value;
    const password = document.forms["formRegisterUser"]['contrasena'].value;
    ////if the navigator containe geolocation
    if (navigator.geolocation) {
        ///create User With Email And Password
        auth.createUserWithEmailAndPassword(email, password).then(cred => {
            ///Almacenar key del actual usuario logueado en localStorage 
            localStorage.removeItem("uid");
            localStorage.setItem("uid", cred.user.uid);
            ///get position
            navigator.geolocation.getCurrentPosition(function (position) {
                ///cords
                var coordenadas = {
                    Latitud: position.coords.latitude,
                    Longitud: position.coords.longitude
                }
                //registrar nuevos datos en firebase database with id user auth
                return db.collection('cuentasusuarios').doc(cred.user.uid).set({
                    "nombre": document.forms["formRegisterUser"]['nombre'].value,
                    "apellido": document.forms["formRegisterUser"]['apellido'].value,
                    "correo": document.forms["formRegisterUser"]['correo'].value,
                    "telefono": document.forms["formRegisterUser"]['telefono'].value,
                    "direccion": document.forms["formRegisterUser"]['direccion'].value,
                    "coordenadas": coordenadas,
                    "fechaRegistro": new Date().toLocaleString(),
                    "tipo": "usuario",
                    "estado": parseInt(1)
                }).then(function (result) {
                    window.location.href = "homeUsuario.html";
                }).catch(function (error) {
                    floatingMessage(error.code, "", "firebase");
                });

            }, function (error) {
                ////error al obtener coordenadas
                floatingMessage(error.title, error.message, "error");
            });
        }).catch(err => {
            floatingMessage(err.code, "", "firebase");
        });


    } else {
        floatingMessage("error al obtener las coordenadas", "error ubicacion", "error");
    }


};