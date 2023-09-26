//-----add group of photo and videos function------
const addPhoto = document.getElementById("input-photo");
const container = document.querySelector(".container");
const containerAdd = document.querySelector(".container .container-add");
const firstAddBtn = document.querySelector(".first-add-btn");

let images = [];

let NewdescAr;
let NewdescEn;
ClassicEditor
    .create(document.querySelector('#desc'))
    .then(desc => NewdescEn = desc)
    .catch(error => { console.error(error); });
ClassicEditor
    .create(document.querySelector('#desc-ar'))
    .then(desc => NewdescAr = desc)
    .catch(error => { console.error(error); });


const inputImg = document.getElementById("input-img");
const newImg = document.querySelector(".added-img");
const editBtn = document.querySelector('.edit')
let newInputImg;
let changeNewInputImg;

// ------add main photo function------
inputImg.onchange = function () {
    console.log("kkkk")
    newImg.src = "";
    newImg.src = URL.createObjectURL(inputImg.files[0]);
    changeNewInputImg = inputImg.files[0];
}

const id = localStorage.getItem("idArticleExplore");
const typeC = localStorage.getItem("type")
const token = localStorage.getItem('token');


var myHeaders = new Headers();
myHeaders.append("Accept", "application/json");

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};


let updateA;

const titleEn = document.querySelector(".title .input-title-en");
const titleAr = document.querySelector(".title .input-title-ar");

const subTitleEn = document.querySelector(".sub-title .input-title-en");
const subTitleAr = document.querySelector(".sub-title .input-title-ar");

const tags = document.querySelector(".tags");

const addVideo = document.querySelector("#add-video");

const datePublish = document.querySelector("#input-date");

const containerImages = document.querySelector(".container-add");



getUpdateArticle();

let newImage;
let newtitleEn;
let newtitleAr;
let newsubTitleEn;
let newsubTitleAr;
let newDate;
let newVideo;


async function getUpdateArticle() {

    await fetch(`https://mountain.lavetro-agency.com/api/dashboard/explores/${id}`, requestOptions)
        .then(res => res.json())
        .then(res => updateA = res.data)
        .catch(error => console.log('error', error));

    addPhotoName = updateA.images[0];
    newImg.src = updateA.article_cover;
    newImage = updateA.article_cover;
    newInputImg = inputImg.value;

    titleEn.value = updateA.title.en;
    newtitleEn = updateA.title.en;

    titleAr.value = updateA.title.ar;
    newtitleAr = updateA.title.ar;

    subTitleEn.value = updateA.sub_title.en;
    newsubTitleEn = updateA.sub_title.en;

    subTitleAr.value = updateA.sub_title.ar;
    newsubTitleAr = updateA.sub_title.ar;

    datePublish.value = updateA.date;
    newDate = updateA.date;

    updateA.videos[0] !== "" ? newVideo = updateA.videos[0].link : null;


    NewdescAr.setData(updateA.description.ar);
    NewdescEn.setData(updateA.description.en);

    for (let i = 0; i < updateA.images.length; i++) {

        if (updateA.images[i]) {
            images.push(updateA.images[i].path)
            let img = updateA.images[i].path
            imagesGroup(img);
        } else {
            cancel.log("false")
        }
    }

}

let newImages = [];

addPhoto.addEventListener("change", () => {
    images.length !== 0 ? newImages = images : null;
    newImages.push(addPhoto.files[0]);
    let img = URL.createObjectURL(addPhoto.files[0])
    imagesGroup(img)
});

function imagesGroup(img) {
        const addedPhoto = document.createElement('div');
        addedPhoto.classList.add("added-photo");
        const trash = document.createElement('div');
        trash.classList.add("trash");
        const imgTrash = document.createElement('img');
        imgTrash.src = "./assets/images/bag.svg";
        imgTrash.classList.add('delet');
        trash.appendChild(imgTrash);

        const addedImage = document.createElement('img');
        addedImage.classList.add("photo")
        addedImage.src = img;
        addedPhoto.appendChild(addedImage);
        addedPhoto.appendChild(trash);
        containerAdd.appendChild(addedPhoto);


        //delet image function--------------
        const deletImg = document.querySelectorAll(".added-photo .trash .delet");
        const elemnets = document.querySelectorAll(".added-photo");

        for (let i = 0; i < deletImg.length; i++) {
            deletImg[i].addEventListener("click", () => {
                containerAdd.removeChild(elemnets[i]);
                images = images.slice(i + 1);
            })
        }
}

let changenewtitleAr = "";

titleAr.addEventListener("change", () => {
    changenewtitleAr = titleAr.value;
})

let changenewImage = ""
inputImg.addEventListener("change", () => {
    changenewImage = inputImg.files[0];
})

let changenewtitleEn = "";
titleEn.addEventListener("change", () => {
    changenewtitleEn = titleEn.value;
})

let changenewsubTitleEn = "";
subTitleEn.addEventListener("change", () => {
    changenewsubTitleEn = subTitleEn.value;
})

let changenewsubTitleAr = "";
subTitleAr.addEventListener("change", () => {
    changenewsubTitleAr = subTitleAr.value;
})

let changenewVideo = "";
addVideo.addEventListener("click", () => {
    newVideo = addVideo.value;
})

let changenewDate = "";
datePublish.addEventListener('change', () => {
    changenewDate = datePublish.value;
})
////////////// update function

const UpdateBtn = document.querySelector(".add-a");

UpdateBtn.addEventListener("click", async (event) => {

    event.preventDefault();

    let descAr = NewdescAr.getData();
    let descEn = NewdescEn.getData();

    var formdata = new FormData();
    console.log(images)
    changeNewInputImg !== "" ? formdata.append("article_cover", changeNewInputImg) : formdata.append("article_cover", newInputImg);
    formdata.append("category", typeC);
    changenewtitleEn !== ""? formdata.append("title_en", changenewtitleEn) : formdata.append("title_en", changenewtitleEn) ;
    changenewtitleAr !== "" ? formdata.append("title_ar", newtitleAr) : formdata.append("title_ar", newtitleAr);
    changenewsubTitleEn !== "" ? formdata.append("sub_title_en", changenewsubTitleEn) : formdata.append("sub_title_en", subTitleEn);
    changenewsubTitleAr !== "" ? formdata.append("sub_title_ar", changenewsubTitleAr) : formdata.append("sub_title_ar", subTitleAr);
    formdata.append("content_en", descEn);
    formdata.append("content_ar", descAr);
    changenewDate !== "" ? formdata.append("date", changenewDate) : formdata.append("date", newDate);
    if (changenewVideo !== "") {
        formdata.append("videos[0]", changenewVideo);
    } else {
        formdata.append("videos[0]", newVideo);
    }
    if (newImages.length !== 0) {
        for (let i = 0; i < newImages.length; i++) {
            console.log(images[i])
            formdata.append(`images[${i}]`, newImages[i]);
        }
    } else {
        if (images.length !== 0) {
            for (let i = 0; i < images.length; i++) {
                formdata.append(`images[${i}]`, images[i]);
            }
        }
    }

    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");;

    var requestOptions = {
        method: 'PUT',
        headers: {
            myHeaders,
            AUTHORIZATION: `Bearer ${token}`,
        },
        body: formdata,

    };

    await fetch(`https://mountain.lavetro-agency.com/api/dashboard/explores/${id}`, requestOptions)
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(error => console.log('error', error));
})


