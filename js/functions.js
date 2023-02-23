  // FUNKTION
// 1. Tabellgenerator som renderar sökt Pokémons information till sidan
// 2. Gör varje genererad tabellrad klickbar mha "makeNewRowesClickable()"-funktionen.
function renderSearchResults(data) {
  
  // SKAPAR EN NY TABELLRAD
    resultsContainer.append(newTable)
    let newTableRow = document.createElement('tr')
    newTableRow.className = `${data.name} select new-table-row`
    newTableRow.id = data.name
    newTableBody.append(newTableRow)
  
  // SKAPAR BILD OCH LÄGGER IN I TABELLRAD
    let newTableDataImage = document.createElement('td')
    newTableDataImage.className = `${data.name} td td-image`
    newTableDataImage.innerHTML = `<img class="${data.name} small-search-image" src="${data.sprites.front_default}">`
    newTableRow.append(newTableDataImage)
  
  // SKAPAR NAMN OCH LÄGGER IN I TABELLRAD
    let newTableDataName = document.createElement('td')
    newTableDataName.className = `${data.name} td td-name`
    newTableDataName.innerText = 'Pokémon:  ' + capitalizeFirstLetter(data.name) 
    newTableRow.append(newTableDataName)
  
  // SKAPAR POKÉMONTYP OCH LÄGGER IN I TABELLRAD
    let newTableDataType = document.createElement('td')
    newTableDataType.className = `${data.name} td td-class`


        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        
        
        newTableDataType.innerText = 'Type:  ' + capitalizeFirstLetter(data.types[0].type.name)
        // newTableDataType.className = ` ${data.name}`
        // newTableDataType.innerText = 'Type:  ' + data.types
        
        
        
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


    newTableRow.append(newTableDataType)
}




function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}









// FUNKTION: RENDERING TILL OVERLAY (körs vid 'click')
function renderToOverlay(data) {
  overlayTitlePokemonName.innerText = capitalizeFirstLetter(data.name) 

  // overlayParagraphPokemonType.innerText = 'Type: ' + capitalizeFirstLetter(data.types[0].type.name)
  let fetchedTypes = []
  data.types.forEach(type => {
    fetchedTypes.push(' ' + type.type.name)
    return fetchedTypes
  })
  overlayParagraphPokemonType.innerText = `Type(s): ${fetchedTypes}`
  
  
  
  overlayParagraphPokemonBaseExp.innerText = `Base Exp: ${data.base_experience}`

  let fetchedAbilities = []
  data.abilities.forEach(ability => {
    fetchedAbilities.push(' ' + ability.ability.name)
    return fetchedAbilities
  })
  overlayParagraphPokemonAbilities.innerText = `Abilities: ${fetchedAbilities}`








  let overlayImagePokemon = document.createElement('img')
    
  overlayImagePokemon.src = data.sprites.front_default
  overlayImagePokemon.alt = data.name
  overlayContainerImagePokemon.prepend(overlayImagePokemon)
      
  overlaySection.style.display = 'flex'
}



const LS_KEY = 'pokemons'

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