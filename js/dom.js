// INHÄMTNING AV ALLA DOM-ELEMENT------------------

function closeOverlay() {
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






}


const resultsContainer = document.querySelector('.results__container')
const tableBody = document.querySelector('.results-table-body')

const sectionMain = document.querySelector('.section__main')
    // main-sectionen, den som visas och byts ut mellan "sidorna"

    const sectionPrimary = document.querySelector('.display-primary-section')
  sectionPrimary.style.display = 'flex'
  
  const sectionReserves = document.querySelector('.display-reserves-section')
  const sectionYourTeam = document.querySelector('.display-team-section')
  




//.-.- OVERLAY -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
  const overlaySection = document.querySelector('.section__info')
  const overlaySectionDisplay = document.querySelector('.display-info-section')

  //OVERLAY: Pokémon-title
  let overlayTitlePokemonName = document.querySelector('.title-pokemon-name')

  //OVERLAY: Pokémon-bild
  let overlayImagePokemon = document.querySelector('.image-overlay-pokemon')

  //OVERLAY: Container för Pokémonbild
  let overlayContainerImagePokemon = document.querySelector('.container__info__pokemon-picture')
  
  //OVERLAY: Knappar
  const overlayButtonClose = document.querySelector('.button-close-overlay')
  const overlayButtonAddToTeam = document.querySelector('.button-add-to-team')
  const overlayButtonAddToTeamWithName = document.querySelector('.button-add-to-team-with-custom-name')
  const overlayButtonRemoveFromTeam = document.querySelector('.button-remove-from-team')
  const overlayInputfieldCustomName = document.querySelector('.inputfield-custom-name')

  //OVERLAY: Paragrafer för Info-punkterna
  let overlayParagraphPokemonType = document.querySelector('.paragraph-overlay-pokemon-type')
  let overlayParagraphPokemonBaseExp = document.querySelector('.paragraph-overlay-pokemon-base-exp')
  let overlayParagraphPokemonAbilities = document.querySelector('.paragraph-overlay-pokemon-abilities')



  

  // Villkor omgjorda för
  const stateOfPrimarySection = sectionPrimary.style.display



  let savedData


  /** POKEMON-INFO */
  let pokemonContainer = document.querySelectorAll('.picture_chosen').forEach(item => {
      item.addEventListener('click', () => {
        overlaySection.style.display = 'flex'
        overlaySectionDisplay.style.display = 'flex'

        // Om PRIMARY-sida syns:
        if ((sectionPrimary.style.display == 'flex')) {
          // buttonAddToTeam.style.display = 'flex'
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
    
    
    overlayButtonClose.addEventListener('click', () => {
      closeOverlay()
    })




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










/** EVENTLISTENERS NEDAN ------------------------ */

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


  //-.-.-.-.-.-.-.-.-.-.-.-.--.-.-.-..-.-.-.-.-.-.-.-.-.-.-.-.-.-.-

