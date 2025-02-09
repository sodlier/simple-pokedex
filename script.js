async function fetchPokemon() {
    console.log("Fetching Pokemon data...");

    const pokemonName = document.getElementById('pokemonInput').value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    const nameElement = document.querySelector('.name');
    const imgElement = document.querySelector('.sprite');
    const weightElement = document.querySelector('.weight');
    const weightContainer = document.querySelector('.weight-container');

    if (!pokemonName) {
        nameElement.textContent = "Please enter a Pokemon name";
        return;
    }

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Pokemon not found');

        const data = await res.json();
        const name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        const sprite = data.sprites.other["official-artwork"].front_default;
        const weight = (data.weight / 10).toFixed(1);

        // UI set
        nameElement.textContent = name;
        imgElement.src = sprite;
        imgElement.alt = name;
        weightElement.textContent = weight;

        // Hide
        imgElement.classList.remove('hidden');
        weightContainer.classList.remove('hidden');

        console.log(`Pokémon: ${name}, Weight: ${weight} kg`);

    } catch (error) {
        console.error("Error fetching pokemon: ", error.message);
        document.querySelector('.card').innerHTML = `<h2 class="error">Pokémon not found.</h2>`;

        imgElement.classList.add('hidden');
        weightContainer.classList.add('hidden');
    }
}