// Search module for enabling search on a Student List page
let Search = ( () => {
	
	// PRIVATE METHODS: //

	// EFFECTS: Appends the required search html to the supplied element
	let addSearch = (el) => {
		let searchHTML = '<div class="student-search">\
							<input placeholder="Search for students...">\
							<button>Search</button>\
						</div>';
		$(el).append(searchHTML);
	};

	// EFFECTS: resets the visibility for all students and re-initializes pagination
	let reset = () => {
		$('.student-item').show();
		Pagination.init();
	};

	// EFFECTS: returns the user input from the search field
	let getQuery = () => {
		return $('.student-search input').val();
	};

	// EFFECTS: appends an error message as a list item to the student list
	let appendError = () => {
		let $error = $('<li id="search-error">No Matching Students Found</li>');
		$('.student-list').append($error);
	};

	// EFFECTS: removes the error message from the student list
	let removeError = () => {
		$('#search-error').remove();
	};

	// EFFECTS: Toggles the visibility of student items based on the query contents
	let filterStudents = () => {
		let query = getQuery().toUpperCase();

		if( $('#search-error').length ) {
			removeError();
		}
		if( query === '' ) {
			reset();
		}
		else {
			$('.student-item').hide();
			$('.student-item').filter(function(index) {
				let isInName = $('h3', this).text().toUpperCase().includes(query);
				let isInEmail = $('.email', this).text().toUpperCase().includes(query);
				return isInName || isInEmail;
			}).show();
			if( $('.student-item').find(':visible').length === 0 ) {
				appendError();
			} 
		}
	};

	// EFFECTS: Event handler for searching
	let searchExe = (ev) => {
		ev.preventDefault();
		Pagination.destroy();
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
