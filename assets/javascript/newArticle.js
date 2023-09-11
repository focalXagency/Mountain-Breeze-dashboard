const addImage = document.querySelector('#input-img');
const title = document.querySelector('#input-title');
//const selectedDate = document.querySelector('#input-date');
const tag = document.querySelector('#tags');
const desc = document.querySelector('#desc');
const photo = document.querySelector('#input-photo');
const addArticle = document.querySelector('.add-a');
const newArticleForm = document.querySelector('.new-article-form');

let json_addImage;
let json_title;
let dateArticle;
let  json_desc;

addImage.addEventListener("input", () => {
   if (addImage.files.length) {
    let json_addImage = addImage.files[0].name;
     console.log(addImage.files[0])
   } else {
    console.log('Please add an image')
   }
})

title.addEventListener('input', () => {
    json_title = title.value;
    // console.log(title.value)
})



let date = new Date();
document.querySelector('#input-date').value = date;
inputDate.addEventListener('input', () => {
     dateArticle = new Date(inputDate.value);
    console.log(dateArticle);
})

let files = [];
photo.addEventListener("change", () => {
    files.push(photo.files[0])
    console.log(files)
//    const selectedFiles = [...photo.files];
//    console.log(selectedFiles)
 })


// photo.addEventListener("input", () => {
//     if (photo.files.length) {
//      let json_photos = photo.files[0].name;
//      console.log(photo.files)
//     } else {
//      console.log('Please add an image')
//     }
//  })


//console.log('descData', descData)

