
const inputImg = document.getElementById("input-img");
const newImg = document.querySelector(".added-img");
const inputDate = document.getElementById("input-date");

// ------add main photo function------
inputImg.onchange = function () {
   newImg.classList.add("img-add");
   editBtn.classList.add("show");
   newImg.src = URL.createObjectURL(inputImg.files[0]);
   inputImg.classList.add("add-img-after-add");
}

//-----give the input date the current date------
inputDate.valueAsDate = new Date();

// const input = document.querySelector(".input-title");
// const label = document.querySelector(".title-lable");
// const tags = document.querySelector(".tags");
// const labelTags = document.querySelector(".label-tags");
// const addImg = document.querySelector(".add-img");
// const coverLabel = document.querySelector(".cover")

// input.addEventListener('click', () => {
//     label.style = 'display:none'
// })

// tags.addEventListener('click', () => {
//     labelTags.style = 'display:none'
// })

// addImg.addEventListener('click', () => {
//     coverLabel.style = 'display:none'
// })
const labels = document.querySelectorAll(".title-lable");
const inputs = document.querySelectorAll(".input-title");
for (let i = 0 ; i < inputs.length ; i++) {
   inputs[i].onfocus = () => {
      labels[i].classList.add("active-label");
   }
   inputs[i].onblur = () => {
      if(inputs[i].value === "")
      labels[i].classList.remove("active-label")
   }
}
const labelsTags = document.querySelectorAll(".label-tags");
const inputsTags = document.querySelectorAll(".tags");
for (let i = 0 ; i < inputsTags.length ; i++) {
   inputsTags[i].onfocus = () => {
      labelsTags[i].classList.add("active-label");
   }
   inputsTags[i].onblur = () => {
      if(inputs[i].value === "")
      labelsTags[i].classList.remove("active-label")
   }
}
