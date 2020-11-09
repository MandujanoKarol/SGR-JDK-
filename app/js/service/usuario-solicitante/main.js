var uid = localStorage.getItem("b84eea7076a27fccba11fb66c9bb611a7872ed66eb593c9492afdc47e10d13af");   
var generos=[];
var oficios=[];

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
                        generos.push(entrada.Genero);
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

        document.getElementById('direccionperfil').value = usuarioinfo.data().direccion;
        document.getElementById('imagenperfil').src=usuarioinfo.data().imagen;
        document.getElementById('telefonoperfil').value=usuarioinfo.data().telefono;
        document.getElementById('nacimientoperfil').value=usuarioinfo.data().fechaNacimiento;
    });

    /**
     * select oficio
     **/
    /**
     * Para Agregar trabajo o empleo
     **/
    fetch('https://mandujanokarol.github.io/SGR-JDK-/app/js/service/oficios.json').then(function (respuesta) {
        if (respuesta.ok) {
            respuesta.json().then(dato => {
                dato.forEach(function (entrada) {
                    oficios.push(entrada.Oficio);
                    var option = document.createElement("option");
                    option.value = entrada.Oficio;
                    option.text = entrada.Oficio; 
                    document.getElementById("oficionuevotrabajo").add(option);
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
    /** 
     *Empleos publicados del solicitante
     **/ 
    db.collection("trabajos").where("id_usuario_sol", "==", uid).onSnapshot(function(trabajos) {  
        //if (trabajos.exists) {
        document.getElementById('listaempleos').innerHTML="";
        trabajos.forEach(function(doc) { 
            var li = document.createElement("li"); 
            li.setAttribute("id", "li" + doc.id); 
            li.setAttribute("class", "panel");
            li.innerHTML=`<a data-toggle="collapse" aria-expanded="false" data-parent="#listaempleos"
            href="#Link${doc.id}" style="background: #1c1f64; color: white;">${doc.data().nombre}</a>`  
            document.getElementById('listaempleos').appendChild(li);
            
            var ul = document.createElement("ul"); 
            ul.setAttribute("id", "Link"+doc.id); 
            ul.setAttribute("class", "collapse"); 
            ul.setAttribute("style","margin-top: 50px; margin-bottom: 50px; margin-right: 40px;"); 
            ul.innerHTML=` <form id="contact" name="formactualizarperfil">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div style="text-align: initial;">
                                                <strong
                                                    style="text-align: initial; font-weight: bold;">Nombre:</strong><br>
                                            </div>
                                            <fieldset>
                                                <input  type="text"
                                                    class="form-control" id=${"inputnombreempleados"+doc.id}
                                                    placeholder="Nombre" required="" value=${doc.data().nombre}>
                                            </fieldset>
                                        </div>
                                        <div class="col-md-12">
                                            <div style="text-align: initial;">
                                                <strong
                                                    style="text-align: initial; font-weight: bold; ">Descripcion:</strong><br>
                                            </div>
                                            <fieldset>
                                                <textarea  rows="6"
                                                    class="form-control" id=${"textareadescripcionempleados"+doc.id}
                                                    placeholder="Descripción de la publicación..."
                                                    required=""
                                                    style="color: black; height: 50px;" ></textarea>
                                            </fieldset>
                                        </div>
                                        <div class="col-md-4">
                                            <div style="text-align: initial;">
                                                <strong
                                                    style="text-align: initial; font-weight: bold;">Pago:</strong><br>
                                            </div>
                                            <fieldset>
                                                <input  type="number"
                                                    class="form-control"  id=${"inputpagoempleados"+doc.id}
                                                    placeholder="Pago" required=""  value=${doc.data().pago}>
                                            </fieldset>
                                        </div>



                                        <div class="col-md-4">
                                            <div style="text-align: initial;">
                                                <strong
                                                    style="text-align: initial; font-weight: bold;">Fecha
                                                    de
                                                    inicio:</strong><br>
                                            </div>
                                            <fieldset>
                                                <input  type="date"
                                                    class="form-control"  id=${"inputfechainicioempleados"+doc.id}
                                                     required=""  value=${doc.data().fechaInicio}>
                                            </fieldset>
                                        </div>
                                        <div class="col-md-4">
                                            <div style="text-align: initial;">
                                                <strong
                                                    style="text-align: initial; font-weight: bold;">Fecha
                                                    de
                                                    término:</strong><br>
                                            </div>
                                            <fieldset>
                                                <input  type="date"
                                                    class="form-control" id=${"inputfechaterminoempleados"+doc.id}
                                                     required=""  value=${doc.data().fechaTermino}>
                                            </fieldset>
                                        </div>


                                        <div class="col-md-4">
                                            <div style="text-align: initial;">
                                                <strong
                                                    style="text-align: initial; font-weight: bold;">Dirección:</strong><br>
                                            </div>
                                            <fieldset>
                                                <input  type="text"
                                                    class="form-control" id=${"inputdireccionempleados"+doc.id}
                                                    placeholder="Dirección" required="" value=${doc.data().direccion}>
                                            </fieldset>
                                        </div>

                                        <div class="col-md-4">
                                            <div style="text-align: initial;"> 
                                                <strong style="text-align: initial; font-weight: bold;" >Ubicacion:</strong><br>
                                                <input value="${doc.data().coordenadas.Latitud},${doc.data().coordenadas.Longitud}"   id=${"coordsmodal"+doc.id} onkeydown="return false;"
                                                style="caret-color: transparent !important;"                   
                                                required/>
                                            </div>
                                            
                                            <fieldset>
                                                <button type="button" class="btn" data-toggle="modal" style="background: rgb(23, 177, 23);"
                                                    data-target="#addpositionnewempleo" onclick="sendid('${"coordsmodal"+doc.id}')"><i class="fa fa-map-marker" aria-hidden="true"></i>
                                                     Actualizar coordenadas
                                                </button>
                                            </fieldset>
                                        </div>
                                        <div class="col-md-4">
                                            <div style="text-align: initial;">
                                                <strong
                                                    style="text-align: initial; font-weight: bold;">Seleccione
                                                    el
                                                    oficio:</strong><br>
                                            </div>
                                            <fieldset>
                                                <select class="form-control selectstyle" required=""  id=${"selectoficioempleos"+doc.id}> 
                                                </select>
                                            </fieldset>
                                        </div>

                                        <div class="col-md-12">
                                            <div style="text-align: initial;">
                                                <strong
                                                    style="text-align: initial; font-weight: bold;">Requisitos:</strong><br>
                                            </div>
                                            <fieldset>
                                                <textarea  rows="6"
                                                    class="form-control" id=${"textarearequisitosempleados"+doc.id}
                                                    placeholder="Requisitos..." required=""
                                                    style="color: black; height: 50px;" ></textarea>
                                            </fieldset>
                                        </div>

                                        <div class="col-md-6">
                                            <fieldset>
                                                <button type="button" id="form-submit" class="btn"
                                                    style="background: rgb(170, 65, 65);"
                                                    onclick='eliminarEmpleo(${JSON.stringify(doc.id)})' >
                                                    <i class="fa fa-trash" aria-hidden="true"></i>
                                                    Borrar</button>
                                            </fieldset>
                                        </div>
                                        <div class="col-md-6">
                                            <fieldset>
                                                <button type="button" id="form-submit" class="btn" 
                                                onclick='actualizarEmpleo(${JSON.stringify(doc.id)},${JSON.stringify("inputnombreempleados"+doc.id)},
                                                        ${JSON.stringify("textareadescripcionempleados"+doc.id)},${JSON.stringify("inputpagoempleados"+doc.id)},
                                                        ${JSON.stringify("inputfechainicioempleados"+doc.id)},${JSON.stringify("inputfechaterminoempleados"+doc.id)},
                                                        ${JSON.stringify("inputdireccionempleados"+doc.id)},${JSON.stringify("textarearequisitosempleados"+doc.id)},
                                                        ${JSON.stringify("selectoficioempleos"+doc.id)},
                                                        ${JSON.stringify("coordsmodal"+doc.id)})'><i
                                                        class="fa fa-pencil-square-o"
                                                        aria-hidden="true" ></i> Actualizar</button>
                                            </fieldset>
                                        </div>
                                    </div>
                                </form> `;
            document.getElementById("li" + doc.id).appendChild(ul); 
            $("#textareadescripcionempleados"+doc.id).val(doc.data().descripcion);
            $("#textarearequisitosempleados"+doc.id).val(doc.data().requisitos); 
            oficios.forEach(function (Oficio) {
                var option = document.createElement("option");
                option.value = Oficio;
                option.text = Oficio;
                if(doc.data().oficio==Oficio){
                    option.setAttribute("selected", "selected");
                }
                document.getElementById("selectoficioempleos"+doc.id).add(option);
            });
        });
        //}
    }); 

});  

/**
 * Elementos para actualizar perfil
 **/
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
};
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
};
///date input 18 years
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
    $('#nacimientoperfil').attr('max', maxDate);
});

/**
 * Funcion para actualizar perfil
 **/
function actualizarperfil(){
        db.collection('cuentasusuarios').doc(uid).update({ 
            "nombre": document.getElementById('nombreperfil').value,
            "apellido": document.getElementById('apellidoperfil').value,
            "edad":getAge(document.getElementById('nacimientoperfil').value) , 
            "telefono":  document.getElementById('telefonoperfil').value,
            "direccion": document.getElementById('direccionperfil').value, 
            "fechaNacimiento": document.getElementById('nacimientoperfil').value, 
            "genero": document.getElementById("generoperfil").value
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
 * Agregar trabajo o empleo
 **/
const formanuevoempleo = document.forms['formanuevoempleo'];
formanuevoempleo.addEventListener('submit', (e) => {
    e.preventDefault();   
     ///cords
   
    var coord = document.getElementById('coordsmodal').value.split(',');
    var coordenadas = {
        Latitud: coord[0],
        Longitud: coord[1]
    };
    db.collection('trabajos').doc().set({
        "id_usuario_sol": uid, 
        "nombre": document.getElementById('nombrenuevotrabajo').value,
        "descripcion":document.getElementById('descripcionnuevotrabajo').value, 
        "pago": document.getElementById('pagonuevotrabajo').value,
        "fechaInicio":  document.getElementById('fechainicionuevotrabajo').value,
        "fechaTermino": document.getElementById('fechaterminonuevotrabajo').value, 
        "direccion": document.getElementById('direccionnuevotrabajo').value, 
        "requisitos": document.getElementById("requisitosnuevotrabajo").value,
        "oficio": document.getElementById("oficionuevotrabajo").value,
        "fechaRegistro": new Date().toLocaleString(),
        "coordenadas": coordenadas,
        "estado": parseInt(0)
    }).then(function (result) { 
        floatingMessage("Crear Empleo","Empleo publicado", "success");
        document.forms['formanuevoempleo'].reset();
    }).catch(function (error) {
        floatingMessage(error.code, "", "firebase");
    }); 
}); 
/**
 * Actualizar trabajo o empleo
 **/
function actualizarEmpleo(iddocempleo,nombre,descripcion,pago,fechaInicio,fechaTermino,direccion,requisitos,oficio,coords){
    ///cords
    var coord = document.getElementById(coords).value.split(',');
    var coordenadas = {
        Latitud: coord[0],
        Longitud: coord[1]
    };
    db.collection('trabajos').doc(iddocempleo).update({ 
        "nombre": document.getElementById(nombre).value,
        "descripcion":document.getElementById(descripcion).value , 
        "pago": document.getElementById(pago).value,
        "fechaInicio":  document.getElementById(fechaInicio).value,
        "fechaTermino": document.getElementById(fechaTermino).value, 
        "direccion": document.getElementById(direccion).value, 
        "requisitos": document.getElementById(requisitos).value,
        "oficio": document.getElementById(oficio).value, 
        "coordenadas": coordenadas
    }).then(function (result) { 
        floatingMessage("Actualizar Empleo","Empleo actualizado", "success");
    }).catch(function (error) {
        floatingMessage(error.code, "", "firebase");
    });  
};

/**
 * Eliminar trabajo o empleo
 **/
function eliminarEmpleo(iddocempleo){
     

    /*db.collection('trabajos').doc(iddocempleo).delete().then(function() {
        floatingMessage("Eliminar empleo","Empleo eliminado", "success");
    }).catch(function(error) {
        floatingMessage(error.code, "", "firebase");
    });*/
};

/**
 * Postulantes por empleos pendientes
 **/
function mostrarempleospendientespostulantes(){
    document.getElementById('misempleos').innerHTML="";
    db.collection("trabajos").where("estado", "==",0).where("id_usuario_sol", "==",uid).onSnapshot(function(trabajos) {  
        trabajos.forEach(function(trabajo) { 
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
                                            <div style="text-align: center;">
                                                <strong
                                                    style="text-align: initial; font-weight: bold;">Solicitantes:</strong><br>
                                            </div> 
                                            <div class="list-group d-flex flex-row flex-wrap"  style="margin-top:10px"> 
                                                <div class="row" id="${"postulatesmisempleos"+trabajo.id}">
                                                </div>
                                            </div>
                                        </div>  
                                    </div> `;
            document.getElementById("limisempleos" + trabajo.id).appendChild(ul);  

            db.collection('trabajos').doc(trabajo.id).collection('postulantes').get().then( postulantes => {   
                postulantes.forEach(function(postulante) {  
                    db.collection('cuentasusuarios').doc(postulante.data().id_usuario_tra).get().then( usuario => { 
                        /////tr tds tabla
                        console.log(usuario.data().correo); 
                        var divpostulante = document.createElement("div"); 
                        divpostulante.setAttribute("id", "divpostulatesmisempleos" + postulante.id); 
                        divpostulante.setAttribute("style", "margin-top:10px"); 
                        divpostulante.setAttribute("class", "list-group-item list-group-item-action flex-column align-items-start col-md-4 ml-10");
                        divpostulante.innerHTML=`<div class="row">
                                                    <div class="col-md-12">
                                                    <img src="${usuario.data().imagen}" alt="Foto postulante" 
                                                    style="height: 100px;
                                                    width: 100px;
                                                    border-radius: 150px;">
                                                    <br>
                                                    <h5 class="mb-1">${"Nombre del postulante: "+usuario.data().nombre+" "+usuario.data().apellido}</h5>
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
                                                    <small>${"Correo: "+usuario.data().telefono}</small> 
                                                    <br>
                                                    <a class="btn btn-primary btn-sm mt-4" style="background: #45489a;margin-top: 10px;" onclick="asignarpostulante('${trabajo.id}','${postulante.id}')">
                                                    Asignar empleo
                                                    </a>
                                                    </div> 
                                                </div>`; 
                        document.getElementById("postulatesmisempleos"+trabajo.id).appendChild(divpostulante); 
                    }).catch(function(error) { 
                        floatingMessage(error.code, "", "firebase");
                    }); 
                });
            }).catch(function(error) {  
                floatingMessage(error.code, "", "firebase");
            });
        });
    });
};

/**
 * Postulantes por empleos en proceso
 **/
function mostrarempleosenprocesopostulantes(){
    document.getElementById('misempleos').innerHTML="";
    db.collection("trabajos").where("estado", "==",1).where("id_usuario_sol", "==",uid).onSnapshot(function(trabajos) {  
        trabajos.forEach(function(trabajo) { 
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
                                            <div style="text-align: center;">
                                                <strong
                                                    style="text-align: initial; font-weight: bold;">Solicitantes:</strong><br>
                                            </div> 
                                            <div class="list-group d-flex flex-row flex-wrap"  style="margin-top:10px"> 
                                                <div class="row" id="${"postulatesmisempleos"+trabajo.id}">
                                                </div>
                                            </div>
                                        </div>  
                                    </div> `;
            document.getElementById("limisempleos" + trabajo.id).appendChild(ul);  

            db.collection('trabajos').doc(trabajo.id).collection('postulantes').get().then( postulantes => {   
                postulantes.forEach(function(postulante) {  
                    db.collection('cuentasusuarios').doc(postulante.data().id_usuario_tra).get().then( usuario => { 
                        /////tr tds tabla
                        console.log(usuario.data().correo); 
                        var divpostulante = document.createElement("div"); 
                        divpostulante.setAttribute("id", "divpostulatesmisempleos" + postulante.id); 
                        divpostulante.setAttribute("style", "margin-top:10px"); 
                        divpostulante.setAttribute("class", "list-group-item list-group-item-action flex-column align-items-start col-md-4 ml-10");
                        divpostulante.innerHTML=`<div class="row">
                                                    <div class="col-md-12">
                                                    <img src="${usuario.data().imagen}" alt="Foto postulante" 
                                                    style="height: 100px;
                                                    width: 100px;
                                                    border-radius: 150px;">
                                                    <br>
                                                    <h5 class="mb-1">${"Nombre del postulante: "+usuario.data().nombre+" "+usuario.data().apellido}</h5>
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
                                                    <small>${"Correo: "+usuario.data().telefono}</small>  
                                                    </div> 
                                                </div>`; 
                        document.getElementById("postulatesmisempleos"+trabajo.id).appendChild(divpostulante); 
                    }).catch(function(error) { 
                        floatingMessage(error.code, "", "firebase");
                    }); 
                });
            }).catch(function(error) {  
                floatingMessage(error.code, "", "firebase");
            });
        });
    });
};

/**
 * Postulantes por empleos terminados
 **/
function mostrarempleosterminadopostulantes(){
    document.getElementById('misempleos').innerHTML="";
    db.collection("trabajos").where("estado", "==",2).where("id_usuario_sol", "==",uid).onSnapshot(function(trabajos) {  
        trabajos.forEach(function(trabajo) { 
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
                                            <div style="text-align: center;">
                                                <strong
                                                    style="text-align: initial; font-weight: bold;">Solicitantes:</strong><br>
                                            </div> 
                                            <div class="list-group d-flex flex-row flex-wrap"  style="margin-top:10px"> 
                                                <div class="row" id="${"postulatesmisempleos"+trabajo.id}">
                                                </div>
                                            </div>
                                        </div>  
                                    </div> `;
            document.getElementById("limisempleos" + trabajo.id).appendChild(ul);  

            db.collection('trabajos').doc(trabajo.id).collection('postulantes').get().then( postulantes => {   
                postulantes.forEach(function(postulante) {  
                    db.collection('cuentasusuarios').doc(postulante.data().id_usuario_tra).get().then( usuario => { 
                        /////tr tds tabla
                        console.log(usuario.data().correo); 
                        var divpostulante = document.createElement("div"); 
                        divpostulante.setAttribute("id", "divpostulatesmisempleos" + postulante.id); 
                        divpostulante.setAttribute("style", "margin-top:10px"); 
                        divpostulante.setAttribute("class", "list-group-item list-group-item-action flex-column align-items-start col-md-4 ml-10");
                        divpostulante.innerHTML=`<div class="row">
                                                    <div class="col-md-12">
                                                    <img src="${usuario.data().imagen}" alt="Foto postulante" 
                                                    style="height: 100px;
                                                    width: 100px;
                                                    border-radius: 150px;">
                                                    <br>
                                                    <h5 class="mb-1">${"Nombre del postulante: "+usuario.data().nombre+" "+usuario.data().apellido}</h5>
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
                                                    <small>${"Correo: "+usuario.data().telefono}</small> 
                                                    </div> 
                                                </div>`; 
                        document.getElementById("postulatesmisempleos"+trabajo.id).appendChild(divpostulante); 
                    }).catch(function(error) { 
                        floatingMessage(error.code, "", "firebase");
                    }); 
                });
            }).catch(function(error) {  
                floatingMessage(error.code, "", "firebase");
            });
        });
    });
};

/**
 * Asignar postulante
 **/
function asignarpostulante(iddocempleo,iddocpostulate){
    db.collection('trabajos').doc(iddocempleo).update({ 
        "estado": parseInt(1)
    }).then(function (result) { 
        db.collection('trabajos').doc(iddocempleo).collection('postulantes').doc(iddocpostulate).update({ 
            "estado": parseInt(1)
        }).then(function (result) { 
            db.collection('trabajos').doc(iddocempleo).collection('postulantes').doc().where("estado", "==", 0).delete().then(function() {
                floatingMessage("Asignar Postulante","Asignado!", "success");
            }).catch(function(error) {
                floatingMessage(error.code, "", "firebase");
            }); 
        }).catch(function (error) {
            floatingMessage(error.code, "", "firebase");
        }); 
    }).catch(function (error) {
        floatingMessage(error.code, "", "firebase");
    });
};



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
    var uploadTask = storageRef.child('imagenesperfilsolicitante/' + imagenSubir.name).put(imagenSubir);
    uploadTask.on('state_changed',
        function(snapshot) {
    //Proceso de subida
        },
        function(error) {
            //error de subida
            alert("Hubo un error")
        },
        function() {
            storageRef.child('imagenesperfilsolicitante/' + imagenSubir.name).getDownloadURL().then(function(url) {
                // Or inserted into an <img> element:
                crearNodoEnBDFirebase(imagenSubir.name, url);
                console.log(url);
            }).catch(function(error) {
                // Handle any errors
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
            console.error("Error adding document: ", error);
            alert("Error al registrar");
        });
    }
    else {
      console("No hay user logeado")
      }
}