$(document).ready(() => {

	$('a').click((e) => {
		alert('you clicked on me !!');
		e.preventDefault();
	});
});