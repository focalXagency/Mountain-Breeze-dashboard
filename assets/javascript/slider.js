const sliders =Array.from(document.querySelectorAll(".slider"));
let slideCount = sliders.length;

let currentSlide = 1;

const prevBtn = document.getElementById('prev'); 
const nextBtn = document.getElementById('next'); 

const filterItem = document.querySelectorAll('.filter .menu li');
const lines = document.querySelectorAll('.filter .menu li .line');
lines[0].classList.add('active-line-filter');
filterItem[0].classList.add('active-filter');




function nextSlide(){
    if (nextBtn.classList.contains('disabled')) {
        
        return false;
    }else{
        currentSlide++;
        theChecker();
    }
}
nextBtn.addEventListener('click' , nextSlide);

function prevSlide() {
    if (prevBtn.classList.contains('disabled')) {
        
        return false;
    }else{
        currentSlide--;
        theChecker();
    }
}
prevBtn.addEventListener('click' , prevSlide)

const indexUl = document.querySelector(".index");

for (let i = 1; i <= slideCount; i++) {
    let indexLi = document.createElement('li');
    indexLi.setAttribute('data-index' , i);
    indexLi.innerText=i;
    indexUl.appendChild(indexLi);
}
const lis = Array.from(document.querySelectorAll('.index li'));

for (let i = 0; i < lis.length; i++) {
    lis[i].addEventListener('click' , () => {
        currentSlide = parseInt(lis[i].getAttribute('data-index'));
        theChecker();
    })
    
}

const ul = document.getElementById('index-ul');
theChecker();
function theChecker() {
    removeAll();
    removeAllActive();
    console.log(ul)
    sliders[currentSlide-1].classList.add('active-slide');
    ul.children[currentSlide -1].classList.add("active");
    
    if (currentSlide == 1) {
        prevBtn.classList.add('disabled');
    } else {
        prevBtn.classList.remove('disabled');
    }

    if (currentSlide == slideCount) {
        nextBtn.classList.add('disabled');
    } else {
        nextBtn.classList.remove('disabled');
    }
    lines[currentSlide-1].classList.add('active-line-filter');
    filterItem[currentSlide-1].classList.add('active-filter');
}

function removeAllActive() {
    sliders.forEach(function (slide) {
        slide.classList.remove('active-slide');
        
    })
    lis.forEach(function(bullet){
        bullet.classList.remove('active');
    })
    
}


for (let i = 0; i < filterItem.length; i++) {
    filterItem[i].addEventListener('click' , () => {
        removeAll();
        currentSlide = i+1;
        theChecker();
        lines[i].classList.add('active-line-filter');
        filterItem[i].classList.add('active-filter');
    }) 
       
}
function removeAll() {
    lines.forEach(element => {
        element.classList.remove('active-line-filter')
    });
    filterItem.forEach(ele => {
        ele.classList.remove('active-filter');
    });
}





