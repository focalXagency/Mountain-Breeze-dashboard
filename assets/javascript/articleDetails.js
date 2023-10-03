
const detailsContainer = document.querySelector('.article-detils')
const deletIconbox = document.querySelector(".div-popup-delet");
const delBtn = document.querySelector(".div-popup-delet .popup-delet .delet-btns .delet");
const canceDel = document.querySelector('.cancel')
let id = localStorage.getItem("articleId");
  console.log(id)

let detailsData = []
async function getArticlesDetails() {
  
  await fetch(`https://mountain.lavetro-agency.com/api/dashboard/articles/${id}`)
        .then(res => res.json())
        .then(res => detailsData = res.data )
        .catch(error => console.log(error))
        console.log(detailsData)

        detailsContainer.innerHTML += `
        <img src=${detailsData?.article_cover} class="cover-photo" />
        <div class="head">
           <h1>${detailsData.title.en}</h1>
           <div class="icons">
             <a href="./editArticle.html" ><img src="./assets/images/edit.svg" ></a>
             <img class="del-article" id=${detailsData.id} src="./assets/images/trash.svg" >
           </div>
        </div>
        <div class="date" >
            <span class="month">${detailsData.date}</span>
        </div>
        <p class="description" >${detailsData.content.en}</p>
        <div class="tagss" ></div>

        <div class="container" >
           <span>Photos</span>
           <div class="container-photo"  >
              <div class="container-add" ></div>
           </div>


        </div>
        `

        
            const tagsContainer = document.querySelector('.tagss')
            let tags = ['tags1', 'tags2']
            for (let i = 0; i < tags.length; i++) {
              tagsContainer.innerHTML +=`
              <span>#${tags[i]}</span>
              `
              if (i !== tags.length-1) {
                tagsContainer.innerHTML += `
                <span>,</span>
                `
              }
            }

            const imagesContainer = document.querySelector('.container-add');
                        let lengtharr = detailsData.images.length
                        for (let i = 0; i < lengtharr; i++) {
                          imagesContainer.innerHTML += `
                          <div class="added-photo" >
                            <img class="photo" src=${detailsData.images[i].path} >
                          </div>
                        `
                      }

            //delete article
            //const delEleId = detailsData.id
           // console.log(delEleId)
            const iconsDel = document.querySelector(".del-article");
            iconsDel.addEventListener('click', (event) => {
              deletIconbox.classList.add("show");
              delBtn.addEventListener('click', () => {
                deleteArticle(id)
                let child = event;
                child.target.parentNode.parentNode.parentNode.parentNode.remove();
                console.log(child.target.parentNode.parentNode.parentNode.parentNode)
                deletIconbox.classList.remove("show");
              })
              
            })

            canceDel.addEventListener('click', () => {
              deletIconbox.classList.remove("show");
            })

}

 getArticlesDetails()

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
