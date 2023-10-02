


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
const inputs = document.querySelectorAll("#input-title");
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
      console.log("focus")
   }
   inputsTags[i].onblur = () => {
      console.log("chosen");
      if(inputsTags[i].value === "")
      labelsTags[i].classList.remove("active-label")
   }
}
