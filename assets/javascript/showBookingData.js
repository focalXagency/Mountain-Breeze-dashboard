let bookingData = []
const bookingContainer = document.querySelector('.booking .article-continer')

async function getBookingData() {
    let authToken = localStorage.getItem("token");
    console.log(authToken)
    await fetch("https://mountain.lavetro-agency.com/api/dashboard/books" , {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            AUTHORIZATION: `Bearer ${authToken}` }
       })
    .then(res => res.json())
    .then(res => bookingData = res.data)
    .catch(error => console.log(error))
    console.log(bookingData)

    bookingData.forEach(bookEle => {
        bookingContainer.innerHTML += `
        <div class="article">
           <div class="head">
                <h1 class="article-name" >${bookEle.Full_Name}</h1>
                <span class="date" >July 17, 2023</span>
            </div>
            <div class="info">
               <div class="personal-detils">
                     <div class="phone" >
                        <span>phone : </span>
                        <span class="black" id="phone" >${bookEle.Phone}</span>
                     </div>
                    <div class="email" >
                        <span>E-mail : </span>
                        <span class="black" id="email" >${bookEle.Email}</span>
                    </div>
                </div>
                <div class="personal-detils">
                    <div class="check-in-date">
                       <span>Check-in date : </span>
                       <span class="black" id="check-in-date" >${bookEle.Check_in_date}</span>
                    </div>
                    <div class="check-out-date" >
                      <span>Check-out date : </span>
                      <span class="black" id="check-out-date" >${bookEle.Check_out_date}</span>
                   </div>
                </div>
                <div class="personal-detils">
                   <div class="room-type" >
                     <span>Room Type : </span>
                     <span  class="black" id="room-type" >${bookEle.Room_Type}</span>
                   </div>
                   <div class="guests-number" >
                     <span>guests Number : </span>
                     <span class="black" id="guests-number" >${bookEle.guests_number}</span>
                  </div>
                </div>

            </div>
            <div class="descrabtion">
                    <span class="title" >Descrabtion</span>
                    <p>
                        ${bookEle.content}
                    </p>
            </div>
        </div>
        `
    })

}

getBookingData();

//filter by Room Type 
const roomType = document.querySelector('.room-type')
//let roomTypeVal= roomType.options[roomType.selectedIndex].text;
//console.log(roomTypeVal)
roomType.addEventListener('change', (e) => {
    let roomTypeVal= roomType.options[roomType.selectedIndex].text;
    deleteAllData()
    bookingRoomType(roomTypeVal)
})

//filter by guests number
const guestsNumInput = document.querySelector('.guests-number')
let guestsNumVal
guestsNumInput.addEventListener('change', () => {
    guestsNumVal = guestsNumInput.value
    deleteAllData()
    bookingGuestsNum(guestsNumVal)
})

// get booking data depends on Room Type
let roomTypeData = []

async function bookingRoomType(type) {
    let authToken = localStorage.getItem("token");
    console.log(authToken)
    await fetch(`https://mountain.lavetro-agency.com/api/dashboard/books?room_type=${type}` , {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            AUTHORIZATION: `Bearer ${authToken}` }
       })
    .then(res =>  res.json())
    .then(res => roomTypeData = res.data)
    .catch(error => console.log(error))
    console.log(roomTypeData)

    roomTypeData.forEach(bookItem => {
        bookingContainer.innerHTML += `
        <div class="article">
           <div class="head">
                <h1 class="article-name" >${bookItem.Full_Name}</h1>
                <span class="date" >July 17, 2023</span>
            </div>
            <div class="info">
               <div class="personal-detils">
                     <div class="phone" >
                        <span>phone : </span>
                        <span class="black" id="phone" >${bookItem.Phone}</span>
                     </div>
                    <div class="email" >
                        <span>E-mail : </span>
                        <span class="black" id="email" >${bookItem.Email}</span>
                    </div>
                </div>
                <div class="personal-detils">
                    <div class="check-in-date">
                       <span>Check-in date : </span>
                       <span class="black" id="check-in-date" >${bookItem.Check_in_date}</span>
                    </div>
                    <div class="check-out-date" >
                      <span>Check-out date : </span>
                      <span class="black" id="check-out-date" >${bookItem.Check_out_date}</span>
                   </div>
                </div>
                <div class="personal-detils">
                   <div class="room-type" >
                     <span>Room Type : </span>
                     <span  class="black" id="room-type" >${bookItem.Room_Type}</span>
                   </div>
                   <div class="guests-number" >
                     <span>guests Number : </span>
                     <span class="black" id="guests-number" >${bookItem.guests_number}</span>
                  </div>
                </div>

            </div>
            <div class="descrabtion">
                    <span class="title" >Descrabtion</span>
                    <p>
                        ${bookItem.content}
                    </p>
            </div>
        </div>
        `
   })


}


//delete all booking data
function deleteAllData() {
    bookingContainer.innerHTML = ''
}


// get booking data depends on guests number
let guestsNumData = []

async function bookingGuestsNum(num) {
    let authToken = localStorage.getItem("token");
    console.log(authToken)
    await fetch(`https://mountain.lavetro-agency.com/api/dashboard/books?guests_number=${num}` , {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            AUTHORIZATION: `Bearer ${authToken}` }
       })
    .then(res =>  res.json())
    .then(res => guestsNumData = res.data)
    .catch(error => console.log(error))
    console.log(guestsNumData)

    guestsNumData.forEach(guestsItem => {
        bookingContainer.innerHTML += `
        <div class="article">
           <div class="head">
                <h1 class="article-name" >${guestsItem.Full_Name}</h1>
                <span class="date" >July 17, 2023</span>
            </div>
            <div class="info">
               <div class="personal-detils">
                     <div class="phone" >
                        <span>phone : </span>
                        <span class="black" id="phone" >${guestsItem.Phone}</span>
                     </div>
                    <div class="email" >
                        <span>E-mail : </span>
                        <span class="black" id="email" >${guestsItem.Email}</span>
                    </div>
                </div>
                <div class="personal-detils">
                    <div class="check-in-date">
                       <span>Check-in date : </span>
                       <span class="black" id="check-in-date" >${guestsItem.Check_in_date}</span>
                    </div>
                    <div class="check-out-date" >
                      <span>Check-out date : </span>
                      <span class="black" id="check-out-date" >${guestsItem.Check_out_date}</span>
                   </div>
                </div>
                <div class="personal-detils">
                   <div class="room-type" >
                     <span>Room Type : </span>
                     <span  class="black" id="room-type" >${guestsItem.Room_Type}</span>
                   </div>
                   <div class="guests-number" >
                     <span>guests Number : </span>
                     <span class="black" id="guests-number" >${guestsItem.guests_number}</span>
                  </div>
                </div>

            </div>
            <div class="descrabtion">
                    <span class="title" >Descrabtion</span>
                    <p>
                        ${guestsItem.content}
                    </p>
            </div>
        </div>
        `
   })


}