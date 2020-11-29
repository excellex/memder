const divs = document.querySelectorAll('.toggle');
for (div of divs) {
  div.classList.add('form-invisible')
}


const form = document.querySelector('#rec')
const auth = async e => {
  e.preventDefault()
  if(e.target.email.value){
    const email = e.target.email.value
    const { action, method } = e.target
    const body = {  email }

    const login = await fetch(action, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    const result = await login.json()
    // if (result.success) {
    //   if(e.target.name === 'register')window.alert(result.message)
    //   window.location = '/work'
    // }
    // else {
      window.alert('A message was sent to your e-mail, if that exist')
      window.location = '/'
    // }

  }
  // const password = e.target.password.value
  

  // if (username && email && password) {
   
  // }

  else window.alert('all fields require filling')
}

form.addEventListener('submit', auth)

// if (forms) {
//   for (form of forms) {
//     if(form.email) {
//       if(form.email.value){
//       }
//     }
//   }
// }

// const sw = document.querySelectorAll('.switch');

// sw.forEach(element => {
//   element.addEventListener('click', (e) => {
//     const divs = document.querySelectorAll('.toggle')

//     for (div of divs) {
//       div.classList.toggle('form-invisible')
//     }
//   });
// });

