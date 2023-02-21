// import {'../js/ditto.json'} from 

let baseUrl = 'https://pokeapi.co/api/v2/pokemon/ditto'
let options = {}




searchButton.addEventListener('click', async() => {
  searchPlaceholderText.style.display = 'none'

  let submittedData = searchInputfield.value
  // console.log(submittedData)


  let response = await fetch(baseUrl, options)
  let data = await response.json()

  // let data = {
  //   name: 'ditto',
  //   types: 'normal'
  // }
  console.log(data)

  renderSearchResults(data)

})






let newTable = document.createElement('table')
newTable.className = 'results-table'

let newTableBody = document.createElement('tbody')
newTableBody.className = 'results-table-body'
newTable.append(newTableBody)

function renderSearchResults(object) {

  resultsContainer.append(newTable)
  let newTableRow = document.createElement('tr')


  newTableRow.className = 'new-table-row'
  newTableBody.append(newTableRow)


  

  let newTableDataImage = document.createElement('td')
  newTableDataImage.className = 'td td-image'
  newTableDataImage.innerHTML = `<img class="small-search-image" src="${object.sprites.front_default}">`
  newTableRow.append(newTableDataImage)

  let newTableDataName = document.createElement('td')
  newTableDataName.className = 'td td-name'
  newTableDataName.innerText = 'Pokémon:  ' + object.name
  newTableRow.append(newTableDataName)

  let newTableDataType = document.createElement('td')
  // newTableDataType.className = 'td td-class'
  newTableDataType.innerText = 'Type:  ' + object.types[0].type.name
  // newTableDataType.innerText = 'Type:  ' + object.types
  newTableRow.append(newTableDataType)
}


let newTableRow = document.querySelectorAll('.new-table-row').forEach(item => {
  item.addEventListener('click', () => {
    console.log('klick')
  })
})