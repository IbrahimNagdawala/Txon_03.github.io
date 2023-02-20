let numTasks = document.querySelector(".all-tasks"),
  numCompletedTasks = document.querySelector(".completed-tasks"),
  btnAddTask = document.querySelector(".addBtn"),
  //input value
  addTask = document.querySelector(".addTask"),
  emptyMessage = document.querySelector(".empty-tasks"),
  body = document.getElementsByTagName('body'),
  tasksContainer = document.querySelector(".list-tasks"),
  tasks = Array.from(document.querySelectorAll(".task")),
  showAllTasks = document.querySelector(".allTask"),
  completed = document.querySelector(".complete"),
  notcompleted = document.querySelector(".notcomplete"),
  details = Array.from(document.getElementsByClassName('detail'));


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

  
  
    
    return ;
  }
    
};
showNotes();

calcFinishedTasks();
btnAddTask.addEventListener("click", (e)=>{
  let notes = localStorage.getItem("notes");
  if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
    if (addTask.value.length!=0 && addTask.value!=e.innerText ) {
      let myObj = {
        Text: addTask.value
      };
     
      notesObj.push(myObj)

    }
  details = Array.from(document.getElementsByClassName('detail'));
  details.forEach((e)=>{
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
      } else {
        notesObj = JSON.parse(notes);
      }
      
      if (addTask.value.length!=0 && addTask.value!=e.innerText ) {
        let myObj = {
          Text: addTask.value
        };
       
        notesObj.push(myObj)

      }
      else if (addTask.value.length===0) {
        let message = document.createElement("div");
      message.classList.add("pop-up-message");
      message.id = "message";

      let icon = document.createElement("i");
      icon.classList.add("far", "fa-times-circle", "iconNo");

      let p = document.createElement("p");
      p.classList.add("checkExict");
      let text = document.createTextNode("Please Enter something");
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
      }

    if (addTask.value ===e.innerText) {
      let message = document.createElement("div");
      message.classList.add("pop-up-message");
      message.id = "message";

      let icon = document.createElement("i");
      icon.classList.add("far", "fa-times-circle", "iconNo");

      let p = document.createElement("p");
      p.classList.add("checkExict");
      let text = document.createTextNode("This task is already exist!! Please delete if task added");
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
    }
   
  })
  localStorage.setItem("notes", JSON.stringify(notesObj));  
  addTask.value = "";
  showNotes();
})


function showNotes () {
  

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
      } else {
        notesObj = JSON.parse(notes);
      }
      
    let html ="";


    notesObj.forEach(function (element, index){
      
      
      let exict = 0;
      if (element.Text===addTask.value) {
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
      
      if (exict === 1 || element.Text === "") {
        return element.Text = "";
      }
      html+= `<div class="task"><p class="detail">${element.Text}</p><div class="actions"><i id="${index}a" class="fas fa-check finishBtn" ></i><i id="${index}" class="fas fa-trash-alt deleteBtn" onclick = "deleteNote(this.id)"></i></div></div>`
      
     
    });
 
 
     
     if (notesObj.length != 0) {
      
     tasksContainer.innerHTML = html;
   } 
   
   else {
    tasksContainer.innerHTML = `  <span class="empty-tasks">No Tasks Yet</span>`;
   }

    
    calcNumTasks();
    
};

function deleteNote(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
  
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));

    let notesfinished = localStorage.getItem("notesfinished");
    if (notesfinished == null) {
      notesObj1 = [];
    } else {
      notesObj1 = JSON.parse(notesfinished);
    }
    
      notesObj1.splice(index , 1)
      localStorage.setItem("notesfinished", JSON.stringify(notesObj1));

    showNotes();
  }



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
    // actions.appendChild(edit);
    // actions.appendChild(deleteBtn);
    // actions.appendChild(save);

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
    if (event.target.classList.contains("finishBtn")) {
    let parent = event.target.parentNode;
    parent.parentNode.classList.add("finished");
    event.target.remove();
    // event.target.classList.replace("fa-check", "fa-history");
    // event.target.classList.replace("finishBtn", "not-finishBtn");

    let notesfinished = localStorage.getItem("notesfinished");
    if (notesfinished == null) {
      notesObj1 = [];
    } else {
      notesObj1 = JSON.parse(notesfinished);
    }
    let myObj1 = {
        Text: parent.parentNode.textContent
      };
      notesObj1.push(myObj1)
      localStorage.setItem("notesfinished", JSON.stringify(notesObj1));

  } 
  else if (event.target.classList.contains("not-finishBtn")) {
    let parent = event.target.parentNode;
    parent.parentNode.classList.remove("finished");
    event.target.classList.replace("fa-history", "fa-check");
    event.target.classList.replace("not-finishBtn", "finishBtn");

    let notesfinished = localStorage.getItem("notesfinished");
    if (notesfinished == null) {
      notesObj1 = [];
    } else {
      notesObj1 = JSON.parse(notesfinished);
    }
  }
  calcNumTasks();
  calcFinishedTasks();
});
