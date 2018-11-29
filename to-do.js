//Complete Todos by clicking
$("ul").on("click", "li", function(){
	$(this).toggleClass("completed");
	var text = (this.innerHTML).split("</span>");
	console.log("Crossing out " + text[1]);
});

//Delete todo when clicking X
$("ul").on("click", "li span", function(event){
	$(this).parent().fadeOut(500, function() {
		var text = (this.innerHTML).split("</span>");
		console.log("Deleting " + text[0]);
		//pass text[1] to php
		var xhr = new XMLHttpRequest();
		xhr.open("GET","https://personal-dashboard.azurewebsites.net/deleteTodo.php?title="+text[0]);
	  xhr.onreadystatechange = function() {
	    if (xhr.readyState==4 && xhr.status==200) {
				console.log("Connected to deleteTodo.php");
				console.log(xhr.responseText);
			}
		}
	})
	xhr.send();
	$(this).remove();
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

function loadItems() {
	var items = new Array();
	var todoText;
	var xhr = new XMLHttpRequest();
	xhr.open("GET","https://personal-dashboard.azurewebsites.net/todo.json");
  xhr.onreadystatechange = function() {
    if (xhr.readyState==4 && xhr.status==200) {
			items = JSON.parse(xhr.responseText);
			console.log("Loaded "+items.length+" items...");
			//load item title into variable 'todoText'
			for(i=0;i<items.length;i++) {
				todoText = items[i].title;
				console.log("Adding item " + todoText);
				$("ul").append("<li><span><i class='fas fa-trash-alt fa-sm'></i></span> " + todoText + "</li>");
			}
		}
	}
	xhr.send();
}
