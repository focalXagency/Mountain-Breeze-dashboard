
const inputImg = document.getElementById("input-img");
const newImg = document.querySelector(".added-img");
const inputDate = document.getElementById("input-date");
const editBtn = document.querySelector('.edit')
// ------add main photo function------
inputImg.onchange = function () {
   console.log(inputImg)
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

categoryInput.onblur = () => {
   if (categoryInput.value === "")
      categoryLabel.classList.remove("active")
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

const titleEn = document.querySelector('#input-title');
const titleAr = document.querySelector('#input-title-ar');
const categoryEn = document.querySelector('.c-en');
// const categoryAr = document.querySelector('.c-ar');

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

// categoryAr.addEventListener('change', () => {
//    categoryArValue = categoryAr.value;
// })



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

// let newImage;
// let newTitleEn;
// let newtitleAr;
// let categoryValue;
// let newSize;
// let categoryEnValue;
// let categoryArValue;

const addBtn = document.querySelector(".add-a");
addBtn.addEventListener('click', async (event) => {
   let newDescEn = descEn.getData();
   let newDescAr = descAr.getData();
   event.preventDefault();
   var formdata = new FormData();
   formdata.append("image", newImage);
   formdata.append("category", categoryEnValue);
   formdata.append("title_en", newTitleEn);
   formdata.append("title_ar", newtitleAr);
   formdata.append("content_en", newDescEn);
   formdata.append("content_ar", newDescAr);
   formdata.append("image_size", newSize);

   const token = localStorage.getItem('token');
   var myHeaders = new Headers();
   myHeaders.append("Accept", "application/json");
   var requestOptions = {
      method: 'POST',
      headers: {
         myHeaders,
         AUTHORIZATION: `Bearer ${token}`
      },
      body: formdata,

   };

   await fetch("https://mountain.lavetro-agency.com/api/dashboard/foods", requestOptions)
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(error => console.log('error', error));
})



const cancel = document.querySelector(".cancel");

cancel.addEventListener('click', () => {
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
})