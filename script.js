const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const modal = document.getElementById("editModal");
const editInputBox = document.getElementById("edit-input-box");
let currentEditItem = null;

function addTask() {
    if (inputBox.value.trim() === '') {
        alert("Empty!!!!!");
    } else {
        let li = document.createElement('li');
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        
        let editIcon = document.createElement('span');
        editIcon.innerHTML = '&#9998;';  // Unicode for edit icon (pencil)
        editIcon.classList.add('edit-icon');
        li.appendChild(editIcon);
        
        let deleteIcon = document.createElement('span');
        deleteIcon.innerHTML = '\u00d7';  // Unicode for delete icon (cross)
        deleteIcon.classList.add('delete-icon');
        li.appendChild(deleteIcon);
    }
    inputBox.value = '';
    saveData();
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.classList.contains('delete-icon')) {
        e.target.parentElement.remove();
        saveData();
    } else if (e.target.classList.contains('edit-icon')) {
        currentEditItem = e.target.parentElement;
        editInputBox.value = currentEditItem.firstChild.textContent;
        modal.style.display = "block";
    }
}, false);

function saveEdit() {
    if (editInputBox.value.trim() !== '') {
        currentEditItem.firstChild.textContent = editInputBox.value;
        saveData();
        modal.style.display = "none";
    } else {
        alert("Empty!!!!!");
    }
}

function closeModal() {
    modal.style.display = "none";
}

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

showTask();
