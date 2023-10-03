
const handleLogin = (event) => {
    event.preventDefault()
    const user = document.querySelector('#user').value
    const pass = document.querySelector('#pass').value
    const data ={
        password: pass,
        email: user
    }
    fetch('https://mountain.lavetro-agency.com/api/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
<<<<<<< HEAD
        body : JSON.stringify(data)
=======
        body: JSON.stringify(data),
>>>>>>> 5c37dd7822ef48e0c924ccfcba0638e85989cf01
      })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        localStorage.setItem('token', res.authorization.token)
        window.location.href = "Blogs.html";
        
      })
}
