document.addEventListener('DOMContentLoaded', () => {
    // Obtém o número do Pokémon da URL
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonNumber = urlParams.get('number');
    
    

    // Verifica se o número do Pokémon foi obtido
    if (pokemonNumber) {
        fetchPokemonDetails(pokemonNumber);
    }

   

    // Função para buscar detalhes do Pokémon
    function fetchPokemonDetails(pokemonNumber) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`)
            .then(response => response.json())
            .then(pokemon => {
                displayPokemonDetails(pokemon);
            })
            .catch(error => console.error('Erro ao buscar detalhes do Pokémon:', error));
    }

    // Função para exibir os detalhes do Pokémon
    function displayPokemonDetails(pokemon) {
        document.getElementById('pokemon-name').textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
        document.getElementById('pokemon-number').textContent = `#${pokemon.id.toString().padStart(3, '0')}`;
        document.getElementById('pokemon-image').src = `./assets/img/poke_${pokemon.id}.gif`;

        // Atualiza os tipos
        const types = pokemon.types.map(typeInfo => typeInfo.type.name);
        document.getElementById('type1').textContent = types[0] || '';
        document.getElementById('type2').textContent = types[1] || '';

        // Atualiza as cores dos tipos
        const typeColors = {
            grass: '#63bb5c',
            poison: '#ab6ac8',
            fire: '#fe9c53',
            water: '#4d90d5',
            fighting: '#ce3f6a',
            psychic: '#f97077',            
           dragon: '#096dc3',            
            ghost: '#5269ab',            
            dark: '#595365',
            ground: '#d97746',            
            fairy: '#ec8fe7',
           flying: '#8fa8de',
           normal: '#9098a2',
           rock: '#c6b889',
           electric: '#f4d23b',
           bug: '#90c02c',
           ice: '#73cebf',
           steel: '#5a8fa1',

        }

        document.getElementById('type1').style.backgroundColor = typeColors[types[0]] || '#fff';
        document.getElementById('type2').style.backgroundColor = typeColors[types[1]] || '#fff';

        
        // Atualiza as estatísticas
        const stats = pokemon.stats.reduce((acc, stat) => {
            acc[stat.stat.name] = stat.base_stat;
            return acc;
        }, {});

        


        document.querySelector('#stats .stat-row:nth-child(1) .stat-number').textContent = stats.hp || '0';
        document.querySelector('#stats .stat-row:nth-child(1) .bar-inner').style.width = `${(stats.hp || 0) / 2}%`;

        document.querySelector('#stats .stat-row:nth-child(2) .stat-number').textContent = stats.attack || '0';
        document.querySelector('#stats .stat-row:nth-child(2) .bar-inner').style.width = `${(stats.attack || 0) / 2}%`;

        document.querySelector('#stats .stat-row:nth-child(3) .stat-number').textContent = stats.defense || '0';
        document.querySelector('#stats .stat-row:nth-child(3) .bar-inner').style.width = `${(stats.defense || 0) / 2}%`;

        document.querySelector('#stats .stat-row:nth-child(4) .stat-number').textContent = stats['special-attack'] || '0';
        document.querySelector('#stats .stat-row:nth-child(4) .bar-inner').style.width = `${(stats['special-attack'] || 0) / 2}%`;

        document.querySelector('#stats .stat-row:nth-child(5) .stat-number').textContent = stats['special-defense'] || '0';
        document.querySelector('#stats .stat-row:nth-child(5) .bar-inner').style.width = `${(stats['special-defense'] || 0) / 2}%`;

        document.querySelector('#stats .stat-row:nth-child(6) .stat-number').textContent = stats.speed || '0';
        document.querySelector('#stats .stat-row:nth-child(6) .bar-inner').style.width = `${(stats.speed || 0) / 2}%`;
    }

});