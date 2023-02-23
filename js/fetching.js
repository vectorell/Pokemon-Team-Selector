let baseUrl = 'https://pokeapi.co/api/v2/pokemon/'
let options = {}
let data

let errorText = document.createElement('h3')
errorText.className = 'errortext'
errorText.innerText = 'No such Pokémon found!'
errorText.style.display = 'none'
resultsContainer.append(errorText)

















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



























// console.log(targetClass)

// async function makeNewRowesClickable() {



  
//   console.log(target)
//   // FUNKAR HITTILS
  
//   let response = await fetch((baseUrl+data.name), options)
//   let target = await response.json()
  
//   sectionPrimary.addEventListener('click', event => {
//     event.stopPropagation()
//     // för att hämta vilken pokemon det handlar om via klassnamn
//     let classString = event.target.className
//     let splitUpClasses = classString.split(' ')
//     let targetClass = splitUpClasses[0]
//     console.log(targetClass)
    
      
//   })













  // let newTableRow = document.querySelector('.new-table-row')
  // newTableRow.addEventListener('click', () => {
  //   console.log('test')
  // })


  // document.querySelectorAll('.new-table-row').forEach(row => {

  //   row.addEventListener('click', () => {

  //     console.log('TEST: klickresponse på "makeNewRowesClickable"')
  //     console.log(target)
  //     return target
      
  //   })

    
    
    
    
    
    
    //Nu får vi tillbaka "target" som har innehållet från respektive individuell rad.
    // Nu ska vi rendera till overlay
    
    
    

    
    
    //Nu ska vi öppna overlay
  // })
  
  // overlayTitlePokemonName.innerText = target.name
  // console.log(overlayTitlePokemonName)


// }


