const slidersv =Array.from(document.querySelectorAll(".wrapper-videos .slider-video"));
let slideCountv = slidersv.length;

let currentSlidev = 1;

const prevBtnv = document.getElementById('prev-v'); 
const nextBtnv = document.getElementById('next-v'); 
const ulv = document.getElementById('videos-ul');
const filterItemv = document.querySelectorAll('.filter .menu li');
const linesv = document.querySelectorAll('.filter .menu li .line');
linesv[0].classList.add('active-line-filter');
filterItemv[0].classList.add('active-filter');




function nextSlidev(){
    if (nextBtnv.classList.contains('disabled')) {
        
        return false;
    }else{
        currentSlidev++;
        theCheckerv();
    }
}

nextBtnv.addEventListener('click' , nextSlidev);

function prevSlidev() {
    if (prevBtnv.classList.contains('disabled')) {
        
        return false;
    }else{
        currentSlidev--;
        theCheckerv();
    }
}

prevBtnv.addEventListener('click' , prevSlidev)

const indexUlv = document.querySelector(".index-v");

for (let i = 1; i <= slideCountv; i++) {
    let indexLiv = document.createElement('li');
    indexLiv.setAttribute('data-index' , i);
    indexLiv.innerText=i;
    indexUlv.appendChild(indexLiv);
}

const lisv = Array.from(document.querySelectorAll('.index-v li'));

for (let i = 0; i < lisv.length; i++) {
    lisv[i].addEventListener('click' , () => {
        currentSlidev = parseInt(lisv[i].getAttribute('data-index'));
        theCheckerv();
    })
    
}

theCheckerv();
function theCheckerv() {
    removeAllv();
    removeAllActivev();
    slidersv[currentSlidev -1].classList.add('active-slide');
    ulv.children[currentSlidev -1].classList.add("active");
    
    if (currentSlidev == 1) {
        prevBtnv.classList.add('disabled');
    } else {
        prevBtnv.classList.remove('disabled');
    }

    if (currentSlidev == slideCountv) {
        nextBtnv.classList.add('disabled');
    } else {
        nextBtnv.classList.remove('disabled');
    }
    lines[currentSlidev -1].classList.add('active-line-filter');
    filterItem[currentSlidev -1].classList.add('active-filter');
}


function removeAllActivev() {
    slidersv.forEach(function (slidev) {
        slidev.classList.remove('active-slide');
        
    })
    lisv.forEach(function(bulletv){
        bulletv.classList.remove('active');
    })
    console.log(lisv)
}


for (let i = 0; i < filterItemv.length; i++) {
    filterItemv[i].addEventListener('click' , () => {
        removeAllv();
        currentSlidev = i+1;
        theCheckerv();
        linesv[i].classList.add('active-line-filter');
        filterItemv[i].classList.add('active-filter');
    }) 
       
}
function removeAllv() {
    linesv.forEach(element => {
        element.classList.remove('active-line-filter')
    });
    filterItemv.forEach(ele => {
        ele.classList.remove('active-filter');
    });
};


const playIcon = document.querySelectorAll('.icon');
const coverPhoto = document.querySelectorAll('.cover-photo');
const videos = document.querySelectorAll('video');


for (let i = 0; i < playIcon.length; i++) {
    playIcon[i].addEventListener( 'click' , () => {
        remove();
        stop();
        playIcon[i].classList.add('display-icon');
        coverPhoto[i].classList.add('display-icon');
        videos[i].play();
    })
    
}
function remove() {
    playIcon.forEach(element => {
        element.classList.remove('display-icon')
    });
    coverPhoto.forEach(element => {
        element.classList.remove('display-icon')
    })
}
function stop() {
    videos.forEach(element => {
        element.pause();
    });
}
