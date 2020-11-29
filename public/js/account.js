

// const sendlot = async e => {
//   e.preventDefault()
//   const name = e.target.name.value
//   const price = e.target.price.value
//   const link = e.target.link.value
//   const body = { name, price, link }
//   const { action, method } = e.target
//   if (name && price && link) {

//     const place = await fetch(action, {
//       method,
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(body)
//     })

//     const result = await place.json()
//     const div = document.querySelector('#hidden')
//     div.classList.toggle('hide-element')
//     window.location = '/account'
//   }

//   else {
//     window.alert('all fields require filling')
//   }
// }

// form.addEventListener('submit', sendlot)
