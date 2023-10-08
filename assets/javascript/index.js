const articleContainer = document.querySelector('.blogs .hero .article-setting .article-continer')
const cancelBtn = document.querySelector('.cancel');
const deletIcon = document.querySelector(".div-popup-delet");
const deletBtn = document.querySelector(".div-popup-delet .popup-delet .delet-btns .delet");

let articlesData = []

async function getArticles() {
    await fetch("http://127.0.0.1:8000/api/dashboard/articles")
    .then(res => res.json())
    .then(res => articlesData = res.data)
    .catch(error => console.log(error))
    console.log(articlesData)

    articlesData.forEach((ele, index) => {
                        if (articleContainer != null) {
                        articleContainer.innerHTML += `<div class="article" id=${ele.id}>
                        <img class="article-img" src=${ele.article_cover} />
                        <div class="detils">
                           <div class="head">
                              <h1 class="article-name" >${ele.title.en}</h1>
                              <span class="date" >${ele.date}</span>
                           </div>
                           <p class="descrabtion">${ele.content.en}</p>
                           <p class="hashtack"></p>                        
                           <div class="footer">
                              <div class="icons">
                                   <button class="edit-link" id=${ele.id}><img src="./assets/images/edit.svg" ></button>
                                   <img class="del-article" id=${ele.id} src="./assets/images/trash.svg" >
                              </div>
                                   <button class="arrowlink" id=${ele.id}>
                                       <img src="./assets/images/arrow-right-white.svg" class="arrow">
                                   </button>
                           </div>
                         </div>
                    </div>` 
                     
                    const hashEle = document.querySelector(".article .hashtack")
                    let tagsLeng = ele.tags.length
                     for (let i = 0; i < tagsLeng; i++) {
                      hashEle.innerHTML +=`
                      <span>#${ele.tags[i]}</span>
                      `
                      if (i !== tags.length-1) {
                        hashEle.innerHTML += `
                        <span>,</span>
                        `
                      }
                    }

                    //delete button
                    // const article = document.querySelector(".article")
                    // let idArticle = article.getAttribute('id');
                    icons = document.querySelectorAll(".del-article");
                    icons.forEach(ele => {
                      let idArticle = ele.getAttribute('id')
                      ele.addEventListener('click', (event) => {
                       console.log(idArticle)
                       deletIcon.classList.add("show");
                       deletBtn.addEventListener('click', () => {
                        deleteArticle(idArticle);
                                     let child = event;
                                     child.target.parentNode.parentNode.parentNode.parentNode.remove();
                                     console.log(child.target.parentNode.parentNode.parentNode.parentNode)
                                     deletIcon.classList.remove("show");
                       })
                     })
                    })
                    cancelBtn.addEventListener('click', () => {
                      deletIcon.classList.remove("show");
                    })
                     
                    //go to article-details
                    const detailsBtns = document.querySelectorAll(".arrowlink")
                    detailsBtns.forEach(btn => {
                      btn.addEventListener('click', () => {
                           window.location.href = "./articledetils.html";
                           let idBtn = btn.getAttribute('id');
                           console.log(idBtn)
                           localStorage.setItem('articleId', idBtn)
                      })
                    })
               
                    //go to edit-article
                    const goEditArticle = document.querySelectorAll(".edit-link");
                    goEditArticle.forEach(editEle => {
                           editEle.addEventListener('click', () => {
                            window.location.href = "./editArticle.html";
                            let editArticleId = editEle.getAttribute('id');
                            localStorage.setItem('editArticleId', editArticleId)
                           })
                    })

                   }
          })

}

getArticles()

function deleteArticle(id) {
    let authToken = localStorage.getItem("token");
       console.log(authToken)
       fetch(`https://mountain.lavetro-agency.com/api/dashboard/articles/softDelete/${id}`, {
        method: 'GET',
        headers: {AUTHORIZATION: `Bearer ${authToken}` }
       })
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(error => console.log(error));
  }


  

