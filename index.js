//variables for time to change color from hour to hour 
let dayElem = $("#currentDay");
let now = moment();
let today = now.format("LL");

dayElem.text(now.format("dddd, D MMM YYYY"));

let currentHour = Number(now.format("H"));

// this is to set css style for past present & future time blocks  
$(".row").each(function () {
    const row = $(this);
    const id = row.data("id");



    let hour = Number(id);
    const timeSlot = $(row.find(".time-slot")[0]);

    if (hour === currentHour) {
        timeSlot.addClass("present");
    } else if (hour < currentHour) {
        timeSlot.addClass("past");
    } else if (hour > currentHour) {
        timeSlot.addClass("future");
    }
});

