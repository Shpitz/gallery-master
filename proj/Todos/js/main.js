'use strict';

var gTodos;
// var gNextId = 0;
var gTodosFilter = 'All';
var gTodosSort = 'Date Created';

var TODOS_KEY = 'todosApp';
var TODOS_NEXT_ID = 'todoId';


function init() {
    console.log('Todo App');
    gTodos = createTodos();
    renderCounts();
    renderTodos();
}

function todoClicked(elTodo, todoId) {
    gTodos.forEach(function (todo) {
        if (todo.id === todoId) todo.isDone = !todo.isDone;
    });
    // gTodos[todoIdx].isDone = !gTodos[todoIdx].isDone;
    elTodo.classList.toggle('done');
    renderTodos();
    renderCounts();
    saveToStorage(TODOS_KEY, gTodos);
}

function deleteTodo(ev, todoId) {
    ev.stopPropagation();
    console.log('Deleting Todo', todoId);
    gTodos.forEach(function (todo, idx) {
        if (todo.id === todoId) gTodos.splice(idx, 1);
    });

    renderTodos();
    renderCounts();
    saveToStorage(TODOS_KEY, gTodos);
}
function addTodo() {
    // console.log('Add Todo');

    var todoTxt = prompt('What do you want todo?..');
    if (!todoTxt) {
        alert('You must enter text in order to create to do');
        return;
    }

    var todoPriority = Math.floor(+prompt(`Please enter importancy (1 will be most important and 3 will be less important).
                                while no value entered, deafault will be 2`));
    if (!todoPriority) todoPriority = 2;
    else if (todoPriority < 1 || todoPriority > 3) {
        while (todoPriority < 1 || todoPriority > 3) {
            alert('Importancy must be a value between 1 and 3');
            todoPriority = Math.floor(+prompt(`Please enter importancy (1 will be most important and 3 will be less important).
            while no value entered, deafault will be 2`));
            // alert('Priority must be a value between 1 and 3');
        }
    }

    var newTodo = createTodo(todoTxt, todoPriority);
    gTodos.unshift(newTodo);
    renderCounts();

    document.querySelector('.status-filter').value = 'All';
    gTodosFilter = 'All';
    // document.querySelector('.sort-by').value = 'Date Created';
    // gTodosSort = 'Date Created';
    renderTodos();

    saveToStorage(TODOS_KEY, gTodos);

}


function setFilter(strFilter) {
    gTodosFilter = strFilter;
    console.log(gTodos);

    saveToStorage(TODOS_KEY, gTodos);
    renderTodos();
}

function setSort(strSort) {
    gTodosSort = strSort;
    console.log(gTodos);
    saveToStorage(TODOS_KEY, gTodos);
    renderTodos();
}



/*
 <li class="todo" onclick="todoClicked(this)">
    Todo 1
    <div class="btns">
        <button class="btn btn-danger" onclick="deleteTodo(event, 0)">x</button>
    </div>
</li>

*/


function renderTodos() {
    var strHTML = ''
    
    var todos = getTodosForDisplay();
    sortTodos(todos);
    if (todos.length > 0) {
        
        
        todos.forEach(function (todo, idx) {
            var className = (todo.isDone) ? 'done' : '';
            var btnsStr = '';
            if (gTodosFilter !== 'All') {
                var btnsStr = '';
            } else if (idx === 0) {
                btnsStr =
                `<button class="btn btn-down" onclick="swapTodo(event, ${todo.id}, ${idx}, ${idx + 1})">⬇</button>`;
            } else if (idx === gTodos.length - 1) {
                btnsStr =
                `<button class="btn btn-up" onclick="swapTodo(event, ${todo.id}, ${idx}, ${idx - 1})">⬆</button>`;
            } else {
                btnsStr =
                `<button class="btn btn-down" onclick="swapTodo(event, ${todo.id}, ${idx}, ${idx + 1})">⬇</button>
                <button class="btn btn-up" onclick="swapTodo(event, ${todo.id}, ${idx}, ${idx - 1})">⬆</button>`
            }
            strHTML +=
            `
            <li class="todo ${className}" onclick="todoClicked(this, ${todo.id})">
            ${todo.txt}
            <div class="btns">
            ${btnsStr}
            <button class="btn btn-danger" onclick="deleteTodo(event, ${todo.id})">x</button>
            </div>  
            </li>
            `
        })
        
    } else {
        if (gTodosFilter !== 'All') {
            strHTML += `<li class="todo">No ${gTodosFilter} Todos to display</li>`;
        } else {
            strHTML += `<li class="todo">No Todos to display</li>`;
        };
    };
    document.querySelector('.todos').innerHTML = strHTML;
    // sortTodos(todos);
}


function createTodos() {
    var nextId = loadFromStorage(TODOS_NEXT_ID);
    if (!nextId) nextId = 0;
    saveToStorage(TODOS_NEXT_ID, nextId);

    var todos = loadFromStorage(TODOS_KEY); 
    if (todos) return todos;

    todos = [];

    todos.push(createTodo('Learn Javascript', 2))
    todos.push(createTodo('Play with HTML5', 3))
    todos.push(createTodo('Master CSS', 1))

    saveToStorage(TODOS_KEY, todos);
    return todos;
}

function createTodo(txt, importance) {
    var nextId = +loadFromStorage(TODOS_NEXT_ID);
    nextId++;
    saveToStorage(TODOS_NEXT_ID, nextId);
    
    return {
        id: nextId,
        txt: txt,
        isDone: false,
        createdAt: Date.now(),
        importance: importance,
    }
    
}

function renderCounts() {

    var activeCount = 0;
    gTodos.forEach(function (todo) {
        if (!todo.isDone) activeCount++;
    })

    document.querySelector('.total-count').innerText = gTodos.length;
    document.querySelector('.active-count').innerText = activeCount;
}

function swapTodo(ev, id, currIdx, nextIdx) {
    ev.stopPropagation();
    if (gTodosFilter !== 'All') return;
    if (nextIdx < 0 || nextIdx >= gTodos.length) return;
    var b = gTodos[currIdx];
    gTodos[currIdx] = gTodos[nextIdx];
    gTodos[nextIdx] = b;

    renderTodos();
    console.log(gTodos);
}


function getTodosForDisplay() {
    var todos = [];
    gTodos.forEach(function (todo) {
        if (gTodosFilter === 'All' ||
            (gTodosFilter === 'Active' && !todo.isDone) ||
            (gTodosFilter === 'Done' && todo.isDone)) {
            todos.push(todo);
        }
    });
    return todos;
}

function sortTodos(todos) {
    if (gTodosSort === 'Date Created') todos.sort(function (a, b) { return a.createdAt - b.createdAt });
    if (gTodosSort === 'Text') {
        todos.sort(function (a, b) {
            var x = a.txt.toLowerCase();
            var y = b.txt.toLowerCase();
            if (x < y) { return -1; }
            if (x > y) { return 1; }
            return 0;
        });
    };

    if (gTodosSort === 'Importancy') todos.sort(function (a, b) { return a.importance - b.importance });
    // renderTodos();
}