let Pagination = ( () => {
	const $page = $('.page');

	let studentsPerPage = 10;
	let numStudents = $('.student-list').children().length;
	let numPages = Math.ceil( numStudents / studentsPerPage );

	let addPaginationContainer = () => {
		$paginationContainer = $('<div class="pagination"><ul></ul></div>');
		$page.append($paginationContainer);
	};

	let addPageButton = (number) => {
		$button = $('<li><a href="#">' + number + '</a></li>');
		$('.pagination ul').append($button);
	};

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

	let destroy = () => {
		$('.pagination').remove();
	};

	let setActive = ($target) => {
		// Set active button
		$('.pagination ul li').find('.active').removeClass('active');
		$target.addClass('active');
	};

	let showContent = (start, end) => {
		// Show correct range of students
		$('.student-item').hide();
		$('.student-item').slice(start, end).show();
	}; 

	let buttonClick = (ev) => {
		ev.preventDefault();
		$target = $(ev.target);
		setActive($target);
		let end = parseInt($target.text()) * 10;
		let start = end - 10;
		showContent(start, end);
	};

	return {
		init: init,
		destroy: destroy
	}

})();

Pagination.init();