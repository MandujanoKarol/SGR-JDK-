var uid = localStorage.getItem("b84eea7076a27fccba11fb66c9bb611a7872ed66eb593c9492afdc47e10d13af");   
var tipousuario = localStorage.getItem("2e37e564c6bb5eef21eaf97c5ea876f0c3ca26498c864d40efaa8db640d088c3"); 
if (tipousuario != 1) {  
    window.location.href = "solicitante.html";
} 
$(document).ready(function() {   
    /**
     * Perfil
     **/
    db.collection('cuentasusuarios').doc(uid).onSnapshot(function(usuarioinfo) {    
        document.getElementById('nombreperfil').value = usuarioinfo.data().nombre;
        document.getElementById('apellidoperfil').value = usuarioinfo.data().apellido;
        document.getElementById('emailperfil').value = usuarioinfo.data().correo;
        ///select genero 
        fetch('https://mandujanokarol.github.io/SGR-JDK-/app/js/service/gender.json').then(function (respuesta) {
            if (respuesta.ok) {
                respuesta.json().then(dato => {
                    dato.forEach(function (entrada) {
                        var option = document.createElement("option");
                        option.value = entrada.Genero;
                        option.text = entrada.Genero;
                        if(usuarioinfo.data().genero==entrada.Genero){
                            option.setAttribute("selected", "selected");
                        }
                        document.getElementById("generoperfil").add(option);
                    });
                }).catch(function (error) {
                    floatingMessage("Obtener generos",error.message, "error");
                });
            } else {
                floatingMessage("Obtener generos",respuesta, "error");
            }
        }).catch(function (error) { 
            floatingMessage("Obtener generos",'Hubo un problema con la petición Fetch:' + error.message, "error");
        });
        ///select oficio
        fetch('https://mandujanokarol.github.io/SGR-JDK-/app/js/service/oficios.json').then(function (respuesta) {
        if (respuesta.ok) {
            respuesta.json().then(dato => {
                dato.forEach(function (entrada) {
                    var option = document.createElement("option");
                    option.value = entrada.Oficio;
                    option.text = entrada.Oficio;
                    if(usuarioinfo.data().oficio==entrada.Oficio){
                        option.setAttribute("selected", "selected");
                    }
                    document.getElementById("oficioperfil").add(option);
                });
            }).catch(function (error) {
                floatingMessage("Obtener oficios",error.message, "error");
            });
        } else {
            floatingMessage("Obtener oficios",respuesta, "error");
        }
    }).catch(function (error) { 
        floatingMessage("Obtener oficios",'Hubo un problema con la petición Fetch:' + error.message, "error");
    });
        document.getElementById('direccionperfil').value = usuarioinfo.data().direccion;
        document.getElementById('imagenperfil').src=usuarioinfo.data().imagen;
        document.getElementById('telefonoperfil').value=usuarioinfo.data().telefono;
        document.getElementById('nacimientoperfil').value=usuarioinfo.data().fechaNacimiento;
    });
    /** 
     *Empleos publicados del solicitante
     **/ 
    db.collection("trabajos").where("estado", "==",0).onSnapshot(function(trabajos) {  
        //if (trabajos.exists) {
        document.getElementById('listaempleos').innerHTML="";
        trabajos.forEach(function(trabajo) {  
            db.collection("cuentasusuarios").doc(trabajo.data().id_usuario_sol).get().then(function(usuario) {
                // ${trabajo.data().direccion}
                var li = document.createElement("li"); 
                li.setAttribute("class", "list-group-item mt-2 jdk-li");
                li.innerHTML=`<div class="media align-items-lg-center flex-column flex-lg-row p-3">
                                    <div class="row">
                                        <div class="col-md-4 col-sm-6"> 
                                                <img src="${usuario.data().imagen}" alt="Generic placeholder image" width="200" class="ml-lg-5 order-1 order-lg-2"> 
                                                <ul class="list-inline small mt-2">
                                                    <li class="list-inline-item m-0"><i class="fa fa-star text-warning"></i></li>
                                                    <li class="list-inline-item m-0"><i class="fa fa-star text-warning"></i></li>
                                                    <li class="list-inline-item m-0"><i class="fa fa-star text-warning"></i></li>
                                                    <li class="list-inline-item m-0"><i class="fa fa-star text-warning"></i></li>
                                                    <li class="list-inline-item m-0"><i class="fa fa-star-o text-gray"></i></li>
                                                </ul>
                                        </div>
                                        <div class="col-md-8 col-sm-6">
                                            <div class="media-body order-2 order-lg-1">
                                                <h5 class="mt-0 font-weight-bold mb-2" style="font-size:14px; color: #1B3280; font-weight: bold">${trabajo.data().nombre}</h5>
                                                <hr>
                                                <p class="font-italic text-muted mb-0 small text-left"><strong>Descripcion:</strong> ${trabajo.data().descripcion}</p>
                                                <p class="font-italic text-muted mb-0 small text-left"><strong>Direccion:</strong> ${trabajo.data().direccion}</p>
                                                <p class="font-italic text-muted mb-0 small text-left"><strong>Oficio:</strong> ${trabajo.data().oficio}</p>
                                                <div class="d-flex align-items-center justify-content-between mt-1">
                                                    <h6 class="font-weight-bold my-2" style="color: #C2280C; font-weight: bold">$${trabajo.data().pago}.00</h6>
                                                   
                                                    <a  class="btn btn-primary btn-sm mt-2" style="background: #45489a"
                                                    onclick="postularse('${trabajo.id}')"
                                                    >Postularme</a>
                                                </div>
                                            </div> 
                                        </div> 
                                    </div> 
                                </div> `;  
                document.getElementById('listaempleos').appendChild(li); 
            });
        });
        //}
    }); 

});  
/**
 * Elementos para actualizar perfil
 */
var input = document.querySelector("#telefonoperfil");
var iti = window.intlTelInput(input, {
    // any initialisation options go here
    // initial country 
    initialCountry: "mx",
    //preferredCountries: ["mx","us" ],
    onlyCountries: ["mx"]
});

function onkeyuptelefono(){ 
    var tel=document.getElementById('telefonoperfil').value;
    tel=tel.replace("-","").replace("(","").replace(")","").replace(" ","");
    var arraytel=Array.from(tel) 
    var length=arraytel.length; 
    if(length>10){   
        arraytel.pop();   
        var phoneNumberString = arraytel.join('');
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
        var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/) 
        if (match) {
            document.getElementById('telefonoperfil').value = '(' + match[1] + ') ' + match[2] + '-' + match[3];
            document.getElementById('telefonoperfil').style = " ";
            return 0;
        } 
    }
    if(length==10){
        var phoneNumberString = tel;
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
        var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/) 
        if (match) {
            document.getElementById('telefonoperfil').value = '(' + match[1] + ') ' + match[2] + '-' + match[3];
            document.getElementById('telefonoperfil').style = " ";
            return 0;
        }  
    }
}
function onblurtelefono() {
    if (document.getElementById('telefonoperfil').value != "") {
        var tel=document.getElementById('telefonoperfil').value.replace("-","").replace("(","").replace(")","").replace(" ","");
        if (tel.length == 10) {
            document.getElementById('telefonoperfil').style = " ";
            return 0;
        } else {
            document.getElementById('telefonoperfil').style = "box-shadow: inset 0 0 0 4px #e60346;";
            return 1;
        }
    } else {
        document.getElementById('telefonoperfil').style = "box-shadow: inset 0 0 0 4px #e60346;";
        return 1;
    }
}
///date input 18 years
$(function () {
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
    $('#nacimientoperfil').attr('max', maxDate);
});
/**
 * Funcion para actualizar perfil
 */ 
function actualizarperfil(){  
        db.collection('cuentasusuarios').doc(uid).update({ 
            "nombre": document.getElementById('nombreperfil').value,
            "apellido": document.getElementById('apellidoperfil').value,
            "edad":getAge(document.getElementById('nacimientoperfil').value) , 
            "telefono":  document.getElementById('telefonoperfil').value,
            "direccion": document.getElementById('direccionperfil').value, 
            "fechaNacimiento": document.getElementById('nacimientoperfil').value, 
            "genero": document.getElementById("generoperfil").value,
            "oficio": document.getElementById("oficioperfil").value
        }).then(function (result) { 
            floatingMessage("Actualizar perfil","Tu perfil fue actualizado", "success");
        }).catch(function (error) {
            floatingMessage(error.code, "", "firebase");
        }); 
};
function getAge(dateString) 
{ 
    var today = new Date(); 
    var birthDate = new Date(dateString); 
    var age = today.getFullYear() - birthDate.getFullYear(); 
    var m = today.getMonth() - birthDate.getMonth(); 
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    { 
     age--; 
    } 
    return age; 
}; 
/**
 * Funcion para postularse
 **/ 
function postularse(iddocempleo){  
    db.collection("trabajos").doc(iddocempleo).collection("postulantes").where("id_usuario_tra", "==", uid).get().then(postulante => {
        if(postulante.size>0){  
            floatingMessage("Postularse a Empleo","Actualmente estas postulado a este empleo", "error");
        }else{
            db.collection('trabajos').doc(iddocempleo).collection('postulantes').doc().set({
                "id_usuario_tra": uid,  
                "fechaRegistro": new Date().toLocaleString(), 
                "estado": parseInt(0)
            }).then(function() {
                floatingMessage("Postularse a Empleo","Te postulaste a el empleo", "success");
            }).catch(function(error) {
                floatingMessage(error.code, "", "firebase");
            });
        } 
    });  
};
/**
 * Funcion para eliminar postulacion
 **/
function eliminarpostulacion(iddocempleo,iddocpostulacion){
    db.collection('trabajos').doc(iddocempleo).collection('postulantes').doc(iddocpostulacion).delete().then(function() {
        floatingMessage("Eliminar postulacion","Postulacion eliminada", "success");
    }).catch(function(error) {
        floatingMessage(error.code, "", "firebase");
    });
};

/**
 * Postulantes por empleos pendientes
 **/
function mostrarempleospendientespostulantes(){ 
    db.collection("trabajos").where("estado", "==",0).onSnapshot(function(trabajos) {  
        document.getElementById('misempleos').innerHTML="";
        trabajos.forEach(function(trabajo) { 
                db.collection('trabajos').doc(trabajo.id).collection('postulantes').where("id_usuario_tra", "==",uid).get().then( postulantes => {   
                            postulantes.forEach(function(postulante) {
                                var li = document.createElement("li"); 
                                li.setAttribute("id", "limisempleos" + trabajo.id); 
                                li.setAttribute("class", "panel");
                                li.innerHTML=`<a data-toggle="collapse" aria-expanded="false" data-parent="#misempleos"
                                href="#Linkmisempleos${trabajo.id}" style="background: #1c1f64; color: white;">${trabajo.data().nombre}</a>`  
                                document.getElementById('misempleos').appendChild(li);
                                
                                var ul = document.createElement("ul"); 
                                ul.setAttribute("id", "Linkmisempleos"+trabajo.id); 
                                ul.setAttribute("class", "collapse"); 
                                ul.setAttribute("style","margin-top: 50px; margin-bottom: 50px; margin-right: 40px;"); 
                                ul.innerHTML=` <div class="row">
                                                            <div class="col-md-12" style="margin-top:10px">
                                                                <div style="text-align: center;">
                                                                    <strong
                                                                        style="text-align: initial; font-weight: bold;">Solicitante:</strong><br>
                                                                </div> 
                                                                <div class="list-group d-flex flex-row flex-wrap"  style="margin-top:10px"> 
                                                                    <div class="row" id="${"solicitanteempleoid"+trabajo.id}">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4 ">
                                                                <div style="text-align: initial;">
                                                                    <strong
                                                                        style="text-align: initial; font-weight: bold;">Nombre:</strong><br>
                                                                </div>
                                                                <div style="text-align: initial;">
                                                                <strong
                                                                    style="text-align: initial; font-weight: bold;">${trabajo.data().nombre}</strong><br>
                                                                </div> 
                                                            </div>
                                                            <div class="col-md-4">
                                                                <div style="text-align: initial;">
                                                                    <strong
                                                                        style="text-align: initial; font-weight: bold; ">Descripcion:</strong><br>
                                                                </div>
                                                                <div style="text-align: initial;">
                                                                    <strong
                                                                        style="text-align: initial; font-weight: bold;">
                                                                        ${trabajo.data().descripcion}
                                                                        </strong><br>
                                                                </div> 
                                                            </div>
                                                            <div class="col-md-4">
                                                                <div style="text-align: initial;">
                                                                    <strong
                                                                        style="text-align: initial; font-weight: bold;">Pago:</strong><br>
                                                                </div>
                                                                <div style="text-align: initial;">
                                                                    <strong
                                                                        style="text-align: initial; font-weight: bold;">$${trabajo.data().pago}.00</strong><br>
                                                                </div> 
                                                            </div> 
                                                            <div class="col-md-4 "  style="margin-top:10px">
                                                                <div style="text-align: initial;">
                                                                    <strong
                                                                        style="text-align: initial; font-weight: bold;">Fecha
                                                                        de
                                                                        inicio:</strong><br>
                                                                </div>
                                                                <div style="text-align: initial;">
                                                                    <strong
                                                                        style="text-align: initial; font-weight: bold;">${trabajo.data().fechaInicio}</strong><br>
                                                                </div> 
                                                            </div>
                                                            <div class="col-md-4" style="margin-top:10px">
                                                                <div style="text-align: initial;">
                                                                    <strong
                                                                        style="text-align: initial; font-weight: bold;">Fecha
                                                                        de
                                                                        término:</strong><br>
                                                                </div>
                                                                <div style="text-align: initial;">
                                                                    <strong
                                                                        style="text-align: initial; font-weight: bold;">${trabajo.data().fechaTermino}</strong><br>
                                                                </div> 
                                                            </div> 
                                                            <div class="col-md-4" style="margin-top:10px">
                                                                <div style="text-align: initial;">
                                                                    <strong
                                                                        style="text-align: initial; font-weight: bold;">Dirección:</strong><br>
                                                                </div>
                                                                <div style="text-align: initial;">
                                                                <strong
                                                                    style="text-align: initial; font-weight: bold;">${trabajo.data().direccion}</strong><br>
                                                                </div> 
                                                            </div>
                                                            <div class="col-md-12" style="margin-top:10px">
                                                                <div style="text-align: initial;">
                                                                    <strong
                                                                        style="text-align: initial; font-weight: bold;">Oficio:</strong><br>
                                                                </div>
                                                                <div style="text-align: initial;">
                                                                    <strong style="text-align: initial; font-weight: bold;">
                                                                    ${ trabajo.data().oficio} </strong><br>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-12" style="margin-top:10px">
                                                                    <a class="btn btn-primary btn-sm mt-4" style="background: #45489a;margin-top: 10px;" onclick="eliminarpostulacion('${trabajo.id}','${postulante.id}')">
                                                                    Eliminar postulacin
                                                                    </a>
                                                            </div>
                                                            
                                                        </div> `;
                                document.getElementById("limisempleos" + trabajo.id).appendChild(ul);  
                                
                                
                                
                                db.collection('cuentasusuarios').doc(trabajo.data().id_usuario_sol).get().then( usuario => { 
                                    /////tr tds tabla
                                    console.log(usuario.data().correo); 
                                    var divpostulante = document.createElement("div"); 
                                    divpostulante.setAttribute("id", "divsolicitanteempleoid" + trabajo.id); 
                                    divpostulante.setAttribute("style", "margin-top:10px"); 
                                    divpostulante.setAttribute("class", "list-group-item list-group-item-action flex-column align-items-start col-md-12 ml-10");
                                    divpostulante.innerHTML=`<div class="row">
                                                                <div class="col-md-12">
                                                                <img src="${usuario.data().imagen}" alt="Foto postulante" 
                                                                style="height: 100px;
                                                                width: 100px;
                                                                border-radius: 150px;">
                                                                <br>
                                                                <h5 class="mb-1">${"Nombre del solicitante: "+usuario.data().nombre+" "+usuario.data().apellido}</h5>
                                                                <ul class="list-inline small mt-2">
                                                                <li class="list-inline-item m-0"><i class="fa fa-star text-warning"></i></li>
                                                                <li class="list-inline-item m-0"><i class="fa fa-star text-warning"></i></li>
                                                                <li class="list-inline-item m-0"><i class="fa fa-star text-warning"></i></li>
                                                                <li class="list-inline-item m-0"><i class="fa fa-star text-warning"></i></li>
                                                                <li class="list-inline-item m-0"><i class="fa fa-star-o text-gray"></i></li>
                                                                <br>
                                                                </ul>
                                                                <small>${"Correo: "+usuario.data().correo}</small>
                                                                <br>
                                                                <small>${"Telefono: "+usuario.data().telefono}</small> 
                                                                <br>
                                                                
                                                                </div> 
                                                            </div>`; 
                                    document.getElementById("solicitanteempleoid"+trabajo.id).appendChild(divpostulante); 
                                }).catch(function(error) { 
                                    floatingMessage(error.code, "", "firebase");
                                });
                        });
                });  
        });
    });
};

/**
 * Mi empleo en proceso
 **/
function mostrarempleosenprocesopostulantes(){ 
    db.collection("trabajos").where("estado", "==",1).onSnapshot(function(trabajos) {  
        document.getElementById('misempleos').innerHTML="";
        trabajos.forEach(function(trabajo) { 
                db.collection('trabajos').doc(trabajo.id).collection('postulantes').where("id_usuario_tra", "==",uid).get().then( postulantes => {   
                            postulantes.forEach(function(postulante) {
                                var li = document.createElement("li"); 
                                li.setAttribute("id", "limisempleos" + trabajo.id); 
                                li.setAttribute("class", "panel");
                                li.innerHTML=`<a data-toggle="collapse" aria-expanded="false" data-parent="#misempleos"
                                href="#Linkmisempleos${trabajo.id}" style="background: #1c1f64; color: white;">${trabajo.data().nombre}</a>`  
                                document.getElementById('misempleos').appendChild(li);
                                
                                var ul = document.createElement("ul"); 
                                ul.setAttribute("id", "Linkmisempleos"+trabajo.id); 
                                ul.setAttribute("class", "collapse"); 
                                ul.setAttribute("style","margin-top: 50px; margin-bottom: 50px; margin-right: 40px;"); 
                                ul.innerHTML=` <div class="row">
                                                            <div class="col-md-12" style="margin-top:10px">
                                                                <div style="text-align: center;">
                                                                    <strong
                                                                        style="text-align: initial; font-weight: bold;">Solicitante:</strong><br>
                                                                </div> 
                                                                <div class="list-group d-flex flex-row flex-wrap"  style="margin-top:10px"> 
                                                                    <div class="row" id="${"solicitanteempleoid"+trabajo.id}">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4 ">
                                                                <div style="text-align: initial;">
                                                                    <strong
                                                                        style="text-align: initial; font-weight: bold;">Nombre:</strong><br>
                                                                </div>
                                                                <div style="text-align: initial;">
                                                                <strong
                                                                    style="text-align: initial; font-weight: bold;">${trabajo.data().nombre}</strong><br>
                                                                </div> 
                                                            </div>
                                                            <div class="col-md-4">
                                                                <div style="text-align: initial;">
                                                                    <strong
                                                                        style="text-align: initial; font-weight: bold; ">Descripcion:</strong><br>
                                                                </div>
                                                                <div style="text-align: initial;">
                                                                    <strong
                                                                        style="text-align: initial; font-weight: bold;">
                                                                        ${trabajo.data().descripcion}
                                                                        </strong><br>
                                                                </div> 
                                                            </div>
                                                            <div class="col-md-4">
                                                                <div style="text-align: initial;">
                                                                    <strong
                                                                        style="text-align: initial; font-weight: bold;">Pago:</strong><br>
                                                                </div>
                                                                <div style="text-align: initial;">
                                                                    <strong
                                                                        style="text-align: initial; font-weight: bold;">$${trabajo.data().pago}.00</strong><br>
                                                                </div> 
                                                            </div> 
                                                            <div class="col-md-4 "  style="margin-top:10px">
                                                                <div style="text-align: initial;">
                                                                    <strong
                                                                        style="text-align: initial; font-weight: bold;">Fecha
                                                                        de
                                                                        inicio:</strong><br>
                                                                </div>
                                                                <div style="text-align: initial;">
                                                                    <strong
                                                                        style="text-align: initial; font-weight: bold;">${trabajo.data().fechaInicio}</strong><br>
                                                                </div> 
                                                            </div>
                                                            <div class="col-md-4" style="margin-top:10px">
                                                                <div style="text-align: initial;">
                                                                    <strong
                                                                        style="text-align: initial; font-weight: bold;">Fecha
                                                                        de
                                                                        término:</strong><br>
                                                                </div>
                                                                <div style="text-align: initial;">
                                                                    <strong
                                                                        style="text-align: initial; font-weight: bold;">${trabajo.data().fechaTermino}</strong><br>
                                                                </div> 
                                                            </div> 
                                                            <div class="col-md-4" style="margin-top:10px">
                                                                <div style="text-align: initial;">
                                                                    <strong
                                                                        style="text-align: initial; font-weight: bold;">Dirección:</strong><br>
                                                                </div>
                                                                <div style="text-align: initial;">
                                                                <strong
                                                                    style="text-align: initial; font-weight: bold;">${trabajo.data().direccion}</strong><br>
                                                                </div> 
                                                            </div>
                                                            <div class="col-md-12" style="margin-top:10px">
                                                                <div style="text-align: initial;">
                                                                    <strong
                                                                        style="text-align: initial; font-weight: bold;">Oficio:</strong><br>
                                                                </div>
                                                                <div style="text-align: initial;">
                                                                    <strong style="text-align: initial; font-weight: bold;">
                                                                    ${ trabajo.data().oficio} </strong><br>
                                                                </div>
                                                            </div> 
                                                        </div> `;
                                document.getElementById("limisempleos" + trabajo.id).appendChild(ul);  
                                
                                
                                
                                db.collection('cuentasusuarios').doc(trabajo.data().id_usuario_sol).get().then( usuario => { 
                                    /////tr tds tabla
                                    console.log(usuario.data().correo); 
                                    var divpostulante = document.createElement("div"); 
                                    divpostulante.setAttribute("id", "divsolicitanteempleoid" + trabajo.id); 
                                    divpostulante.setAttribute("style", "margin-top:10px"); 
                                    divpostulante.setAttribute("class", "list-group-item list-group-item-action flex-column align-items-start col-md-12 ml-10");
                                    divpostulante.innerHTML=`<div class="row">
                                                                <div class="col-md-12">
                                                                <img src="${usuario.data().imagen}" alt="Foto postulante" 
                                                                style="height: 100px;
                                                                width: 100px;
                                                                border-radius: 150px;">
                                                                <br>
                                                                <h5 class="mb-1">${"Nombre del solicitante: "+usuario.data().nombre+" "+usuario.data().apellido}</h5>
                                                                <ul class="list-inline small mt-2">
                                                                <li class="list-inline-item m-0"><i class="fa fa-star text-warning"></i></li>
                                                                <li class="list-inline-item m-0"><i class="fa fa-star text-warning"></i></li>
                                                                <li class="list-inline-item m-0"><i class="fa fa-star text-warning"></i></li>
                                                                <li class="list-inline-item m-0"><i class="fa fa-star text-warning"></i></li>
                                                                <li class="list-inline-item m-0"><i class="fa fa-star-o text-gray"></i></li>
                                                                <br>
                                                                </ul>
                                                                <small>${"Correo: "+usuario.data().correo}</small>
                                                                <br>
                                                                <small>${"Telefono: "+usuario.data().telefono}</small> 
                                                                <br>
                                                                
                                                                </div> 
                                                            </div>`; 
                                    document.getElementById("solicitanteempleoid"+trabajo.id).appendChild(divpostulante); 
                                }).catch(function(error) { 
                                    floatingMessage(error.code, "", "firebase");
                                });
                        });
                });  
        });
    });
};

/**
 * Mis empleos terminados
 **/
function mostrarempleosterminadopostulantes(){ 
    db.collection("trabajos").where("estado", "==",2).onSnapshot(function(trabajos) {  
        document.getElementById('misempleos').innerHTML="";
        trabajos.forEach(function(trabajo) { 
                db.collection('trabajos').doc(trabajo.id).collection('postulantes').where("id_usuario_tra", "==",uid).get().then( postulantes => {   
                            postulantes.forEach(function(postulante) {
                                var li = document.createElement("li"); 
                                li.setAttribute("id", "limisempleos" + trabajo.id); 
                                li.setAttribute("class", "panel");
                                li.innerHTML=`<a data-toggle="collapse" aria-expanded="false" data-parent="#misempleos"
                                href="#Linkmisempleos${trabajo.id}" style="background: #1c1f64; color: white;">${trabajo.data().nombre}</a>`  
                                document.getElementById('misempleos').appendChild(li);
                                
                                var ul = document.createElement("ul"); 
                                ul.setAttribute("id", "Linkmisempleos"+trabajo.id); 
                                ul.setAttribute("class", "collapse"); 
                                ul.setAttribute("style","margin-top: 50px; margin-bottom: 50px; margin-right: 40px;"); 
                                ul.innerHTML=` <div class="row">
                                                            <div class="col-md-12" style="margin-top:10px">
                                                                <div style="text-align: center;">
                                                                    <strong
                                                                        style="text-align: initial; font-weight: bold;">Solicitante:</strong><br>
                                                                </div> 
                                                                <div class="list-group d-flex flex-row flex-wrap"  style="margin-top:10px"> 
                                                                    <div class="row" id="${"solicitanteempleoid"+trabajo.id}">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4 ">
                                                                <div style="text-align: initial;">
                                                                    <strong
                                                                        style="text-align: initial; font-weight: bold;">Nombre:</strong><br>
                                                                </div>
                                                                <div style="text-align: initial;">
                                                                <strong
                                                                    style="text-align: initial; font-weight: bold;">${trabajo.data().nombre}</strong><br>
                                                                </div> 
                                                            </div>
                                                            <div class="col-md-4">
                                                                <div style="text-align: initial;">
                                                                    <strong
                                                                        style="text-align: initial; font-weight: bold; ">Descripcion:</strong><br>
                                                                </div>
                                                                <div style="text-align: initial;">
                                                                    <strong
                                                                        style="text-align: initial; font-weight: bold;">
                                                                        ${trabajo.data().descripcion}
                                                                        </strong><br>
                                                                </div> 
                                                            </div>
                                                            <div class="col-md-4">
                                                                <div style="text-align: initial;">
                                                                    <strong
                                                                        style="text-align: initial; font-weight: bold;">Pago:</strong><br>
                                                                </div>
                                                                <div style="text-align: initial;">
                                                                    <strong
                                                                        style="text-align: initial; font-weight: bold;">$${trabajo.data().pago}.00</strong><br>
                                                                </div> 
                                                            </div> 
                                                            <div class="col-md-4 "  style="margin-top:10px">
                                                                <div style="text-align: initial;">
                                                                    <strong
                                                                        style="text-align: initial; font-weight: bold;">Fecha
                                                                        de
                                                                        inicio:</strong><br>
                                                                </div>
                                                                <div style="text-align: initial;">
                                                                    <strong
                                                                        style="text-align: initial; font-weight: bold;">${trabajo.data().fechaInicio}</strong><br>
                                                                </div> 
                                                            </div>
                                                            <div class="col-md-4" style="margin-top:10px">
                                                                <div style="text-align: initial;">
                                                                    <strong
                                                                        style="text-align: initial; font-weight: bold;">Fecha
                                                                        de
                                                                        término:</strong><br>
                                                                </div>
                                                                <div style="text-align: initial;">
                                                                    <strong
                                                                        style="text-align: initial; font-weight: bold;">${trabajo.data().fechaTermino}</strong><br>
                                                                </div> 
                                                            </div> 
                                                            <div class="col-md-4" style="margin-top:10px">
                                                                <div style="text-align: initial;">
                                                                    <strong
                                                                        style="text-align: initial; font-weight: bold;">Dirección:</strong><br>
                                                                </div>
                                                                <div style="text-align: initial;">
                                                                <strong
                                                                    style="text-align: initial; font-weight: bold;">${trabajo.data().direccion}</strong><br>
                                                                </div> 
                                                            </div>
                                                            <div class="col-md-12" style="margin-top:10px">
                                                                <div style="text-align: initial;">
                                                                    <strong
                                                                        style="text-align: initial; font-weight: bold;">Oficio:</strong><br>
                                                                </div>
                                                                <div style="text-align: initial;">
                                                                    <strong style="text-align: initial; font-weight: bold;">
                                                                    ${ trabajo.data().oficio} </strong><br>
                                                                </div>
                                                            </div>
                                                            
                                                        </div> `;
                                document.getElementById("limisempleos" + trabajo.id).appendChild(ul);  
                                
                                
                                
                                db.collection('cuentasusuarios').doc(trabajo.data().id_usuario_sol).get().then( usuario => { 
                                    /////tr tds tabla
                                    console.log(usuario.data().correo); 
                                    var divpostulante = document.createElement("div"); 
                                    divpostulante.setAttribute("id", "divsolicitanteempleoid" + trabajo.id); 
                                    divpostulante.setAttribute("style", "margin-top:10px"); 
                                    divpostulante.setAttribute("class", "list-group-item list-group-item-action flex-column align-items-start col-md-12 ml-10");
                                    divpostulante.innerHTML=`<div class="row">
                                                                <div class="col-md-12">
                                                                <img src="${usuario.data().imagen}" alt="Foto postulante" 
                                                                style="height: 100px;
                                                                width: 100px;
                                                                border-radius: 150px;">
                                                                <br>
                                                                <h5 class="mb-1">${"Nombre del solicitante: "+usuario.data().nombre+" "+usuario.data().apellido}</h5>
                                                                <ul class="list-inline small mt-2">
                                                                <li class="list-inline-item m-0"><i class="fa fa-star text-warning"></i></li>
                                                                <li class="list-inline-item m-0"><i class="fa fa-star text-warning"></i></li>
                                                                <li class="list-inline-item m-0"><i class="fa fa-star text-warning"></i></li>
                                                                <li class="list-inline-item m-0"><i class="fa fa-star text-warning"></i></li>
                                                                <li class="list-inline-item m-0"><i class="fa fa-star-o text-gray"></i></li>
                                                                <br>
                                                                </ul>
                                                                <small>${"Correo: "+usuario.data().correo}</small>
                                                                <br>
                                                                <small>${"Telefono: "+usuario.data().telefono}</small> 
                                                                <br>
                                                                
                                                                </div> 
                                                            </div>`; 
                                    document.getElementById("solicitanteempleoid"+trabajo.id).appendChild(divpostulante); 
                                }).catch(function(error) { 
                                    floatingMessage(error.code, "", "firebase");
                                });
                        });
                });  
        });
    });
};

/**
 * ACTUALIZAR IMAGEN PERFIL
 **/
window.onload = Inicializar;
var Fichero;
var storageRef;
var imagenRef;
  //inicializa la función en espera de algún cambio para ejecutar subirImagenFirebase
function Inicializar() {
    fichero = document.getElementById("fichero");
    fichero.addEventListener("change", subirImagenFirebase, false);
    storageRef = firebase.storage().ref();
}
function subirImagenFirebase() {
    var imagenSubir = fichero.files[0];
    var uploadTask = storageRef.child('imagenesperfiltrabajador/' + imagenSubir.name).put(imagenSubir);
    uploadTask.on('state_changed',
        function(snapshot) { 
        },
        function(error) { 
            floatingMessage("Actualizar la imagen","Error al subir la imagen", "error");
        },
        function() {
            storageRef.child('imagenesperfiltrabajador/' + imagenSubir.name).getDownloadURL().then(function(url) { 
                crearNodoEnBDFirebase(imagenSubir.name, url); 
            }).catch(function(error) {
                floatingMessage(error.code, "", "firebase");
            });
        });
}
function crearNodoEnBDFirebase(nombrImage,Url){
        var user = firebase.auth().currentUser;
        if (user) {
            console.log(nombrImage)
            console.log(Url)
            console.log(user.uid)
        db.collection("cuentasusuarios").doc(user.uid).update({
        imagen: Url}
    ).then(function() {
        console.log("Registrado");
        }).catch(function(error) {
            floatingMessage(error.code, "", "firebase");
        });
    }
    else {
      console("No hay user logeado")
      }
}
 
