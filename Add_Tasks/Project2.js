var readlineSync = require('readline-sync');
class Task {
    static counter=0;
    id;
    description;
    dueDate; //Date object 
    priority;
    constructor(description,dueDate,priority){
        this.id=Task.counter;
        Task.counter++;
        this.description=description;
        this.dueDate=dueDate;
        this.priorityLevel=priority;
     
    }
    set priorityLevel(l) {// level [1 to 5] 
        
        if (l > 5)
            this.priority = 5;
        else if (l < 1)
            this.priority = 1;
        else this.priority = l;
    }
  
}

var tasks = [];
/* start */
while (true) {
    console.log(`***************************
Welcome to JS TODO-APP
***************************
Select an action:
1) Add a new task
2) List all tasks
3) List completed tasks
4) Mark the task as done
5) Delete a task
6) Sort tasks by the due date
7) Sort tasks by priority
8) Clear all tasks
***************************
`);
    // Wait for user's response.
    var choice = readlineSync.question('What is your choice ? ');
    switch (choice) {
        case "1":
            addTask();
            break;
        case "2":
            listTask(tasks);
            break;
        case "3":
            listCompletedTask();
            break;
        case "4":
            markAsDone();
            break;
        case "5":
            deleteTask();
            break;
        case "6":
            sortByDueDate();
            break;
        case "7":
            sortByPriority();
            break;
        case "8":
            clearAllTasks();
            break;
        default:
            console.log("Enter the correct value from 1 to 8");
            break;
    }
}
function addTask() {
    let description = readlineSync.question('Enter your task description ? ');
    let priority = Number(readlineSync.question('Enter your task Priority Level from 1 to 5 ? '));
    console.log("Enter your task due Date");
    let day = Number(readlineSync.question('Day: '));
    let month = Number(readlineSync.question('Month: '));//monthIndex from 0(jan) to 11(dec)
    month--;
    let year = Number(readlineSync.question('Year: '));
    let dueDate = new Date(year, month, day);;
    const t = new Task(description,dueDate,priority);
    Task.prototype.status="in Progress";
    tasks.push(t);  
}
function listTask(list) {
    list.forEach((item) => {
        console.log("-------------------------------------------");
        console.log("Task ID: " + item.id);
        console.log("Task Description: " + item.description);
        console.log("Task Priority: " + item.priority);
        console.log("Task Status: " + item.status);
        console.log("Task  Due date: " + item.dueDate);
        console.log("-------------------------------------------");
    }
    );
}
function markAsDone() {
    listTask(tasks);
    let i = readlineSync.question('Enter your task id ? ');
    tasks.forEach((item) => {
        if (item.id == i)
            item.status = "Completed";
    });
}
function deleteTask() {
    listTask(tasks);
    let i = readlineSync.question('Enter your task id ? ');
    tasks.forEach((item, index) => {
        if (item.id == i){
            tasks.splice(index, 1);
        
        }
         
    });

}
function listCompletedTask() {
    let list = tasks.filter((item) => item.status == "Completed");
    listTask(list);
}
function sortByDueDate() {
  tasks.sort(
        (objA, objB) => Number(objA.dueDate) - Number(objB.dueDate),
    );
    listTask(tasks);
}
function sortByPriority() {
    tasks.sort(
        (p1, p2) => p2.priority - p1.priority
    );
    listTask(tasks);
}
function clearAllTasks() {
    tasks.splice(0, tasks.length);
    Task.counter=0;//reset counter 
}


