function descargar() {
    ///trabajos usuarios
    var obj =   [] ;
    var trabajo={
        "nombre":"Trabajo",
        "coords":{lat:0,long:0},
        "estado":0
    }
    var usuario={
        "correo":"usuariio@gmail.com",
        "tipo":"vendedor"
    }
    obj.push(JSON.sort($.extend(usuario, trabajo)));
    obj.push(JSON.sort($.extend(usuario, trabajo)));
    obj.push(JSON.sort($.extend(usuario, trabajo)));
    obj.push(JSON.sort($.extend(usuario, trabajo))); 
    var json = JSON.stringify(obj); 
    console.log(json);
    bajarfile(json); 
}
function o() {
    ///trabajos usuarios
    var obj =   [] ;
    db.collection("trabajos").get().then( trabajos => {    
        trabajos.forEach(function(trabajo) {   
            db.collection("cuentasusuarios").doc(trabajo.data().id_usuario_sol).get().then(function(usuario) {  
                //console.log(trabajo.id, " => ", trabajo.data());
                //console.log(usuario.id, " => ", usuario.data());  
                //json_data=JSON.stringify(JSON.sort($.extend(usuario.data(), trabajo.data()))); 
                obj.push(JSON.sort($.extend(usuario.data(), trabajo.data())));
                //console.log(json_data);  
                //console.log(Object.keys(json_data).map((key) => [key, json_data[key]]));
            }); 
        });  
        
    }); 
    var json = JSON.stringify(obj); 
    bajarfile(obj); 

}
function bajarfile(obj){
    console.log(obj);  
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(obj);
    var dlAnchorElem = document.getElementById('downloadAnchorElem');
    dlAnchorElem.setAttribute("href",     dataStr     );
    dlAnchorElem.setAttribute("download", "scene.json");
    dlAnchorElem.click();
}
function isObject(v) {
    return '[object Object]' === Object.prototype.toString.call(v);
};
JSON.sort = function(o) {
if (Array.isArray(o)) {
        return o.sort().map(JSON.sort);
    } else if (isObject(o)) {
        return Object
            .keys(o)
        .sort()
            .reduce(function(a, k) {
                a[k] = JSON.sort(o[k]);

                return a;
            }, {});
    }

    return o;
}
function json2array(json){
    var result = [];
    var keys = Object.keys(json);
    keys.forEach(function(key){
        result.push(json[key]);
    });
    return result;
}