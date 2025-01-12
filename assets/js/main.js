/* variáveis normais */
const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

const maxRecords = 649;
const limit = 16;
let offset = 0;

/* function modal */
function openModal () {
    
    const pokeImageAlt = document.getElementById('#pokeImage');
    
    const modal = document.getElementById('janela-modal')
    modal.classList.add('open')    

    
    modal.addEventListener("click", (e) => {
        if(e.target.id == 'close-modal' || e.target.id == 'janela-modal') {
            modal.classList.remove('open')
        }        
    })

    
};


// convert de pokemon em lista html (segunda)

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img onclick="openModal()" id="pokeImage" src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
};

/*recebido lista de pokemons, transformou em lista html, concatenamos a lista sem espaço e virou novo html.*/

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
};

loadPokemonItens(offset, limit);

//botão de carregar mais pokemons

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(offset, limit);
    }
});