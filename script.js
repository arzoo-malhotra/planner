let tasks=JSON.parse(localStorage.getItem('tasks'))||[];
let shopping=JSON.parse(localStorage.getItem('shopping'))||[];
function saveData(){localStorage.setItem('tasks',JSON.stringify(tasks));localStorage.setItem('shopping',JSON.stringify(shopping));localStorage.setItem('notes',document.getElementById('notes').value);}
function addTask(){const t=document.getElementById('taskInput').value;const d=document.getElementById('taskDate').value;const p=document.getElementById('taskPriority').value;if(!t)return;tasks.push({title:t,deadline:d,priority:p,completed:false});document.getElementById('taskInput').value='';renderTasks();}
function renderTasks(){const list=document.getElementById('taskList');list.innerHTML='';tasks.forEach((task,i)=>{const li=document.createElement('li');li.innerHTML=`<span><input type="checkbox" ${task.completed?'checked':''} onchange="toggleTask(${i})"> ${task.title} (${task.priority})</span><button class="delete-btn" onclick="deleteTask(${i})">Delete</button>`;list.appendChild(li);});updateStats();saveData();}
function toggleTask(i){tasks[i].completed=!tasks[i].completed;renderTasks();}
function deleteTask(i){tasks.splice(i,1);renderTasks();}
function addShopping(){const x=document.getElementById('shoppingInput');if(!x.value)return;shopping.push(x.value);x.value='';renderShopping();}
function renderShopping(){const list=document.getElementById('shoppingList');list.innerHTML='';shopping.forEach((s,i)=>{const li=document.createElement('li');li.innerHTML=`<span>${s}</span><button class="delete-btn" onclick="deleteShopping(${i})">Delete</button>`;list.appendChild(li);});saveData();}
function deleteShopping(i){shopping.splice(i,1);renderShopping();}
function updateStats(){const c=tasks.filter(t=>t.completed).length;document.getElementById('totalTasks').innerText=tasks.length;document.getElementById('completedTasks').innerText=c;document.getElementById('pendingTasks').innerText=tasks.length-c;document.getElementById('completionRate').innerText=(tasks.length?Math.round(c/tasks.length*100):0)+'%';}
document.getElementById('todayDate').innerText=new Date().toDateString();
document.getElementById('notes').value=localStorage.getItem('notes')||'';
document.getElementById('notes').addEventListener('input',saveData);
renderTasks();renderShopping();