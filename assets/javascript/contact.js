let token = localStorage.getItem('token');
var myHeaders = new Headers();
myHeaders.append("Accept", "application/json");

var requestOptions = {
  method: 'GET',
  headers: {
    myHeaders,
    Authorization: `Bearer ${token}`
  },
};

const chatsBox = document.querySelector(".chats-box");

getMassegs()
async function getMassegs() {

  let massegs;
  await fetch("https://mountain.lavetro-agency.com/api/dashboard/contact", requestOptions)
    .then(res => res.json())
    .then(res => massegs = res.data)
    .catch(error => console.log('error', error));

  console.log(massegs)
  let msg = "";
  massegs.forEach(ele => {
    let newContent;
    if (ele.content.length > 34) {
      newContent = ele.content.slice(0, 28) + "..";
    } else {
      newContent = ele.content
    }

    msg += `<div class="single-chat-container">
      <div class="single-chat" id=${ele.id}>
              <div class="first-box">
                  <span class="rectangle-span-inbox"></span>
                  <span class="circle-inbox"></span>
              </div>  <!--End first-box -->
                  <div class="middle-box">
                      <h3 class="name">${ele.Full_Name}</h3>
                      <h1 class="title">${ele.Subject}</h1>
                      <p class="description">${newContent}</p>
                  </div>  <!--End middle-box -->
                   <div class="last-box">
                      <span class="date">${ele.created_at}</span>
                      <img src="./assets//images/attachsquare.svg" alt="attachsquare">
                  </div>
      </div> <!--End single-chat -->
  </div>

      `

    chatsBox.innerHTML = msg;
  })



  const chatItems = document.querySelectorAll(".single-chat");
  const noConver = document.querySelector(".conver-container .no-conver");
  const existConver = document.querySelector(".conver-container .exist-conver");
  const messageInbox = document.querySelector(".message-inbox");
  const span = document.querySelector(".inbox .hero-inbox .chats-box .first-box .circle-inbox")

  for (let i = 0; i < chatItems.length; i++) {

    chatItems[i].addEventListener('click', () => {
      resetItems();
      noConver.style = 'display: none'
      existConver.style = 'display: block';
      span.style = 'display: block';

      let detilsMsg = "";

      detilsMsg = `

                            <div class="first-msg-inbox">
                                <div class="user-info">
                                    <h3 class="user-name">${massegs[i].Full_Name}</h3>
                                    <p class="user-email">${massegs[i].Email}</p>
                                </div>  <!-- End user-info -->
                                <div class="date-msg-box">
                                    <span class="msg-date">${massegs[i].created_at}</span>
                                    <img class="remove-msg" id="remove-one" src="./assets/images/black-trash.svg" alt="black-trash">
                                    <img class="settings-msg" src="./assets/images/Vector-msg.svg" alt="Vector-msg">
                                </div>
                            </div> <!-- End first-msg-box -->

                            <div class="second-msg-inbox">
                                <h3 class="msg-title-inbox">${massegs[i].Subject}</h1>
                                <p class="desc">
                                   ${massegs[i].content}
                                </p> <!-- End msg-desc -->
                            </div> <!-- End second-msg-box -->

                            
      `
      messageInbox.setAttribute('id', massegs[i].id);
      messageInbox.innerHTML = detilsMsg;
      const deleteMsg = document.querySelector("#remove-one");
      deleteMsg.addEventListener('click', () => {
        let idMsg = parseInt(messageInbox.getAttribute('id'));
        removeMsg(idMsg);
        noConver.style = 'display: block'
        existConver.style = 'display: none';
        span.style = 'display: none';
        chatItems[i].remove()
      })
    })

  }


  const toSet = document.querySelectorAll(".rectangle-span-inbox")

  let deletedMsg = [];
  let selectedMsg = []
  for (let i = 0; i < toSet.length; i++) {
    toSet[i].addEventListener('click', () => {
      toSet[i].classList.add('done');
      let id = parseInt(parseInt(chatItems[i - 1].getAttribute('id')));
      selectedMsg.push(chatItems[i - 1])
      console.log(id)
      deletedMsg.push(id);
    })


    function resetItems() {
      chatItems.forEach(item => {
        item.classList.remove("active")
      })
    }
  }
  const all = document.querySelector("#deleteAll");
  console.log(all)
  all.addEventListener('click', () => {
    console.log(deletedMsg)
    selectedMsg.map(ele => {
      ele.remove()
    })
    noConver.style = 'display: block'
    existConver.style = 'display: none';
    span.style = 'display: none';
    deleteMulti(deletedMsg);
    deletedMsg=[];
  })
  async function deleteMulti(deletedMsg) {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    var requestOptions = {
      method: 'DELETE',
      headers: {
        myHeaders,
        Authorization: `Bearer ${token}`
      },
      body: {"ids":deletedMsg}
    };
    await fetch("https://mountain.lavetro-agency.com/api/dashboard/contact/multiRecords" , requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

  }
}
async function removeMsg(id) {

  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");

  var requestOptions = {
    method: 'DELETE',
    headers: {
      myHeaders,
      Authorization: `Bearer ${token}`
    },
    redirect: 'follow'
  };

  await fetch(`https://mountain.lavetro-agency.com/api/dashboard/contact/${id}`, requestOptions)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(error => console.log('error', error));



}


