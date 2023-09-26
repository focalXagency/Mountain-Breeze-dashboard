
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const filterItem = document.querySelectorAll('.filter .menu li');
const lines = document.querySelectorAll('.filter .menu li .line');
lines[0].classList.add('active-line-filter');
filterItem[0].classList.add('active-filter');
let type = "Restaurant";
const slideimages1 = document.createElement('div');
slideimages1.classList.add('slide')
const slideimages2 = document.createElement('div');
slideimages2.classList.add('slide')
const videosUl = document.querySelector("#videos-ul");

let videosGallery = [];

let prevPage = 7;
let page = 1;


let imagesGallery = [];
let conpage1 = 14;
let prevPageimg1= 7;
let pageimg = 1;
const sliderVideo = document.querySelector('.slider-video');
const slideVideo = document.createElement('div');
slideVideo.classList.add('slide');

const sliderImages = document.querySelector('.images-gallery .slider')
const imagesUl = document.querySelector("#index-ul");



const prevBtnImg = document.querySelector("#prev-img");
const nextBtnImg = document.querySelector("#next-img");

const prevBtnv = document.getElementById('prev-v');
const nextBtnv = document.getElementById('next-v');

let imagesli;
setLiImages(type="Restaurant" , imagesli);
getImages();

let lisv;
setLiV(type="Restaurant" , lisv);
getVideos();

function removeChildLis() {
    const remove = document.querySelectorAll(".li-v")
    remove.forEach(element => {
        videosUl.removeChild(element);
    });
}
function removeChildLisImg() {
    const remove = document.querySelectorAll(".li-img")
    remove.forEach(element => {
        imagesUl.removeChild(element);
    });
}


///////////////////////start  filter ////////////////

function removeAll() {
    lines.forEach(element => {
        element.classList.remove('active-line-filter')
    });
    filterItem.forEach(ele => {
        ele.classList.remove('active-filter');
    });

}

for (let i = 0; i < filterItem.length; i++) {
    filterItem[i].addEventListener('click', () => {
        removeAll();
        lines[i].classList.add('active-line-filter');
        filterItem[i].classList.add('active-filter');
    })

}

const slideImages = document.querySelectorAll(".images-gallery .slider .slide");

function removeAllSlides(){
    slideImages.forEach(element => {
        slideImages.remove(element);
    });
}

for (let i = 0; i < filterItem.length; i++) {

    filterItem[i].addEventListener('click', () => {
        
        removeChildLisImg();
        removeChildLis();
        removeAllSlides();
        slideimages1.innerHTML = "";
        slideimages2.innerHTML = "";
        slideVideo.innerHTML = "";

        type = filterItem[i].getAttribute('id');
        setLiV(type);
        setLiImages(type)
        getVideos(type);
        getImages(type);
    })
}


///////////////////////end  filter ////////////////



///////////////////////start images ////////////////


 
function theChecker(imagesli=[] , page){
    
    if (page == 1) {
        prevBtnImg.classList.add('disabled')
    } else{
        prevBtnImg.classList.remove('disabled') 
    }
    
    if (page == imagesli.length) {
        
        nextBtnImg.classList.add('disabled')
    } else {
        nextBtnImg.classList.remove('disabled')
    }

}


///////////////// start get images
async function getImages(type = "Restaurant" ) {
    theChecker(imagesli , pageimg);
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    let skip1 = (pageimg - 1) * conpage1;
    let skip2 = prevPageimg1 + skip1;
    await fetch(`https://mountain.lavetro-agency.com/api/dashboard/gallary?type=${type}`, requestOptions)
        .then((res) => res.json())
        .then((res) => (imagesGallery = res.data));
        console.log(imagesGallery)
        let image1 = "";
    for (let i = skip1 , index=0; i < prevPageimg1 + skip1 ; i++ , index++) {
            if (imagesGallery[i]) {
                
                    image1 += `
                <div class="img${index + 1}">
                    <img class="photo-slide" src=${imagesGallery[i].images[0].path}>
                </div>  
                `
                slideimages1.innerHTML = image1;
                sliderImages.appendChild(slideimages1);
                }
                

        }
        let image2 = "";
        for (let j = skip2, index = 0; j < prevPageimg1 + skip2; j++, index++) {
            if (imagesGallery[j]) {
                    image2 += `
                <div class="img${index + 1}">
                    <img class="photo-slide" src=${imagesGallery[j].images[0].path}>
                </div>  
                `
                slideimages2.innerHTML = image2;
                sliderImages.appendChild(slideimages2);
            }
        }
    }

///////////////// end get images

///////////start set pagination imges
async function setLiImages(type = "Restaurant" , imagesli) {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    await fetch(`https://mountain.lavetro-agency.com/api/dashboard/gallary?type=${type}`, requestOptions)
        .then((res) => res.json())
        .then((res) => (gallery = res.data));
    for (let i = 0; i < gallery.length; i = i + 14) {
        if (i < i + 14) {
            const liImages = document.createElement('li');
            liImages.classList.add('li-img')
            imagesUl.appendChild(liImages);
        }
        imagesli = document.querySelectorAll(".li-img");

    }
    imagesli.forEach((ele, index) => {
        index==0? ele.classList.add('active')  : null;
        ele.innerText = index + 1;
        ele.addEventListener('click', () => {
            removeActive();
            ele.classList.add("active");
            slideimages1.innerHTML="";
            slideimages2.innerHTML="";
            pageimg = ele.innerText;
            getImages(type);
            theChecker(imagesli , pageimg);
        })
    });

    function removeActive(){
        for (let i = 0; i < imagesli.length; i++) {
            imagesli[i].classList.remove('active');
        }
    }
    theChecker(imagesli, pageimg);
    nextBtnImg.addEventListener("click" , () => {
        
        if (nextBtnImg.classList.contains('disabled')) {
            return false;
        } else {
            slideimages1.innerHTML="";
            slideimages2.innerHTML="";
            removeActive();
            pageimg++;
            getImages(type);
            for (let i = 0; i < imagesli.length; i++) {
                if (i == pageimg - 1) {
                    imagesli[i].classList.add("active")
                }
            }
            theChecker(imagesli, pageimg);
    }})

    prevBtnImg.addEventListener("click" , () => {
        console.log("kkkk")
        if (prevBtnImg.classList.contains('disabled')) {
            return false;
        } else {
            slideimages1.innerHTML="";
            slideimages2.innerHTML="";
            removeActive();
            pageimg--;
            getImages(type);
            for (let i = 0; i < imagesli.length; i++) {
                if (i == pageimg - 1) {
                    imagesli[i].classList.add("active")
                }
            }
            theChecker(imagesli, pageimg);
    }})
}

///////////end set pagination imges

///////////////////// post fetch image  /////////////////////////
const inputPhoto = document.getElementById('input-photo');

inputPhoto.addEventListener('change', async () => {

    let newImage = inputPhoto.files[0];    
    let authorizationToken = localStorage.getItem('token');
    var formdata = new FormData();
    formdata.append("type", type);
    formdata.append("images[0]", inputPhoto.files[0]);
    var requestOptions = {
        method: "POST",
        headers: {
            AUTHORIZATION: `Bearer ${authorizationToken}`,
        },

        body: formdata,
    }

    await fetch("https://mountain.lavetro-agency.com/api/dashboard/gallary", requestOptions)
        .then(res => res.json())
        .then(res => console.log(res))

})

/////////////////////end post fetch image  /////////////////////////


///////////////////////end images ///////////////

function theCheckerV(lisv = [], page) {
    
    if (page == 1) {
        prevBtnv.classList.add('disabled')
    } else {
        prevBtnv.classList.remove('disabled')
    }

    if (page == lisv.length) {
        
        nextBtnv.classList.add('disabled')
    } else {
        nextBtnv.classList.remove('disabled');
    }

}


//////////////////////////////////////////////// start gallary video//////////////////////////////////////////////// 

////////////////////// start get video
let gallery;
async function getVideos(type = "Restaurant") {
    theCheckerV(lisv, page);
    var myHeaders = new Headers();

    myHeaders.append("Accept", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    
    slideVideo.innerHTML = "";
    let skip = (page - 1) * prevPage;
    await fetch(`https://mountain.lavetro-agency.com/api/dashboard/videos?type=${type}`, requestOptions)
        .then((res) => res.json())
        .then((res) => (gallery = res.data));
    
    let video = "";
    for (let i = skip , index = 0; i < prevPage + skip; i++ , index++) {
        
        if (gallery[i]) {
            let startslice= gallery[i].link.indexOf("=");
            let linkV = "https://www.youtube.com/embed/" + gallery[i].link.slice(startslice + 1);
            
            video += `
            <div class="img${index + 1}">
            <iframe style="width: 100%;" src="${linkV}?si=P-cOLpyjq3PdFgYR" title=${gallery[i].name} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
            `
        }

    }

    slideVideo.innerHTML = video;
    sliderVideo.appendChild(slideVideo);
};
////////////////////// end get video

////////////////////// start set pagination  video
async function setLiV(type = "Restaurant") {
    
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    await fetch(`https://mountain.lavetro-agency.com/api/dashboard/videos?type=${type}`, requestOptions)
        .then((res) => res.json())
        .then((res) => (gallery = res.data));
    for (let i = 0; i < gallery.length; i = i + 7) {
        if (i < i + 7) {
            const li = document.createElement('li');
            li.classList.add('li-v');
            videosUl.appendChild(li);
        }
        lisv = document.querySelectorAll(".li-v");

        lisv.forEach((ele, index) => {
            index==0? ele.classList.add('active')  : null;
            ele.innerText = index + 1;
            ele.addEventListener('click', () => {
                slideVideo.innerHTML = ""; 
                sliderVideo.removeChild(slideVideo)  
                removeActive();
                ele.classList.add("active");
                page = parseInt(ele.innerText);
                getVideos()
            })
        });
    }
    theCheckerV(lisv, page);
    nextBtnv.addEventListener("click" , () => {
        if (nextBtnv.classList.contains('disabled')) {
            return false;
        } else {
        slideVideo.innerHTML = ""; 
        sliderVideo.removeChild(slideVideo)     
        removeActive();
        page++;
        getVideos(type);
        for (let i = 0; i < lisv.length; i++) {            
            if (i == page-1) {
                lisv[i].classList.add("active")
            }
            
        }
        theCheckerV(lisv , page);}
    })

    prevBtnv.addEventListener("click" , () => {
        if (prevBtnv.classList.contains('disabled')) {
            return false;
        } else {
        slideVideo.innerHTML = ""; 
        sliderVideo.removeChild(slideVideo)    
        removeActive();
        page--;
        getVideos(type);
        for (let i = 0; i < lisv.length; i++) {            
            if (i == page-1) {
                lisv[i].classList.add("active")
            }
            
        }
        theCheckerV(lisv , page);}
    })

}

function removeActive(){
    lisv.forEach((ele) => {
        ele.classList.remove("active");
    });
    


}


////////////////////// end set pagination  video


const playIcon = document.querySelectorAll('.icon');
const coverPhoto = document.querySelectorAll('.cover-photo');
const videos = document.querySelectorAll('video');


for (let i = 0; i < playIcon.length; i++) {
    playIcon[i].addEventListener('click', () => {
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

//////////////////// post fetch video  /////////////////////////

const inputVideo = document.getElementById('input-video');

let newvideo = "";
inputVideo.addEventListener('change', () => {
    newvideo = inputVideo.value;
})
const addV = document.querySelector(".add-v");

addV.addEventListener('click' , () => {
    inputVideo.value="";
    postVideo(type, newvideo);
})
async function postVideo(typeGllery, video, name = "video") {

    let authorizationToken = localStorage.getItem('token');
    const dataVideos = {
            name: name,
            link: video,
            type: typeGllery   
    }
    console.log(dataVideos);

    var requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            AUTHORIZATION: `Bearer ${authorizationToken}`
        },

        body: JSON.stringify(dataVideos),
    }

    await fetch("https://mountain.lavetro-agency.com/api/dashboard/videos", requestOptions)
        .then(res => res.json())
        .then(res => console.log(res))

}


////////// end gallary videos









