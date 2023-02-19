let numTasks = document.querySelector(".all-tasks"),
  numCompletedTasks = document.querySelector(".completed-tasks"),
  btnAddTask = document.querySelector(".addBtn"),
  addTask = document.querySelector(".addTask"),
  emptyMessage = document.querySelector(".empty-tasks"),
  tasksContainer = document.querySelector(".list-tasks"),
  tasks = Array.from(document.querySelectorAll(".task")),
  showAllTasks = document.querySelector(".allTask"),
  completed = document.querySelector(".complete"),
  notcompleted = document.querySelector(".notcomplete");


  
//   notcompleted.addEventListener('click', ()=>{
//     console.log('notcompleted clicked');
//   })

 

window.onload = () => {
  addTask.focus();
};

const calcNumTasks = () => {
  numTasks.textContent = tasksContainer.getElementsByClassName("task").length;
};

const calcFinishedTasks = () => {
  numCompletedTasks.textContent =
    tasksContainer.getElementsByClassName("finished").length;
};

const checkTasks = () => {
  if (tasksContainer.getElementsByClassName("task").length === 0) {
    let message = document.createElement("span");
    message.classList.add("empty-tasks");
    let text = document.createTextNode("No tasks yet.");
    message.appendChild(text);
    tasksContainer.appendChild(message);
    return;
  }
  document.querySelector(".empty-tasks").remove();
};

checkTasks();
calcNumTasks();
calcFinishedTasks();

btnAddTask.addEventListener("click", addTaskList)

function addTaskList () {
    let exict = 0;
    tasks.forEach((task) => {
      if (task.textContent === addTask.value) {
        let message = document.createElement("div");
        message.classList.add("pop-up-message");
        message.id = "message";
  
        let icon = document.createElement("i");
        icon.classList.add("far", "fa-times-circle", "iconNo");
  
        let p = document.createElement("p");
        p.classList.add("checkExict");
        let text = document.createTextNode("This task is already exist!!");
        p.appendChild(text);
  
        let overlay = document.createElement("div");
        overlay.classList.add("overlay");
        overlay.id = "overlay";
  
        message.appendChild(icon);
        message.appendChild(p);
  
        document.body.appendChild(message);
        document.body.appendChild(overlay);
        let show = setTimeout(() => {
          message.remove();
          overlay.remove();
        }, 2000);
        exict = 1;
      }
  });
    if (exict === 1 || addTask.value === "") {
      return addTask.value = "";
    }
  
    let task = document.createElement("div");
    task.classList.add("task");
  
    let p = document.createElement("p");
    let text = document.createTextNode(addTask.value);
    p.classList.add("detail");
    p.appendChild(text);
  
    let actions = document.createElement("div");
    actions.classList.add("actions");
  
    let deleteBtn = document.createElement("i");
    deleteBtn.classList.add("fas", "fa-trash-alt", "deleteBtn");
  
    let finishBtn = document.createElement("i");
    finishBtn.classList.add("fas", "fa-check", "finishBtn");
  
    actions.appendChild(finishBtn);
    actions.appendChild(deleteBtn);
  
    task.appendChild(p);
    task.appendChild(actions);
    tasksContainer.appendChild(task);


    // if (task.classList.contains("finished")) {
    //     completed.addEventListener('click', ()=>{
    //         console.log('completed clicked');
    //         let finishedTaskParent = task.classList.contains("finished")
    //             tasksContainer.appendChild(finishedTaskParent);
            
    //     });
    // }
    // else{
    //     showAllTasks.addEventListener('click', ()=>{
    //         console.log('all clicked');
    //     tasksContainer.appendChild(task);
    
    //       })
    // }
    
    
    
    checkTasks();
    calcNumTasks();
  
    tasks = Array.from(document.querySelectorAll(".task"));
    addTask.value = "";
    
  };
document.addEventListener("click", (event) => {
  if (
    event.target.className === "task" ||
    event.target.className === "detail"
  ) {
    let message = document.createElement("div");
    message.classList.add("pop-up-message");
    message.id = "message";

    let actions = document.createElement("div");
    actions.classList.add("actions");

    let edit = document.createElement("i");
    edit.classList.add("fas", "fa-pencil-alt", "edit");

    let deleteBtn = document.createElement("i");
    deleteBtn.classList.add("fas", "fa-trash-alt", "delete");

    let save = document.createElement("i");
    save.classList.add("fas", "fa-check", "save");
    actions.appendChild(edit);
    actions.appendChild(deleteBtn);
    actions.appendChild(save);

    let p = document.createElement("p");
    let text = document.createTextNode(event.target.textContent);
    p.appendChild(text);

    let overlay = document.createElement("div");
    overlay.classList.add("overlay");
    overlay.id = "overlay";

    message.appendChild(actions);
    message.appendChild(p);
    document.body.appendChild(message);
    document.body.appendChild(overlay);
    
  }
  
});

document.addEventListener("click", (event) => {
  if (event.target.id === "overlay" && event.target.id !== "task") {
    message.remove();
    overlay.remove();
  }
});

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("deleteBtn")) {
    let parent = event.target.parentNode;
    parent.parentNode.remove();
    checkTasks();
  } else if (event.target.classList.contains("finishBtn")) {
    let parent = event.target.parentNode;
    parent.parentNode.classList.add("finished");
    event.target.classList.replace("fa-check", "fa-history");
    event.target.classList.replace("finishBtn", "not-finishBtn");
  } else if (event.target.classList.contains("not-finishBtn")) {
    let parent = event.target.parentNode;
    parent.parentNode.classList.remove("finished");
    event.target.classList.replace("fa-history", "fa-check");
    event.target.classList.replace("not-finishBtn", "finishBtn");
  }
  calcNumTasks();
  calcFinishedTasks();
});
