const roomId = localStorage.getItem("editRoomBtnId");
const editRoomImages = document.querySelector(".new-add");
const editRoomBtn = document.querySelector(".add-a");
const containerAddRoomImg = document.querySelector(".container .container-add");
// const editNameEn = document.querySelector('.room-name-en')
// const editNameAr = document.querySelector('.room-name-ar')
// const editSubTitle = document.querySelector(".subtitle-en");
// const editSubTitleAr = document.querySelector(".subtitle-ar");
//const editRoomType = document.querySelector('.Type')
//const editGuestsNum = document.querySelector(".guests")
// const editRoomPrice = document.querySelector(".price")
// const editRoomSer = document.querySelector('#room-services')
// const editRoomTv = document.querySelector('#tv')
//const editFloor = document.querySelector('#input-floor')
// const editSelectBed = document.querySelector('#bed')
const editRoomImg = document.querySelector(".new-add");
console.log(roomId);

//ckEditors
let contentEn;
ClassicEditor.create(document.querySelector("#desc"))
  .then((desc) => (contentEn = desc))
  .catch((error) => console.error(error));

let contentAr;
ClassicEditor.create(document.querySelector("#ardesc"))
  .then((ardesc) => (contentAr = ardesc))
  .catch((error) => console.error(error));

let roomInfo = [];

const editNameEn = document.querySelector(".room-name-en");
const editNameAr = document.querySelector(".room-name-ar");

const editSubTitle = document.querySelector(".subtitle-en");
const editSubTitleAr = document.querySelector(".subtitle-ar");

const editRoomType = document.querySelector(".Type");

const editGuestsNum = document.querySelector(".guests");

const editFloor = document.querySelector("#input-floor");

const editRoomPrice = document.querySelector(".price");
const editRoomSer = document.querySelector("#room-services");
const editRoomTv = document.querySelector("#tv");
const editSelectBed = document.querySelector("#bed");

let neweditNameEn;
let neweditNameAr;
let newSubTitleEn;
let newsubTitleAr;
let newGuestsNum;
let newBed
let newRoomSer
let newTv

let roomImages = []

getRoomInfo();

//get room information
async function getRoomInfo() {
  await fetch(
    `https://mountain.lavetro-agency.com/api/dashboard/rooms/${roomId}`
  )
    .then((res) => res.json())
    .then((res) => (roomInfo = res.data))
    .catch((error) => console.log(error));
  console.log(roomInfo);

  editNameEn.value = roomInfo.title.en;
  neweditNameEn = roomInfo.title.en;

  editNameAr.value = roomInfo.title.ar;
  neweditNameAr = roomInfo.title.ar;

  editSubTitle.value = roomInfo.sub_title.en;
  newSubTitleEn = roomInfo.sub_title.en;

  editSubTitleAr.value = roomInfo.sub_title.ar;
  newsubTitleAr = roomInfo.sub_title.ar;

  editRoomType.value = roomInfo.type;

  editGuestsNum.value = roomInfo.guests_number;
  //newGuestsNum = roomInfo.guests_number

  editFloor.value = roomInfo.floor;

  editRoomPrice.value = roomInfo.price;

  newBed = roomInfo.bed
  roomInfo.bed === 1 ? editSelectBed.checked = true : editSelectBed.checked = false

  newRoomSer = roomInfo.room_services
  roomInfo.room_services === 1 ? editRoomSer.checked = true : editRoomSer.checked = false

  contentEn.setData(roomInfo.content.en);
  contentAr.setData(roomInfo.content.ar);

  for (let i = 0; i < roomInfo?.images.length; i++) {

    if (roomInfo?.images[i]) {
        roomImages.push(roomInfo?.images[i].path)
        let img = roomInfo?.images[i].path
        imagesGroup(img);
       
    } else {
        cancel.log("false")
    }
  }

}

function imagesGroup(img) {
  const addedPhoto = document.createElement("div");
  addedPhoto.classList.add("added-photo");
  const trash = document.createElement("div");
  trash.classList.add("trash");
  const imgTrash = document.createElement("img");
  imgTrash.src = "./assets/images/bag.svg";
  imgTrash.classList.add("delet");
  trash.appendChild(imgTrash);

  const addedImage = document.createElement("img");
  addedImage.classList.add("photo");
  addedImage.src = img;
  addedPhoto.appendChild(addedImage);
  addedPhoto.appendChild(trash);
  containerAddRoomImg.appendChild(addedPhoto);
}

//get all photos
const roomAddPhotos = document.querySelector('#input-photo')
let newRoomImgs = []
roomAddPhotos.addEventListener('change', () => {
  roomImages.length !== 0 ? newRoomImgs = roomImages : null;
  newRoomImgs.push(roomAddPhotos.files);
})

//get room-name-en value
let changeNameEn = "";
editNameEn.addEventListener("change", () => {
  changeNameEn = editNameEn.value;
  console.log(changeNameEn);
});

//get room-name-ar value
let changeNameAr = "";
editNameAr.addEventListener("change", () => {
  changeNameAr = editNameAr.value;
  console.log(changeNameAr);
});

//get subtitle-en value
let changeSubTitleEn = "";
editSubTitle.addEventListener("change", () => {
  changeSubTitleEn = editSubTitle.value;
  console.log(changeSubTitleEn);
});

//get subtitle-ar value
let changeSubTitleAr = "";
editSubTitleAr.addEventListener("change", () => {
  changeSubTitleAr = editSubTitleAr.value;
  console.log(changeSubTitleAr);
});

//get Type select value
let changeType = "";
editRoomType.addEventListener("change", () => {
  changeType = editRoomType.options[editRoomType.selectedIndex].text;
  console.log(changeType);
});

//get guests-number value
let changeGuestsNum = "";
editGuestsNum.addEventListener("change", () => {
  changeGuestsNum = editGuestsNum.value;
  console.log(changeGuestsNum);
});

//get room-price value
let changePrice = "";
editRoomPrice.addEventListener("change", () => {
  changePrice = editRoomPrice.value;
  console.log(changePrice);
});

//get room-services value
let changeRoomServ
editRoomSer.addEventListener("change", () => {
  if (editRoomSer.checked == true) {
    changeRoomServ = 1;
    console.log(changeRoomServ);
  } else {
    changeRoomServ = 0;
    console.log(changeRoomServ);
  }
});

//get room-tv value
let changeTv
editRoomTv.addEventListener("change", () => {
  if (editRoomTv.checked == true) {
    changeTv = 1;
    console.log(changeTv)
  } else {
    changeTv = 0;
    console.log(changeTv)
  }
});

//get floor value
let changeFloor = "";
editFloor.addEventListener("change", () => {
  changeFloor = editFloor.value;
  console.log(changeFloor);
});

//get bed value
let changeBed
editSelectBed.addEventListener("change", () => {
  if (editSelectBed.checked == true) {
    changeBed = 1;
    console.log(changeBed)
  } else {
    changeBed = 0;
    console.log(changeBed)
  }
});

//get photos group
let filelistRoom = [];
editRoomImages.addEventListener("change", function (event) {
  filelistRoom = [];
  for (let i = 0; i < editRoomImages.files.length; i++) {
    filelistRoom.push(editRoomImages.files[i]);
  }
  console.log(filelistRoom);
});

//Update Room
editRoomBtn.addEventListener("click", function (e) {
  e.preventDefault();

  let authToken = localStorage.getItem("token");
  console.log(authToken);
  let newContentEn = contentEn.getData();
  let newContentAr = contentAr.getData();

  let editRoomFile = document.querySelector(".new-add").files[0];

  const formData = new FormData();

  changeNameEn !== ""
    ? formData.append("title_en", changeNameEn)
    : formData.append("title_en", editNameEn.value);

  changeNameAr !== ""
    ? formData.append("title_ar", changeNameAr)
    : formData.append("title_ar", editNameAr.value);

  changeSubTitleEn !== ""
    ? formData.append("sub_title_en", changeSubTitleEn)
    : formData.append("sub_title_en", editSubTitle.value);

  changeSubTitleAr !== ""
    ? formData.append("sub_title_ar", changeSubTitleAr)
    : formData.append("sub_title_ar", editSubTitleAr.value);

  changeType !== ""
    ? formData.append("type", changeType)
    : formData.append("type", editRoomType.value);

  changeGuestsNum !== ""
    ? formData.append("guests_number", changeGuestsNum)
    : formData.append("guests_number", editGuestsNum.value);

  changeFloor !== ""
    ? formData.append("floor", changeFloor)
    : formData.append("floor", editFloor.value);

  changePrice !== ""
    ? formData.append("price", changePrice)
    : formData.append("price", editRoomPrice.value);

  formData.append("content_en", newContentEn);
  formData.append("content_ar", newContentAr);

  changeBed !== undefined 
    ? formData.append("bed", changeBed) 
    : formData.append("bed",  newBed) ;

    changeRoomServ !== undefined 
    ? formData.append("room_services", changeRoomServ) 
    : formData.append("room_services",  newRoomSer) ;

    changeTv !== undefined 
    ? formData.append("TV", changeTv) 
    : formData.append("TV",  newTv) ;

    if (newRoomImgs.length !== 0) {
      for (let i = 0; i < newRoomImgs.length; i++) {
        formData.append(`images[${i}]`, newRoomImgs[i]);
        console.log(newRoomImgs[i])
      }
  }  else {
  if (roomImages.length !== 0) {
      for (let i = 0; i < roomImages.length; i++) {
        formData.append(`images[${i}]`, roomImages[i]);
      }
  }
}

   formData.append("_method", 'put');
 

  fetch(`https://mountain.lavetro-agency.com/api/dashboard/rooms/${roomId}`, {
    method: "POST",
    headers: {
      AUTHORIZATION: `Bearer ${authToken}`,
      Accept: "application/json",
    },
    body: formData,
  })
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((error) => console.log(error));
});
