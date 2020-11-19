function descargar() {
    ///trabajos
    db.collection("trabajos").get().then( trabajos => {    
        let obj =[];
        trabajos.forEach(function(trabajo) { 
            var trabajojson={
                descripcion: trabajo.data().descripcion,
                direccion: trabajo.data().direccion,
                estado: trabajo.data().estado,
                fechaInicio: trabajo.data().fechaInicio,
                fechaRegistro: trabajo.data().fechaRegistro,
                fechaTermino: trabajo.data().fechaTermino,
                id_usuario_sol: trabajo.data().id_usuario_sol,
                nombre: trabajo.data().nombre,
                oficio: trabajo.data().oficio,
                pago:trabajo.data().pago,
                requisitos: trabajo.data().requisitos,
                Longitude:trabajo.data().coordenadas.Longitud,
                Latitude:trabajo.data().coordenadas.Latitud
            }  
            obj.push(JSON.sort(trabajojson));   
        });  
        console.log(JSON.stringify(obj));
        bajarfile(obj);
    });  
}
function bajarfile(obj){ 
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));
    var dlAnchorElem = document.getElementById('downloadAnchorElem');
    dlAnchorElem.setAttribute("href",     dataStr     );
    dlAnchorElem.setAttribute("download", "trabajos.json");
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