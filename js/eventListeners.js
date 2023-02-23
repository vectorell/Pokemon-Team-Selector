
// if (areAllSlotsAssigned == true)


/**** EVENTLYSSNARE FÖR NAVIGERING ************************************/


function areAllSlotsAssigned() {
  let isFirstSlotEmpty = firstPrimaryChosenDiv.innerText.includes('#')
  let isSecondSlotEmpty = secondPrimaryChosenDiv.innerText.includes('#')
  let isThirdSlotEmpty = thirdPrimaryChosenDiv.innerText.includes('#')
  
  if ( (isFirstSlotEmpty == false) && (isSecondSlotEmpty == false) && (isThirdSlotEmpty == false) ) 
  {
    navButtonReserveTeam.style.visibility = 'visible'
    return true
  } 
  else {
    navButtonReserveTeam.style.visibility = 'hidden'
    return false
  }
}


  // Gå från startsida (primary) till reserve-team
  navButtonReserveTeam.addEventListener('click', () => {

    

    if ( areAllSlotsAssigned() == true ) {
      sectionPrimary.style.display = 'none'
      sectionReserves.style.display = 'flex'
      sectionYourTeam.style.display = 'none'
      overlaySection.style.display = 'none'
    } else {
      // meddela användare här
    }
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
  // let pokemonContainer = document.querySelectorAll('.picture_chosen').forEach(item => {
  //   item.addEventListener('click', () => {
  //     overlaySection.style.display = 'flex'
  //     overlaySectionDisplay.style.display = 'flex'

  //     // Om PRIMARY-sida syns:
  //     if ((sectionPrimary.style.display == 'flex')) {
  //     } 

  //     else if (sectionYourTeam.style.display == 'flex') {
  //       overlayButtonRemoveFromTeam.style.display = 'flex'
  //     }

  //     else {
  //       overlayButtonAddToTeam.style.display = 'none'
  //       overlayButtonRemoveFromTeam.style.display = 'none'
  //     }
  //   })
  // })


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

    overlayMessage.innerText = 'You have already selected three primary Pokémons!'
    overlayMessage.style.visibility = 'hidden'

  })



// Eventlyssnare: RENDERA VALD POKEMON TILL OVERLAY MHA 'renderToOverlay()'
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

    // lägger till "Add to team!"-knapp
    overlayButtonAddToTeam.style.display = 'flex'

})


// EVENTLYSSNARE - INHÄMTNING AV DATA VID MUSKLICK PÅ "Go!"-KNAPPEN > Rendering till sida
// -'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'
searchButton.addEventListener('click', async() => {
  searchPlaceholderText.style.display = 'none'

  
  let submittedData = (searchInputfield.value).toLowerCase()
  // console.log(submittedData)
  
  if (submittedData != '') {

    try {
      newTableBody.innerHTML = ''
      errorText.style.display = 'none'
      let response = await fetch((baseUrl+submittedData), options)
      let data = await response.json()
      savedData = data
      // let data = {
      //   name: 'ditto',
      //   types: 'normal',
      //   sprites: {front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png'}
      // }
      // console.log(data)
      saveDataToLocalStorage()
      renderSearchResults(data)
      // searchInputfield.value = ''
      
    } catch (error) {
      console.log('fel!')
      errorText.innerText = 'No such Pokémon found!'
      errorText.style.display = 'block'
      
    }
  } else if (submittedData == '') {
    errorText.innerText = 'Please enter something..'
    errorText.style.display = 'block'
  }
})



// KNAPP I OVERLAY >> "Add to team!"
overlayButtonAddToTeam.addEventListener('click', () => {
  
  let checkNames

  // Kollar alla slots om de är lediga eller tillsatta
  allChosenPrimaryPokemonName.forEach(item => {
    item.innerText.includes('#')
    return checkNames = true   
  })

  // Om det finns en ledig slot
  if (checkNames == true) {
    overlayButtonAddToTeam.style.display = 'none'
    overlayButtonAddToTeamWithName.style.display = 'flex'
    overlayInputfieldCustomName.style.display = 'flex'
    overlayMessage.style.visibility = 'visible'
    overlayMessage.innerText = 'Custom name? If not, leave the input field empty.'
  }

  // Om det INTE finns en ledig slot
  else {
    overlayMessage.innerText = 'You have already selected three primary Pokémons!'
    overlayMessage.style.visibility = 'visible'
  }
})


// KNAPP I OVERLAY >> "Add to team! (custom name)"
overlayButtonAddToTeamWithName.addEventListener('click', () => {
  
  // Om angivit custom namn på pokemonen, låt det vara pokemonens namn
  if (overlayInputfieldCustomName.value != '') { savedData.name = overlayInputfieldCustomName.value }
  
  overlayContainerImagePokemon.innerHTML = ''

  // Om slot 1 inte är upptaget, välj slot 1
  if ((firstPrimaryChosenName.innerText.includes('#1:')) == true ) {

    // savedFirstChosenPrimary = [
    //   {name: capitalizeFirstLetter(savedData.name)}, 
    //   {picture: savedData.sprites.front_default}, 
    //   {type: capitalizeFirstLetter(savedData.types[0].type.name)}, 
    //   {abilities: capitalizeFirstLetter(savedData.abilities[0].ability.name) }
    // ]

    firstPrimaryChosenPicture.src = savedData.sprites.front_default
    firstPrimaryChosenName.innerText = capitalizeFirstLetter(savedData.name)
    overlaySection.style.display = 'none'
    overlayButtonAddToTeamWithName.style.display = 'none'
    overlayInputfieldCustomName.style.display = 'none'
    overlayInputfieldCustomName.value = ''
  } 
  
  // Om slot 2 inte är upptaget, välj slot 2
  else if ((secondPrimaryChosenName.innerText.includes('#2:')) == true ) {
    secondPrimaryChosenPicture.src = savedData.sprites.front_default
    secondPrimaryChosenName.innerText = capitalizeFirstLetter(savedData.name)
    overlaySection.style.display = 'none'
    overlayButtonAddToTeamWithName.style.display = 'none'
    overlayInputfieldCustomName.style.display = 'none'
    overlayInputfieldCustomName.value = ''
  } 
  
  // Om slot 3 inte är upptaget, välj slot 3
  else if ((thirdPrimaryChosenName.innerText.includes('#3:')) == true ) {
    thirdPrimaryChosenPicture.src = savedData.sprites.front_default
    thirdPrimaryChosenName.innerText = capitalizeFirstLetter(savedData.name)
    overlaySection.style.display = 'none'
    overlayButtonAddToTeamWithName.style.display = 'none'
    overlayInputfieldCustomName.style.display = 'none'
    overlayInputfieldCustomName.value = ''
  } 

  // Om alla slots är upptagna
  else { 
    overlaySection.style.display = 'none'
    overlayButtonAddToTeamWithName.style.display = 'none'
    overlayInputfieldCustomName.style.display = 'none'
    overlaySection.style.display = 'none'
    newTableBody.innerHTML = ''
    errorText.innerText = 'You have already chosen the maximum amount of primary Pokémons!'
    errorText.style.display = 'flex'
  }
  overlayMessage.style.visibility = 'hidden'
  areAllSlotsAssigned()
})


// Ta bort pokémon från slots
pictureChosenPrimary.forEach(item => {
  item.addEventListener('click', (event) => {
    console.log(event)
    event.target.src = "/pictures/chosen-pokemon--blank-placeholder.png"

    if (event.target.alt == "First chosen Pokémon") {
      event.target.nextElementSibling.innerText = '#1:'
    }

    else if (event.target.alt == "Second chosen Pokémon") {
      event.target.nextElementSibling.innerText = '#2:'

    } else if (event.target.alt == "Third chosen Pokémon") {
      event.target.nextElementSibling.innerText = '#3:'
    }

    areAllSlotsAssigned()
  })
})