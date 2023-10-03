const roomName = document.querySelector('.room-name')
const roomNameAr = document.querySelector('.room-name-ar')
const roomType = document.querySelector('.Type')
const roomGuests = document.querySelector('.guests')
const roomPrice = document.querySelector('.price')
const services = document.querySelector('#room-services')
const tv = document.querySelector('#tv')
const subTitle = document.querySelector(".subtitle-en");
const subTitleAr = document.querySelector(".subtitle-ar");
const selectType = document.querySelector("#type")
const selectBed = document.querySelector("#bed");
const floor = document.querySelector('#input-floor')
const inputImages = document.querySelector('.new-add');
const createRoomBtn = document.querySelector(".add-a")
console.log(selectType);

let roomNameVal
let roomNameArVal
let roomTypeVal
let roomGuestsVal
let roomPriceVal
let servicesVal
let subTitleVal
let subTitleArVal
let selectTypeVal
let selectBedVal
let guestInputVal
let tvVal
let floorVal

//move room name en label
const nameEnLabel = document.querySelector('.name-en-label')
roomName.onfocus = () => {
    nameEnLabel.classList.add("active-label");
 }
 roomName.onblur = () => {
     if(roomName.value === "")
     nameEnLabel.classList.remove("active-label");
  }

  //move room price label
  const roomPriceLabel = document.querySelector('.lable-price')
  roomPrice.onfocus = () => {
    roomPriceLabel.classList.add("active-label");
 }
 roomPrice.onblur = () => {
     if(roomPrice.value === "")
     roomPriceLabel.classList.remove("active-label");
  }

//move label of guests-number
const guestInput = document.querySelector("#number");
const guestLabel = document.querySelector("label.label-number");
guestInput.onfocus = () => {
   guestLabel.classList.add("active-label");
}
guestInput.onblur = () => {
    if(guestInput.value === "")
    guestLabel.classList.remove("active-label");
 }

 //move label of room-name-ar
 const roomNameLabel = document.querySelector(".roomName-label")
 roomNameAr.onfocus = () => {
    roomNameLabel.classList.add("active-label");
 }
 roomNameAr.onblur = () => {
    if(roomNameAr.value === "")
    roomNameLabel.classList.remove("active-label");
 }

  //move label of subtitle-en
  const subTitleLabelEn = document.querySelector(".subtitle-labelEn")
  subTitle.onfocus = () => {
    subTitleLabelEn.classList.add("active-label");
 }
 subTitle.onblur = () => {
    if(subTitle.value === "")
    subTitleLabelEn.classList.remove("active-label");
 }

 //move label of subtitle-ar
 const subtitleLabelAr = document.querySelector(".subtitle-labelAr")
 subTitleAr.onfocus = () => {
    subtitleLabelAr.classList.add("active-label");
 }
 subTitleAr.onblur = () => {
    if(subTitleAr.value === "")
    subtitleLabelAr.classList.remove("active-label");
 }

  //move label of floor
  const floorLabel = document.querySelector(".lable-floor")
  floor.onfocus = () => {
    floorLabel.classList.add("active-label");
 }
 floor.onblur = () => {
    if(floor.value === "")
    floorLabel.classList.remove("active-label");
 }



//get room-name-en
roomName.addEventListener('change', () => {
     roomNameVal = roomName.value;
    console.log(roomNameVal)
})

//get room-name-ar
roomNameAr.addEventListener('change', () => {
    roomNameArVal = roomNameAr.value;
   console.log(roomNameArVal)
})

//get subTitle-en
subTitle.addEventListener('change', () => {
    subTitleVal = subTitle.value;
   console.log(subTitleVal)
})

//get subTitle-ar
subTitleAr.addEventListener('change', () => {
    subTitleArVal = subTitleAr.value;
   console.log(subTitleArVal)
})

//get room-type select value
selectType.addEventListener('change', () => {
    selectTypeVal = selectType.options[selectType.selectedIndex].text;
    console.log(selectTypeVal)
})

//get bed-type select value

selectBedVal = '0'
console.log(selectBedVal)
selectBed.addEventListener('change', () => {
    if(selectBed.checked == true) {
        selectBedVal = '1'
        console.log(selectBedVal)
    } else {
        selectBedVal = '0'
        console.log(selectBedVal)
    }
})


//get room-guests
guestInput.addEventListener('input', () => {
    guestInputVal = guestInput.value
    console.log(guestInputVal)
})

//get room-price
roomPrice.addEventListener('input', () => {
    roomPriceVal = roomPrice.value;
    console.log(roomPriceVal)
})

//get floor value 
floor.addEventListener("change", () => {
    floorVal = floor.value
    console.log(floorVal)
})

//get room-services value

servicesVal = 0
console.log(servicesVal)
services.addEventListener('change', () => {
    if(services.checked == true) {
        servicesVal = 1
        console.log(servicesVal)
    } else {
        servicesVal = 0
        console.log(servicesVal)
    }
})


tvVal = 0
console.log(tvVal)
tv.addEventListener('click', () => {
    if(tv.checked == true) {
        tvVal = 1
        console.log(tvVal)
    }else {
        tvVal = 0
        console.log(tvVal)
    }
})

//get photos group
let roomFileList = [];
inputImages.addEventListener("change", function(event) {
    roomFileList = [];
    for(let i= 0; i < inputImages.files.length; i++) {
        roomFileList.push(inputImages.files[i])
    }
    console.log(roomFileList[0])
})


let dataContentEn
ClassicEditor
        .create( document.querySelector( '#desc' ) )
        .then( desc => dataContentEn = desc )
        .catch( error => {
                console.error( error );
        } );

let dataContentAr
ClassicEditor
.create( document.querySelector( '#ardesc' ) )
.then( ardesc => dataContentAr = ardesc )
.catch( error => {
        console.error( error );
} );

createRoomBtn.addEventListener('click', function(e) {
    e.preventDefault()
    let authToken = localStorage.getItem("token");
    let roomContentEn = dataContentEn.getData()
    let roomContentAr = dataContentAr.getData()
    let roomImg = document.querySelector('.new-add').files[0]
    const formData = new FormData();
    formData.append('title_en', roomNameVal)
    formData.append('title_ar', roomNameArVal)
    formData.append('type', selectTypeVal)
    formData.append('guests_number', guestInputVal)
    formData.append('price', roomPriceVal)
    formData.append('content_en', roomContentEn)
    formData.append('content_ar', roomContentAr)
    formData.append('images[0]', roomImg)
    formData.append('bed', selectBedVal)
    formData.append('TV', tvVal)
    formData.append('floor', floorVal)
    formData.append('sub_title_en', subTitleVal)
    formData.append('sub_title_ar', subTitleArVal)

    fetch('https://mountain.lavetro-agency.com/api/dashboard/rooms',{
        method: 'POST',
        headers: { AUTHORIZATION: `Bearer ${authToken}` },
        body: formData,
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(error => console.log(error))
})