const roomContainer = document.querySelector('.rooms .article-continer')
let delRoomsData = []

async function ShowdeletedRooms()  {
    let authToken = localStorage.getItem("token");
    await fetch("https://mountain.lavetro-agency.com/api/dashboard/rooms/show/Trashed", {
        method: 'GET',
        headers: {AUTHORIZATION: `Bearer ${authToken}` }
       })
    .then(res => res.json())
    .then(res => delRoomsData = res.data)
    .catch(error => console.log(error))
    console.log(delRoomsData)

    delRoomsData.forEach(roomItem => {
        roomContainer.innerHTML += `
        <div class="article">
           <img class="article-img article-img-md" src=${roomItem.images[0]?.path} alt=""/>
           <div class="detils">
              <div class="head">
                 <div class="left-side" >
                    <h1 class="article-name" >${roomItem.title_en}</h1>
                    <span class="date" >${roomItem.floor} floors ${roomItem.sub_title_en}</span>
                 </div>
                 <div class="icons">
                    <button class="edit" id=${roomItem.id}><img src="./assets/images/radtrash.png" ></button>
                    <img class="restore" id=${roomItem.id} src="./assets/images/recovery-convert.svg" >
                 </div>
              </div>
              <p class="descrabtion">
              ${roomItem.content_en}
              </p>
              <div class="services">
                   <div class="service">
                        <div>
                            <img src="./assets/images/person.svg" >
                        </div>  
                        <p><span class="num-people">${roomItem.guests_number}</span>Persons</p>
                   </div>
                   <div class="service roomService">
                      ${roomItem.room_services > 0 == true ? `
                     <div>
                        <img src="./assets/images/services.svg" >
                     </div>
                     <p class="room-ser">Room Services</p>
                     ` : ""}
                  </div>
                  <div class="service">
                    ${roomItem.bed > 0 == true ? `
                    <div>
                       <img  src="./assets/images/bed.svg" >
                    </div>
                    <p class="room-ser">Kingsize Bed</p>
                    ` : ""}
                  </div>
                  <div class="service">
                     ${roomItem.TV > 0 == true ? `
                       <div>
                          <img  src="./assets/images/tv.svg" >
                       </div>
                       <p class="room-ser">TV</p>
                    ` : ""}
                 </div>

              </div>
              <div class="footer">
                    <p class="price" >$${roomItem.price}</p>
                    <span>Per Night</span>
              </div>
           </div>
        </div>
        `
    })



   //go restore
   const restorRooms = document.querySelectorAll('.icons .restore')
   
   restorRooms.forEach(restorEle => {
      restorEle.addEventListener('click', () => {
         let roomId = restorEle.getAttribute('id')
         restoreRooms(roomId)
      })
   })

   /* force delete */
const alltrashroom = document.querySelectorAll(".edit");
console.log(alltrashroom)
alltrashroom.forEach(Elementtrashroom =>{
    Elementtrashroom.addEventListener("click" , () =>{
        let trashidroom = Elementtrashroom.getAttribute('id');
        console.log(trashidroom)
        forceDeleteroom(trashidroom); 
    })
}) 

}

ShowdeletedRooms()


async function restoreRooms(id)  {
    let authToken = localStorage.getItem("token");
    await fetch(`https://mountain.lavetro-agency.com/api/dashboard/rooms/trash/restore/${id}`, {
        method: 'GET',
        headers: {AUTHORIZATION: `Bearer ${authToken}` }
       })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(error => console.log(error))
}

/* delete fun */
async function forceDeleteroom(id){
   let authToken = localStorage.getItem("token");
   console.log(authToken)
   await fetch(`https://mountain.lavetro-agency.com/api/dashboard/rooms/${id}` , {
       method: 'DELETE',
       headers: {AUTHORIZATION: `Bearer ${authToken}` }
     })
   .then(res => res.json())
   .then(res => console.log(res))
}