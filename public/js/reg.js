const forms = document.forms

const auth = async e => {
  e.preventDefault()
  const username = e.target.username.value
  let email = 'dummy@domain'
  if(e.target.email) email = e.target.email.value
  const password = e.target.password.value
  
  const { action, method } = e.target
  const body = { username, password, email }

  if (username && email && password) {
    const login = await fetch(action, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    const result = await login.json()
    if (result.success) {
      if(e.target.name === 'register')window.alert(result.message)
      window.location = '/work'
    }
    else {
      window.alert(result.message)
      window.location = '/'
    }
  }

  else window.alert('all fields require filling')
}

if (forms) {
  for (form of forms) {
    form.addEventListener('submit', auth)
  }
}

const sw = document.querySelectorAll('.switch');

sw.forEach(element => {
  element.addEventListener('click', (e) => {
    const divs = document.querySelectorAll('.toggle')

    for (div of divs) {
      div.classList.toggle('form-invisible')
    }
  });
});

