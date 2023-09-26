let icons = [];
let explore = [];
let prevPage = 3;
let page = 1
var myHeaders = new Headers();
myHeaders.append("Accept", "application/json");
var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

const exploreul = document.querySelector('#index-ul');
const slider = document.querySelector(".slider");
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
let exploreli;
setLiE("Restaurant", exploreli);
getArticles();
setTypeToLocal()
const filterItem = document.querySelectorAll('.filter .menu li');
const lines = document.querySelectorAll('.filter .menu li .line');
lines[0].classList.add('active-line-filter');
filterItem[0].classList.add('active-filter')

for (let i = 0; i < filterItem.length; i++) {
    filterItem[i].addEventListener('click', () => {
        exploreul.innerHTML = "";
        slider.innerHTML = "";
        removeAll();
        lines[i].classList.add('active-line-filter');
        filterItem[i].classList.add('active-filter');
        let idType = filterItem[i].getAttribute('id');
        console.log(idType)
        setTypeToLocal(idType)
        console.log()
        setLiE(idType);
        getArticles(idType);


    })

}

function setTypeToLocal(type="Restaurant"){
    localStorage.setItem('type', type);
    console.log(localStorage.getItem('type'))

}

function theChecker(exploreli = [], page) {

    if (page == 1) {
        prevBtn.classList.add('disabled')
    } else {
        prevBtn.classList.remove('disabled')
    }
    
    if (page == exploreli.length) {
        nextBtn.classList.add('disabled')
    } else {
        nextBtn.classList.remove('disabled')
    }

}

async function getArticles(type = "Restaurant") {
    theChecker(exploreli, page)
    let skip = (page - 1) * prevPage;
    await fetch(`https://mountain.lavetro-agency.com/api/dashboard/explores?category=${type}`, requestOptions)
        .then((res) => res.json())
        .then((res) => (explore = res.data));
    console.log(explore);
    let detils = "";
    for (let i = skip; i < prevPage + skip; i++) {
        if(explore[i]){
        console.log(explore[i].article_cover)
        let img = explore[i].article_cover;
        detils += `
            <div class="article" id=${explore[i].id}>
                <img class="article-img" src=${img} />
                <div class="detils">
                    <div class="head">
                        <h1 class="article-name" >${explore[i].title.en}</h1>
                        <span class="date" >${explore[i].date}</span>
                    </div>
                    <p class="descrabtion">${explore[i].description.en}</p>
                    
                    <div class="footer">
                        <div class="icons">
                            <a id="edit" href="./editArticleExplore.html"><img src="./assets/images/edit-gray.svg" ></a>
                            <img class="del-article" src="./assets/images/trach-gray.svg" >
                        </div>
                    </div>
                </div>
            </div>    
    
            `

        slider.innerHTML = detils;
        }
        const articles = document.querySelectorAll(".article");
        localStorage.setItem("idArticleExplore", i + 1);
        icons = document.querySelectorAll(".del-article");
        let editBtns = document.querySelectorAll("#edit")
        for (let i = 0; i < editBtns.length; i++) {
            editBtns[i].addEventListener("click", () => {
                localStorage.setItem("idArticleExplore", parseInt(articles[i].getAttribute('id')));
            })

        }
        for (let i = 0; i < icons.length; i++) {
            icons[i].addEventListener("click", () => {
                divDelet.classList.add("show");
                deletA.addEventListener("click", () => {
                    deleteArtivcleFromApi(parseInt(articles[i].getAttribute('id')));
                    console.log(articles[i].getAttribute('id'))
                    articles[i].remove();
                    divDelet.classList.remove("show");
                })
            })

        }
    };
    // delet function----------------

}

////////////////////// set pagnation 

async function setLiE(type = "Restaurant", exploreli) {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    await fetch(`https://mountain.lavetro-agency.com/api/dashboard/explores?category=${type}`, requestOptions)
        .then((res) => res.json())
        .then((res) => (explore = res.data));
    for (let i = 0; i < explore.length; i = i + 3) {
        if (i < i + 3) {
            const liE = document.createElement('li');
            liE.classList.add('li-e');
            exploreul.appendChild(liE);
        }
        exploreli = document.querySelectorAll(".li-e");

        exploreli.forEach((ele, index) => {
            index == 0 ? ele.classList.add('active') : null;
            ele.innerText = index + 1;
            ele.addEventListener('click', () => {
                removeActive();
                ele.classList.add("active");
                page = parseInt(ele.innerText);
                theChecker(exploreli, page)
                getArticles(type);

            })
        });
    }
    theChecker(exploreli, page);

    nextBtn.addEventListener('click', () => {
        console.log("kkkkkk")
        if (nextBtn.classList.contains('disabled')) {
            return false;
        } else {
            page++;
            getArticles(idType);
            for (let i = 0; i < exploreli.length; i++) {
                if (i == page - 1) {
                    console.log(exploreli[i])
                    removeActive();
                    exploreli[i].classList.add("active")
                }
            }
            theChecker(exploreli, page);}
    });


    prevBtn.addEventListener('click', () => {
        if (prevBtn.classList.contains('disabled')) {
            return false;
        } else {
            
            page--;
            getArticles(idType);

            for (let i = 0; i < exploreli.length; i++) {
                if (i == page - 1) {
                    removeActive();
                    exploreli[i].classList.add("active")
                }

            }
            theChecker(exploreli, page);
        }
    });
}

function removeActive() {
    const exploreli = document.querySelectorAll(".li-e");
    exploreli.forEach((ele) => {
        ele.classList.remove("active");
    });
    
}

let token = localStorage.getItem('token')
async function deleteArtivcleFromApi(idA) {
    console.log(idA)
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
        method: 'DELETE',
        headers: {
            myHeaders,
            AUTHORIZATION: `Bearer ${token}`
        },
        redirect: 'follow'
    };
    await fetch(`https://mountain.lavetro-agency.com/api/dashboard/explores/${idA}`, requestOptions)
        .then(res => res.json())
        .then(res => console.log(res))
}



function removeAll() {
    lines.forEach(element => {
        element.classList.remove('active-line-filter')
    });
    filterItem.forEach(ele => {
        ele.classList.remove('active-filter');
    });
}

///////////delete function////////////////////////

const divDelet = document.querySelector(".div-popup-delet");
const deletA = document.querySelector(".div-popup-delet .popup-delet .delet-btns .delet");
let topSection;

window.addEventListener("scroll", () => {
    topSection = window.scrollY;
    move();
})

const cancelDel = document.querySelector(".div-popup-delet .popup-delet .delet-btns .cancel");
cancelDel.addEventListener("click", () => {
    console.log("cancel");
    divDelet.classList.remove("show");
})

function move() {
    divDelet.style.top = `${topSection}px`;
}







