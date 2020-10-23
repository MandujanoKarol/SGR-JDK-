    ///Mapa estilos
    const tilesProvider = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    ///centrar mapa en cierta coordenada
    let Mapview = L.map('mapadesplazarme').setView([21.125132,-101.674798],13);
    ///Agregar a  mapa propiedades
    L.tileLayer(tilesProvider,{maxZoom:17,}).addTo(Mapview); 