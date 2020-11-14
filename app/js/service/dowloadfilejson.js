function descargar(){
    ///trabajos usuarios
    db.collection("trabajos").onSnapshot(function(trabajos) {    
        trabajos.forEach(function(trabajo) {  
            db.collection("cuentasusuarios").doc(trabajo.data().id_usuario_sol).get().then(function(usuario) {  
                //console.log(trabajo.id, " => ", trabajo.data());
                //console.log(usuario.id, " => ", usuario.data());
                var json_data =usuario.data();
                var result = new Array(); // or the shortcut: = []
                for(var i in json_data)
                    result.push([i, json_data [i]]);
                
                //console.log(result);
                console.log(json2array(usuario.data()));
            });
        }); 
    }); 

}
function json2array(json){
    var result = [];
    var keys = Object.keys(json);
    keys.forEach(function(key){
        result.push(json[key]);
    });
    return result;
}