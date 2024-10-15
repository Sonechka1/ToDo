const form = document.querySelector('#form');
const taskInput  = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

let tasks = [];

//получение задач из localstorage

if(localStorage.getItem('tasks')){
    
   tasks = JSON.parse(localStorage.getItem('tasks'));
}

//Отображение задач из массива

tasks.forEach(function(task){
    renederTask(task);
})

checkEmptyList();

//Добавление задачи

form.addEventListener('submit' , addTask);

function addTask(event){
        event.preventDefault();
        const taskText = taskInput.value;

        //Описали объект задачи
        const newTask ={
            id: Date.now(),
            text: taskText,
            done: false
        }

        //Добавление задачи в массив tasks
        tasks.push(newTask);

        renederTask(newTask);

    //очищение поля ввода и добавление фокуса на него
    taskInput.value = '';
    taskInput.focus();
       
    checkEmptyList();
    saveToLocalSrorage();    
}

//удаление задачи 
tasksList.addEventListener('click' , deleteTask);

function deleteTask(event){
    if(event.target.dataset.action !=='delete'){
        return 
    } 

    const parentNode = event.target.closest('li');

    //определение id задачи
    const id = parentNode.id;

    //находим индекс задвчи в массиве
    const index=  tasks.findIndex(function(task){
        if(task.id == id){
            return true;
        }
    })
    //удаляем задачу из массива с задачами
    tasks.splice(index, 1);

    //удаление задачи из разметки
    parentNode.remove();
    
    checkEmptyList();
    saveToLocalSrorage();
}

//Отметить выполненные задачи 
tasksList.addEventListener('click' , doneTask);

function doneTask(event){
    if(event.target.dataset.action ==='done'){
        const parentNode = event.target.closest('li');

        //определяем id задачи
        const id = parentNode.id;

        //поиск задачи в массиве
       const task = tasks.find(function(task){
            if(task.id == id){
                return true
            }
        })
        //изменение статуса  задачи в массиве
        task.done = !task.done;
       

        const taskTitle = parentNode.querySelector('.task-title');
        taskTitle.classList.toggle('task-title--done');
    }
    saveToLocalSrorage();
}

//Скрыть и показать пустой список задач emptyList
function checkEmptyList(){
    if(tasks.length === 0){
        const emptyListHtml = `<li id="emptyList" class="list-group-item empty-list">
                                    <img src="./img/cat-sleeping_17092312.gif" alt="https://ru.freepik.com/search#uuid=38d0da23-7225-4722-b166-b490469f2def Источник иконки: Freepik" width="88" class="mt-3">
                                    <div class="empty-list__title">Список дел пуст</div>
                                </li>`
        tasksList.insertAdjacentHTML('afterbegin', emptyListHtml);
    }

    if(tasks.length > 0){
        const emptyListEl = document.querySelector('#emptyList');
        emptyListEl ? emptyListEl.remove(): null;
    }

}

//сохранение задач в localstorage

function saveToLocalSrorage(){
    localStorage.setItem('tasks' , JSON.stringify(tasks));
}


function renederTask(task){
    const cssClass = task.done ? "task-title task-title--done" : "task-title";
        

    const taskHtml = `
    <li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
                    <span class="${cssClass}">${task.text}</span>
                    <div class="task-item__buttons">
                        <button type="button" data-action="done" class="btn-action">
                            <img src="./img/tick.svg" alt="Done" width="18" height="18">
                        </button>
                        <button type="button" data-action="delete" class="btn-action">
                            <img src="./img/cross.svg" alt="Done" width="18" height="18">
                        </button>
                    </div>
                </li>`;
   tasksList.insertAdjacentHTML("beforeend",taskHtml )
}
