$('.unit').on('click', function() {
	var findElm = $(this).next(".explanation");
	$(findElm).slideToggle();
	if($(this).hasClass('close')){
		$(this).removeClass('close');
	}
	else{
		$(this).addClass('close');
	}
});