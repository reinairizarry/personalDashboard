
var toDoArray = new Array();
//Complete Todos by clicking
$("ul").on("click", "li", function(){
	//$(this).toggleClass("completed");
	var text = (this.innerHTML).split("</span> ");
	showModal(findItem(text[1]));
	console.log(toDoArray.toString());
	console.log(findItem(text[1]));

});

//Delete todo when clicking X
$("ul").on("click", "li span", function(event){
	$(this).parent().fadeOut(500, function() {
		var text = (this.innerHTML).split("</span> ");
		console.log("Deleting " + text[1]);
		//pass text[1] to php
		var xhr = new XMLHttpRequest();
		xhr.open("GET","https://personal-dashboard.azurewebsites.net/deleteTodo.php?title="+text[1]);
		xhr.onreadystatechange = function() {
			if (xhr.readyState==4 && xhr.status==200) {
				console.log("Connected to deleteTodo.php");
				console.log(xhr.responseText);
			}
		}
		xhr.send();
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
		var xhr = new XMLHttpRequest();
		xhr.open("GET","https://personal-dashboard.azurewebsites.net/createTodo.php?title="+todoText);
		xhr.onreadystatechange = function() {
			if (xhr.readyState==4 && xhr.status==200) {
				console.log("Connected to createTodo.php");
				console.log(xhr.responseText);
			}
		}
		xhr.send();
	}

});

function loadItems() {
	var todoText;
	var xhr = new XMLHttpRequest();
	xhr.open("GET","https://personal-dashboard.azurewebsites.net/todo.json");
  xhr.onreadystatechange = function() {
    if (xhr.readyState==4 && xhr.status==200) {
			toDoArray = JSON.parse(xhr.responseText);
			console.log("Loaded "+toDoArray.length+" items...");
			//load item title into variable 'todoText'
			for(i=0;i<toDoArray.length;i++) {
				todoText = toDoArray[i].title;
				console.log("Adding item " + todoText);
				$("ul").append("<li><span><i class='fas fa-trash-alt fa-sm'></i></span> " + todoText + "</li>");
			}
		}
	}
	xhr.send();
	var newObj = JSON.parse('{"title":"'+todoText+'","date":"","note":""}');
	toDoArray.push(newObj);
	console.log(toDoArray.toString());
}

function findItem(text) {
	var pos;
	for(i=0;i<toDoArray.length;i++) {
		item = toDoArray[i].title;
		if(item==text){
			return toDoArray[i];
		}
	}
	return("Did not find item.");
}

function updateItem(object){
	var xhr = new XMLHttpRequest();
	object = JSON.stringify(object);
	xhr.onreadystatechange = function() {
    if (xhr.readyState==4 && xhr.status==200) {
			console.log("Connected to udpateTodo.php");
      console.log(xhr.responseText);
    }
  }
  xhr.open("GET","https://personal-dashboard.azurewebsites.net/updateTodo.php?object="+object);
  xhr.send();
}
function showModal(object){
	var date = document.getElementById("dueDate");
	var title = document.getElementById("todoTitle");
	var note = document.getElementById("todoNote");
	date.value=object.date;
	title.innerHTML=object.title;
	note.innerHTML=object.note;
	modal.style.display = "block";
};
function closeModal(){
	modal.style.display = "none";
}
function saveChanges(){
	var object;
	var date = document.getElementById("dueDate").value;
	var title = document.getElementById("todoTitle").innerHTML;
	var note = document.getElementById("todoNote").innerHTML;
	object=findItem(title);
	object.date=date;
	object.note=note;
	updateItem(object);
	
}
