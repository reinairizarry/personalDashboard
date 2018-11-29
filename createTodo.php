<?php
  $title = $_GET['title'];
  echo("Received item to add ".$title."\n");
  //open and load JSON file
  $jsonString = file_get_contents('todo.json');
  $data = json_decode($jsonString,true);
  echo $data."\n";
  // $arr = array('title' => $title);
  // $newItem = json_encode($arr);
  $data->setsize(sizeof($data)+1));
  // $data[sizeof($data)-1]
  $newJsonString = json_encode($data);
  echo("New JSON file: ".$newJsonString."\n");
  file_put_contents('todo.json', $newJsonString);
?>
