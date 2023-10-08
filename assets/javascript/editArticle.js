const editCover = document.querySelector(".add-img");
const editDate = document.querySelector("#input-date")
const editTagsAr = document.querySelector(".tags-ar")
const editArticleBtn = document.querySelector(".add-a")
const addPhotos = document.querySelector('#input-photo')
const containerImg = document.querySelector(".container");
const containerAddImg = document.querySelector(".container .container-add");
const firstAddBtnImg = document.querySelector(".first-add-btn");

let editId = localStorage.getItem("editArticleId");
 
//ckEditors
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

//change input Img
const inputImage = document.getElementById("input-img");
const newImgEd = document.querySelector(".added-img");
const editBtnEd = document.querySelector('.edit')
let newInputImg;
let changeNewInputImg;

inputImage.onchange = function () {
  console.log("kkkk")
  newImgEd.src = "";
  newImgEd.src = URL.createObjectURL(inputImage.files[0]);
  changeNewInputImg = inputImage.files[0];
}
let articleInfo = []

let editCateory = document.querySelector('#category')

const editTitle = document.querySelector('.input-title')
const editTitleAr = document.querySelector(".arabic-title .input-title")

const editSubEn = document.querySelector('.subtitle-en')
const editSubAr = document.querySelector('.subtitle-ar')

const editTags = document.querySelector(".tags-en")

// const editVideoInput = document.querySelector(".video-link")

const datePublish = document.querySelector('#input-date')

const containerImages = document.querySelector(".container-add");

const editCategory = document.querySelector("#category")

getArticlesDetails()

let newCategory
let newImage;
let newtitleEn;
let newtitleAr;
let newsubTitleEn;
let newsubTitleAr;
let newDate;
let newVideo;
let addPhotoName

  //get article informatin 
  async function getArticlesDetails() {
    await fetch(`https://mountain.lavetro-agency.com/api/dashboard/articles/${editId}`)
    .then(res => res.json())
    .then(res => articleInfo = res.data)
    .catch(error => console.log(error))
     
     addPhotoName = articleInfo?.article_cover
     newImgEd.src = articleInfo?.article_cover;
     newImage = articleInfo?.article_cover;
     newInputImg = inputImage.vlaue;

     editTitle.value = articleInfo?.title.en;
     newtitleEn = articleInfo?.title.en;

     editTitleAr.value = articleInfo?.title.ar;
     newtitleAr = articleInfo?.title.ar;

     editSubEn.value = articleInfo?.sub_title.en;
     newsubTitleEn = articleInfo?.sub_title.en;

     editSubAr.value = articleInfo?.sub_title.ar;
     newsubTitleAr = articleInfo?.sub_title.ar;

     editCateory.value = articleInfo?.category

     datePublish.value = articleInfo?.date;
     newDate = articleInfo?.date;

     //articleInfo?.videos[0] !== "" ? newVideo = articleInfo?.videos[0].link : null;
    //  editVideoInput.value !== "" ?   editVideoInput.value = articleInfo?.videos[0].link : null

     newDescEn.setData(articleInfo?.content.en);
     newDescAr.setData(articleInfo?.content.ar);

     for (let i = 0; i < articleInfo?.images.length; i++) {

      if (articleInfo?.images[i]) {
          images.push(articleInfo?.images[i].path)
          let img = articleInfo?.images[i].path
          imagesGroup(img);
         
      } else {
          cancel.log("false")
      }
    }

  }

  let newImages = [];
  addPhotos.addEventListener("change", () => {
    images.length !== 0 ? newImages = images : null;
    //let img = URL.createObjectURL(addPhotos.files)
    //imagesGroup(img)
  })

  function imagesGroup(img) {
    const addedPhoto = document.createElement('div');
    addedPhoto.classList.add("added-photo");
    const trash = document.createElement('div');
    trash.classList.add("trash");
    const imgTrash = document.createElement('img');
    imgTrash.src = "./assets/images/bag.svg";
    imgTrash.classList.add('delet');
    trash.appendChild(imgTrash);

    const addedImage = document.createElement('img');
    addedImage.classList.add("photo")
    addedImage.src = img;
    addedPhoto.appendChild(addedImage);
    addedPhoto.appendChild(trash);
    containerAddImg.appendChild(addedPhoto);


    //delet image function--------------
    const deletImg = document.querySelectorAll(".added-photo .trash .delet");
    const elemnets = document.querySelectorAll(".added-photo");

    for (let i = 0; i < deletImg.length; i++) {
        deletImg[i].addEventListener("click", () => {
          containerAddImg.removeChild(elemnets[i]);
            images = images.slice(i + 1);
        })
    }
}

let changeCategory = ""
editCategory.addEventListener('change', () => {
  changeCategory = editCategory.options[editCategory.selectedIndex].text;
})


  let changenewtitleAr = "";
  editTitleAr.addEventListener("change", () => {
    changenewtitleAr = editTitleAr.value;
})

let changenewImage = ""
inputImage.addEventListener("change", () => {
    changenewImage = inputImage.files[0];
})

let changenewtitleEn = "";
editTitle.addEventListener("change", () => {
    changenewtitleEn = editTitle.value;
})

let changenewsubTitleEn = "";
editSubEn.addEventListener("change", () => {
    changenewsubTitleEn = editSubEn.value;
})

let changenewsubTitleAr = "";
editSubAr.addEventListener("change", () => {
    changenewsubTitleAr = editSubAr.value;
})

// let changenewVideo = "";
// editVideoInput.addEventListener("change", () => {
//     newVideo = editVideoInput.value;
// })

let changenewDate = "";
datePublish.addEventListener('change', () => {
    changenewDate = datePublish.value;
})


// get category value 
 let editCategoryVal
editCategory.addEventListener("change", () => {
    editCategoryVal = editCategory.options[editCategory.selectedIndex].text;
    console.log(editCategoryVal)
  })


const tagsArr = ['#AAA', '#BBB']


  // post request
 editArticleBtn.addEventListener('click', function(e) {
       e.preventDefault()

       let authToken = localStorage.getItem("token");
       console.log(authToken)

       let newDescEnEdited = newDescEn?.getData()
       let newDescArEdited = newDescAr?.getData()

       let formdata = new FormData();

       formdata.append("_method", 'PUT')

       changeNewInputImg !== "" ? formdata.append("article_cover", changeNewInputImg) : formdata.append("article_cover", newInputImg);
       //console.log('image is', changeNewInputImg)
       
       changeCategory !== "" ?  formdata.append('category', changeCategory) : formdata.append('category', editCateory.value)
    
       changenewtitleEn !== ""? formdata.append("title_en", changenewtitleEn) : formdata.append("title_en", editTitle.value) ;
       
       changenewtitleAr !== "" ? formdata.append("title_ar", changenewtitleAr) : formdata.append("title_ar", editTitleAr.value);
    
       changenewsubTitleEn !== "" ? formdata.append("sub_title_en", changenewsubTitleEn) : formdata.append("sub_title_en", editSubEn);
      
       changenewsubTitleAr !== "" ? formdata.append("sub_title_ar", changenewsubTitleAr) : formdata.append("sub_title_ar", editSubAr);
       
       changenewDate !== "" ? formdata.append("date", changenewDate) 
                            : formdata.append("date", newDate);
       
       formdata.append("content_en", newDescEnEdited);

       formdata.append("content_ar", newDescArEdited);
       formdata.append("_method", 'put');
       
      //  if (changenewVideo !== "") {
      //   formdata.append("videos[0]", changenewVideo);
      //  } else {
      //   formdata.append("videos[0]", editVideoInput.value);
      //  }
     
      if (newImages.length !== 0) {
          for (let i = 0; i < newImages.length; i++) {
           // console.log(images[i])
            formdata.append(`images[${i}]`, newImages[i]);
            console.log(newImages[i])
          }
      }  else {
      if (images.length !== 0) {
          for (let i = 0; i < images.length; i++) {
            formdata.append(`images[${i}]`, images[i]);
          }
      }
    }

       formdata.append('tags', tagsArr) 

       fetch(`https://mountain.lavetro-agency.com/api/dashboard/articles/${editId}`,{
        method: 'POST',
        headers: { 
          AUTHORIZATION: `Bearer ${authToken}`
       },
       body: formdata,
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(error => console.log(error))
 })
   