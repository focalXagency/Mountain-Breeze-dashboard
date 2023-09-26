const roomId = localStorage.getItem("editRoomBtnId");
const editRoomImages = document.querySelector('.new-add')
const editRoomBtn = document.querySelector('.add-a')
const editNameEn = document.querySelector('.room-name-en')
const editNameAr = document.querySelector('.room-name-ar')
const editSubTitle = document.querySelector(".subtitle-en");
const editSubTitleAr = document.querySelector(".subtitle-ar");
const editRoomType = document.querySelector('.Type')
const editGuestsNum = document.querySelector(".guests")
const editRoomPrice = document.querySelector(".price")
const editRoomSer = document.querySelector('#room-services')
const editRoomTv = document.querySelector('#tv')
const editFloor = document.querySelector('#input-floor')
const editSelectBed = document.querySelector('#bedType')
const editRoomImg = document.querySelector('.new-add')
console.log(roomId);

//get room information 
let roomInfo = []
async function getRoomInfo() {
    await fetch(`https://mountain.lavetro-agency.com/api/dashboard/rooms/${roomId}`)
    .then(res => res.json())
    .then(res => roomInfo = res.data)
    .catch(error => console.log(error))
    console.log(roomInfo)
}

getRoomInfo()

//move label of room-name-en
const roomLabelEn = document.querySelector('.roomEn-label')
editNameEn.onfocus = () => {
    roomLabelEn.classList.add("active-label");
 }
 editNameEn.onblur = () => {
    if(editNameEn.value === "")
    roomLabelEn.classList.remove("active-label");
 }

//move label of room-name-ar
 const editNameLabel = document.querySelector(".roomName-label")
editNameAr.onfocus = () => {
   editNameLabel.classList.add("active-label");
}
editNameAr.onblur = () => {
   if(editNameAr.value === "")
   editNameLabel.classList.remove("active-label");
}

//move price label
const priceLabel = document.querySelector('.lable-price')
editRoomPrice.onfocus = () => {
    priceLabel.classList.add("active-label");
 }
 editRoomPrice.onblur = () => {
    if(editRoomPrice.value === "")
    priceLabel.classList.remove("active-label");
 }

 //move label of subtitle-en
 const editsubLabelEn = document.querySelector(".subtitle-labelEn")
 editSubTitle.onfocus = () => {
    editsubLabelEn.classList.add("active-label");
}
editSubTitle.onblur = () => {
   if(editSubTitle.value === "")
   editsubLabelEn.classList.remove("active-label");
}

 //move label of subtitle-ar
 const editSubLabelAr = document.querySelector(".subtitle-labelAr")
 editSubTitleAr.onfocus = () => {
    editSubLabelAr.classList.add("active-label");
 }
 editSubTitleAr.onblur = () => {
    if(editSubTitleAr.value === "")
    editSubLabelAr.classList.remove("active-label");
 }

//move label of guests-number
const editguestInput = document.querySelector("#number");
const editguestLabel = document.querySelector("label.label-number");
editguestInput.onfocus = () => {
    editguestLabel.classList.add("active-label");
}
editguestInput.onblur = () => {
    if(editguestInput.value === "")
    editguestLabel.classList.remove("active-label");
 }

 //move label of floor
 const editFloorLabel = document.querySelector('.lable-floor')
 editFloor.onfocus = () => {
    editFloorLabel.classList.add("active-label");
}
editFloor.onblur = () => {
    if(editFloor.value === "")
    editFloorLabel.classList.remove("active-label");
 }


 //get room-name-en value
let editNameEnVal 
editNameEn.addEventListener('change', () => {
    editNameEnVal = editNameEn.value
    console.log(editNameEnVal)
})

//get room-name-ar value 
let editNameArVal
editNameAr.addEventListener('change', () => {
    editNameArVal = editNameAr.value
    console.log(editNameArVal)
})

//get subtitle-en value 
let editSubTitleVal
editSubTitle.addEventListener('change', () => {
    editSubTitleVal = editSubTitle.value
    console.log(editSubTitleVal)
})

//get subtitle-ar value 
let editSubTitleArVal
editSubTitleAr.addEventListener('change', () => {
    editSubTitleArVal = editSubTitleAr.value
    console.log(editSubTitleArVal)
})

//get Type select value
let editRoomTypeVal
editRoomType.addEventListener('change', () => {
    editRoomTypeVal = editRoomType.options[editRoomType.selectedIndex].text;
    console.log(editRoomTypeVal)
})

//get guests-number value
let editGuestsNumVal 
editGuestsNum.addEventListener("change", () => {
    editGuestsNumVal = editGuestsNum.value
    console.log(editGuestsNumVal)
})

//get room-price value
let editRoomPriceVal
editRoomPrice.addEventListener("change", () => {
    editRoomPriceVal = editRoomPrice.value
    console.log(editRoomPriceVal)
})

//get room-services value
let editRoomSerVal
editRoomSer.addEventListener('click', () => {
    if(editRoomSer.checked == true) {
        editRoomSerVal = true
        console.log(editRoomSerVal)
    }else {
        editRoomSerVal = false
        console.log(editRoomSerVal)
    }
})

//get room-tv value
let editRoomTvVal
editRoomTv.addEventListener('click', () => {
    if(editRoomTv.checked == true) {
        editRoomTvVal = true
        console.log(editRoomTvVal)
    }else {
        editRoomTvVal = false
        console.log(editRoomTvVal)
    }
})

//get floor value
let editFloorVal
editFloor.addEventListener("change", () => {
    editFloorVal = editFloor.value
    console.log(editFloorVal)
})


let editSelectBedVal = editSelectBed.options[editSelectBed.selectedIndex].text;
editSelectBed.addEventListener('change', () => {
    editSelectBedVal = editSelectBed.options[editSelectBed.selectedIndex].text;
    console.log(editSelectBedVal)
})

 //get photos group
let filelistRoom = [];
editRoomImages.addEventListener("change", function(event) {
    filelistRoom = [];
    for(let i= 0; i < editRoomImages.files.length; i++) {
        filelistRoom.push(editRoomImages.files[i])
    }
    console.log(filelistRoom)
})

let contentEn
ClassicEditor
        .create( document.querySelector( '#desc' ) )
        .then( desc => contentEn = desc)
        .catch( error => console.error( error ))

let contentAr;
ClassicEditor
.create( document.querySelector( '#ardesc' ) )
.then( ardesc => contentAr = ardesc )
.catch( error => console.error( error ))

//Update Room
editRoomBtn.addEventListener('click', function(e) {
    e.preventDefault()
    
    let authToken = localStorage.getItem("token");
    console.log(authToken)
    let contentEnVal = contentEn.getData()
    let contentArVal = contentAr.getData()
    let editRoomFile = document.querySelector('.new-add').files[0]

    const formData = new FormData();
    formData.append('title_en', editNameEnVal)
    formData.append('title_ar', editNameArVal)
    formData.append('type', editRoomTypeVal)
    formData.append('guests_number', editGuestsNumVal)
    formData.append('price', editRoomPriceVal)
    formData.append('content_en', contentEnVal)
    formData.append('content_ar', contentArVal)
    formData.append('images', editRoomFile)
    formData.append('bed', editSelectBedVal)
    formData.append('TV', editRoomTvVal)
    formData.append('floor', editFloorVal)
    formData.append('sub_title_en', editSubTitleVal)
    formData.append('sub_title_ar', editSubTitleArVal)

    fetch(`https://mountain.lavetro-agency.com/api/dashboard/rooms/${roomId}`,{
        method: 'PUT',
        headers: { AUTHORIZATION: `Bearer ${authToken}` },
        body: formData,
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(error => console.log(error))
})

