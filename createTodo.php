<?php
  #nice
  $title = $_GET['title'];
  echo("Received item to add ".$title."\n");
  //open and load JSON file
  $jsonString = file_get_contents('todo.json');
  $data = json_decode($jsonString,true);
  $size = sizeof($data);
  $data[$size]= array('title'=>$title,'date'=>'','note'=>'');//creates an item with title property at the end of the list. Sets date and note blank. these are edited later in another script
  $newJsonString = json_encode($data);
  echo("New JSON file: ".$newJsonString."\n");
  file_put_contents('todo.json', $newJsonString);
?>
