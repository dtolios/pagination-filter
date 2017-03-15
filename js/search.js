// Search module for enabling search on a Student List page
let Search = ( () => {

	// PRIVATE PROPERTIES //
	const $studentItems = $('.student-item.cf');
	
	// PRIVATE METHODS: //

	// EFFECTS: Appends the required search html to the supplied element
	let addSearch = (el) => {
		let searchHTML = '<div class="student-search">\
							<input placeholder="Search for students...">\
							<button>Search</button>\
						</div>';
		$(el).append(searchHTML);
	};

	// EFFECTS: Removes all matched students
	let reset = () => {
		$studentItems.removeClass('matched');
	};

	// EFFECTS: Returns the user input from the search field
	let getQuery = () => {
		return $('.student-search input').val();
	};

	// EFFECTS: Appends an error message as a list item to the student list
	let appendError = () => {
		let $error = $('<li class="search-error">No Matching Students Found</li>');
		$('.student-list').append($error);
	};

	// EFFECTS: removes the error message from the student list
	let removeError = () => {
		$('.search-error').remove();
	};

	// EFFECTS: Toggles the visibility of student items based on the query contents
	let filterStudents = () => {
		// Get the user query
		let query = getQuery().toUpperCase();

		// Remove any error that occurred in previous search
		if( $('.search-error').length ) {
			removeError();
		}

		// Reset any search state
		reset();

		// If query is not empty, filter students by query and add "matched" class name
		if( query !== '' ) {
			// Filter the original list by looking if the query exists in the name or the email address
			let $filteredList = $studentItems.filter(function(index) {
					let isInName = $('h3', this).text().toUpperCase().includes(query);
					let isInEmail = $('.email', this).text().toUpperCase().includes(query);
					return isInName || isInEmail;
			});

			$filteredList.addClass('matched');
			
			// Check for no search results, display error if true
			if( $filteredList.length === 0 ) {
				appendError();
			}
			// Reset the pagination for the filteredList
			Pagination.destroy();
			Pagination.paginate($filteredList);
		}
		else {
			Pagination.destroy();
			Pagination.paginate($studentItems);
		}
	};

	// EFFECTS: Event handler for searching
	let searchExe = (ev) => {
		ev.preventDefault();
		filterStudents();
	};

	// PUBLIC METHODS: //

	// EFFECTS: Initializing search functionality by adding proper HTML and adding event listeners
	let init = () => {
		addSearch('.page-header');
		$('.student-search button').on('click', searchExe);
		$('.student-search input').on('keyup', (e) => { if(e.which === 13) searchExe(e); });
	};

	// PUBLIC API: //
	return {
		init: init
	};
})();

// Enable search on the page
Search.init();
