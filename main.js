const addForm = document.querySelector(".popup-box");
const addIcon = document.querySelector(".icon");
const addBox = document.querySelector(".add-box");
const closeIcon = document.querySelector(".uil-times");
const addBtn = document.querySelector("button");
const titleTag = document.querySelector("input");
const descTag = document.querySelector("textarea");
const addBoxTitle = document.querySelector("header p");
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false;
let updatedId;
addIcon.addEventListener("click", () => {
  addForm.classList.add("show");
  addBtn.textContent = "Add a new Note";
  addBoxTitle.textContent = "Add Note";
  titleTag.value = "";
  descTag.value = "";
  titleTag.focus();
});
closeIcon.addEventListener("click", () => {
  addForm.classList.remove("show");
  titleTag.value = "";
  descTag.value = "";
});
function showNotes() {
  document.querySelectorAll(".note").forEach((note) => note.remove());
  notes.forEach((note, index) => {
    let noteDetails = `
    <li class="note">
      <div class="details">
        <p>${note.title ? note.title : "Add Title"}</p>
        <span>${note.desc}</span>
      </div>
      <div class="bottom-content">
        <span>${note.date}</span>
        <div class="settings">
          <i onclick=showmenu(this) class="uil uil-ellipsis-h">...</i>
          <ul class="menu">
            <li onclick=updateNote(${index})>
              <i class="uil uil-pen" ></i>Edit
            </li>
            <li  onclick=deleteNote(${index})>
              <i class="uil uil-trash"></i>Delete
            </li>
          </ul>
        </div>
      </div>
    </li>`;
    addBox.insertAdjacentHTML("afterend", noteDetails);
  });
}
showNotes();
addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let noteTitle = titleTag.value;
  let noteDesc = descTag.value;
  if (noteTitle || noteDesc) {
    const noteInfo = {
      title: noteTitle,
      desc: noteDesc,
      date: new Date().toLocaleDateString(),
      id: Math.random() * 10000000,
    };
    if (!isUpdate) {
      notes.push(noteInfo);
    } else {
      isUpdate = false;
      notes[updatedId] = noteInfo;
    }
    localStorage.setItem("notes", JSON.stringify(notes));
  }
  showNotes();
  closeIcon.click();
});
function showmenu(elem) {
  elem.parentElement.classList.add("show");
  document.addEventListener("click", (e) => {
    if ((e.target.tagName = !"i" || e.target != elem)) {
      elem.parentElement.classList.remove("show");
    }
  });
}
function deleteNote(noteId) {
  let doDelete = confirm("Sure you want to delete?");
  if (!doDelete) return;
  notes.splice(noteId, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
}
function updateNote(noteId) {
  isUpdate = true;
  updatedId = noteId;
  addIcon.click();
  addBtn.textContent = "Click To Update";
  addBoxTitle.textContent = "Update Note";
  const existing = notes.find((note, index) => index == noteId);
  console.log(existing);
  titleTag.value = existing.title;
  descTag.value = existing.desc;
}



