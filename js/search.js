let Search = ( () => {
	let addSearch = (el) => {
		let searchHTML = '<div class="student-search">\
							<input placeholder="Search for students...">\
							<button>Search</button>\
						</div>';
		$(el).append(searchHTML);
	};

	let reset = () => {
		$('.student-item').show();
		Pagination.init();
	};

	let getQuery = () => {
		return $('.student-search input').val();
	};

	let appendError = () => {
		let $error = $('<li id="search-error">No Matching Students Found</li>');
		$('.student-list').append($error);
	};

	let removeError = () => {
		$('#search-error').remove();
	};

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

	let searchClick = (ev) => {
		ev.preventDefault();
		Pagination.destroy();
		filterStudents();
	};

	let init = () => {
		addSearch('.page-header');
		$('.student-search button').on('click', searchClick);
	};

	return {
		init: init
	};
})();

Search.init();
