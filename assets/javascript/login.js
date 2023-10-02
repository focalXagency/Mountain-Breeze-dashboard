
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
        body: JSON.stringify(data),
      })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        localStorage.setItem('token', res.authorization.token)
        window.location.href = "Blogs.html";
        
      })
}
