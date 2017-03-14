const page = document.querySelector(".page");
const studentList = document.querySelector(".student-list");
const numStudents = studentList.querySelectorAll("li").length;
const numPages = Math.ceil(numStudents / 10);

function createButton(text, active) {
	
	let button = document.createElement("li");
	let a = document.createElement("a");

	// Set anchor tag attributes and text
	if(active) {
		a.className = "active";
	}
	a.href = "#";
	a.innerText = text;

	// append the anchor tag to the list item and return
	button.appendChild(a);
	return button;
}

function createPaginationButtons() {
	
	let buttonList = document.createElement("ul");
	let button = createButton(1, true);
	
	for(let i = 1; i < numPages; i++) {
		buttonList.appendChild(button);
		button = createButton(i + 1, false);
	}
	buttonList.appendChild(button);

	let pagination = document.createElement("div");
	pagination.setAttribute("class", "pagination");
	pagination.appendChild(buttonList);
	
	page.appendChild(pagination);
}

createPaginationButtons();
