const titleInput = document.querySelector(".title-in-food")
const titleLabel = document.querySelector("label.title-lable")
   titleInput.onfocus = () => {
      titleLabel.classList.add("active-label");
   }
   titleInput.onblur = () => {
      if(titleInput.value === "")
      titleLabel.classList.remove("active-label")
   }
const categoryInput = document.querySelector("#category")
const categoryLabel = document.querySelector("label.label-category")
console.log(titleInput , titleLabel)
categoryInput.onfocus = () => {
    categoryLabel.classList.add("active-label");
   }
   categoryInput.onblur = () => {
      if(categoryInput.value === "")
      categoryLabel.classList.remove("active-label")
   }
const descriptionInput = document.querySelector(".description-food")
const descriptionLabel = document.querySelector("label.label-description")
console.log(titleInput , titleLabel)
descriptionInput.onfocus = () => {
    descriptionLabel.classList.add("active-label");
   }
   descriptionInput.onblur = () => {
      if(descriptionInput.value === "")
      descriptionLabel.classList.remove("active-label")
   }