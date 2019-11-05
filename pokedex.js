/*==================================================================================================
======================================== Magic Happens Here! =======================================
==================================================================================================*/
//Variables are declared.
let base_url = "https://pokeapi.co/api/v2/";     
let poke_search = document.getElementById("pokesearch");
let search = document.getElementById("search");
let previous = document.getElementById("previous");
let next = document.getElementById("next");
let list = document.getElementById("list");
let pokemon_name;
let pokemon_id;
let pokemon_moves;
let pokemon_abilities;
let pokemon_image;
let pokemon_weight;
//EventListeners are added to HTML elements.
search.addEventListener("click", function() {
    LoadPokemon(poke_search.value);
});
poke_search.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        LoadPokemon(poke_search.value);
    }
})
previous.addEventListener("click", function() {
    if (pokemon_id === undefined) {
        pokemon_id = 2;
    }
    LoadPokemon(--pokemon_id);
});
next.addEventListener("click", function() {
    if (pokemon_id === undefined) {
        pokemon_id = 0;
    }
    LoadPokemon(++pokemon_id);
})
//Function that looks up the data for a pokemon when it's given the pokemon's name or id number.
function LoadPokemon(pokemon){
    let request = new XMLHttpRequest();     // ajax new request
    let dots = 1;
    request.onreadystatechange = function() {
        if (this.readyState === 4 && this.status == 200 && pokemon !== "") {
            SetVariables(JSON.parse(this.responseText));
        }
        else {
            SetVariables(dots++);
        }
    }
    request.open("GET", base_url + "pokemon/" + pokemon.toString().toLowerCase(), true);
    request.send();
}
//This function changes the variables with the most recent pokemon's information.
function SetVariables(data){
    if(typeof data === "number") {
        console.log("Searching for data" + ".".repeat(data))
    }
    else {
        console.log("Data found!")
        pokemon_name = data.name;
        pokemon_id = data.id;
        pokemon_moves = data.moves.map(x => x.move.name);
        pokemon_abilities = data.abilities.map(x => x.ability.name);
        pokemon_image = data.sprites.front_default;
        pokemon_weight = data.weight;
        DoThingsWithTheDom();
    }
}
//This function loads all of the pokemons and stores them in a list in your HTML.
//Clicking one of the list items will then look up data for that specific pokemon!
function LoadPokemonList() {
    let request = new XMLHttpRequest();
    list.innerHTML = "";
    request.onreadystatechange = function() {
        if (this.readyState === 4 && this.status == 200) {
            let pokemon_list = JSON.parse(this.responseText).results.map(x => x.name);
            for (pokemon of pokemon_list) {
                let li = document.createElement("li");
                li.innerHTML = pokemon;
                li.addEventListener("click", function() {
                    LoadPokemon(this.innerHTML);
                })
                list.append(li);
            }
        }
    }
    request.open("GET", base_url + "pokemon?offset=0&limit=807", true);
    request.send();
}
//Function that you can call to see the current pokemon's information
function LogPokeData() {
    console.log("Name: " + pokemon_name
    + "\n" + "ID: " + pokemon_id
    + "\n" + "Moves:", pokemon_moves
    , "\n" + "Abilities:", pokemon_abilities
    , "\n" + "Image URL: " + pokemon_image
    + "\n" + "Weight: " + pokemon_weight);
}
/*==================================================================================================
======================================== Magic Ends Here! ==========================================
==================================================================================================*/

function DoThingsWithTheDom() {

     document.getElementById("pname").innerHTML= pokemon_name ;
     document.getElementById("pid").innerHTML= pokemon_id;
     document.getElementById("pmoves").innerHTML= pokemon_moves ;
     document.getElementById("pabilities").innerHTML= pokemon_abilities ;
     document.getElementById("pwt").innerHTML ='Weight:'
     function img_create() {
             let img = document.getElementById('pimage');
             img.src = pokemon_image;
             img.alt = 'image';
             img.height = '200';
             img.width = '200';
             return img;

      }
      img_create();
      document.getElementById("pweight").innerHTML = pokemon_weight;

/*
  function pokedex_image() {
  var x = document.createElement("IMG");
      x.setAttribute("src", "pokemon_image");
      x.setAttribute("width", "304");
      x.setAttribute("height", "228");
      x.setAttribute("alt", "pokemon_image");
      document.pokedex-total.appendChild(x);
  }
*/
//      document.getElementById("result-name").innerHTML= pokemon_name ;



    /*
    Write your code here!
    The following variables contain data for you to use. Be careful with the data types (some are numbers, some are strings and some are arrays)!
        pokemon_name
        pokemon_id
        pokemon_moves
        pokemon_abilities
        pokemon_image
        pokemon_weight
    The goal of the exercise is for you to display this information in your HTML.
    You can do this by placing empty tags in your HTML, and the assigning their content with JS.
    But you can also generate the HTML with document.createElement().
    */
/*       var result = document.getElementById('result');
   result.display.innerHTML = 'LogPokeData'+ 'result';  */

}
