// Används för start
let pokemonArray
loadPokemons()


async function loadPokemons () {
// Laddar alla Pokémons från API från start, om det inte redan finns (dock ej detaljerad info).
// Sparar dessutom en lokal array (pokemonArray) som kommer att anropas istället för API:et genom programmet.
    
    let isLocalStorageEmpty = (localStorage.getItem(LS_KEY) == null)

    // Om LS är tomt, hämta in alla pokemons från API, spara till LS och definera 'pokemonArray'
    if ( isLocalStorageEmpty ) {

        let response = await fetch(getAllPokemonsUrl, options)
        data = await response.json()
        pokemonArray = data.results
    
        let stringToSave = JSON.stringify(pokemonArray)
        localStorage.setItem(LS_KEY, stringToSave)

    } else {    /** Annars om LS inte är tomt, hämta alla pokemons från LS, definera pokemonArray */
        let stringFromLocalStorage = localStorage.getItem(LS_KEY)
        let arrayFromLocalStorage = JSON.parse(stringFromLocalStorage)
        pokemonArray = arrayFromLocalStorage
    }
}   


// Funktion för att hämta detaljerad info om en enskild Pokémon.
async function getPokemonDetails(pokemon) {
    let response = await fetch(pokemon.url)
    let data = await response.json()
    delete data.moves
    delete data.game_indices
    delete data.stats
    delete data.height
    delete data.held_items
    delete data.order
    delete data.past_types
    delete data.location_area_encounters
    delete data.weight
    return data
}


async function searchPokemon(searchInput) {
/**Funktion för att söka efter Pokémons, och returnera resultatet (foundPokemonsArray).
 * Denna funktion filtrerar bort olika icke-originala Pokémon-varianter, samt fetchar fram detaljer från APIet
 * för de Pokémon som dyker upp i sökresultatet (om inte redan detaljerna hämtats en gång).
 * Dessa detaljer sparas in både i den lokala arrayen samt till localstorage, under 'details'. */
    
    // Funktion för att filtrera bort icke-originala Pokémon-varianter,
    // samt att returnera alla Pokémon-namn som innehåller det som finns i sökfältet.
    function comparePokemonNames(pokemon) {
        if ((pokemon.name.includes('-')) == false) { return pokemon.name.includes(searchInput.toLowerCase())}
    }
    
    // Exekverar ovanstående funktion och sparar resultatet i 'foundPokemonsArray'
    let foundPokemonsArray = pokemonArray.filter(comparePokemonNames)

    let pokemonDetailsArray = []
    let pokemonListHasChanges = false;

    // För varje funnen Pokémon: om denna Pokémon INTE har hämtade detaljer, hämta dem från APIet
    // och tilldela detaljerna till Pokémon-objektet.
    for (const foundPokemon of foundPokemonsArray) {
        if ( foundPokemon.details == null ) {

            const pokemonDetails = await getPokemonDetails(foundPokemon)
            foundPokemon.details = pokemonDetails
            console.log(foundPokemon)
    
            let indexedPokemon =  getPokemonByName(foundPokemon.name)  
            indexedPokemon.details = pokemonDetails
            pokemonListHasChanges = true;
        }
    }

    // Om det har skett en förändring av Pokémon-objektet, uppdatera localStorage
    if( pokemonListHasChanges ) {
      let stringToSave = JSON.stringify(pokemonArray)
      localStorage.setItem(LS_KEY, stringToSave)
    }

    return foundPokemonsArray
}


// Funktion för att finna en Pokémon i lokal array genom att ange dens namn.
// Används i eventlyssnare för att smidigare hämta rätt Pokémon.
function getPokemonByName(pokemonName) { return pokemonArray.find(indexedPokemon => indexedPokemon.name == pokemonName) }

   
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
    newTableDataType.innerText = 'Type:  ' + capitalizeFirstLetter(pokemonDetails.types[0].type.name)

    newTableRow.append(newTableDataType)
}



// Funktion för att göra stor bokstav på angiven sträng.
function capitalizeFirstLetter(string) { return string[0].toUpperCase() + string.slice(1) }


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
    } else { overlayTitlePokemonName.innerText = capitalizeFirstLetter(pokemonDetails.name) }

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
    overlayImagePokemon.className = pokemonDetails.name
    overlayImagePokemon.src = pokemonDetails.sprites.front_default
    overlayImagePokemon.alt = pokemonDetails.name
    overlayContainerImagePokemon.innerHTML = '<a href="http://www.freepik.com">Designed by starline / Freepik</a>'
    overlayContainerImagePokemon.prepend(overlayImagePokemon)
}


function sendToWhatSlot() {
    slotPrimaryChosenPicture.src = savedData.sprites.front_default
    slotPrimaryChosenName.innerText = capitalizeFirstLetter(savedData.name)
    overlaySection.style.display = 'none'
    overlayButtonAddToTeamWithName.style.display = 'none'
    overlayInputfieldCustomName.style.display = 'none'
    overlayInputfieldCustomName.value = ''
}


// Funktion för att ta bort Pokémons från laguppställningen.
// Används av eventlyssnare på "Remove from team!"-knappen i overlay.
function removeTargetPokemon(targetPokemon) {

    targetPokemon.src = "/pictures/chosen-pokemon--blank-placeholder.png"
    
    if (targetPokemon.alt == "First chosen Pokémon") {
          targetPokemon.nextElementSibling.innerText = '#1:'
          slotsCount--
          chosenCountPart.innerText = slotsCount
        }
        
        else if (targetPokemon.alt == "Second chosen Pokémon") {
          targetPokemon.nextElementSibling.innerText = '#2:'
          slotsCount--
          chosenCountPart.innerText = slotsCount
          
        } else if (targetPokemon.alt == "Third chosen Pokémon") {
          targetPokemon.nextElementSibling.innerText = '#3:'
          slotsCount--
          chosenCountPart.innerText = slotsCount
        }
        
        else /** Om en reserve-pokémon tas bort */ { targetPokemon.parentElement.remove() }
}

function navigateTo(section) {

    if (section == 'primary') {
        sectionPrimary.style.display = 'flex'
        sectionReserves.style.display = 'none'
        sectionYourTeam.style.display = 'none'
        overlaySection.style.display = 'none'

        pageHeader.src = "/pictures/titles/title-primary-team-28.png"
        pageHeader.alt = "Primary team"
        sectionMain.style.background = '#white'

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

    else if (section == 'reserves') {
        sectionPrimary.style.display = 'flex'
        sectionReserves.style.display = 'none'
        sectionYourTeam.style.display = 'none'
        overlaySection.style.display = 'none'

        pageHeader.src = "/pictures/titles/title-reserve-team-28px.png"
        pageHeader.alt = "Reserves"
        sectionMain.style.background = '#C2C5BB'

        chosenCountContainer.style.display = 'none'
        chosenReserveContainerText.style.display = 'flex'

        resultsContainer.innerHTML = ''
        searchInputfield.value = ''
        navButtonReserveTeam.style.display = 'none'
        navButtonBackToSearch.style.display = 'flex'
        navButtonYourTeam.style.display = 'flex'

        state.currentView = 'reserves'
    }

    else if (section == 'team') {
        sectionYourTeam.style.display = 'flex'
        sectionPrimary.style.display = 'none'
        sectionReserves.style.display = 'none'
        overlaySection.style.display = 'none'

        navButtonBackToReserveTeam.style.display = 'flex'
        navButtonBackToSearchFromTeam.style.display = 'none'
        state.currentView = 'team'
    }   

    else if (section == 'overlay') {
        overlaySection.style.display = 'flex'
        overlayMessage.style.visibility = 'hidden'
        state.currentView = 'overlay'
    }   
}



function areAllSlotsAssigned() {
    let isFirstSlotEmpty = firstPrimaryChosenDiv.innerText.includes('#')
    let isSecondSlotEmpty = secondPrimaryChosenDiv.innerText.includes('#')
    let isThirdSlotEmpty = thirdPrimaryChosenDiv.innerText.includes('#')
   
    if ( (isFirstSlotEmpty == false) && (isSecondSlotEmpty == false) && (isThirdSlotEmpty == false) ) 
    {
      navButtonReserveTeam.style.filter = 'unset'
      navigateTo('reserves')
      state.currentView = 'reserves'
      return true
    } 
    else { return false }
  }