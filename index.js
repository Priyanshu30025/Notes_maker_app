const addBtn = document.querySelector("#addBtn")

const main = document.querySelector("#main")

//  firstly we form this so to call the note section when the user click on the add button option.
addBtn.addEventListener(
    "click",
    function() {
        addNote()
    }
)

// this is save note function which save the note we have written in the local memory
// so on refreshing the data are saved .
const saveNotes = () => {
    const notes = document.querySelectorAll(".note textarea");
    console.log(notes);
    const data = [];
    notes.forEach(
            (note) => {
                data.push(note.value)
            }
        )
        // console.log(data)
    if (data.length === 0) {
        localStorage.removeItem("notes")
    } else {
        localStorage.setItem("notes", JSON.stringify(data))
    }
}


//  <div class="note">
// <div class="tool">
//     <i class="fas fa-save"></i>
//     <i class="fas fa-trash"></i>
// </div>
// <textarea></textarea>
// </div>



// this is the add note function which basically make the note box which we will use to write information.
const addNote = (text = "") => {
    const note = document.createElement("div");
    note.classList.add("note")
    note.innerHTML = `
    <div class="tool">
         <i class="save fas fa-save"></i>
         <i class="trash fas fa-trash"></i> 
    </div>
    <textarea>${text}</textarea>
    `;


    // this is formed for the delete icon so that it can delete 
    // a particular note file permanently from the local storage.
    note.querySelector(".trash").addEventListener(
        "click",
        function() {
            note.remove()
            saveNotes()
        }
    )

    // this is for saving the note file we have created, it won't add new file
    //  but just save it in the local memory of the system.
    note.querySelector(".save").addEventListener(
        "click",
        function() {
            saveNotes()
        }
    )

    // this is an additional feature which is added so even if the user cick outside the note file
    // it get saved in the local storage.
    note.querySelector("textarea").addEventListener(
        "focusout",
        function() {
            saveNotes()
        }
    )
    main.appendChild(note);
    saveNotes()
}

// this is the function we have created so that we can get the saved data if any 
// from the local storage to current page which is refreshed
(
    function saver() {
        const lsNotes = JSON.parse(localStorage.getItem("notes"));
        if (lsNotes === null) {
            addNote()
        } else {
            lsNotes.forEach(
                (lsNote) => {
                    addNote(lsNote)
                }
            )
        }

    }
)

saver()