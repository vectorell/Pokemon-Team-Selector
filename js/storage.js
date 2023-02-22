const LS_KEY = 'pokemons'

function saveDataToLocalStorage() {
  let stringFromLocalStorage = localStorage.getItem(LS_KEY)
  if (!stringFromLocalStorage) { stringFromLocalStorage = '[]' }

  let arrayFromLocalStorage = JSON.parse(stringFromLocalStorage)


  // let existsInLocalStorage = arrayFromLocalStorage.forEach(element => {
  //   if (data.name == element.name) {
  //     return true
  //   }
  //   else {
  //     return false
  //   }
  // })

  // console.log(existsInLocalStorage)

  // if (existsInLocalStorage == false) {

    arrayFromLocalStorage.push( savedData )
  
    let stringToSave = JSON.stringify(arrayFromLocalStorage)
    localStorage.setItem(LS_KEY, stringToSave)

  // }


}

// async function isFoundInLocalStorage() {
//   let stringFromLocalStorage = localStorage.getItem(LS_KEY)
//   if (!stringFromLocalStorage) { stringFromLocalStorage = '[]' }

//   let arrayFromLocalStorage = await JSON.parse(stringFromLocalStorage)
//   console.log(arrayFromLocalStorage)

//   if (arrayFromLocalStorage.includes(savedData)) {
//     console.log('true')
//   } else {
//     console.log('false')
    
//   }


// }
