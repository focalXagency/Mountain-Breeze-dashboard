const navbar = document.querySelector(".nav-bar");
const toggle = document.querySelector('.right-arrow');
const close = document.querySelector(".left-arrow");

toggle.addEventListener('click', () => {
    navbar.classList.toggle("open");
    
})

close.addEventListener("click" , () => {
    navbar.classList.toggle("open");
})

