let localDate = new Date()
let date_h1 = document.querySelector(".control_panel--date")



const test_todo = ["sdsf", "xycv", "poiu", "kuka"]
const test_todo2 = ["qwertzu", "sdsf", "xycv", "poiu", "kuka"]
let todo_list = ["sdsf", "xycv", "poiu", "kuka"]
let done_list = []





function creatToDoItem(item, itemNumber) {

    return `<div class="todo_item">
<div class="todo_item--front">
    <input type="checkbox" id="${itemNumber}_todo_item" onchange="itemDone(this.id);">
    <label for="${itemNumber}_todo_item">${item}</label>
</div>
<i class="fa-solid fa-trash-can" id="${itemNumber}_todo_trash" onclick="DeleteItem(this.id);"></i>
</div>`


}

function creatDoneItem(item, itemNumber) {

    return `<div class="done_item">
<input type="checkbox" id="${itemNumber}_done_item" disabled="disabled" checked="checked" >
<label for="${itemNumber}_done_item1">${item}</label>
</div>`

}

function createDoneList(items) {
    return items.map((item, index) => creatDoneItem(item, index)).join("")
}

function createToDoList(items) {
    return items.map((item, index) => creatToDoItem(item, index)).join("")
}

function updateTodo() {
    let pending_list = document.querySelector(".pending_list")
    let numOfPendingTasks = document.querySelector(".task_panel h2")

    numOfPendingTasks.innerHTML = `You have ${todo_list.length} pending items`

    pending_list.innerHTML = createToDoList(todo_list)


    /********animation*************************** */
    pending_list.style.transform = "scaleY(0)"

    let scale = 0
    let animId = null

    window.clearInterval(animId);
    animId = window.setInterval(list_animation, 10);

    function list_animation() {
        pending_list.style.transform = `scaleY(${scale})`
        if (scale >= 1)
            window.clearInterval(animId);
        scale += 0.05
    }
}

function updateDone() {
    let completed_list = document.querySelector(".completed_list")
    completed_list.innerHTML = createDoneList(done_list)


}



function addHandler() {
    let addTodoInput = document.querySelector(".control_panel--add input")
    let task_panel = document.querySelector(".task_panel")
    let nothing_state = document.querySelector(".nothing_state")
    if (addTodoInput.value) {
        task_panel.style.display = "block"
        nothing_state.style.display = "none"
        todo_list.unshift(addTodoInput.value)
        updateTodo()
        addTodoInput.value = ""
        updateLocalStorage()
    }

}

function DeleteItem(val) {
    todo_list.splice(parseInt(val), 1)
    updateTodo();
    if ((todo_list.length == 0) && (done_list.length == 0)) {
        clearAll()
        updateLocalStorage()
    }
    else
    {
    updateLocalStorage()
    }
}

function itemDone(val) {

    done_list.unshift(todo_list[parseInt(val)])
    todo_list.splice(parseInt(val), 1)
    updateTodo();
    updateDone()
    updateLocalStorage()


}

function showHide() {
    let doneCaption = document.querySelector(".completed_list--caption")
    let completed_list = document.querySelector(".completed_list")
    let showHideButton = document.querySelector(".show_clear button:nth-child(1)")
    if (doneCaption.style.display == "") {
        doneCaption.style.display = "block"
        completed_list.style.display = "block"
        showHideButton.innerHTML = "Hide Complete"
    }
    else {
        doneCaption.style.display = ""
        completed_list.style.display = ""
        showHideButton.innerHTML = "Show Complete"
    }

}

function clearAll() {

    let task_panel = document.querySelector(".task_panel")
    let nothing_state = document.querySelector(".nothing_state")

    todo_list.splice(0, todo_list.length)
    done_list.splice(0, done_list.length)
    updateTodo();
    updateDone()
    task_panel.style.display = "none"
    nothing_state.style.display = "block"
    updateLocalStorage()
}

function updateLocalStorage(){
let lists={
    todo_list:todo_list,
    done_list:done_list
}

    localStorage.setItem("lists", JSON.stringify(lists));
}


if (localStorage.getItem("lists") === null) {
    clearAll()
}
else {
    let lists = JSON.parse(localStorage.getItem("lists"))
    if ((lists.todo_list.length == 0) && (lists.done_list.length == 0)) {
        clearAll()
    }
    else {
        todo_list=lists.todo_list
        done_list=lists.done_list
        updateTodo();
        updateDone()
    }

}

date_h1.innerHTML = localDate.toLocaleString("hu-HU", { dateStyle: "long" })
let addButton = document.querySelector(".control_panel--add button")
addButton.addEventListener('click', addHandler)
document.querySelector(".show_clear button:nth-child(1)").addEventListener('click', showHide)
document.querySelector(".show_clear button:nth-child(2)").addEventListener('click', clearAll)


