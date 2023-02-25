/**** EVENTLYSSNARE FÖR NAVIGERING ************************************/


function areAllSlotsAssigned() {
  let isFirstSlotEmpty = firstPrimaryChosenDiv.innerText.includes('#')
  let isSecondSlotEmpty = secondPrimaryChosenDiv.innerText.includes('#')
  let isThirdSlotEmpty = thirdPrimaryChosenDiv.innerText.includes('#')
 
  if ( (isFirstSlotEmpty == false) && (isSecondSlotEmpty == false) && (isThirdSlotEmpty == false) ) 
  {
    navButtonReserveTeam.style.filter = 'unset'
    state.currentView = 'reserves'
    return true
  } 
  else {
    state.currentView = 'primary'
    return false
  }
}



// Gå från startsida (primary) till reserve-team
navButtonReserveTeam.addEventListener('click', () => {

    if ( areAllSlotsAssigned() == true ) {
        navigateTo('reserves')
    } else {
      // meddela användare här
    }
})




// ONÖÖÖÖDIGTT???
// Gå från reserves tillbaka till första sidan
navButtonBackToSearch.addEventListener('click', () => {
    navigateTo('primary')
})


// Gå från reserves till 'Your Team'
navButtonYourTeam.addEventListener('click', () => {
    navigateTo('team')
})

// Gå från 'Your Team tillbaka reserves
navButtonBackToReserveTeam.addEventListener('click', () => {
    navigateTo('reserves')
})



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

    // console.log(targetClass)
  
    // if (targetClass != savedData.name) {
    //     let response = await fetch((baseUrl+targetClass), options)
    //     let data = await response.json()
    //     console.log('data was fetched')
        
    //     renderToOverlay(data)
    //     console.log('ny data hämtad')
    //     savedData = data

    // } else if (targetClass == savedData.name) {
    //     renderToOverlay(savedData)
    //     console.log('sparad data använd')
    // }



    

    renderToOverlay( getPokemonByName(targetClass).details )

    // lägger till "Add to team!"-knapp
    overlayButtonAddToTeam.style.display = 'flex'

    navigateTo('overlay')

    
})


// EVENTLYSSNARE - INHÄMTNING AV DATA VID MUSKLICK PÅ "Go!"-KNAPPEN > Rendering till sida
// -'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'
searchButton.addEventListener('click', async() => {
    
    searchPlaceholderText.style.display = 'none'
    
    let submittedData = searchInputfield.value

    
    
    
    if (submittedData != '') {
        try {
            
            
            newTableBody.innerHTML = ''
            errorText.style.display = 'none'
            
            let pokemonsToRender = await searchPokemon(submittedData)
            
            pokemonsToRender.forEach( pokemon => {
                renderPokemonDetails(pokemon.details)

            })







            // let response = await fetch((baseUrl+submittedData), options)
            // let data = await response.json()
            // savedData = data
            // saveDataToLocalStorage()
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
    
    if (state.currentView = 'primary') {
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
        
        console.log('test3')

        // Om slot 1 inte är upptaget, välj slot 1
        if ((firstPrimaryChosenName.innerText.includes('#1:')) == true ) {

            // savedFirstChosenPrimary = [
            //   {name: capitalizeFirstLetter(savedData.name)}, 
            //   {picture: savedData.sprites.front_default}, 
            //   {type: capitalizeFirstLetter(savedData.types[0].type.name)}, 
            //   {abilities: capitalizeFirstLetter(savedData.abilities[0].ability.name) }
            // ]

            firstPrimaryChosenPicture.src = pokemonDetails.sprites.front_default
            firstPrimaryChosenName.dataset.originalName = pokemonDetails.name
            firstPrimaryChosenName.innerText = capitalizeFirstLetter(pokemonName)
            closeOverlayAndHideButtons()

            ++slotsCount
            chosenCountPart.innerText = slotsCount
        }
    
        // Om slot 2 inte är upptaget, välj slot 2
        else if ((secondPrimaryChosenName.innerText.includes('#2:')) == true ) {
            secondPrimaryChosenPicture.src = pokemonDetails.sprites.front_default
            secondPrimaryChosenName.dataset.originalName = pokemonDetails.name
            secondPrimaryChosenName.innerText = capitalizeFirstLetter(pokemonName)
            closeOverlayAndHideButtons()
        
            ++slotsCount
            chosenCountPart.innerText = slotsCount
        } 
    
        // Om slot 3 inte är upptaget, välj slot 3
        else if ((thirdPrimaryChosenName.innerText.includes('#3:')) == true ) {
            thirdPrimaryChosenPicture.src = pokemonDetails.sprites.front_default
            thirdPrimaryChosenName.dataset.originalName = pokemonDetails.name
            thirdPrimaryChosenName.innerText = capitalizeFirstLetter(pokemonName)
            closeOverlayAndHideButtons()

            ++slotsCount
            chosenCountPart.innerText = slotsCount
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
        }


        
    else if (state.currentView == 'reserves') {
        console.log('NU KÖRS RESERVES!')
        
        // Om angivit custom namn på pokemonen, låt det vara pokemonens namn
        if (overlayInputfieldCustomName.value != '') { pokemonName = overlayInputfieldCustomName.value }
        
        // När vi lägger till pokemonen, så vill vi;
        
        // 1. Skapa en div med klassnamn 'chosen__reserve-pokemon'
        let newDivChosenReservePokemon = document.createElement('div')
        newDivChosenReservePokemon.className = 'chosen__reserve-pokemon chosen-pokemon'
        newDivChosenReservePokemon.addEventListener('click', (event) => {

            targetPokemon = event.target
            console.log('klick på any')
            targetToRemove = event.target.alt
            console.log(event)
            // console.log(target)
    
            let targetName = (event.target.nextElementSibling.innerText).toLowerCase()
            console.log(targetName)

            event.target.nextElementSibling.dataset.originalName = pokemonDetails.name
    
            state.selectedPokemon = event.target.nextElementSibling.dataset.originalName
    
            pokemonDetails = getPokemonByName(state.selectedPokemon).details
            let newPokemonDetails = {}
            Object.assign(newPokemonDetails, pokemonDetails)
    
            newPokemonDetails.name = capitalizeFirstLetter(pokemonName) 
            console.log(newPokemonDetails)
    
            // async function fetchData() {
            //     let response = await fetch((baseUrl+targetName), {})
            //     let data = await response.json()
                overlayContainerImagePokemon.innerHTML = ''
                renderToOverlay(newPokemonDetails)
            // }
    
            // fetchData()
    
    
    
            overlayButtonRemoveFromTeam.style.visibility = 'visible'
            // overlaySection.style.display = 'flex'
    
            navigateTo('overlay')
        })
        // newDivChosenReservePokemon.onclick = function() {
        //     //chosenPokemonClicked(this);
        //     alert('hej hej')
        //     console.log(this)
        // }

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
        
        
        
// Ta bort pokémon från slots
// pictureChosenPrimary.forEach(item => {
//     item.addEventListener('click', (event) => {
        
//         if (state.isPrimarySelectedDeletable == true) {
//             console.log(event)
//             event.target.src = "/pictures/chosen-pokemon--blank-placeholder.png"
    
//             if (event.target.alt == "First chosen Pokémon") {
//                 event.target.nextElementSibling.innerText = '#1:'
//                 slotsCount--
//                 chosenCountPart.innerText = slotsCount
//             }
        
//         else if (event.target.alt == "Second chosen Pokémon") {
//             event.target.nextElementSibling.innerText = '#2:'
//             slotsCount--
//             chosenCountPart.innerText = slotsCount
            
//             } else if (event.target.alt == "Third chosen Pokémon") {
//                 event.target.nextElementSibling.innerText = '#3:'
//                 slotsCount--
//                 chosenCountPart.innerText = slotsCount
//             }
    
//         areAllSlotsAssigned()
//     }
//     })
// })


navButtonBackToSearch.addEventListener('click', () => {
  areAllSlotsAssigned()
})


/**
 * Vid klick på pokemon, 
 *      1. spara 'event.target.alt' i en variabel för att skilja dem åt.
 *      2. Öppna overlay med knapp för att ta bort
 *      3. 
 * 
 */


// Rendering av info till overlay när Pokemon klickas på i team-vyn
let targetPokemon
let targetToRemove
allChosenPokemonDivs.forEach(item => {
    item.addEventListener('click', (event) => {
        
        targetPokemon = event.target
        console.log('klick på any')
        targetToRemove = event.target.alt
        console.log(event)
        // console.log(target)

        let targetName = (event.target.nextElementSibling.innerText).toLowerCase()
        console.log(targetName)

        state.selectedPokemon = event.target.nextElementSibling.dataset.originalName

        let pokemonDetails = getPokemonByName(state.selectedPokemon).details
        let newPokemonDetails = {}
        Object.assign(newPokemonDetails, pokemonDetails)

        newPokemonDetails.name = capitalizeFirstLetter(targetName) 
        console.log(newPokemonDetails)

        // async function fetchData() {
        //     let response = await fetch((baseUrl+targetName), {})
        //     let data = await response.json()
            overlayContainerImagePokemon.innerHTML = ''
            renderToOverlay(newPokemonDetails)
        // }

        // fetchData()



        overlayButtonRemoveFromTeam.style.visibility = 'visible'
        // overlaySection.style.display = 'flex'

        navigateTo('overlay')

    })
})

overlayButtonRemoveFromTeam.addEventListener('click', () => {
    // console.log(event)
    console.log('1')
    overlayButtonRemoveFromTeam.style.visibility = 'hidden'
    overlaySection.style.display = 'none'
    removeTargetPokemon(targetPokemon)
    clearOverlay()
    console.log('2')
    state.currentView = 'team'
})