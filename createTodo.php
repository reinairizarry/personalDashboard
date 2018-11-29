<?php
  $title = $_GET['title'];
  echo("Received item to add ".$title."\n");
  //open and load JSON file
  $jsonString = file_get_contents('todo.json');
  $data = json_decode($jsonString,true);
  $size = sizeof($data);
  echo "Loaded $size items\n";
  for($i;$i<$size;$i++){
    echo "Loaded ".$data[$i]."\n";
  }
  $arr = array('title'=>$title);
  // $data[sizeof($data)-1]
  $newJsonString = json_encode($data);
  echo("New JSON file: ".$newJsonString."\n");
  file_put_contents('todo.json', $newJsonString);
?>
