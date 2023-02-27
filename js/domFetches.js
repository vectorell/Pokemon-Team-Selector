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

    const pageHeader = document.querySelector('.page-header')

    const resultsContainer = document.querySelector('.results__container')
    const tableBody = document.querySelector('.results-table-body')

    const chosenCountContainer = document.querySelector('.container__chosen-count')
    const chosenCountPart = document.querySelector('.part')
    const chosenCountSum = document.querySelector('.sum')
    
    const chosenReserveContainerText = document.querySelector('.container__chosen-reserve')




  // ------------ DOM-ELEMENT I SEKTION "RESERVE-TEAM" -------------------
    
    // Search
    const sectionReserves = document.querySelector('.display-reserves-section')
    const searchInputfieldReserve = document.querySelector('.input-reserve-pokemon-search')
    const searchButtonReserve = document.querySelector('.button-reserve-search-submit')



  // ------------DOM-ELEMENT I SEKTION "YOUR-TEAM" -----------------------
    const sectionYourTeam = document.querySelector('.display-team-section')

    // slotsParagraph
    const slotsParagraph = document.querySelector('.paragraph-chosen-pokemon')
    
    let sectionTeamPlaceholderText = document.querySelector('.section-team-placeholder-text')


    // ALLA SLOTS
    const allChosenPrimaryPokemonDivs = document.querySelectorAll('.chosen-primary-pokemon')
    const pictureChosenPrimary = document.querySelectorAll('.picture-chosen-primary')
    
    const containerChosenPrimaryPokemon = document.querySelectorAll('.container__chosen-primary-pokemons')

    const containerChosenReservePokemon = document.querySelector('.container__chosen-reserve-pokemons')
    
    const allChosenPrimaryPokemonName = document.querySelectorAll('.chosen-primary-pokemon-name')

    let allChosenPokemonDivs = document.querySelectorAll('.chosen-pokemon')

    // SLOT 1
    const firstPrimaryChosenDiv = document.querySelector('.first-chosen-primary-pokemon')
    const firstPrimaryChosenPicture = document.querySelector('.picture-first-chosen-primary')
    const firstPrimaryChosenName = document.querySelector('.first-chosen-primary-pokemon-name')

    // SLOT 2
    const secondPrimaryChosenDiv = document.querySelector('.second-chosen-primary-pokemon')
    const secondPrimaryChosenPicture = document.querySelector('.picture-second-chosen-primary')
    const secondPrimaryChosenName = document.querySelector('.second-chosen-primary-pokemon-name')

    // SLOT 3
    const thirdPrimaryChosenDiv = document.querySelector('.third-chosen-primary-pokemon')
    const thirdPrimaryChosenPicture = document.querySelector('.picture-third-chosen-primary')
    const thirdPrimaryChosenName = document.querySelector('.third-chosen-primary-pokemon-name')


    // RE-ORDER KNAPP
    const buttonReorderTeamSection = document.querySelector('.reorder-team')

    // RE-ORDER DIV
    const divReorderTeamSection = document.querySelector('.reorder-div')

    // RE-ORDER KRYSSKNAPP
    let buttonCloseReorderContainer = document.querySelector('.button-close-reorder')    

    // RE-ORDER SUB-DIVS
    const divReorderBeforeInTeamSection = document.querySelector('.container-reorder-before')

        const divReorderBeforeFirstInTeamSection = document.querySelector('.container-reorder-before-first')
            const imageReorderBeforeFirst = document.querySelector('.image-reorder-before-first')
            const pokemonNameReorderBeforeFirst = document.querySelector('.pokemon-name-reorder-before-first')

        const divReorderBeforeSecondInTeamSection = document.querySelector('.container-reorder-before-second')
            const imageReorderBeforeSecond = document.querySelector('.image-reorder-before-second')
            const pokemonNameReorderBeforeSecond = document.querySelector('.pokemon-name-reorder-before-second')
        
        const divReorderBeforeThirdInTeamSection = document.querySelector('.container-reorder-before-third')
            const imageReorderBeforeThird = document.querySelector('.image-reorder-before-third')
            const pokemonNameReorderBeforeThird = document.querySelector('.pokemon-name-reorder-before-third')

    const confirmButtonReorder = document.querySelector('.confirm-button')
  
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
    const overlayMessage = document.querySelector('.overlay-message-paragraph')
    const overlayButtonClose = document.querySelector('.button-close-overlay')
    const overlayButtonAddToTeam = document.querySelector('.button-add-to-team')
    const overlayButtonAddToTeamWithName = document.querySelector('.button-add-to-team-with-custom-name')
    const overlayButtonRemoveFromTeam = document.querySelector('.button-remove-from-team')
    const overlayInputfieldCustomName = document.querySelector('.inputfield-custom-name')
    
    //OVERLAY: Paragrafer för Info-punkterna
    let overlayParagraphPokemonType = document.querySelector('.paragraph-overlay-pokemon-type')
    let overlayParagraphPokemonBaseExp = document.querySelector('.paragraph-overlay-pokemon-base-exp')
    let overlayParagraphPokemonAbilities = document.querySelector('.paragraph-overlay-pokemon-abilities')





/********* för DOM-rendering ************************************/
let newTable = document.createElement('table')
newTable.className = 'results-table'

let newTableBody = document.createElement('tbody')
newTableBody.className = 'results-table-body'
newTable.append(newTableBody)



/*************** DETTA ANVÄNDS FÖR START ****************' */

sectionPrimary.style.display = 'flex'

let savedData
let getAllPokemonsUrl = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
let options = {}
let data
let LS_KEY = 'pokemons'

let errorText = document.createElement('h3')
errorText.className = 'errortext'
errorText.innerText = 'No such Pokémon found!'
errorText.style.display = 'none'
resultsContainer.append(errorText)

let state = {
  currentView: 'primary',
  isPrimarySelectedDeletable: false,
  selectedPokemon: '',
  savedFirstChosenPrimary: '',
  savedSecondChosenPrimary: '',
  savedThirdChosenPrimary: ''
}

// behövs för slots räkneverk
let slotsCount = 0

