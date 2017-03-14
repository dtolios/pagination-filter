// Add student-search to the header
$('.page-header').append(
	'<div class="student-search">\
		<input placeholder="Search for students...">\
		<button>Search</button>\
	</div>'
	);

let query = '';

// Search button filter functionality
$('.student-search button').on('click', () => {
	query = $('.student-search input').val().toUpperCase();

	if( query === '') {
		$('.student-item').show();
	}
	else {
		$('.student-item').hide();
		$('.student-item.cf').filter(function(index) {
			let isInName = $('h3', this).text().toUpperCase().includes(query);
			let isInEmail = $('.email', this).text().toUpperCase().includes(query);
			return isInName || isInEmail;
		}).show();
	}
});

// Additional search functionality for clicking 'Enter' key
$('.student-search input').on('keypress', (e) => {
	if(e.which === 13) {
		query = $('.student-search input').val().toUpperCase();
		if( query === '') {
			$('.student-item').show();
		}
		else {
			$('.student-item').hide();
			$('.student-item.cf').filter(function(index) {
				let isInName = $('h3', this).text().toUpperCase().includes(query);
				let isInEmail = $('.email', this).text().toUpperCase().includes(query);
				return isInName || isInEmail;
			}).show();
		}
	}
});
