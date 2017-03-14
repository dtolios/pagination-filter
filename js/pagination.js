// Pagination module for enabling pagination functionality a Student List page
let Pagination = ( () => {
	
	// PRIVATE PROPERTIES: //

	const $page = $('.page');
	const $students = $('.student-item.cf');
	const studentsPerPage = 10;
	let numStudents = 0;
	let numPages = 0;
	
	//  PRIVATE METHODS: //

	let getNumStudents = () => {
		return this.numStudents;
	};

	let setNumStudents = (x) => {
		this.numStudents = x;
	};
	
	let getNumPages = () => {
		return this.numPages;
	};

	let setNumPages = (x) => {
		this.numPages = Math.ceil( x );
	};

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
	let setButtonActive = ($target) => {
		// Set active button
		$('.pagination ul li').find('.active').removeClass('active');
		$target.addClass('active');
	};

	let setStudentActive = ($obj, start, end) => {
		$obj.removeClass('active');
		$obj.slice(start, end).addClass('active');
	};

	// EFFECTS: displays the elements based on class argument
	let showActiveStudents = ($active) => {
		$students.hide();
		$active.show();
	};

	// EFFECTS: event handler for page button clicks
	let buttonClick = (ev, $studentList) => {
		ev.preventDefault();
		$target = $(ev.target);
		if($target.attr('class') !== 'active') {
			setButtonActive($target);
			let pageNumber = parseInt($target.text());
			let end = parseInt($target.text()) * studentsPerPage;
			if(pageNumber === this.numPages) {
				end -= (studentsPerPage - this.numStudents % studentsPerPage);
			}
			
			let start = (pageNumber * studentsPerPage) - studentsPerPage;
			setStudentActive($studentList, start, end);
			let $active = $studentList.filter('.active');
			showActiveStudents($active);
		}
	};


	// PUBLIC METHODS //

	// EFFECTS: initializes pagination functionality
	let init = () => {
		// Add the container HTML for page buttons
		addPaginationContainer();
		// Add the appropriate buttons and listeners
		paginate($students);
	};

	// EFFECTS: initializes searched pagination functionality
	let paginate = ($studentList) => {
		setNumStudents($studentList.length);
		
		setNumPages( this.numStudents / studentsPerPage );

		// Set active students
		setStudentActive($studentList, 0, studentsPerPage);
		
		// Show initial active students
		showActiveStudents($studentList.filter('.active'));
		
		// Add pagination buttons
		for(let i = 1; i <= this.numPages; i++) {
			addPageButton(i);
		}

		// Set button 1 to active
		$('.pagination ul li:first-child a').addClass('active');

		// Add event listener
		$('.pagination ul').on('click', 'li', (event) => { buttonClick(event, $studentList); });
	};

	// EFFECTS: removes page buttons and hides all students
	let destroy = () => {
		$('.pagination ul li').remove();
		$students.removeClass('active');
	};

	// PUBLIC API: //
	return {
		init: init,
		paginate: paginate,
		destroy: destroy
	}

})();

// Enable pagination on the page
Pagination.init();
