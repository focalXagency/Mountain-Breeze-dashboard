//-----add group of photo and videos function------
const addPhoto = document.getElementById("input-photo");
const container = document.querySelector(".container");
const containerAdd = document.querySelector(".container .container-add");
const firstAddBtn = document.querySelector(".first-add-btn");

let images = [];

addPhoto.addEventListener("change", () => {
        addPhoto.classList.contains("new-add") ? null : addPhoto.classList.add("new-add");
        container.classList.add("show");
        firstAddBtn ? firstAddBtn.classList.add("hidden") : null;
        let typeImg = addPhoto.files[0].type;
        const addedPhoto = document.createElement('div');
        addedPhoto.classList.add("added-photo");
        const trash = document.createElement('div');
        trash.classList.add("trash");
        const imgTrash = document.createElement('img');
        imgTrash.src = "./assets/images/bag.svg";
        imgTrash.classList.add('delet');
        trash.appendChild(imgTrash);

        if (typeImg.startsWith("image/")) {

                const element = document.createElement('img');
                element.classList.add("photo")
                element.src = `${URL.createObjectURL(addPhoto.files[0])}`;
                addedPhoto.appendChild(element);

        }
        //delet image function--------------
        addedPhoto.appendChild(trash);
        containerAdd.appendChild(addedPhoto);
        const deletImg = document.querySelectorAll(".added-photo .trash .delet");
        const elemnets = document.querySelectorAll(".added-photo");
        for (let i = 0; i < deletImg.length; i++) {

                deletImg[i].addEventListener("click", () => {
                        console.log(elemnets[i]);
                        containerAdd.removeChild(elemnets[i]);
                        images.pop(elemnets[i]);
                })
        }

        images.push(addPhoto.files[0]);

});
//-----add group of photo and videos function------

const inputImg = document.getElementById("input-img");
const newImg = document.querySelector(".added-img");

const inputDate = document.getElementById("input-date");
const editBtn = document.querySelector('.edit')
// ------add main photo function------
inputImg.onchange = function () {

        newImg.classList.add("img-add");
        editBtn.classList.add("show");
        newImg.src = URL.createObjectURL(inputImg.files[0]);
        inputImg.classList.add("add-img-after-add");

}

//-----give the input date the current date------
inputDate.valueAsDate = new Date();

let type = localStorage.getItem('type');
let token = localStorage.getItem('token');

let descDataEn = "";
let descDataAr = "";

ClassicEditor
        .create(document.querySelector('#desc'))
        .then(desc => descDataEn = desc)
        .catch(error => {
                console.error(error);
        });
ClassicEditor
        .create(document.querySelector('#desc-ar'))
        .then(desc => descDataAr = desc)
        .catch(error => {
                console.error(error);
        });



let coverPhotoValue = "";
inputImg.addEventListener("change", (event) => {
        coverPhotoValue = event.target.files[0]
})

const inputTitleEn = document.querySelector(".input-title-en");
let inputTitleEnValue = "";
inputTitleEn.addEventListener("change", (event) => {
        inputTitleEnValue = event.target.value
})

const inputTitleAr = document.querySelector(".input-title-ar");
let inputTitleArValue = "";
inputTitleAr.addEventListener("change", (event) => {
        inputTitleArValue = event.target.value
})

// const tagsOption = document.querySelector(".tags");
// let tagsOptionValue = "";
// tagsOption.addEventListener("change", (event) => {
//         tagsOptionValue = event.target.value
// })




let dateOfArticleValue = new Date();
inputDate.addEventListener("change", (event) => {
        dateOfArticleValue = event.target.value;

})

let subTitleEnValue = "";
const subTitleEn = document.querySelector(".sub-title .input-title-en")
subTitleEn.addEventListener("click", () => {
        subTitleEnValue = subTitleEn.value;
})

let subTitleArValue = "";
const subTitleAr = document.querySelector(".sub-title .input-title-ar")
subTitleAr.addEventListener("click", () => {
        subTitleArValue = subTitleAr.value;
})

const add = document.querySelector(".add-a");

const tags = document.querySelector('.tags');

const addVideo = document.querySelector('#add-video');
let newVideo = "";
addVideo.addEventListener('change', () => {
        newVideo = addVideo.value;
        console.log(newVideo);
})



add.addEventListener('click', async (event) => {
        event.preventDefault();
        console.log(tags.value);
        let newdescDataEn = descDataEn.getData();
        let newdescDataAr = descDataAr.getData();
       
        var formdata = new FormData();

        
        formdata.append("article_cover", coverPhotoValue);
        formdata.append("category", type);
        formdata.append("title_en", inputTitleEnValue);
        formdata.append("title_ar", inputTitleArValue);
        formdata.append("sub_title_en" , subTitleEn.value);
        formdata.append("sub_title_ar", subTitleAr.value);
        formdata.append("content_en", newdescDataEn);
        formdata.append("content_ar", newdescDataAr);
        formdata.append("date", inputDate.value);
        formdata.append("tags[0]", tags.value);
        if (newVideo !=="") {
                formdata.append("videos[0]", newVideo);
        }
        if (images.length !== 0) {
                
                for (let i = 0; i < images.length; i++) {
                        formdata.append(`images[${i}]`, images[i]); 
                        
                }
                }

        await fetch("https://mountain.lavetro-agency.com/api/dashboard/explores", {
                method: 'POST',
                headers: {
                        "Accept": "application/json",
                        AUTHORIZATION: `Bearer ${token}`
                },
                body: formdata,
        })
                .then(res => res.json())
                .then(res => console.log(res))
                .catch(error => console.log('error', error));
}
)


const cancel = document.querySelector(".cancel")

cancel.addEventListener("click", (e) => {
        e.preventDefault()
        
        addPhoto.value = "";
        inputImg.value = "";
        newImg.src = "";
        newImg.classList.remove("img-add");
        editBtn.classList.remove("show");
        inputImg.classList.remove("add-img-after-add");
        inputDate.value = "";
        inputTitleEn.value = "";
        inputTitleAr.value = "";
        
        images.forEach(element => {
                images.push(element)
        });
        const elemnets = document.querySelectorAll(".added-photo");
        elemnets.forEach(element => {
                containerAdd.removeChild(element)
        });
        

})



