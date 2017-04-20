'use strict';

$(document).ready(function () {

	$('a').click(function (e) {
		alert('you clicked on me !!');
		e.preventDefault();
	});
});