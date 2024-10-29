const campoBuscar = document.getElementById('campoBuscar');
const botonBuscar = document.getElementById('botonBuscar');
const resultadosBusqueda = document.getElementById('resultados');

botonBuscar.addEventListener('click', function() {
    const campeon = campoBuscar.value.toLowerCase();


    const URL = 'https://ddragon.leagueoflegends.com/cdn/14.21.1/data/es_AR/champion.json';

    fetch(URL)
        .then(response => response.json())
        .then(data => {
            const campeones = data.data; // se accede a todos los campeones

            const campeonEncontrado = Object.values(campeones).find(champ => champ.id.toLowerCase() === campeon); // lo hace array y busca por cada campeon que haga match el id con el nombre
            
            if (campeonEncontrado) {
                
                const urlCargaBase = 'https://ddragon.leagueoflegends.com/cdn/img/champion/loading/';
                const imagenCampeonCarga = `${urlCargaBase}${campeonEncontrado.id}_0.jpg`; 
                
                resultadosBusqueda.innerHTML = `
                <div class="card" style="width: 18rem; margin-left:42.5%; margin-top: 2%;">
                    <img src="${imagenCampeonCarga}" class="card-img-top" alt="${campeonEncontrado.name}">
                    <div class="card-body">
                        <h5 class="card-title text-center">${campeonEncontrado.name}</h5>
                        <p class="card-text text-center">${campeonEncontrado.title.charAt(0).toUpperCase() + campeonEncontrado.title.slice(1)}</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item text-center">HP base: ${campeonEncontrado.stats.hp}</li>
                        <li class="list-group-item text-center">Tipo: ${campeonEncontrado.tags}</li>
                        <li class="list-group-item text-center">Recurso: ${campeonEncontrado.partype}</li>
                    </ul>
                </div>`;
            } else {
                console.log("Campeón no encontrado.");
                resultadosBusqueda.innerHTML = `<div style="color: black; background-color: white; text-align: center;">Campeón no encontrado.</div>`;
            }
        })
        .catch(error => {
            console.error("Error al obtener datos:", error);
        });
});
