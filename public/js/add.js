const forms = document.forms

const auth = async e => {
  e.preventDefault()
  const url = e.target.meme.value
  // const password = e.target.password.value

  const { action, method } = e.target
  const body = { url }
  // if ( username && password) {
  const meme = await fetch(action, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })

  const result = await meme.json()
  if (result.success) {
    // window.alert(result.message)
    window.location = '/add'
  }
  else {
    window.alert(result.message)
    // window.location = '/'
  }
  // }

  // else window.alert('all fields require filling')
}



if (forms) {
  for (form of forms) {
    form.addEventListener('submit', auth)
  }
}
