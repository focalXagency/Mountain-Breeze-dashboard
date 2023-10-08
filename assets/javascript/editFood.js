
const inputImg = document.getElementById("input-img");
const newImg = document.querySelector(".added-img");
const editBtn = document.querySelector('.edit')
idFood = localStorage.getItem('idFood');
console.log(idFood)
// ------add main photo function------
inputImg.onchange = function () {

    newImg.classList.add("img-add");
    editBtn.classList.add("show");
    newImg.src = URL.createObjectURL(inputImg.files[0]);
    inputImg.classList.add("add-img-after-add");
}

const titleInput = document.querySelectorAll("input");
const titleLabel = document.querySelectorAll("label");

for (let i = 0; i < titleInput.length; i++) {

    titleInput[i].onfocus = () => {

        titleLabel[i].classList.add("active-label");

    }
    titleInput[i].onblur = () => {
        if (titleInput[i].value === "")
            titleLabel[i].classList.remove("active-label")
    }
}
let descEn;
let descAr;
ClassicEditor
    .create(document.querySelector('#desc'))
    .then(desc => descEn = desc)
    .catch(error => {
        console.error(error);
    });
ClassicEditor
    .create(document.querySelector('#desc-ar'))
    .then(desc => descAr = desc)
    .catch(error => {
        console.error(error);
    });

function getData(t) {
    return this.data.get(t)
};



const categoryInput = document.querySelectorAll("#category");
const categoryLabel = document.querySelectorAll(".label-category");

for (let i = 0; i < categoryInput.length; i++) {
    categoryInput[i].onfocus = () => {
        categoryLabel[i].classList.add("active");

    }
}

for (let i = 0; i < categoryInput.length; i++) {
    categoryInput[i].onblur = () => {
        if (categoryInput[i].value === "")
            categoryLabel[i].classList.remove("active")
    }
}

const descriptionInput = document.querySelector(".description-food")
const descriptionLabel = document.querySelector("label.label-description")

descriptionInput.onfocus = () => {
    descriptionLabel.classList.add("active-label");
}
descriptionInput.onblur = () => {
    if (descriptionInput.value === "")
        descriptionLabel.classList.remove("active-label")
}
getDetilsFood();
const titleEn = document.querySelector('#input-title');
const titleAr = document.querySelector('#input-title-ar');
const categoryEn = document.querySelector('.c-en');
const categoryAr = document.querySelector('.c-ar');

let newImage;
let newTitleEn;
let newtitleAr;
let categoryValue;
let newSize = "x1";
let categoryEnValue;
let categoryArValue;

categoryEn.addEventListener('change', () => {
    categoryEnValue = categoryEn.value;
})

inputImg.addEventListener('change', () => {
    newImage = inputImg.files[0];
})


titleEn.addEventListener('change', () => {
    newTitleEn = titleEn.value;
})


titleAr.addEventListener('change', () => {
    newtitleAr = titleAr.value;
})


const sizeImg = document.querySelectorAll(".size");


sizeImg.forEach(ele => {
    ele.addEventListener('click', () => {
        reomve();
        ele.classList.add('chossen-size');
        newSize = ele.innerText
        console.log(newSize);
    })
})

function reomve() {
    sizeImg.forEach(ele => {
        ele.classList.remove('chossen-size');
    })
}
const addBtn = document.querySelector(".add-a");
addBtn.addEventListener('click', (event) => {
    event.preventDefault();
    console.log(inputImg.files[0]);
    const dataFood = new FormData();
    dataFood.append("_method" , "put")
    dataFood.append("image", inputImg.files[0]);
    dataFood.append("category", categoryEn.value);
    dataFood.append("title_en", newTitleEn);
    dataFood.append("title_ar", newtitleAr);
    dataFood.append("content_en", descEn.getData());
    dataFood.append("content_ar", descAr.getData());
    dataFood.append("image_size", newSize);
    
    updateFood(dataFood);
})


async function updateFood(data) {
    const token = localStorage.getItem('token');
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    console.log(data);

    await fetch(`https://mountain.lavetro-agency.com/api/dashboard/foods/${idFood}`, {
        method: 'post',
        headers: {
            myHeaders,
            AUTHORIZATION: `Bearer ${token}`,
        },
        body: data,
    })
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(error => console.log('error', error));
}




let detils;
async function getDetilsFood() {
    removeLabel()
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    await fetch(`https://mountain.lavetro-agency.com/api/dashboard/foods/${idFood}`, requestOptions)
        .then(res => res.json())
        .then(res => detils = res.data)
        .catch(error => console.log('error', error));
    console.log(detils)
    newImg.src = detils.image;
    inputImg.classList.add("add-img-after-add");
    newImg.classList.add("img-add");
    editBtn.classList.add("show");
    titleEn.value = detils.title.en;
    titleAr.value = detils.title.ar;
    categoryEn.value = detils.category;
    descEn.setData(detils.content.en)
    descAr.setData(detils.content.ar)
    detils.image_size !== null ? newSize = detils.image_size : null;
    sizeImg.forEach(element => {
        if (element.innerText === detils.image_size) {
            console.log(element)
            element.classList.add('chossen-size');
        }
    });


}

function removeLabel() {

    titleLabel.forEach(element => {
        element.classList.add("active-label");

    });
    categoryLabel.forEach(element => {
        element.classList.add("active");

    });

}


const cancel = document.querySelector(".cancel");

cancel.addEventListener('click', (e) => {
    e.preventDefault()
    categoryEn.value = "";
    newImg.src = "";
    titleEn.value = "";
    titleAr.value = "";
    titleLabel.forEach(element => {
        element.classList.remove("active-label");

    });
    categoryLabel.forEach(element => {
        element.classList.remove("active");

    });
    descEn.setData("");
    descAr.setData("");
    reomve();
    newSize = "";
})



