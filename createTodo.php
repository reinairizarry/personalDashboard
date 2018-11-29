<?php
  $title = $_GET['title'];
  echo("Received item to add ".$title."\n");
  //open and load JSON file
  $jsonString = file_get_contents('todo.json');
  echo $jsonString;
  $data = json_decode($jsonString,true);
  echo "Loaded $size items\n";
  for($i;$i<$size;$i++){
    echo "Loaded ".$data[$i]."\n";
  }
  $arr = array('title'=>$title);
  $data += $arr;
  //array_pad($data,($size+1),$arr); <-doesnt seem to do anything
  //$data[$size+1] = $arr; <- breaks it by adding numbers
  $newJsonString = json_encode($data);
  echo("New JSON file: ".$newJsonString."\n");
  file_put_contents('todo.json', $newJsonString);
?>
