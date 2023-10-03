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
                     <button class="edit-link" id=${ele.id}><img src="./assets/images/edit-red.svg" ></button>
                     <img class="del-article" id=${ele.id} src="./assets/images/recovery-convert.svg" >
                   </div>
                   <button class="arrowlink" id=${ele.id}>
                        <img src="./assets/images/arrow-right-white.svg" class="arrow">
                   </button>
                </div>
            </div>
        </div>
        `

     
    
     //for (let i = 0; i < goEdit.length; i++) {}
    //  goEdit.forEach(delItem => {
    //       delItem.addEventListener('click', () => {
    //             window.location.href = "./editArticle.html";
    //             let idBtn = delItem.getAttribute('id');
    //             console.log(idBtn)
    //             localStorage.setItem('delItemId', idBtn)
    //       })
    //   })

    })

    //go edit page
    const goEdit = document.querySelectorAll(".edit-link")
    for (let i = 0; i < goEdit.length; i++) {
        goEdit[i].addEventListener('click', () => {
            let editArticleId = goEdit[i].getAttribute('id')
            window.location.href = "./editArticle.html";
            localStorage.setItem("editArticleId", editArticleId)
    
        })
    }

      //go restore
      const restorBtns = document.querySelectorAll(".del-article")
      restorBtns.forEach(restorItem => {
        restorItem.addEventListener('click', () => {
            let itemId = restorItem.getAttribute('id')
            console.log(itemId)
            restoreArticle(itemId)
        })
      })
    
     //show article Details 
     const allDetailsbtns = document.querySelectorAll(".arrowlink")
     for (let i = 0; i < allDetailsbtns.length; i++) {
        allDetailsbtns[i].addEventListener('click', () => {
            let DeletedDetailId = allDetailsbtns[i].getAttribute('id')
            window.location.href = "./articledetils.html";
            localStorage.setItem('articleId', DeletedDetailId)
        })
     }
    
}

getDeletedArticle();

{/* <div class="icons">
    <a href="./editArticle.html" ><img src="./assets/images/edit-red.svg" ></a>
    <img src="./assets/images/recovery-convert.svg" >
</div> */}

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