const logoutbtn = document.querySelector(".logout-btn");

logoutbtn.addEventListener('click', () => {
    window.location.href = "index.html";
    let authToken = localStorage.getItem("token");
fetch('https://mountain.lavetro-agency.com/api/logout',{
    method: 'POST',
    headers: { AUTHORIZATION: `Bearer ${authToken}` },
})
.then(res => res.json())
.then(res => console.log(res))

})

