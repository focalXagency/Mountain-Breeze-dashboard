const editCover = document.querySelector(".add-img");
const editDate = document.querySelector("#input-date")
const editTitle = document.querySelector('.input-title')
const editTitleAr = document.querySelector(".arabic-title .input-title")
const editTags = document.querySelector(".tags-en")
const editTagsAr = document.querySelector(".tags-ar")
const editSubEn = document.querySelector('.subtitle-en')
const editSubAr = document.querySelector('.subtitle-ar')
const editArticleBtn = document.querySelector(".add-a")
const editCategory = document.querySelector("#category")
const editVideoInput = document.querySelector(".video-link")
const addImgs = document.querySelector('#input-photo')
let editId = localStorage.getItem("editArticleId");
 
console.log(editId)

  //get article informatin 
  let articleInfo = []

  async function getArticlesDetails() {
    await fetch(`https://mountain.lavetro-agency.com/api/dashboard/articles/${editId}`)
    .then(res => res.json())
    .then(res => articleInfo = res.data)
    .catch(error => console.log(error))
     console.log(articleInfo)
     
  }

getArticlesDetails()
let editCoverVal 
let editTitleVal;
let editTitleArVal;
let editSubEnVal
let editSubArVal
let editCategoryVal

//move video label
const editVideoLabel =document.querySelector(".link-label")
editVideoInput.onfocus = () => {
  editVideoLabel.classList.add("active-label");
 }
 editVideoInput.onblur = () => {
     if(editVideoInput.value === "")
     editVideoLabel.classList.remove("active-label");
  }

//get article-cover value
editCover.addEventListener("input", () => {
    if (editCover.files.length) {
        editCoverVal = editCover.files[0];
      console.log(editCoverVal)
    } 
 })

 //get title-en value
 editTitle.addEventListener('change', () => {
    editTitleVal = editTitle.value;
    console.log(editTitleVal)
 })

  //get title-ar value
 editTitleAr.addEventListener('change', () => {
    editTitleArVal = editTitleAr.value
    console.log(editTitleArVal)
 })

 //get subtitle-en value
 editSubEn.addEventListener("change", () => {
    editSubEnVal = editSubEn.value
    console.log(editSubEnVal)
 })

  //get subtitle-ar value
  editSubAr.addEventListener("change", () => {
    editSubArVal = editSubAr.value
    console.log(editSubArVal)
  })

  //get category value 
  editCategory.addEventListener("change", () => {
    editCategoryVal = editCategory.options[editCategory.selectedIndex].text;
    console.log(editCategoryVal)
  })

 let date = new Date();
 let currEditDate
document.querySelector('#input-date').value = date;
editDate.addEventListener('input', () => {
    let dateEdit = new Date(editDate.value);
    currEditDate = JSON.stringify(dateEdit)
    currEditDate = currEditDate.slice(1,11)
     console.log(currEditDate)
})

const tagsArr = ['#AAA', '#BBB']


  let newDescEn
  ClassicEditor
          .create( document.querySelector( '#desc' ) )
          .then( desc => newDescEn = desc )
          .catch( error => console.error( error ));

  let newDescAr;
 ClassicEditor
  .create( document.querySelector( '#ardesc' ) )
  .then( ardesc => newDescAr = ardesc )
  .catch( error => console.error( error ) );


  // post request
 editArticleBtn.addEventListener('click', function(e) {
       e.preventDefault()
       let authToken = localStorage.getItem("token");
       console.log(authToken)
       let newDescEnEdited = newDescEn.getData()
       let newDescArEdited = newDescAr.getData()
       const editFile = document.querySelector(".add-img").files[0]
       const editVideo =  document.querySelector(".video-link").value

       const formData = new FormData();
       formData.append('article_cover', editFile)
       formData.append('category', editCategoryVal)
       formData.append('title_en', editTitleVal)
       formData.append('title_ar', editTitleArVal)
       formData.append('content_en', newDescEnEdited)
       formData.append('content_ar', newDescArEdited)
       formData.append('date', currEditDate)
       formData.append('videos[0]', editVideo)
       formData.append('images[0]', addImgs.files[0])
       formData.append('tags', tagsArr)
       formData.append('sub_title_en', editSubEnVal)
       formData.append('sub_title_ar', editSubArVal)

       fetch(`https://mountain.lavetro-agency.com/api/dashboard/articles/${editId}`,{
        method: 'PUT',
        headers: { AUTHORIZATION: `Bearer ${authToken}` },
        body: formData,
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(error => console.log(error))
 })
   

