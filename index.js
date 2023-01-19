//variables for time to change color from hour to hour 
let dayElem = $("#currentDay");
let now = moment();
let today = now.format("LL");

dayElem.text(now.format("dddd, D MMM YYYY"));

let currentHour = Number(now.format("H"));

/*
    Example html output:
    <div class="row" data-id="21">
      <div class="col-2 time-block hour">9pm</div>
      <textarea placeholder="Add events here" class="col-8 time-slot calendar-item" rows="2" cols="50"></textarea>
      <button class="col-2 saveBtn">Confirm</button>
    </div>
*/

// add row item to page
function addRow(id, text) {
    const row = $("<div>").addClass("row").data("id", id).append(
        // time-block
        $("<div>").addClass("col-2 time-block hour").text(text),
        // time slot
        $("<textarea>")
            .addClass("col-8 time-slot calendar-item")
            .attr("placeholder", "Add events here")
            .attr("row", "2")
            .attr("cols", "50"),
        // confirm
        $("<button>").addClass("col-2 saveBtn").text("Confirm")
    );
    // add new row to container
    $(".container").append(row);
}

// loop 9am - 5pm adding row for each time
for (let i = 9; i <= 17; i++) {
    const date = moment().set({ hour: i, minute: 0 }).format('h A');
    addRow(i, date);
}

//this is to set css style for past present & future time blocks
$(".row").each(function () {
    const row = $(this);
    const id = row.data("id");

    const value = localStorage.getItem(`${today}-${id}`);
    row.find("textarea")[0].value = value

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

// this saves is a click event which saves the input of the textarea and saves the day the id and the input to local storage 
$("button.saveBtn").on("click", function (event) {
    const button = $(this);
    const row = button.closest(".row");
    const id = row.data("id");

    let textInput = row.find("textarea")[0].value
    localStorage.setItem(`${today}-${id}`, textInput);
});
