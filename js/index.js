const form = document.querySelector("form");
const taskList = document.querySelector("#task-list");
let tasks = [];
let counter = 0;
let editingTaskId = null;

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    li.innerHTML = `
      <div class="task-container">
        <div class="task-info">
          <span>${task.text}</span>
          <span class="due-date">${task.dueDate}</span>
          <span class="completion-status">${task.completionStatus}</span>
        </div>
        <div class="task-actions">
          <button class="edit-task">Edit</button>
          <button class="delete-task">Delete</button>
        </div>
      </div>
    `;
    taskList.appendChild(li);
  });
}

function addTask(e) {
  e.preventDefault();
  const input = document.querySelector("#new-task");
  const text = input.value.trim();
  if (text) {
    const id = ++counter;
    const dueDate = document.querySelector("#due-date").value;
    const completionStatus = document.querySelector("#completion-status").value;
    tasks.push({ id, text, dueDate, completionStatus });
    input.value = "";
    document.querySelector("#due-date").value = "";
    document.querySelector("#completion-status").value = "";
    renderTasks();
  }
}

function deleteTask(e) {
  if (e.target.classList.contains("delete-task")) {
    const li = e.target.closest("li");
    const id = parseInt(li.getAttribute("data-id"));
    tasks = tasks.filter((task) => task.id !== id);
    renderTasks();
  }
}

function editTask(e) {
  if (e.target.classList.contains("edit-task")) {
    const li = e.target.closest("li");
    const id = parseInt(li.getAttribute("data-id"));
    const taskInfo = li.querySelector(".task-info");
    const taskText = taskInfo.querySelector("span");
    const taskDueDate = taskInfo.querySelector(".due-date");
    const taskCompletionStatus = taskInfo.querySelector(".completion-status");

    // Set the values of the input fields to the current task info
    const editForm = document.querySelector("#edit-form");
    editForm.querySelector("#edit-task").value = taskText.textContent;
    editForm.querySelector("#edit-due-date").value = taskDueDate.textContent;
    editForm.querySelector("#edit-completion-status").value =
      taskCompletionStatus.textContent.toLowerCase();

    // Show the edit form and hide the task list
    taskList.style.display = "none";
    editForm.classList.add("active");

    // Save the id of the task being edited so we can update it later
    editingTaskId = id;
  }
}

const editForm = document.querySelector("#edit-form");
const cancelButton = document.querySelector("#cancel-edit");

function saveEditedTask(e) {
  e.preventDefault();
  const newText = editForm.querySelector("#edit-task").value.trim();
  const newDueDate = editForm.querySelector("#edit-due-date").value;
  const newCompletionStatus = editForm.querySelector("#edit-completion-status").value;
  const editedTask = {
    id: editingTaskId,
    text: newText,
dueDate: newDueDate,
completionStatus: newCompletionStatus,
};

// Replace the old task with the edited task in the array of tasks
tasks = tasks.map((task) => {
if (task.id === editingTaskId) {
return editedTask;
}
return task;
});

// Clear the editingTaskId so we know we're not editing anymore
editingTaskId = null;

// Hide the edit form and show the task list again
editForm.classList.remove("active");
taskList.style.display = "block";

// Re-render the tasks to update the list with the edited task
renderTasks();
}

function cancelEdit() {
// Clear the editingTaskId so we know we're not editing anymore
editingTaskId = null;

// Hide the edit form and show the task list again
editForm.classList.remove("active");
taskList.style.display = "block";
}

form.addEventListener("submit", addTask);
taskList.addEventListener("click", deleteTask);
taskList.addEventListener("click", editTask);
editForm.addEventListener("submit", saveEditedTask);
cancelButton.addEventListener("click", cancelEdit);

renderTasks()