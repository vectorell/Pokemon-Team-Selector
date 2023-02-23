

/**
 * 
 *     DENNA FILENS INNEHÅLL: 
 * 
 *      1. Hämtning av DOM-element
 * 
 *      2. Eventlyssnare för navigering i appen 
 *          - ("sidbyte" samt öppna/stänga overlay)
 * 
 *      3. DOM-renderingsfunktioner
 * 
 */


/************** 1: INHÄMTNING AV ALLA DOM-ELEMENT*****************************/

  // ------------"UNIVERSIALA DOM-ELEMENT" ---------------------------
    
    // main-sectionen, den som visas och byts ut mellan "sidorna"
    const sectionMain = document.querySelector('.section__main')
    
    /** SEARCH-ELEMENT */
    const searchInputfield = document.querySelector('.input-pokemon-search')
    const searchButton = document.querySelector('.button-search-submit')
    const searchResultContainer = document.querySelector('.results__container')
    const searchPlaceholderText = document.querySelector('.section-placeholder-text')

    /** NAV-KNAPP-ELEMENT */
    const navButtonReserveTeam = document.querySelector('.button-reserve-team')
    const navButtonBackToReserveTeam = document.querySelector('.button-back-to-reserve-team')
    const navButtonYourTeam = document.querySelector('.button-your-team')
    const navButtonBackToSearch = document.querySelector('.button-search-pokemons')



  // ------------DOM-ELEMENT I SEKTION "PRIMARY-TEAM" -------------------
    const sectionPrimary = document.querySelector('.display-primary-section')
    const resultsContainer = document.querySelector('.results__container')
    const tableBody = document.querySelector('.results-table-body')




  // ------------ DOM-ELEMENT I SEKTION "RESERVE-TEAM" -------------------
    const sectionReserves = document.querySelector('.display-reserves-section')




  // ------------DOM-ELEMENT I SEKTION "YOUR-TEAM" -----------------------
    const sectionYourTeam = document.querySelector('.display-team-section')
  


  
  // ------------DOM-ELEMENT I SEKTION "OVERLAY" -------------------------
    const overlaySection = document.querySelector('.section__info')
    const overlaySectionDisplay = document.querySelector('.display-info-section')
    
    // OVERLAY: Container för Pokémonbild
    let overlayContainerImagePokemon = document.querySelector('.container__info__pokemon-picture')

    // OVERLAY: Pokémon-title
    let overlayTitlePokemonName = document.querySelector('.title-pokemon-name')

    // OVERLAY: Pokémon-bild
    let overlayImagePokemon = document.querySelector('.image-overlay-pokemon')

    // OVERLAY: Knappar
    const overlayButtonClose = document.querySelector('.button-close-overlay')
    const overlayButtonAddToTeam = document.querySelector('.button-add-to-team')
    const overlayButtonAddToTeamWithName = document.querySelector('.button-add-to-team-with-custom-name')
    const overlayButtonRemoveFromTeam = document.querySelector('.button-remove-from-team')
    const overlayInputfieldCustomName = document.querySelector('.inputfield-custom-name')
    
    //OVERLAY: Paragrafer för Info-punkterna
    let overlayParagraphPokemonType = document.querySelector('.paragraph-overlay-pokemon-type')
    let overlayParagraphPokemonBaseExp = document.querySelector('.paragraph-overlay-pokemon-base-exp')
    let overlayParagraphPokemonAbilities = document.querySelector('.paragraph-overlay-pokemon-abilities')




/*********** 2: EVENTLYSSNARE********************************************** */

  // Gå från startsida (primary) till reserve-team
  navButtonReserveTeam.addEventListener('click', () => {
    sectionPrimary.style.display = 'none'
    sectionReserves.style.display = 'flex'
    sectionYourTeam.style.display = 'none'
    overlaySection.style.display = 'none'
  })
  
  // Gå från reserves tillbaka till första sidan
  navButtonBackToSearch.addEventListener('click', () => {
    sectionPrimary.style.display = 'flex'
    sectionReserves.style.display = 'none'
    sectionYourTeam.style.display = 'none'
    overlaySection.style.display = 'none'
  })
  
  // Gå från reserves till 'Your Team'
  navButtonYourTeam.addEventListener('click', () => {
    sectionPrimary.style.display = 'none'
    sectionReserves.style.display = 'none'
    sectionYourTeam.style.display = 'flex'
    overlaySection.style.display = 'none'
  })
  
  // Gå från 'Your Team tillbaka till första sidan
  navButtonBackToReserveTeam.addEventListener('click', () => {
    sectionPrimary.style.display = 'none'
    sectionReserves.style.display = 'flex'
    sectionYourTeam.style.display = 'none'
    overlaySection.style.display = 'none'
  })


  /** POKEMON-INFO */
  let pokemonContainer = document.querySelectorAll('.picture_chosen').forEach(item => {
    item.addEventListener('click', () => {
      overlaySection.style.display = 'flex'
      overlaySectionDisplay.style.display = 'flex'

      // Om PRIMARY-sida syns:
      if ((sectionPrimary.style.display == 'flex')) {
      } 

      else if (sectionYourTeam.style.display == 'flex') {
        overlayButtonRemoveFromTeam.style.display = 'flex'
      }

      else {
        overlayButtonAddToTeam.style.display = 'none'
        overlayButtonRemoveFromTeam.style.display = 'none'
      }
    })
  })


  // Kryssknapp i overlay
  overlayButtonClose.addEventListener('click', () => {
    overlaySection.style.display = 'none'
    overlaySectionDisplay.style.display = 'none'
    overlayButtonAddToTeam.style.display = 'none'
    overlayButtonAddToTeamWithName.style.display = 'none'
    overlayButtonRemoveFromTeam.style.display = 'none'
    overlayInputfieldCustomName.style.display = 'none'
  
    overlayParagraphPokemonType.innerText = ''
    overlayParagraphPokemonBaseExp.innerText = ''
    overlayParagraphPokemonAbilities.innerText = ''
    overlayTitlePokemonName.innerText = ''
    overlayContainerImagePokemon.innerHTML = ''
  })








/*************** DETTA ANVÄNDS FÖR START ****************' */
  sectionPrimary.style.display = 'flex'
  let savedData





/********* 3. Funktioner för DOM-rendering ************************************/


  let newTable = document.createElement('table')
  newTable.className = 'results-table'
  
  let newTableBody = document.createElement('tbody')
  newTableBody.className = 'results-table-body'
  newTable.append(newTableBody)


  function capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
  }



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



    // makeNewRowesClickable(data)
    // fetchPokemon()

    newTableRow.append(newTableDataType)
}



// FUNKTION: RENDERA VALD POKEMON TILL OVERLAY MHA 'renderToOverlay()'
let targetClass
newTableBody.addEventListener('click', async(event) => {

  let classString = await event.target.className
  let splitUpClasses = await classString.split(' ')
  targetClass = await splitUpClasses[0]
  console.log(targetClass)
  
  if (targetClass != savedData.name) {
    
    let response = await fetch((baseUrl+targetClass), options)
    let data = await response.json()
    console.log('data was fetched')

    renderToOverlay(data)
    console.log('ny data hämtad')
    savedData = data
      
      
    } else if (targetClass == savedData.name) {
        renderToOverlay(savedData)
        console.log('sparad data använd')
    }

})

// FUNKTION: RENDERING TILL OVERLAY (körs vid 'click')
function renderToOverlay(data) {
  overlayTitlePokemonName.innerText = capitalizeFirstLetter(data.name) 
  overlayParagraphPokemonType.innerText = 'Type: ' + capitalizeFirstLetter(data.types[0].type.name)
  overlayParagraphPokemonBaseExp.innerText = `Base Exp: ${data.base_experience}`
  overlayParagraphPokemonAbilities.innerText = 'Abilities: ' + capitalizeFirstLetter(data.abilities[0].ability.name) 
      
  let overlayImagePokemon = document.createElement('img')
      
  overlayImagePokemon.src = data.sprites.front_default
  overlayImagePokemon.alt = data.name
  overlayContainerImagePokemon.prepend(overlayImagePokemon)
        
  overlaySection.style.display = 'flex'
}



