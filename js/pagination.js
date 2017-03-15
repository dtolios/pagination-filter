// Pagination module for enabling pagination functionality a Student List page
let Pagination = ( () => {
	
	// PRIVATE PROPERTIES: //

	const $page = $('.page');
	const $studentItems = $('.student-item.cf');
	const studentsPerPage = 10;
	let numStudents = 0;
	let numPages = 0;
	
	//  PRIVATE METHODS: //

	// EFFECTS: Sets the number of students in the list
	let setNumStudents = (x) => {
		this.numStudents = x;
	};

	// EFFECTS: Sets the number of total pages
	let setNumPages = (x) => {
		this.numPages = Math.ceil( x );
	};

	// EFFECTS: Adds required html container for pagination buttons
	let addPaginationContainer = () => {
		$paginationContainer = $('<div class="pagination"><ul></ul></div>');
		$page.append($paginationContainer);
	};

	// EFFECTS: Adds a page button to the pagination container
	let addPageButton = (number) => {
		$button = $('<li><a href="#">' + number + '</a></li>');
		$('.pagination ul').append($button);
	};

	// EFFECTS: Sets the target's class to "active"
	let setButtonActive = ($target) => {
		// First remove the class from the old active button, then add it to the current target
		$('.pagination ul li').find('.active').removeClass('active');
		$target.addClass('active');
	};

	// EFFECTS: Sets the class of the items in $obj to "active" 
	let setStudentActive = ($obj, start, end) => {
		// First remove the class from the old set of active items, then add to current range
		$studentItems.removeClass('active');
		$obj.slice(start, end).addClass('active');
	};

	// EFFECTS: Displays the items in $active
	let showActiveStudents = ($active) => {
		// First hide all items, then show $active set
		$studentItems.hide();
		$active.show();
	};

	// EFFECTS: event handler for page button clicks
	let buttonClick = (ev) => {
		
		ev.preventDefault();
		$target = $(ev.target);

		// If the target button's class is not active
		if($target.attr('class') !== 'active') {
			// Set the new active button
			setButtonActive($target);

			// Calculate the active range
			let pageNumber = parseInt($target.text());
			let end = pageNumber * studentsPerPage;
			if(pageNumber === this.numPages) {
				end -= (studentsPerPage - this.numStudents % studentsPerPage);
			}
			let start = (pageNumber * studentsPerPage) - studentsPerPage;
			// Set the active items based on the range
			setStudentActive(ev.data.$studentList, start, end);
			let $active = ev.data.$studentList.filter('.active');
			// Display results
			showActiveStudents($active);
		}
	};

	// PUBLIC METHODS //

	// EFFECTS: initializes pagination functionality
	let init = () => {
		// Add the container HTML for page buttons
		addPaginationContainer();
		// Add the appropriate buttons and listeners
		paginate($studentItems);
	};

	// EFFECTS: Adds the appropriate buttons and listeners for pagination functionality
	let paginate = ($studentList) => {
		setNumStudents($studentList.length);
		
		setNumPages( this.numStudents / studentsPerPage );

		// Set active students from beginning
		setStudentActive($studentList, 0, studentsPerPage);
		
		// Show initial active students
		showActiveStudents($studentList.filter('.active'));
		
		// Add pagination buttons only if the number of pages is greater than 1	
		if(this.numPages > 1) {
			for(let i = 1; i <= this.numPages; i++) {
				addPageButton(i);
			}

			// Set button 1 to active
			$('.pagination ul li:first-child a').addClass('active');
			// Add event listener
			$('.pagination ul').on('click', 'li', {$studentList: $studentList}, buttonClick);
		}
	};

	// EFFECTS: removes page buttons, listeners, and all active students
	let destroy = () => {
		$('.pagination ul').off('click', 'li', buttonClick)
		$('.pagination ul li').remove();
		$studentItems.removeClass('active');
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
