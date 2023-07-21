//Local Storage
let todooos = JSON.parse(localStorage.getItem('todos')) || [];
let categories = new Set();
todooos.forEach((item) => {
	categories.add(item.category);
});
const priority = ['low', 'medium', 'high'];
const statuss = ['completed', 'pending'];
todoList = [...todooos];

// Function to add a new task to the array
function addTask(task) {
	const newTask = {
		id: todoList.length ? todoList[todoList.length - 1].id + 1 : 1,
		description: task.description,
		status: false,
		category: task.category,
		priority: task.priority,
	};
	todoList.push(newTask);
	todooos.push(newTask);
	categories.add(newTask.category);
	localStorage.setItem('todos', JSON.stringify(todoList));
}

// Function to remove a task from the array based on its ID
function removeTask(id) {
	todoList = todoList.filter((task) => task.id !== id);
	localStorage.setItem('todos', JSON.stringify(todoList));
}
function renderFilters() {
	//filter Categories
	const filters = document.getElementById('filters');
	filters.innerHTML = '';
	const selectCategory = document.createElement('select');
	selectCategory.classList.add('selectFilter');
	selectCategory.id = 'selectCategory';
	const optionC = document.createElement('option');
	optionC.innerText = 'Category';
	optionC.value = null;
	selectCategory.appendChild(optionC);

	categories.forEach((category) => {
		const option = document.createElement('option');
		option.value = category;
		option.innerText = category;
		selectCategory.appendChild(option);
	});
	filters.appendChild(selectCategory);
	//Filter Priority
	const selectPriority = document.createElement('select');
	selectPriority.classList.add('selectFilter');
	selectPriority.id = 'selectPriority';
	const optionP = document.createElement('option');
	optionP.innerText = 'Priority';
	optionP.value = null;
	selectPriority.appendChild(optionP);
	priority.forEach((prior) => {
		const option = document.createElement('option');
		option.value = prior;
		option.innerText = prior;
		selectPriority.appendChild(option);
	});
	filters.appendChild(selectPriority);
	//Filter Status
	const selectStatus = document.createElement('select');
	selectStatus.classList.add('selectFilter');
	selectStatus.id = 'selectStatus';
	const optionS = document.createElement('option');
	optionS.innerText = 'Status';
	optionS.value = null;
	selectStatus.appendChild(optionS);
	statuss.forEach((status) => {
		const option = document.createElement('option');
		option.value = status;
		option.innerText = status;
		selectStatus.appendChild(option);
	});
	filters.appendChild(selectStatus);
}

// Function to render the task list in the UI
function renderList() {
	const listContainer = document.getElementById('task-list');
	listContainer.innerHTML = '';
	//Event Listener for Status
	const selectStatus = document.getElementById('selectStatus');
	selectStatus.addEventListener('change', () => {
		if (selectStatus.value === 'null') {
			todoList = [...todooos];
		} else if (selectStatus.value == 'completed') {
			todoList = todooos.filter((task) => task.status === true);
		} else if (selectStatus.value == 'pending') {
			todoList = todooos.filter((task) => task.status === false);
		}
		renderList();
	});
	//Event Listener for Priority

	const selectPriority = document.getElementById('selectPriority');
	selectPriority.addEventListener('change', () => {
		if (selectPriority.value === 'null') {
			todoList = [...todooos];
		} else {
			todoList = todooos.filter((task) => task.priority === selectPriority.value);
		}
		renderList();
	});
	//Event Listener for Category

	const selectCategory = document.getElementById('selectCategory');
	selectCategory.addEventListener('change', () => {
		if (selectCategory.value === 'null') {
			todoList = [...todooos];
		} else {
			todoList = todooos.filter((task) => task.category === selectCategory.value);
		}
		renderList();
	});

	todoList.forEach((task) => {
		const listItem = document.createElement('li');
		listItem.classList.add('task-item');

		const checkbox = document.createElement('input');
		checkbox.classList.add('task-status');
		checkbox.type = 'checkbox';
		checkbox.checked = task.status;
		checkbox.addEventListener('change', () => {
			task.status = checkbox.checked;
			localStorage.setItem('todos', JSON.stringify(todoList));
		});

		const taskText = document.createElement('span');
		taskText.classList.add('task-text');
		taskText.innerText = task.description;
		taskText.addEventListener('click', () => {
			const taskEdit = document.createElement('input');
			taskEdit.classList.add('task-edit');
			taskEdit.type = 'text';
			taskEdit.value = task.description;
			taskEdit.addEventListener('blur', () => {
				task.description = taskEdit.value;
				taskText.innerHTML = taskEdit.value;
				localStorage.setItem('todos', JSON.stringify(todoList));
				taskEdit.remove();
			});
			listItem.appendChild(taskEdit);
			taskEdit.focus();
		});

		const deleteIcon = document.createElement('i');
		deleteIcon.classList.add('delete-icon', 'fas', 'fa-trash-alt');
		deleteIcon.addEventListener('click', () => {
			removeTask(task.id);
			renderList();
		});

		listItem.appendChild(checkbox);
		listItem.appendChild(taskText);
		listItem.appendChild(deleteIcon);
		listContainer.appendChild(listItem);
	});
}

// Function to handle the save button click event
function handleSave() {
	const taskInput = document.getElementById('task-input');
	const categoryInput = document.getElementById('category-input');
	const priorityInput = document.getElementById('priority-input');
	const task = {
		description: taskInput.value.trim(),
		category: categoryInput.value.trim(),
		priority: priorityInput.value.trim(),
	};

	if (task !== '') {
		addTask(task);
		taskInput.value = '';
		categoryInput.value = '';
		priorityInput.value = 'low';
		renderFilters();
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
renderFilters();
renderList();
