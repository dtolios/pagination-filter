
// First, only show ten students
$('.student-item:gt(9)').hide();

// Create Pagination buttons
const $students = $('.student-list').children();
const numStudents = $students.length;
const numPages = Math.ceil( numStudents / 10 );

$('.page').append('<div class="pagination"><ul></ul></div>');

for(let i = 1; i <= numPages; i++) {
	if(i === 1)
		var $button = $('<li><a href="#" class="active">' + i + '</a></li>');
	else
		var $button = $('<li><a href="#">' + i + '</a></li>');
	$('.pagination ul').append($button);
}

// Click event for loading appropriate subset of students
$('.pagination').on('click', function( event ) {
	let $target = $(event.target);
	let endIndex = parseInt($target.text()) * 10;
	let startIndex = endIndex - 10;

	// Set active button
	$(this).find('.active').removeClass('active');
	$target.addClass('active');
	// Show correct range of students
	$('.student-item').hide();
	$('.student-item').slice(startIndex, endIndex).show();
});
