const inputImage = document.querySelector("#input-img");
const inputTitle = document.querySelector("#input-title");
const inputTitleAr = document.querySelector(".arabic-title .input-title");
const tagsArticle = document.querySelector('#tags')
const multiplePhoto = document.querySelector("#input-photo");
const addArticle = document.querySelector(".add-a");
const addBtn = document.querySelector(".add-a");
const categorySelect = document.querySelector("#category");
const subtitleEn = document.querySelector(".subtitle-en");
const subtitleAr = document.querySelector(".subtitle-ar");
const contentEn = document.querySelector("#desc");
const videoInput = document.querySelector(".video-link");
const inputDate = document.querySelector("#input-date");
//console.log(contentEn)

//get article-cover value
const newAddedImage = document.querySelector(".added-img");
const editImage = document.querySelector(".edit");

inputImage.onchange = function () {
  newAddedImage.src =  URL.createObjectURL(inputImage.files[0]);
  newAddedImage.style.display = 'block'
  editImage.classList.add('show')
}

let inputImageVal;
inputImage.addEventListener("input", () => {
  if (inputImage.files.length) {
    inputImageVal = inputImage.files[0];
    console.log(inputImageVal) 
  }
});

//get title-en value
let inputTitleVal;
inputTitle.addEventListener("change", () => {
  inputTitleVal = inputTitle.value;
  console.log(inputTitleVal);
});

//get title-ar value
let inputTitleArVal;
inputTitleAr.addEventListener("change", () => {
  inputTitleArVal = inputTitleAr.value;
  console.log(inputTitleArVal);
});

//get subtitle-en value
let subtitleEnVal;
subtitleEn.addEventListener("change", () => {
  subtitleEnVal = subtitleEn.value;
  console.log(subtitleEnVal);
});

//get subtitle-ar value
let subtitleArVal;
subtitleAr.addEventListener("change", () => {
  subtitleArVal = subtitleAr.value;
  console.log(subtitleArVal);
});

//get category select value
let selectVal;
categorySelect.addEventListener("change", (event) => {
  selectVal = event.target.value;
  console.log(selectVal);
});


//get Date value
let date = new Date();
let currdate;
document.querySelector("#input-date").value = date;
inputDate.addEventListener("input", () => {
  let dateArticle = new Date(inputDate.value);
  currdate = JSON.stringify(dateArticle);
  currdate = currdate.slice(1, 11);
  console.log(currdate);
});

//move video label
const videoLabel = document.querySelector(".link-label");
videoInput.onfocus = () => {
  videoLabel.classList.add("active-label");
};
videoInput.onblur = () => {
  if (videoInput.value === "") videoLabel.classList.remove("active-label");
};

//get video link value
let videoVal;
videoInput.addEventListener("change", () => {
  videoVal = videoInput.value;
  console.log(videoVal);
});

//get photos group value
let filelist = [];
multiplePhoto.addEventListener("change", function (event) {
  filelist = multiplePhoto.files;
  /*   for(let i= 0; i < multiplePhoto.files.length; i++) {
        filelist.push(multiplePhoto.files[i])
    } */
  console.log(filelist);
});

 console.log(tagsArticle.value)


let descDataEn;
ClassicEditor.create(document.querySelector("#desc"))
  .then((desc) => (descDataEn = desc))
  .catch((error) => console.error(error));

let descDataAr;
ClassicEditor.create(document.querySelector("#ardesc"))
  .then((ardesc) => (descDataAr = ardesc))
  .catch((error) => console.error(error));

addBtn.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("post req");

  let authToken = localStorage.getItem("token");
  console.log(authToken);

  /*  let newdescDataEn = descDataEn.getData() */
  /*  let newdescDataAr = descDataAr.getData() */
  /*    const userFile = document.querySelector('#input-img').files[0] */
  const multiFiles = document.querySelector("#input-photo").files;
  let videoLink = document.querySelector(".video-link").value;

  const formData = new FormData();

  formData.append("article_cover", inputImageVal);
  formData.append("category", selectVal);
  formData.append("title_en", inputTitleVal);
  formData.append("title_ar", inputTitleArVal);
  formData.append("content_en", descDataEn.getData());
  formData.append("content_ar", descDataAr.getData());
  formData.append("date", currdate);
  formData.append("videos[0]", videoLink);
  Object.values(multiplePhoto.files).forEach((item, index) => {
    formData.append(`images[${index}]`, item);
  });
  formData.append("tags[0]", tagsArticle.value);
  formData.append("sub_title_en", subtitleEnVal);
  formData.append("sub_title_ar", subtitleArVal);

    fetch('https://mountain.lavetro-agency.com/api/dashboard/articles',{
        method: 'POST',
        headers: { AUTHORIZATION: `Bearer ${authToken}` },
        body: formData,
    })
    .then((res) => res.json())
    .then((result) => console.log(result))
    .catch((error) => console.log(error));
});
