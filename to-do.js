//Complete Todos by clicking
$("ul").on("click", "li", function(){
	$(this).toggleClass("completed");
});

//Delete todo when clicking X
$("ul").on("click", "li span", function(event){
	$(this).parent().fadeOut(500, function() {
		$(this).remove();
	})
	event.stopPropagation();
});

//create new todo list item from input
$("input[type='text']").on("keypress", function(event) {
	if (event.which === 13) {
		//grabbing new todo text from input
		var todoText = $(this).val();
		$(this).val("");
		$("ul").append("<li><span><i class='fas fa-trash-alt fa-sm'></i></span> " + todoText + "</li>");
	}
});
