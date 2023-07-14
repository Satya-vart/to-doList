// Array to store the todo items
let todoList = [
	{ taskDetails: 'do homework', id: 1 },
	{ taskDetails: 'sleep', id: 2 },
];
let taskIdCounter = 3;

// Function to add a new task to the array
function addTask(task) {
	const newTask = {
		id: taskIdCounter++,
		taskDetails: task,
	};
	todoList.push(newTask);
}

// Function to remove a task from the array based on its ID
function removeTask(id) {
	todoList = todoList.filter((task) => task.id !== id);
}

// Function to render the task list in the UI
function renderList() {
	const listContainer = document.getElementById('task-list');
	listContainer.innerHTML = '';

	todoList.forEach((task) => {
		const listItem = document.createElement('li');
		listItem.classList.add('task-item');

		const taskText = document.createElement('span');
		taskText.classList.add('task-text');
		taskText.innerText = task.taskDetails;

		const deleteIcon = document.createElement('i');
		deleteIcon.classList.add('delete-icon', 'fas', 'fa-trash-alt');
		deleteIcon.addEventListener('click', () => {
			removeTask(task.id);
			renderList();
		});

		listItem.appendChild(taskText);
		listItem.appendChild(deleteIcon);
		listContainer.appendChild(listItem);
	});
}

// Function to handle the save button click event
function handleSave() {
	const taskInput = document.getElementById('task-input');
	const task = taskInput.value.trim();

	if (task !== '') {
		addTask(task);
		taskInput.value = '';
		renderList();
	}
}

// Function to handle key press events
function handleKeyPress(event) {
	if (event.key === 'Enter') {
		handleSave();
	}
}

// Event listener for the save button
const saveButton = document.getElementById('save-button');
saveButton.addEventListener('click', handleSave);

// Event listener for key press events on the task input field
const taskInput = document.getElementById('task-input');
taskInput.addEventListener('keypress', handleKeyPress);

// Initial rendering of the task list
renderList();
