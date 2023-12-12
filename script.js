function addTask() {
  const inputbox = document.getElementById("inputbox");
  const list = document.getElementById("list");

  const text = inputbox.value;

  if (text) {
      // Create a new list item
      const listElement = document.createElement("li");

      // Set the inner text of the list item to the input value
      listElement.innerText = text;

      // Append the list item to the unordered list
      list.appendChild(listElement);

      // Add a delete button to the list item
      addDeleteButton(listElement);

      // Save the tasks to local storage
      saveTasksToLocalStorage();

      // Clear the input box
      inputbox.value = "";
  } else {
      alert("You must write something");
  }
}

function addDeleteButton(listElement) {
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";

  // Apply Tailwind CSS classes for styling and positioning
  deleteButton.setAttribute(
      "class",
      "bg-red-600 text-white px-4 rounded-lg  cursor-pointer ml-10"
  );

  deleteButton.addEventListener("click", function () {
      // Remove the list item when the delete button is clicked
      listElement.remove();

      // Save the tasks to local storage after deletion
      saveTasksToLocalStorage();
  });

  // Create a container with flex styling
  const flexContainer = document.createElement("div");
  flexContainer.setAttribute("class", "flex items-center");

  // Append the list item text to the flex container
  const taskText = document.createTextNode(listElement.innerText);
  flexContainer.appendChild(taskText);

  // Append the delete button to the flex container
  flexContainer.appendChild(deleteButton);

  // Clear the content of the list item
  listElement.innerHTML = '';

  // Append the flex container to the list item
  listElement.appendChild(flexContainer);
}

// Function to save tasks to local storage
function saveTasksToLocalStorage() {
  const list = document.getElementById("list");
  const tasks = Array.from(list.children).map((task) => task.innerText);

  // Store the tasks in local storage as a JSON string
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from local storage when the page loads
function loadTasksFromLocalStorage() {
  const list = document.getElementById("list");

  // Retrieve tasks from local storage
  const storedTasks = localStorage.getItem("tasks");

  if (storedTasks) {
      // Parse the JSON string and create list items
      const tasks = JSON.parse(storedTasks);
      tasks.forEach((taskText) => {
          const listElement = document.createElement("li");
          listElement.innerText = taskText;

          // Add a delete button to the list item
          addDeleteButton(listElement);

          list.appendChild(listElement);
      });
  }
}

// Load tasks from local storage when the page loads
document.addEventListener("DOMContentLoaded", loadTasksFromLocalStorage);
