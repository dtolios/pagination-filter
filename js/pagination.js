// Pagination module for enabling pagination functionality a Student List page
let Pagination = ( () => {
	
	// PRIVATE PROPERTIES: //

	const $page = $('.page');
	let studentsPerPage = 10;
	let numStudents = $('.student-list').children().length;
	let numPages = Math.ceil( numStudents / studentsPerPage );
	
	//  PRIVATE METHODS: //

	// EFFECTS: adds required html container for pagination buttons
	let addPaginationContainer = () => {
		$paginationContainer = $('<div class="pagination"><ul></ul></div>');
		$page.append($paginationContainer);
	};

	// EFFECTS: adds a page button to the pagination container
	let addPageButton = (number) => {
		$button = $('<li><a href="#">' + number + '</a></li>');
		$('.pagination ul').append($button);
	};

	// EFFECTS: sets the target class to "active"
	let setActive = ($target) => {
		// Set active button
		$('.pagination ul li').find('.active').removeClass('active');
		$target.addClass('active');
	};

	// EFFECTS: displays the elements between "start" and "end"
	let showContent = (start, end) => {
		// Show correct range of students
		$('.student-item').hide();
		$('.student-item').slice(start, end).show();
	}; 

	// EFFECTS: event handler for page button clicks
	let buttonClick = (ev) => {
		ev.preventDefault();
		$target = $(ev.target);
		setActive($target);
		let end = parseInt($target.text()) * 10;
		let start = end - 10;
		showContent(start, end);
	};


	// PUBLIC METHODS //

	// EFFECTS: initializes pagination functionality
	let init = () => {
		// Show initial students
		$('.student-item:gt(' + (studentsPerPage - 1) + ')').hide();

		addPaginationContainer();

		// Add pagination buttons
		for(let i = 1; i <= numPages; i++) {
			addPageButton(i);
		}

		// Set button 1 to active
		$('.pagination ul li:first-child a').addClass('active');

		// Add event listener
		$('.pagination ul').on('click', 'li', buttonClick);
	};

	// EFFECTS: removes pagination html and functionality
	let destroy = () => {
		$('.pagination').remove();
	};

	// PUBLIC API: //
	return {
		init: init,
		destroy: destroy
	}

})();
