let pokemonArray

loadPokemons()



async function loadPokemons () {
    
    
    let isLocalStorageEmpty = (localStorage.getItem(LS_KEY) == null)

    // Om LS är tomt, hämta in alla pokemons från API, 
    // spara till LS och definera 'pokemonArray'
    if ( isLocalStorageEmpty ) {


        let response = await fetch(getAllPokemonsUrl, options)
        data = await response.json()
        pokemonArray = data.results
    
        let stringToSave = JSON.stringify(pokemonArray)
        localStorage.setItem(LS_KEY, stringToSave)

    // Annars om LS inte är tomt, hämta alla pokemons från LS,
    // definera pokemonArray
    } else {

        let stringFromLocalStorage = localStorage.getItem(LS_KEY)
        let arrayFromLocalStorage = JSON.parse(stringFromLocalStorage)
        pokemonArray = arrayFromLocalStorage

    }


}   



async function getPokemonDetails(pokemon) {
    let response = await fetch(pokemon.url)
    let data = await response.json()
    return data
}


async function searchPokemon(searchInput) {
    
    function comparePokemonNames(pokemon) {

        if ((pokemon.name.includes('-')) == false) {
            return pokemon.name.includes(searchInput.toLowerCase())
        }
    }
    
    let foundPokemonsArray = pokemonArray.filter(comparePokemonNames)

    let pokemonDetailsArray = []


    let pokemonListHasChanges = false;
    for (const foundPokemon of foundPokemonsArray) {
        if (foundPokemon.details == null) {

            const pokemonDetails = await getPokemonDetails(foundPokemon)
            foundPokemon.details = pokemonDetails
            console.log(foundPokemon)
            // pokemonDetailsArray.push(pokemonDetails)
    
            let indexedPokemon =  getPokemonByName(foundPokemon.name)  
            
            indexedPokemon.details = pokemonDetails
            pokemonListHasChanges = true;
        }

    }

    if(pokemonListHasChanges)
    {
      let stringToSave = JSON.stringify(pokemonArray)
      localStorage.setItem(LS_KEY, stringToSave)
    }



    return foundPokemonsArray
}



function getPokemonByName(pokemonName) {

    return pokemonArray.find(indexedPokemon => indexedPokemon.name == pokemonName)

}


  







  
  
  // FUNKTION
// 1. Tabellgenerator som renderar sökt Pokémons information till sidan
// 2. Gör varje genererad tabellrad klickbar mha "makeNewRowesClickable()"-funktionen.
function renderPokemonDetails(pokemonDetails) {
  
  // SKAPAR EN NY TABELLRAD
    resultsContainer.append(newTable)
    let newTableRow = document.createElement('tr')
    newTableRow.className = `${pokemonDetails.name} select new-table-row`
    newTableRow.id = pokemonDetails.name
    newTableBody.append(newTableRow)
  
  // SKAPAR BILD OCH LÄGGER IN I TABELLRAD
    let newTableDataImage = document.createElement('td')
    newTableDataImage.className = `${pokemonDetails.name} td td-image`
    newTableDataImage.innerHTML = `<img class="${pokemonDetails.name} small-search-image" src="${pokemonDetails.sprites.front_default}">`
    newTableRow.append(newTableDataImage)
  
  // SKAPAR NAMN OCH LÄGGER IN I TABELLRAD
    let newTableDataName = document.createElement('td')
    newTableDataName.className = `${pokemonDetails.name} td td-name`
    newTableDataName.innerText = 'Pokémon:  ' + capitalizeFirstLetter(pokemonDetails.name) 
    newTableRow.append(newTableDataName)
  
  // SKAPAR POKÉMONTYP OCH LÄGGER IN I TABELLRAD
    let newTableDataType = document.createElement('td')
    newTableDataType.className = `${pokemonDetails.name} td td-class`


        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        
        
        newTableDataType.innerText = 'Type:  ' + capitalizeFirstLetter(pokemonDetails.types[0].type.name)
        // newTableDataType.className = ` ${data.name}`
        // newTableDataType.innerText = 'Type:  ' + data.types
        
        
        
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


    newTableRow.append(newTableDataType)
}




function capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
}


function closeOverlayAndHideButtons() {
    overlaySection.style.display = 'none'
    overlayButtonAddToTeamWithName.style.display = 'none'
    overlayInputfieldCustomName.style.display = 'none'
    overlayInputfieldCustomName.value = ''
}


function clearOverlay() {
    overlayTitlePokemonName.innerText = ''
    overlayParagraphPokemonType.innerText = `Type(s): `
    overlayParagraphPokemonBaseExp.innerText = `Base Exp: `
    overlayParagraphPokemonAbilities.innerText = `Abilities: `
    overlayContainerImagePokemon.innerHTML = ''
}



// FUNKTION: RENDERING TILL OVERLAY (körs vid 'click')
function renderToOverlay(pokemonDetails) {

    if (pokemonDetails.customName) {
        overlayTitlePokemonName.innerText = capitalizeFirstLetter(pokemonDetails.customName) 
    } else {
        overlayTitlePokemonName.innerText = capitalizeFirstLetter(pokemonDetails.name) 
    }

    // Mha denna funktion hämtas och returneras samtliga 'types'
    let fetchedTypes = []
    pokemonDetails.types.forEach(type => {
        fetchedTypes.push(' ' + type.type.name)
        return fetchedTypes
    })

    overlayParagraphPokemonType.innerText = `Type(s): ${fetchedTypes}`
    
    overlayParagraphPokemonBaseExp.innerText = `Base Exp: ${pokemonDetails.base_experience}`

    // Mha denna funktion hämtas och returneras samtliga 'abilities'
    let fetchedAbilities = []
    pokemonDetails.abilities.forEach(ability => {
        fetchedAbilities.push(' ' + ability.ability.name)
        return fetchedAbilities
    })
  
    overlayParagraphPokemonAbilities.innerText = `Abilities: ${fetchedAbilities}`

    // Här skapas en bild som sedan renderas
    let overlayImagePokemon = document.createElement('img')
    overlayImagePokemon.src = pokemonDetails.sprites.front_default
    overlayImagePokemon.alt = pokemonDetails.name
    overlayContainerImagePokemon.prepend(overlayImagePokemon)


    // overlaySection.style.display = 'flex'
}




function saveDataToLocalStorage() {
    let stringFromLocalStorage = localStorage.getItem(LS_KEY)
    if (!stringFromLocalStorage) { stringFromLocalStorage = '[]' }
    
    let arrayFromLocalStorage = JSON.parse(stringFromLocalStorage)


  // let existsInLocalStorage = arrayFromLocalStorage.forEach(element => {
  //   if (data.name == element.name) {
  //     return true
  //   }
  //   else {
  //     return false
  //   }
  // })

  // console.log(existsInLocalStorage)

  // if (existsInLocalStorage == false) {

    arrayFromLocalStorage.push( savedData )
  
    let stringToSave = JSON.stringify(arrayFromLocalStorage)
    localStorage.setItem(LS_KEY, stringToSave)

  // }


}

function sendToWhatSlot() {
    slotPrimaryChosenPicture.src = savedData.sprites.front_default
    slotPrimaryChosenName.innerText = capitalizeFirstLetter(savedData.name)
    overlaySection.style.display = 'none'
    overlayButtonAddToTeamWithName.style.display = 'none'
    overlayInputfieldCustomName.style.display = 'none'
    overlayInputfieldCustomName.value = ''
}



function removeTargetPokemon(targetPokemon) {
    console.log(targetPokemon)
    console.log('3')

    targetPokemon.src = "/pictures/chosen-pokemon--blank-placeholder.png"
    
    if (targetPokemon.alt == "First chosen Pokémon") {
          targetPokemon.nextElementSibling.innerText = '#1:'
          slotsCount--
          chosenCountPart.innerText = slotsCount
          console.log('4')
        }
        
        else if (targetPokemon.alt == "Second chosen Pokémon") {
          targetPokemon.nextElementSibling.innerText = '#2:'
          slotsCount--
          chosenCountPart.innerText = slotsCount
          console.log('5')
          
        } else if (targetPokemon.alt == "Third chosen Pokémon") {
          targetPokemon.nextElementSibling.innerText = '#3:'
          slotsCount--
          chosenCountPart.innerText = slotsCount
          console.log('6')
        }
        console.log('7')
}


function navigateTo(section) {

    state.currentView = section

    if (section == 'primary') {
        sectionPrimary.style.display = 'flex'
        sectionReserves.style.display = 'none'
        sectionYourTeam.style.display = 'none'
        overlaySection.style.display = 'none'

        pageHeader.src = "/pictures/titles/title-primary-team-28.png"
        pageHeader.alt = "Primary team"

        resultsContainer.innerHTML = ''
        searchInputfield.value = ''

        chosenCountContainer.style.display = 'flex'
        chosenReserveContainerText.style.display = 'none'

        
        navButtonYourTeam.style.display = 'none'
        navButtonReserveTeam.style.display = 'flex'
        navButtonBackToSearch.style.display = 'none'
        navButtonBackToReserveTeam.style.display = 'none'

        state.currentView = 'primary'
    }   

    // else if (section != 'primary') {

    // }   

    else if (section == 'reserves') {
        
        sectionPrimary.style.display = 'flex'
        sectionReserves.style.display = 'none'
        sectionYourTeam.style.display = 'none'
        overlaySection.style.display = 'none'

        pageHeader.src = "/pictures/titles/title-reserve-team-28px.png"
        pageHeader.alt = "Reserves"

        chosenCountContainer.style.display = 'none'
        chosenReserveContainerText.style.display = 'flex'

        // let chosenReserveParagraph = document.createElement('p')
        // chosenReserveParagraph.innerText = 'Pokémons in your reserve team (optional):'
        // chosenCountContainer.append(chosenReserveParagraph)
        resultsContainer.innerHTML = ''
        searchInputfield.value = ''
        navButtonReserveTeam.style.display = 'none'
        navButtonBackToSearch.style.display = 'flex'
        navButtonYourTeam.style.display = 'flex'

        state.currentView = 'reserves'
    }

    // else if (section != 'reserves') {

    // }
    else if (section == 'team') {
        sectionYourTeam.style.display = 'flex'
        sectionPrimary.style.display = 'none'
        sectionReserves.style.display = 'none'
        overlaySection.style.display = 'none'

        navButtonBackToReserveTeam.style.display = 'flex'

        state.currentView = 'team'
    }   

    // else if (section != 'team') {
    //     sectionYourTeam.style.display = 'none'
    // }   

    else if (section == 'overlay') {
        overlaySection.style.display = 'flex'
        overlayMessage.style.visibility = 'hidden'

        state.currentView = 'overlay'
    }   

    // else { overlaySection.style.display = 'none' }
}


