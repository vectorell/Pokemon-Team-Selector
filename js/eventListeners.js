// Gå från startsida (primary) till reserve-team
navButtonReserveTeam.addEventListener('click', () => {
    if ( areAllSlotsAssigned() == true ) { navigateTo('reserves')} 
    else { /** meddela användare här */ }
})

// Gå från reserves tillbaka till första sidan
navButtonBackToSearch.addEventListener('click', () => { navigateTo('primary') })

// Gå från reserves till 'Your Team'
navButtonYourTeam.addEventListener('click', () => { 
    areAllSlotsAssigned()
    if (areAllSlotsAssigned() == true) {
        sectionTeamPlaceholderText.innerText = 'Click on a Pokémon below to display its info, or to remove it from your team.'}
    navigateTo('team')
 })

// Gå från 'Your Team tillbaka reserves
navButtonBackToReserveTeam.addEventListener('click', () => { navigateTo('reserves') })

// Kryssknapp i overlay
overlayButtonClose.addEventListener('click', () => {
    
    closeOverlayAndHideButtons()
    overlaySectionDisplay.style.display = 'none'
    overlayButtonAddToTeam.style.display = 'none'
    overlayButtonRemoveFromTeam.style.visibility = 'hidden'

    clearOverlay()
    overlayMessage.innerText = 'You have already selected three primary Pokémons!'
    overlayMessage.style.visibility = 'hidden'
  })


// Eventlyssnare: RENDERA VALD POKEMON TILL OVERLAY MHA 'renderToOverlay()'
let targetClass
newTableBody.addEventListener('click', async(event) => {

    let classString = await event.target.className
    let splitUpClasses = await classString.split(' ')
    targetClass = await splitUpClasses[0]
    state.selectedPokemon = targetClass
    try {
        renderToOverlay( getPokemonByName(targetClass).details )
        // lägger till "Add to team!"-knapp
        overlayButtonAddToTeam.style.display = 'flex'
        navigateTo('overlay')
    } catch (error) {  }    
})


// EVENTLYSSNARE - INHÄMTNING AV DATA VID MUSKLICK PÅ "Go!"-KNAPPEN > Rendering till sida
searchButton.addEventListener('click', async() => {
    resultsContainer.innerHTML = ''
    
    // searchPlaceholderText.style.display = 'none'
    let submittedData = searchInputfield.value
    
    if (submittedData != '') {
        newTableBody.innerHTML = ''
        errorText.style.display = 'none'
        let pokemonsToRender = await searchPokemon(submittedData)
        await pokemonsToRender.forEach( pokemon => {
            renderPokemonDetails(pokemon.details)
        })
        if (resultsContainer.innerHTML == '') {
            errorText.innerText = 'No such Pokémon found!'
            errorText.style.display = 'block'
            resultsContainer.append(errorText)
        }
    } else if (submittedData == '') {
        errorText.innerText = 'Please enter something..'
        errorText.style.display = 'block'
        resultsContainer.append(errorText)
    }
})


// KNAPP I OVERLAY >> "Add to team!"
overlayButtonAddToTeam.addEventListener('click', () => {
    
    if (state.currentView = 'primary') {
        let checkNames
        
        // Kollar alla slots om de är lediga eller tillsatta
        allChosenPrimaryPokemonName.forEach(item => {
          item.innerText.includes('#')
          return checkNames = true   
        })
        
        if (checkNames == true) {   /** Om det finns en ledig slot */
            overlayButtonAddToTeam.style.display = 'none'
            overlayButtonAddToTeamWithName.style.display = 'flex'
            overlayInputfieldCustomName.style.display = 'flex'
            overlayMessage.style.visibility = 'visible'
            overlayMessage.innerText = 'Custom name? If not, leave the input field empty.'
          }
      
          else {    /** Om det INTE finns en ledig slot */
              overlayMessage.innerText = 'You have already selected three primary Pokémons!'
              overlayMessage.style.visibility = 'visible'
        }
    }
    else if (state.currentView = 'reserves') {
        overlayButtonAddToTeam.style.display = 'none'
        overlayButtonAddToTeamWithName.style.display = 'flex'
        overlayInputfieldCustomName.style.display = 'flex'
        overlayMessage.style.visibility = 'visible'
        overlayMessage.innerText = 'Custom name? If not, leave the input field empty.'
    }
})



// KNAPP I OVERLAY >> "Add to team! (custom name)"
overlayButtonAddToTeamWithName.addEventListener('click', () => {
    areAllSlotsAssigned()
    
    overlayContainerImagePokemon.innerHTML = ''
    
    let pokemonDetails = getPokemonByName(state.selectedPokemon).details

    // Om angivit custom namn på pokemonen, låt det vara pokemonens namn
    let pokemonName = pokemonDetails.name
    if (overlayInputfieldCustomName.value != '') { pokemonName = overlayInputfieldCustomName.value }
    //if (overlayInputfieldCustomName.value != '') { pokemonDetails.customName = overlayInputfieldCustomName.value }
    
    if (state.currentView == 'primary') {
        
        // Om slot 1 inte är upptaget, välj slot 1
        if ((firstPrimaryChosenName.innerText.includes('#1:')) == true ) {

            state.savedFirstChosenPrimary = {
                name: getPokemonByName(pokemonDetails.name),
                customName: pokemonName
            }

            firstPrimaryChosenPicture.src = pokemonDetails.sprites.front_default
            firstPrimaryChosenName.dataset.originalName = pokemonDetails.name
            firstPrimaryChosenName.innerText = capitalizeFirstLetter(pokemonName)
            closeOverlayAndHideButtons()

            ++slotsCount
            chosenCountPart.innerText = slotsCount
        }
    
        // Om slot 2 inte är upptaget, välj slot 2
        else if ((secondPrimaryChosenName.innerText.includes('#2:')) == true ) {

            state.savedSecondChosenPrimary = {
                name: getPokemonByName(pokemonDetails.name),
                customName: pokemonName
            }
            
            secondPrimaryChosenPicture.src = pokemonDetails.sprites.front_default
            secondPrimaryChosenName.dataset.originalName = pokemonDetails.name
            secondPrimaryChosenName.innerText = capitalizeFirstLetter(pokemonName)
            closeOverlayAndHideButtons()
        
            ++slotsCount
            chosenCountPart.innerText = slotsCount
        } 
    
        // Om slot 3 inte är upptaget, välj slot 3
        else if ((thirdPrimaryChosenName.innerText.includes('#3:')) == true ) {

            state.savedThirdChosenPrimary = {
                name: getPokemonByName(pokemonDetails.name),
                customName: pokemonName
            }

            thirdPrimaryChosenPicture.src = pokemonDetails.sprites.front_default
            thirdPrimaryChosenName.dataset.originalName = pokemonDetails.name
            thirdPrimaryChosenName.innerText = capitalizeFirstLetter(pokemonName)
            closeOverlayAndHideButtons()

            ++slotsCount
            chosenCountPart.innerText = slotsCount
        } 
        else {  /** Om alla slots är upptagna */
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
        }

        
    else if (areAllSlotsAssigned() == true) {
        
        // Om angivit custom namn på pokemonen, låt det vara pokemonens namn
        if (overlayInputfieldCustomName.value != '') { pokemonName = overlayInputfieldCustomName.value }
        
        // När vi lägger till pokemonen, så vill vi;
        // 1. Skapa en div med klassnamn 'chosen__reserve-pokemon'
        let newDivChosenReservePokemon = document.createElement('div')
        newDivChosenReservePokemon.className = 'chosen__reserve-pokemon chosen-pokemon'
        newDivChosenReservePokemon.addEventListener('click', (event) => {

            targetPokemon = event.target
            targetToRemove = event.target.alt
    
            let targetName = (event.target.nextElementSibling.innerText).toLowerCase()
            event.target.nextElementSibling.dataset.originalName = pokemonDetails.name
            state.selectedPokemon = event.target.nextElementSibling.dataset.originalName
    
            pokemonDetails = getPokemonByName(state.selectedPokemon).details
            let newPokemonDetails = {}
            Object.assign(newPokemonDetails, pokemonDetails)
    
            newPokemonDetails.name = capitalizeFirstLetter(pokemonName) 
    
            overlayContainerImagePokemon.innerHTML = ''
            renderToOverlay(newPokemonDetails)
    
            overlayButtonRemoveFromTeam.style.visibility = 'visible'
            navigateTo('overlay')
        })

        // 2. Appenda 'chosen__reserve-pokemon' till 'container__chosen-reserve-pokemons'
        containerChosenReservePokemon.append(newDivChosenReservePokemon)
        
        // 3. Skapa en bild med klassnamn 'picture_chosen-reserve'
        let newPictureOfChosenPokemon = document.createElement('img')
        newPictureOfChosenPokemon.className = 'picture_chosen-reserve'
        
        // 4. Lägga in src + alt
        newPictureOfChosenPokemon.src = pokemonDetails.sprites.front_default
        newPictureOfChosenPokemon.alt = `Reserv Pokémon ${pokemonDetails.name}`
        
        // 5. Appenda till div 'chosen__reserve-pokemon'
        newDivChosenReservePokemon.append(newPictureOfChosenPokemon)
        
        // 6. Skapa ett p-element med klassnamnet 'chosen-reserve-pokemon-name'
        let newNameOfChosenPokemon = document.createElement('p')
        newNameOfChosenPokemon.className = 'chosen-reserve-pokemon-name'

        // 7. Ändra innerText till hämtat namn
        newNameOfChosenPokemon.innerText = pokemonName

        // 8. Appenda till 'chosen__reserve-pokemon'
        newDivChosenReservePokemon.append(newNameOfChosenPokemon)

        closeOverlayAndHideButtons()
    }
})
        
        
navButtonBackToSearch.addEventListener('click', () => { areAllSlotsAssigned(); navigateTo('primary') })

// Rendering av info till overlay när Pokemon klickas på i team-vyn
let targetPokemon
let targetToRemove
allChosenPokemonDivs.forEach(item => {
    item.addEventListener('click', (event) => {

        targetPokemon = event.target
        targetToRemove = event.target.alt

        let targetName = (event.target.nextElementSibling.innerText).toLowerCase()

        // Kontroll, finns det någon Pokémon att rendera?
        if (targetName.includes('#')) {
            clearOverlay()
        } else {

            state.selectedPokemon = event.target.nextElementSibling.dataset.originalName
    
            let pokemonDetails = getPokemonByName(state.selectedPokemon).details
            let newPokemonDetails = {}
            Object.assign(newPokemonDetails, pokemonDetails)
    
            newPokemonDetails.name = capitalizeFirstLetter(targetName) 
            
            overlayContainerImagePokemon.innerHTML = ''
            renderToOverlay(newPokemonDetails)
    
            overlayButtonRemoveFromTeam.style.visibility = 'visible'
    
            navigateTo('overlay')
        }
    })
})

// Remove-from-team-knapp i Overlay
overlayButtonRemoveFromTeam.addEventListener('click', () => {
    overlayButtonRemoveFromTeam.style.visibility = 'hidden'
    overlaySection.style.display = 'none'
    removeTargetPokemon(targetPokemon)
    clearOverlay()
    areAllSlotsAssigned()
    if (areAllSlotsAssigned() == false) {
        sectionTeamPlaceholderText.innerText = 'Your team is not complete! Go back and add Pokémons!'
        navButtonBackToReserveTeam.style.display = 'none'
        navButtonBackToSearchFromTeam.style.display = 'flex'
    }
    state.currentView = 'team'
})


navButtonBackToSearchFromTeam.addEventListener('click', () => { navigateTo('primary'); sectionMain.style.background = 'white' })


// Reorder-team-knapp
buttonReorderTeamSection.addEventListener('click', () => {

    let isFirstPrimarySlotEmpty = (firstPrimaryChosenName.innerText.includes('#'))
    let isSecondPrimarySlotEmpty = (secondPrimaryChosenName.innerText.includes('#'))
    let isThirdPrimarySlotEmpty = (thirdPrimaryChosenName.innerText.includes('#'))
    
    // Om någon slot är tom
    if ( isFirstPrimarySlotEmpty || isSecondPrimarySlotEmpty || isThirdPrimarySlotEmpty ) 
    { buttonReorderTeamSection.style.background = "gray" }
    
    else {
        buttonReorderTeamSection.style.background = "var(--color-pokemon-blue)"

        // 1. Samla information om vilka Pokémons som finns i valda primary, spara i en array
        let selectedPrimaryPokemonArray = [ state.savedFirstChosenPrimary, state.savedSecondChosenPrimary, state.savedThirdChosenPrimary ]

        // 2. Displaya en 'div' där denna array kan renderas till 
        divReorderTeamSection.style.display = 'flex'
    
        // Renderar/uppdaterar aktuella Pokémons till re-order-containern
        function renderToOrder(array) {
            
            imageReorderBeforeFirst.src = array[0].name.details.sprites.front_default
            if (array[0].customName != undefined) {
                pokemonNameReorderBeforeFirst.innerText = array[0].customName }   
            else { pokemonNameReorderBeforeFirst.innerText = capitalizeFirstLetter(array[0].name.name) }
            
            imageReorderBeforeSecond.src = array[1].name.details.sprites.front_default
            if (array[1].customName != undefined) {
                pokemonNameReorderBeforeSecond.innerText = array[1].customName} 
                else { pokemonNameReorderBeforeSecond.innerText = capitalizeFirstLetter(array[1].name.name) }
        
            imageReorderBeforeThird.src = array[2].name.details.sprites.front_default
            if (array[2].customName != undefined) {
                pokemonNameReorderBeforeThird.innerText = array[2].customName} 
                else { pokemonNameReorderBeforeThird.innerText = capitalizeFirstLetter(array[2].name.name) }
        }
        
        renderToOrder(selectedPrimaryPokemonArray)
        
        // Vid klick på första slotten i reorder-container, flytta den ett hack
        divReorderBeforeFirstInTeamSection.addEventListener('click', () => {
            let selectedPokemon = selectedPrimaryPokemonArray.slice(0, 1)
            
            selectedPrimaryPokemonArray.splice(2, 0, selectedPokemon[0])
            selectedPrimaryPokemonArray.splice(0, 1)
            
            state.savedFirstChosenPrimary = selectedPrimaryPokemonArray[0]
            state.savedSecondChosenPrimary = selectedPrimaryPokemonArray[1]
            state.savedThirdChosenPrimary = selectedPrimaryPokemonArray[2]
            renderToOrder(selectedPrimaryPokemonArray)
        })
        
        // Vid klick på andra slotten i reorder-container, flytta den ett hack
        divReorderBeforeSecondInTeamSection.addEventListener('click', () => {
            let selectedPokemon = selectedPrimaryPokemonArray.slice(1, 2)
            
            selectedPrimaryPokemonArray.splice(3, 0, selectedPokemon[0])
            selectedPrimaryPokemonArray.splice(1, 1)
            
            state.savedFirstChosenPrimary = selectedPrimaryPokemonArray[0]
            state.savedSecondChosenPrimary = selectedPrimaryPokemonArray[1]
            state.savedThirdChosenPrimary = selectedPrimaryPokemonArray[2]
            renderToOrder(selectedPrimaryPokemonArray)
        })
        
        // Eventlyssnare för TEAM-sektion > Confirm-button
        confirmButtonReorder.addEventListener('click', () => {
            
            firstPrimaryChosenPicture.src = state.savedFirstChosenPrimary.name.details.sprites.front_default
    
            // Här uppdateras originalName, så att rätt bild kan renderas i overlay.
            firstPrimaryChosenName.dataset.originalName = state.savedFirstChosenPrimary.name.name
            secondPrimaryChosenName.dataset.originalName = state.savedSecondChosenPrimary.name.name
            thirdPrimaryChosenName.dataset.originalName = state.savedThirdChosenPrimary.name.name
    
    
            // Om det finns customName, ange det som nya Pokémonnamnet i slots
            if (selectedPrimaryPokemonArray[0].customName != undefined) {
                firstPrimaryChosenName.innerText = capitalizeFirstLetter(state.savedFirstChosenPrimary.customName)
                
            } else /** Om det INTE finns customName, ange det som nya Pokémonnamnet i slots */
            { firstPrimaryChosenName.innerText = capitalizeFirstLetter( state.savedFirstChosenPrimary.name.name ) }
            
            // Om det finns customName, ange det som nya Pokémonnamnet i slots
            secondPrimaryChosenPicture.src = state.savedSecondChosenPrimary.name.details.sprites.front_default
            if (selectedPrimaryPokemonArray[1].customName != undefined) {
            secondPrimaryChosenName.innerText = capitalizeFirstLetter(state.savedSecondChosenPrimary.customName)} 
            
            else /** Om det INTE finns customName, ange det som nya Pokémonnamnet i slots */
            {secondPrimaryChosenName.innerText = capitalizeFirstLetter( state.savedSecondChosenPrimary.name.name )}
        
            // Om det finns customName, ange det som nya Pokémonnamnet i slots
            thirdPrimaryChosenPicture.src = state.savedThirdChosenPrimary.name.details.sprites.front_default
            if (selectedPrimaryPokemonArray[2].customName != undefined) {
                thirdPrimaryChosenName.innerText = capitalizeFirstLetter(state.savedThirdChosenPrimary.customName)}
    
            else /** Om det INTE finns customName, ange det som nya Pokémonnamnet i slots */ 
            {thirdPrimaryChosenName.innerText = capitalizeFirstLetter( state.savedThirdChosenPrimary.name.name )}
        
            divReorderTeamSection.style.display = 'none'
        })
    }
})

// Kryssknapp för reorder-container
buttonCloseReorderContainer.addEventListener('click', () => { divReorderTeamSection.style.display = 'none' })