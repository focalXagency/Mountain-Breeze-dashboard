// give the calender the input date
flatpickr("#myDatePicker", {
    dateFormat: "Y-m-d",
    inline: true
    // Add more custom options here
});
const dateField = document.querySelector("#myDatePicker")
const emptyDateValue = document.querySelector(".empty-input-icon")
const calendarPop = document.querySelector(".flatpickr-calendar")
document.querySelector(".flatpickr-monthDropdown-months").disabled = true
// console.log(calendarPop)
document.querySelector(".flatpickr-next-month").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
<path d="M3.88384 4.14062L3.05664 4.96782L5.74357 7.66063L3.05664 10.3534L3.88384 11.1806L7.40384 7.66063L3.88384 4.14062Z" fill="#FFFDFD"/>
<path d="M7.74907 4.14062L6.92188 4.96782L9.60881 7.66063L6.92188 10.3534L7.74907 11.1806L11.2691 7.66063L7.74907 4.14062Z" fill="#FFFDFD"/>
</svg>`
document.querySelector(".flatpickr-prev-month").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
<path d="M11.1181 11.1816L11.9453 10.3544L9.25838 7.66164L11.9453 4.96884L11.1181 4.14164L7.59811 7.66164L11.1181 11.1816Z" fill="#FFFDFD"/>
<path d="M7.25288 11.1816L8.08008 10.3544L5.39314 7.66164L8.08008 4.96884L7.25288 4.14164L3.73288 7.66164L7.25288 11.1816Z" fill="#FFFDFD"/>
</svg>`
window.onload = ()=> {
    dateField.click()
    setTimeout(() => {
        // calendarPop.classList.add("d-inline-block")
    }, 200);
}
emptyDateValue.onclick = ()=> {
    dateField.value = "";
}
// JavaScript code to handle calendar display


// Function to toggle the calendar visibility
function toggleCalendar() {
    if (calendar.style.display === 'block') {
        calendar.style.display = 'none';
    } else {
        calendar.style.display = 'block';
    }
}

// Attach event listeners
dateInput.addEventListener('click', toggleCalendar);
calendar.addEventListener('click', (event) => {
    // Handle calendar date selection here
    const selectedDate = event.target.textContent;
    dateInput.value = selectedDate;
    toggleCalendar();
});

// Populate the calendar with dummy data (you can replace this with actual date data)
const dummyDates = [
    '2023-08-01',
    '2023-08-02',
    // Add more dates here...
];

dummyDates.forEach((date) => {
    const dateCell = document.createElement('div');
    dateCell.textContent = new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
    calendar.appendChild(dateCell);
});
// Close the calendar when you click anywhere outside of it
document.addEventListener('click', () => {
    calendar.classList.add('hidden');
});

// make the current date the defult value for the input
const inputDate = document.getElementById("input-date");
inputDate.valueAsDate= new Date();
const clear = document.querySelector(".close");
clear.addEventListener("click" , () => {
    inputDate.valueAsDate=null;
})

inputDate.addEventListener('change' , () => {
    currentDate.innerText = `${months[inputDate.valueAsDate.getMonth()]} ${inputDate.valueAsDate.getFullYear()}`;
    prevnextIcon.forEach(icon => {
        icon.addEventListener("click" , () => {
            currentMonth = icon.id === "prev" ? currentMonth - 1 : currentMonth + 1;
            renderCalender();
        })
    })
    
})





