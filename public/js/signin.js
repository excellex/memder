const forms = document.forms
const auth = async e => {
  e.preventDefault()

  const username = e.target.username.value
  const password = e.target.password.value

  const { action, method } = e.target
  const body = { username, password }
  if ( username && password) {
    const login = await fetch(action, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    const result = await login.json()
    if (result.success) {
      // window.alert(result.message)
      window.location = '/'
    }
    else {
      window.alert(result.message)
      // window.location = '/'
    }
  }

  else window.alert('all fields require filling')
}



if (forms) {
  for (form of forms) {
    form.addEventListener('submit', auth)
  }
}
