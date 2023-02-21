// INHÄMTNING AV ALLA DOM-ELEMENT------------------

function closeOverlay() {
  sectionOverlay.style.display = 'none'
  sectionOverlayDisplay.style.display = 'none'
  buttonAddToTeam.style.display = 'none'
  buttonAddToTeamWithName.style.display = 'none'
  buttonRemoveFromTeam.style.display = 'none'
  inputfieldCustomName.style.display = 'none'
}


const resultsContainer = document.querySelector('.results__container')
const tableBody = document.querySelector('.results-table-body')

const sectionMain = document.querySelector('.section__main')
    // main-sectionen, den som visas och byts ut mellan "sidorna"

    const sectionPrimary = document.querySelector('.display-primary-section')
  sectionPrimary.style.display = 'flex'
  
  const sectionReserves = document.querySelector('.display-reserves-section')
  const sectionYourTeam = document.querySelector('.display-team-section')
  




  // OVERLAY
  const sectionOverlay = document.querySelector('.section__info')
  const sectionOverlayDisplay = document.querySelector('.display-info-section')
  const buttonCloseOverlay = document.querySelector('.button-close-overlay')

  const buttonAddToTeam = document.querySelector('.button-add-to-team')
  const buttonAddToTeamWithName = document.querySelector('.button-add-to-team-with-custom-name')
  const buttonRemoveFromTeam = document.querySelector('.button-remove-from-team')
  const inputfieldCustomName = document.querySelector('.inputfield-custom-name')
  

  // Villkor omgjorda för
  const stateOfPrimarySection = sectionPrimary.style.display






  /** POKEMON-INFO */
  let pokemonContainer = document.querySelectorAll('.picture_chosen').forEach(item => {
      item.addEventListener('click', () => {
        sectionOverlay.style.display = 'flex'
        sectionOverlayDisplay.style.display = 'flex'

        // Om PRIMARY-sida syns:
        if ((sectionPrimary.style.display == 'flex')) {
          // buttonAddToTeam.style.display = 'flex'
        } 

        else if (sectionYourTeam.style.display == 'flex') {
          buttonRemoveFromTeam.style.display = 'flex'
        }
        
        
        
        
        
        else {
          buttonAddToTeam.style.display = 'none'
          buttonRemoveFromTeam.style.display = 'none'
        }
      })
    })
    
    
    buttonCloseOverlay.addEventListener('click', () => {
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
    sectionOverlay.style.display = 'none'
  })
  
  // Gå från reserves tillbaka till första sidan
  navButtonBackToSearch.addEventListener('click', () => {
    sectionPrimary.style.display = 'flex'
    sectionReserves.style.display = 'none'
    sectionYourTeam.style.display = 'none'
    sectionOverlay.style.display = 'none'
  })
  
  // Gå från reserves till 'Your Team'
  navButtonYourTeam.addEventListener('click', () => {
    sectionPrimary.style.display = 'none'
    sectionReserves.style.display = 'none'
    sectionYourTeam.style.display = 'flex'
    sectionOverlay.style.display = 'none'
  })
  
  // Gå från 'Your Team tillbaka till första sidan
  navButtonBackToReserveTeam.addEventListener('click', () => {
    sectionPrimary.style.display = 'none'
    sectionReserves.style.display = 'flex'
    sectionYourTeam.style.display = 'none'
    sectionOverlay.style.display = 'none'
  })


  //-.-.-.-.-.-.-.-.-.-.-.-.--.-.-.-..-.-.-.-.-.-.-.-.-.-.-.-.-.-.-

