let deletedData = []
const deletedContainer = document.querySelector(".blogs .article-continer")

async function getDeletedArticle() {
    let authToken = localStorage.getItem("token");
    console.log(authToken)
    await fetch('https://mountain.lavetro-agency.com/api/dashboard/articles/show/Trashed' , {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            AUTHORIZATION: `Bearer ${authToken}` }
       })
    .then(res => res.json())
    .then(res => deletedData = res.data)
    .catch(error => console.log(error))
    console.log(deletedData)

    deletedData.forEach(ele => {
        deletedContainer.innerHTML += `
        <div class="article">
            <img class="article-img" src=${ele.article_cover} alt=""/>
             <div class="detils">
                <div class="head">
                    <h1 class="article-name" >${ele.title.en}</h1>
                    <span class="date" >${ele.date}</span>
                </div>
                <p class="descrabtion">${ele.content.en}</p>
                <p class="hashtack"></p>                        
                <div class="footer">
                   <div class="icons">
                     <img class="del-article" id=${ele.id} src="./assets/images/recovery-convert.svg" >
                   </div>
                   <button class="arrowlink rm_redtrash" id=${ele.id}>
                        <img src="./assets/images/radtrash.png" class="arrow rm_redtrash" id=${ele.id}>
                   </button>
                </div>
            </div>
        </div>
        `

    })

/* force delete */
const alltrash = document.querySelectorAll(".arrow");
alltrash.forEach(Elementtrash =>{
    Elementtrash.addEventListener("click" , () =>{
        let trashid = Elementtrash.getAttribute('id');
        forceDelete(trashid);
    })
})
      //go restore
      const restorBtns = document.querySelectorAll(".del-article")
      restorBtns.forEach(restorItem => {
        restorItem.addEventListener('click', () => {
            let itemId = restorItem.getAttribute('id')
            console.log(itemId)
            restoreArticle(itemId)
        })
      })
    
    
}

getDeletedArticle();



async function restoreArticle(id) {
    let authToken = localStorage.getItem("token");
    console.log(authToken)
    await fetch(`https://mountain.lavetro-agency.com/api/dashboard/articles/trash/restore/${id}` , {
        method: 'GET',
        headers: {AUTHORIZATION: `Bearer ${authToken}` }
       })
    .then(res => res.json())
    .then(res => console.log(res))
}

//get deleted item details
let itemDetailsData = []
async function getDeletedItemDetails(id) {
    await fetch(`https://mountain.lavetro-agency.com/api/dashboard/articles/${id}`)
    .then(res => res.json())
    .then(res => itemDetailsData = res.data)
    .catch(error => console.log(error))
    console.log(itemDetailsData)
}


/* delete fun */
async function forceDelete(id){
    let authToken = localStorage.getItem("token");
    console.log(authToken)
    await fetch(`https://mountain.lavetro-agency.com/api/dashboard/articles/${id}` , {
        method: 'DELETE',
        headers: {AUTHORIZATION: `Bearer ${authToken}` }
      })
    .then(res => res.json())
    .then(res => console.log(res))
}