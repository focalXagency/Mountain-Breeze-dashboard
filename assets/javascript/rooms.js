const roomsContainer = document.querySelector(".rooms .article-continer")
let allRooms;
const deletIconR = document.querySelector(".div-popup-delet");
const deletBtnR = document.querySelector(".div-popup-delet .popup-delet .delet-btns .delet");
//console.log(deletBtnR)

async function getRooms () {
   const response =  await fetch("https://mountain.lavetro-agency.com/api/dashboard/rooms")
   const jsonRes = await response.json()
   allRooms = jsonRes.data;
   console.log(allRooms)
   //let roomsData = ""

   allRooms.forEach((ele,index) => {
    roomsContainer.innerHTML += `
    <div class="article" id=${ele.id}>
        <img class="article-img article-img-md" src=${ele.images[0]?.path} alt=""/>
        <div class="detils">
          <div class="head">
            <div class="left-side">
               <h1 class="article-name" >${ele.title.en}</h1>
               <span class="desc" >${ele.floor} floors ${ele.sub_title.en}</span>
            </div>
            <div class="icons">
               <button class="edit" id=${ele.id}><img src="./assets/images/edit-gray.svg"></button>
               <img class="del-article" src="./assets/images/trach-gray.svg" >
            </div>
          </div>
          <p>${ele.content.en}</p>
          <div class="services">
             <div class="service">
                 <div>
                     <img src="./assets/images/person.svg" >
                 </div>
                 <p><span class="num-people">${ele.guests_number} </span>Persons</p>
             </div>
             <div class="service roomService">
                ${ele.room_services > 0 == true ? `
                     <div>
                        <img src="./assets/images/services.svg" >
                     </div>
                     <p class="room-ser">Room Services</p>
                ` : ""}
             </div>
             <div class="service">
                ${ele.bed > 0 == true ? `
                     <div>
                        <img  src="./assets/images/bed.svg" >
                     </div>
                     <p class="room-ser">Kingsize Bed</p>
                ` : ""}
             </div>
             <div class="service">
                ${ele.TV > 0 == true ? `
                     <div>
                        <img  src="./assets/images/tv.svg" >
                     </div>
                     <p class="room-ser">TV</p>
                ` : ""}
             </div>
          </div>
          <div class="footer">
               <p class="price" >$${ele.price}</p>
               <span>Per Night</span>
          </div>
        </div>
    </div>
    `
              
    const article = document.querySelector(".article")
    let idArticle = article.getAttribute('id');
    icons = document.querySelectorAll(".del-article");

    icons.forEach(ele => {
       ele.addEventListener('click', (event) => {
            console.log(ele)
            deletIconR.classList.add("show");
            deletBtnR.addEventListener('click', () => {
                   deleteRoom(idArticle);
                   let child = event;
                   child.target.parentNode.parentNode.parentNode.parentNode.remove();
                   deletIconR.classList.remove("show");
       })
     })
  })

  const editRoomBtns = document.querySelectorAll(".edit")
  editRoomBtns.forEach(editRoomEle => {
   editRoomEle.addEventListener('click', () => {
           window.location.href = "./editroom.html";
           let editRoomBtnId = editRoomEle.getAttribute('id');
           localStorage.setItem('editRoomBtnId', editRoomBtnId)
   })
  })

   })

 
}



getRooms();

async function deleteRoom(id) {
  let authToken = localStorage.getItem("token");
       console.log(authToken)
       fetch(`https://mountain.lavetro-agency.com/api/dashboard/rooms/softDelete/${id}`, {
        method: 'GET',
        headers: {AUTHORIZATION: `Bearer ${authToken}` }
       })
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(error => console.log(error));
}

//filter rooms depend on room type
const roomTypeInput = document.querySelector('.type-room')

roomTypeInput.addEventListener('change', (e) => {
   let roomTypeInputVal = roomTypeInput.options[roomTypeInput.selectedIndex].text;
   deleteAllRooms()
   getByRoomType(roomTypeInputVal)
})

//filter rooms depend on guests number
const guestsInput = document.querySelector('.guests-number')
let guestsVal
guestsInput.addEventListener('change', () => {
   guestsVal = guestsInput.value
   deleteAllRooms()
   getByGuestsNum(guestsVal)
})

//filter rooms depend on min price
const roomPriceInput = document.querySelector('.room-price')
let roomPriceVal
roomPriceInput.addEventListener('change', () => {
    roomPriceVal = roomPriceInput.value
    deleteAllRooms()
    getByMinPrice(roomPriceVal)
})

//Delete All Rooms Data
function deleteAllRooms() {
   roomsContainer.innerHTML = ''
}

//get rooms depend on room type
let roomTypeData =[]

async function getByRoomType(type) {
   await fetch(`https://mountain.lavetro-agency.com/api/dashboard/rooms?type=${type}`)
   .then(res => res.json())
   .then(res => roomTypeData = res.data)
   .catch(error => console.log(error))
    console.log(roomTypeData)

    roomTypeData.forEach(eleRoom => {
      roomsContainer.innerHTML += `
      <div class="article" id=${eleRoom.id}>
          <img class="article-img article-img-md" src=${eleRoom.images[0]?.path} alt=""/>
          <div class="detils">
            <div class="head">
              <div class="left-side">
                 <h1 class="article-name" >${eleRoom.title.en}</h1>
                 <span class="desc" >${eleRoom.floor} floors ${eleRoom.sub_title.en}</span>
              </div>
              <div class="icons">
                 <button class="edit" id=${eleRoom.id}><img src="./assets/images/edit-gray.svg"></button>
                 <img class="del-article" src="./assets/images/trach-gray.svg" >
              </div>
            </div>
            <p>${eleRoom.content.en}</p>
            <div class="services">
               <div class="service">
                   <div>
                       <img src="./assets/images/person.svg" >
                   </div>
                   <p><span class="num-people">${eleRoom.guests_number} </span>Persons</p>
               </div>
               <div class="service roomService">
                  ${eleRoom.room_services > 0 == true ? `
                       <div>
                          <img src="./assets/images/services.svg" >
                       </div>
                       <p class="room-ser">Room Services</p>
                  ` : ""}
               </div>
               <div class="service">
                  ${eleRoom.bed > 0 == true ? `
                       <div>
                          <img  src="./assets/images/bed.svg" >
                       </div>
                       <p class="room-ser">Kingsize Bed</p>
                  ` : ""}
               </div>
               <div class="service">
                  ${eleRoom.TV > 0 == true ? `
                       <div>
                          <img  src="./assets/images/tv.svg" >
                       </div>
                       <p class="room-ser">TV</p>
                  ` : ""}
               </div>
            </div>
            <div class="footer">
                 <p class="price" >$${eleRoom.price}</p>
                 <span>Per Night</span>
            </div>
          </div>
      </div>
      `

      const article = document.querySelector(".article")
      let idArticle = article.getAttribute('id');
      icons = document.querySelectorAll(".del-article");

      icons.forEach(ele => {
         ele.addEventListener('click', (event) => {
              console.log(ele)
              deletIconR.classList.add("show");
              deletBtnR.addEventListener('click', () => {
                     deleteRoom(idArticle);
                     let child = event;
                     child.target.parentNode.parentNode.parentNode.parentNode.remove();
                     deletIconR.classList.remove("show");
         })
       })
    })

    const editRoomBtns = document.querySelectorAll(".edit")
    editRoomBtns.forEach(editRoomEle => {
     editRoomEle.addEventListener('click', () => {
             window.location.href = "./editroom.html";
             let editRoomBtnId = editRoomEle.getAttribute('id');
             localStorage.setItem('editRoomBtnId', editRoomBtnId)
     })
    })

    })
}

//get rooms depend on guests number
let guestsNumData = []
async function getByGuestsNum(num) {
   await fetch(`https://mountain.lavetro-agency.com/api/dashboard/rooms?guests_number=${num}`)
   .then(res => res.json())
   .then(res => guestsNumData = res.data)
   .catch(error => console.log(error))
   console.log(guestsNumData)

   guestsNumData.forEach(eleGuests => {
      roomsContainer.innerHTML += `
      <div class="article" id=${eleGuests.id}>
          <img class="article-img article-img-md" src=${eleGuests.images[0]?.path} alt=""/>
          <div class="detils">
            <div class="head">
              <div class="left-side">
                 <h1 class="article-name" >${eleGuests.title.en}</h1>
                 <span class="desc" >${eleGuests.floor} floors ${eleGuests.sub_title.en}</span>
              </div>
              <div class="icons">
                 <button class="edit" id=${eleGuests.id}><img src="./assets/images/edit-gray.svg"></button>
                 <img class="del-article" src="./assets/images/trach-gray.svg" >
              </div>
            </div>
            <p>${eleGuests.content.en}</p>
            <div class="services">
               <div class="service">
                   <div>
                       <img src="./assets/images/person.svg" >
                   </div>
                   <p><span class="num-people">${eleGuests.guests_number} </span>Persons</p>
               </div>
               <div class="service roomService">
                  ${eleGuests.room_services > 0 == true ? `
                       <div>
                          <img src="./assets/images/services.svg" >
                       </div>
                       <p class="room-ser">Room Services</p>
                  ` : ""}
               </div>
               <div class="service">
                  ${eleGuests.bed > 0 == true ? `
                       <div>
                          <img  src="./assets/images/bed.svg" >
                       </div>
                       <p class="room-ser">Kingsize Bed</p>
                  ` : ""}
               </div>
               <div class="service">
                  ${eleGuests.TV > 0 == true ? `
                       <div>
                          <img  src="./assets/images/tv.svg" >
                       </div>
                       <p class="room-ser">TV</p>
                  ` : ""}
               </div>
            </div>
            <div class="footer">
                 <p class="price" >$${eleGuests.price}</p>
                 <span>Per Night</span>
            </div>
          </div>
      </div>
      `

      const article = document.querySelector(".article")
      let idArticle = article.getAttribute('id');
      icons = document.querySelectorAll(".del-article");

      icons.forEach(ele => {
         ele.addEventListener('click', (event) => {
              console.log(ele)
              deletIconR.classList.add("show");
              deletBtnR.addEventListener('click', () => {
                     deleteRoom(idArticle);
                     let child = event;
                     child.target.parentNode.parentNode.parentNode.parentNode.remove();
                     deletIconR.classList.remove("show");
         })
       })
    })

    const editRoomBtns = document.querySelectorAll(".edit")
    editRoomBtns.forEach(editRoomEle => {
     editRoomEle.addEventListener('click', () => {
             window.location.href = "./editroom.html";
             let editRoomBtnId = editRoomEle.getAttribute('id');
             localStorage.setItem('editRoomBtnId', editRoomBtnId)
     })
    })

    })
}

//get rooms depend on min price
let minPriceData = []
async function getByMinPrice(num) {
   await fetch(`https://mountain.lavetro-agency.com/api/dashboard/rooms?min_price=${num}`)
   .then(res => res.json())
   .then(res => minPriceData = res.data)
   .catch(error => console.log(error))
   console.log(minPriceData)

   minPriceData.forEach(eleMinPrice => {
      roomsContainer.innerHTML += `
      <div class="article" id=${eleMinPrice.id}>
          <img class="article-img article-img-md" src=${eleMinPrice.images[0]?.path} alt=""/>
          <div class="detils">
            <div class="head">
              <div class="left-side">
                 <h1 class="article-name" >${eleMinPrice.title.en}</h1>
                 <span class="desc" >${eleMinPrice.floor} floors ${eleMinPrice.sub_title.en}</span>
              </div>
              <div class="icons">
                 <button class="edit" id=${eleMinPrice.id}><img src="./assets/images/edit-gray.svg"></button>
                 <img class="del-article" src="./assets/images/trach-gray.svg" >
              </div>
            </div>
            <p>${eleMinPrice.content.en}</p>
            <div class="services">
               <div class="service">
                   <div>
                       <img src="./assets/images/person.svg" >
                   </div>
                   <p><span class="num-people">${eleMinPrice.guests_number} </span>Persons</p>
               </div>
               <div class="service roomService">
                  ${eleMinPrice.room_services > 0 == true ? `
                       <div>
                          <img src="./assets/images/services.svg" >
                       </div>
                       <p class="room-ser">Room Services</p>
                  ` : ""}
               </div>
               <div class="service">
                  ${eleMinPrice.bed > 0 == true ? `
                       <div>
                          <img  src="./assets/images/bed.svg" >
                       </div>
                       <p class="room-ser">Kingsize Bed</p>
                  ` : ""}
               </div>
               <div class="service">
                  ${eleMinPrice.TV > 0 == true ? `
                       <div>
                          <img  src="./assets/images/tv.svg" >
                       </div>
                       <p class="room-ser">TV</p>
                  ` : ""}
               </div>
            </div>
            <div class="footer">
                 <p class="price" >$${eleMinPrice.price}</p>
                 <span>Per Night</span>
            </div>
          </div>
      </div>
      `

      const article = document.querySelector(".article")
      let idArticle = article.getAttribute('id');
      icons = document.querySelectorAll(".del-article");

      icons.forEach(ele => {
         ele.addEventListener('click', (event) => {
              console.log(ele)
              deletIconR.classList.add("show");
              deletBtnR.addEventListener('click', () => {
                     deleteRoom(idArticle);
                     let child = event;
                     child.target.parentNode.parentNode.parentNode.parentNode.remove();
                     deletIconR.classList.remove("show");
         })
       })
    })

    const editRoomBtns = document.querySelectorAll(".edit")
    editRoomBtns.forEach(editRoomEle => {
     editRoomEle.addEventListener('click', () => {
             window.location.href = "./editroom.html";
             let editRoomBtnId = editRoomEle.getAttribute('id');
             localStorage.setItem('editRoomBtnId', editRoomBtnId)
     })
    })

    })

}