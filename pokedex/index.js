const pokemonCount = 151;

let pokedex = {};

window.onload = async function () {
  for (let i = 1; i <= pokemonCount; i++) {
    await getPokemon(i);
    // creating a <div></div>
    let pokemon = document.createElement("div");
    pokemon.id = i;
    pokemon.innerText = i.toString() + ". " + pokedex[i]["name"].toUpperCase();
    pokemon.classList.add("pokemon-name");
    // event listener to populate the left side with the information we achieved.
    pokemon.addEventListener("click", updatePokemon);
    document.getElementById("pokemon-list").append(pokemon);
  }
  document.getElementById("pokemon-description").innerText = pokedex[1]["description"];
};

async function getPokemon(num) {
  let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();

  let response = await fetch(url);
  let pokemon = await response.json();
  // console.log(pokemon);
  let pokemonName = pokemon["name"];
  let pokemonImage = pokemon["sprites"]["front_default"];
  let pokemonType = pokemon["types"];
  // let pokemonShinyImage = pokemon["sprites"]["front_shiny"];
  response = await fetch(pokemon["species"]["url"]);
  // re fetching for more in depth info and converting via .json() again
  let pokemonDescription = await response.json();
  // console.log(pokemonDescription);
  pokemonDescription = pokemonDescription["flavor_text_entries"][9]["flavor_text"];

  pokedex[num] = { name: pokemonName, img: pokemonImage, types: pokemonType, description: pokemonDescription };
}

function updatePokemon() {
  document.getElementById("pokemon-img").src = pokedex[this.id]["img"];
  //using the pokedex variable we created above that receives the other .json() converted files.

  // now i need to clear the previous types
  const typesDiv = document.getElementById("pokemon-types");
  while (typesDiv.firstChild) {
    typesDiv.firstChild.remove();
  }
  // updating types
  let types = pokedex[this.id]["types"];
  for (let i = 0; i < types.length; i++) {
    let type = document.createElement("span");
    type.innerText = types[i]["type"]["name"].toUpperCase();
    type.classList.add("type-box");
    type.classList.add(types[i]["type"]["name"]); //add the background color and font color.
    typesDiv.append(type);
  }

  // update description

  document.getElementById("pokemon-description").innerText = pokedex[this.id]["description"];
}
