//-----add group of photo and videos function------
const addPhoto = document.getElementById("input-photo");
const container = document.querySelector(".container");
const containerAdd = document.querySelector(".container .container-add");
const firstAddBtn = document.querySelector(".first-add-btn");

let images=[];

addPhoto.addEventListener("change", () => {
   
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
         images.pop(elemnets[i]);
      })
   }

        images.push(addPhoto.files[0]);

});

const priceInput = document.querySelector("#input-price");
const priceLabel = document.querySelector("label.lable-price");
priceInput? priceInput.onfocus = () => {
   priceLabel.classList.add("active-label");
} : null;
priceInput? priceInput.onblur = () => {
   if(priceInput.value === "")
   priceLabel.classList.remove("active-label");
}: null;
const typeInput = document.querySelector("#type");
const typeLabel = document.querySelector("label.label-type");
typeInput? typeInput.onfocus = () => {
   typeLabel.classList.add("active-label");
} : null
typeInput? typeInput.onblur = () => {
   if(typeInput.value === "")
   typeLabel.classList.remove("active-label");
}:null;
const guestInput = document.querySelector("#number");
const guestLabel = document.querySelector("label.label-number");
guestInput? guestInput.onfocus = () => {
   guestLabel.classList.add("active-label");
}: null;
guestInput? guestInput.onblur = () => {
   if(guestInput.value === "")
   guestLabel.classList.remove("active-label");
}: null;
