// getting all required elements here

const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

inputBox.onkeyup = () => {
    let userData = inputBox.value;   // getting user input values
    if(userData.trim() != 0){   //if user values are not present only spaces
        addBtn.classList.add("active");    //active the add button
    }else{
        addBtn.classList.remove("active");    //remove the add button
    }
}

showTasks(); // caliing showtasks function
// if the user clicks on the button
addBtn.onclick = () =>{
    let userData = inputBox.value;   // getting user input values
    let getLocalStorage = localStorage.getItem("New Todo"); //getting localstorage
    if(getLocalStorage == null){//if localstorage is null
        listArr = []; //creating blank array
    }else{
        listArr = JSON.parse(getLocalStorage);//transforming json string into a js object
    }
    listArr.push(userData); //adding user data
    localStorage.setItem("New Todo",JSON.stringify(listArr)); //transforming a js object into json string
    showTasks(); // caliing showtasks function
    addBtn.classList.remove("active");    //remove the add button
}

//function for showing tasks
function showTasks(){
    let getLocalStorage = localStorage.getItem("New Todo"); //getting localstorage
    if(getLocalStorage == null){//if localstorage is null
        listArr = []; //creating blank array
    }else{
        listArr = JSON.parse(getLocalStorage);//transforming json string into a js object
    }
    const pendingNumb = document.querySelector(".pendingNumb");
    pendingNumb.textContent = listArr.length; //passing the length value
    if(listArr.length>0){
        deleteAllBtn.classList.add("active");
    }else{
        deleteAllBtn.classList.remove("active");
    }
    let newLiTag = "";
    listArr.forEach((element,index) => {
        newLiTag += `<li>${element}<span onclick="deleteTask(${index})";><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag; // adding new li tag inside ul tag
    inputBox.value = ""; // once task added in the list leave the input field empty
}

// function for deleting task
function deleteTask(index) {
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index,1);//delete particular indexed li
    //after remove the li again update the localstorage
    localStorage.setItem("New Todo",JSON.stringify(listArr)); 
    showTasks();
}

// delete all tasks btn
deleteAllBtn.onclick = () =>{
    listArr = [];
    //after remove all tasks again update the localstorage
    localStorage.setItem("New Todo",JSON.stringify(listArr)); 
    showTasks();
}


