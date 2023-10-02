let icons = [];
let foods = [];
let prevPage = 6;
let page = 1;
var myHeaders = new Headers();
const indexUl = document.querySelector(".index");
myHeaders.append("Accept", "application/json");
var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
let foodsli;
setLis(type = "Westren Food" , foodsli);
getFoods();

function removeLi() {
    foodsli = document.querySelectorAll(".index li")
    foodsli.forEach(element => {
        indexUl.removeChild(element);
    });
}



function theChecker(foodsli=[] , page){
    
    if (page == 1) {
        prevBtn.classList.add('disabled-arrow')
    } else{
        prevBtn.classList.remove('disabled-arrow') 
    }
    
    if (page == foodsli.length) {
        nextBtn.classList.add('disabled-arrow')
    } else {
        nextBtn.classList.remove('disabled-arrow')
    }

}

const slider = document.querySelector(".slider");
const filterItem = document.querySelectorAll('.filter .menu li');
const lines = document.querySelectorAll('.filter .menu li .line');
lines[0].classList.add('active-line-filter');
filterItem[0].classList.add('active-filter')
let idType;

for (let i = 0; i < filterItem.length; i++) {
    filterItem[i].addEventListener('click', () => {
        removeLi();
        slider.innerHTML = "";
        removeAll();
        lines[i].classList.add('active-line-filter');
        filterItem[i].classList.add('active-filter');
        idType = filterItem[i].innerText;
        setLis(idType)
        getFoods(idType);
        
    })
}


async function getFoods(type = "Westren Food" ) {
    theChecker(foodsli , page);
    let skip = (page - 1) * prevPage;
    
    await fetch(`https://mountain.lavetro-agency.com/api/dashboard/foods?category=${type}`, requestOptions)
        .then((res) => res.json())
        .then((res) => (foods = res.data));

    let food = "";

    for (let i = skip; i < prevPage + skip; i++) {
    
        if (foods[i]) {
            
            food += `
                    <div class="food-item" id=${foods[i].id} >
                        <img class="food-img" src=${foods[i].image}>
                        <div class="detils">
                            <h1>${foods[i].title.en}</h1>
                            <p class="content" >${foods[i].content.en}</p>
                            <div class="footer">
                                <div class="icons">
                                    <a href="./editFood.html" class="edit"><img src="./assets/images/edit.svg" ></a>
                                    <img class="del-article" src="./assets/images/trash.svg" >
                                </div> 
                            </div>
                        </div>
                    </div>   
                    `

            slider.innerHTML = food;
        }
    }
    const foodDiv = document.querySelectorAll(".food-item")
        
    iconsDelete = document.querySelectorAll(".del-article");


    ///////////////delet function-----------------

        for (let i = 0; i < iconsDelete.length; i++) {
            iconsDelete[i].addEventListener("click", (event) => {
                console.log(iconsDelete[i])
                divDelet.classList.add("show");
                deletA.addEventListener("click", () => {
                    console.log(parseInt(foodDiv[i].getAttribute('id')))
                    deleteFoodFromApi(parseInt(foodDiv[i].getAttribute('id')));
                    let child = event;
                    child.target.parentNode.parentNode.parentNode.parentNode.remove();
                    divDelet.classList.remove("show");
                })
            }
                )    
        }  
       
    const iconsEdit = document.querySelectorAll(".edit")  

    for (let i = 0; i < iconsEdit.length; i++) {
        iconsEdit[i].addEventListener('click' , () => {
            localStorage.setItem('idFood' , parseInt(foodDiv[i].getAttribute('id')))
            console.log(localStorage.getItem('idFood'))
        })
        
    }
}

async function setLis(type = "Westren Food" , foodsli) {
    
    await fetch(`https://mountain.lavetro-agency.com/api/dashboard/foods?category=${type}`, requestOptions)
        .then((res) => res.json())
        .then((res) => (foods = res.data));
    console.log(foods)
    for (let i = 0; i < foods.length; i = i + 6) {
        if (i < i + 6) {
            let indexLi = document.createElement('li');
            indexUl.appendChild(indexLi);
        }
        foodsli = document.querySelectorAll('.index li');
                
        }

        foodsli.forEach((ele, index) => {
            index==0? ele.classList.add('active')  : null;
            ele.innerText = index + 1;
            ele.addEventListener('click', () => {
                removeActive();
                ele.classList.add("active");
            })
        })

        for (let i = 0; i < foodsli.length; i++) {
            foodsli[i].addEventListener('click', () => {
                page = foodsli[i].innerText;
                getFoods(type);
                
            })
           
        function removeActive(){
            for (let i = 0; i < foodsli.length; i++) {
                foodsli[i].classList.remove('active');
            }
        }
    }

    theChecker(foodsli , page);
    nextBtn.addEventListener('click', () => {
        if (nextBtn.classList.contains('disabled')) {
            return false;
        } else {
        removeActive();
        page++;
        getFoods(idType);
        for (let i = 0; i < foodsli.length; i++) {            
            if (i == page-1) {
                foodsli[i].classList.add("active")
            }
            
        }
        theChecker(foodsli , page);
    }
});

    prevBtn.addEventListener('click', () => {
        if (prevBtn.classList.contains('disabled')) {
            return false;
        } else {
        removeActive();
        page--;
        getFoods(idType);
        for (let i = 0; i < foodsli.length; i++) {            
            if (i == page-1) {
                foodsli[i].classList.add("active")
            }
            
        }
        theChecker(foodsli , page);
}});
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


let token = localStorage.getItem('token');
async function deleteFoodFromApi(idA) {
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
    await fetch(`https://mountain.lavetro-agency.com/api/dashboard/foods/${idA}`, requestOptions)
        .then(res => res.json())
        .then(res => console.log(res))
}

