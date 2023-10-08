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


const typeC = localStorage.getItem("type")
const token = localStorage.getItem('token');


var myHeaders = new Headers();
myHeaders.append("Accept", "application/json");
    const id = localStorage.getItem("idArticleExplore");
    const nId = parseInt(id)
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
    const id = localStorage.getItem("idArticleExplore");
    const nId = parseInt(id)
    await fetch(`http://127.0.0.1:8000/api/dashboard/explores/${nId}`, requestOptions)
        .then(res => res.json())
        .then(res => updateA = res.data)
        .catch(error => console.log('error', error));
        console.log(updateA)

    
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

    updateA.videos[0] !== undefined ? newVideo = updateA.videos[0].link : null;

    NewdescAr.setData(updateA.description.ar);
    NewdescEn.setData(updateA.description.en);
    updateA.tags[0]? tags.value=updateA.tags[0].name : null;
    updateA.videos[0] !== "" ? addVideo.value = updateA.videos[0].link : null;

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
    images.push(addPhoto.files[0]);
    let img = URL.createObjectURL(addPhoto.files[0])
    imagesGroup(img)
    console.log(images)
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
addVideo.addEventListener("change", () => {
    changenewVideo = addVideo.value;
    
})

let changenewDate = "";
datePublish.addEventListener('change', () => {
    changenewDate = datePublish.value;
})

let newTag="";

tags.addEventListener('change' , () => {
 newTag=tags.value;
})

////////////// update function

const UpdateBtn = document.querySelector(".add-a");

UpdateBtn.addEventListener("click", async (event) => {

    event.preventDefault();

    let descAr = NewdescAr.getData();
    let descEn = NewdescEn.getData();

    var data = new URLSearchParams();
    var formdata = new FormData()
    formdata.append('_method' , 'put')
    changeNewInputImg !== undefined ? formdata.append("article_cover", changeNewInputImg) : null;
    data.append("category", typeC);
    changenewtitleEn !== ""? formdata.append("title_en", changenewtitleEn) : null;
    changenewtitleAr !== "" ? formdata.append("title_ar", newtitleAr) : null;
    changenewsubTitleEn !== "" ? formdata.append("sub_title_en", changenewsubTitleEn) : null;
    changenewsubTitleAr !== "" ? formdata.append("sub_title_ar", changenewsubTitleAr) : null;
    data.append("content_en", descEn);
    data.append("content_ar", descAr);
    changenewDate !== "" ? formdata.append("date", changenewDate) : null;
    formdata.append("videos[0]", addVideo.value)
    if (images.length > 0 ){
        for (let i = 0; i < images.length; i++) {
            formdata.append(`images[${i}]`, images[i]);
            console.log(images[i]);
        }   
    }

    const id = localStorage.getItem("idArticleExplore");
    const nId = parseInt(id)
    
    var requestOptions = {
        
        method: "post",
        headers: {
            "Accept": "application/json",
            AUTHORIZATION: `Bearer ${token}`,
        },
        body: formdata,
        
    };

    await fetch(`http://127.0.0.1:8000/api/dashboard/explores/${nId}`, requestOptions)
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(error => console.log('error', error));
})