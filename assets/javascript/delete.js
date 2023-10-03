
const divDelet = document.querySelector(".div-popup-delet");
const deletA = document.querySelector(".div-popup-delet .popup-delet .delet-btns .delet");

// delet function-----------------
iconsd.map(ele => 
    {
        ele.addEventListener("click" , (event) => {
            divDelet.classList.add("show");
            deletA.addEventListener("click" , () => {
                let child = event;
                child.target.parentNode.parentNode.parentNode.remove();
                divDelet.classList.remove("show");
            })
        })
    } )

let topSection ;

window.addEventListener("scroll" , () => {
    topSection = window.scrollY;
    move();
})

const cancelDel = document.querySelector(".div-popup-delet .popup-delet .delet-btns .cancel");
cancelDel.addEventListener("click" , () => {
    console.log("cancel");
    divDelet.classList.remove("show");
})

function move() {
    divDelet.style.top = `${topSection}px`;
}








