const taskInput = document.querySelector(".task-input input");
let filter = document.querySelectorAll(".filter span");
clearAll =  document.querySelector(".clear-btn");
let taskbox = document.querySelector(".task-box");

let editId;
let isEditerTask = false;

filter.forEach(btn =>{
    btn.addEventListener("click"  , ()=>{
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showtodo(btn.id);
    });
}) ;

//getting the local Storage todo-list
let todos = JSON.parse(localStorage.getItem("todo-list"));
function showtodo(filter) {
    let li = "";
    if (todos) {
        todos.forEach((todos, id) => {
            // if the status is completed then set the isCompleted value to checked
            let isCompleted = todos.status == "completed" ? "checked" : "";
            if(filter == todos.status || filter == "all" ){
            li += `<li class="task">
                        <label for="${id}">
                        <input onclick="update(this)" type="checkbox" id="${id}" ${isCompleted}>
                       <p class="${isCompleted}">${todos.name}</p>
                    </label>
                    <div class="settings">
                     <i  onclick="showmanu(this)" class="uil uil-ellipsis-h"></i>
                        <ul class="task-manu">
                            <li onclick="editTask(${id},'${todos.name}')" ><i class="uil uil-pen"></i>Edit</li>
                            <li onclick="deleteTask(${id})" ><i class="uil uil-trash"></i>Delete</li>
                        </ul>
                    </div>
                </li>`;
            }  
        })
    }
    // if li is not  empty , inserting the span value
    taskbox.innerHTML = li || `<span> You don't have any task   </span>`;
}
showtodo('all');

function showmanu(selectedTask) {
    //getting task manu 
    let taskmanu = selectedTask.parentElement.lastElementChild;
    taskmanu.classList.add("show");
    // removing the show class on the manu bar on the document click
    document.addEventListener("click", e => {
        if (e.target.tagName != "I" || e.target != selectedTask) {
            taskmanu.classList.remove("show");
        }
    })
}

//Editing the task 
function editTask(taskId ,taskName) {
    editId = taskId;
    isEditerTask= true;
    taskInput.value=taskName
}



//deleting the task
function deleteTask(deleteId) {
    //    removing Selecter task from the array
    todos.splice(deleteId, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showtodo('all');
}
clearAll.addEventListener("click",()=>{
    todos.splice(0, todos.length);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showtodo('all');
})


function update(selectedTask) {
    let taskName = selectedTask.parentElement.lastElementChild;
    if (selectedTask.checked) {
        taskName.classList.add("checked");
        //updating the status to completed
        todos[selectedTask.id].status = "completed";
    } else {
        taskName.classList.remove("checked");
        //updating the status to pending
        todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos));
}



taskInput.addEventListener("keyup", e => {
    let userTask = taskInput.value.trim();
    if (e.key == "Enter" && userTask) {
        if (!isEditerTask) {
            if (!todos) {//if todos is not exist , passing an empty array to todos
                todos = [];
            }
            let taskInfo = { name: userTask, status: "pending" };
            todos.push(taskInfo); // add the new task to the todo's
        }else{
            isEditerTask = false;
            todos[editId].name=userTask;
        }

        


        taskInput.value = "";
        localStorage.setItem("todo-list", JSON.stringify(todos));
      
        showtodo('all');
    }
});