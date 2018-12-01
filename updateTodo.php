<?php
  $object = $_GET['object']; //receives as string
  $object = json_decode($object,true);//converts string to object
  $title = $object['title'];
  //open and load JSON file
  $jsonString = file_get_contents('todo.json');
  $data = json_decode($jsonString,true);
  echo("Loaded data length ".sizeof($data.length)."\n");
  for($i=0;$i<sizeof($data);$i++){
    echo("Checking position".$i."\n");
    if($data[$i]['title']==$title) {
      echo("Found\n");
      echo("Updating item ".$data[$i]);
      $data[$i]=$object;
      echo(" as ".$object);
    } else {
      echo("Did not find item \n");
    }
  }
  $newJsonString = json_encode($data);
  echo("New JSON file: ".$newJsonString."\n");
  file_put_contents('todo.json', $newJsonString);
?>
