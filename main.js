const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
const pokemonList = [];
let URL = "https://pokeapi.co/api/v2/pokemon/";

 showLoader();

for (let i = 1; i <= 1025; i++) {
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => addPokemon(data))
}

function addPokemon(data){
    pokemonList.push(data);
    if(pokemonList.length == 1025){
        hideLoader();
        filterAndSortPokemon(null);
    }
}

function filterAndSortPokemon(filter){
    listaPokemon.textContent = '';
    pokemonList.filter(pok => filter === null || typesContainedIn(pok.types, filter)).sort((a,b) => a.id > b.id ? 1 : -1 ).forEach(poke => mostrarPokemon(poke));
}

function typesContainedIn(types, filterType){
    const typesPlain = types.map(type => type.type).map(type => type.name);
    return typesPlain.includes(filterType);
}

function mostrarPokemon(poke) {

    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');

    let pokeId = poke.id.toString().padStart(3,'0');
/*<img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">*/

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
        <a id="pokemon-a" href="cards.html">
            <p class="pokemon-id-back">#${pokeId}</p>
            <div class="pokemon-imagen">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
            </div>
            <div class="pokemon-info">
                <div class="nombre-contenedor">
                    <p class="pokemon-id">#${pokeId}</p>
                    <h2 class="pokemon-nombre">${poke.name}</h2>
                </div>
                <div class="pokemon-tipos">
                    ${tipos}
                </div>
                <div class="pokemon-stats">
                    <p class="stat">Altura:</p>
                    <p class="stat">${poke.height}m</p>
                    <p class="stat">Peso:</p>
                    <p class="stat">${poke.weight}kg</p>
                </div>
            </div>
        </a>
    `;
    listaPokemon.append(div);
}

function showLoader(){
    document.querySelector('#todos').classList.add('hidden');
    document.querySelector('#loader').classList.remove('hidden');
}
function hideLoader(){
    document.querySelector('#todos').classList.remove('hidden');
    document.querySelector('#loader').classList.add('hidden');
}

botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;
    filterAndSortPokemon(`${botonId}` === 'ver-todos' ? null : botonId);

    // listaPokemon.innerHTML = "";

    // for (let i = 1; i <= 151; i++) {
    //     fetch(URL + i)
    //         .then((response) => response.json())
    //         .then(data => {

    //             if(botonId === "ver-todos") {
    //                 mostrarPokemon(data);
    //             } else {
    //                 const tipos = data.types.map(type => type.type.name);
    //                 if (tipos.some(tipo => tipo.includes(botonId))) {
    //                     mostrarPokemon(data);
    //                 }
    //             }

    //         })
    // }
}))
