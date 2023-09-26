


//-----add group of photo and videos function------
const addPhoto = document.getElementById("input-photo");
const container = document.querySelector(".container");
const containerAdd = document.querySelector(".container .container-add");
const firstAddBtn = document.querySelector(".first-add-btn");
const editBtn = document.querySelector(".edit");

addPhoto.addEventListener("change", () => {
   console.log("change");
   addPhoto.classList.contains("new-add")?  null : addPhoto.classList.add("new-add");
   container.classList.add("show");
   firstAddBtn? firstAddBtn.classList.add("hidden") : null;
   

   let type = addPhoto.files[0].type;
   const addedPhoto = document.createElement('div');
   addedPhoto.classList.add("added-photo");
   const trash = document.createElement('div');
   trash.classList.add("trash");
   const imgTrash = document.createElement('img');
   imgTrash.src = "./assets/images/bag.svg";
   imgTrash.classList.add('delet');
   trash.appendChild(imgTrash);

   if (type.startsWith("image/")) {

      const element = document.createElement('img');
      element.classList.add("photo")
      element.src = `${URL.createObjectURL(addPhoto.files[0])}`;
      addedPhoto.appendChild(element);

   } else if (type.startsWith("video/")) {

      const element = document.createElement('video');
      element.classList.add("photo");
      element.setAttribute("controls", "true");
      const elementSrc = document.createElement('source');
      elementSrc.src = `${URL.createObjectURL(addPhoto.files[0])}`;
      element.appendChild(elementSrc);
      addedPhoto.appendChild(element);
      
   }
   //delet image function--------------
   addedPhoto.appendChild(trash);
   containerAdd.appendChild(addedPhoto);
   const deletImg = document.querySelectorAll(".added-photo .trash .delet");
   const elemnets = document.querySelectorAll(".added-photo");
   for (let i = 0; i < deletImg.length; i++) {
      // console.log(deletImg);
      deletImg[i].addEventListener("click", () => {
         console.log(elemnets[i]);
         containerAdd.removeChild(elemnets[i]);
      })
   }
});

// const nameInput = document.querySelector("#input-name");
// const nameLabel = document.querySelector("label.lable-name");
// nameInput.onfocus = () => {
//    nameLabel.classList.add("active-label");
// }
// nameInput.onblur = () => {
//    if(nameInput.value === "")
//    nameLabel.classList.remove("active-label");
// }

// const priceInput = document.querySelector("#input-price");
// const priceLabel = document.querySelector("label.lable-price");
// priceInput.onfocus = () => {
//    priceLabel.classList.add("active-label");
// }
// priceInput.onblur = () => {
//    if(priceInput.value === "")
//    priceLabel.classList.remove("active-label");
// }

// const typeInput = document.querySelector("#type");
// const typeLabel = document.querySelector("label.label-type");
// typeInput.onfocus = () => {
//    typeLabel.classList.add("active-label");
// }
// typeInput.onblur = () => {
//    if(typeInput.value === "")
//    typeLabel.classList.remove("active-label");
// }
// const guestInput = document.querySelector("#number");
// const guestLabel = document.querySelector("label.label-number");
// guestInput.onfocus = () => {
//    guestLabel.classList.add("active-label");
// }
// guestInput.onblur = () => {
//    if(guestInput.value === "")
//    guestLabel.classList.remove("active-label");
// }

