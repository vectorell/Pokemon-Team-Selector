// import {'../js/ditto.json'} from 

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




let newTable = document.createElement('table')
newTable.className = 'results-table'

let newTableBody = document.createElement('tbody')
newTableBody.className = 'results-table-body'
newTable.append(newTableBody)



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



// FUNKTION
// 1. Hämtar data för klickad tabellrad
// 2. Renderar relevant data till overlay
// 3. Öppnar overlay
// -'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-'-

async function fetchPokemon() {



//   let response = await fetch((baseUrl+targetClass), options)
//   let data = await response.json()

//  overlayTitlePokemonName.innerText = data.name
  // console.log(targetPokemon)
  // return targetClass
} 

fetchPokemon()


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









function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}

















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


