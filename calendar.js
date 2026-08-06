/* ===========================================================
   NebulaOS X
   calendar.js
   Month Calendar + local notes
=========================================================== */


const CALENDAR_STORAGE_KEY = "nebulaos-calendar-notes";

let calendarCursor = new Date();
calendarCursor.setDate(1);
calendarCursor.setHours(0, 0, 0, 0);

let selectedDateKey = dateKey(new Date());


function dateKey(date){

    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, "0");
    let day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;

}


function parseDateKey(key){

    let [year, month, day] = key.split("-").map(Number);
    return new Date(year, month - 1, day);

}


function loadCalendarNotes(){

    try{

        let raw = localStorage.getItem(CALENDAR_STORAGE_KEY);
        return raw ? JSON.parse(raw) : {};

    } catch(error){

        return {};

    }

}


function saveCalendarNotes(notes){

    localStorage.setItem(
        CALENDAR_STORAGE_KEY,
        JSON.stringify(notes)
    );

}


function monthLabel(date){

    return date.toLocaleDateString([], {
        month: "long",
        year: "numeric"
    });

}


function formatSelectedLabel(key){

    return parseDateKey(key).toLocaleDateString([], {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
    });

}


function shiftCalendarMonth(delta){

    calendarCursor.setMonth(calendarCursor.getMonth() + delta);
    renderCalendar();

}


function goToToday(){

    let today = new Date();
    calendarCursor = new Date(today.getFullYear(), today.getMonth(), 1);
    selectedDateKey = dateKey(today);
    renderCalendar();
    loadSelectedDayNote();

}


function selectCalendarDay(key){

    selectedDateKey = key;
    renderCalendar();
    loadSelectedDayNote();

}


function loadSelectedDayNote(){

    let notes = loadCalendarNotes();
    let label = document.getElementById("calendarSelectedLabel");
    let input = document.getElementById("calendarNoteInput");
    let status = document.getElementById("calendarNoteStatus");

    if(label)
    label.textContent = formatSelectedLabel(selectedDateKey);

    if(input)
    input.value = notes[selectedDateKey] || "";

    if(status)
    status.textContent = notes[selectedDateKey]
        ? "Note saved for this day."
        : "No note yet for this day.";

}


function saveSelectedDayNote(){

    let input = document.getElementById("calendarNoteInput");
    let status = document.getElementById("calendarNoteStatus");

    if(!input)
    return;

    let notes = loadCalendarNotes();
    let value = input.value.trim();

    if(value)
    notes[selectedDateKey] = value;
    else
    delete notes[selectedDateKey];

    saveCalendarNotes(notes);
    renderCalendar();

    if(status){
        status.textContent = value
            ? "Note saved."
            : "Note cleared.";
    }

}


function clearSelectedDayNote(){

    let input = document.getElementById("calendarNoteInput");
    let notes = loadCalendarNotes();

    delete notes[selectedDateKey];
    saveCalendarNotes(notes);

    if(input)
    input.value = "";

    renderCalendar();
    loadSelectedDayNote();

}


function renderCalendar(){

    let title = document.getElementById("calendarMonthLabel");
    let grid = document.getElementById("calendarGrid");

    if(!title || !grid)
    return;

    title.textContent = monthLabel(calendarCursor);
    grid.innerHTML = "";

    ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].forEach(day => {

        let cell = document.createElement("div");
        cell.className = "calendar-weekday";
        cell.textContent = day;
        grid.appendChild(cell);

    });

    let year = calendarCursor.getFullYear();
    let month = calendarCursor.getMonth();
    let firstDay = new Date(year, month, 1).getDay();
    let daysInMonth = new Date(year, month + 1, 0).getDate();
    let todayKey = dateKey(new Date());
    let notes = loadCalendarNotes();

    for(let i = 0; i < firstDay; i++){

        let empty = document.createElement("div");
        empty.className = "calendar-day empty";
        grid.appendChild(empty);

    }

    for(let day = 1; day <= daysInMonth; day++){

        let key = dateKey(new Date(year, month, day));
        let button = document.createElement("button");
        button.type = "button";
        button.className = "calendar-day";
        button.textContent = String(day);

        if(key === todayKey)
        button.classList.add("today");

        if(key === selectedDateKey)
        button.classList.add("selected");

        if(notes[key])
        button.classList.add("has-note");

        button.onclick = () => selectCalendarDay(key);
        grid.appendChild(button);

    }

}


window.addEventListener("load", () => {

    renderCalendar();
    loadSelectedDayNote();

});
