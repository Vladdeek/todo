let divid = 2 // глобальная переменная divid = 1 для последующего создания <div class="task"> с новым уникальным id

function saveTask(event) {
	// Предотвращаем отправку формы
	event.preventDefault()

	// Получаем значения из инпутов
	const inputName = document.querySelector('.input-name-task').value
	const inputDescription = document.querySelector(
		'.input-description-task'
	).value

	// Проверяем, что оба поля заполнены
	if (inputName && inputDescription) {
		// Если оба поля заполнены, создаём задачу
		createNewTask(inputName, inputDescription)
		console.log('Задача создана:', inputName, inputDescription)
	} else {
		console.error('Введите название и описание задачи.')
	}

	// Закрываем модальное окно после создания задачи
	hideCreateModal()

	// Очищаем поля ввода для следующей задачи
	document.querySelector('.input-name-task').value = ''
	document.querySelector('.input-description-task').value = ''
}

// Привязываем обработчик события submit к форме
document.querySelector('.create-task').addEventListener('submit', saveTask)

function showCreateModal() {
	const modal = document.querySelector('.createTask-modal')
	modal.style.display = 'flex'
}
function hideCreateModal() {
	const modal = document.querySelector('.createTask-modal')
	modal.style.display = 'none'
}

// Функция для создания новой задачи
function createNewTask(name, description) {
	// Находим контейнер, где будут размещены задачи
	const container = document.querySelector('.container .row')

	// Создаём новый div для задачи
	const newTaskDiv = document.createElement('div')
	newTaskDiv.className = 'col-lg-4 col-md-6 col-xs-12'

	// Создаём div для контента задачи
	const newContentDiv = document.createElement('div')
	newContentDiv.className = 'content'

	// Создаём кнопку для удаления задачи
	const delButton = document.createElement('button')
	delButton.className = 'del-btn text-center'
	delButton.textContent = '+'
	delButton.onclick = () => alert('Удалить задачу') // Для примера
	newContentDiv.appendChild(delButton)

	// Создаём div для текста задачи
	const textDiv = document.createElement('div')
	textDiv.className = 'text'

	// Создаём название задачи
	const taskName = document.createElement('p')
	taskName.className = 'name-task'
	taskName.textContent = name

	// Создаём описание задачи
	const taskDescription = document.createElement('p')
	taskDescription.className = 'description-task'
	taskDescription.textContent = description

	// Добавляем название и описание в блок с текстом
	textDiv.appendChild(taskName)
	textDiv.appendChild(taskDescription)
	newContentDiv.appendChild(textDiv)

	// Создаём div для статуса (если нужно)
	const statusDiv = document.createElement('div')
	statusDiv.className = 'status'
	newContentDiv.appendChild(statusDiv)

	// Добавляем весь контент задачи в новый div
	newTaskDiv.appendChild(newContentDiv)

	// Находим кнопку "Добавить задание"
	const addTaskButton = container.querySelector('.col-lg-4 .new')

	// Проверяем, найден ли addTaskButton
	if (!addTaskButton) {
		console.error('Кнопка "Добавить задание" не найдена.')
		return
	}

	// Вставляем задачу перед кнопкой "Добавить задание"
	container.insertBefore(newTaskDiv, addTaskButton.parentElement)
}

// Функция для удаления всех элементов с заданным id
function delElementsWithId(id) {
	// Ищем все элементы с атрибутом id, равным переданному значению
	var elements = document.querySelectorAll('[id="' + id + '"]')

	// Перебираем найденные элементы
	elements.forEach(function (element) {
		// Удаляем текущий элемент из DOM
		element.remove()
	})
}

// Функция для управления удалением элементов при клике на кнопки с классом 'del'
function delTask() {
	// Получаем все элементы с классом 'del'
	var deleteButtons = document.getElementsByClassName('del')

	// Перебираем все найденные кнопки
	for (var i = 0; i < deleteButtons.length; i++) {
		// Добавляем обработчик события клика для текущей кнопки
		deleteButtons[i].addEventListener('click', function (event) {
			// Извлекаем id нажатой кнопки
			var buttonId = event.target.id

			// Выводим id нажатой кнопки в консоль (для отладки)
			console.log('Нажата кнопка с id:', buttonId)

			// Вызываем функцию для удаления элементов с заданным id
			delElementsWithId(buttonId)
		})
	}
}

// Функция для обновления счетчика символов
function updateCharacterCount(inputElement, counterElement, maxLength) {
	const currentLength = inputElement.value.length
	counterElement.textContent = `${currentLength}/${maxLength}`
}

// Получаем элементы
const nameInput = document.querySelector('.input-name-task')
const nameCounter = document.querySelector('.name-maxlengh')
const descriptionInput = document.querySelector('.input-description-task')
const descriptionCounter = document.querySelector('.description-maxlengh')

// Добавляем обработчики событий
nameInput.addEventListener('input', function () {
	updateCharacterCount(nameInput, nameCounter, 20)
})

descriptionInput.addEventListener('input', function () {
	updateCharacterCount(descriptionInput, descriptionCounter, 60)
})
